import {
  Hero,
  Audience,
  Why,
  Bottleneck,
  Plan,
  Evidence,
  Insight,
  Faq,
  ClosingCta,
} from "@/components/sections/home";

/**
 * 메인. 순서가 곧 설득의 순서입니다.
 *
 *   문제 제시(히어로) → 대상 확인 → 원인 재정의 → 어디가 막혔나
 *   → 일하는 순서 → 지키는 것 → 읽을거리 → 묻기 전에 → 행동
 *
 * CTA는 상단(히어로) · 중단(병목) · 하단(마지막) 3회만 나옵니다.
 * 목적지는 전부 /diagnosis 하나입니다.
 */
export default function HomePage() {
  return (
    <div className="home-page">
      <Hero />
      <Audience />
      <Why />
      <Bottleneck />
      <Plan />
      <Evidence />
      <Insight />
      <Faq />
      <ClosingCta />
    </div>
  );
}
