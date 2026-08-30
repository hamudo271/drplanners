import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "국내·외 인플루언서",
  description: "의료에서 인플루언서는 후기 창구가 아니라 정보 전달자입니다. 규정 안에서 안전하게, 맞는 사람과 협업합니다.",
  path: "/marketing/influencer",
});

import { SolutionDetail } from "@/components/templates/SolutionDetail";

export default function Page() {
  return <SolutionDetail hubHref="/marketing" detailHref="/marketing/influencer" />;
}
