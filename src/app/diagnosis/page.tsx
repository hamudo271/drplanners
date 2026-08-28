import { DiagnosisFlow } from "@/components/templates/DiagnosisFlow";
import { PageHero } from "@/components/templates/shared";

export default function Page() {
  return (
    <>
      <PageHero crumbs={[{ label: "메디컬 진단 시스템" }]} title="메디컬 진단 시스템" />
      <DiagnosisFlow />
    </>
  );
}
