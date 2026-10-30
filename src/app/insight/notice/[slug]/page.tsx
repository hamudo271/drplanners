import { articleMetadata, articlePage } from "@/components/templates/ArticlePage";

export const dynamic = "force-dynamic";

export const generateMetadata = articleMetadata("NOTICE");
export default articlePage("NOTICE");
