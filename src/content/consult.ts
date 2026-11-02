import { BOTTLENECK, PRIMARY_CTA } from "./home";

/**
 * 우측 하단 상담 창의 문구.
 * 실시간 채팅이 아니라 고르면 답하는 안내입니다 — 사람이 응대하는 척하지 않고,
 * 답은 메인의 병목 진단(BOTTLENECK)과 문의 페이지에 이미 공개된 문구를 그대로 씁니다.
 */
export const CONSULT = {
  launcher: "상담하기",
  title: "닥터플래너스",
  sub: "병원 마케팅 상담",
  /** 문의 페이지 · 진단 페이지와 같은 약속 */
  reply: "영업일 기준 1일 내 회신",
  greeting: ["안녕하세요, 닥터플래너스입니다.", "지금 가장 막혀 있는 곳이 어디인가요?"],
  choices: [
    ...BOTTLENECK.items.map((it) => ({
      q: it.q,
      answer: it.body,
      link: { label: it.fix, href: it.href },
    })),
    {
      q: "어디가 막혔는지 모르겠습니다",
      answer: "어디가 막혔는지 모르시겠다면, 진단부터 받아보십시오.",
      link: null,
    },
  ],
  diagnosis: { label: PRIMARY_CTA.label, sub: "5개 항목 · 약 3분", href: PRIMARY_CTA.href },
  directTitle: "직접 상담",
  contact: { label: "문의 남기기", sub: "담당 플래너가 직접 읽고 연락드립니다", href: "/contact" },
  tel: { label: "전화 상담" },
  kakao: { label: "카카오톡 상담", sub: "카카오톡 채널로 이어집니다" },
  restart: "처음으로",
};
