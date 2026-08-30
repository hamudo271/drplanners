import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "블로그",
  description: "병원 마케팅 실무에서 나온 기록. 플레이스 정비, 키워드 설계, 심의 대응처럼 직접 해본 내용을 정리합니다.",
  path: "/insight/blog",
});

import { ListTemplate } from "@/components/templates/Insight";

export default function Page() {
  return (
    <ListTemplate
      href="/insight/blog"
      title="블로그"
      lead="실무에서 쌓인 기록과 노트."
    />
  );
}
