"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useActionState, useEffect, useId, useRef, useState } from "react";
import { submitQuickInquiry } from "@/app/contact/actions";
import { CONTACT_INITIAL } from "@/lib/contact";
import { BrassIcon } from "@/components/ui";

/**
 * 스크롤 내내 따라오는 문의 장치.
 * 데스크톱: 우측 하단 독 (빠른 문의 · 맨 위로 · 카카오톡)
 * 모바일:   하단 고정 바 (병원 진단 · 빠른 문의) + 바텀 시트
 */

/** 본 문의 폼이 있는 페이지에서는 띄우지 않습니다 */
const HIDDEN_ON = ["/contact"];

export function QuickContact({ kakaoUrl }: { kakaoUrl?: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  // 라우트가 바뀌면 닫습니다 (렌더 중 상태 조정 패턴)
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (HIDDEN_ON.includes(pathname)) return null;

  return (
    <>
      {/* 모바일 하단 바가 푸터를 가리지 않도록 자리 확보 */}
      <div aria-hidden className="h-14 lg:hidden" />

      {/* ── 데스크톱: 우측 하단 독 ── */}
      <div className="dock fixed right-6 bottom-6 z-40 hidden flex-col items-end gap-3 lg:flex xl:right-10 xl:bottom-10">
        {open && (
          <div
            id="quick-panel"
            role="dialog"
            aria-label="빠른 문의"
            className="mb-1 w-[360px] border border-ink-900/15 bg-cream-50 shadow-[0_24px_60px_-24px_rgba(22,35,27,0.35)]"
          >
            <PanelHead onClose={() => setOpen(false)} />
            <div className="px-6 py-6">
              <QuickForm page={pathname} />
            </div>
          </div>
        )}

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

        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="맨 위로"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-ink-900/15 bg-cream-50 text-ink-700 transition-colors duration-300 hover:border-ink-900/40 hover:text-ink-900"
        >
          ↑
        </button>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="quick-panel"
          className="flex h-12 items-center gap-3 bg-forest-800 px-6 text-[0.8125rem] tracking-[0.08em] text-cream-100 shadow-[0_12px_28px_-12px_rgba(22,35,27,0.5)] transition-colors duration-300 hover:bg-forest-700"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-brass-400" aria-hidden />
          {open ? "닫기" : "빠른 문의"}
        </button>
      </div>

      {/* ── 모바일: 하단 고정 바 ── */}
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-ink-900/10 bg-cream-100 pb-[env(safe-area-inset-bottom)] lg:hidden">
        <Link
          href="/diagnosis"
          className="flex h-14 items-center justify-center gap-2.5 text-sm text-ink-900"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-brass-500" aria-hidden />
          병원 진단
        </Link>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex h-14 items-center justify-center bg-forest-800 text-sm text-cream-100"
        >
          빠른 문의
        </button>
      </div>

      {/* ── 모바일: 바텀 시트 ── */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="닫기"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-forest-950/50"
          />
          <div
            role="dialog"
            aria-label="빠른 문의"
            className="sheet absolute inset-x-0 bottom-0 max-h-[88svh] overflow-y-auto bg-cream-50 pb-[env(safe-area-inset-bottom)]"
          >
            <PanelHead onClose={() => setOpen(false)} />
            <div className="px-6 py-6">
              <QuickForm page={pathname} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function PanelHead({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex items-center justify-between border-b border-ink-900/10 px-6 py-3.5">
      <span className="label">Quick inquiry</span>
      <button
        type="button"
        onClick={onClose}
        aria-label="닫기"
        className="-mr-2 flex h-10 w-10 items-center justify-center text-xl leading-none text-ink-500 transition-colors hover:text-ink-900"
      >
        ×
      </button>
    </div>
  );
}

/* ── 3필드 폼 — 본 폼(ContactForm)과 같은 방어 장치를 씁니다 ── */
function QuickForm({ page }: { page: string }) {
  const [state, formAction, pending] = useActionState(submitQuickInquiry, CONTACT_INITIAL);
  const mountedAt = useRef(0);
  const uid = useId();

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const action = (fd: FormData) => {
    fd.set("elapsed", mountedAt.current ? String(Date.now() - mountedAt.current) : "0");
    fd.set("page", page);
    return formAction(fd);
  };

  const err = (n: string) => state.errors?.[n]?.[0];
  const val = (n: string) => state.values?.text[n] ?? "";
  const id = (n: string) => `${uid}-${n}`;

  if (state.status === "success") {
    return (
      <div className="py-6 text-center" role="status">
        <div className="flex justify-center">
          <BrassIcon size={40} />
        </div>
        <p className="display-ko mt-5 text-lg">문의가 접수되었습니다.</p>
        <p className="prose-ko mt-2 text-sm text-ink-500">
          담당 플래너가 영업일 기준 1일 내에 연락드립니다.
        </p>
      </div>
    );
  }

  const inputCls = (hasError: boolean) =>
    [
      "mt-2 block h-11 w-full border bg-cream-100 px-3.5 text-base",
      "focus:outline-none focus:ring-2 focus:ring-forest-800 focus:ring-offset-1",
      hasError ? "border-ink-900" : "border-ink-900/15",
    ].join(" ");

  return (
    <form action={action} noValidate className="space-y-4">
      <p className="display-ko text-base text-ink-900">
        담당 플래너가 영업일 기준
        <br />
        1일 내에 연락드립니다.
      </p>

      {/* 봇 트랩 — 사람에게는 보이지 않습니다 */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          웹사이트
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {state.status === "error" && (
        <p role="alert" className="border border-ink-900 bg-cream-100 px-4 py-3 text-sm">
          {state.message}
        </p>
      )}

      <div>
        <label htmlFor={id("name")} className="block text-sm font-medium text-ink-900">
          성함 <span aria-hidden>*</span>
        </label>
        <input
          id={id("name")}
          name="name"
          type="text"
          autoComplete="name"
          defaultValue={val("name")}
          aria-invalid={!!err("name")}
          className={inputCls(!!err("name"))}
        />
        {err("name") && <p className="mt-1.5 text-sm text-ink-900">{err("name")}</p>}
      </div>

      <div>
        <label htmlFor={id("phone")} className="block text-sm font-medium text-ink-900">
          연락처 <span aria-hidden>*</span>
        </label>
        <input
          id={id("phone")}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="010-0000-0000"
          defaultValue={val("phone")}
          aria-invalid={!!err("phone")}
          className={inputCls(!!err("phone"))}
        />
        {err("phone") && <p className="mt-1.5 text-sm text-ink-900">{err("phone")}</p>}
      </div>

      <div>
        <label htmlFor={id("message")} className="block text-sm font-medium text-ink-900">
          문의 내용 <span aria-hidden>*</span>
        </label>
        <textarea
          id={id("message")}
          name="message"
          rows={3}
          placeholder="병원명과 궁금한 점을 한 줄로 남겨주세요."
          defaultValue={val("message")}
          aria-invalid={!!err("message")}
          className={`${inputCls(!!err("message"))} h-auto resize-none py-2.5 leading-relaxed`}
        />
        {err("message") && <p className="mt-1.5 text-sm text-ink-900">{err("message")}</p>}
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            name="consent"
            aria-invalid={!!err("consent")}
            className="mt-0.5 h-[18px] w-[18px] shrink-0 accent-forest-800"
          />
          <span className="text-sm leading-relaxed text-ink-700">
            개인정보 수집·이용에 동의합니다.
          </span>
        </label>
        {err("consent") && <p className="mt-1.5 text-sm text-ink-900">{err("consent")}</p>}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="flex h-12 w-full items-center justify-center gap-3 bg-forest-800 text-[0.8125rem] tracking-[0.08em] text-cream-100 transition-colors duration-300 hover:bg-forest-700 disabled:opacity-50"
      >
        {pending ? "접수 중…" : "문의 보내기"}
        <span aria-hidden>→</span>
      </button>

      <p className="text-center">
        <Link href="/contact" className="label transition-colors hover:text-ink-900">
          자세한 문의는 CONTACT →
        </Link>
      </p>
    </form>
  );
}

function KakaoIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 3C6.48 3 2 6.58 2 11c0 2.84 1.87 5.33 4.68 6.75-.2.75-.75 2.72-.86 3.14-.13.52.19.51.4.37.17-.11 2.67-1.81 3.75-2.55.66.1 1.34.15 2.03.15 5.52 0 10-3.58 10-8s-4.48-8-10-8z" />
    </svg>
  );
}
