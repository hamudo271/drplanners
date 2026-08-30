import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";
import { NAV, NAV_CTA } from "@/config/nav";
import { ARTICLES } from "@/content/articles";

/**
 * 사이트맵 — nav.ts와 articles.ts에서 자동 생성됩니다.
 * 메뉴나 글이 추가되면 별도 수정 없이 반영됩니다.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entry = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  ) => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });

  return [
    entry("/", 1, "weekly"),
    entry("/diagnosis", 0.9, "monthly"),
    entry(NAV_CTA.href, 0.9, "monthly"),

    // 대메뉴 허브
    ...NAV.map((item) => entry(item.href, 0.8, "monthly" as const)),

    // 하위 솔루션 상세 — 진단·문의 앵커는 제외
    ...NAV.flatMap((item) =>
      (item.children ?? [])
        .filter((c) => !c.href.includes("#"))
        .map((c) => entry(c.href, 0.7, "monthly" as const)),
    ),

    // 실제 발행된 아티클
    ...ARTICLES.map((a) => entry(`${a.list}/${a.slug}`, 0.6, "monthly" as const)),
  ];
}
