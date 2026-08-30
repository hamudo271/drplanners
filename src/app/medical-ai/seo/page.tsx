import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "검색엔진 최적화",
  description: "광고는 멈추면 사라지지만 검색은 쌓입니다. 환자가 실제로 검색하는 질문에 병원이 답이 되도록 만듭니다.",
  path: "/medical-ai/seo",
});

import { SolutionDetail } from "@/components/templates/SolutionDetail";

export default function Page() {
  return <SolutionDetail hubHref="/medical-ai" detailHref="/medical-ai/seo" />;
}
