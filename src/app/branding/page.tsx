import { SolutionHub } from "@/components/templates/SolutionHub";

import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "브랜딩 솔루션",
  description: "브랜딩은 병원을 기억되게 만드는 일입니다. 채널 운영부터 플레이스, 언론, 영상까지 — 환자가 병원을 만나는 모든 접점을 하나의 톤으로 정리합니다.",
  path: "/branding",
});

export default function Page() {
  return <SolutionHub href="/branding" />;
}
