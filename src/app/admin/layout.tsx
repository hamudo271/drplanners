import type { Metadata } from "next";

/** 관리자 — 검색엔진에 노출되지 않게 합니다 */
export const metadata: Metadata = {
  title: { absolute: "관리자 | 닥터플래너스" },
  robots: { index: false, follow: false },
};

export default function AdminRoot({ children }: { children: React.ReactNode }) {
  return <div className="admin min-h-screen bg-cream-100 font-sans text-ink-900">{children}</div>;
}
