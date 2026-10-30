import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "공지사항",
  description: "닥터플래너스의 서비스 변경, 운영 일정, 정책 안내를 게시합니다.",
  path: "/insight/notice",
});

import Link from "next/link";
import { Section, BrassIcon } from "@/components/ui";
import { enFor } from "@/config/nav";
import { PageHero } from "@/components/templates/shared";
import { InsightTabs } from "@/components/templates/Insight";
import { getFeed } from "@/lib/cms/posts";

export const dynamic = "force-dynamic";

export default async function Page() {
  const notices = await getFeed("NOTICE");
  return (
    <>
      <PageHero
        crumbs={[{ label: "메디컬 인사이트", href: "/insight" }, { label: "공지사항" }]}
        title="공지사항"
        en={enFor("/insight/notice")}
        lead="닥터플래너스의 소식과 안내입니다."
      />
      <InsightTabs current="/insight/notice" />

      <Section>
        {notices.length > 0 ? (
          <>
            <p className="post-count tnum" data-reveal>
              전체 {notices.length}건
            </p>
            <ol className="ins-list">
              {notices.map((n, i) => (
                <li key={n.slug} data-reveal style={{ "--reveal-delay": `${Math.min(i, 6) * 60}ms` } as React.CSSProperties}>
                  <Link href={`/insight/notice/${n.slug}`} className="ins-row">
                    <span className="ins-row-head">
                      <span className="ins-no tnum">{String(notices.length - i).padStart(2, "0")}</span>
                      <span className="ins-slash" aria-hidden="true" />
                      <span className="ins-row-title">{n.title}</span>
                    </span>
                    <span className="ins-row-meta tnum">{n.date}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </>
        ) : (
        <div className="sx-empty" data-reveal>
          <BrassIcon size={44} />
          <p className="display-ko mt-8 text-lg md:text-xl">
            등록된 공지사항이 없습니다.
          </p>
          <p className="prose-ko mt-4 max-w-md text-sm text-ink-500">
            서비스 변경, 운영 일정, 정책 안내가 생기면 이곳에 먼저 올립니다.
            급한 문의는 바로 연락 주세요.
          </p>
          <Link href="/contact" className="more-btn mt-9">
            <span>문의하기</span>
            <svg width="7" height="8" viewBox="0 0 7 8" fill="currentColor" aria-hidden="true">
              <path d="M7 4 0 8V0z" />
            </svg>
          </Link>
        </div>
        )}
      </Section>
    </>
  );
}
