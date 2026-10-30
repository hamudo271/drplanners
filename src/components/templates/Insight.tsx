import Image from "next/image";
import Link from "next/link";
import { Section, Media, TextLines, BrassIcon, Button } from "@/components/ui";
import { PageHero, CtaBand, findHub } from "./shared";
import { enFor } from "@/config/nav";
import { INSIGHT, cardImage } from "@/config/images";
import type { FeedPost } from "@/lib/cms/posts";

/** 인사이트 4개 탭 — nav.ts에서 파생. 메인 인사이트와 같은 알약 버튼 */
export function InsightTabs({ current }: { current: string }) {
  const hub = findHub("/insight");
  return (
    <nav className="sx-tabs" aria-label="인사이트 분류">
      <div className="sx-tabs-inner">
        <Link href="/insight" className="ins-tab" aria-current={current === "/insight" ? "page" : undefined}>
          전체
        </Link>
        {hub.children?.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="ins-tab"
            aria-current={c.href === current ? "page" : undefined}
          >
            {c.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

/** 템플릿 4 — 목록 (칼럼 / 블로그) */
export function ListTemplate({
  href,
  title,
  lead,
  posts,
}: {
  href: string;
  title: string;
  lead: string;
  posts: FeedPost[];
}) {
  return (
    <>
      <PageHero crumbs={[{ label: "인사이트", href: "/insight" }, { label: title }]} title={title} en={enFor(href)} lead={lead} />
      <InsightTabs current={href} />

      <Section>
        {(() => {
          if (posts.length === 0) {
            return (
              <div className="sx-empty" data-reveal>
                <BrassIcon size={44} />
                <p className="display-ko mt-8 text-lg md:text-xl">
                  첫 글을 준비하고 있습니다.
                </p>
                <p className="prose-ko mt-4 max-w-md text-sm text-ink-500">
                  병원 마케팅 현장에서 검증한 내용만 정리해 올립니다.
                  먼저 발행된 칼럼부터 읽어보세요.
                </p>
                <Link href="/insight/column" className="mt-9">
                  <Button variant="outline">칼럼 보러 가기</Button>
                </Link>
              </div>
            );
          }
          return (
            <>
              <p className="post-count tnum" data-reveal>
                전체 {posts.length}건
              </p>

              <div className="post-grid">
                {posts.map((a, i) => (
                  <Link
                    key={a.slug}
                    href={`${href}/${a.slug}`}
                    className="post-card"
                    data-reveal
                    style={{ "--reveal-delay": `${(i % 3) * 100}ms` } as React.CSSProperties}
                  >
                    <span className="post-card-media">
                      <Image
                        src={a.thumbnail ?? cardImage(i)}
                        alt=""
                        fill
                        sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </span>
                    <span className="post-card-body">
                      <span className="post-card-meta tnum">
                        {a.category} · {a.date} · {a.minutes}분 읽기
                      </span>
                      <span className="post-card-title">{a.title}</span>
                      <span className="post-card-excerpt">{a.excerpt}</span>
                      <span className="post-card-more">VIEW MORE</span>
                    </span>
                  </Link>
                ))}
              </div>
            </>
          );
        })()}
      </Section>

      <CtaBand kind="insight" />
    </>
  );
}

/* ── 실제 아티클 뷰 — 관리자(DB) 글과 정적 글이 같은 HTML 본문을 씁니다 ─── */
export function RealArticle({ article }: { article: FeedPost }) {
  return (
    <>
      <article>
        <PageHero
          crumbs={[
            { label: "인사이트", href: "/insight" },
            { label: article.category, href: article.list },
            { label: article.title },
          ]}
          title={article.title}
          en={enFor(article.list)}
        />

        <Section>
          <div className="mx-auto max-w-[720px]">
            <div className="article-meta">
              <span className="tnum">
                {article.category} · {article.date} · {article.minutes}분 읽기
              </span>
              <span>DR.PLANERS</span>
            </div>

            {/* 본문 HTML 은 저장할 때 허용 태그만 남겨 둔 것입니다 (lib/cms/sanitize.ts) */}
            <div className="article-body" dangerouslySetInnerHTML={{ __html: article.html }} />

            <div className="article-foot">
              <Link href={article.list} className="more-btn">
                <span>목록으로</span>
                <svg width="7" height="8" viewBox="0 0 7 8" fill="currentColor" aria-hidden="true">
                  <path d="M7 4 0 8V0z" />
                </svg>
              </Link>
            </div>
          </div>
        </Section>
      </article>
      <CtaBand kind="insight" />
    </>
  );
}
