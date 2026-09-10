export const SITE = {
  name: "닥터플래너스",
  nameEn: "DR.PLANERS",
  tagline: "병원 마케팅, 방향부터 결정합니다",
  /** 대표 주소 — canonical · OG · sitemap. 환경변수로 덮어쓸 수 있습니다 */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://dr-planners.com",
  description:
    "광고비는 쓰는데 신환이 늘지 않는 병원을 위한 마케팅 플래닝. 어디서 새는지 진단하고, 방향을 정하고, 실행까지 맡습니다. 브랜딩 · 플레이스 · 콘텐츠 · 광고 · 홈페이지 · 검색 노출.",
  locale: "ko_KR",
  /** 카카오톡 채널 URL — 비어 있으면 플로팅 버튼을 그리지 않습니다 */
  kakaoChannel: process.env.NEXT_PUBLIC_KAKAO_CHANNEL_URL ?? "",
} as const;
