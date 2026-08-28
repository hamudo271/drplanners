import { Section, TextLines } from "@/components/ui";
import { PageHero, CtaBand } from "@/components/templates/shared";
import { InsightTabs } from "@/components/templates/Insight";

const GROUPS = ["계약 · 비용", "브랜딩", "마케팅", "메디컬 AI"];

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "메디컬 칼럼", href: "/insight" }, { label: "FAQ" }]}
        title="자주 묻는 질문"
        lead="원장님들이 가장 많이 물어보시는 내용을 모았습니다."
      />
      <InsightTabs current="/insight/faq" />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[220px_1fr]">
          {/* 카테고리 사이드 */}
          <nav className="h-fit border border-ink-900/15">
            {GROUPS.map((g, i) => (
              <span
                key={g}
                className={`block border-b border-ink-900/10 px-5 py-3.5 text-sm last:border-0 ${ i === 0 ? "bg-cream-50 font-medium" : "text-ink-500" }`}
              >
                {g}
              </span>
            ))}
          </nav>

          {/* 아코디언 — 네이티브 details 사용 (JS 불필요) */}
          <div className="border-t border-ink-900/15">
            {Array.from({ length: 8 }).map((_, i) => (
              <details key={i} open={i === 0} className="group border-b border-ink-900/15">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5">
                  <span className="flex flex-1 items-center gap-4">
                    <span className="label">Q</span>
                    <span className="h-3 w-2/3 rounded-sm bg-ink-900/8" />
                  </span>
                  <span className="label">+</span>
                </summary>
                <div className="flex gap-4 pb-6">
                  <span className="label pt-0.5">A</span>
                  <TextLines n={3} className="flex-1" />
                </div>
              </details>
            ))}
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
