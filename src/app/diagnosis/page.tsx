import { DiagnosisFlow } from "@/components/templates/DiagnosisFlow";
import { PageHero } from "@/components/templates/shared";
import { DIAGNOSIS_HERO } from "@/config/images";

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "메디컬 진단 시스템" }]}
        title="메디컬 진단 시스템"
        lead="5가지 항목을 진단해 지금 병원이 어디에 있는지 알려드립니다. 약 3분이면 끝납니다."
        mediaLabel="진단 키비주얼"
        mediaSrc={DIAGNOSIS_HERO}
      />
      <DiagnosisFlow />
    </>
  );
}
