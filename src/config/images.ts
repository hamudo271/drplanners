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
  problem: img(34),       // 어두운 정물
  rest: img(30),          // 잎 + 물방울
  /** 마지막 문의 배너 — 로고가 양각된 상자가 오른쪽에 걸리는 와이드 컷(더가든의 양각 벽 자리) */
  cta: img(7),
  works: [img(27), img(25), img(19)],
  /** 인사이트 카드 더미 — 앞 장, 뒤 장 */
  insight: [img(21), img(31)],
  solutions: [img(10), img(23), img(17)], // 브랜딩 / 마케팅 / 메디컬 AI
  philosophyTexture: img(25),             // 브랜드 디테일 — 철학 섹션
  /**
   * 01 히어로 — 영상 대신 천천히 교차하며 다가오는 3컷.
   * 따뜻한 책상 → 아이보리 공간 → 짙은 잎사귀(원래 시안의 히어로) 순으로 밝기가 고르게 돕니다.
   * 로고가 크게 찍힌 목업 컷은 피했습니다 — 태그라인 옆에 로고가 두 번 보입니다.
   */
  introFrames: [img(8), img(11), img(32)],
  /** 02 — 초점이 날아간 공간(01의 아이보리 공간을 흐린 것)과 그 앞에서 열리는 카드 */
  introWhyBg: "/intro/why-bg.jpg",
  introWhyCard: img(19),
  /** 03 — 세로 사진(사람의 손이 닿은 컷)과 작은 장식 컷 */
  fitPhoto: img(14),
  fitDeco: img(34),
  /** "어디가 막혔는지" 어두운 판의 질감 배경 */
  bottleneckBg: img(30),
  /** 일하는 순서 4장 — 아치 카드 (진단 · 방향 결정 · 설계 · 실행·관리) */
  process: [img(12), img(13), img(27), img(25)],
  /** "지키는 것" 어두운 판의 배경 */
  promiseBg: img(33),
};

/* ── 솔루션 허브 키비주얼 (21:9) ──────────────────
   가로로 크게 잘리는 자리라, 어디를 잘라도 구도가 사는
   질감·와이드 원본만 씁니다. 정사각 목업은 여기 쓰지 않습니다. */
export const HUB_HERO: Record<string, string> = {
  "/signature": img(7),    // 2.25:1 원본 — 브랜드 컬렉션
  "/branding": img(33),    // 그린 + 크림 실크
  "/marketing": img(31),   // 그린 + 골드 추상
  "/medical-ai": img(29),  // 실크 + 물방울
  "/about": img(7),        // 브랜드 컬렉션 — 15번은 옛 태그라인이 박혀 있어 뺐습니다
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
  img(8), img(10), img(12), img(19), img(23),
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
  intro: img(25),             // 밝은 브랜드 카드 + 잎 — 회사 소개 첫 블록의 둥근 사진
  philosophy: img(19),        // 그린 스테이지 — 22번 포스터는 옛 태그라인이 박혀 있어 뺐습니다
  company: img(11),           // 2.25:1 인테리어 전경
};

/* ── 인사이트 ───────────────────────────────────── */
export const INSIGHT = {
  featured: img(25),          // 13·21번 꽃 상자는 옛 태그라인이 인쇄돼 있어 뺐습니다
  articleHero: img(30),       // 21번은 옛 태그라인이 인쇄돼 있어 뺐습니다
  articleBody: img(25),
};

const CARD_POOL = [
  img(8), img(19), img(23), img(25),
  img(27), img(28), img(29), img(30), img(31), img(33), img(34),
];

/** 목록/관련글 카드 — 인덱스로 순환 */
export const cardImage = (i: number) => CARD_POOL[i % CARD_POOL.length];

/* ── 하단 CTA 밴드 (거의 모든 하위 페이지에 노출) ── */
export const CTA_BAND = img(14);   // 손 + 브로슈어 — 다른 슬롯과 겹치지 않는 유일 이미지

/* ── 진단 · 컨택트 ─────────────────────────────── */
export const DIAGNOSIS_HERO = img(19);  // 그린 스테이지 + 올리브 가지
export const CONTACT_HERO = img(29);    // 실크 + 물방울

/* ── 반복 슬롯 피커 ─────────────────────────────
   같은 페이지 안에서 이미지가 겹치지 않도록 오프셋을 벌려둡니다. */
/* 13 · 15 · 21 · 22 는 옛 태그라인 문구가 사진에 박혀 있고, 24 는 코럴색 소파라 팔레트를 벗어납니다 — 어디에도 쓰지 않습니다 */
const CARD_IMAGES = [
  img(8), img(9), img(10), img(12), img(19),
  img(23), img(25), img(27), img(30), img(32), img(34),
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
