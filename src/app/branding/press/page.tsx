import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "언론보도",
  description: "기사는 광고보다 오래 남습니다. 병원의 소식과 원장님의 관점을 언론이 다룰 수 있는 형태로 만들어 전달합니다.",
  path: "/branding/press",
});

import { SolutionDetail } from "@/components/templates/SolutionDetail";

export default function Page() {
  return <SolutionDetail hubHref="/branding" detailHref="/branding/press" />;
}
