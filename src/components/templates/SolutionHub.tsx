import Link from "next/link";
import { Section, Media, IconBox, H2 } from "@/components/ui";
import { PageHero, CtaBand, findHub } from "./shared";
import { HUB_HERO, relatedWork, hubCard } from "@/config/images";
import { hubContent } from "@/content/solutions";

/** 템플릿 1 — 솔루션 허브 (/signature /branding /marketing /medical-ai) */
export function SolutionHub({ href }: { href: string }) {
  const hub = findHub(href);
  const c = hubContent(href);

  return (
    <>
      <PageHero
        crumbs={[{ label: hub.fullLabel }]}
        title={hub.fullLabel}
        lead={c?.lead ?? "이 영역에서 닥터플래너스가 제공하는 세부 솔루션입니다. 병원 상황에 따라 조합해 설계합니다."}
        mediaLabel={`${hub.fullLabel} 키비주얼`}
        mediaSrc={HUB_HERO[href]}
      />

      <Section no="01" label="Sub solutions">
        <div className="grid gap-px border border-ink-900/15 bg-ink-900/12 md:grid-cols-2">
          {hub.children?.map((c, i) => (
            <Link key={c.href} href={c.href} className="group bg-cream-100">
              <div className="overflow-hidden">
                <Media
                  label={c.label}
                  ratio="aspect-[16/9]"
                  src={hubCard(href, i)}
                  sizes="(max-width: 768px) 100vw, 50vw"
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
        </div>
      </Section>

      <Section no="02" label="Process" tone="paper">
        <H2>진행 방식</H2>
        <div className="mt-12 grid gap-px border-t border-l border-ink-900/12 md:grid-cols-4">
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
            </div>
          ))}
        </div>
      </Section>

      <Section no="03" label="Related works">
        <h2 className="text-2xl font-light md:text-3xl">관련 사례</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <article key={i} className="border border-ink-900/15">
              <Media
                label="케이스 썸네일"
                ratio="aspect-[4/3]"
                className="border-b!"
                src={relatedWork(href, i)}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="p-5">
                <p className="label">CASE {i + 1}</p>
                <p className="prose-ko mt-3 text-sm text-ink-500">
                  {c?.casesNote ?? "공개 가능한 사례부터 순차적으로 게재할 예정입니다."}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
