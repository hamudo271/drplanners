/**
 * 서비스 허브별 고유 도식.
 *
 * 세 허브가 같은 카드 목록만 반복하면 페이지 목적이 배치로 드러나지 않습니다.
 * 그래서 허브마다 **형태가 다른** 도식을 하나씩 둡니다 —
 *   브랜딩    가로 사슬 (환자가 병원을 만나는 지점들이 이어짐)
 *   마케팅    깔때기   (광고비가 줄어들며 신환이 되는 과정)
 *   메디컬 AI 계단     (아래층이 있어야 위층이 생기는 구조)
 *
 * 문구는 지어낸 수치 없이, 이미 사이트에서 말하고 있는 것만 씁니다.
 */

/* ── 브랜딩: 접점 맵 ───────────────────────────────────── */
export const TOUCHPOINTS = {
  label: "접점 맵",
  title: "환자가 병원을 만나는 다섯 지점",
  lead: "브랜딩은 로고를 바꾸는 일이 아니라, 이 다섯 지점의 인상을 하나로 맞추는 일입니다.",
  steps: [
    {
      no: "01",
      name: "검색 결과",
      body: "병원 이름이 처음 보이는 곳입니다.",
      ours: [{ label: "플레이스 최적화", href: "/branding/place" }],
    },
    {
      no: "02",
      name: "플레이스",
      body: "사진, 소식, 후기로 갈지 말지를 정합니다.",
      ours: [{ label: "플레이스 최적화", href: "/branding/place" }],
    },
    {
      no: "03",
      name: "블로그 · SNS",
      body: "이 병원이 뭘 잘하는지 확인합니다.",
      ours: [{ label: "계정 운영", href: "/branding/account" }],
    },
    {
      no: "04",
      name: "원내 화면",
      body: "대기하는 동안 한 번 더 설득됩니다.",
      ours: [{ label: "대기실 영상 제작", href: "/branding/in-clinic-video" }],
    },
    {
      no: "05",
      name: "재방문 · 소개",
      body: "기억에 남았는지가 여기서 갈립니다.",
      ours: [
        { label: "영상 브랜딩", href: "/branding/video" },
        { label: "언론보도", href: "/branding/press" },
      ],
    },
  ],
  closing:
    "다섯 지점의 인상이 제각각이면, 환자는 같은 병원으로 인식하지 못합니다.",
};

/* ── 마케팅: 예산 흐름 ─────────────────────────────────── */
export const BUDGET_FUNNEL = {
  label: "예산 흐름",
  title: "광고비는 이 여섯 칸을 지나 신환이 됩니다",
  lead: "어느 칸에서 새는지 모르면 예산을 늘려도 같은 자리에서 샙니다. 저희는 칸마다 숫자를 붙여 어디가 막혔는지부터 찾습니다.",
  steps: [
    { name: "광고비 집행", leak: "" },
    { name: "노출", leak: "타겟이 틀렸다면 여기서 샙니다" },
    { name: "클릭 · 방문", leak: "소재가 약하면 여기서 샙니다" },
    { name: "문의", leak: "믿을 근거가 없으면 여기서 샙니다" },
    { name: "예약", leak: "응대와 예약 동선이 막히면 여기서 샙니다" },
    { name: "내원", leak: "여기까지 와야 신환 한 명입니다" },
  ],
  closing: "대부분의 리포트는 두 번째 칸까지만 보고합니다.",
};

/* ── 메디컬 AI: 검색 구조 ──────────────────────────────── */
export const SEARCH_STACK = {
  label: "노출 구조",
  title: "검색에서 AI 답변까지, 네 층으로 쌓입니다",
  lead: "AI가 병원을 언급하게 만드는 일은 따로 떨어진 작업이 아닙니다. 아래층이 비어 있으면 위층은 만들어지지 않습니다.",
  layers: [
    {
      no: "04",
      name: "AI 답변에 인용",
      body: "환자가 AI에게 물었을 때 병원 이름이 나옵니다.",
      href: "/medical-ai/aeo-geo",
    },
    {
      no: "03",
      name: "검색엔진 노출",
      body: "네이버와 구글이 목록에 올려줍니다.",
      href: "/medical-ai/seo",
    },
    {
      no: "02",
      name: "구조화 데이터",
      body: "기계가 병원을 이해할 수 있는 형식으로 정리합니다.",
      href: "/medical-ai/seo",
    },
    {
      no: "01",
      name: "홈페이지",
      body: "사람이 읽을 정보가 실제로 존재하는 곳입니다.",
      href: "/medical-ai/website",
    },
  ],
  closing: "그래서 AI 노출은 홈페이지에서 시작합니다.",
};

/** 허브 경로 → 도식 종류 */
export const HUB_DIAGRAM: Record<string, "touchpoints" | "funnel" | "stack"> = {
  "/branding": "touchpoints",
  "/marketing": "funnel",
  "/medical-ai": "stack",
};
