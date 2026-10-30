import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";
import { NAV, NAV_CTA } from "@/config/nav";
import { getFeed, BOARDS, boardByPath, type FeedPost } from "@/lib/cms/posts";
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
 * nav.ts와 인사이트 글(관리자 DB, 없으면 articles.ts)에서 자동 생성됩니다. 메뉴나 글이 추가되면 별도 수정 없이 반영됩니다.
 *
 * - lastmod: 글은 실제 발행일, 글 목록은 그 목록의 최신 글 날짜, 나머지는 배포 시각.
 *   구글은 lastmod가 정확할 때만 신뢰하므로 글에는 배포 시각을 쓰지 않습니다.
 * - image:image — 페이지 대표 사진을 함께 실어 이미지 검색에도 색인되게 합니다.
 * - priority·changefreq — 구글은 무시하지만 네이버는 참고하므로 남겨둡니다.
 */

const abs = (path: string) => (path.startsWith("http") ? path : `${SITE.url}${path}`);

/** 관리자에서 글을 발행하면 즉시 다시 만들고(revalidatePath), 그 외에는 한 시간마다 */
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const deployed = new Date();
  const posts = await getFeed();
  const newest = (list?: string) => {
    const top = list ? posts.find((p: FeedPost) => p.list === list) : posts[0];
    return top ? top.publishedAt : deployed;
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

  const insightLists = new Set<string>(Object.values(BOARDS).map((b) => b.path));

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
                lastModified: newest(boardByPath(c.href) ? c.href : undefined),
              })
            : c.href.startsWith("/insight/")
              ? entry(c.href, 0.5, "monthly")
              : entry(c.href, 0.7, "monthly", { image: detailHero(c.href) }),
        ),
    ),

    // 발행된 글 — 발행일이 곧 lastmod (관리자에서 올린 글 포함)
    ...posts.map((a) =>
      entry(`${a.list}/${a.slug}`, a.board === "NOTICE" ? 0.4 : 0.6, "yearly", {
        lastModified: a.publishedAt,
        image: a.thumbnail ?? INSIGHT.articleHero,
      }),
    ),

    entry("/contact", 0.6, "yearly", { image: CONTACT_HERO }),
    entry("/privacy", 0.2, "yearly"),
  ];
}
