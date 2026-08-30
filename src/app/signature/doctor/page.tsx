import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "닥터 플래닝",
  description: "환자는 병원 이름보다 원장님을 먼저 기억합니다. 진료 철학과 말투, 콘텐츠를 하나의 퍼스널 브랜드로 설계합니다.",
  path: "/signature/doctor",
});

import { SolutionDetail } from "@/components/templates/SolutionDetail";

export default function Page() {
  return <SolutionDetail hubHref="/signature" detailHref="/signature/doctor" />;
}
