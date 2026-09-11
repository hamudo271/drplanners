"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV, NAV_CTA } from "@/config/nav";

/** 사진 히어로 없이 밝은 배경으로 시작하는 페이지 */
const LIGHT_TOP = new Set(["/", "/diagnosis"]);

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  // 라우트가 바뀌면 모바일 메뉴를 닫습니다 (렌더 중 상태 조정 패턴)
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // 밝은 첫 화면(메인 히어로, 진단 폼)에서는 어두운 로고, 사진 히어로 위에서는 밝은 로고.
  const overHero = !LIGHT_TOP.has(pathname) && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      onKeyDown={(event) => { if (event.key === "Escape") setOpen(false); }}
      className={`site-header fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${ overHero ? "bg-transparent text-cream-100" : "border-b border-ink-900/10 bg-cream-100/95 text-ink-900 backdrop-blur" }`}
    >
      <div className="header-inner mx-auto flex h-20 w-full items-center gap-6 px-6 md:h-24 md:px-10">
        <Link href="/" className="shrink-0" aria-label="닥터플래너스 홈">
          <Image
            src={overHero ? "/brand/logo-light.png" : "/brand/logo.png"}
            alt="DR.PLANERS"
            width={1815}
            height={340}
            preload
            sizes="(max-width: 768px) 150px, 180px"
            className="h-7 w-auto md:h-8"
          />
          {/* 로고 아래 태그라인 — 무엇을 하는 회사인지 한 줄로 */}
          <span className="mt-1.5 hidden text-[10px] tracking-[0.06em] opacity-70 sm:block">
            병원 마케팅, 방향부터 결정합니다
          </span>
        </Link>

        <nav aria-label="주 메뉴" className="ml-auto hidden items-center xl:flex">
          {NAV.map((item) => (
            <div key={item.href} className="group relative">
              <Link
                href={item.href}
                aria-current={pathname === item.href || pathname.startsWith(`${item.href}/`) ? "page" : undefined}
                className="block px-2.5 py-8 text-sm tracking-[0.01em] whitespace-nowrap opacity-90 transition-opacity hover:opacity-100 2xl:px-4"
              >
                {/* 1536px 미만의 데스크톱에서는 축약 라벨을 씁니다 */}
                <span className="2xl:hidden">{item.label}</span>
                <span className="hidden 2xl:inline">{item.fullLabel}</span>
              </Link>

              {item.children && (
                <div className="invisible absolute top-full right-0 min-w-[248px] border border-ink-900/10 bg-cream-50 text-ink-900 opacity-0 shadow-[0_18px_40px_-18px_rgba(22,35,27,0.28)] transition-all duration-300 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <p className="label border-b border-ink-900/10 px-5 py-4">
                    {item.fullLabel}
                  </p>
                  <ul className="py-2">
                    {item.children.map((c) => (
                      <li key={c.href}>
                        <Link
                          href={c.href}
                          className="block px-5 py-2.5 text-sm"
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </nav>

        <Link
          href={NAV_CTA.href}
          className={`ml-auto hidden shrink-0 rounded-full border px-6 py-3 text-sm tracking-[0.04em] transition-colors duration-300 xl:ml-4 xl:block ${ overHero ? "border-cream-100/45 hover:border-cream-100" : "border-forest-800 bg-forest-800 text-cream-100 hover:bg-forest-700" }`}
        >
          {NAV_CTA.label}
        </Link>

        <button
          onClick={() => setOpen(!open)}
          className="ml-auto flex h-10 w-10 flex-col items-center justify-center gap-[5px] xl:hidden"
          type="button"
          aria-controls="mobile-navigation"
          aria-expanded={open}
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
        >
          <span
            className={`h-px w-6 bg-current transition-transform duration-300 ${open ? "translate-y-[3px] rotate-45" : ""}`}
          />
          <span
            className={`h-px w-6 bg-current transition-transform duration-300 ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {open && (
        <div id="mobile-navigation" className="max-h-[76vh] overflow-y-auto border-t border-ink-900/10 bg-cream-100 text-ink-900 xl:hidden">
          <div className="px-6 py-6 md:px-10">
            {NAV.map((item) => (
              <div key={item.href} className="border-b border-ink-900/10 py-4">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block text-sm"
                >
                  {item.fullLabel}
                </Link>
                {item.children && (
                  <ul className="mt-3 space-y-2 pl-4">
                    {item.children.map((c) => (
                      <li key={c.href}>
                        <Link
                          href={c.href}
                          onClick={() => setOpen(false)}
                          className="block text-sm text-ink-500"
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            <Link
              href={NAV_CTA.href}
              onClick={() => setOpen(false)}
              className="mt-6 block bg-forest-800 px-6 py-4 text-center text-sm text-cream-100"
            >
              {NAV_CTA.label}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
