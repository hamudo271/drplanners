import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";
import { NAV, NAV_CTA } from "@/config/nav";
import { ARTICLES, articleDate, latestArticles } from "@/content/articles";
import {
  HUB_HERO,
  detailHero,
  DIAGNOSIS_HERO,
  CONTACT_HERO,
  INSIGHT,
  HOME,
} from "@/config/images";

/**
 * 사이트맵 — 구글 서치 콘솔 · 네이버 서치어드바이저 제출용 (/sitemap.xml)
 *
 * nav.ts와 articles.ts에서 자동 생성됩니다. 메뉴나 글이 추가되면 별도 수정 없이 반영됩니다.
 *
 * - lastmod: 글은 실제 발행일, 글 목록은 그 목록의 최신 글 날짜, 나머지는 배포 시각.
 *   구글은 lastmod가 정확할 때만 신뢰하므로 글에는 배포 시각을 쓰지 않습니다.
 * - image:image — 페이지 대표 사진을 함께 실어 이미지 검색에도 색인되게 합니다.
 * - priority·changefreq — 구글은 무시하지만 네이버는 참고하므로 남겨둡니다.
 */

const abs = (path: string) => `${SITE.url}${path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const deployed = new Date();
  const newest = (list?: Parameters<typeof latestArticles>[0]) => {
    const top = latestArticles(list)[0];
    return top ? articleDate(top) : deployed;
  };

  type Entry = MetadataRoute.Sitemap[number];
  const entry = (
    path: string,
    priority: number,
    changeFrequency: Entry["changeFrequency"],
    opts: { lastModified?: Date; image?: string } = {},
  ): Entry => ({
    url: abs(path),
    lastModified: opts.lastModified ?? deployed,
    changeFrequency,
    priority,
    ...(opts.image ? { images: [abs(opts.image)] } : {}),
  });

  const insightLists = new Set<string>(["/insight/column", "/insight/blog"]);

  return [
    entry("/", 1, "weekly", { image: HOME.cta }),
    entry(NAV_CTA.href, 0.9, "monthly", { image: DIAGNOSIS_HERO }),

    // 대메뉴 허브
    ...NAV.map((item) =>
      item.href === "/insight"
        ? entry(item.href, 0.8, "weekly", { lastModified: newest(), image: HUB_HERO[item.href] })
        : entry(item.href, 0.8, "monthly", { image: HUB_HERO[item.href] }),
    ),

    // 하위 페이지 — 진단·문의 앵커는 제외
    ...NAV.flatMap((item) =>
      (item.children ?? [])
        .filter((c) => !c.href.includes("#"))
        .map((c) =>
          insightLists.has(c.href)
            ? entry(c.href, 0.7, "weekly", {
                lastModified: newest(c.href as Parameters<typeof latestArticles>[0]),
              })
            : c.href.startsWith("/insight/")
              ? entry(c.href, 0.5, "monthly")
              : entry(c.href, 0.7, "monthly", { image: detailHero(c.href) }),
        ),
    ),

    // 실제 발행된 아티클 — 발행일이 곧 lastmod
    ...ARTICLES.map((a) =>
      entry(`${a.list}/${a.slug}`, 0.6, "yearly", {
        lastModified: articleDate(a),
        image: INSIGHT.articleHero,
      }),
    ),

    entry("/contact", 0.6, "yearly", { image: CONTACT_HERO }),
    entry("/privacy", 0.2, "yearly"),
  ];
}
