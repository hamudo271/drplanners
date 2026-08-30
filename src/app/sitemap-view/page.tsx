import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "사이트맵",
  description: "닥터플래너스 전체 페이지 목록입니다.",
  path: "/sitemap-view",
});

import Link from "next/link";
import { Section } from "@/components/ui";
import { PageHero } from "@/components/templates/shared";
import { NAV, NAV_CTA } from "@/config/nav";

/** 와이어프레임 검토용 전체 페이지 목록. 시안 적용 단계에서 제거 가능합니다. */
export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "사이트맵" }]}
        title="전체 페이지"
        lead="와이어프레임에 포함된 모든 화면입니다. 클릭해서 바로 확인하세요."
      />
      <Section>
        <Link href="/" className="label mb-10 block">
          / — 메인
        </Link>
        <div className="grid gap-px border border-ink-900/15 bg-ink-900/12 md:grid-cols-2 lg:grid-cols-3">
          {NAV.map((item) => (
            <div key={item.href} className="bg-cream-100 p-6">
              <Link href={item.href} className="text-base font-medium">
                {item.fullLabel}
              </Link>
              <p className="label mt-1">{item.href}</p>
              <ul className="mt-4 space-y-2 border-t border-ink-900/10 pt-4">
                {item.children?.map((c) => (
                  <li key={c.href}>
                    <Link href={c.href} className="text-sm">
                      {c.label}
                    </Link>
                    <span className="label ml-2">{c.href}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="bg-cream-100 p-6">
            <Link href={NAV_CTA.href} className="text-base font-medium">
              contact
            </Link>
            <p className="label mt-1">{NAV_CTA.href}</p>
            <ul className="mt-4 space-y-2 border-t border-ink-900/10 pt-4">
              <li>
                <Link href="/insight/column/sample-post" className="text-sm">
                  아티클 상세 (템플릿)
                </Link>
                <span className="label ml-2">/insight/column/[slug]</span>
              </li>
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
}
