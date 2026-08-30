import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "CPC / CPM 광고",
  description: "광고의 목표는 클릭이 아니라 예약입니다. 전환을 추적할 수 있는 구조를 먼저 만들고, 그 위에서 예산을 씁니다.",
  path: "/marketing/paid-ads",
});

import { SolutionDetail } from "@/components/templates/SolutionDetail";

export default function Page() {
  return <SolutionDetail hubHref="/marketing" detailHref="/marketing/paid-ads" />;
}
