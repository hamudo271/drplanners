import {
  HomeIntro,
  Fit,
  Bottleneck,
  Solutions,
  Plan,
  Evidence,
  Insight,
  Faq,
  ClosingCta,
} from "@/components/sections/home";

/**
 * 메인. 순서가 곧 설득의 순서입니다.
 *
 *   첫 화면(태그라인) → 원인 재정의(Why, 화면 고정 연출) → 대상 확인
 *   → 어디가 막혔나 → 무엇을 맡나 → 일하는 순서 → 지키는 것 → 읽을거리
 *   → 묻기 전에 → 행동
 *
 * 전 화면이 더가든피부과 메인의 어휘(괄호 라벨, 양옆 세로선, 어두운 판과
 * 크림 판의 교대)를 따릅니다.
 * CTA는 상단(히어로 링크) · 중단(병목) · 하단(마지막) 3회만 나옵니다.
 * 목적지는 전부 /diagnosis 하나입니다.
 */
export default function HomePage() {
  return (
    <div className="home-page">
      <HomeIntro />
      <Fit />
      <Bottleneck />
      <Solutions />
      <Plan />
      <Evidence />
      <Insight />
      <Faq />
      <ClosingCta />
    </div>
  );
}
