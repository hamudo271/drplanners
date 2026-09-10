import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "회사소개",
  description: "닥터플래너스의 조직과 연혁, 오시는 길을 안내합니다. 대행사 시절과 직접 검증의 시간을 거쳐 2026년 설립했습니다.",
  path: "/about/company",
});

import Link from "next/link";
import { Section, BrassIcon, Button, H2 } from "@/components/ui";
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

/** 지금 확정돼 있어 그대로 적을 수 있는 것들 */
const FACTS = [
  { k: "회신 속도", v: "영업일 1일", d: "자동 회신을 보내지 않습니다. 사람이 직접 읽고 연락드립니다." },
  { k: "신규 수용", v: "월 4곳", d: "한 사람이 감당할 수 있는 병원 수를 넘기지 않습니다." },
  { k: "협업 방식", v: "원격 중심", d: "정기 보고는 월 1회, 필요할 때 방문합니다." },
  { k: "진단·상담", v: "비용 없음", d: "계약 전 진단과 상담에는 비용을 받지 않습니다." },
];

/**
 * 사무실 정보.
 * ⚠️ 주소·대표번호·이메일이 확정되면 주석을 풀고 값을 채우십시오.
 *    비어 있으면 빈 표 대신 안내 문구가 나갑니다 — 빈 칸을 보여주지 않기 위해서입니다.
 */
const OFFICE: { k: string; v: string }[] = [
  // { k: "주소", v: "" },
  // { k: "대표번호", v: "" },
  // { k: "이메일", v: "" },
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

      <Section no="01" label="조직">
        <h2 className="text-2xl font-light md:text-3xl">조직</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-4">
          {[
            { t: "전략", d: "진단과 플래닝 — 병원의 계획을 세우고 지킵니다." },
            { t: "브랜딩", d: "콘텐츠·디자인·영상 — 병원의 톤을 만듭니다." },
            { t: "퍼포먼스", d: "광고·데이터 — 예산이 예약이 되게 합니다." },
            { t: "메디컬 AI", d: "검색·AI 노출 — 발견되는 구조를 만듭니다." },
          ].map(({ t, d }) => (
            <div key={t} className="border border-ink-900/15 p-6">
              <div className="flex aspect-square items-center justify-center bg-cream-200">
                <BrassIcon size={40} />
              </div>
              <p className="mt-4 text-base font-medium">{t} 팀</p>
              <p className="prose-ko mt-2 text-sm text-ink-500">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section no="02" label="연혁" tone="paper">
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

      <Section no="03" label="파트너">
        <H2>파트너</H2>
        <p className="prose-ko mt-6 max-w-xl text-sm text-ink-500">
          제휴 및 협력사는 계약 관계 확인 후 순차적으로 공개합니다.
          제휴를 원하시는 경우 문의로 연락 주세요.
        </p>
        <Link href="/contact" className="mt-8 inline-block">
          <Button variant="outline">제휴 문의</Button>
        </Link>
      </Section>

      <Section no="04" label="일하는 조건" tone="paper">
        <h2 className="text-2xl font-light md:text-3xl">어떻게 일하는지</h2>
        <p className="prose-ko mt-6 max-w-xl text-sm text-ink-500">
          회사 실체를 확인하시는 자리이니, 지금 확정된 것만 적었습니다.
        </p>

        <dl className="mt-10 grid gap-px border border-ink-900/12 bg-ink-900/12 sm:grid-cols-2 lg:grid-cols-4">
          {FACTS.map((f) => (
            <div key={f.k} className="bg-cream-50 p-6">
              <dt className="label label-ko">{f.k}</dt>
              <dd className="mt-3 text-lg font-light text-ink-900">{f.v}</dd>
              <dd className="prose-ko mt-2 text-sm text-ink-500">{f.d}</dd>
            </div>
          ))}
        </dl>

        {OFFICE.length > 0 ? (
          <dl className="mt-10 grid gap-px border border-ink-900/12 bg-ink-900/12 sm:grid-cols-3">
            {OFFICE.map((o) => (
              <div key={o.k} className="bg-cream-50 p-6">
                <dt className="label label-ko">{o.k}</dt>
                <dd className="prose-ko mt-2 text-sm text-ink-700">{o.v}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <p className="mt-10 border-l-2 border-brass-500 py-3 pl-5 text-sm leading-relaxed text-ink-500">
            사무실 주소와 대표번호는 확정되는 대로 이 자리에 게재합니다. 그 전까지는{" "}
            <Link href="/contact" className="underline underline-offset-2">
              문의하기
            </Link>
            로 연락 주시면 담당 플래너가 영업일 1일 내에 회신드립니다.
          </p>
        )}
      </Section>

      <CtaBand />
    </>
  );
}
