import { Container, Section, Media, H2 } from "@/components/ui";
import Link from "next/link";
import { PageHero, CtaBand, findDetail } from "./shared";
import { RELATED, findByHref } from "@/config/nav";
import { detailHero, detailBody } from "@/config/images";
import { solutionContent } from "@/content/solutions";

/**
 * 템플릿 2 — 솔루션 상세 (하위 리프 16개 공통)
 *
 * 순서가 곧 설득의 순서입니다.
 *   누구에게 필요한가 → 무엇을 하나 → 원장님은 얼마나 쓰나 → 무엇을 받나
 *   → 어떻게 진행되나 → 묻기 전에 → 함께 볼 것 → 행동
 *
 * 사진은 히어로와 02의 한 장만 씁니다. 전에는 상황 카드 3장·밴드·산출물 이미지·
 * 관련 카드 2장까지 일곱 장이 붙어 있었는데, 전부 브랜드 목업이라 서비스에 대해
 * 아무것도 말하지 않으면서 페이지만 두 배로 길게 만들었습니다.
 */
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

  let n = 0;
  const no = () => String(++n).padStart(2, "0");

  return (
    <>
      <PageHero
        crumbs={[{ label: hub.fullLabel, href: hub.href }, { label: detail.label }]}
        title={detail.label}
        lead={c?.lead ?? detail.blurb}
        mediaLabel={`${detail.label} 대표 이미지`}
        mediaSrc={detailHero(detailHref)}
      />

      {/* 01 ── 이런 병원에 필요합니다 — 사진 없는 세 줄 */}
      <Section no={no()} label="이런 병원에 필요합니다">
        <H2>이런 병원에 필요합니다</H2>
        <ol className="who-strip">
          {(c?.who ?? []).map((w, i) => (
            <li
              key={w.title}
              data-reveal
              style={{ "--reveal-delay": `${i * 110}ms` } as React.CSSProperties}
            >
              <span className="display-serif tnum who-no">{String(i + 1).padStart(2, "0")}</span>
              <p className="who-title">{w.title}</p>
              <p className="prose-ko who-body">{w.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* 02 ── 무엇을 하나요 */}
      <Section no={no()} label="무엇을 하는가" tone="paper">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div data-reveal>
            <H2>무엇을 하나요</H2>
            <div className="mt-8 space-y-4">
              {(c?.what.intro ?? []).map((p) => (
                <p key={p} className="prose-ko text-sm text-ink-700 md:text-base">
                  {p}
                </p>
              ))}
            </div>

            <ul className="mt-10 border-t border-ink-900/12">
              {(c?.what.items ?? []).map((it, i) => (
                <li key={it.title} className="flex gap-5 border-b border-ink-900/12 py-6">
                  <span className="label tnum shrink-0 pt-1">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="text-[15px] font-medium text-ink-900">{it.title}</p>
                    <p className="prose-ko mt-2 text-sm text-ink-500">{it.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <Media
            label="작업 화면 / 산출물 예시"
            ratio="aspect-[4/3]"
            className="lg:sticky lg:top-32"
            src={detailBody(detailHref)}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </Section>

      {/* 03 ── 원장님이 실제로 쓰시는 시간 — 철학을 숫자로. 무엇을 하는지 바로 다음에 옵니다 */}
      {c?.yourTime && (
        <section className="bg-forest-800 text-cream-100">
          <Container className="py-20 md:py-24">
            <div className="mb-10 flex items-center gap-4" data-reveal>
              <span className="label label-on-dark tnum">{no()}</span>
              <span className="h-px w-8 bg-cream-100/30" aria-hidden />
              <span className="label label-ko label-on-dark">원장님의 시간</span>
            </div>
            <div className="grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
              <div data-reveal>
                <H2 className="text-cream-100">
                  원장님이 쓰시는 시간은
                  <br />
                  {c.yourTime.summary}입니다.
                </H2>
                <p className="prose-ko mt-7 text-sm text-cream-100/70">
                  나머지는 저희가 가져갑니다. 원장님의 시간은 진료와 삶을 위해 남겨두세요.
                </p>
              </div>

              <div className="grid gap-px border-t border-l border-cream-100/15 sm:grid-cols-2">
                <div className="border-r border-b border-cream-100/15 p-7">
                  <p className="label label-on-dark">원장님이 하실 일</p>
                  <ul className="mt-5 space-y-3">
                    {c.yourTime.doing.map((d) => (
                      <li key={d} className="flex gap-3">
                        <span className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-brass-400" />
                        <span className="prose-ko text-sm text-cream-100/90">{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-r border-b border-cream-100/15 p-7">
                  <p className="label label-on-dark">저희가 가져가는 일</p>
                  <ul className="mt-5 space-y-3">
                    {c.yourTime.weTake.map((w) => (
                      <li key={w} className="flex gap-3">
                        <span className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-cream-100/40" />
                        <span className="prose-ko text-sm text-cream-100/70">{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* 04 ── 받으시는 것 / 측정 항목 */}
      <Section no={no()} label="받으시는 것">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div data-reveal>
            <H2>제공 산출물</H2>
            <ul className="mt-8 space-y-4">
              {(c?.deliverables ?? []).map((d) => (
                <li key={d} className="flex items-start gap-4 border-b border-ink-900/10 pb-4">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brass-500" />
                  <span className="prose-ko text-sm text-ink-700 md:text-[15px]">{d}</span>
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal>
            <H2>무엇을 측정하나요</H2>
            <p className="prose-ko mt-4 text-sm text-ink-500">
              수치는 병원마다 다릅니다. 계약 후 월간 리포트로 실제 값을 보내드립니다.
            </p>
            <div className="mt-8 grid gap-px border-t border-l border-ink-900/12 sm:grid-cols-2">
              {(c?.metrics ?? []).map((m) => (
                <div key={m.label} className="border-r border-b border-ink-900/12 bg-cream-50 p-6">
                  <p className="text-sm font-medium text-ink-900">{m.label}</p>
                  <p className="prose-ko mt-2 text-xs text-ink-500">{m.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* 05 ── 진행 프로세스 */}
      <Section no={no()} label="진행 순서" tone="paper">
        <H2>진행 프로세스</H2>
        <ol className="mt-12 grid gap-px border-t border-l border-ink-900/12 md:grid-cols-4">
          {(c?.process ?? []).map((s, i) => (
            <li
              key={s.title}
              className="border-r border-b border-ink-900/12 bg-cream-100 p-7"
              data-reveal
              style={{ "--reveal-delay": `${i * 110}ms` } as React.CSSProperties}
            >
              <div className="flex items-baseline justify-between">
                <span className="label tnum">STEP {i + 1}</span>
                {s.span && <span className="label">{s.span}</span>}
              </div>
              <p className="display-ko mt-5 text-lg">{s.title}</p>
              <p className="prose-ko mt-3 text-sm text-ink-500">{s.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* 06 ── FAQ */}
      <Section no={no()} label="자주 묻는 질문">
        <H2>자주 묻는 질문</H2>
        <div className="mt-10 border-t border-ink-900/15">
          {(c?.faq ?? []).map((f, i) => (
            <details key={f.q} open={i === 0} className="border-b border-ink-900/15">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6">
                <span className="display-ko text-base md:text-lg">{f.q}</span>
                <span className="label shrink-0">+</span>
              </summary>
              <div className="max-w-3xl pb-7">
                <p className="prose-ko text-sm text-ink-500">{f.a}</p>
              </div>
            </details>
          ))}
        </div>

        {c?.note && (
          <p className="prose-ko mt-12 border-l-2 border-brass-500 pl-6 text-xs text-ink-500">
            {c.note}
          </p>
        )}
      </Section>

      {/* 07 ── 함께 보면 좋은 솔루션 — 사진 카드 대신 두 줄짜리 갈림길 */}
      {related.length > 0 && (
        <Section no={no()} label="함께 보면 좋은 것" tone="paper">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
            <div data-reveal>
              <H2>함께 보면 좋은 솔루션</H2>
              <p className="prose-ko mt-5 max-w-md text-sm text-ink-500">
                이 서비스와 함께 진행할 때 효과가 커지는 항목입니다. 무엇을 묶을지는
                진단 결과에 따라 저희가 제안드립니다.
              </p>
            </div>
            <ul className="related-list">
              {related.map(({ href, r }, i) => (
                <li key={href} data-reveal style={{ "--reveal-delay": `${i * 110}ms` } as React.CSSProperties}>
                  <Link href={href} className="related-row group">
                    <span className="related-text">
                      <span className="label">{r.parent}</span>
                      <span className="related-name">{r.label}</span>
                      <span className="prose-ko related-blurb">{r.blurb}</span>
                    </span>
                    <span className="related-arrow" aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      )}

      <CtaBand kind="service" />
    </>
  );
}
