import Image from "next/image";
import Link from "next/link";
import { Container, H2 } from "@/components/ui";
import { PageHero, CtaBand, findDetail } from "./shared";
import { RELATED, findByHref, enFor } from "@/config/nav";
import { detailHero, detailBody } from "@/config/images";
import { solutionContent } from "@/content/solutions";

/**
 * 템플릿 2 — 솔루션 상세 (하위 리프 16개 공통)
 *
 * 더가든 시술 상세 페이지의 구성을 따릅니다.
 *   PROBLEM(체크 상자 줄 + 둥근 사진) → 흐르는 외곽선 글씨 → 어두운 SOLUTION 띠(흰 카드)
 *   → "이런 분께" 알약 칩(원장님의 시간) → 산출물·측정 → 진행 순서 → FAQ → 함께 볼 것 → 배너
 *
 * 순서가 곧 설득의 순서입니다.
 *   누구에게 필요한가 → 무엇을 하나 → 원장님은 얼마나 쓰나 → 무엇을 받나
 *   → 어떻게 진행되나 → 묻기 전에 → 함께 볼 것 → 행동
 */

/** 원 안의 체크 — 더가든 상자 줄의 머리 아이콘 */
function Check() {
  return (
    <svg className="sx-check" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="9.25" stroke="currentColor" strokeWidth="1" />
      <path d="M6 10.4 8.6 13 14 7.6" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function SolutionDetail({
  hubHref,
  detailHref,
}: {
  hubHref: string;
  detailHref: string;
}) {
  const { hub, detail } = findDetail(hubHref, detailHref);
  const c = solutionContent(detailHref);
  const related = (RELATED[detailHref] ?? [])
    .map((href) => ({ href, r: findByHref(href) }))
    .filter((x): x is { href: string; r: NonNullable<ReturnType<typeof findByHref>> } => !!x.r);

  return (
    <>
      <PageHero
        crumbs={[{ label: hub.fullLabel, href: hub.href }, { label: detail.label }]}
        title={detail.label}
        en={enFor(detailHref)}
        lead={c?.lead ?? detail.blurb}
        mediaLabel={`${detail.label} 대표 이미지`}
        mediaSrc={detailHero(detailHref)}
      />

      {/* ── 이런 병원에 필요합니다 — 더가든 PROBLEM 블록 ── */}
      <section className="sx bg-cream-100 text-ink-900">
        <Container className="sx-pad">
          <div className="sx-split">
            <div>
              <div data-reveal>
                <p className="sx-cate">( Who It&apos;s For )</p>
                <H2>이런 병원에 필요합니다</H2>
              </div>
              <ol className="sx-rows">
                {(c?.who ?? []).map((w, i) => (
                  <li
                    key={w.title}
                    className="sx-row"
                    data-reveal
                    style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}
                  >
                    <span className="sx-row-head">
                      <Check />
                      <span className="sx-row-title">{w.title}</span>
                    </span>
                    <span className="sx-row-body">{w.body}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="sx-photo" data-reveal="right">
              <Image
                src={detailBody(detailHref)}
                alt=""
                fill
                sizes="(max-width: 1023px) 100vw, 44vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ── 무엇을 하나요 — 어두운 SOLUTION 띠 + 흰 카드 ── */}
      <section className="sx sx-dark">
        <div className="sx-ghost" aria-hidden="true">
          <div className="sx-ghost-inner">
            {Array.from({ length: 4 }, (_, i) => (
              <span key={i}>We plan. You practice.&nbsp;—&nbsp;</span>
            ))}
          </div>
        </div>
        <Container className="sx-pad sx-dark-inner">
          <div className="sx-head-center" data-reveal>
            <p className="sx-cate is-dark">( What We Do )</p>
            <H2>무엇을 하나요</H2>
            <span className="sx-slash" aria-hidden="true" />
            <div className="sx-lead-center">
              {(c?.what.intro ?? []).map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>

          <ol className={`sx-cards sx-cards--${Math.min(c?.what.items.length ?? 4, 4)}`}>
            {(c?.what.items ?? []).map((it, i) => (
              <li
                key={it.title}
                className="sx-card"
                data-reveal
                style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
              >
                <span className="sx-card-no tnum">{String(i + 1).padStart(2, "0")}</span>
                <p className="sx-card-title">{it.title}</p>
                <p className="sx-card-body">{it.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ── 원장님의 시간 — 더가든 "이런 분께 추천합니다"의 알약 칩 ── */}
      {c?.yourTime && (
        <section className="sx bg-cream-50 text-ink-900">
          <Container className="sx-pad">
            <div className="sx-time">
              <div className="sx-time-left" data-reveal>
                <p className="sx-cate">( Your Time )</p>
                <H2>
                  원장님이 쓰시는 시간은
                  <br />
                  <span className="sx-em">{c.yourTime.summary}</span>입니다.
                </H2>
                <p className="sx-text">
                  나머지는 저희가 가져갑니다. 원장님의 시간은 진료와 삶을 위해 남겨두세요.
                </p>
              </div>
              <div className="sx-time-right">
                <div data-reveal>
                  <p className="sx-chip-label">원장님이 하실 일</p>
                  <ul className="sx-chips">
                    {c.yourTime.doing.map((d) => (
                      <li key={d} className="sx-chip is-you">
                        <Check />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
                <div data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
                  <p className="sx-chip-label">저희가 가져가는 일</p>
                  <ul className="sx-chips">
                    {c.yourTime.weTake.map((w) => (
                      <li key={w} className="sx-chip">
                        <Check />
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* ── 받으시는 것 / 측정 항목 ── */}
      <section className="sx bg-cream-100 text-ink-900">
        <Container className="sx-pad">
          <div className="sx-two">
            <div>
              <div data-reveal>
                <p className="sx-cate">( Deliverables )</p>
                <H2>제공 산출물</H2>
              </div>
              <ol className="sx-rows">
                {(c?.deliverables ?? []).map((d, i) => (
                  <li
                    key={d}
                    className="sx-row is-compact"
                    data-reveal
                    style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
                  >
                    <span className="sx-row-head">
                      <span className="sx-row-no tnum">{String(i + 1).padStart(2, "0")}</span>
                      <span className="sx-row-title is-light">{d}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <div data-reveal>
                <p className="sx-cate">( What We Measure )</p>
                <H2>무엇을 측정하나요</H2>
                <p className="sx-text">
                  수치는 병원마다 다릅니다. 계약 후 월간 리포트로 실제 값을 보내드립니다.
                </p>
              </div>
              <ul className="sx-metrics">
                {(c?.metrics ?? []).map((m, i) => (
                  <li
                    key={m.label}
                    className="sx-metric"
                    data-reveal
                    style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
                  >
                    <p className="sx-metric-label">{m.label}</p>
                    <p className="sx-metric-note">{m.note}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 진행 순서 — 흰 카드 사이에 진행 표시 ── */}
      <section className="sx bg-cream-50 text-ink-900">
        <Container className="sx-pad">
          <div className="sx-head-center" data-reveal>
            <p className="sx-cate">( Process )</p>
            <H2>진행 프로세스</H2>
          </div>
          <ol className="sx-steps">
            {(c?.process ?? []).map((s, i) => (
              <li
                key={s.title}
                className="sx-step"
                data-reveal
                style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}
              >
                <div className="sx-step-top">
                  <span className="sx-step-no tnum">STEP {String(i + 1).padStart(2, "0")}</span>
                  {s.span && <span className="sx-step-span">{s.span}</span>}
                </div>
                <p className="sx-card-title">{s.title}</p>
                <p className="sx-card-body">{s.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ── 자주 묻는 질문 — 흰 상자 줄 ── */}
      <section className="sx bg-cream-100 text-ink-900">
        <Container className="sx-pad">
          <div className="sx-head-center" data-reveal>
            <p className="sx-cate">( FAQ )</p>
            <H2>자주 묻는 질문</H2>
          </div>
          <div className="sx-faq">
            {(c?.faq ?? []).map((f, i) => (
              <details
                key={f.q}
                open={i === 0}
                className="faqx-item"
                data-reveal
                style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
              >
                <summary className="faqx-q">
                  <span className="faqx-no tnum" aria-hidden="true">
                    Q
                  </span>
                  <span className="faqx-q-text">{f.q}</span>
                  <span className="label faqx-plus" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="faqx-a">{f.a}</p>
              </details>
            ))}
            {c?.note && <p className="sx-note">{c.note}</p>}
          </div>
        </Container>
      </section>

      {/* ── 함께 보면 좋은 솔루션 ── */}
      {related.length > 0 && (
        <section className="sx bg-cream-50 text-ink-900">
          <Container className="sx-pad">
            <div className="sx-two is-head">
              <div data-reveal>
                <p className="sx-cate">( Related )</p>
                <H2>함께 보면 좋은 솔루션</H2>
                <p className="sx-text">
                  이 서비스와 함께 진행할 때 효과가 커지는 항목입니다. 무엇을 묶을지는
                  진단 결과에 따라 저희가 제안드립니다.
                </p>
              </div>
              <ol className="ins-list sx-related">
                {related.map(({ href, r }, i) => (
                  <li
                    key={href}
                    data-reveal
                    style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}
                  >
                    <Link href={href} className="ins-row">
                      <span className="ins-row-head">
                        <span className="ins-no tnum">{String(i + 1).padStart(2, "0")}</span>
                        <span className="ins-slash" aria-hidden="true" />
                        <span className="ins-row-title">{r.label}</span>
                      </span>
                      <span className="ins-row-meta">
                        {r.parent} · {r.blurb}
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          </Container>
        </section>
      )}

      <CtaBand kind="service" />
    </>
  );
}
