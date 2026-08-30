import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "메디컬 진단 시스템",
  description: "5가지 항목으로 지금 병원의 위치를 진단합니다. 브랜드·검색·콘텐츠·광고·AI 검색, 약 3분. 담당 플래너가 직접 읽고 회신드립니다.",
  path: "/diagnosis",
});

import Image from "next/image";
import { DiagnosisFlow } from "@/components/templates/DiagnosisFlow";
import { PageHero } from "@/components/templates/shared";
import { DIAGNOSIS_HERO, detailBand, whoImage } from "@/config/images";
import { Section, Container, Media, BrassIcon, H2 } from "@/components/ui";
import { DIAGNOSIS_QUESTIONS } from "@/content/diagnosis";


/** 진단 항목별 왜 보는지 */
const AREAS = [
  {
    area: "브랜드 진단",
    why: "환자가 우리 병원을 어떤 병원으로 기억하는지. 한 문장으로 답할 수 없다면, 모든 채널이 제각각 말하고 있을 가능성이 큽니다.",
  },
  {
    area: "검색 진단",
    why: "지역명과 진료과목으로 검색했을 때의 실제 위치. 환자가 병원을 찾는 첫 관문이 어디서 막혀 있는지 봅니다.",
  },
  {
    area: "콘텐츠 진단",
    why: "채널이 살아 있는지, 멈춰 있는지. 방치된 채널은 없는 것보다 신뢰를 더 깎습니다.",
  },
  {
    area: "광고 진단",
    why: "광고비가 예약 몇 건으로 돌아오는지 아는지. 이 답이 없으면 계기판 없이 속도를 올리는 것과 같습니다.",
  },
  {
    area: "AI 검색 진단",
    why: "AI에게 지역 병원을 물었을 때 언급되는지. 검색 행동이 옮겨가는 만큼 미리 확인해둘 항목입니다.",
  },
];

