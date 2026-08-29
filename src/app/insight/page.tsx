import Link from "next/link";
import { Section, Media, TextLines } from "@/components/ui";
import { PageHero, CtaBand, findHub } from "@/components/templates/shared";
import { InsightTabs } from "@/components/templates/Insight";
import { HUB_HERO, INSIGHT } from "@/config/images";
import { ARTICLES } from "@/content/articles";

export default function Page() {
  const hub = findHub("/insight");
  return (
    <>
      <PageHero
        crumbs={[{ label: "메디컬 칼럼" }]}
        title="THINKING FOR DOCTORS."
        lead="의료 마케팅에 대한 닥터플래너스의 관점과 실무 기록입니다."
        mediaLabel="인사이트 키비주얼"
        mediaSrc={HUB_HERO["/insight"]}
      />
      <InsightTabs current="/insight" />

      <Section no="01" label="Featured">
        <Link
          href={`/insight/column/${ARTICLES[0].slug}`}
          className="grid gap-8 border border-ink-900/15 md:grid-cols-2"
        >
          <Media
            label="대표 아티클 이미지"
            ratio="aspect-[4/3]"
            className=""
            src={INSIGHT.featured}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="flex flex-col justify-center p-8">
            <p className="label tnum">
              {ARTICLES[0].category} · {ARTICLES[0].date}
            </p>
            <p className="display-ko mt-4 text-2xl leading-snug">{ARTICLES[0].title}</p>
            <p className="prose-ko mt-5 text-sm text-ink-500">{ARTICLES[0].excerpt}</p>
            <span className="label mt-8">읽어보기 →</span>
          </div>
        </Link>
      </Section>

      {/* 4개 카테고리 각각 최신 3건 */}
      {hub.children?.map((c, idx) => (
        <Section key={c.href} no={String(idx + 2).padStart(2, "0")} label={c.label} tone={idx % 2 === 0 ? "paper" : "cream"}>
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-light md:text-3xl">{c.label}</h2>
            <Link href={c.href} className="label whitespace-nowrap">
              전체 보기 →
            </Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="border border-ink-900/15 bg-cream-100 p-5">
                <p className="label">2026.05.{String(20 - i).padStart(2, "0")}</p>
                <TextLines n={2} className="mt-3" />
              </div>
            ))}
          </div>
        </Section>
      ))}

      <CtaBand />
    </>
  );
}
