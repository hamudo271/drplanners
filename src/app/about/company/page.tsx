import { Section, Media } from "@/components/ui";
import { PageHero, CtaBand } from "@/components/templates/shared";
import { ABOUT } from "@/config/images";

const HISTORY = [
  {
    y: "대행사 시절",
    body: "병원마케팅 대행사 안에서 제안과 리포트가 만들어지는 구조를 경험했습니다. 진료과가 달라도 제안서가 거의 같다는 것을 그때 알았습니다.",
  },
  {
    y: "직접 검증",
    body: "영상·디자인·개발·브랜딩·커머스 — 직접 운영한 사업들이 실험실이 됐습니다. 리포트가 아니라 예약 장부로 검증된 데이터가 쌓였습니다.",
  },
  {
    y: "2026",
    body: "닥터플래너스 설립. 먼저 검증하지 않은 전략은 제안하지 않는다는 원칙으로 시작했습니다.",
  },
];

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "닥터플래너스", href: "/about" }, { label: "회사소개" }]}
        title="회사소개"
        lead="조직 · 연혁 · 파트너 · 오시는 길"
        mediaLabel="회사 전경 이미지"
        mediaSrc={ABOUT.company}
      />

      <Section no="01" label="Organization">
        <h2 className="text-2xl font-light md:text-3xl">조직</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-4">
          {[
            { t: "전략", d: "진단과 플래닝 — 병원의 계획을 세우고 지킵니다." },
            { t: "브랜딩", d: "콘텐츠·디자인·영상 — 병원의 톤을 만듭니다." },
            { t: "퍼포먼스", d: "광고·데이터 — 예산이 예약이 되게 합니다." },
            { t: "메디컬 AI", d: "검색·AI 노출 — 발견되는 구조를 만듭니다." },
          ].map(({ t, d }) => (
            <div key={t} className="border border-ink-900/15 p-6">
              <Media label="팀 이미지" ratio="aspect-square" className="" />
              <p className="mt-4 text-base font-medium">{t} 팀</p>
              <p className="prose-ko mt-2 text-sm text-ink-500">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section no="02" label="History" tone="paper">
        <h2 className="text-2xl font-light md:text-3xl">연혁</h2>
        <ul className="mt-10 border-t border-ink-900/15">
          {HISTORY.map((h) => (
            <li
              key={h.y}
              className="grid gap-6 border-b border-ink-900/15 py-8 md:grid-cols-[160px_1fr]"
            >
              <p className="display-ko text-xl font-light md:text-2xl">{h.y}</p>
              <p className="prose-ko max-w-2xl text-sm text-ink-700">{h.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section no="03" label="Partners">
        <h2 className="text-2xl font-light md:text-3xl">파트너</h2>
        <div className="mt-8 grid grid-cols-2 gap-px border border-ink-900/15 bg-ink-900/12 md:grid-cols-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="bg-cream-200 flex h-24 items-center justify-center bg-cream-100">
              <span className="label">LOGO</span>
            </div>
          ))}
        </div>
      </Section>

      <Section no="04" label="Location" tone="paper">
        <h2 className="text-2xl font-light md:text-3xl">오시는 길</h2>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          <Media label="지도 임베드 자리" ratio="aspect-[16/9]" />
          <dl className="space-y-5">
            {["주소", "대표번호", "이메일", "운영시간"].map((k) => (
              <div key={k} className="border-b border-ink-900/10 pb-4">
                <dt className="label">{k}</dt>
                <dd className="mt-2 h-3 w-3/4 rounded-sm bg-ink-900/8" />
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
