export const SITE = {
  name: "닥터플래너스",
  nameEn: "DR.PLANERS",
  tagline: "Medical Growth Partner",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://drplanners-production-e227.up.railway.app",
  description:
    "A SANCTUARY FOR DOCTORS — 병원은 더 성장하고, 원장님은 더 여유롭게. 병원 브랜딩 · 마케팅 · 메디컬 AI 솔루션을 진단부터 설계하는 의료 마케팅 파트너.",
  locale: "ko_KR",
  /** 카카오톡 채널 URL — 비어 있으면 플로팅 버튼을 그리지 않습니다 */
  kakaoChannel: process.env.NEXT_PUBLIC_KAKAO_CHANNEL_URL ?? "",
} as const;
