import Link from "next/link";
import { Section, Media, TextLines } from "@/components/ui";
import { PageHero, CtaBand, findHub } from "./shared";
import { INSIGHT, cardImage } from "@/config/images";
import { ARTICLES, type Article } from "@/content/articles";

/** 인사이트 4개 탭 — nav.ts에서 파생 */
export function InsightTabs({ current }: { current: string }) {
  const hub = findHub("/insight");
  return (
    <div className="border-b border-ink-900/15 bg-cream-100">
      <div className="mx-auto flex w-full max-w-[1240px] gap-6 overflow-x-auto px-6 md:px-10">
        {hub.children?.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className={`shrink-0 py-4 text-sm ${ c.href === current ? "border-b-2 border-ink-900" : "text-ink-500" }`}
          >
            {c.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

/** 템플릿 4 — 목록 (칼럼 / 블로그) */
export function ListTemplate({
  href,
  title,
  lead,
}: {
  href: string;
  title: string;
  lead: string;
}) {
  return (
    <>
      <PageHero crumbs={[{ label: "메디컬 칼럼", href: "/insight" }, { label: title }]} title={title} lead={lead} />
      <InsightTabs current={href} />

      <Section>
        {/* 검색 + 정렬 */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2">
            {["전체", "브랜딩", "마케팅", "메디컬 AI"].map((f, i) => (
              <span
                key={f}
                className={`border px-4 py-2 text-xs ${ i === 0 ? "border-ink-900 bg-forest-800 text-white" : "border-ink-900/15 text-ink-500" }`}
              >
                {f}
              </span>
            ))}
          </div>
          <span className="flex w-full max-w-[260px] items-center justify-between border border-ink-900/15 px-4 py-2">
            <span className="label">검색어 입력</span>
            <span className="label">⌕</span>
          </span>
        </div>

        {/* 카드 그리드 — 실제 글 먼저, 나머지는 더미 자리 */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ARTICLES.filter((a) => a.list === href).map((a, i) => (
            <Link key={a.slug} href={`${href}/${a.slug}`} className="border border-ink-900/15 bg-cream-50">
              <Media
                label="썸네일"
                ratio="aspect-[16/10]"
                className="border-b!"
                src={cardImage(i)}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="p-5">
                <p className="label tnum">
                  {a.category} · {a.date}
                </p>
                <p className="display-ko mt-3 text-base">{a.title}</p>
                <p className="prose-ko mt-3 line-clamp-2 text-sm text-ink-500">{a.excerpt}</p>
              </div>
            </Link>
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <Link key={i} href={`${href}/sample-post`} className="border border-ink-900/15">
              <Media
                label="썸네일"
                ratio="aspect-[16/10]"
                className="border-b!"
                src={cardImage(i + 2)}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="p-5">
                <p className="label">CATEGORY · 2026.05.{String(20 - i).padStart(2, "0")}</p>
                <TextLines n={2} className="mt-3" />
                <TextLines n={2} className="mt-4" />
              </div>
            </Link>
          ))}
        </div>

        {/* 페이지네이션 */}
        <div className="mt-12 flex items-center justify-center gap-2">
          {["‹", "1", "2", "3", "4", "›"].map((p, i) => (
            <span
              key={p + i}
              className={`flex h-9 w-9 items-center justify-center border text-xs ${ p === "1" ? "border-ink-900 bg-forest-800 text-white" : "border-ink-900/15 text-ink-500" }`}
            >
              {p}
            </span>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}

/** 템플릿 5 — 아티클 상세 */
export function ArticleTemplate({
  backHref,
  category,
}: {
  backHref: string;
  category: string;
}) {
  return (
    <>
      <article>
        <PageHero
          crumbs={[
            { label: "메디컬 칼럼", href: "/insight" },
            { label: category, href: backHref },
            { label: "아티클 제목" },
          ]}
          title="아티클 제목이 이 자리에 들어갑니다"
        />

        <Section>
          <div className="mx-auto max-w-[720px]">
            <div className="label flex items-center justify-between border-b border-ink-900/15 pb-4">
              <span>{category} · 2026.05.20</span>
              <span>공유 · 링크복사</span>
            </div>

            <Media
              label="대표 이미지"
              ratio="aspect-[16/9]"
              className="mt-8"
              src={INSIGHT.articleHero}
              sizes="(max-width: 760px) 100vw, 720px"
            />

            {/* 본문 — 문단 / 소제목 / 인용 / 이미지 반복 */}
            <TextLines n={5} className="mt-10" />
            <h2 className="mt-12 text-xl font-medium">소제목이 들어갑니다</h2>
            <TextLines n={6} className="mt-5" />
            <blockquote className="mt-10 border-l-2 border-ink-900 pl-6">
              <TextLines n={2} />
            </blockquote>
            <Media
              label="본문 이미지"
              ratio="aspect-[16/9]"
              className="mt-10"
              src={INSIGHT.articleBody}
              sizes="(max-width: 760px) 100vw, 720px"
            />
            <TextLines n={7} className="mt-10" />

            {/* 하단 CTA + 태그 */}
            <div className="mt-14 flex flex-wrap gap-2 border-t border-ink-900/15 pt-8">
              {["의료마케팅", "SEO", "브랜딩"].map((t) => (
                <span key={t} className="border border-ink-900/15 px-3 py-1.5 text-xs text-ink-500">
                  #{t}
                </span>
              ))}
            </div>
          </div>
        </Section>

        <Section label="Related" tone="paper">
          <h2 className="text-xl font-light md:text-2xl">함께 읽으면 좋은 글</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <Link key={i} href={`${backHref}/sample-post`} className="border border-ink-900/15 bg-cream-100">
                <Media
                  label="썸네일"
                  ratio="aspect-[16/10]"
                  className="border-b!"
                  src={cardImage(i + 4)}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="p-5">
                  <TextLines n={2} />
                </div>
              </Link>
            ))}
          </div>
        </Section>
      </article>
      <CtaBand />
    </>
  );
}


/* ── 실제 아티클 뷰 — content/articles.ts 기반 ─────────── */
export function RealArticle({ article }: { article: Article }) {
  return (
    <>
      <article>
        <PageHero
          crumbs={[
            { label: "메디컬 칼럼", href: "/insight" },
            { label: article.category, href: article.list },
            { label: article.title },
          ]}
          title={article.title}
        />

        <Section>
          <div className="mx-auto max-w-[720px]">
            <div className="label flex items-center justify-between border-b border-ink-900/15 pb-5">
              <span className="tnum">
                {article.category} · {article.date}
              </span>
              <span>DR.PLANERS</span>
            </div>

            <Media
              label="대표 이미지"
              ratio="aspect-[16/9]"
              className="mt-10"
              src={INSIGHT.articleHero}
              sizes="(max-width: 760px) 100vw, 720px"
            />

            <div className="mt-12">
              {article.blocks.map((b, i) => {
                switch (b.t) {
                  case "h2":
                    return (
                      <h2
                        key={i}
                        className="display-ko mt-16 mb-6 text-xl md:text-2xl"
                      >
                        {b.text}
                      </h2>
                    );
                  case "h3":
                    return (
                      <h3
                        key={i}
                        className="mt-10 mb-3 text-base font-medium tracking-wide text-ink-900"
                      >
                        {b.text}
                      </h3>
                    );
                  case "lead":
                    return (
                      <p
                        key={i}
                        className="display-ko my-8 text-lg text-ink-900 md:text-xl"
                      >
                        {b.text}
                      </p>
                    );
                  case "quote":
                    return (
                      <blockquote
                        key={i}
                        className="display-ko my-8 border-l-2 border-brass-500 pl-6 text-lg text-ink-700"
                      >
                        “{b.text}”
                      </blockquote>
                    );
                  case "ul":
                    return (
                      <ul key={i} className="my-5 space-y-2.5 pl-1">
                        {b.items.map((it) => (
                          <li key={it} className="prose-ko flex gap-3 text-[0.9375rem] text-ink-700">
                            <span className="mt-[0.7em] h-1 w-1 shrink-0 rounded-full bg-brass-500" />
                            {it}
                          </li>
                        ))}
                      </ul>
                    );
                  default:
                    return (
                      <p key={i} className="prose-ko mb-5 text-[0.9375rem] text-ink-700">
                        {b.text}
                      </p>
                    );
                }
              })}
            </div>
          </div>
        </Section>
      </article>
      <CtaBand />
    </>
  );
}
