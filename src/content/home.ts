/** 메인 페이지 콘텐츠. 마크업과 분리해 두어 문구 수정이 쉬운 구조입니다. */

export const HERO = {
  title: ["A SANCTUARY", "FOR DOCTORS."],
  body: ["병원은 더 성장하고,", "원장님은 더 여유롭게."],
  services: "Branding · Marketing · Operation · Growth",
  cta: "Meet Dr.Planers",
};

export const PROBLEM = {
  title: ["진료가 끝나도", "하루는 끝나지 않습니다."],
  lead: "리뷰 답글, 블로그 노출 확인, 광고비 점검 — 침대에 누워 핸드폰으로 플레이스 순위를 확인하다 잠드시는 밤. 원장님이라면 낯설지 않으실 겁니다.",
  timeline: [
    { time: "21:42", text: "오늘 블로그는 올려야 할까." },
    { time: "22:13", text: "플레이스 순위는 떨어지지 않았을까." },
    { time: "23:06", text: "이번 달 광고비는 제대로 쓰이고 있을까." },
    { time: "00:17", text: "내일 촬영 콘텐츠를 확인한다." },
  ],
  closing: "이 시간까지 원장님의 일이어야 할까요?",
};

export const WHY = {
  title: ["대행사를 세 번 바꿨는데,", "결과는 왜 똑같을까요?"],
  body: [
    "매달 리포트는 옵니다. 노출 수, 방문자 수, 순위 상승. 숫자는 다 올라갔다는데, 예약 문의는 그대로입니다.",
    "대부분의 대행사는 악덕이 아닙니다. 실력이 없어서도 아닙니다. 실행 단가로 돈을 버는 구조상, 방향을 결정해줄 수 없는 위치에 있을 뿐입니다.",
  ],
  report: {
    label: "어느 달의 리포트",
    line: "전월 대비 블로그 노출 수 32% 상승, C-Rank 상승 중",
    retort: "그래서요?",
    caption:
      "그 32%가 몇 건의 문의가 됐고, 몇 명의 신환이 됐는지는 리포트 어디에도 없습니다.",
  },
  punch: ["성과가 안 나는 이유는 실행력 부족이 아닙니다.", "아무도 방향을 결정하지 않았기 때문입니다."],
};

export const PHILOSOPHY = {
  title: ["We plan.", "You practice."],
  body: [
    "닥터플래너스는 DOCTOR와 PLANNERS를 합친 이름입니다.",
    "원장님이 마케팅이라는 짐을 완전히 내려놓고 쉬실 수 있도록,",
    "그 결정을 대신 설계하는 사람들이라는 뜻입니다.",
  ],
  quote: "오늘은 마케팅 생각 안 하셔도 됩니다",
  formula: "DOCTOR + PLANNERS = DR.PLANERS",
};

export const SIGNATURE = {
  title: ["PRIVATE", "PLANNING"],
  subtitle: "한 병원을 위한 하나의 계획.",
  body: [
    "병원에서 뽑아 내려오는 계획은 없습니다.",
    "진료과목 / 상권 / 경쟁 / 환자 / 브랜드 / 성장 환경을 분석하고",
    "하나의 방법을 설계합니다.",
    "이 계획은 6단계 DR.PLAN 프로세스로 실행됩니다.",
  ],
  steps: [
    { no: "01", en: "DIAGNOSIS", ko: "병원의 현재를\n진단합니다." },
    { no: "02", en: "DIRECTION", ko: "가야 할 방향을\n결정합니다." },
    { no: "03", en: "PLANNING", ko: "브랜드·마케팅을\n설계합니다." },
    { no: "04", en: "MANAGEMENT", ko: "실행하고\n관리합니다." },
  ],
};

export const SOLUTIONS = {
  title: "EVERYTHING YOUR CLINIC NEEDS.",
  cards: [
    {
      en: "BRANDING",
      ko: "기억되는 병원을 만듭니다.",
      href: "/branding",
      items: ["계정 운영", "플레이스 최적화", "언론보도", "원내 영상 송출", "영상 브랜딩"],
    },
    {
      en: "MARKETING",
      ko: "필요한 환자에게 발견되도록 합니다.",
      href: "/marketing",
      items: ["CPC · CPM 광고", "바이럴마케팅", "의료광고심의 대행", "인플루언서", "해외 환자 유치"],
    },
    {
      en: "MEDICAL AI",
      ko: "검색 이후의 검색을 준비합니다.",
      href: "/medical-ai",
      items: ["홈페이지 제작", "검색엔진 최적화 (SEO)", "AEO · GEO"],
    },
  ],
};

