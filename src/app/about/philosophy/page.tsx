import { Section, Media, IconBox, Container, H2 } from "@/components/ui";
import { PageHero, CtaBand } from "@/components/templates/shared";
import { PHILOSOPHY } from "@/content/home";
import { ABOUT } from "@/config/images";

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "닥터플래너스", href: "/about" }, { label: "닥터플래너스 철학" }]}
        title="닥터플래너스 철학"
      />

      {/* 시안 03번 섹션을 페이지 단위로 확장 */}
      <section className="border-b border-ink-900/15 bg-forest-800 text-white">
        <Container className="py-24 md:py-32">
          <h2 className="text-4xl leading-tight font-light md:text-[64px]">
            {PHILOSOPHY.title.map((l) => (
              <span key={l} className="block">{l}</span>
            ))}
          </h2>
          <p className="mt-10 max-w-lg text-sm leading-relaxed text-white/70 md:text-base">
            {PHILOSOPHY.body.map((l) => (
              <span key={l} className="block">{l}</span>
            ))}
          </p>
          <p className="label text-white/45! mt-16">{PHILOSOPHY.formula}</p>
        </Container>
      </section>

      <Section no="01" label="Values">
        <H2>우리가 지키는 것</H2>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {[
            {
              t: "한 병원, 한 계획",
              body: "패키지를 복사해 붙이지 않습니다. 진료과목·상권·경쟁·환자·브랜드를 분석해, 그 병원에서만 성립하는 하나의 계획을 만듭니다.",
            },
            {
              t: "숫자로 증명",
              body: "감으로 일하지 않습니다. 노출·유입·예약 — 실제로 움직인 숫자를 매달 정리해 보여드리고, 다음 계획도 그 숫자 위에서 세웁니다.",
            },
            {
              t: "원장의 시간을 지킴",
              body: "저희가 존재하는 이유입니다. 마케팅이 원장님의 일이 되는 순간 저희는 실패한 것입니다. 진료 밖의 일은 저희 책상에 둡니다.",
            },
          ].map((v, i) => (
            <div
              key={v.t}
              data-reveal
              style={{ "--reveal-delay": `${i * 110}ms` } as React.CSSProperties}
            >
              <IconBox size={44} />
              <p className="display-ko mt-6 text-lg">{v.t}</p>
              <p className="prose-ko mt-4 text-sm text-ink-500">{v.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section no="02" label="Manifesto" tone="paper">
        <div className="grid gap-12 lg:grid-cols-2">
          <Media
            label="사무실 / 팀 이미지"
            ratio="aspect-[4/5]"
            src={ABOUT.philosophy}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="flex flex-col justify-center" data-reveal>
            <p className="prose-ko text-sm text-ink-700 md:text-base">
              의료는 치유의 일입니다. 그 일이 지속되려면, 하는 사람의 마음이
              먼저 지켜져야 한다고 믿습니다. 진료가 끝난 밤에 블로그 순위를
              검색하는 원장님의 시간은, 병원에도 환자에게도 좋은 시간이
              아닙니다.
            </p>
            <p className="prose-ko mt-8 text-sm text-ink-700 md:text-base">
              그래서 닥터플래너스는 계획을 팝니다. 광고 몇 건, 게시물 몇 개가
              아니라 — 병원이 어디로 가야 하는지, 이번 달에 무엇을 하고 무엇을
              하지 않을지를 정하는 일. 계획이 있으면 원장님은 확인만 하면
              됩니다. 그 나머지 전부가 저희의 일입니다.
            </p>
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
