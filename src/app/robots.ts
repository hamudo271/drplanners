import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // 내부 검토용 페이지는 색인에서 제외
      disallow: ["/sitemap-view"],
    },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
