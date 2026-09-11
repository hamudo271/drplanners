import Link from "next/link";
import { Section, Media, IconBox, H2, Button } from "@/components/ui";
import { PageHero, CtaBand, findHub } from "./shared";
import { HubDiagram, hasHubDiagram } from "@/components/sections/HubDiagram";
import { HUB_HERO, hubCard } from "@/config/images";
import { hubContent } from "@/content/solutions";

/** 템플릿 1 — 솔루션 허브 (/signature /branding /marketing /medical-ai) */
export function SolutionHub({ href }: { href: string }) {
  const hub = findHub(href);
  const c = hubContent(href);

  const items = hub.children ?? [];
  // 3열 기준으로 남는 칸 수 (5개 → 1칸)
  const fillers = (3 - (items.length % 3)) % 3;

  // 섹션 번호 — 환자 여정이 있는 허브는 뒤 섹션이 한 칸씩 밀립니다
  let n = 0;
  const no = () => String(++n).padStart(2, "0");

  return (
    <>
      <PageHero
        crumbs={[{ label: hub.fullLabel }]}
        title={hub.fullLabel}
        lead={c?.lead ?? "이 영역에서 닥터플래너스가 제공하는 세부 솔루션입니다. 병원 상황에 따라 조합해 설계합니다."}
        mediaLabel={`${hub.fullLabel} 키비주얼`}
        mediaSrc={HUB_HERO[href]}
      />

      <Section no={no()} label="세부 서비스">
        {/* 3열 — 3의 배수가 아닌 허브(5개)는 남는 칸을 진단 안내 카드로 채워 빈 칸을 없앱니다 */}
        <div className="grid border-t border-l border-ink-900/15 md:grid-cols-2 lg:grid-cols-3">
          {items.map((c, i) => (
            <Link
              key={c.href}
              href={c.href}
              className="group border-r border-b border-ink-900/15 bg-cream-100"
            >
              <div className="media-more overflow-hidden" data-more="MORE">
                <Media
                  label={c.label}
                  ratio="aspect-[16/10]"
                  src={hubCard(href, i)}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
              </div>
              <div className="p-8">
                <span className="label tnum">{String(i + 1).padStart(2, "0")}</span>
                <div className="mt-4 flex items-start gap-4">
                  <IconBox size={36} />
                  <div>
                    <p className="display-ko text-lg">{c.label}</p>
                    <p className="prose-ko mt-1.5 text-sm text-ink-500">{c.blurb}</p>
                  </div>
                </div>
                <span className="label mt-7 block">자세히 보기 →</span>
              </div>
            </Link>
          ))}

          {Array.from({ length: fillers }).map((_, i) => (
            <Link
              key={`filler-${i}`}
              href="/diagnosis"
              className="group flex min-h-[320px] flex-col justify-between border-r border-b border-ink-900/15 bg-forest-800 p-8 text-cream-100"
            >
              <p className="label label-on-dark">어떤 조합이 맞을지 모르겠다면</p>
              <div>
                <p className="display-ko text-xl">
                  5가지 항목으로
                  <br />
                  지금 위치부터 확인하세요.
                </p>
                <p className="prose-ko mt-4 text-sm text-cream-100/65">
                  약 3분. 자동 점수가 아니라 담당 플래너가 직접 읽고 회신합니다.
                </p>
                <span className="label label-on-dark mt-10 block transition-colors group-hover:text-cream-100">
                  병원 진단 시작하기 →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* 허브별 고유 도식 — 브랜딩 접점 맵 / 마케팅 예산 흐름 / 메디컬 AI 노출 구조.
          세 허브가 카드 목록만 반복하지 않도록 페이지마다 형태를 다르게 둡니다. */}
      {hasHubDiagram(href) && <HubDiagram href={href} no={no()} />}

      {/* 환자 여정 — 우리 솔루션이 어느 단계에 붙는지 */}
      {c?.journey && (
        <Section no={no()} label="환자가 오는 길" tone="forest">
          <div
            className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end"
            data-reveal
          >
            <H2 className="text-cream-100">{c.journey.title}</H2>
            <p className="prose-ko text-sm text-cream-100/70">{c.journey.lead}</p>
          </div>

          <ol className="mt-14 grid gap-px border-t border-l border-cream-100/15 sm:grid-cols-2 lg:grid-cols-3">
            {c.journey.steps.map((s, i) => (
              <li
                key={s.title}
                className="flex flex-col border-r border-b border-cream-100/15 p-7"
                data-reveal
                style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
              >
                <span className="display-serif tnum text-3xl leading-none text-brass-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="display-ko mt-4 text-xl text-cream-100">{s.title}</p>
                <p className="prose-ko mt-2.5 text-[15px] text-cream-100/70">{s.body}</p>

                <div className="mt-auto pt-7">
                  <p className="label label-on-dark">
                    {s.ours.length ? "저희가 붙는 자리" : "아직 병원 이름을 모릅니다"}
                  </p>
                  {s.ours.length > 0 && (
                    <ul className="mt-3 space-y-1.5">
                      {s.ours.map((o) => (
                        <li key={o.href + o.label}>
                          <Link
                            href={o.href}
                            className="text-sm text-cream-100/85 underline-offset-4 transition-colors hover:text-cream-100 hover:underline"
                          >
                            {o.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>

          <div
            className="mt-12 flex flex-wrap items-center justify-between gap-6"
            data-reveal
          >
            <p className="display-ko max-w-2xl text-lg text-cream-100 md:text-xl">
              {c.journey.closing}
            </p>
            <Link href="/diagnosis" className="shrink-0">
              <Button variant="light">병원 진단 시작하기</Button>
            </Link>
          </div>
        </Section>
      )}

      {href === "/signature" && c ? (
        /* 회사 이름이 곧 프로세스 — 카드 격자가 아니라 여섯 글자가 이끄는 도식으로 */
        <Section no={no()} label="진행 순서" tone="paper">
          <div className="editorial-section-heading" data-reveal>
            <div>
              <h2 className="editorial-title">{c.processTitle}</h2>
            </div>
            <p className="editorial-intro">
              여섯 단계를 전부 더해도 원장님이 움직이실 시간은 채 10분이 되지 않습니다.
              각 단계 아래에 원장님이 실제로 하실 일을 적었습니다.
            </p>
          </div>
          <ol className="plan-steps">
            {c.process.map((step, i) => {
              const [letter, rest] = step.title.split(" — ");
              return (
                <li
                  key={step.title}
                  className="plan-step"
                  data-reveal
                  style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}
                >
                  <span className="display-serif plan-letter">{letter}</span>
                  <p className="plan-step-title">{rest}</p>
                  <p className="prose-ko plan-step-body">{step.body}</p>
                  {step.you && <p className="plan-step-you">{step.you}</p>}
                </li>
              );
            })}
          </ol>
        </Section>
      ) : (
      <Section no={no()} label="진행 순서" tone="paper">
        <H2>{c?.processTitle ?? "진행 방식"}</H2>
        <div
          className={`mt-12 grid gap-px border-t border-l border-ink-900/12 ${
            (c?.process.length ?? 4) > 4 ? "sm:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-4"
          }`}
        >
          {(c?.process ?? [
            { title: "상담 · 진단", body: "" },
            { title: "전략 설계", body: "" },
            { title: "실행", body: "" },
            { title: "리포트 · 관리", body: "" },
          ]).map((step, i) => (
            <div
              key={step.title}
              className="border-r border-b border-ink-900/12 bg-cream-100 p-7"
              data-reveal
              style={{ "--reveal-delay": `${i * 110}ms` } as React.CSSProperties}
            >
              <span className="label tnum">STEP {i + 1}</span>
              <p className="display-ko mt-4 text-lg">{step.title}</p>
              {step.body && (
                <p className="prose-ko mt-3 text-sm text-ink-500">{step.body}</p>
              )}
              {step.you && (
                <p className="label mt-5 text-brass-600!">{step.you}</p>
              )}
            </div>
          ))}
        </div>
      </Section>
      )}

      <CtaBand kind="service" />
    </>
  );
}
