import "server-only";
import { Prisma } from "@prisma/client";
import { prisma } from "./db";
import { NAV, enFor } from "@/config/nav";

/**
 * 방문 통계 집계 — 관리자 통계 화면과 대시보드가 씁니다.
 * 날짜는 모두 한국 날짜(Asia/Seoul) 기준입니다.
 */

export const PERIODS = { 7: "최근 7일", 30: "최근 30일", 90: "최근 90일" } as const;
export type Period = keyof typeof PERIODS;

/** 한국 시간 자정 기준으로 n일 전 00:00 (UTC Date) */
export function kstDayStart(daysAgo = 0) {
  const now = new Date();
  const kst = new Date(now.getTime() + 9 * 3600_000);
  kst.setUTCHours(0, 0, 0, 0);
  kst.setUTCDate(kst.getUTCDate() - daysAgo);
  return new Date(kst.getTime() - 9 * 3600_000);
}

const kstDate = (d: Date) => new Date(d.getTime() + 9 * 3600_000).toISOString().slice(0, 10);

/** 페이지 주소 → 메뉴 이름 (통계 표의 제목) */
const TITLES = new Map<string, string>([["/", "메인"], ["/diagnosis", "무료 병원 진단"], ["/contact", "문의하기"], ["/privacy", "개인정보처리방침"]]);
for (const item of NAV) {
  TITLES.set(item.href, item.fullLabel);
  for (const c of item.children ?? []) TITLES.set(c.href, `${item.label} · ${c.label}`);
}
export function titleOf(path: string) {
  if (TITLES.has(path)) return TITLES.get(path)!;
  const m = path.match(/^(\/insight\/(column|blog|notice))\/(.+)$/);
  if (m) return `${enFor(m[1]) ?? m[2]} · ${decodeURIComponent(m[3])}`;
  return path;
}

export type Row = { label: string; n: number; extra?: number };

export type StatsReport = {
  from: Date;
  days: number;
  totals: { visits: number; visitors: number; pageviews: number; newVisitors: number; conversions: number };
  prev: { visits: number; conversions: number };
  daily: { date: string; visits: number; conversions: number }[];
  groups: Row[];
  channels: Row[];
  referrers: Row[];
  keywords: Row[];
  landings: Row[];
  pages: Row[];
  devices: Row[];
  browsers: Row[];
  actions: Row[];
  conversionsByChannel: { channel: string; visits: number; forms: number; tel: number; kakao: number }[];
  today: { visits: number; conversions: number };
};

type CountRow = { label: string | null; n: bigint; extra?: bigint };
const rows = (r: CountRow[]): Row[] =>
  r.map((x) => ({ label: x.label ?? "(없음)", n: Number(x.n), ...(x.extra !== undefined ? { extra: Number(x.extra) } : {}) }));

