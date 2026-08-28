/**
 * 사이트 네비게이션 단일 소스.
 * 헤더 / 모바일 메뉴 / 푸터 / 사이트맵 페이지가 전부 여기서 파생됩니다.
 * 메뉴 변경은 이 파일만 수정하면 됩니다.
 */

export type NavChild = {
  label: string;
  href: string;
  /** 솔루션 상세에서 부제로 쓰이는 한 줄 설명 */
  blurb?: string;
};

export type NavItem = {
  /** 헤더에 노출되는 짧은 라벨 */
  label: string;
  /** 사이트맵 원본 풀 라벨 — 드롭다운 헤딩 / 페이지 타이틀용 */
  fullLabel: string;
  href: string;
  children?: NavChild[];
};

export const NAV: NavItem[] = [
  {
    label: "닥터플래너스",
    fullLabel: "닥터플래너스",
    href: "/about",
    children: [
      { label: "닥터플래너스 철학", href: "/about/philosophy", blurb: "We plan. You practice." },
      { label: "회사소개", href: "/about/company", blurb: "조직 · 연혁 · 파트너" },
    ],
  },
  {
    label: "시그니처",
    fullLabel: "DRP 시그니처",
    href: "/signature",
    children: [
      { label: "닥터 플래닝", href: "/signature/doctor", blurb: "퍼스널 — 원장 개인 브랜딩" },
      { label: "개원 플래닝", href: "/signature/opening", blurb: "초기 — 개원 준비부터 오픈까지" },
      { label: "그로스 플래닝", href: "/signature/growth", blurb: "운영중 — 성장 구간 재설계" },
    ],
  },
  {
    label: "브랜딩",
    fullLabel: "브랜딩 솔루션",
    href: "/branding",
    children: [
      { label: "계정 운영", href: "/branding/account", blurb: "인스타 · 유튜브 · 블로그 채널 운영" },
      { label: "플레이스 최적화", href: "/branding/place", blurb: "네이버 플레이스 상위 노출" },
      { label: "언론보도", href: "/branding/press", blurb: "기사 · 인터뷰 · PR" },
      { label: "원내 영상 송출 제작", href: "/branding/in-clinic-video", blurb: "대기실 · 진료실 사이니지" },
      { label: "영상 브랜딩", href: "/branding/video", blurb: "브랜드 필름 · 숏폼" },
    ],
  },
  {
    label: "마케팅",
    fullLabel: "마케팅 솔루션",
    href: "/marketing",
    children: [
      { label: "CPC / CPM 광고", href: "/marketing/paid-ads", blurb: "검색 · 디스플레이 퍼포먼스" },
      { label: "바이럴마케팅", href: "/marketing/viral", blurb: "카페 · 커뮤니티 · 체험단" },
      { label: "의료광고심의 대행", href: "/marketing/review", blurb: "심의 접수부터 승인까지" },
      { label: "국내·외 인플루언서", href: "/marketing/influencer", blurb: "섭외 · 캐스팅 · 집행" },
      { label: "해외 환자 유치", href: "/marketing/global-patients", blurb: "글로벌 채널 · 다국어" },
    ],
  },
  {
    label: "메디컬 AI",
    fullLabel: "메디컬 AI 솔루션",
    href: "/medical-ai",
    children: [
      { label: "홈페이지 제작", href: "/medical-ai/website", blurb: "반응형 · 예약 연동" },
      { label: "검색엔진 최적화", href: "/medical-ai/seo", blurb: "SEO — 검색 유입 설계" },
      { label: "AEO / GEO", href: "/medical-ai/aeo-geo", blurb: "AI 답변 · 생성형 검색 노출" },
    ],
  },
  {
    label: "인사이트",
    fullLabel: "메디컬 칼럼",
    href: "/insight",
    children: [
      { label: "칼럼", href: "/insight/column", blurb: "의료 마케팅 관점" },
      { label: "블로그", href: "/insight/blog", blurb: "실무 노트" },
      { label: "FAQ", href: "/insight/faq", blurb: "자주 묻는 질문" },
      { label: "공지사항", href: "/insight/notice", blurb: "소식 · 안내" },
    ],
  },
  {
    label: "진단",
    fullLabel: "메디컬 진단 시스템",
    href: "/diagnosis",
    children: [{ label: "문의폼 작성하기", href: "/diagnosis#form", blurb: "진단 결과 + 상담 접수" }],
  },
];

/** 헤더 우측 CTA — 사이트맵의 contact */
export const NAV_CTA = { label: "contact", href: "/contact" };

/** 전체 리프 경로 (사이트맵 페이지 / QA 체크리스트용) */
export const ALL_ROUTES = [
  "/",
  ...NAV.flatMap((item) => [item.href, ...(item.children ?? []).map((c) => c.href)]),
  NAV_CTA.href,
];
