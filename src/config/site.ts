/**
 * 사이트 전역 상수.
 * 커스텀 도메인이 연결되면 NEXT_PUBLIC_SITE_URL 환경변수만 바꾸면 됩니다.
 */
export const SITE = {
  name: "닥터플래너스",
  nameEn: "DR.PLANERS",
  tagline: "Medical Growth Partner",
  /** 배포 도메인 — 환경변수 우선 */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://drplanners-production-e227.up.railway.app",
  description:
    "A SANCTUARY FOR DOCTORS — 병원은 더 성장하고, 원장님은 더 여유롭게. 병의원 브랜딩·마케팅·운영·성장을 하나의 계획으로 설계합니다.",
  locale: "ko_KR",
} as const;

/** 페이지 title을 일관된 형식으로 만듭니다 */
export const pageTitle = (title: string) => `${title} | ${SITE.name}`;

/** 절대 URL */
export const absUrl = (path: string) => new URL(path, SITE.url).toString();
