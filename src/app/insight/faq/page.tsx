import { pageMeta, JsonLd, faqJsonLd } from "@/lib/seo";

export const metadata = pageMeta({
  title: "자주 묻는 질문",
  description:
    "계약 기간, 월 4개 병원 수주 기준, 리포트 방식, 의료광고심의 처리까지 — 원장님들이 가장 많이 묻는 질문에 답합니다.",
  path: "/insight/faq",
});

import { Section } from "@/components/ui";
import { PageHero, CtaBand } from "@/components/templates/shared";
import { InsightTabs } from "@/components/templates/Insight";

const GROUPS = ["계약 · 운영", "진행 방식", "성과 · 리포트", "정책"];

/** 블로그 글 "왜 닥터플래너스일까?"에서 정리한 실제 운영 기준 기반 문답 */
const FAQS = [
  {
    q: "계약 기간은 어떻게 되나요?",
    a: "3개월 미만의 단발성 계약은 지양합니다. 마케팅은 최소 분기 단위로 검증해야 하기 때문입니다. 한 달 해보고 판단하는 방식은 병원에도 저희에게도 남는 것이 없습니다.",
  },
  {
    q: "왜 월 4개 병원만 받나요?",
    a: "휴식은 대량생산할 수 없기 때문입니다. 수십 개 병원을 동시에 받으면 결국 남는 건 ‘예쁜 리포트’뿐입니다. 한 원장님께 드리는 쉼의 무게를 지키기 위해 신규 수주는 월 최대 4개 병원으로 제한합니다.",
  },
  {
    q: "근처 경쟁 병원과 동시에 일할 수도 있나요?",
    a: "아니요. 동일 상권 내 동일 진료과는 중복해서 맡지 않습니다. 같은 키워드를 두 병원에 팔 수는 없기 때문입니다.",
  },
  {
    q: "원장이 실제로 써야 하는 시간은 얼마나 되나요?",
    a: "DR.PLAN 여섯 단계를 전부 더해도 채 10분이 되지 않습니다. 처방 단계의 결과 확인, 해석 단계의 보고받기, 다음 달 계획 승인 — 이게 전부입니다. 나머지는 저희가 결정해서 가져갑니다.",
  },
  {
    q: "리포트는 다른 대행사와 뭐가 다른가요?",
    a: "노출 수가 아니라 전환 경로를 봅니다. 어떤 키워드가 예약으로 이어졌고 어디서 이탈했는지, 신환 1명이 실제로 얼마에 만들어졌는지까지 계산합니다. ‘올랐습니다’가 아니라 ‘이래서 올랐습니다’로 보고합니다.",
  },
  {
    q: "\u201C그냥 시키는 대로만 해주세요\u201D라고 하면요?",
    a: "정중히 거절합니다. 거만해서가 아닙니다. 방향을 결정하지 못하는 자리에 서면 저희도 결국 흔한 실행 대행사가 되고, 원장님은 다시 쉬지 못하게 되기 때문입니다. 방향 결정권을 위임해주시는 곳과만 협업합니다.",
  },
  {
    q: "의료광고심의는 어떻게 처리하나요?",
    a: "콘텐츠 시안이 나온 뒤에 걸러내는 방식이 아니라, 기획 단계에서 심의 기준부터 먼저 적용합니다. 심의 기준을 지키지 않는 방향과는 협업하지 않습니다.",
  },
  {
    q: "계약이 끝나면 자료는 어떻게 되나요?",
    a: "진단 결과, KPI 역산 근거, 심의 이력, 실행 기록, 성과 해석, 다음 전략까지 — 모든 과정은 문서로 남기고, 계약이 끝나도 그 문서는 원장님 병원에 남습니다.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLd data={faqJsonLd(FAQS)} />
      <PageHero
        crumbs={[{ label: "메디컬 인사이트", href: "/insight" }, { label: "FAQ" }]}
        title="자주 묻는 질문"
        lead="원장님들이 가장 많이 물어보시는 내용을 모았습니다."
      />
      <InsightTabs current="/insight/faq" />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[220px_1fr]">
          {/* 카테고리 사이드 */}
          <nav className="h-fit border border-ink-900/15">
            {GROUPS.map((g, i) => (
              <span
                key={g}
                className={`block border-b border-ink-900/10 px-5 py-3.5 text-sm last:border-0 ${ i === 0 ? "bg-cream-50 font-medium" : "text-ink-500" }`}
              >
                {g}
              </span>
            ))}
          </nav>

          {/* 아코디언 — 네이티브 details 사용 (JS 불필요) */}
          <div className="border-t border-ink-900/15">
            {FAQS.map((f, i) => (
              <details key={f.q} open={i === 0} className="group border-b border-ink-900/15">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5">
                  <span className="flex flex-1 items-start gap-4">
                    <span className="label pt-1">Q</span>
                    <span className="display-ko text-base md:text-lg">{f.q}</span>
                  </span>
                  <span className="label shrink-0">+</span>
                </summary>
                <div className="flex gap-4 pb-7">
                  <span className="label pt-0.5">A</span>
                  <p className="prose-ko max-w-2xl flex-1 text-sm text-ink-500">{f.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
