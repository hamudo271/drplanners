import { SolutionHub } from "@/components/templates/SolutionHub";

import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "DRP 시그니처",
  description: "닥터플래너스는 회사 이름 그대로, 6단계 DR.PLAN 프로세스로 움직입니다. 대부분의 대행사는 실행부터 시작하지만, 저희는 진단부터 시작합니다 — 그리고 여섯 단계를 전부 더해도 원장님이 움직이실 시간은 채 10분이 되지 않습니다.",
  path: "/signature",
});

export default function Page() {
  return <SolutionHub href="/signature" />;
}
