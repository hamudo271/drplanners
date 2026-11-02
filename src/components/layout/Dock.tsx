"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CONSULT as C } from "@/content/consult";
import { COMPANY, TEL_HREF } from "@/config/company";

/**
 * 화면에 계속 떠 있는 상담 창.
 *
 * 데스크톱: 우측 하단 버튼 → 그 위로 열리는 창
 * 모바일:   햄버거에 메뉴가 숨으므로 하단 고정 바를 두고, '문의'가 같은 창을 아래에서 올립니다
 *
 * 주 행동은 전 사이트에서 하나입니다 — 무료 병원 진단.
 * 창 안에서도, 하단 바에서도 채워진 버튼은 진단입니다.
 */
export function Dock({ kakaoUrl }: { kakaoUrl?: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const launcher = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const panel = useRef<HTMLDivElement>(null);

  const show = (el: HTMLElement) => {
    opener.current = el;
    setOpen(true);
  };
  const close = () => {
    setOpen(false);
    (opener.current ?? launcher.current)?.focus();
  };

  // 다른 페이지로 넘어가면 닫습니다
  const [seenPath, setSeenPath] = useState(pathname);
  if (seenPath !== pathname) {
    setSeenPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    panel.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      opener.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const onDiagnosis = pathname === "/diagnosis";
  const onContact = pathname === "/contact";

  return (
    <>
      {/* 모바일 하단 바가 푸터를 가리지 않도록 자리 확보 */}
      <div aria-hidden className="h-14 lg:hidden" />

      {open && <button type="button" className="cw-scrim" aria-label="상담 창 닫기" tabIndex={-1} onClick={close} />}

      {open && (
        <div ref={panel} id="consult-panel" className="cw-panel" role="dialog" aria-label="상담" tabIndex={-1}>
          <Panel kakaoUrl={kakaoUrl} onClose={close} onDiagnosis={onDiagnosis} onContact={onContact} />
        </div>
      )}

      {/* ── 데스크톱: 우측 하단 ── */}
      <button
        ref={launcher}
        type="button"
        className={`cw-launcher dock ${open ? "is-open" : ""}`}
        aria-expanded={open}
        aria-controls="consult-panel"
        aria-label={open ? "상담 창 닫기" : "상담 창 열기"}
        onClick={(e) => (open ? close() : show(e.currentTarget))}
      >
        <span className="cw-launcher-icon" aria-hidden="true">
          <svg className="cw-icon-chat" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
            <path d="M12 3.5c-5 0-9 3.4-9 7.7 0 2.5 1.4 4.7 3.5 6.1l-.7 3.2 3.6-1.8c.8.2 1.7.3 2.6.3 5 0 9-3.4 9-7.8s-4-7.7-9-7.7Z" />
          </svg>
          <svg className="cw-icon-close" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        </span>
        <span className="cw-launcher-label">
          <span>
            <span>{C.launcher}</span>
          </span>
        </span>
      </button>

      {/* ── 모바일: 하단 고정 바 ── */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 grid border-t border-brass-500/35 bg-cream-100 pb-[env(safe-area-inset-bottom)] lg:hidden ${
          !onContact && !onDiagnosis ? "grid-cols-2" : "grid-cols-1"
        }`}
      >
        {!onContact && (
          <button
            type="button"
            aria-expanded={open}
            aria-controls="consult-panel"
            onClick={(e) => show(e.currentTarget)}
            className="flex h-14 items-center justify-center gap-2.5 text-sm text-ink-900"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brass-500" aria-hidden />
            문의
          </button>
        )}
        {!onDiagnosis && (
          <Link href={C.diagnosis.href} className="flex h-14 items-center justify-center bg-forest-800 text-sm text-cream-100">
            무료 병원 진단
          </Link>
        )}
      </div>
    </>
  );
}

type Choice = (typeof C.choices)[number];

function Panel({
  kakaoUrl,
  onClose,
  onDiagnosis,
  onContact,
}: {
  kakaoUrl?: string;
  onClose: () => void;
  onDiagnosis: boolean;
  onContact: boolean;
}) {
  const [picked, setPicked] = useState<Choice | null>(null);
  const [typing, setTyping] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);

  // 답이 나타나면 그 자리까지 내립니다
  useEffect(() => {
    const el = scroller.current;
    if (!picked || !el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ top: el.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [picked, typing]);

  useEffect(() => {
    if (!typing) return;
    const t = setTimeout(() => setTyping(false), 650);
    return () => clearTimeout(t);
  }, [typing]);

  const pick = (c: Choice) => {
    setPicked(c);
    setTyping(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  };

  return (
    <>
      <header className="cw-head">
        <span className="cw-avatar">
          <Image src="/brand/mark-light.png" alt="" width={161} height={340} />
        </span>
        <span className="cw-head-text">
          <strong>{C.title}</strong>
          <span>{C.reply}</span>
        </span>
        <button type="button" className="cw-close" aria-label="상담 창 닫기" onClick={onClose}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        </button>
      </header>

      <div ref={scroller} className="cw-body">
        <div className="cw-thread" aria-live="polite">
          <p className="cw-bubble">
            {C.greeting.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </p>

          {!picked && (
            <ul className="cw-choices">
              {C.choices.map((c) => (
                <li key={c.q}>
                  <button type="button" className="cw-choice" onClick={() => pick(c)}>
                    {c.q}
                  </button>
                </li>
              ))}
            </ul>
          )}

          {picked && (
            <>
              <p className="cw-bubble cw-bubble--me">{picked.q}</p>
              {typing ? (
                <p className="cw-bubble cw-typing" aria-label="답변 준비 중">
                  <i /><i /><i />
                </p>
              ) : (
                <div className="cw-answer">
                  <p className="cw-bubble">{picked.answer}</p>
                  {picked.link && (
                    <Link href={picked.link.href} className="cw-link">
                      {picked.link.label}
                      <Chevron />
                    </Link>
                  )}
                  <button type="button" className="cw-restart" onClick={() => setPicked(null)}>
                    {C.restart}
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        <div className="cw-direct">
          <p className="cw-direct-title">{C.directTitle}</p>
          <ul className="cw-rows">
            {!onContact && (
              <li>
                <Link href={C.contact.href} className="cw-row">
                  <span className="cw-row-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4 20h4L19 9l-4-4L4 16v4ZM13 7l4 4" />
                    </svg>
                  </span>
                  <span className="cw-row-text">
                    <strong>{C.contact.label}</strong>
                    <span>{C.contact.sub}</span>
                  </span>
                  <Chevron />
                </Link>
              </li>
            )}
            <li>
              <a href={TEL_HREF} className="cw-row">
                <span className="cw-row-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.9v3a2 2 0 0 1-2.200 2 19.800 19.800 0 0 1-8.600-3.100 19.500 19.500 0 0 1-6-6A19.800 19.800 0 0 1 2.100 4.200 2 2 0 0 1 4.100 2h3a2 2 0 0 1 2 1.700c.1 1 .4 1.900.7 2.800a2 2 0 0 1-.5 2.100L8.100 9.900a16 16 0 0 0 6 6l1.300-1.300a2 2 0 0 1 2.100-.4c.9.3 1.800.6 2.800.7a2 2 0 0 1 1.700 2Z" />
                  </svg>
                </span>
                <span className="cw-row-text">
                  <strong>{C.tel.label}</strong>
                  <span className="tnum">{COMPANY.tel}</span>
                </span>
                <Chevron />
              </a>
            </li>
            {kakaoUrl && (
              <li>
                <a href={kakaoUrl} target="_blank" rel="noopener noreferrer" className="cw-row">
                  <span className="cw-row-icon cw-row-icon--kakao">
                    <KakaoIcon />
                  </span>
                  <span className="cw-row-text">
                    <strong>{C.kakao.label}</strong>
                    <span>{C.kakao.sub}</span>
                  </span>
                  <Chevron />
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      {!onDiagnosis && (
        <footer className="cw-foot">
          <Link href={C.diagnosis.href} className="cw-cta">
            <span>{C.diagnosis.label}</span>
            <small className="tnum">{C.diagnosis.sub}</small>
          </Link>
        </footer>
      )}
    </>
  );
}

function Chevron() {
  return (
    <svg className="cw-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m9 5 7 7-7 7" />
    </svg>
  );
}

function KakaoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 3C6.48 3 2 6.58 2 11c0 2.84 1.87 5.33 4.68 6.75-.2.75-.75 2.72-.86 3.14-.13.52.19.51.4.37.17-.11 2.67-1.81 3.75-2.55.66.1 1.34.15 2.03.15 5.52 0 10-3.58 10-8s-4.48-8-10-8z" />
    </svg>
  );
}
