import Link from "next/link";
import type { ReactNode } from "react";

/** 관리자 공용 조각 — 제목 줄, 카드, 상태 알약, 빈 상태 */

export function PageTitle({ title, sub, action }: { title: string; sub?: string; action?: ReactNode }) {
  return (
    <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-[22px] font-medium tracking-tight">{title}</h1>
        {sub && <p className="mt-1 text-sm text-ink-500">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-xl border border-ink-900/10 bg-white ${className}`}>{children}</div>;
}

const TONES = {
  forest: "bg-forest-800 text-cream-50",
  brass: "bg-brass-400/40 text-ink-900",
  muted: "bg-cream-200 text-ink-700",
  red: "bg-red-50 text-red-700",
} as const;

export function Pill({ tone, children }: { tone: keyof typeof TONES; children: ReactNode }) {
  return <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs whitespace-nowrap ${TONES[tone]}`}>{children}</span>;
}

export function Empty({ children }: { children: ReactNode }) {
  return <p className="px-6 py-14 text-center text-sm text-ink-500">{children}</p>;
}

export function PrimaryLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="rounded-lg bg-forest-800 px-4 py-2.5 text-sm text-cream-50 transition hover:bg-forest-700">
      {children}
    </Link>
  );
}

export function Tabs({ items, current }: { items: { href: string; label: string; key: string; count?: number }[]; current: string }) {
  return (
    <div className="mb-5 flex flex-wrap gap-1.5">
      {items.map((t) => (
        <Link
          key={t.key}
          href={t.href}
          aria-current={t.key === current ? "page" : undefined}
          className={`rounded-full border px-3.5 py-1.5 text-sm transition ${
            t.key === current
              ? "border-forest-800 bg-forest-800 text-cream-50"
              : "border-ink-900/15 bg-white text-ink-700 hover:border-ink-900/40"
          }`}
        >
          {t.label}
          {t.count !== undefined && <span className="ml-1.5 tabular-nums opacity-70">{t.count}</span>}
        </Link>
      ))}
    </div>
  );
}

/** "2026.10.30 14:05" — 한국 시간 (런타임 ICU 에 따라 구분자가 달라지지 않게 조각으로 조립) */
export function fmt(d: Date, withTime = true) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Seoul",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    })
      .formatToParts(d)
      .map((p) => [p.type, p.value]),
  );
  const date = `${parts.year}.${parts.month}.${parts.day}`;
  return withTime ? `${date} ${parts.hour}:${parts.minute}` : date;
}
