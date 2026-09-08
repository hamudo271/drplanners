"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * 화면에 계속 떠 있는 유틸리티.
 *
 * 데스크톱: 맨 위로 · 카카오톡 (헤더에 contact 버튼이 늘 보이므로 문의는 두지 않습니다)
 * 모바일:   햄버거에 메뉴가 숨으므로, 하단 고정 바로 진단·문의 진입로만 남깁니다
 */

/** 이미 그 페이지에 있는 진입로는 하단 바에서 지웁니다 */
const BAR_LINKS = [
  { href: "/diagnosis", label: "병원 진단" },
  { href: "/contact", label: "문의하기" },
];

/**
 * 독 공통 셸.
 * 크림 섹션 위에서는 딥그린 덩어리로, 딥그린 섹션 위에서는 브라스 헤어라인과
 * 그림자로 형태가 남습니다 — 배경색과 같아져 사라지던 문제를 막습니다.
 */
const DOCK_SHELL =
  "flex border border-brass-500/35 bg-forest-900/92 text-cream-100 shadow-[0_14px_34px_-14px_rgba(6,14,9,0.75)] backdrop-blur-sm transition-[transform,border-color,background-color] duration-300 hover:-translate-y-0.5 hover:border-brass-400/70 hover:bg-forest-800/95";

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
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="맨 위로"
            className={`${DOCK_SHELL} h-12 w-12 items-center justify-center rounded-full`}
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
