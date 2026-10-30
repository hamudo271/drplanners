import Link from "next/link";
import { hasDb } from "@/lib/cms/db";
import { getStats, PERIODS, type Period, type Row } from "@/lib/cms/stats";
import { getExcludedIps } from "@/lib/cms/settings";
import { clientIp } from "@/lib/form-guards";
import { saveExcludedIps } from "@/app/admin/actions";
import { Card, PageTitle, Empty, Tabs } from "@/components/admin/ui";

type Search = { searchParams: Promise<{ d?: string; saved?: string }> };

/** 전기 대비 증감 — "+12%" / "−8%" / 비교 없음 */
function Delta({ now, prev }: { now: number; prev: number }) {
  if (!prev) return null;
  const pct = Math.round(((now - prev) / prev) * 100);
  if (pct === 0) return <span className="text-xs text-ink-400">전기 동일</span>;
  return (
    <span className={`text-xs tabular-nums ${pct > 0 ? "text-forest-700" : "text-red-700"}`}>
      {pct > 0 ? "+" : "−"}
      {Math.abs(pct)}% <span className="text-ink-400">전기 대비</span>
    </span>
  );
}

/** 가로 막대 표 — 라벨 · 수 · 비율 */
function Bars({ title, rows, total, extraLabel, note }: { title: string; rows: Row[]; total: number; extraLabel?: string; note?: string }) {
  const max = Math.max(1, ...rows.map((r) => r.n));
  return (
    <Card>
      <div className="flex items-baseline justify-between border-b border-ink-900/10 px-5 py-4">
        <h2 className="text-sm font-medium">{title}</h2>
        {note && <span className="text-xs text-ink-400">{note}</span>}
      </div>
      {rows.length === 0 ? (
        <Empty>아직 데이터가 없습니다.</Empty>
      ) : (
        <ol className="divide-y divide-ink-900/8">
          {rows.map((r) => (
            <li key={r.label} className="px-5 py-2.5">
              <div className="flex items-center gap-3 text-sm">
                <span className="min-w-0 flex-1 truncate" title={r.label}>
                  {r.label}
                </span>
                {r.extra !== undefined && extraLabel && (
                  <span className="shrink-0 text-xs text-ink-400 tabular-nums">
                    {extraLabel} {r.extra.toLocaleString()}
                  </span>
                )}
                <span className="w-14 shrink-0 text-right tabular-nums">{r.n.toLocaleString()}</span>
                <span className="w-10 shrink-0 text-right text-xs text-ink-400 tabular-nums">{total ? Math.round((r.n / total) * 100) : 0}%</span>
              </div>
              <div className="mt-1.5 h-1 rounded-full bg-cream-200">
                <div className="h-1 rounded-full bg-forest-700/70" style={{ width: `${(r.n / max) * 100}%` }} />
              </div>
            </li>
          ))}
        </ol>
      )}
    </Card>
  );
}

