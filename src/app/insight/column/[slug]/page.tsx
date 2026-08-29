import { ArticleTemplate, RealArticle } from "@/components/templates/Insight";
import { articleBySlug } from "@/content/articles";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articleBySlug(slug);
  if (article) return <RealArticle article={article} />;
  return <ArticleTemplate backHref="/insight/column" category="칼럼" />;
}
