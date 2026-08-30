import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "칼럼",
  description: "병원 마케팅을 바라보는 관점을 정리한 글입니다. 왜 대행사를 바꿔도 결과가 같은지, 방향을 정한다는 게 무엇인지 다룹니다.",
  path: "/insight/column",
});

import { ListTemplate } from "@/components/templates/Insight";

export default function Page() {
  return (
    <ListTemplate
      href="/insight/column"
      title="칼럼"
      lead="의료 마케팅을 바라보는 관점을 정리한 글입니다."
    />
  );
}
