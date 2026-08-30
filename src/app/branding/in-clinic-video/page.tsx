import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "원내 영상 송출 제작",
  description: "대기실 화면은 이미 환자가 보고 있는 매체입니다. 대기 시간을 병원을 이해하는 시간으로 바꿉니다.",
  path: "/branding/in-clinic-video",
});

import { SolutionDetail } from "@/components/templates/SolutionDetail";

export default function Page() {
  return <SolutionDetail hubHref="/branding" detailHref="/branding/in-clinic-video" />;
}
