"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** 관리자 화면에서는 공개 사이트의 헤더 · 푸터 · 독을 그리지 않습니다 */
export function HideOnAdmin({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return pathname.startsWith("/admin") ? null : <>{children}</>;
}
