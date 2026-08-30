import Link from "next/link";
import { Section, BrassIcon, Button } from "@/components/ui";
import { PageHero, CtaBand } from "@/components/templates/shared";
import { InsightTabs } from "@/components/templates/Insight";

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "메디컬 칼럼", href: "/insight" }, { label: "공지사항" }]}
        title="공지사항"
        lead="닥터플래너스의 소식과 안내입니다."
      />
      <InsightTabs current="/insight/notice" />

      <Section>
        <div
          className="flex flex-col items-center border border-ink-900/15 bg-cream-50 px-8 py-24 text-center"
          data-reveal
        >
          <BrassIcon size={44} />
          <p className="display-ko mt-8 text-lg md:text-xl">
            등록된 공지사항이 없습니다.
          </p>
          <p className="prose-ko mt-4 max-w-md text-sm text-ink-500">
            서비스 변경, 운영 일정, 정책 안내가 생기면 이곳에 먼저 올립니다.
            급한 문의는 바로 연락 주세요.
          </p>
          <Link href="/contact" className="mt-9">
            <Button variant="outline">문의하기</Button>
          </Link>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