export async function getStats(days: Period): Promise<StatsReport> {
  const from = kstDayStart(days - 1);
  const prevFrom = kstDayStart(days * 2 - 1);
  const todayFrom = kstDayStart(0);
  const win = Prisma.sql`"startedAt" >= ${from}`;

  const [totals, prevVisits, prevConv, conv, today, todayConv, daily, groups, channels, referrers, keywords, landings, pages, devices, browsers, actions, byChannel] =
    await Promise.all([
      prisma.$queryRaw<[{ visits: bigint; visitors: bigint; pageviews: bigint; new_visitors: bigint }]>`
        select count(*) visits, count(distinct visitor) visitors, coalesce(sum(pages),0) pageviews,
               count(*) filter (where "isNew") new_visitors
        from "Visit" where ${win}`,
      prisma.visit.count({ where: { startedAt: { gte: prevFrom, lt: from } } }),
      prisma.hit.count({ where: { kind: "form", at: { gte: prevFrom, lt: from } } }),
      prisma.hit.count({ where: { kind: "form", at: { gte: from } } }),
      prisma.visit.count({ where: { startedAt: { gte: todayFrom } } }),
      prisma.hit.count({ where: { kind: "form", at: { gte: todayFrom } } }),
      prisma.$queryRaw<{ d: string; visits: bigint; conv: bigint }[]>`
        select to_char("startedAt" at time zone 'Asia/Seoul', 'YYYY-MM-DD') d, count(*) visits,
               count(*) filter (where exists (select 1 from "Hit" h where h."visitId" = v.id and h.kind = 'form')) conv
        from "Visit" v where ${win} group by 1 order by 1`,
      prisma.$queryRaw<CountRow[]>`select grp label, count(*) n from "Visit" where ${win} group by 1 order by 2 desc`,
      prisma.$queryRaw<CountRow[]>`select channel label, count(*) n, count(*) filter (where "isNew") extra from "Visit" where ${win} group by 1 order by 2 desc limit 20`,
      prisma.$queryRaw<CountRow[]>`select "refUrl" label, count(*) n from "Visit" where ${win} and "refUrl" is not null group by 1 order by 2 desc limit 15`,
      prisma.$queryRaw<CountRow[]>`select keyword label, count(*) n from "Visit" where ${win} and keyword is not null group by 1 order by 2 desc limit 20`,
      prisma.$queryRaw<CountRow[]>`select landing label, count(*) n from "Visit" where ${win} group by 1 order by 2 desc limit 15`,
      prisma.$queryRaw<CountRow[]>`select h.path label, count(*) n, count(distinct h."visitId") extra from "Hit" h where h.kind = 'pv' and h.at >= ${from} group by 1 order by 2 desc limit 20`,
      prisma.$queryRaw<CountRow[]>`select device label, count(*) n from "Visit" where ${win} group by 1 order by 2 desc`,
      prisma.$queryRaw<CountRow[]>`select browser label, count(*) n from "Visit" where ${win} group by 1 order by 2 desc limit 8`,
      prisma.$queryRaw<CountRow[]>`select kind label, count(*) n from "Hit" where kind <> 'pv' and at >= ${from} group by 1 order by 2 desc`,
      prisma.$queryRaw<{ channel: string; visits: bigint; forms: bigint; tel: bigint; kakao: bigint }[]>`
        select v.channel, count(distinct v.id) visits,
               count(distinct v.id) filter (where h.kind = 'form') forms,
               count(distinct v.id) filter (where h.kind = 'tel') tel,
               count(distinct v.id) filter (where h.kind = 'kakao') kakao
        from "Visit" v left join "Hit" h on h."visitId" = v.id and h.kind in ('form','tel','kakao')
        where ${win} group by 1 order by forms desc, visits desc limit 12`,
    ]);

  // 빈 날도 0 으로 채워 그래프가 끊기지 않게
  const byDay = new Map(daily.map((d) => [d.d, { visits: Number(d.visits), conv: Number(d.conv) }]));
  const series: StatsReport["daily"] = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = kstDate(kstDayStart(i));
    const v = byDay.get(date);
    series.push({ date, visits: v?.visits ?? 0, conversions: v?.conv ?? 0 });
  }

  return {
    from,
    days,
    totals: {
      visits: Number(totals[0].visits),
      visitors: Number(totals[0].visitors),
      pageviews: Number(totals[0].pageviews),
      newVisitors: Number(totals[0].new_visitors),
      conversions: conv,
    },
    prev: { visits: prevVisits, conversions: prevConv },
    daily: series,
    groups: rows(groups),
    channels: rows(channels),
    referrers: rows(referrers),
    keywords: rows(keywords),
    landings: rows(landings).map((r) => ({ ...r, label: titleOf(r.label) })),
    pages: rows(pages).map((r) => ({ ...r, label: titleOf(r.label) })),
    devices: rows(devices),
    browsers: rows(browsers),
    actions: rows(actions).map((r) => ({ ...r, label: ACTION_LABEL[r.label] ?? r.label })),
    conversionsByChannel: byChannel.map((r) => ({ channel: r.channel, visits: Number(r.visits), forms: Number(r.forms), tel: Number(r.tel), kakao: Number(r.kakao) })),
    today: { visits: today, conversions: todayConv },
  };
}

export const ACTION_LABEL: Record<string, string> = {
  form: "문의 · 진단 제출",
  tel: "전화 클릭",
  kakao: "카카오톡 클릭",
  map: "지도 클릭",
  sns: "SNS 링크 클릭",
  out: "바깥 링크 클릭",
};

/** 접수 한 건의 방문 — 접수 상세 화면의 "유입" 상자 */
export async function getVisitPath(visitId: string | null) {
  if (!visitId) return null;
  const visit = await prisma.visit.findUnique({
    where: { id: visitId },
    include: { hits: { where: { kind: "pv" }, orderBy: { at: "asc" }, take: 40, select: { path: true, at: true } } },
  }).catch(() => null);
  if (!visit) return null;
  const earlier = await prisma.visit.count({ where: { visitor: visit.visitor, startedAt: { lt: visit.startedAt } } }).catch(() => 0);
  return { ...visit, earlierVisits: earlier, pageTitles: visit.hits.map((h) => ({ title: titleOf(h.path), at: h.at })) };
}
