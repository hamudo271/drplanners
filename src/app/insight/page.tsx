import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "메디컬 칼럼",
  description: "병원 마케팅을 바라보는 관점과 실무 기록. 플레이스 최적화, 의료광고 심의, 리포트 읽는 법까지 현장에서 검증한 내용만 정리합니다.",
  path: "/insight",
});

import Link from "next/link";
import { Section, Media, H2 } from "@/components/ui";
import { PageHero, CtaBand } from "@/components/templates/shared";
import { InsightTabs } from "@/components/templates/Insight";
import { HUB_HERO, INSIGHT } from "@/config/images";
import { ARTICLES } from "@/content/articles";

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "메디컬 칼럼" }]}
        title="THINKING FOR DOCTORS."
        lead="의료 마케팅에 대한 닥터플래너스의 관점과 실무 기록입니다."
        mediaLabel="인사이트 키비주얼"
        mediaSrc={HUB_HERO["/insight"]}
      />
      <InsightTabs current="/insight" />

      <Section no="01" label="Featured">
        <Link
          href={`/insight/column/${ARTICLES[0].slug}`}
          className="grid gap-8 border border-ink-900/15 md:grid-cols-2"
        >
          <Media
            label="대표 아티클 이미지"
            ratio="aspect-[4/3]"
            className=""
            src={INSIGHT.featured}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="flex flex-col justify-center p-8">
            <p className="label tnum">
              {ARTICLES[0].category} · {ARTICLES[0].date}
            </p>
            <p className="display-ko mt-4 text-2xl leading-snug">{ARTICLES[0].title}</p>
            <p className="prose-ko mt-5 text-sm text-ink-500">{ARTICLES[0].excerpt}</p>
            <span className="label mt-8">읽어보기 →</span>
          </div>
        </Link>
      </Section>

      {/* 카테고리 안내 — 실제 글이 쌓이면 최신 목록으로 대체됩니다 */}
      <Section no="02" label="Categories" tone="paper">
        <H2>무엇을 다루나요</H2>
        <div className="mt-12 grid gap-px border-t border-l border-ink-900/12 md:grid-cols-2">
          {[
            {
              href: "/insight/column",
              label: "칼럼",
              body: "병원 마케팅을 바라보는 관점. 왜 대행사를 바꿔도 결과가 같은지, 방향을 정한다는 게 무엇인지 같은 이야기를 답니다.",
            },
            {
              href: "/insight/blog",
              label: "블로그",
              body: "실무에서 나온 기록. 플레이스 정비, 키워드 설계, 심의 대응처럼 손으로 해본 내용을 정리합니다.",
            },
            {
              href: "/insight/faq",
              label: "FAQ",
              body: "계약 기간, 수주 기준, 리포트 방식까지 — 원장님들이 실제로 많이 묻는 질문에 답합니다.",
            },
            {
              href: "/insight/notice",
              label: "공지사항",
              body: "서비스 변경과 운영 일정 안내.",
            },
          ].map((c, i) => (
            <Link
              key={c.href}
              href={c.href}
              className="border-r border-b border-ink-900/12 bg-cream-100 p-8"
              data-reveal
              style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}
            >
              <p className="label tnum">{String(i + 1).padStart(2, "0")}</p>
              <p className="display-ko mt-4 text-lg">{c.label}</p>
              <p className="prose-ko mt-3 text-sm text-ink-500">{c.body}</p>
              <span className="label mt-7 block">바로가기 →</span>
            </Link>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