export const REST = {
  title: ["진료가 끝나면,", "정말 퇴근하세요."],
  sub: "DOCTOR, TAKE A REST. WE PLAN THE GROWTH.",
};

/**
 * 07 WORKS — 실제 사례 수치를 받기 전까지의 구성.
 * ⚠️ 지어낸 성과 수치는 넣지 않습니다. 실제 데이터가 확보되면
 *    cases에 { tag, headline, chips, metrics }를 채우고
 *    Works 컴포넌트의 사례 카드 분기를 사용하면 됩니다.
 */
export const WORKS = {
  title: "HOW WE PLAN.",
  lead: "사례는 계약 병원의 동의를 받은 뒤 순차적으로 공개합니다. 대신 저희가 어떤 순서로 일하는지를 먼저 보여드립니다.",
  more: "진단부터 시작하기",
  /** 실제 사례가 준비되면 여기에 채웁니다 */
  cases: [] as {
    tag: string;
    headline: string;
    chips: string[];
    metrics: { label: string; value: string }[];
  }[],
  /** 사례 대신 보여주는 접근 방식 3단 */
  approach: [
    {
      no: "01",
      tag: "BEFORE",
      title: "지금 어디가 막혀 있는지",
      body: "유입이 없는 병원과, 유입은 있는데 예약으로 이어지지 않는 병원은 처방이 완전히 다릅니다. 채널·전환·재방문 중 어디가 병목인지부터 찾습니다.",
    },
    {
      no: "02",
      tag: "STRATEGY",
      title: "목표에서 거꾸로 계산",
      body: "목표 매출 → 필요 신환 수 → 예약 문의 수 → 유입 수. 여기서 나온 숫자가 KPI가 됩니다. ‘열심히 하겠습니다’로 시작하지 않습니다.",
    },
    {
      no: "03",
      tag: "RESULT",
      title: "숫자를 해석해서 보고",
      body: "노출이 아니라 전환 경로를 봅니다. 신환 1명이 실제로 얼마에 만들어졌는지까지 계산해 ‘이래서 올랐습니다’로 설명합니다.",
    },
  ],
  note: "공개 가능한 사례가 준비되는 대로 이 자리에 게재합니다.",
};

export const DIAGNOSIS = {
  title: ["우리 병원은", "지금 어디에 있을까요?"],
  sub: "DR.PLANERS MEDICAL DIAGNOSIS",
  body: "5가지 항목을 진단하여 맞춤 솔루션을 제안해드립니다.",
  cta: "병원 진단 시작하기",
  items: ["브랜드 진단", "검색 진단", "콘텐츠 진단", "광고 진단", "AI 검색 진단"],
};

export const INSIGHT = {
  title: "THINKING FOR DOCTORS.",
  /** 실제 카테고리로 이동하는 링크 — 사이트맵의 메디컬 인사이트 하위와 일치 */
  tabs: [
    { label: "칼럼", href: "/insight/column" },
    { label: "블로그", href: "/insight/blog" },
    { label: "FAQ", href: "/insight/faq" },
    { label: "공지사항", href: "/insight/notice" },
  ],
  more: "전체 보기",
  /** 실제 아티클 3건 — content/articles.ts와 slug가 일치해야 합니다 */
  cards: [
    {
      cat: "칼럼",
      date: "2026.08.29",
      title: "왜 닥터플래너스일까?",
      href: "/insight/column/why-drplanners",
    },
    {
      cat: "칼럼",
      date: "2026.08.22",
      title: "플레이스 순위는 왜 안 오를까요?",
      href: "/insight/column/place-ranking-basics",
    },
    {
      cat: "칼럼",
      date: "2026.08.15",
      title: "의료광고 심의, 어디까지 받아야 하나요?",
      href: "/insight/column/medical-ad-review-basics",
    },
  ],
};

export const CTA = {
  eyebrow: "원장님들의 유일한 휴식처",
  title: ["원장님의 시간은", "진료와 삶을 위해 남겨두세요."],
  body: "마케팅만큼은 저희가 결정해서 가져가겠습니다. 원장님은 승인만 하시고, 나머지 시간은 쉬십시오.",
  button: "CONTACT DR.PLANERS",
};
