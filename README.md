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

## 관리자 CMS (`/admin`)

웹스랩 관리자와 같은 구성입니다. Prisma + Railway Postgres, 공용 비밀번호 로그인.

| 메뉴 | 하는 일 |
|---|---|
| 대시보드 | 새 접수 · 이번 달 접수 · 발행 글 · 누적 조회수, 최근 접수, 많이 읽힌 글 |
| 문의 · 진단 | `/contact` · `/diagnosis` 접수 전부 (메일 발송과 별개로 저장). 상태(새 접수/상담 중/완료) · 메모 |
| 글 목록 · 새 글 쓰기 | 칼럼 · 블로그 · 공지사항. Tiptap 에디터, 이미지 업로드(DB 보관 → `/media/<id>`), 임시저장 자동 저장 |

**Railway 설정** — 웹 서비스 → Variables

- `DATABASE_URL` — Add Reference → Postgres → `DATABASE_URL`
- `ADMIN_PASSWORD` — 관리자 비밀번호
- `ADMIN_JWT_SECRET` — `openssl rand -base64 32` 결과

배포 때 `scripts/start.sh` 가 `prisma migrate deploy` 로 테이블을 만듭니다.
DB가 없거나 끊겨도 공개 사이트는 `src/content/articles.ts` 의 글로 그대로 동작합니다.
관리자 → 글 목록의 "기존 글 7편 가져오기"를 한 번 누르면 그 뒤로는 DB가 정본입니다.

스키마를 바꿀 때: `prisma/schema.prisma` 수정 → `npx prisma migrate dev --name <이름>` (로컬 Postgres 필요) → 커밋.
