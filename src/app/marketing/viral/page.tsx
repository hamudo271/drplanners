import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "바이럴마케팅",
  description: "가짜 후기는 만들지 않습니다. 환자가 실제로 모이는 곳에서 병원이 자연스럽게 언급되는 구조를 만듭니다.",
  path: "/marketing/viral",
});

import { SolutionDetail } from "@/components/templates/SolutionDetail";

export default function Page() {
  return <SolutionDetail hubHref="/marketing" detailHref="/marketing/viral" />;
}
