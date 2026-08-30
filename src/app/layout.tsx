import type { Metadata } from "next";
import { Jost, Cormorant_Garamond, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/layout/Reveal";
import { SITE } from "@/config/site";

/* 영문 디스플레이 — 라이트 웨이트 + 넓은 트래킹 */
const jost = Jost({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});

/* 철학 섹션 등 세리프가 필요한 자리 */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-cormorant",
  display: "swap",
});

/* 한글 본문 */
const notoKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  variable: "--font-noto-kr",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | ${SITE.tagline}`,
    // 하위 페이지는 각자 title만 지정하면 여기에 자동으로 붙습니다
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "병원마케팅",
    "의원마케팅",
    "병원 브랜딩",
    "네이버 플레이스 최적화",
    "의료광고심의",
    "병원 홈페이지 제작",
    "메디컬 SEO",
    "개원 마케팅",
    "닥터플래너스",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} | ${SITE.tagline}`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | ${SITE.tagline}`,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

/** 검색·AI가 회사 정보를 읽을 수 있도록 구조화 데이터를 제공합니다 */
const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE.name,
  alternateName: SITE.nameEn,
  description: SITE.description,
  url: SITE.url,
  logo: `${SITE.url}/brand/logo.png`,
  image: `${SITE.url}/brand/logo.png`,
  slogan: "A SANCTUARY FOR DOCTORS",
  areaServed: { "@type": "Country", name: "대한민국" },
  knowsAbout: [
    "병원 마케팅",
    "의료광고 심의",
    "네이버 플레이스 최적화",
    "메디컬 SEO",
    "병원 브랜딩",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "병원 마케팅 솔루션",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "DRP 시그니처 — 병원 성장 플래닝" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "브랜딩 솔루션" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "마케팅 솔루션" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "메디컬 AI 솔루션" } },
    ],
  },
};

const siteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE.url,
  inLanguage: "ko-KR",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ko"
      className={`${jost.variable} ${cormorant.variable} ${notoKr.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
        <Reveal />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
