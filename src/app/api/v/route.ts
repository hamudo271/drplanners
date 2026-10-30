import { cookies } from "next/headers";
import { prisma, hasDb } from "@/lib/cms/db";
import { ADMIN_COOKIE, verifyAdminToken } from "@/lib/cms/auth";
import { classify, pickTags, parseUA, cleanPath } from "@/lib/cms/attrib";
import { getExcludedIps } from "@/lib/cms/settings";
import { clientIp } from "@/lib/form-guards";
import { SITE } from "@/config/site";

/**
 * 방문 신호 받는 곳 — 페이지마다 브라우저(components/layout/Tracker.tsx)가 작은 JSON 하나를 보냅니다.
 *   { v: 방문자 번호, s: 방문 번호, p: 페이지, r?: 들어온 주소, q?: 쿼리, k?: 행동, t?: 대상 }
 * 이름 · 주소 · 쿠키 없음. 봇, 로그인한 관리자, 설정에서 뺀 IP 는 세지 않습니다.
 * 항상 204 를 바로 돌려주고 저장은 그 뒤에 합니다 — 사이트 속도에 영향이 없게.
 */
export const dynamic = "force-dynamic";

const HIT_KINDS = new Set(["tel", "kakao", "map", "sns", "out", "form"]);
const ID = /^[a-z0-9]{8,40}$/i;

// IP 별 분당 신호 수 — 한 브라우저가 미쳐 돌아도 DB 가 버티게
const beats = new Map<string, { n: number; at: number }>();

const EMPTY = new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } });

export async function POST(req: Request) {
  if (!hasDb()) return EMPTY;

  let b: Record<string, unknown>;
  try {
    const text = (await req.text()).slice(0, 4000);
    b = JSON.parse(text);
  } catch {
    return EMPTY;
  }
  if (!b || typeof b !== "object" || !ID.test(String(b.v ?? "")) || !ID.test(String(b.s ?? ""))) return EMPTY;

  const ua = req.headers.get("user-agent") ?? "";
  const u = parseUA(ua);
  if (u.bot) return EMPTY;

  const ip = await clientIp();
  const now = Date.now();
  const beat = beats.get(ip);
  if (beat && now - beat.at < 60_000) {
    beat.n += 1;
    if (beat.n > 120) return EMPTY;
  } else {
    beats.set(ip, { n: 1, at: now });
    if (beats.size > 5000) beats.clear();
  }

  // 관리자 본인의 방문은 빼기
  if (await verifyAdminToken((await cookies()).get(ADMIN_COOKIE)?.value)) return EMPTY;
  if ((await getExcludedIps()).includes(ip)) return EMPTY;

  const visitId = String(b.s);
  const visitor = String(b.v);
  const path = cleanPath(b.p);
  const k = String(b.k ?? "pv");
  const kind = HIT_KINDS.has(k) ? k : "pv";

  try {
    if (kind === "pv") {
      const own = [new URL(SITE.url).hostname, req.headers.get("host")?.split(":")[0] ?? ""].filter(Boolean);
      const ref = typeof b.r === "string" ? b.r.slice(0, 600) : "";
      const c = classify({ ref, tags: pickTags(b.q), ua, own });
      let refUrl: string | null = null;
      if (c.refHost) {
        try {
          const r = new URL(ref);
          r.hash = "";
          refUrl = r.toString().slice(0, 300);
        } catch {
          refUrl = null;
        }
      }
      const seen = await prisma.visit.findFirst({ where: { visitor, NOT: { id: visitId } }, select: { id: true } });
      await prisma.visit.upsert({
        where: { id: visitId },
        create: {
          id: visitId,
          visitor,
          landing: path,
          referrer: c.refHost,
          refUrl,
          grp: c.grp,
          channel: c.channel,
          source: c.source,
          medium: c.medium,
          campaign: c.campaign,
          keyword: c.keyword,
          device: u.device,
          os: u.os,
          browser: u.browser,
          isNew: !seen,
        },
        update: { lastAt: new Date(), pages: { increment: 1 } },
      });
    } else {
      const updated = await prisma.visit.updateMany({ where: { id: visitId }, data: { lastAt: new Date() } });
      if (updated.count === 0) return EMPTY; // 방문 기록이 없으면 행동만 남길 수 없음
    }
    await prisma.hit.create({
      data: {
        visitId,
        kind,
        path,
        target: kind === "pv" ? null : String(b.t ?? "").slice(0, 200) || null,
      },
    });
  } catch (e) {
    console.error("[stats] 저장 실패:", e);
  }
  return EMPTY;
}
