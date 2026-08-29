"use client";

import { useEffect } from "react";

/**
 * 스크롤 진입 리빌.
 *
 * 요구 조건:
 * 1. JS 실패 시 콘텐츠가 숨지 않는다 — html.js 클래스가 붙은 뒤에만 숨김 CSS 적용.
 * 2. 클라이언트 라우팅으로 갈아끼워진 페이지의 요소도 관찰한다 — MutationObserver.
 * 3. 뒤로가기 스크롤 복원 등으로 이미 뷰포트 위에 있는 요소는 즉시 표시한다
 *    (위쪽 요소는 IntersectionObserver 교차가 다시 일어나지 않기 때문).
 */
export function Reveal() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js");

    const seen = new WeakSet<Element>();
    const show = (el: Element) => el.classList.add("is-in");

    /* ── IO 미지원 브라우저: 전부 즉시 표시 ── */
    if (!("IntersectionObserver" in window)) {
      const showAll = () =>
        document.querySelectorAll("[data-reveal]").forEach(show);
      showAll();
      const mo = new MutationObserver(showAll);
      mo.observe(document.body, { childList: true, subtree: true });
      return () => mo.disconnect();
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            show(e.target);
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    const track = (el: Element) => {
      if (seen.has(el)) return;
      seen.add(el);
      // 이미 뷰포트 위를 지나간 요소는 관찰해도 교차 이벤트가 오지 않음 → 즉시 표시
      if (el.getBoundingClientRect().bottom < 0) {
        show(el);
        return;
      }
      io.observe(el);
    };

    const scan = (scope: ParentNode) => {
      if (scope instanceof Element && scope.matches("[data-reveal]")) track(scope);
      scope.querySelectorAll?.("[data-reveal]").forEach(track);
    };

    scan(document);

    // 라우팅·조건부 렌더로 추가되는 요소를 계속 수집
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((n) => {
          if (n.nodeType === 1) scan(n as Element);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      io.disconnect();
    };
  }, []);

  return null;
}
