import Image from "next/image";
import Link from "next/link";
import { Container, Section, Button, CircleArrow } from "@/components/ui";
import * as C from "@/content/home";
import { HOME } from "@/config/images";
import { latestArticles, readingTime } from "@/content/articles";
import { ServiceShowcase } from "./ServiceShowcase";
import { FunnelChart } from "./HubDiagram";

/* ══ 01 히어로 ════════════════════════════════════════
   4매 로테이션이라 상태가 필요합니다 — 클라이언트 컴포넌트로 분리했습니다. */
export { HeroSlider as Hero } from "./HeroSlider";

/* ══ 02 대상 확인 ═════════════════════════════════════
   히어로 바로 다음에 "이 사이트가 당신을 위한 것인가"를 닫아줍니다.
   주력 타겟은 01이지만 나머지 둘도 받아 이탈을 막습니다. */
export function Audience() {
  return (
    <Section id="audience" no="01" label="이런 병원입니다" tone="paper" className="home-audience">
      <div className="editorial-section-heading" data-reveal>
        <div>
          <h2 className="editorial-title">
            {C.AUDIENCE.title.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </h2>
        </div>
        <p className="editorial-intro">
          해당되지 않는다면 굳이 문의하지 않으셔도 됩니다.
          <br />
          맞는 병원과만 일합니다.
        </p>
      </div>

      <div className="audience-grid">
        {C.AUDIENCE.cards.map((card, i) => (
          <article
            key={card.no}
            className="audience-card"
            data-reveal
            style={{ "--reveal-delay": `${i * 110}ms` } as React.CSSProperties}
          >
            <div className="audience-card-top">
              <span className="display-serif tnum audience-no">{card.no}</span>
              {card.tag && <span className="audience-tag">{card.tag}</span>}
            </div>
            <p className="audience-title">{card.title}</p>
            <p className="prose-ko audience-body">{card.body}</p>
          </article>
        ))}
      </div>

      {/* 거르는 장치 — "월 4곳만" 이라는 말이 진짜가 되려면 안 받는 경우도 밝혀야 합니다 */}
      <div className="exclude-block" data-reveal>
        <p className="exclude-label">{C.AUDIENCE.excludeLabel}</p>
        <ul className="exclude-list">
          {C.AUDIENCE.exclude.map((e) => (
            <li key={e}>
              <span className="exclude-mark" aria-hidden="true">
                ✕
              </span>
              <span className="prose-ko">{e}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

/* ══ 03 원인 재정의 ═══════════════════════════════════
   이 사이트의 승부처. 경쟁사는 문제 공감과 서비스 나열까지만 하고
   "왜 안 되는가"를 구조로 설명하지 못합니다. */
export function Why() {
  return (
    <Section no="02" label="왜 안 되는가" className="home-why">
      <div className="why-layout">
        <div data-reveal="left">
          <h2 className="editorial-title">
            {C.WHY.title.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </h2>
          <div className="prose-ko why-body">
            {C.WHY.body.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </div>
        </div>

        {/* 리포트 한 줄 → "그래서요?" — 이 대비가 블록의 전부입니다 */}
        <figure className="why-report" data-reveal="right">
          <figcaption className="label label-ko">{C.WHY.report.label}</figcaption>
          <p className="why-report-line">“{C.WHY.report.line}”</p>
          <p className="why-retort">{C.WHY.report.retort}</p>
          <p className="prose-ko why-report-caption">{C.WHY.report.caption}</p>
        </figure>
      </div>

      <p className="why-punch" data-reveal>
        {C.WHY.punch.map((l, i) => (
          <span key={l} className={i === 1 ? "why-punch-strong" : undefined}>
            {l}
          </span>
        ))}
      </p>
    </Section>
  );
}

/* ══ 04 병목 진단 ═════════════════════════════════════
   문제 기준으로 안내하되 목적지는 기존 서비스 페이지입니다.
   (서비스 키워드 검색 자산을 지키려고 URL은 그대로 둡니다) */
export function Bottleneck() {
  return (
    <Section no="03" label="어디가 막혔는지부터" tone="paper" className="home-bottleneck">
      <div className="editorial-section-heading" data-reveal>
        <div>
          <h2 className="editorial-title">
            {C.BOTTLENECK.title.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </h2>
        </div>
        <p className="editorial-intro">{C.BOTTLENECK.lead}</p>
      </div>

      {/* 카드 대신 그림 — 광고비가 어느 칸에서 새는지가 곧 "어디가 막혔는지"입니다 */}
      <div className="bottleneck-funnel">
        <FunnelChart />
      </div>

      {/* 세 원인 — 새는 칸에 따라 처방이 갈립니다. 카드가 아니라 한 줄짜리 갈림길 */}
      <ul className="bottleneck-routes">
        {C.BOTTLENECK.items.map((it, i) => (
          <li key={it.no} data-reveal style={{ "--reveal-delay": `${i * 110}ms` } as React.CSSProperties}>
            <Link href={it.href} className="bottleneck-route group">
              <span className="display-serif tnum route-no">{it.no}</span>
              <span className="route-text">
                <span className="route-q">{it.q}</span>
                <span className="prose-ko route-body">{it.body}</span>
                <span className="route-fix">
                  {it.fix}
                  <span aria-hidden="true">→</span>
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* 세 가지 중 무엇이든 결국 이 세 축으로 처리됩니다 */}
      <div className="bottleneck-showcase" data-reveal>
        <ServiceShowcase />
      </div>

      {/* CTA 2회차 — 상단·중단·하단 3회 정책 */}
      <div className="mt-16 text-center" data-reveal>
        <Link href={C.PRIMARY_CTA.href}>
          <Button>{C.PRIMARY_CTA.label}</Button>
        </Link>
        <p className="prose-ko mt-4 text-sm text-ink-500">
          어디가 막혔는지 모르시겠다면, 진단부터 받아보십시오.
        </p>
      </div>
    </Section>
  );
}

/* ══ 05 일하는 순서 ═══════════════════════════════════ */
export function Plan() {
  return (
    <section className="home-plan bg-cream-50 text-ink-900">
      <Container className="pt-20 md:pt-28 lg:pt-32">
        <div className="mb-12 flex items-center gap-4" data-reveal>
          <span className="label tnum">04</span>
          <span className="h-px w-8 bg-ink-900/20" aria-hidden />
          <span className="label label-ko">{C.PLAN.label}</span>
        </div>

        <div
          className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-24"
          data-reveal
        >
          <h2 className="editorial-title">
            {C.PLAN.title.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </h2>
          <p className="prose-ko text-sm text-ink-500">
            {C.PLAN.lead.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </p>
        </div>
      </Container>

      {/* 풀블리드 4분할 패널 — 손이 닿은 칸만 켜지는 전환은 전부 CSS에 있습니다 */}
      <div className="plan-band">
        <div className="plan-band-photo">
          <Image src={HOME.planBand} alt="" fill sizes="100vw" className="object-cover" />
        </div>

        <div className="plan-panels">
          {C.PLAN.steps.map((s, i) => (
            <div key={s.no} className="plan-panel">
              <div
                className="plan-panel-inner"
                data-reveal
                style={{ "--reveal-delay": `${i * 110}ms` } as React.CSSProperties}
              >
                <p className="plan-number tnum">{s.no}</p>
                <p className="plan-en">{s.name}</p>
                <p className="plan-ko">{s.ko}</p>
                <p className="plan-you">
                  <span>원장님이 하실 일</span>
                  {s.you}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══ 06 증거 ══════════════════════════════════════════
   ⚠️ metrics 가 비어 있으면 수치 블록은 통째로 숨겨집니다.
      실제 운영 수치가 확보되면 content/home.ts 의 EVIDENCE.metrics 만 채우면 켜집니다. */
export function Evidence() {
  const { metrics } = C.EVIDENCE;

  return (
    <Section no="05" label="저희가 지키는 것" className="home-evidence">
      <div className="editorial-section-heading" data-reveal>
        <div>
          <h2 className="editorial-title">
            {C.EVIDENCE.title.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </h2>
        </div>
        <p className="editorial-intro">
          지키지 못할 약속은 쓰지 않습니다.
          <br />
          아래는 오늘부터 지키는 것들입니다.
        </p>
      </div>

      <div className="evidence-grid">
        {C.EVIDENCE.promises.map((p, i) => (
          <div
            key={p.v}
            className="evidence-card"
            data-reveal
            style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}
          >
            <p className="evidence-value tnum">{p.v}</p>
            <p className="evidence-key">{p.k}</p>
            <p className="prose-ko evidence-desc">{p.d}</p>
          </div>
        ))}
      </div>

      {metrics.length > 0 && (
        <div className="evidence-metrics" data-reveal>
          {metrics.map((m) => (
            <div key={m.label} className="evidence-metric">
              <p className="evidence-value tnum">{m.value}</p>
              <p className="evidence-key">{m.label}</p>
            </div>
          ))}
        </div>
      )}

      <p className="evidence-note" data-reveal>
        {C.EVIDENCE.note}
      </p>
    </Section>
  );
}

/* ══ 07 인사이트 ══════════════════════════════════════ */
export function Insight() {
  const posts = latestArticles("/insight/column").slice(0, 3);

  return (
    <Section no="06" label="읽을거리" tone="paper" className="home-insight">
      <div className="editorial-section-heading" data-reveal>
        <div>
          <h2 className="editorial-title">
            {C.INSIGHT.title.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </h2>
        </div>
        <div className="insight-tabs">
          {C.INSIGHT.tabs.map((t) => (
            <Link key={t.href} href={t.href} className="insight-tab">
              {t.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {posts.map((a, i) => (
          <Link
            key={a.slug}
            href={`${a.list}/${a.slug}`}
            className="group flex flex-col bg-cream-100"
            data-reveal
            style={{ "--reveal-delay": `${i * 120}ms` } as React.CSSProperties}
          >
            <div className="media-more relative aspect-[16/10] overflow-hidden bg-forest-900" data-more="읽어보기">
              <Image
                src={HOME.insight[i]}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col p-7">
              <p className="label label-ko tnum">
                {a.category} · {a.date} · {readingTime(a)}분 읽기
              </p>
              <p className="display-ko mt-4 text-base">{a.title}</p>
              <p className="prose-ko mt-3 line-clamp-2 text-sm text-ink-500">{a.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 text-center" data-reveal>
        <Link href="/insight" className="group inline-flex items-center gap-3">
          <span className="label label-ko">{C.INSIGHT.more}</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </Section>
  );
}

/* ══ 08 자주 묻는 질문 ════════════════════════════════
   문의 직전에 가장 자주 걸리는 4개. 펼침 애니메이션은 globals.css 에 있습니다. */
export function Faq() {
  return (
    <Section no="07" label="묻기 전에" className="home-faq">
      <div className="faq-layout">
        <div data-reveal="left">
          <h2 className="editorial-title">
            {C.FAQ_HOME.title.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </h2>
          <Link href="/insight/faq" className="editorial-link mt-9 inline-flex">
            {C.FAQ_HOME.more} <CircleArrow size={44} />
          </Link>
        </div>

        <div className="faq-list">
          {C.FAQ_HOME.items.map((f, i) => (
            <details
              key={f.q}
              className="faq-item"
              data-reveal
              style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
            >
              <summary className="faq-q">
                <span>{f.q}</span>
                <span className="label faq-plus" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="prose-ko faq-a">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ══ 09 마지막 행동 ═══════════════════════════════════ */
export function ClosingCta() {
  return (
    <section className="relative overflow-hidden bg-forest-800 text-cream-100">
      <div className="pointer-events-none absolute inset-y-0 right-0 w-2/3 opacity-[0.17]">
        <Image src={HOME.cta} alt="" fill sizes="66vw" className="object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-forest-800 via-forest-800/92 to-transparent" />
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brass-500/55 to-transparent"
        aria-hidden
      />

      <Container className="relative py-24 md:py-32">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-24">
          <div data-reveal>
            <div className="mb-9 flex items-center gap-4">
              <span className="label label-on-dark tnum">08</span>
              <span className="h-px w-8 bg-cream-100/30" aria-hidden />
              <span className="label label-ko label-on-dark">{C.CTA.label}</span>
            </div>

            <h2 className="display-ko text-[1.75rem] md:text-[2.375rem] lg:text-[2.75rem]" data-lines>
              {C.CTA.title.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </h2>

            <p className="prose-ko mt-7 max-w-md text-sm text-cream-100/70 md:text-base">
              {C.CTA.body}
            </p>

            <div className="mt-11">
              <Link href={C.PRIMARY_CTA.href}>
                <Button variant="cream">{C.PRIMARY_CTA.label}</Button>
              </Link>
            </div>
          </div>

          {/* 버튼을 누르면 무슨 일이 일어나는지 — 빈 공간 대신 답을 둡니다 */}
          <div data-reveal style={{ "--reveal-delay": "140ms" } as React.CSSProperties}>
            <p className="label label-ko label-on-dark">{C.CTA.stepsLabel}</p>
            <ol className="mt-6 border-t border-cream-100/15">
              {C.CTA.steps.map((s, i) => (
                <li key={s.title} className="flex gap-6 border-b border-cream-100/15 py-6">
                  <span className="display-serif tnum text-2xl leading-none text-brass-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm tracking-[0.04em] text-cream-100">{s.title}</p>
                    <p className="prose-ko mt-1.5 text-sm text-cream-100/60">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-6 flex items-start gap-2.5 text-sm text-cream-100/55">
              <span
                className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-brass-400"
                aria-hidden
              />
              {C.CTA.note}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
