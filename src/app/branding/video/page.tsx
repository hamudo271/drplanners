import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "영상 브랜딩",
  description: "글보다 영상이 먼저 닿는 시대입니다. 병원의 톤을 지키는 브랜드 필름과 숏폼을 만듭니다.",
  path: "/branding/video",
});

import { SolutionDetail } from "@/components/templates/SolutionDetail";

export default function Page() {
  return <SolutionDetail hubHref="/branding" detailHref="/branding/video" />;
}
