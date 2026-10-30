"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * 자체 방문 통계 신호 — 쿠키 · 이름 · 주소 없이, 브라우저가 만든 임의 번호 두 개만 씁니다.
 *   방문자 번호(v): localStorage 에 두고 재방문을 구분
 *   방문 번호(s):  30분 동안 다음 페이지가 없거나, 다른 곳 · 태그 붙은 링크로 다시 들어오면 새로
 * 페이지마다 한 번 보내고(/api/v), 전화 · 카카오 · 지도 · SNS · 바깥 링크 클릭도 보냅니다.
 * 문의 · 진단 폼은 window.drpTrack 으로 같은 번호를 받아 접수에 붙입니다.
 */

const KEY = "drp-a";
type State = { v?: string; s?: string; t?: number; rh?: string };

declare global {
  interface Window {
    drpTrack?: { ids: () => { vid: string; sid: string }; send: (k: string, t?: string) => void };
  }
}

const rid = () => {
  try {
    return Array.from(crypto.getRandomValues(new Uint32Array(4)), (n) => n.toString(36)).join("").slice(0, 20);
  } catch {
    return (Math.random().toString(36).slice(2) + Date.now().toString(36)).slice(0, 20);
  }
};

let st: State = {};
const load = () => {
  try {
    st = (JSON.parse(localStorage.getItem(KEY) ?? "{}") as State) || {};
  } catch {
    st = {};
  }
};
const save = () => {
  try {
    localStorage.setItem(KEY, JSON.stringify(st));
  } catch {
    /* 사생활 보호 모드 — 이 페이지는 그래도 셉니다 */
  }
};

const send = (extra: Record<string, string | undefined>) => {
  if (!st.v || !st.s) return;
  const body = JSON.stringify({ v: st.v, s: st.s, p: location.pathname, ...extra });
  try {
    if (navigator.sendBeacon?.("/api/v", body)) return;
  } catch {
    /* 아래로 */
  }
  fetch("/api/v", { method: "POST", body, keepalive: true, headers: { "Content-Type": "text/plain" } }).catch(() => {});
};

const KINDS: [RegExp, string][] = [
  [/^tel:/, "tel"],
  [/pf\.kakao\.com|open\.kakao\.com/, "kakao"],
  [/map\.naver\.com|naver\.me\/|place\.naver\.com|map\.kakao\.com|kakaomap|google\.[a-z.]+\/maps|maps\.app\.goo\.gl/, "map"],
  [/instagram\.com|youtube\.com|youtu\.be|blog\.naver\.com|facebook\.com|tiktok\.com|threads\.(net|com)|linkedin\.com/, "sns"],
];

export function Tracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!/^https?:$/.test(location.protocol) || /^\/admin(\/|$)/.test(pathname)) return;
    load();
    const now = Date.now();
    const q = location.search.slice(0, 600);
    const tagged = /[?&](utm_|gclid=|gbraid=|wbraid=|fbclid=|n_media=|n_query=|n_keyword=|NaPm=)/.test(q);
    const ref = document.referrer.slice(0, 600);
    let refHost = "";
    try {
      refHost = ref ? new URL(ref).host : "";
    } catch {
      refHost = "";
    }
    const outside = !!refHost && refHost !== location.host;
    // 30분 지났거나, 다른 곳에서 · 태그 붙은 링크로 다시 들어왔으면 새 방문
    const fresh = !st.s || now - (st.t ?? 0) > 30 * 60 * 1000 || tagged || (outside && refHost !== st.rh);
    if (!st.v || st.v.length < 8) st.v = rid();
    if (fresh) {
      st.s = rid();
      st.rh = refHost;
    }
    st.t = now;
    save();
    send(fresh ? { r: ref, q } : {});
  }, [pathname]);

  useEffect(() => {
    if (/^\/admin(\/|$)/.test(pathname)) return;
    window.drpTrack = {
      ids: () => ({ vid: st.v ?? "", sid: st.s ?? "" }),
      send: (k, t) => send({ k, t: String(t ?? "").slice(0, 200) }),
    };
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      const hit = KINDS.find(([re]) => re.test(href));
      if (hit) send({ k: hit[1], t: href.slice(0, 200) });
      else if (/^https?:/.test(href) && a.host !== location.host) send({ k: "out", t: href.slice(0, 200) });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname]);

  return null;
}
