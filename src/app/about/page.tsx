import Link from "next/link";
import { Section, Media, BrassIcon, H2 } from "@/components/ui";
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
      <Section no="02" label="What we do" tone="paper">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div data-reveal>
            <H2>
              마케팅 대행이 아니라
              <br />
              방향 결정입니다.
            </H2>
            <div className="mt-8 space-y-5">
              <p className="prose-ko text-sm text-ink-700 md:text-base">
                닥터플래너스는 DOCTOR와 PLANNERS를 합친 이름입니다. 원장님이
                마케팅이라는 짐을 완전히 내려놓고 쉬실 수 있도록, 그 결정을 대신
                설계하는 사람들이라는 뜻입니다.
              </p>
              <p className="prose-ko text-sm text-ink-700 md:text-base">
                블로그 몇 건, 광고 소재 몇 개를 채워드리는 회사가 아닙니다.
                무엇을 하고 무엇을 하지 않을지 정하고, 그 결과를 숫자로 설명하는
                일까지가 저희 몫입니다.
              </p>
            </div>
          </div>

          <div className="grid gap-px border-t border-l border-ink-900/12 sm:grid-cols-2">
            {[
              { t: "한 병원, 한 계획", d: "진료과와 상권에 따라 작동하는 전략이 다릅니다." },
              { t: "먼저 검증한 것만", d: "저희 예산으로 깨져본 전략만 제안합니다." },
              { t: "숫자로 설명", d: "신환 1명이 얼마에 만들어졌는지까지 봅니다." },
              { t: "원장님의 시간", d: "움직이셔야 하는 시간은 채 10분이 되지 않습니다." },
            ].map((v, i) => (
              <div
                key={v.t}
                className="border-r border-b border-ink-900/12 bg-cream-100 p-7"
                data-reveal
                style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
              >
                <BrassIcon size={30} />
                <p className="display-ko mt-5 text-base">{v.t}</p>
                <p className="prose-ko mt-2.5 text-sm text-ink-500">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
