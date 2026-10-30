import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { after } from "next/server";
import type { PostBoard } from "@prisma/client";
import { RealArticle } from "./Insight";
import { getPost, countView, BOARDS } from "@/lib/cms/posts";
import { pageMeta, JsonLd, articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { SITE } from "@/config/site";

/**
 * 칼럼 · 블로그 · 공지사항 상세가 공유하는 페이지.
 * 없는 글은 404 — 예전처럼 빈 템플릿을 그리면 검색엔진이 빈 페이지를 색인합니다.
 */
type Params = { params: Promise<{ slug: string }> };

export function articleMetadata(board: PostBoard) {
  return async ({ params }: Params): Promise<Metadata> => {
    const { slug } = await params;
    const a = await getPost(board, decodeURIComponent(slug));
    if (!a) return { title: "글을 찾을 수 없습니다", robots: { index: false } };
    const meta = pageMeta({
      title: a.title,
      description: a.excerpt,
      path: `${a.list}/${a.slug}`,
      type: "article",
      publishedTime: a.publishedAt.toISOString(),
    });
    if (a.thumbnail) {
      const image = a.thumbnail.startsWith("/") ? `${SITE.url}${a.thumbnail}` : a.thumbnail;
      meta.openGraph = { ...meta.openGraph, images: [image] };
      meta.twitter = { ...meta.twitter, images: [image] };
    }
    return meta;
  };
}

export function articlePage(board: PostBoard) {
  return async function Page({ params }: Params) {
    const { slug } = await params;
    const article = await getPost(board, decodeURIComponent(slug));
    if (!article) notFound();

    // 응답을 보낸 뒤에 조회수를 올립니다 — 페이지 속도에 영향 없음
    after(() => countView(article.id));

    return (
      <>
        <JsonLd
          data={articleJsonLd({
            title: article.title,
            excerpt: article.excerpt,
            date: article.date,
            path: `${article.list}/${article.slug}`,
          })}
        />
        <JsonLd
          data={breadcrumbJsonLd([
            { name: "메디컬 인사이트", path: "/insight" },
            { name: BOARDS[board].label, path: article.list },
            { name: article.title, path: `${article.list}/${article.slug}` },
          ])}
        />
        <RealArticle article={article} />
      </>
    );
  };
}
