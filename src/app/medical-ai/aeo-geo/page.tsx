import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "AEO / GEO",
  description: "환자가 검색창 대신 AI에게 묻기 시작했습니다. AI의 답변 안에 병원이 존재하도록 구조를 준비합니다.",
  path: "/medical-ai/aeo-geo",
});

import { SolutionDetail } from "@/components/templates/SolutionDetail";

export default function Page() {
  return <SolutionDetail hubHref="/medical-ai" detailHref="/medical-ai/aeo-geo" />;
}
