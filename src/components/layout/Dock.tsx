"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * 화면에 계속 떠 있는 유틸리티.
 *
 * 데스크톱: 무료 진단 · 카카오톡 · 맨 위로
 * 모바일:   햄버거에 메뉴가 숨으므로, 하단 고정 바로 진입로만 남깁니다
 *
 * 주 행동은 전 사이트에서 하나입니다 — 무료 병원 진단.
 * 하단 바에서도 채워진 버튼(마지막 항목)이 진단이어야 합니다.
 */

/** 이미 그 페이지에 있는 진입로는 하단 바에서 지웁니다 */
const BAR_LINKS = [
  { href: "/contact", label: "문의" },
  { href: "/diagnosis", label: "무료 병원 진단" },
];

/**
 * 독 공통 셸.
 * 밝은 원형 버튼에 얇은 테두리와 그림자를 더해 사진 위에서도 읽히게 합니다.
 */
const DOCK_SHELL =
  "flex border border-ink-900/10 bg-cream-50/95 text-ink-900 shadow-[0_8px_28px_-8px_rgba(55,47,36,0.24)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-cream-200";

export function Dock({ kakaoUrl }: { kakaoUrl?: string }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  // 한 화면 이상 내려갔을 때만 '맨 위로'를 띄웁니다 — 상단에서는 군더더기입니다
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = BAR_LINKS.filter((l) => l.href !== pathname);

  return (
    <>
      {/* 모바일 하단 바가 푸터를 가리지 않도록 자리 확보 */}
      {links.length > 0 && <div aria-hidden className="h-14 lg:hidden" />}

      {/* ── 데스크톱: 우측 하단 ── */}
      <div className="dock fixed right-6 bottom-6 z-40 hidden flex-col items-end gap-3 lg:flex xl:right-10 xl:bottom-10">
        <Link href="/diagnosis" aria-label="무료 병원 진단" className={`${DOCK_SHELL} h-16 w-16 flex-col items-center justify-center gap-1 rounded-full`}>
          <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true"><path d="M20 11a8 8 0 0 1-8 8H5l-3 3V11a9 9 0 0 1 18 0Z" /><path d="M7 9h8M7 13h5" /></svg>
          <span className="text-[11px]">무료 진단</span>
        </Link>
        {kakaoUrl && (
          <a
            href={kakaoUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="카카오톡 채널 상담"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FAE100] text-[#191919] shadow-[0_8px_20px_-8px_rgba(22,35,27,0.45)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            <KakaoIcon />
          </a>
        )}

        {scrolled && (
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" })}
            aria-label="맨 위로"
            className={`${DOCK_SHELL} h-14 w-14 items-center justify-center rounded-full`}
          >
            ↑
          </button>
        )}
      </div>

      {/* ── 모바일: 하단 고정 바 ── */}
      {links.length > 0 && (
        <div
          className={`fixed inset-x-0 bottom-0 z-40 grid border-t border-brass-500/35 bg-cream-100 pb-[env(safe-area-inset-bottom)] lg:hidden ${
            links.length > 1 ? "grid-cols-2" : "grid-cols-1"
          }`}
        >
          {links.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              className={
                i === links.length - 1
                  ? "flex h-14 items-center justify-center bg-forest-800 text-sm text-cream-100"
                  : "flex h-14 items-center justify-center gap-2.5 text-sm text-ink-900"
              }
            >
              {i !== links.length - 1 && (
                <span className="h-1.5 w-1.5 rounded-full bg-brass-500" aria-hidden />
              )}
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

function KakaoIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 3C6.48 3 2 6.58 2 11c0 2.84 1.87 5.33 4.68 6.75-.2.75-.75 2.72-.86 3.14-.13.52.19.51.4.37.17-.11 2.67-1.81 3.75-2.55.66.1 1.34.15 2.03.15 5.52 0 10-3.58 10-8s-4.48-8-10-8z" />
    </svg>
  );
}
