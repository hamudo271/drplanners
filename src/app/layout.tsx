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
  title: "닥터플래너스 — A SANCTUARY FOR DOCTORS",
  description:
    "진료에 집중하세요. 그 밖의 성장은 우리가 설계합니다. 병원 브랜딩·마케팅·메디컬 AI를 하나의 계획으로 설계하는 닥터플래너스.",
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
