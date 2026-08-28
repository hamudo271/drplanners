import { Section, Media, IconBox, TextLines, Container } from "@/components/ui";
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
          <p className="label !text-white/45 mt-16">{PHILOSOPHY.formula}</p>
        </Container>
      </section>

      <Section no="01" label="Values">
        <h2 className="text-2xl font-light md:text-3xl">우리가 지키는 것</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {["한 병원, 한 계획", "숫자로 증명", "원장의 시간을 지킴"].map((v) => (
            <div key={v}>
              <IconBox size={44} />
              <p className="mt-5 text-lg font-medium">{v}</p>
              <TextLines n={3} className="mt-4" />
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
          <div className="flex flex-col justify-center">
            <TextLines n={6} />
            <TextLines n={5} className="mt-8" />
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
