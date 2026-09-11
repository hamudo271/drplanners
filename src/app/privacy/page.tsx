import { pageMeta } from "@/lib/seo";
import { Container, Section } from "@/components/ui";
import { PageHero } from "@/components/templates/shared";
import { SITE } from "@/config/site";
import { COMPANY, ADDRESS_LINE } from "@/config/company";

export const metadata = pageMeta({
  title: "개인정보처리방침",
  description:
    "DCD 컴퍼니(닥터플래너스)의 개인정보처리방침. 개인정보의 처리 목적, 항목, 보유 기간, 정보주체의 권리, 안전성 확보 조치와 보호책임자를 안내합니다.",
  path: "/privacy",
});

/**
 * 개인정보처리방침 — 개인정보 보호법 제30조가 정한 항목 순서를 따릅니다.
 *
 * 사업자 정보는 config/company.ts 한 곳에서 옵니다. 수집 항목이 바뀌면
 * 제2조를, 보유 기간이 바뀌면 제3조를 같이 고쳐야 합니다.
 */
const CO = `${COMPANY.legalName}(${COMPANY.legalNameKo})`;

const COMPANY_INFO: { label: string; value: string }[] = [
  { label: "상호", value: CO },
  { label: "대표자", value: COMPANY.ceo },
  { label: "사업자등록번호", value: COMPANY.bizNo },
  { label: "주소", value: ADDRESS_LINE },
  { label: "전화", value: COMPANY.tel },
  { label: "이메일", value: COMPANY.email },
];

type Article = {
  h: string;
  body?: string[];
  list?: string[];
  table?: { head: string[]; rows: string[][] };
  after?: string[];
};

