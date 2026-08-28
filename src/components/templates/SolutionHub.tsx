import Link from "next/link";
import { Section, Media, IconBox, TextLines } from "@/components/ui";
import { PageHero, CtaBand, findHub } from "./shared";
import { HUB_HERO, relatedWork } from "@/config/images";

/** 템플릿 1 — 솔루션 허브 (/signature /branding /marketing /medical-ai) */
export function SolutionHub({ href }: { href: string }) {
  const hub = findHub(href);

  return (
    <>
      <PageHero
        crumbs={[{ label: hub.fullLabel }]}
        title={hub.fullLabel}
        lead="이 영역에서 닥터플래너스가 제공하는 세부 솔루션입니다. 병원 상황에 따라 조합해 설계합니다."
        mediaLabel={`${hub.fullLabel} 키비주얼`}
        mediaSrc={HUB_HERO[href]}
      />

      <Section no="01" label="Sub solutions">
        <div className="grid gap-px border border-ink-900/15 bg-ink-900/12 md:grid-cols-2">
          {hub.children?.map((c, i) => (
            <Link key={c.href} href={c.href} className="group bg-cream-100 p-8">
              <span className="label">{String(i + 1).padStart(2, "0")}</span>
              <div className="mt-4 flex items-start gap-4">
                <IconBox size={40} />
                <div>
                  <p className="text-lg font-medium">{c.label}</p>
                  <p className="mt-1.5 text-sm text-ink-500">{c.blurb}</p>
                </div>
              </div>
              <TextLines n={2} className="mt-6" />
              <span className="label mt-6 block">자세히 보기 →</span>
            </Link>
          ))}
        </div>
      </Section>

      <Section no="02" label="Process" tone="paper">
        <h2 className="text-2xl font-light md:text-3xl">진행 방식</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-4">
          {["상담 · 진단", "전략 설계", "실행", "리포트 · 관리"].map((s, i) => (
            <div key={s} className="border border-ink-900/15 bg-cream-100 p-6">
              <span className="label">STEP {i + 1}</span>
              <p className="mt-3 text-base font-medium">{s}</p>
              <TextLines n={2} className="mt-4" />
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
                className="!border-0 !border-b"
                src={relatedWork(href, i)}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="p-5">
                <p className="label">CASE {i + 1}</p>
                <TextLines n={2} className="mt-3" />
              </div>
            </article>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