/** 하루 단위 막대 그래프 — 방문과 그 안의 접수 */
function DailyChart({ daily }: { daily: { date: string; visits: number; conversions: number }[] }) {
  const max = Math.max(1, ...daily.map((d) => d.visits));
  const W = 720;
  const H = 160;
  const gap = 2;
  const bw = Math.max(2, (W - gap * (daily.length - 1)) / daily.length);
  const labelEvery = daily.length > 31 ? 15 : daily.length > 7 ? 7 : 1;
  return (
    <div className="overflow-x-auto px-5 py-4">
      <svg viewBox={`0 0 ${W} ${H + 24}`} className="h-auto w-full min-w-[480px]" role="img" aria-label="일별 방문 그래프">
        {daily.map((d, i) => {
          const x = i * (bw + gap);
          const h = (d.visits / max) * H;
          const hc = (d.conversions / max) * H;
          return (
            <g key={d.date}>
              <title>{`${d.date} · 방문 ${d.visits} · 접수 ${d.conversions}`}</title>
              <rect x={x} y={H - h} width={bw} height={h} rx={1.5} className="fill-forest-700/35" />
              {hc > 0 && <rect x={x} y={H - hc} width={bw} height={hc} rx={1.5} className="fill-brass-500" />}
              {(i % labelEvery === 0 || i === daily.length - 1) && (
                <text x={x + bw / 2} y={H + 16} textAnchor="middle" className="fill-ink-400 text-[10px]">
                  {d.date.slice(5).replace("-", ".")}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      <p className="mt-2 flex gap-4 text-xs text-ink-500">
        <span className="flex items-center gap-1.5">
          <i className="inline-block h-2.5 w-2.5 rounded-sm bg-forest-700/35" /> 방문
        </span>
        <span className="flex items-center gap-1.5">
          <i className="inline-block h-2.5 w-2.5 rounded-sm bg-brass-500" /> 그중 문의 · 진단 제출
        </span>
      </p>
    </div>
  );
}

export default async function StatsPage({ searchParams }: Search) {
  const sp = await searchParams;
  const days = ((["7", "30", "90"].includes(sp.d ?? "") ? Number(sp.d) : 30) as Period);

  if (!hasDb()) return <PageTitle title="방문 통계" />;

  const [s, excluded, myIp] = await Promise.all([
    getStats(days).catch((e) => {
      console.error("[admin] 통계 조회 실패:", e);
      return null;
    }),
    getExcludedIps(),
    clientIp(),
  ]);

  if (!s) {
    return (
      <>
        <PageTitle title="방문 통계" />
        <Card className="p-6 text-sm text-red-700">통계를 불러오지 못했습니다. 잠시 후 새로고침해주세요.</Card>
      </>
    );
  }

  const tiles = [
    { label: "방문", value: s.totals.visits, delta: <Delta now={s.totals.visits} prev={s.prev.visits} /> },
    { label: "방문자", value: s.totals.visitors, sub: `신규 ${s.totals.newVisitors.toLocaleString()} · 재방문 ${(s.totals.visits - s.totals.newVisitors).toLocaleString()}` },
    { label: "페이지뷰", value: s.totals.pageviews, sub: s.totals.visits ? `방문당 ${(s.totals.pageviews / s.totals.visits).toFixed(1)}페이지` : undefined },
    {
      label: "문의 · 진단 제출",
      value: s.totals.conversions,
      delta: <Delta now={s.totals.conversions} prev={s.prev.conversions} />,
      sub: s.totals.visits ? `방문 100건당 ${((s.totals.conversions / s.totals.visits) * 100).toFixed(1)}건` : undefined,
    },
  ];
  const iAmExcluded = excluded.includes(myIp);

  return (
    <>
      <PageTitle
        title="방문 통계"
        sub={`오늘 방문 ${s.today.visits.toLocaleString()} · 오늘 접수 ${s.today.conversions.toLocaleString()} — 한국 시간 기준, 관리자 본인과 봇은 빠져 있습니다.`}
      />

      <Tabs current={String(days)} items={(Object.keys(PERIODS) as unknown as Period[]).map((d) => ({ key: String(d), href: `/admin/stats?d=${d}`, label: PERIODS[d] }))} />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {tiles.map((t) => (
          <Card key={t.label} className="p-5">
            <p className="text-xs text-ink-500">{t.label}</p>
            <p className="mt-2 text-3xl font-light tabular-nums">{t.value.toLocaleString()}</p>
            <p className="mt-1 min-h-4 text-xs text-ink-500">{t.delta ?? t.sub}</p>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <h2 className="border-b border-ink-900/10 px-5 py-4 text-sm font-medium">일별 방문</h2>
        <DailyChart daily={s.daily} />
      </Card>

      {/* 채널별 성과 — 이 화면의 핵심 */}
      <Card className="mt-6 overflow-x-auto">
        <div className="border-b border-ink-900/10 px-5 py-4">
          <h2 className="text-sm font-medium">채널별 성과</h2>
          <p className="mt-0.5 text-xs text-ink-500">어느 경로로 들어온 방문이 문의 · 진단으로 이어졌는지. 광고비를 어디에 쓸지 정할 때 보는 표입니다.</p>
        </div>
        {s.conversionsByChannel.length === 0 ? (
          <Empty>아직 데이터가 없습니다.</Empty>
        ) : (
          <table className="w-full min-w-[560px] text-sm">
            <thead className="border-b border-ink-900/10 text-left text-xs text-ink-500">
              <tr>
                <th className="px-5 py-3 font-normal">채널</th>
                <th className="px-3 py-3 text-right font-normal">방문</th>
                <th className="px-3 py-3 text-right font-normal">문의 · 진단</th>
                <th className="px-3 py-3 text-right font-normal">전환율</th>
                <th className="px-3 py-3 text-right font-normal">전화</th>
                <th className="px-5 py-3 text-right font-normal">카카오</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-900/8">
              {s.conversionsByChannel.map((r) => (
                <tr key={r.channel} className={r.forms > 0 ? "font-medium" : ""}>
                  <td className="px-5 py-3">{r.channel}</td>
                  <td className="px-3 py-3 text-right tabular-nums">{r.visits.toLocaleString()}</td>
                  <td className="px-3 py-3 text-right tabular-nums">{r.forms.toLocaleString()}</td>
                  <td className="px-3 py-3 text-right text-ink-500 tabular-nums">{r.visits ? `${((r.forms / r.visits) * 100).toFixed(1)}%` : "—"}</td>
                  <td className="px-3 py-3 text-right font-normal tabular-nums">{r.tel.toLocaleString()}</td>
                  <td className="px-5 py-3 text-right font-normal tabular-nums">{r.kakao.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Bars title="유입 그룹" rows={s.groups} total={s.totals.visits} />
        <Bars title="유입 채널" rows={s.channels} total={s.totals.visits} extraLabel="신규" />
        <Bars title="검색어" rows={s.keywords} total={s.totals.visits} note="네이버 · 구글은 대부분 검색어를 숨깁니다" />
        <Bars title="유입 주소" rows={s.referrers} total={s.totals.visits} note="다른 사이트에서 온 경우" />
        <Bars title="처음 들어온 페이지" rows={s.landings} total={s.totals.visits} />
        <Bars title="많이 본 페이지" rows={s.pages} total={s.totals.pageviews} extraLabel="방문" />
        <Bars title="기기" rows={s.devices} total={s.totals.visits} />
        <Bars title="브라우저" rows={s.browsers} total={s.totals.visits} />
        <Bars title="행동" rows={s.actions} total={s.totals.visits} note="방문 수 대비" />

        <Card className="p-5">
          <h2 className="text-sm font-medium">통계에서 뺄 IP</h2>
          <p className="mt-1 text-xs text-ink-500">
            사무실 · 집에서 본 방문이 섞이지 않게 합니다. 로그인한 상태의 방문은 이미 빠지고, 로그아웃한 채로 볼 때를 위한 설정입니다.
          </p>
          <form action={saveExcludedIps} className="mt-4 space-y-3">
            <textarea
              name="ips"
              defaultValue={excluded.join("\n")}
              rows={4}
              placeholder="한 줄에 하나씩"
              className="w-full resize-y rounded-lg border border-ink-900/15 px-3 py-2.5 font-mono text-sm outline-none focus:border-forest-700"
            />
            <div className="flex flex-wrap items-center gap-3">
              <button className="rounded-lg bg-forest-800 px-4 py-2 text-sm text-cream-50 hover:bg-forest-700">저장</button>
              {!iAmExcluded && myIp !== "unknown" && (
                <button name="add" value={myIp} className="rounded-lg border border-ink-900/15 px-4 py-2 text-sm hover:bg-cream-100">
                  지금 이 IP 추가 ({myIp})
                </button>
              )}
              {iAmExcluded && <span className="text-xs text-ink-500">지금 보고 계신 IP({myIp})는 빠져 있습니다.</span>}
              {sp.saved && <span className="text-sm text-forest-800">저장했습니다.</span>}
            </div>
          </form>
          <p className="mt-5 text-xs leading-5 text-ink-400">
            링크에 <code className="font-mono">?utm_source=instagram&amp;utm_medium=profile</code> 처럼 태그를 붙여 배포하면 그 링크로 들어온 방문이 채널별로 따로 잡힙니다.{" "}
            <Link href="/admin/inquiries" className="underline underline-offset-2">
              접수 상세
            </Link>
            에서는 그 사람이 어떤 경로로 들어와 무엇을 보고 신청했는지도 보입니다.
          </p>
        </Card>
      </div>
    </>
  );
}
