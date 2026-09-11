import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "메디컬 인사이트",
  description: "병원 마케팅을 바라보는 관점과 실무 기록. 플레이스 최적화, 의료광고 심의, 리포트 읽는 법까지 현장에서 검증한 내용만 정리합니다.",
  path: "/insight",
});

import Link from "next/link";
import { Section, Media } from "@/components/ui";
import { PageHero, CtaBand } from "@/components/templates/shared";
import { InsightTabs } from "@/components/templates/Insight";
import { HUB_HERO, INSIGHT } from "@/config/images";
import { ARTICLES, readingTime } from "@/content/articles";

/**
 * 읽을거리 허브 — 분류 안내 카드가 아니라 실제 글 목록.
 * 추천 글 하나를 크게, 나머지는 날짜순으로 전부 보여줍니다.
 * 글이 여덟 편뿐인데 "무엇을 다루나요" 카드로 가려두면 있는 것도 없어 보입니다.
 */
export default function Page() {
  const [featured, ...rest] = [...ARTICLES].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <>
      <PageHero
        crumbs={[{ label: "메디컬 인사이트" }]}
        title="읽을거리"
        lead="의료 마케팅에 대한 닥터플래너스의 관점과 실무 기록입니다."
        mediaLabel="인사이트 키비주얼"
        mediaSrc={HUB_HERO["/insight"]}
      />
      <InsightTabs current="/insight" />

      <Section no="01" label="추천 글">
        <Link
          href={`${featured.list}/${featured.slug}`}
          className="grid gap-8 border border-ink-900/15 md:grid-cols-2"
        >
          <Media
            label="대표 아티클 이미지"
            ratio="aspect-[4/3]"
            src={INSIGHT.featured}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="flex flex-col justify-center p-8">
            <p className="label tnum">
              {featured.category} · {featured.date} · {readingTime(featured)}분 읽기
            </p>
            <p className="display-ko mt-4 text-2xl leading-snug">{featured.title}</p>
            <p className="prose-ko mt-5 text-sm text-ink-500">{featured.excerpt}</p>
            <span className="label mt-8">읽어보기 →</span>
          </div>
        </Link>
      </Section>

      <Section no="02" label="최신 글" tone="paper">
        <div className="flex items-baseline justify-between" data-reveal>
          <h2 className="text-2xl font-light md:text-3xl">최신 글</h2>
          <p className="label tnum">전체 {ARTICLES.length}건</p>
        </div>
        <ol className="latest-list">
          {rest.map((a, i) => (
            <li key={a.slug} data-reveal style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}>
              <Link href={`${a.list}/${a.slug}`} className="latest-row group">
                <span className="label tnum latest-meta">
                  {a.category} · {a.date}
                </span>
                <span className="latest-text">
                  <span className="latest-title">{a.title}</span>
                  <span className="prose-ko latest-excerpt">{a.excerpt}</span>
                </span>
                <span className="label tnum latest-time">{readingTime(a)}분</span>
              </Link>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex flex-wrap gap-x-10 gap-y-3" data-reveal>
          <Link href="/insight/faq" className="editorial-link">
            자주 묻는 질문 <span aria-hidden="true">→</span>
          </Link>
          <Link href="/insight/notice" className="editorial-link">
            공지사항 <span aria-hidden="true">→</span>
          </Link>
        </div>
      </Section>

      <CtaBand kind="insight" />
    </>
  );
}
