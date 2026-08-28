# 닥터플래너스 — 로파이 와이어프레임

구조 검증용 그레이스케일 와이어프레임입니다. 시안 디자인은 아직 입히지 않았습니다.

```bash
npm run dev   # http://localhost:3000
```

`/sitemap-view` 에서 전체 34개 화면을 클릭해 확인할 수 있습니다.
우하단 플로팅 툴바로 헤더 라벨 **축약 ↔ 풀네임**을 비교할 수 있습니다.

## 구조

```
src/
├─ config/nav.ts              ★ 네비게이션 단일 소스
│                               헤더 · 모바일 메뉴 · 푸터 · 사이트맵이 전부 여기서 파생
├─ content/home.ts              메인 페이지 문구 (마크업과 분리)
├─ components/
│  ├─ ui/                       Container · Section · Media · TextLines · Button
│  ├─ layout/                   Header · Footer · WireframeToolbar
│  ├─ sections/home.tsx         메인 10개 섹션 (시안 01~10 대응)
│  └─ templates/                하위 페이지 템플릿 6종
└─ app/                         라우트 — 페이지 파일은 템플릿 호출만 담당
```

## 템플릿 6종

| 템플릿 | 파일 | 적용 라우트 |
|---|---|---|
| 솔루션 허브 | `SolutionHub.tsx` | `/signature` `/branding` `/marketing` `/medical-ai` |
| 솔루션 상세 | `SolutionDetail.tsx` | 하위 리프 16개 |
| 목록 | `Insight.tsx › ListTemplate` | `/insight/column` `/insight/blog` |
| 아티클 상세 | `Insight.tsx › ArticleTemplate` | `/insight/*/[slug]` |
| 진단 플로우 | `DiagnosisFlow.tsx` | `/diagnosis` |
| 컨택트 | `app/contact/page.tsx` | `/contact` |

About(철학·회사소개), FAQ 아코디언, 공지 목록은 성격이 달라 개별 구성했습니다.

## 시안 적용 시 손댈 곳

1. `src/app/globals.css` 상단 `LO-FI WIREFRAME TOKENS` 블록 → 다크그린/크림 팔레트로 교체
2. `Media` 컴포넌트 → `next/image` 로 교체
3. `WireframeToolbar` 제거, `wf-label` / `TextLines` 더미 제거
4. `/sitemap-view` 제거 (또는 비공개 유지)

레이아웃 구조와 라우팅은 그대로 두고 위 4가지만 바꾸면 됩니다.
