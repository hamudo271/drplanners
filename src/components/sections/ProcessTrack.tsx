"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * 일하는 순서 — 옆으로 넘기는 카드 줄과 PREV / NEXT.
 *
 * 더가든은 Swiper를 쓰지만, 4장이라 브라우저의 scroll-snap 으로 충분합니다.
 * 터치·트랙패드로 그냥 밀어도 되고, 버튼은 카드 한 장씩 넘깁니다.
 *
 * 버튼 묶음과 카드 줄을 형제로(Fragment) 내보냅니다 — 부모 그리드가 버튼은
 * 왼쪽 제목 아래에, 카드 줄은 오른쪽에 따로 배치합니다.
 */
export function ProcessTrack({ children }: { children: ReactNode }) {
  const track = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () => {
      setAtStart(el.scrollLeft <= 4);
      setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const step = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".proc-card");
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const by = card ? card.offsetWidth + gap : el.clientWidth * 0.8;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * by, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <>
      <div className="proc-controls">
        <button type="button" className="proc-btn" onClick={() => step(-1)} disabled={atStart}>
          <svg width="52" height="12" viewBox="0 0 52 12" fill="none" aria-hidden="true">
            <path d="M51.6 10.5H1.2L10.3.4" stroke="currentColor" strokeWidth="1.1" />
          </svg>
          <span>PREV</span>
        </button>
        <button type="button" className="proc-btn" onClick={() => step(1)} disabled={atEnd}>
          <span>NEXT</span>
          <svg width="52" height="12" viewBox="0 0 52 12" fill="none" aria-hidden="true">
            <path d="M0 11.2h50.3L41.8.3" stroke="currentColor" strokeWidth="1.1" />
          </svg>
        </button>
      </div>
      <div ref={track} className="proc-track" tabIndex={0} aria-label="일하는 순서 카드 — 옆으로 넘겨 보세요">
        {children}
      </div>
    </>
  );
}
