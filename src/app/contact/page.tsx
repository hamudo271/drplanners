import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "CONTACT",
  description: "병원 상황을 알려주시면 담당 플래너가 직접 검토 후 연락드립니다. 월 최대 4개 병원만 새로 맡습니다.",
  path: "/contact",
});

import { Section, Media, BrassIcon, Button, H2 } from "@/components/ui";
import { PageHero } from "@/components/templates/shared";
import { ContactForm } from "@/components/contact/ContactForm";
import { CONTACT_HERO, cardImage } from "@/config/images";


export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "contact" }]}
        title="CONTACT"
        lead="병원 상황을 알려주시면 담당 플래너가 직접 검토 후 연락드립니다."
        mediaLabel="컨택트 키비주얼"
        mediaSrc={CONTACT_HERO}
      />

      <Section no="01" label="Inquiry">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <ContactForm />

          <aside className="space-y-8">
            <div className="border border-ink-900/15 p-6">
              <p className="label">바로 연락</p>
              <div className="mt-5 space-y-5">
                {[
                  { k: "대표번호", v: "문의 폼으로 남겨주시면 연락드립니다" },
                  { k: "이메일", v: "아래 폼이 담당자 메일로 바로 전달됩니다" },
                  { k: "응답 시간", v: "영업일 기준 1일 내 회신" },
                ].map((c) => (
                  <div key={c.k} className="flex items-start gap-3">
                    <BrassIcon size={28} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-ink-900">{c.k}</p>
                      <p className="prose-ko mt-1.5 text-sm text-ink-700">{c.v}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-ink-900/15 bg-forest-800 p-6 text-cream-100">
              <p className="label label-on-dark">신규 수주 안내</p>
              <p className="prose-ko mt-3.5 text-sm text-cream-100/90">
                닥터플래너스는 월 최대 4개 병원만 새로 맡습니다. 동일 상권의
                동일 진료과는 중복해서 맡지 않습니다.
              </p>
            </div>

            <div className="border border-ink-900/15 p-6">
              <p className="label">진단부터 시작하기</p>
              <p className="prose-ko mt-3.5 text-sm text-ink-700">
                어떤 솔루션이 필요한지 아직 모르시겠다면
                <br />
                5분 진단을 먼저 받아보세요.
              </p>
              <a href="/diagnosis" className="mt-5 inline-block">
                <Button variant="outline">병원 진단 시작하기</Button>
              </a>
            </div>

            <Media
              label="오시는 길 이미지"
              ratio="aspect-[4/3]"
              src={cardImage(6)}
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
            <Media label="지도 임베드 자리" ratio="aspect-square" />
          </aside>
        </div>
      </Section>

      {/* 문의 전에 원장님이 품으실 의문 — 답은 사이트 곳곳에 있지만 여기 모읍니다 */}
      <Section no="02" label="Before you ask" tone="paper">
        <H2>문의 전에, 이런 게 궁금하실 겁니다</H2>
        <div className="mt-12 grid gap-px border-t border-l border-ink-900/12 md:grid-cols-2">
          {[
            {
              q: "마케팅 대행사와 뭐가 다른가요?",
              a: "대행사는 실행 단가로 돈을 벌기 때문에 “이 채널 줄이시죠”라고 말하기 어렵습니다. 저희는 방향을 결정하는 자리에 섭니다. 죽일 것과 키울 것을 먼저 정하고, 그 판단을 숫자로 설명합니다.",
            },
            {
              q: "제가 얼마나 신경 써야 하나요?",
              a: "DR.PLAN 여섯 단계를 전부 더해도 원장님이 움직이실 시간은 채 10분이 되지 않습니다. 솔루션별로 실제 소요 시간을 각 페이지에 적어뒀습니다 — 대부분 월 10~40분입니다.",
            },
            {
              q: "왜 월 4개 병원만 받나요?",
              a: "휴식은 대량생산할 수 없기 때문입니다. 수십 개를 동시에 받으면 남는 건 예쁜 리포트뿐이고, 원장님은 다시 쉬지 못하게 됩니다.",
            },
            {
              q: "성과가 안 나면 어떻게 되나요?",
              a: "매달 노출이 아니라 전환을 보고드립니다. 효과 없는 지출은 저희가 먼저 정리하자고 말씀드립니다. 기간을 약속하는 대신 변화를 숫자로 보여드립니다.",
            },
            {
              q: "계약이 끝나면 자료는요?",
              a: "진단 결과, KPI 근거, 심의 이력, 실행 기록까지 모두 문서로 남기고 병원에 남겨드립니다. 계정 권한도 반납합니다.",
            },
            {
              q: "비용은 얼마인가요?",
              a: "병원 상황과 범위에 따라 달라 일률적으로 안내드리지 않습니다. 다만 3개월 미만 단발성 계약은 지양합니다 — 마케팅은 최소 분기 단위로 검증해야 하기 때문입니다.",
            },
          ].map((f, i) => (
            <div
              key={f.q}
              className="border-r border-b border-ink-900/12 bg-cream-100 p-8"
              data-reveal
              style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
            >
              <div className="flex items-baseline gap-3">
                <span className="label tnum">{String(i + 1).padStart(2, "0")}</span>
                <p className="display-ko text-base md:text-lg">{f.q}</p>
              </div>
              <p className="prose-ko mt-4 text-sm text-ink-500">{f.a}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}