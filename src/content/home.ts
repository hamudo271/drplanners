/** 메인 페이지 콘텐츠. 마크업과 분리해 두어 문구 수정이 쉬운 구조입니다. */

export const HERO = {
  title: ["A SANCTUARY", "FOR DOCTORS."],
  body: ["진료에 집중하세요.", "그 밖의 성장은 우리가 설계합니다."],
  cta: "Meet Dr.Planers",
};

export const PROBLEM = {
  title: ["진료가 끝나도", "하루는 끝나지 않습니다."],
  timeline: [
    { time: "21:42", text: "오늘 블로그는 올려야 할까." },
    { time: "22:13", text: "플레이스 순위는 떨어지지 않았을까." },
    { time: "23:06", text: "이번 달 광고비는 제대로 쓰이고 있을까." },
    { time: "00:17", text: "내일 촬영 콘텐츠를 확인한다." },
  ],
  closing: "이 시간까지 원장님의 일이어야 할까요?",
};

export const PHILOSOPHY = {
  title: ["We plan.", "You practice."],
  body: [
    "마케팅에 대한 고민은 우리가 합니다.",
    "원장님의 시간은 더 중요한 곳에 쓰여야 하니까요.",
  ],
  formula: "DOCTOR + PLANNERS = DR.PLANERS",
};

export const SIGNATURE = {
  title: ["PRIVATE", "PLANNING"],
  subtitle: "한 병원을 위한 하나의 계획.",
  body: [
    "병원에서 뽑아 내려오는 계획은 없습니다.",
    "진료과목 / 상권 / 경쟁 / 환자 / 브랜드 / 성장 환경을 분석하고",
    "하나의 방법을 설계합니다.",
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
  sub: "The rest is ours.",
};

export const WORKS = {
  title: "PLANNED BY DR.PLANERS.",
  more: "전체 사례 보기",
  cases: [
    {
      tag: "DERMATOLOGY / SEO",
      headline: "검색에서 밀려나던 병원을 설계하다.",
      chips: ["SEO", "AEO"],
      metrics: [
        { label: "유입 증가", value: "231%" },
        { label: "예약 전환", value: "187%" },
      ],
    },
    {
      tag: "BRANDING / CONTENT",
      headline: "원장의 진료 철학을 하나의 브랜드로.",
      chips: ["Branding", "Content"],
      metrics: [
        { label: "브랜드 검색량", value: "310%" },
        { label: "신규 환자", value: "159%" },
      ],
    },
    {
      tag: "AI / SEARCH",
      headline: "검색 이후의 검색을 준비하다.",
      chips: ["AI", "GEO"],
      metrics: [
        { label: "AI 노출 점유", value: "270%" },
        { label: "문의 전환", value: "145%" },
      ],
    },
  ],
  flow: ["Before", "Strategy", "Result"],
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
  tabs: ["Medical Column", "Insight", "FAQ"],
  more: "전체 보기",
  cards: [
    { cat: "Medical Column", date: "2026.05.20", title: "의료 마케팅, 환자를 이해하는 것에서 시작합니다." },
    { cat: "Insight", date: "2026.05.13", title: "AI 시대, 병원이 준비해야 할 검색의 형태." },
    { cat: "FAQ", date: "2026.05.06", title: "블로그 운영, 꼭 해야 할까요?" },
  ],
};

export const CTA = {
  title: ["원장님의 시간은", "진료와 삶을 위해 남겨두세요."],
  body: "그 밖의 일은 닥터플래너스가 계획합니다.",
  button: "CONTACT DR.PLANERS",
};
