import { articleMetadata, articlePage } from "@/components/templates/ArticlePage";

export const dynamic = "force-dynamic";

export const generateMetadata = articleMetadata("BLOG");
export default articlePage("BLOG");
