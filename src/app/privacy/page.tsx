import { pageMeta } from "@/lib/seo";
import { Container, Section } from "@/components/ui";
import { PageHero } from "@/components/templates/shared";
import { SITE } from "@/config/site";

export const metadata = pageMeta({
  title: "개인정보처리방침",
  description:
    "닥터플래너스가 문의 및 무료 병원 진단 과정에서 수집하는 개인정보의 항목, 이용 목적, 보유 기간과 처리 위탁 현황을 안내합니다.",
  path: "/privacy",
});

/**
 * 개인정보처리방침.
 *
 * ⚠️ 아래 내용은 실제 폼이 수집하는 항목(src/lib/contact.ts)과 전송 경로
 *    (src/lib/mailer.ts — Resend)를 근거로 작성한 것입니다.
 *    사업자등록번호 · 주소 · 개인정보 보호책임자는 회사만 확정할 수 있으므로
 *    COMPANY_INFO 를 채운 뒤 공개하십시오. 비어 있으면 화면에 경고가 보입니다.
 */
const COMPANY_INFO: { label: string; value: string }[] = [
  // { label: "상호", value: "닥터플래너스" },
  // { label: "사업자등록번호", value: "" },
  // { label: "주소", value: "" },
  // { label: "개인정보 보호책임자", value: "" },
  // { label: "문의 이메일", value: "" },
];

const SECTIONS = [
  {
    h: "1. 수집하는 개인정보 항목",
    body: [
      "닥터플래너스는 홈페이지의 두 가지 경로에서만 개인정보를 수집합니다. 그 밖의 경로로는 수집하지 않습니다.",
    ],
    list: [
      "문의하기 — 병원명, 진료과목, 담당자명, 직함(선택), 연락처, 이메일, 관심 솔루션(선택), 문의 내용",
      "무료 병원 진단 — 병원명, 진료과목, 담당자명, 연락처, 이메일, 진단 문항 응답",
      "위 항목 외에 주민등록번호 등 고유식별정보는 수집하지 않습니다.",
    ],
  },
  {
    h: "2. 수집 및 이용 목적",
    body: [
      "수집한 정보는 문의와 진단 신청에 회신하고, 병원 상황에 맞는 제안을 드리는 목적으로만 사용합니다. 광고성 정보 발송이나 제3자 제공 목적으로는 사용하지 않습니다.",
    ],
  },
  {
    h: "3. 보유 및 이용 기간",
    body: [
      "상담이 종료되면 지체 없이 파기합니다. 다만 계약이 체결된 경우에는 계약 이행과 분쟁 대응을 위해 계약 종료 시점까지 보관하며, 관계 법령에 따라 보존 의무가 있는 정보는 해당 법령이 정한 기간 동안 보관합니다.",
    ],
  },
  {
    h: "4. 처리 위탁",
    body: [
      "문의·진단 신청 내용을 담당자에게 전달하기 위해 이메일 발송 업무를 아래 수탁자에게 위탁하고 있습니다.",
    ],
    list: ["Resend (resend.com) — 문의 및 진단 신청 알림 이메일 발송"],
  },
  {
    h: "5. 정보주체의 권리",
    body: [
      "정보주체는 언제든지 본인의 개인정보에 대한 열람, 정정, 삭제, 처리정지를 요구할 수 있습니다. 요청은 아래 연락처로 접수해 주시면 지체 없이 처리합니다.",
      "개인정보 수집·이용 동의는 거부하실 수 있습니다. 다만 문의와 진단 신청은 회신을 위해 연락처가 반드시 필요하므로, 동의하지 않으실 경우 해당 서비스 이용이 제한됩니다.",
    ],
  },
  {
    h: "6. 안전성 확보 조치",
    body: [
      "홈페이지 전 구간에 HTTPS를 적용하고, 접수 내용은 담당자 이메일로만 전달되며 별도의 외부 공개 데이터베이스에 저장하지 않습니다. 자동화된 반복 접수를 막기 위한 기술적 조치를 적용하고 있습니다.",
    ],
  },
  {
    h: "7. 방침의 변경",
    body: [
      "이 방침의 내용이 추가·삭제·수정될 경우 변경 사항을 홈페이지 공지사항을 통해 사전에 안내합니다.",
    ],
  },
];

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "개인정보처리방침" }]}
        title="개인정보처리방침"
        lead={`${SITE.name}는 문의와 진단 신청 과정에서 받은 정보를 회신 목적으로만 사용합니다.`}
      />

      <Section no="01" label="처리방침">
        <Container className="!px-0">
          <div className="max-w-3xl">
            {COMPANY_INFO.length > 0 ? (
              <dl className="mb-14 grid gap-px border border-ink-900/15 bg-ink-900/12 sm:grid-cols-2">
                {COMPANY_INFO.map((c) => (
                  <div key={c.label} className="bg-cream-100 p-5">
                    <dt className="label label-ko">{c.label}</dt>
                    <dd className="mt-2 text-sm text-ink-700">{c.value}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="mb-14 border-l-2 border-brass-500 py-3 pl-5 text-sm leading-relaxed text-ink-500">
                사업자 정보와 개인정보 보호책임자는 확정되는 대로 이 자리에 게재합니다.
                문의는 <a className="underline underline-offset-2" href="/contact">문의하기</a>를
                이용해 주십시오.
              </p>
            )}

            {SECTIONS.map((s) => (
              <section key={s.h} className="mb-12" data-reveal>
                <h2 className="text-lg font-medium text-ink-900 md:text-xl">{s.h}</h2>
                {s.body.map((p) => (
                  <p key={p} className="prose-ko mt-4 text-sm text-ink-700">
                    {p}
                  </p>
                ))}
                {s.list && (
                  <ul className="mt-5 space-y-2.5 border-t border-ink-900/12 pt-5">
                    {s.list.map((li) => (
                      <li key={li} className="flex gap-3 text-sm text-ink-500">
                        <span
                          className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-brass-500"
                          aria-hidden
                        />
                        <span className="prose-ko">{li}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <p className="mt-16 border-t border-ink-900/15 pt-6 text-sm text-ink-500">
              시행일자: 2026년 9월 10일
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
