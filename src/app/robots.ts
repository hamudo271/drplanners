import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    // 구글은 RSS도 사이트맵으로 받습니다 — 새 글이 더 빨리 잡힙니다
    sitemap: [`${SITE.url}/sitemap.xml`, `${SITE.url}${SITE.rss.path}`],
  };
}
