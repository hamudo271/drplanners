import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "메디컬 인사이트",
  description: "병원 마케팅을 바라보는 관점과 실무 기록. 플레이스 최적화, 의료광고 심의, 리포트 읽는 법까지 현장에서 검증한 내용만 정리합니다.",
  path: "/insight",
});

import Image from "next/image";
import Link from "next/link";
import { Section, H2 } from "@/components/ui";
import { enFor } from "@/config/nav";
import { PageHero, CtaBand } from "@/components/templates/shared";
import { InsightTabs } from "@/components/templates/Insight";
import { HUB_HERO, INSIGHT } from "@/config/images";
import { ARTICLES, readingTime } from "@/content/articles";

/**
 * 인사이트 허브 — 분류 안내 카드가 아니라 실제 글 목록.
 * 추천 글 하나를 크게, 나머지는 날짜순으로 전부 보여줍니다.
 * 글이 여덟 편뿐인데 "무엇을 다루나요" 카드로 가려두면 있는 것도 없어 보입니다.
 */
export default function Page() {
  const [featured, ...rest] = [...ARTICLES].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <>
      <PageHero
        crumbs={[{ label: "메디컬 인사이트" }]}
        title="인사이트"
        en={enFor("/insight")}
        lead="의료 마케팅에 대한 닥터플래너스의 관점과 실무 기록입니다."
        mediaLabel="인사이트 키비주얼"
        mediaSrc={HUB_HERO["/insight"]}
      />
      <InsightTabs current="/insight" />

      <Section en="Featured">
        <Link href={`${featured.list}/${featured.slug}`} className="feature-card" data-reveal>
          <span className="feature-card-media">
            <Image
              src={INSIGHT.featured}
              alt=""
              fill
              sizes="(max-width: 767px) 100vw, 50vw"
              className="object-cover"
            />
          </span>
          <span className="feature-card-body">
            <span className="post-card-meta tnum">
              {featured.category} · {featured.date} · {readingTime(featured)}분 읽기
            </span>
            <span className="feature-card-title">{featured.title}</span>
            <span className="post-card-excerpt">{featured.excerpt}</span>
            <span className="post-card-more">VIEW MORE</span>
          </span>
        </Link>
      </Section>

      <Section en="Latest" tone="paper">
        <div className="flex items-baseline justify-between gap-6" data-reveal>
          <H2>최신 글</H2>
          <p className="post-count tnum">전체 {ARTICLES.length}건</p>
        </div>
        <ol className="ins-list">
          {rest.map((a, i) => (
            <li key={a.slug} data-reveal style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}>
              <Link href={`${a.list}/${a.slug}`} className="ins-row">
                <span className="ins-row-head">
                  <span className="ins-no tnum">{String(i + 1).padStart(2, "0")}</span>
                  <span className="ins-slash" aria-hidden="true" />
                  <span className="ins-row-title">{a.title}</span>
                </span>
                <span className="ins-row-meta tnum">
                  {a.category} · {a.date} · {readingTime(a)}분 읽기
                </span>
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
