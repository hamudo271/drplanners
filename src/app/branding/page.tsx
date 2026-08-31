import { SolutionHub } from "@/components/templates/SolutionHub";

import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "브랜딩 솔루션",
  description: "브랜딩은 병원을 기억되게 만드는 일입니다. 채널 운영부터 플레이스, 언론, 영상까지 — 손이 계속 가는 일들이라 원장님이 직접 하시면 저녁이 사라집니다. 접점 관리는 저희가 맡고, 원장님은 확인만 하십시오.",
  path: "/branding",
});

export default function Page() {
  return <SolutionHub href="/branding" />;
}
