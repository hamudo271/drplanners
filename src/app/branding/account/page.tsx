import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "계정 운영",
  description: "병원 계정의 목적은 팔로워 수가 아니라, 내원 전에 쌓이는 신뢰입니다. 인스타그램·유튜브·블로그를 병원의 톤으로 운영합니다.",
  path: "/branding/account",
});

import { SolutionDetail } from "@/components/templates/SolutionDetail";

export default function Page() {
  return <SolutionDetail hubHref="/branding" detailHref="/branding/account" />;
}
