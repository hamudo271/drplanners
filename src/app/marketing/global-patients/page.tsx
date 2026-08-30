import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "해외 환자 유치",
  description: "외국인 환자는 다른 검색, 다른 언어, 다른 신뢰 기준으로 병원을 찾습니다. 그 여정에 맞춰 채널과 응대를 설계합니다.",
  path: "/marketing/global-patients",
});

import { SolutionDetail } from "@/components/templates/SolutionDetail";

export default function Page() {
  return <SolutionDetail hubHref="/marketing" detailHref="/marketing/global-patients" />;
}
