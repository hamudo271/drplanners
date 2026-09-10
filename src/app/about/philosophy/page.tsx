import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "우리의 철학",
  description: "성과가 안 나는 이유는 실행력 부족이 아니라 아무도 방향을 결정하지 않았기 때문입니다. 대행사 안과 밖을 모두 겪고 세운 원칙을 정리했습니다.",
  path: "/about/philosophy",
});

import { Section, Media, IconBox, Container, H2 } from "@/components/ui";
import { PageHero, CtaBand } from "@/components/templates/shared";
import Image from "next/image";
import { PHILOSOPHY, PROBLEM, REST } from "@/content/home";
import { ABOUT, HOME } from "@/config/images";

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

      <Section no="01" label="우리가 지키는 것">
        <H2>우리가 지키는 것</H2>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {[
            {
              t: "한 병원, 한 계획",
              body: "정형외과와 피부과와 한의원은 작동하는 전략이 다릅니다. 표지만 다른 제안서를 반복하지 않고, 그 진료과·그 상권에서만 성립하는 하나의 계획을 만듭니다.",
            },
            {
              t: "숫자로 증명",
              body: "노출 수가 아니라 전환 경로를 봅니다. 신환 1명이 실제로 얼마에 만들어졌는지까지 계산해, ‘올랐습니다’가 아니라 ‘이래서 올랐습니다’로 보고합니다.",
            },
            {
              t: "원장의 시간을 지킴",
              body: "여섯 단계 프로세스를 전부 더해도 원장님이 움직이실 시간은 채 10분이 되지 않습니다. 나머지 시간은 원장님의 것입니다.",
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

      <Section no="02" label="시작한 이유" tone="paper">
        <div className="grid gap-12 lg:grid-cols-2">
          <Media
            label="사무실 / 팀 이미지"
            ratio="aspect-[4/5]"
            src={ABOUT.philosophy}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="flex flex-col justify-center" data-reveal>
            <p className="prose-ko text-sm text-ink-700 md:text-base">
              저희는 병원마케팅 대행사 안에서 리포트를 만들어봤고, 그 반대편에서
              리포트를 받아보는 입장에도 서 봤습니다. 양쪽을 다 보고 알게 된 것은
              하나였습니다 — 성과가 안 나는 이유는 실행력 부족이 아니라, 아무도
              방향을 결정하지 않았기 때문이라는 것.
            </p>
            <p className="prose-ko mt-8 text-sm text-ink-700 md:text-base">
              그래서 닥터플래너스에는 원칙이 하나 있습니다. 우리가 먼저 검증하지
              않은 전략은 병원에 제안하지 않습니다. 저희 예산과 저희 밤으로 먼저
              깨지고 살아남은 것만 가져갑니다. 그리고 모든 과정을 문서로 남깁니다
              — 계약이 끝나도 그 문서는 원장님 병원에 남습니다.
            </p>
            <p className="prose-ko mt-8 text-sm text-ink-700 md:text-base">
              원장님은 방향만 승인하시고, 실행과 운영은 저희가 책임집니다. 그렇게
              돌려드린 시간을 지키는 것이 저희의 유일한 존재 이유입니다.
            </p>
          </div>
        </div>
      </Section>

      {/* 원장님의 밤 — 이 회사가 시작된 자리. 홈에서 이 자리로 옮겨왔습니다 */}
      <Section no="03" label="원장님의 밤">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div data-reveal="left">
            <H2 lines>
              {PROBLEM.title.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </H2>
            <p className="prose-ko mt-6 max-w-md text-sm text-ink-500">{PROBLEM.lead}</p>
            <Media
              label="야근하는 원장 이미지"
              ratio="aspect-[16/10]"
              className="mt-12"
              src={HOME.problem}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div className="flex flex-col justify-center">
            {/* 시각이 하나씩 켜지며 밤이 흘러갑니다 (globals.css .tl-*) */}
            <ul className="border-l border-ink-900/15 pl-8">
              {PROBLEM.timeline.map((t, i) => (
                <li
                  key={t.time}
                  className="tl-item relative py-6"
                  data-reveal
                  style={{ "--reveal-delay": `${i * 110}ms`, "--i": i } as React.CSSProperties}
                >
                  <span className="tl-dot absolute top-[30px] -left-[36px] h-1.5 w-1.5 rounded-full bg-brass-500" />
                  <p className="tl-time label tnum">{t.time}</p>
                  <p className="prose-ko mt-2.5 text-sm text-ink-700 md:text-base">{t.text}</p>
                </li>
              ))}
            </ul>
            <p className="display-ko mt-14 text-right text-lg md:text-xl lg:text-2xl" data-reveal>
              {PROBLEM.closing}
            </p>
          </div>
        </div>
      </Section>

      {/* 휴식 밴드 — 홈에서 이 자리로 옮겨왔습니다 */}
      <section className="relative flex min-h-[60svh] items-center md:min-h-[70svh]">
        <div className="veil-soft absolute inset-0">
          <Image src={HOME.rest} alt="" fill sizes="100vw" className="object-cover" />
        </div>
        <Container className="relative py-24">
          <div className="text-cream-100" data-reveal>
            <h2 className="display-ko text-[1.875rem] md:text-[2.75rem] lg:text-[3.25rem]" data-lines>
              {REST.title.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </h2>
            <p className="prose-ko mt-8 text-base text-cream-100/70 md:text-lg">{REST.sub}</p>
          </div>
        </Container>
      </section>

      <Section no="04" label="받지 않는 기준" tone="forest">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <div data-reveal>
            <H2 className="text-cream-100">
              저희는 모든 병원을
              <br />
              받지 않습니다
            </H2>
            <p className="prose-ko mt-8 text-sm text-cream-100/70">
              휴식은 대량생산할 수 없습니다. 한 원장님께 드리는 쉼의 무게를
              지키려면, 저희가 동시에 감당할 수 있는 병원 수에는 명확한 한계가
              있습니다.
            </p>
          </div>
          <ul className="divide-y divide-cream-100/12 border-y border-cream-100/12">
            {[
              "월 최대 4개 병원만 새로 맡습니다",
              "동일 상권의 동일 진료과는 중복해서 맡지 않습니다",
              "3개월 미만 단발성 계약은 지양합니다 — 마케팅은 분기 단위로 검증해야 합니다",
              "의료광고심의 기준을 지키지 않는 방향과는 협업하지 않습니다",
              "저희가 방향을 제안하고 원장님이 승인하시는 방식으로 일합니다",
            ].map((rule, i) => (
              <li
                key={rule}
                className="flex gap-6 py-5"
                data-reveal
                style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
              >
                <span className="label label-on-dark tnum pt-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="prose-ko text-sm text-cream-100/85">{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
