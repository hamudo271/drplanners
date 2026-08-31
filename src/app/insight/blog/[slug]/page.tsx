import type { Metadata } from "next";
import { ArticleTemplate, RealArticle } from "@/components/templates/Insight";
import { articleBySlug } from "@/content/articles";
import { pageMeta, JsonLd, articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = articleBySlug(slug);
  if (!a)
    return pageMeta({
      title: "블로그",
      description: "닥터플래너스 실무 노트",
      path: "/insight/blog",
    });
  return pageMeta({
    title: a.title,
    description: a.excerpt,
    path: `${a.list}/${a.slug}`,
    type: "article",
    publishedTime: a.date.replace(/\./g, "-"),
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articleBySlug(slug);

  if (!article) return <ArticleTemplate backHref="/insight/blog" category="블로그" />;

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
          { name: article.category, path: article.list },
          { name: article.title, path: `${article.list}/${article.slug}` },
        ])}
      />
      <RealArticle article={article} />
    </>
  );
}
