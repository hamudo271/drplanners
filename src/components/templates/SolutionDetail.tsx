import { Section, Media, IconBox, TextLines } from "@/components/ui";
import { PageHero, CtaBand, findDetail } from "./shared";
import { detailHero, detailBody } from "@/config/images";

/** 템플릿 2 — 솔루션 상세 (하위 리프 16개 공통) */
export function SolutionDetail({
  hubHref,
  detailHref,
}: {
  hubHref: string;
  detailHref: string;
}) {
  const { hub, detail } = findDetail(hubHref, detailHref);

  return (
    <>
      <PageHero
        crumbs={[
          { label: hub.fullLabel, href: hub.href },
          { label: detail.label },
        ]}
        title={detail.label}
        lead={detail.blurb}
        mediaLabel={`${detail.label} 대표 이미지`}
        mediaSrc={detailHero(detailHref)}
      />

      {/* 이런 병원에 필요합니다 */}
      <Section no="01" label="Who needs this">
        <h2 className="text-2xl font-light md:text-3xl">이런 병원에 필요합니다</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="border border-ink-900/15 p-6">
              <IconBox size={36} />
              <TextLines n={2} className="mt-5" />
            </div>
          ))}
        </div>
      </Section>

      {/* 무엇을 하나 */}
      <Section no="02" label="What we do" tone="paper">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-light md:text-3xl">무엇을 하나요</h2>
            <TextLines n={4} className="mt-6" />
            <ul className="mt-8 space-y-3">
              {[0, 1, 2, 3].map((i) => (
                <li key={i} className="flex gap-3 border-b border-ink-900/10 pb-3">
                  <span className="label pt-0.5">0{i + 1}</span>
                  <TextLines n={1} className="flex-1" />
                </li>
              ))}
            </ul>
          </div>
          <Media
            label="작업 화면 / 산출물 예시"
            ratio="aspect-[4/3]"
            src={detailBody(detailHref)}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </Section>

      {/* 진행 프로세스 */}
      <Section no="03" label="Process">
        <h2 className="text-2xl font-light md:text-3xl">진행 프로세스</h2>
        <ol className="mt-10 grid gap-px border border-ink-900/15 bg-ink-900/12 md:grid-cols-4">
          {["진단", "설계", "실행", "관리"].map((s, i) => (
            <li key={s} className="bg-cream-100 p-6">
              <span className="label">STEP {i + 1}</span>
              <p className="mt-3 text-base font-medium">{s}</p>
              <TextLines n={2} className="mt-4" />
            </li>
          ))}
        </ol>
      </Section>

      {/* 산출물 / 결과 지표 */}
      <Section no="04" label="Deliverables" tone="paper">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <h2 className="text-2xl font-light md:text-3xl">제공 산출물</h2>
            <ul className="mt-6 space-y-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <li key={i} className="flex items-center gap-3 text-sm">
                  <span className="h-1 w-1 rounded-full bg-forest-800" />
                  <span className="h-3 flex-1 rounded-sm bg-ink-900/8" />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-light md:text-3xl">기대 지표</h2>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {["유입", "전환", "노출", "재방문"].map((m) => (
                <div key={m} className="border border-ink-900/15 bg-cream-100 p-5">
                  <p className="text-2xl font-medium">000%</p>
                  <p className="label mt-1">{m}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section no="05" label="FAQ">
        <h2 className="text-2xl font-light md:text-3xl">자주 묻는 질문</h2>
        <ul className="mt-8 border-t border-ink-900/15">
          {[0, 1, 2].map((i) => (
            <li key={i} className="flex items-center justify-between border-b border-ink-900/15 py-5">
              <span className="h-3 w-2/3 rounded-sm bg-ink-900/8" />
              <span className="label">+</span>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand />
    </>
  );
}
