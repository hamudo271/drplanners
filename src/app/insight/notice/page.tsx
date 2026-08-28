import { Section } from "@/components/ui";
import { PageHero, CtaBand } from "@/components/templates/shared";
import { InsightTabs } from "@/components/templates/Insight";

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "메디컬 칼럼", href: "/insight" }, { label: "공지사항" }]}
        title="공지사항"
        lead="닥터플래너스의 소식과 안내입니다."
      />
      <InsightTabs current="/insight/notice" />

      <Section>
        {/* 목록형 테이블 */}
        <div className="border-t-2 border-ink-900">
          <div className="label hidden grid-cols-[80px_1fr_120px] gap-4 border-b border-ink-900/15 py-4 md:grid">
            <span>NO</span>
            <span>제목</span>
            <span className="text-right">등록일</span>
          </div>
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="grid grid-cols-1 gap-2 border-b border-ink-900/10 py-5 md:grid-cols-[80px_1fr_120px] md:gap-4"
            >
              <span className="label">{10 - i}</span>
              <span className="h-3 w-3/4 rounded-sm bg-ink-900/8" />
              <span className="label md:text-right">2026.05.{String(20 - i).padStart(2, "0")}</span>
            </div>
          ))}
        </div>

        <div className="mt-12 flex items-center justify-center gap-2">
          {["‹", "1", "2", "3", "›"].map((p, i) => (
            <span
              key={p + i}
              className={`flex h-9 w-9 items-center justify-center border text-xs ${
                p === "1" ? "border-ink-900 bg-forest-800 text-white" : "border-ink-900/15 text-ink-500"
              }`}
            >
              {p}
            </span>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
