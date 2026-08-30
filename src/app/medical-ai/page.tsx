import { SolutionHub } from "@/components/templates/SolutionHub";

import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "메디컬 AI 솔루션",
  description: "검색의 다음을 준비합니다. 홈페이지·SEO·AI 검색까지, 환자가 찾는 방식이 바뀌어도 병원이 발견되는 기반을 만듭니다.",
  path: "/medical-ai",
});

export default function Page() {
  return <SolutionHub href="/medical-ai" />;
}
