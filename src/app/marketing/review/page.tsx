import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "의료광고심의 대행",
  description: "의료광고는 집행보다 심의가 먼저입니다. 소재 검토부터 접수·보완·승인 관리까지, 심의 절차 전체를 대행합니다.",
  path: "/marketing/review",
});

import { SolutionDetail } from "@/components/templates/SolutionDetail";

export default function Page() {
  return <SolutionDetail hubHref="/marketing" detailHref="/marketing/review" />;
}
