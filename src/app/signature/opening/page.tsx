import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "개원 플래닝",
  description: "개원 후에 시작하는 마케팅은 늦습니다. 개원 일정에 맞춰 브랜드·채널·오픈 알림을 순서대로 준비합니다.",
  path: "/signature/opening",
});

import { SolutionDetail } from "@/components/templates/SolutionDetail";

export default function Page() {
  return <SolutionDetail hubHref="/signature" detailHref="/signature/opening" />;
}
