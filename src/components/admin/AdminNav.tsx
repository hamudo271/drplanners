"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV = [
  { href: "/admin", label: "대시보드", exact: true },
  { href: "/admin/inquiries", label: "문의 · 진단" },
  { href: "/admin/posts", label: "글 목록" },
  { href: "/admin/posts/new", label: "새 글 쓰기", exact: true },
  { href: "/admin/stats", label: "방문 통계" },
];

/** 관리자 상단 바 — 로고 · 메뉴 · 사이트 보기 · 로그아웃 */
export function AdminNav({ newInquiries }: { newInquiries: number }) {
  const pathname = usePathname();
  const router = useRouter();

  const active = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || (pathname.startsWith(`${href}/`) && !pathname.endsWith("/new"));

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-20 border-b border-ink-900/10 bg-forest-900 text-cream-100">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 overflow-x-auto px-4 md:gap-6">
        <Link href="/admin" className="shrink-0 text-sm tracking-[0.08em] whitespace-nowrap">
          DR.PLANERS <span className="text-brass-400">관리자</span>
        </Link>
        <nav className="flex shrink-0 items-center gap-1">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={active(n.href, n.exact) ? "page" : undefined}
              className={`relative rounded-md px-2.5 py-1.5 text-sm whitespace-nowrap transition-colors md:px-3 ${
                active(n.href, n.exact) ? "bg-cream-100/12 text-cream-50" : "text-cream-100/70 hover:text-cream-50"
              }`}
            >
              {n.label}
              {n.href === "/admin/inquiries" && newInquiries > 0 && (
                <span className="ml-1.5 rounded-full bg-brass-500 px-1.5 py-0.5 text-[10px] text-forest-950 tabular-nums">
                  {newInquiries}
                </span>
              )}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex shrink-0 items-center gap-2">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-md px-3 py-1.5 text-sm whitespace-nowrap text-cream-100/70 hover:text-cream-50 md:block"
          >
            사이트 보기 ↗
          </a>
          <button
            type="button"
            onClick={logout}
            className="rounded-md border border-cream-100/25 px-3 py-1.5 text-sm whitespace-nowrap text-cream-100/85 hover:border-cream-100/60"
          >
            로그아웃
          </button>
        </div>
      </div>
    </header>
  );
}
