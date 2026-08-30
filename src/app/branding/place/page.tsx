import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "플레이스 최적화",
  description: "네이버 플레이스는 병원을 찾는 환자가 가장 먼저 마주치는 화면입니다. 정보 정비부터 리뷰 관리, 예약 연동까지 — 지역 검색에서 발견되는 구조를 만듭니다.",
  path: "/branding/place",
});

import { SolutionDetail } from "@/components/templates/SolutionDetail";

export default function Page() {
  return <SolutionDetail hubHref="/branding" detailHref="/branding/place" />;
}
