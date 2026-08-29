/**
 * 사진 배치표.
 *
 * public/ 의 `image N.png` (N = 7~35, 고유 24장) 을 슬롯에 매핑합니다.
 * 파일명에 공백이 있어 경로는 퍼센트 인코딩합니다.
 *
 * 제공된 이미지는 전부 브랜드 목업·질감 계열입니다 —
 * 의료진/진료실/사례 스크린샷 실사진은 없어서, 해당 성격의 슬롯은
 * 플레이스홀더로 남겨뒀습니다. (README의 "남은 이미지 슬롯" 참고)
 */

const img = (n: number) => `/image%20${n}.png`;

/* ── 메인 ───────────────────────────────────────── */
export const HOME = {
  hero: img(32),          // 짙은 잎사귀 — 풀블리드 배경
  problem: img(34),       // 어두운 정물
  rest: img(30),          // 잎 + 물방울
  cta: img(28),           // 그린 + 골드 실크
  works: [img(27), img(25), img(19)],
  insight: [img(8), img(29), img(31)],
  solutions: [img(10), img(23), img(17)], // 브랜딩 / 마케팅 / 메디컬 AI
  philosophyTexture: img(32),             // 딥그린 밴드 우측 식물 텍스처
};

/* ── 솔루션 허브 키비주얼 (21:9) ──────────────────
   가로로 크게 잘리는 자리라, 어디를 잘라도 구도가 사는
   질감·와이드 원본만 씁니다. 정사각 목업은 여기 쓰지 않습니다. */
export const HUB_HERO: Record<string, string> = {
  "/signature": img(7),    // 2.25:1 원본 — 브랜드 컬렉션
  "/branding": img(33),    // 그린 + 크림 실크
  "/marketing": img(31),   // 그린 + 골드 추상
  "/medical-ai": img(29),  // 실크 + 물방울
  "/about": img(15),       // 3240x1440 브랜드 배너
  "/insight": img(28),     // 그린 + 골드 실크
};

/* ── 솔루션 상세 ─────────────────────────────────── */
/** 21:9 상세 키비주얼용 — 가로 크롭에 강한 이미지만 */
const WIDE_POOL = [
  img(7), img(11), img(19), img(23), img(28), img(29),
  img(30), img(31), img(32), img(33), img(34),
];

/** 4:3 본문·카드용 — 구도가 살아있는 목업 포함 전체 */
const DETAIL_POOL = [
  img(8), img(10), img(12), img(13), img(19), img(21), img(23), img(24),
  img(25), img(27), img(28), img(29), img(30), img(31), img(33), img(34),
];

/** 경로 문자열로 안정적인 이미지를 고릅니다 (새로고침해도 동일) */
function pick(pool: string[], key: string, offset = 0) {
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0;
  return pool[(h + offset) % pool.length];
}

export const detailHero = (href: string) => pick(WIDE_POOL, href);
export const detailBody = (href: string) => pick(DETAIL_POOL, href, 5);
export const relatedWork = (href: string, i: number) => pick(DETAIL_POOL, href, 9 + i * 3);

/* ── 어바웃 ─────────────────────────────────────── */
export const ABOUT = {
  cards: [img(9), img(27)],   // 컬러 팔레트 보드 / 스테이셔너리
  philosophy: img(22),        // 브랜드 포스터 — 0.8 비율, 4:5 슬롯에 거의 그대로 들어갑니다
  company: img(11),           // 2.25:1 인테리어 전경
};

/* ── 인사이트 ───────────────────────────────────── */
export const INSIGHT = {
  featured: img(13),
  articleHero: img(21),
  articleBody: img(25),
};

const CARD_POOL = [
  img(8), img(13), img(19), img(21), img(23), img(24), img(25),
  img(27), img(28), img(29), img(30), img(31), img(33), img(34),
];

/** 목록/관련글 카드 — 인덱스로 순환 */
export const cardImage = (i: number) => CARD_POOL[i % CARD_POOL.length];

/* ── 하단 CTA 밴드 (거의 모든 하위 페이지에 노출) ── */
export const CTA_BAND = img(14);   // 손 + 브로슈어 — 다른 슬롯과 겹치지 않는 유일 이미지

/* ── 진단 · 컨택트 ─────────────────────────────── */
export const DIAGNOSIS_HERO = img(19);  // 그린 스테이지 + 올리브 가지
export const CONTACT_HERO = img(13);    // 크림 봉투 + 박스

/* ── 반복 슬롯 피커 ─────────────────────────────
   같은 페이지 안에서 이미지가 겹치지 않도록 오프셋을 벌려둡니다. */
const CARD_IMAGES = [
  img(8), img(9), img(10), img(12), img(13), img(19), img(21), img(22),
  img(23), img(24), img(25), img(27), img(30), img(32), img(34),
];

/** 솔루션 상세 01 — "이런 병원에 필요합니다" 카드 3장 */
export const whoImage = (href: string, i: number) =>
  pick(CARD_IMAGES, href, 2 + i * 5);

/** 솔루션 허브 — 하위 솔루션 카드 */
export const hubCard = (href: string, i: number) =>
  pick(CARD_IMAGES, href, 7 + i * 3);

/** 솔루션 상세 03 — 프로세스 뒤 풀블리드 밴드 */
export const detailBand = (href: string) => pick(WIDE_POOL, href, 6);

/** PageHero 기본 배경 — mediaSrc를 넘기지 않는 서브페이지용 */
export const DEFAULT_PAGE_HERO = img(32);   // 짙은 잎사귀
