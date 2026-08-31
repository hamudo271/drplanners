"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV, NAV_CTA } from "@/config/nav";

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

  /** 모든 페이지가 다크 히어로로 시작하므로, 상단에서는 투명 + 밝은 로고 */
  const overHero = !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${ overHero ? "bg-transparent text-cream-100" : "border-b border-ink-900/10 bg-cream-100/95 text-ink-900 backdrop-blur" }`}
    >
      <div className="mx-auto flex h-20 w-full max-w-[1280px] items-center gap-6 px-6 md:h-24 md:px-10 lg:px-14">
        <Link href="/" className="shrink-0" aria-label="닥터플래너스 홈">
          <Image
            src={overHero ? "/brand/logo-light.png" : "/brand/logo.png"}
            alt="DR.PLANERS"
            width={1815}
            height={340}
            priority
            className="h-7 w-auto md:h-8"
          />
          {/* 시안: 로고 아래 태그라인 */}
          <span className="mt-1.5 hidden text-[9px] tracking-[0.28em] opacity-70 sm:block">
            A SANCTUARY FOR DOCTORS
          </span>
        </Link>

        <nav className="ml-auto hidden items-center lg:flex">
          {NAV.map((item) => (
            <div key={item.href} className="group relative">
              <Link
                href={item.href}
                className="block px-2.5 py-8 text-[0.8125rem] tracking-[0.02em] whitespace-nowrap opacity-90 transition-opacity hover:opacity-100 xl:px-3.5 xl:tracking-[0.04em]"
              >
                {/* 1280px 미만에서는 대표 명칭이 다 들어가지 않아 축약 라벨을 씁니다 */}
                <span className="xl:hidden">{item.label}</span>
                <span className="hidden xl:inline">{item.fullLabel}</span>
              </Link>

              {item.children && (
                <div className="invisible absolute top-full left-0 min-w-[248px] border border-ink-900/10 bg-cream-50 text-ink-900 opacity-0 shadow-[0_18px_40px_-18px_rgba(22,35,27,0.28)] transition-all duration-300 group-hover:visible group-hover:opacity-100">
                  <p className="label border-b border-ink-900/10 px-5 py-4">
                    {item.fullLabel}
                  </p>
                  <ul className="py-2">
                    {item.children.map((c) => (
                      <li key={c.href}>
                        <Link
                          href={c.href}
                          className="block px-5 py-2.5 text-sm transition-colors hover:bg-cream-200"
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
          className={`ml-auto hidden shrink-0 border px-6 py-3 text-xs tracking-[0.08em] transition-colors duration-300 lg:ml-6 lg:block ${ overHero ? "border-cream-100/45 hover:border-cream-100" : "border-forest-800 bg-forest-800 text-cream-100 hover:bg-forest-700" }`}
        >
          {NAV_CTA.label}
        </Link>

        <button
          onClick={() => setOpen(!open)}
          className="ml-auto flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden"
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
        <div className="max-h-[76vh] overflow-y-auto border-t border-ink-900/10 bg-cream-100 text-ink-900 lg:hidden">
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
