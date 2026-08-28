import Link from "next/link";
import { Section, Media, TextLines } from "@/components/ui";
import { PageHero, CtaBand, findHub } from "@/components/templates/shared";
import { ABOUT, HUB_HERO } from "@/config/images";

export default function Page() {
  const hub = findHub("/about");
  return (
    <>
      <PageHero
        crumbs={[{ label: "닥터플래너스" }]}
        title="닥터플래너스"
        lead="병원의 성장을 대신 고민하는 사람들. 우리가 어떤 관점으로 일하는지 소개합니다."
        mediaLabel="브랜드 키비주얼"
        mediaSrc={HUB_HERO["/about"]}
      />
      <Section no="01" label="About">
        <div className="grid gap-px border border-ink-900/15 bg-ink-900/12 md:grid-cols-2">
          {hub.children?.map((c, i) => (
            <Link key={c.href} href={c.href} className="bg-cream-100 p-10">
              <p className="text-xl font-medium">{c.label}</p>
              <p className="mt-2 text-sm text-ink-500">{c.blurb}</p>
              <Media
                label="섹션 이미지"
                ratio="aspect-[16/9]"
                className="mt-6"
                src={ABOUT.cards[i]}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <span className="label mt-6 block">바로가기 →</span>
            </Link>
          ))}
        </div>
      </Section>
      <Section no="02" label="Numbers" tone="paper">
        <div className="grid grid-cols-2 gap-px border border-ink-900/15 bg-ink-900/12 md:grid-cols-4">
          {["누적 병원", "운영 채널", "평균 계약", "재계약률"].map((n) => (
            <div key={n} className="bg-cream-50 p-8 text-center">
              <p className="text-3xl font-medium">000</p>
              <p className="label mt-2">{n}</p>
            </div>
          ))}
        </div>
        <TextLines n={2} className="mt-10" />
      </Section>
      <CtaBand />
    </>
  );
}