const ARTICLES: Article[] = [
  {
    h: "제1조 (총칙)",
    body: [
      `${CO}(이하 "회사")는 「개인정보 보호법」 제30조에 따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 다음과 같이 개인정보처리방침을 수립·공개합니다.`,
      `본 방침은 회사가 운영하는 홈페이지(${SITE.url})에 적용됩니다.`,
    ],
  },
  {
    h: "제2조 (개인정보의 처리 목적)",
    body: [
      "회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행합니다.",
    ],
    list: [
      "문의 및 상담 신청에 대한 응대, 본인 확인, 상담 내용의 확인 및 회신",
      "무료 병원 진단 신청의 접수, 진단 결과의 작성 및 안내",
      "서비스 제안 및 계약 체결을 위한 연락",
    ],
  },
  {
    h: "제3조 (처리하는 개인정보의 항목 및 수집 방법)",
    body: ["회사는 다음의 개인정보 항목을 처리하고 있습니다."],
    table: {
      head: ["구분", "수집 항목", "수집 방법"],
      rows: [
        ["문의하기", "병원명, 진료과목, 담당자명, 직함(선택), 연락처, 이메일, 관심 서비스(선택), 문의 내용", "홈페이지 문의 양식"],
        ["무료 병원 진단", "병원명, 진료과목, 담당자명, 연락처, 이메일, 진단 문항 응답", "홈페이지 진단 양식"],
      ],
    },
    after: [
      "회사는 주민등록번호 등 고유식별정보와 민감정보를 수집하지 않습니다.",
    ],
  },
  {
    h: "제4조 (개인정보의 처리 및 보유 기간)",
    body: [
      "회사는 법령에 따른 개인정보 보유·이용 기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용 기간 내에서 개인정보를 처리·보유합니다.",
    ],
    list: [
      "문의 및 진단 신청 정보: 상담 종료 후 1년까지. 다만 계약이 체결된 경우에는 계약 종료 시까지",
      "관계 법령에 따라 보존할 필요가 있는 경우: 해당 법령이 정한 기간 (전자상거래 등에서의 소비자 보호에 관한 법률 — 계약 또는 청약철회 등에 관한 기록 5년, 소비자의 불만 또는 분쟁 처리에 관한 기록 3년)",
    ],
  },
  {
    h: "제5조 (개인정보의 제3자 제공)",
    body: [
      "회사는 정보주체의 개인정보를 제2조에서 명시한 범위 내에서만 처리하며, 정보주체의 별도 동의가 있거나 「개인정보 보호법」 제17조 및 제18조에 해당하는 경우에만 제3자에게 제공합니다.",
      "현재 회사는 개인정보를 제3자에게 제공하고 있지 않습니다.",
    ],
  },
  {
    h: "제6조 (개인정보 처리의 위탁)",
    body: [
      "회사는 원활한 업무 처리를 위하여 홈페이지 운영, 알림 발송 등 시스템 운영 업무를 외부 전문업체에 위탁할 수 있습니다. 위탁 시에는 「개인정보 보호법」 제26조에 따라 수탁자가 개인정보를 안전하게 처리하도록 계약서 등 문서에 필요한 사항을 명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독합니다.",
      "위탁 업무의 내용이나 수탁자가 변경될 경우에는 지체 없이 본 방침을 통하여 공개합니다.",
    ],
  },
  {
    h: "제7조 (정보주체와 법정대리인의 권리·의무 및 행사 방법)",
    body: [
      "정보주체는 회사에 대하여 언제든지 개인정보 열람, 정정·삭제, 처리정지 및 동의 철회를 요구할 수 있습니다.",
    ],
    list: [
      `권리 행사는 제11조의 개인정보 보호책임자에게 서면, 전화(${COMPANY.tel}) 또는 이메일(${COMPANY.email})로 하실 수 있으며, 회사는 이에 대해 지체 없이 조치합니다.`,
      "권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다. 이 경우 「개인정보 처리 방법에 관한 고시」 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.",
      "개인정보 열람 및 처리정지 요구는 「개인정보 보호법」 제35조 제4항, 제37조 제2항에 의하여 정보주체의 권리가 제한될 수 있습니다.",
      "정정·삭제 요구는 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다.",
    ],
  },
  {
    h: "제8조 (개인정보의 파기 절차 및 방법)",
    body: [
      "회사는 개인정보 보유 기간의 경과, 처리 목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체 없이 해당 개인정보를 파기합니다.",
    ],
    list: [
      "파기 절차: 파기 사유가 발생한 개인정보를 선정하고, 개인정보 보호책임자의 승인을 받아 파기합니다.",
      "파기 방법: 전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제하며, 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각하여 파기합니다.",
    ],
  },
  {
    h: "제9조 (개인정보의 안전성 확보 조치)",
    body: ["회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다."],
    list: [
      "관리적 조치: 내부관리계획의 수립·시행, 개인정보 취급 담당자의 최소화 및 교육",
      "기술적 조치: 개인정보 전송 구간의 암호화(HTTPS), 접근 권한의 관리, 자동화된 부정 접수 방지 조치",
      "물리적 조치: 개인정보가 보관된 장소 및 자료에 대한 접근 통제",
    ],
  },
  {
    h: "제10조 (개인정보 자동 수집 장치의 설치·운영 및 거부에 관한 사항)",
    body: [
      "회사는 이용자를 식별하기 위한 목적으로 쿠키(cookie)를 별도로 운영하지 않습니다. 홈페이지 이용 과정에서 브라우저가 자체적으로 저장하는 정보가 있을 수 있으며, 정보주체는 웹 브라우저의 옵션 설정을 통해 이를 거부하거나 삭제할 수 있습니다.",
    ],
  },
  {
    h: "제11조 (개인정보 보호책임자)",
    body: [
      "회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만 처리 및 피해 구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.",
    ],
    table: {
      head: ["구분", "내용"],
      rows: [
        ["개인정보 보호책임자", `${COMPANY.ceo} (대표)`],
        ["전화", COMPANY.tel],
        ["이메일", COMPANY.email],
      ],
    },
    after: [
      "정보주체는 회사의 서비스를 이용하면서 발생한 모든 개인정보 보호 관련 문의, 불만 처리, 피해 구제 등에 관한 사항을 개인정보 보호책임자에게 문의하실 수 있습니다. 회사는 정보주체의 문의에 대해 지체 없이 답변 및 처리해 드립니다.",
    ],
  },
  {
    h: "제12조 (권익침해 구제 방법)",
    body: [
      "정보주체는 개인정보 침해로 인한 구제를 받기 위하여 아래 기관에 분쟁 해결이나 상담 등을 신청할 수 있습니다.",
    ],
    list: [
      "개인정보분쟁조정위원회: (국번 없이) 1833-6972 / www.kopico.go.kr",
      "개인정보침해신고센터: (국번 없이) 118 / privacy.kisa.or.kr",
      "대검찰청 사이버수사과: (국번 없이) 1301 / www.spo.go.kr",
      "경찰청 사이버수사국: (국번 없이) 182 / ecrm.police.go.kr",
    ],
  },
  {
    h: "제13조 (개인정보처리방침의 변경)",
    body: [
      "본 방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경 내용의 추가, 삭제 및 정정이 있는 경우에는 변경 사항의 시행 7일 전부터 홈페이지를 통하여 고지합니다.",
    ],
  },
];

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "개인정보처리방침" }]}
        title="개인정보처리방침"
        lead={`${CO}는 정보주체의 개인정보를 「개인정보 보호법」에 따라 보호하며, 아래와 같이 처리합니다.`}
      />

      <Section no="01" label="처리방침">
        <Container className="!px-0">
          <div className="max-w-3xl">
            <dl className="mb-14 grid gap-px border border-ink-900/15 bg-ink-900/12 sm:grid-cols-2">
              {COMPANY_INFO.map((c) => (
                <div key={c.label} className="bg-cream-100 p-5">
                  <dt className="label label-ko">{c.label}</dt>
                  <dd className="mt-2 text-sm text-ink-700">{c.value}</dd>
                </div>
              ))}
            </dl>

            {ARTICLES.map((a) => (
              <section key={a.h} className="mb-12">
                <h2 className="text-lg font-medium text-ink-900 md:text-xl">{a.h}</h2>
                {a.body?.map((p) => (
                  <p key={p} className="prose-ko mt-4 text-sm text-ink-700">
                    {p}
                  </p>
                ))}
                {a.list && (
                  <ol className="mt-5 space-y-2.5 border-t border-ink-900/12 pt-5">
                    {a.list.map((li, i) => (
                      <li key={li} className="flex gap-3 text-sm text-ink-700">
                        <span className="tnum shrink-0 text-ink-500">{i + 1}.</span>
                        <span className="prose-ko">{li}</span>
                      </li>
                    ))}
                  </ol>
                )}
                {a.table && (
                  <div className="mt-5 overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                      <thead>
                        <tr>
                          {a.table.head.map((h) => (
                            <th
                              key={h}
                              scope="col"
                              className="border border-ink-900/15 bg-cream-50 px-4 py-3 text-left font-medium text-ink-900"
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {a.table.rows.map((r) => (
                          <tr key={r[0]}>
                            {r.map((cell, i) => (
                              <td
                                key={i}
                                className="prose-ko border border-ink-900/15 px-4 py-3 align-top text-ink-700"
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {a.after?.map((p) => (
                  <p key={p} className="prose-ko mt-4 text-sm text-ink-700">
                    {p}
                  </p>
                ))}
              </section>
            ))}

            <div className="mt-16 border-t border-ink-900/15 pt-6 text-sm text-ink-500">
              <p>공고일자: 2026년 9월 3일</p>
              <p className="mt-1">시행일자: 2026년 9월 10일</p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
