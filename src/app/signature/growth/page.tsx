import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "그로스 플래닝",
  description: "환자는 오는데 성장이 멈췄다면, 더 쓰는 것보다 어디서 새는지 찾는 것이 먼저입니다. 데이터로 병목을 찾아 다시 설계합니다.",
  path: "/signature/growth",
});

import { SolutionDetail } from "@/components/templates/SolutionDetail";

export default function Page() {
  return <SolutionDetail hubHref="/signature" detailHref="/signature/growth" />;
}
