import type { Metadata } from "next";
import { SITE } from "@/config/site";

/**
 * 페이지 메타데이터 생성기.
 * title은 layout의 template(`%s | 닥터플래너스`)을 통해 자동 조합됩니다.
 */
export function pageMeta({
  title,
  description,
  path,
  type = "website",
  publishedTime,
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
}): Metadata {
  const url = `${SITE.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: SITE.locale,
      url,
      siteName: SITE.name,
      title: `${title} | ${SITE.name}`,
      description,
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE.name}`,
      description,
    },
  };
}

/** 아티클 구조화 데이터 */
export function articleJsonLd(a: {
  title: string;
  excerpt: string;
  date: string;
  path: string;
}) {
  // "2026.08.29" → "2026-08-29"
  const iso = a.date.replace(/\./g, "-");
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.excerpt,
    datePublished: iso,
    dateModified: iso,
    inLanguage: "ko-KR",
    author: { "@type": "Organization", name: SITE.name, url: SITE.url },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: { "@type": "ImageObject", url: `${SITE.url}/brand/logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE.url}${a.path}` },
  };
}

/** 브레드크럼 구조화 데이터 */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "홈", item: SITE.url },
      ...items.map((it, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: it.name,
        item: `${SITE.url}${it.path}`,
      })),
    ],
  };
}

/** FAQ 구조화 데이터 — 검색 결과에 문답이 펼쳐질 수 있습니다 */
export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** JSON-LD를 페이지에 심는 헬퍼 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
