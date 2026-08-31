import { SolutionHub } from "@/components/templates/SolutionHub";

import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "마케팅 솔루션",
  description: "마케팅은 필요한 환자에게 발견되는 일입니다. 광고·바이럴·심의·인플루언서·해외 환자까지, 예산이 예약으로 돌아오는 구조를 만듭니다. 광고비가 잘 쓰이는지 밤에 계정을 열어보는 일은 이제 하지 않으셔도 됩니다.",
  path: "/marketing",
});

export default function Page() {
  return <SolutionHub href="/marketing" />;
}