const STEPS = [
  { t: "5개 문항 응답", d: "각 영역당 한 문항. 고민 없이 지금 상태에 가까운 답을 고르시면 됩니다." },
  { t: "병원 정보 입력", d: "결과를 보내드릴 병원명과 연락처를 남겨주세요." },
  { t: "담당 플래너 검토", d: "자동 점수만 보내지 않습니다. 답변을 사람이 읽고 해석합니다." },
  { t: "결과 회신", d: "영업일 기준 1일 내에 지금 위치와 우선순위를 정리해 연락드립니다." },
];

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "메디컬 진단 시스템" }]}
        title="메디컬 진단 시스템"
        lead="어떤 솔루션이 필요한지 아직 모르시겠다면 여기서 시작하세요. 5가지 항목으로 지금 병원의 위치를 확인합니다. 약 3분이면 끝납니다."
        mediaSrc={DIAGNOSIS_HERO}
      />

      {/* 01 — 왜 진단부터인가 */}
      <Section no="01" label="Why diagnose">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div data-reveal>
            <H2>
              처방보다
              <br />
              진단이 먼저입니다.
            </H2>
            <div className="mt-8 space-y-5">
              <p className="prose-ko text-sm text-ink-700 md:text-base">
                대부분의 병원 마케팅은 실행부터 시작합니다. 블로그 몇 건, 광고 얼마.
                그런데 어디가 막혀 있는지 모르는 채로 실행이 빨라지면, 틀린 곳에 더
                빨리 도착할 뿐입니다.
              </p>
              <p className="prose-ko text-sm text-ink-700 md:text-base">
                유입이 없는 병원과, 유입은 있는데 예약으로 이어지지 않는 병원은
                처방이 완전히 다릅니다. 그래서 저희는 무엇을 팔지 정하기 전에
                지금 어디에 있는지부터 확인합니다.
              </p>
            </div>
          </div>
          <Media
            label="진단 이미지"
            ratio="aspect-[4/3]"
            src={whoImage("/diagnosis", 1)}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </Section>

      {/* 02 — 무엇을 보는가 */}
      <Section no="02" label="What we check" tone="paper">
        <H2>5가지를 봅니다</H2>
        <div className="mt-12 grid gap-px border-t border-l border-ink-900/12 md:grid-cols-2 lg:grid-cols-3">
          {AREAS.map((a, i) => (
            <div
              key={a.area}
              className="border-r border-b border-ink-900/12 bg-cream-100 p-8"
              data-reveal
              style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
            >
              <div className="flex items-center gap-3">
                <span className="label tnum">{String(i + 1).padStart(2, "0")}</span>
                <BrassIcon size={26} />
              </div>
              <p className="display-ko mt-5 text-lg">{a.area}</p>
              <p className="prose-ko mt-3 text-sm text-ink-500">{a.why}</p>
            </div>
          ))}
          <div className="flex flex-col justify-center border-r border-b border-ink-900/12 bg-forest-800 p-8 text-cream-100">
            <p className="label label-on-dark">소요시간</p>
            <p className="display-ko mt-4 text-2xl">약 3분</p>
            <p className="prose-ko mt-3 text-sm text-cream-100/70">
              문항당 30초면 충분합니다.
            </p>
          </div>
        </div>
      </Section>

      {/* 진단 흐름 밴드 */}
      <section className="relative flex min-h-[320px] items-center md:min-h-[380px]">
        <div className="veil-soft absolute inset-0">
          <Image
            src={detailBand("/diagnosis")}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <Container className="relative py-16">
          <p
            className="display-ko max-w-2xl text-xl text-cream-100 md:text-2xl lg:text-[1.75rem]"
            data-reveal
          >
            자동 점수만 보내드리지 않습니다.
            <br />
            답변은 담당 플래너가 직접 읽습니다.
          </p>
        </Container>
      </section>

      {/* 03 — 진행 순서 */}
      <Section no="03" label="How it works">
        <H2>어떻게 진행되나요</H2>
        <ol className="mt-12 grid gap-px border-t border-l border-ink-900/12 md:grid-cols-4">
          {STEPS.map((s, i) => (
            <li
              key={s.t}
              className="border-r border-b border-ink-900/12 bg-cream-100 p-7"
              data-reveal
              style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}
            >
              <span className="label tnum">STEP {i + 1}</span>
              <p className="display-ko mt-4 text-base">{s.t}</p>
              <p className="prose-ko mt-3 text-sm text-ink-500">{s.d}</p>
            </li>
          ))}
        </ol>
        <p className="prose-ko mt-10 border-l-2 border-brass-500 pl-6 text-xs text-ink-500">
          진단 결과는 상담을 위한 참고 자료이며, 의학적 진단이나 치료 효과를
          보장하는 것이 아닙니다. 입력하신 정보는 상담 목적 외에 사용하지 않습니다.
        </p>
      </Section>

      {/* 04 — 실제 진단 폼 */}
      <div id="start">
        <DiagnosisFlow />
      </div>

      {/* 05 — 진단 전 궁금증 */}
      <Section no="05" label="Before you start" tone="paper">
        <H2>시작 전에 궁금하실 것</H2>
        <div className="mt-10 border-t border-ink-900/15">
          {[
            {
              q: "진단만 받아봐도 되나요?",
              a: "네. 진단 후 계약으로 이어져야 할 의무는 없습니다. 결과만 참고하시고 직접 개선하셔도 됩니다.",
            },
            {
              q: "비용이 드나요?",
              a: "진단과 결과 회신까지는 비용이 없습니다.",
            },
            {
              q: "정확한 답을 모르겠는 문항이 있습니다.",
              a: "‘확인해본 적 없다’ 같은 답도 그 자체로 중요한 신호입니다. 모르는 항목이 어디인지가 우선순위를 정하는 근거가 됩니다.",
            },
            {
              q: `총 ${DIAGNOSIS_QUESTIONS.length}문항이 전부인가요?`,
              a: `네, ${DIAGNOSIS_QUESTIONS.length}문항과 병원 정보 입력이 전부입니다. 더 깊은 내용은 담당 플래너가 연락드릴 때 여쭙습니다.`,
            },
          ].map((f, i) => (
            <details key={f.q} open={i === 0} className="border-b border-ink-900/15">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5">
                <span className="display-ko text-base md:text-lg">{f.q}</span>
                <span className="label shrink-0">+</span>
              </summary>
              <p className="prose-ko max-w-2xl pb-7 text-sm text-ink-500">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>
    </>
  );
}
