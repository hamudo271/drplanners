import Image from "next/image";
import { Container, Section, Media, BrassIcon, TextLines, H2 } from "@/components/ui";
import { PageHero, CtaBand, findDetail } from "./shared";
import { detailHero, detailBody, whoImage, detailBand } from "@/config/images";
import { solutionContent } from "@/content/solutions";

/** 템플릿 2 — 솔루션 상세 (하위 리프 16개 공통, 5섹션) */
export function SolutionDetail({
  hubHref,
  detailHref,
}: {
  hubHref: string;
  detailHref: string;
}) {
  const { hub, detail } = findDetail(hubHref, detailHref);
  const c = solutionContent(detailHref);

  return (
    <>
      <PageHero
        crumbs={[{ label: hub.fullLabel, href: hub.href }, { label: detail.label }]}
        title={detail.label}
        lead={c?.lead ?? detail.blurb}
        mediaLabel={`${detail.label} 대표 이미지`}
        mediaSrc={detailHero(detailHref)}
      />

      {/* 01 ── 이런 병원에 필요합니다 */}
      <Section no="01" label="Who needs this">
        <H2>이런 병원에 필요합니다</H2>
        <div className="mt-12 grid gap-px border-t border-l border-ink-900/12 md:grid-cols-3">
          {(c?.who ?? [null, null, null]).map((w, i) => (
            <div
              key={i}
              className="group border-r border-b border-ink-900/12 bg-cream-100"
              data-reveal
              style={{ "--reveal-delay": `${i * 110}ms` } as React.CSSProperties}
            >
              <div className="overflow-hidden">
                <Media
                  label="상황 이미지"
                  ratio="aspect-[4/3]"
                  src={whoImage(detailHref, i)}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
              </div>
              <div className="p-8">
                <BrassIcon size={30} />
                {w ? (
                  <>
                    <p className="display-ko mt-5 text-base">{w.title}</p>
                    <p className="prose-ko mt-3 text-sm text-ink-500">{w.body}</p>
                  </>
                ) : (
                  <TextLines n={3} className="mt-5" />
                )}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 02 ── 무엇을 하나요 */}
      <Section no="02" label="What we do" tone="paper">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div data-reveal>
            <H2>무엇을 하나요</H2>
            {c ? (
              <div className="mt-8 space-y-4">
                {c.what.intro.map((p) => (
                  <p key={p} className="prose-ko text-sm text-ink-700 md:text-base">
                    {p}
                  </p>
                ))}
              </div>
            ) : (
              <TextLines n={4} className="mt-8" />
            )}

            <ul className="mt-10 border-t border-ink-900/12">
              {(c?.what.items ?? [null, null, null, null]).map((it, i) => (
                <li
                  key={i}
                  className="flex gap-5 border-b border-ink-900/12 py-6"
                >
                  <span className="label tnum shrink-0 pt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {it ? (
                    <div>
                      <p className="text-sm font-medium text-ink-900">{it.title}</p>
                      <p className="prose-ko mt-2 text-sm text-ink-500">{it.body}</p>
                    </div>
                  ) : (
                    <TextLines n={1} className="flex-1" />
                  )}
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

      {/* 03 ── 진행 프로세스 */}
      <Section no="03" label="Process">
        <H2>진행 프로세스</H2>
        <ol className="mt-12 grid gap-px border-t border-l border-ink-900/12 md:grid-cols-4">
          {(c?.process ?? [null, null, null, null]).map((s, i) => (
            <li
              key={i}
              className="border-r border-b border-ink-900/12 bg-cream-100 p-7"
              data-reveal
              style={{ "--reveal-delay": `${i * 110}ms` } as React.CSSProperties}
            >
              <div className="flex items-baseline justify-between">
                <span className="label tnum">STEP {i + 1}</span>
                {s?.span && <span className="label">{s.span}</span>}
              </div>
              {s ? (
                <>
                  <p className="display-ko mt-5 text-lg">{s.title}</p>
                  <p className="prose-ko mt-3 text-sm text-ink-500">{s.body}</p>
                </>
              ) : (
                <TextLines n={2} className="mt-5" />
              )}
            </li>
          ))}
        </ol>
      </Section>

      {/* ── 프로세스와 산출물 사이 호흡 ── */}
      <section className="relative flex min-h-[320px] items-center md:min-h-[400px]">
        <div className="veil-soft absolute inset-0">
          <Image
            src={detailBand(detailHref)}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <Container className="relative py-16">
          <p
            className="display-ko max-w-2xl text-xl text-cream-100 md:text-2xl lg:text-[1.75rem]"
            data-reveal
          >
            원장님은 진료만 보셔도 됩니다.
            <br />
            나머지는 저희가 계속 지켜봅니다.
          </p>
        </Container>
      </section>

      {/* 04 ── 제공 산출물 / 측정 항목 */}
      <Section no="04" label="Deliverables" tone="paper">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div data-reveal>
            <Media
              label="산출물 예시"
              ratio="aspect-[16/10]"
              className="mb-10"
              src={whoImage(detailHref, 4)}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <H2>제공 산출물</H2>
            <ul className="mt-8 space-y-4">
              {(c?.deliverables ?? [null, null, null, null, null]).map((d, i) => (
                <li key={i} className="flex items-start gap-4 border-b border-ink-900/10 pb-4">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brass-500" />
                  {d ? (
                    <span className="prose-ko text-sm text-ink-700">{d}</span>
                  ) : (
                    <span className="h-2.5 flex-1 bg-ink-900/8" />
                  )}
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
              {(c?.metrics ?? [null, null, null, null]).map((m, i) => (
                <div
                  key={i}
                  className="border-r border-b border-ink-900/12 bg-cream-50 p-6"
                >
                  {m ? (
                    <>
                      <p className="text-sm font-medium text-ink-900">{m.label}</p>
                      <p className="prose-ko mt-2 text-xs text-ink-500">{m.note}</p>
                    </>
                  ) : (
                    <TextLines n={2} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* 원장님이 실제로 쓰시는 시간 — 철학을 숫자로 증명 */}
      {c?.yourTime && (
        <section className="bg-forest-800 text-cream-100">
          <Container className="py-20 md:py-24">
            <div className="grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
              <div data-reveal>
                <p className="label label-on-dark">Your time</p>
                <H2 className="mt-6 text-cream-100">
                  원장님이 쓰시는 시간은
                  <br />
                  {c.yourTime.summary}입니다.
                </H2>
                <p className="prose-ko mt-7 text-sm text-cream-100/70">
                  나머지는 저희가 가져갑니다. 원장님의 시간은 진료와 삶을 위해
                  남겨두세요.
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

      {/* 05 ── FAQ */}
      <Section no="05" label="FAQ">
        <H2>자주 묻는 질문</H2>
        <div className="mt-10 border-t border-ink-900/15">
          {(c?.faq ?? [null, null, null]).map((f, i) => (
            <details key={i} open={i === 0} className="border-b border-ink-900/15">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6">
                {f ? (
                  <span className="display-ko text-base md:text-lg">{f.q}</span>
                ) : (
                  <span className="h-3 w-2/3 bg-ink-900/8" />
                )}
                <span className="label shrink-0">+</span>
              </summary>
              <div className="max-w-3xl pb-7">
                {f ? (
                  <p className="prose-ko text-sm text-ink-500">{f.a}</p>
                ) : (
                  <TextLines n={3} />
                )}
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

      <CtaBand />
    </>
  );
}
