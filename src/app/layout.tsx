import type { Metadata } from "next";
import { Jost, Cormorant_Garamond, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/layout/Reveal";

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
  title: "닥터플래너스 | Medical Growth Partner",
  description:
    "A SANCTUARY FOR DOCTORS — 병원은 더 성장하고, 원장님은 더 여유롭게. 병의원 브랜딩·마케팅·운영·성장을 설계합니다.",
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
        <Reveal />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
