import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "홈페이지 제작",
  description: "홈페이지는 병원의 두 번째 접수 데스크입니다. 보기 좋은 페이지가 아니라, 예약으로 이어지는 페이지를 만듭니다.",
  path: "/medical-ai/website",
});

import { SolutionDetail } from "@/components/templates/SolutionDetail";

export default function Page() {
  return <SolutionDetail hubHref="/medical-ai" detailHref="/medical-ai/website" />;
}
