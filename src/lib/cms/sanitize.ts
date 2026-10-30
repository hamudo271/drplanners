import "server-only";
import sanitizeHtml from "sanitize-html";

/**
 * 에디터 본문 정리 — 에디터가 만드는 태그만 남깁니다.
 * 붙여넣기로 딸려 온 스타일·스크립트·iframe 은 모두 걷어냅니다.
 */
export function cleanHtml(html: string) {
  return sanitizeHtml(html, {
    allowedTags: [
      "p", "br", "h2", "h3", "strong", "em", "s", "u", "code", "pre",
      "ul", "ol", "li", "blockquote", "a", "img", "hr",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: ["src", "alt", "title"],
    },
    allowedSchemes: ["https", "http", "mailto", "tel"],
    allowedSchemesByTag: { img: ["https", "http"] },
    allowProtocolRelative: false,
    transformTags: {
      // 바깥 링크는 새 창 + 검색 순위 넘기지 않기, 사이트 안 링크는 그대로
      a: (_tag, attribs) => {
        const href = attribs.href ?? "";
        const internal = href.startsWith("/") || href.startsWith("https://dr-planners.com");
        const out: Record<string, string> = internal
          ? { href }
          : { href, target: "_blank", rel: "noopener noreferrer nofollow" };
        return { tagName: "a", attribs: out };
      },
    },
  }).trim();
}

/** 태그를 걷어낸 순수 글 — 요약 · 읽는 시간 계산용 */
export function stripHtml(html: string) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

export function makeExcerpt(excerpt: string | null | undefined, html: string, max = 150) {
  const src = excerpt?.trim() || stripHtml(html);
  return src.length > max ? `${src.slice(0, max - 1).trimEnd()}…` : src;
}
