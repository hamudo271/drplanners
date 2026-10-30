import { SITE } from "@/config/site";
import { COMPANY } from "@/config/company";
import { INSIGHT } from "@/config/images";
import { getFeed, type FeedPost } from "@/lib/cms/posts";

/**
 * RSS 2.0 피드 — 네이버 서치어드바이저 "RSS 제출" · 구글 서치 콘솔 사이트맵 제출용 (/rss.xml)
 *
 * 네이버는 RSS로 새 글을 빠르게 수집하고, 본문이 들어 있을수록 잘 읽습니다.
 * 그래서 요약(description)만이 아니라 전문(content:encoded)을 함께 싣습니다.
 * 글은 관리자(DB)에서, DB가 없으면 articles.ts 에서 옵니다.
 * 발행하면 즉시 다시 만들고(revalidatePath), 그 외에는 한 시간마다 갱신합니다.
 */
export const revalidate = 3600;

const FEED_PATH = "/rss.xml";
const FEED_TITLE = `${SITE.name} 인사이트`;
const FEED_DESC =
  "병원 마케팅 플래닝 회사 닥터플래너스의 칼럼과 실무 노트. 네이버 플레이스, 의료광고심의, 병원 블로그, 광고 운영을 원장님 입장에서 정리합니다.";

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

/** CDATA 안에 "]]>"가 들어가면 구간이 끊기므로 쪼개서 이어 붙입니다 */
const cdata = (s: string) => `<![CDATA[${s.replace(/]]>/g, "]]]]><![CDATA[>")}]]>`;

/** 본문 속 /media/... 같은 상대 주소는 리더기에서 깨지므로 절대 주소로 바꿉니다 */
const absolutize = (html: string) => html.replace(/(src|href)="\/(?!\/)/g, `$1="${SITE.url}/`);

function item(a: FeedPost) {
  const url = `${SITE.url}${a.list}/${a.slug}`;
  const thumb = a.thumbnail ?? INSIGHT.articleHero;
  const image = thumb.startsWith("/") ? `${SITE.url}${thumb}` : thumb;
  const body =
    `<p><img src="${image}" alt="${esc(a.title)}" /></p>` +
    absolutize(a.html) +
    `\n<p><a href="${SITE.url}/diagnosis">무료 병원 진단 받기 →</a></p>`;

  return `    <item>
      <title>${esc(a.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${a.publishedAt.toUTCString()}</pubDate>
      <dc:creator>${esc(SITE.name)}</dc:creator>
      <category>${esc(a.category)}</category>
      <description>${cdata(a.excerpt)}</description>
      <content:encoded>${cdata(body)}</content:encoded>
      <media:content url="${image}" medium="image" />
    </item>`;
}

export async function GET() {
  const articles = await getFeed();
  const updated = articles[0]?.publishedAt ?? new Date();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>${esc(FEED_TITLE)}</title>
    <link>${SITE.url}/insight</link>
    <description>${esc(FEED_DESC)}</description>
    <language>ko-KR</language>
    <copyright>© ${updated.getFullYear()} ${esc(COMPANY.legalName)}</copyright>
    <managingEditor>${COMPANY.email} (${esc(SITE.name)})</managingEditor>
    <webMaster>${COMPANY.email} (${esc(SITE.name)})</webMaster>
    <category>병원마케팅</category>
    <lastBuildDate>${updated.toUTCString()}</lastBuildDate>
    <pubDate>${updated.toUTCString()}</pubDate>
    <ttl>720</ttl>
    <atom:link href="${SITE.url}${FEED_PATH}" rel="self" type="application/rss+xml" />
    <image>
      <url>${SITE.url}/brand/logo.png</url>
      <title>${esc(FEED_TITLE)}</title>
      <link>${SITE.url}/insight</link>
    </image>
${articles.map(item).join("\n")}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
