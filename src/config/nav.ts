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
  /** 좁은 화면·모바일에서 쓰는 짧은 라벨 */
  label: string;
  /** 대표 명칭 — 헤더 대메뉴 / 드롭다운 헤딩 / 페이지 타이틀 */
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
    label: "성장 플래닝",
    fullLabel: "병원 성장 플래닝",
    href: "/signature",
    children: [
      { label: "원장 개인 브랜딩", href: "/signature/doctor", blurb: "원장님을 아는 사람이 병원을 찾습니다" },
      { label: "개원 준비", href: "/signature/opening", blurb: "개원 준비부터 오픈까지" },
      { label: "성장 재설계", href: "/signature/growth", blurb: "운영 중인 병원의 다음 구간" },
    ],
  },
  {
    label: "브랜딩",
    fullLabel: "병원 브랜딩",
    href: "/branding",
    children: [
      { label: "계정 운영", href: "/branding/account", blurb: "인스타 · 유튜브 · 블로그 채널 운영" },
      { label: "플레이스 최적화", href: "/branding/place", blurb: "네이버 플레이스 상위 노출" },
      { label: "언론보도", href: "/branding/press", blurb: "기사 · 인터뷰 · PR" },
      { label: "대기실 영상 제작", href: "/branding/in-clinic-video", blurb: "대기실 · 진료실 화면에 트는 영상" },
      { label: "영상 브랜딩", href: "/branding/video", blurb: "브랜드 필름 · 숏폼" },
    ],
  },
  {
    label: "마케팅",
    fullLabel: "병원 마케팅",
    href: "/marketing",
    children: [
      { label: "검색 · 배너 광고", href: "/marketing/paid-ads", blurb: "네이버 · 구글 · 인스타 광고 집행" },
      { label: "바이럴마케팅", href: "/marketing/viral", blurb: "카페 · 커뮤니티 · 체험단" },
      { label: "의료광고심의 대행", href: "/marketing/review", blurb: "심의 접수부터 승인까지" },
      { label: "인플루언서", href: "/marketing/influencer", blurb: "국내 · 해외 섭외부터 집행까지" },
      { label: "해외 환자 유치", href: "/marketing/global-patients", blurb: "글로벌 채널 · 다국어" },
    ],
  },
  {
    label: "홈페이지·검색",
    fullLabel: "홈페이지 · 검색 노출",
    href: "/medical-ai",
    children: [
      { label: "홈페이지 제작", href: "/medical-ai/website", blurb: "반응형 · 예약 연동" },
      { label: "검색 노출 최적화", href: "/medical-ai/seo", blurb: "검색해서 들어오는 길 만들기" },
      { label: "AI 검색 노출", href: "/medical-ai/aeo-geo", blurb: "챗GPT · AI 답변에 병원이 언급되게" },
    ],
  },
  {
    label: "읽을거리",
    fullLabel: "읽을거리",
    href: "/insight",
    children: [
      { label: "칼럼", href: "/insight/column", blurb: "병원 마케팅을 보는 관점" },
      { label: "블로그", href: "/insight/blog", blurb: "실무 노트" },
      { label: "자주 묻는 질문", href: "/insight/faq", blurb: "계약 · 기간 · 비용" },
      { label: "공지사항", href: "/insight/notice", blurb: "소식 · 안내" },
    ],
  },
  {
    label: "무료 진단",
    fullLabel: "무료 병원 진단",
    href: "/diagnosis",
    children: [{ label: "진단 신청하기", href: "/diagnosis#form", blurb: "5개 항목 확인 후 접수" }],
  },
];

/**
 * 헤더 우측 CTA — 전 사이트의 단일 행동.
 * 문구와 목적지는 content/home.ts 의 PRIMARY_CTA 와 같아야 합니다.
 */
export const NAV_CTA = { label: "무료 병원 진단", href: "/diagnosis" };

/**
 * 보조 경로. 메뉴에는 넣지 않지만(행동이 갈리므로) 푸터와 사이트맵에는 남깁니다 —
 * 진단 말고 그냥 물어보고 싶은 분들의 길을 막지 않기 위해서입니다.
 */
export const SECONDARY_LINKS = [
  { label: "문의하기", href: "/contact" },
  { label: "개인정보처리방침", href: "/privacy" },
];

/** 전체 리프 경로 (사이트맵 페이지 / QA 체크리스트용) */
export const ALL_ROUTES = [
  "/",
  ...NAV.flatMap((item) => [item.href, ...(item.children ?? []).map((c) => c.href)]),
  ...SECONDARY_LINKS.map((l) => l.href),
];

/**
 * 함께 보면 좋은 솔루션.
 * 실무에서 같이 가는 조합을 짝지어, 상세 페이지끼리 연결합니다.
 * (내부 링크 구조와 체류시간에도 도움이 됩니다)
 */
export const RELATED: Record<string, string[]> = {
  // 시그니처 — 단계별로 이어집니다
  "/signature/doctor": ["/branding/account", "/branding/video"],
  "/signature/opening": ["/medical-ai/website", "/branding/place"],
  "/signature/growth": ["/marketing/paid-ads", "/medical-ai/seo"],

  // 브랜딩
  "/branding/account": ["/branding/video", "/marketing/viral"],
  "/branding/place": ["/medical-ai/seo", "/branding/account"],
  "/branding/press": ["/marketing/viral", "/signature/doctor"],
  "/branding/in-clinic-video": ["/branding/video", "/branding/account"],
  "/branding/video": ["/branding/account", "/marketing/influencer"],

  // 마케팅
  "/marketing/paid-ads": ["/marketing/review", "/medical-ai/website"],
  "/marketing/viral": ["/branding/place", "/branding/press"],
  "/marketing/review": ["/marketing/paid-ads", "/marketing/influencer"],
  "/marketing/influencer": ["/marketing/review", "/branding/video"],
  "/marketing/global-patients": ["/medical-ai/website", "/medical-ai/seo"],

  // 메디컬 AI
  "/medical-ai/website": ["/medical-ai/seo", "/marketing/paid-ads"],
  "/medical-ai/seo": ["/medical-ai/aeo-geo", "/branding/place"],
  "/medical-ai/aeo-geo": ["/medical-ai/seo", "/medical-ai/website"],
};

/** href로 메뉴 정보(라벨·설명·상위)를 찾습니다 */
export function findByHref(href: string) {
  for (const item of NAV) {
    const child = item.children?.find((c) => c.href === href);
    if (child) return { ...child, parent: item.fullLabel };
  }
  return null;
}
