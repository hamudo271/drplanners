import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "우리의 철학",
  description: "성과가 안 나는 이유는 실행력 부족이 아니라 아무도 방향을 결정하지 않았기 때문입니다. 대행사 안과 밖을 모두 겪고 세운 원칙을 정리했습니다.",
  path: "/about/philosophy",
});

import { Section, Container, H2 } from "@/components/ui";
import { PageHero, CtaBand } from "@/components/templates/shared";
import Image from "next/image";
import { PHILOSOPHY, PROBLEM, REST } from "@/content/home";
import { ABOUT, HOME } from "@/config/images";
import { enFor } from "@/config/nav";

const PRINCIPLES = [
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
];

const RULES = [
  "월 최대 4개 병원만 새로 맡습니다",
  "동일 상권의 동일 진료과는 중복해서 맡지 않습니다",
  "3개월 미만 단발성 계약은 지양합니다 — 마케팅은 분기 단위로 검증해야 합니다",
  "의료광고심의 기준을 지키지 않는 방향과는 협업하지 않습니다",
  "저희가 방향을 제안하고 원장님이 승인하시는 방식으로 일합니다",
];

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "닥터플래너스", href: "/about" }, { label: "닥터플래너스 철학" }]}
        title="닥터플래너스 철학"
        en={enFor("/about/philosophy")}
        lead="성과가 안 나는 이유는 실행력 부족이 아니라, 아무도 방향을 결정하지 않았기 때문입니다."
      />

      {/* 이름의 뜻 — 어두운 띠 가운데 */}
      <section className="sx sx-dark">
        <Container className="sx-pad sx-dark-inner">
          <div className="sx-head-center" data-reveal>
            <p className="sx-cate is-dark">( Brand Philosophy )</p>
            <h2 className="phil-serif">
              {PHILOSOPHY.title.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </h2>
            <span className="sx-slash" aria-hidden="true" />
            <div className="sx-lead-center">
              <p>
                {PHILOSOPHY.body.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </p>
            </div>
            <p className="phil-formula">{PHILOSOPHY.formula}</p>
          </div>
        </Container>
      </section>

      {/* 시작한 이유 — 더가든 BRAND PHILOSOPHY: 타원 사진 + 글 */}
      <section className="sx bg-cream-100 text-ink-900">
        <Container className="sx-pad">
          <div className="sx-split is-reverse">
            <div className="sx-photo is-oval" data-reveal="left">
              <Image src={ABOUT.philosophy} alt="" fill sizes="(max-width: 1023px) 100vw, 40vw" className="object-cover" />
            </div>
            <div data-reveal>
              <p className="sx-cate">( Why We Started )</p>
              <H2>
                리포트를 만드는 쪽과
                <br />
                받는 쪽을 모두 겪었습니다.
              </H2>
              <p className="sx-text">
                저희는 병원마케팅 대행사 안에서 리포트를 만들어봤고, 그 반대편에서 리포트를
                받아보는 입장에도 서 봤습니다. 양쪽을 다 보고 알게 된 것은 하나였습니다 — 성과가
                안 나는 이유는 실행력 부족이 아니라, 아무도 방향을 결정하지 않았기 때문이라는 것.
              </p>
              <p className="sx-text">
                그래서 닥터플래너스에는 원칙이 하나 있습니다. 우리가 먼저 검증하지 않은 전략은
                병원에 제안하지 않습니다. 저희 예산과 저희 밤으로 먼저 깨지고 살아남은 것만
                가져갑니다. 그리고 모든 과정을 문서로 남깁니다 — 계약이 끝나도 그 문서는 원장님
                병원에 남습니다.
              </p>
              <p className="sx-text">
                원장님은 방향만 승인하시고, 실행과 운영은 저희가 책임집니다. 그렇게 돌려드린
                시간을 지키는 것이 저희의 유일한 존재 이유입니다.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 우리가 지키는 것 — 흰 카드 셋 */}
      <section className="sx bg-cream-50 text-ink-900">
        <Container className="sx-pad">
          <div className="sx-head-center" data-reveal>
            <p className="sx-cate">( Principles )</p>
            <H2>우리가 지키는 것</H2>
          </div>
          <ol className="sx-cards sx-cards--3 is-light">
            {PRINCIPLES.map((v, i) => (
              <li
                key={v.t}
                className="sx-card"
                data-reveal
                style={{ "--reveal-delay": `${i * 110}ms` } as React.CSSProperties}
              >
                <span className="sx-card-no tnum">{String(i + 1).padStart(2, "0")}</span>
                <p className="sx-card-title">{v.t}</p>
                <p className="sx-card-body">{v.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* 원장님의 밤 — 이 회사가 시작된 자리. 홈에서 이 자리로 옮겨왔습니다 */}
      <Section en="The Doctor's Night">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div data-reveal="left">
            <H2 lines>
              {PROBLEM.title.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </H2>
            <p className="sx-text">{PROBLEM.lead}</p>
            <div className="sx-photo is-wide mt-12">
              <Image src={HOME.problem} alt="" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            </div>
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
            <p className="sx-h2 mt-14 text-right text-[1.375rem]!" data-reveal>
              {PROBLEM.closing}
            </p>
          </div>
        </div>
      </Section>

      {/* 휴식 밴드 — 사진 위 가운데 */}
      <section className="subcta is-quiet">
        <div className="subcta-bg" aria-hidden="true">
          <Image src={HOME.rest} alt="" fill sizes="100vw" className="object-cover" />
        </div>
        <div className="subcta-inner" data-reveal>
          <p className="subcta-cate">( Rest )</p>
          <h2 className="subcta-title" data-lines>
            {REST.title.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </h2>
          <p className="subcta-body">{REST.sub}</p>
        </div>
      </section>

      {/* 받지 않는 기준 — 어두운 띠 위 흰 알약 줄 */}
      <section className="sx sx-dark">
        <Container className="sx-pad sx-dark-inner">
          <div className="sx-head-center" data-reveal>
            <p className="sx-cate is-dark">( Our Limits )</p>
            <H2>
              저희는 모든 병원을
              <br />
              받지 않습니다
            </H2>
            <span className="sx-slash" aria-hidden="true" />
            <div className="sx-lead-center">
              <p>
                휴식은 대량생산할 수 없습니다. 한 원장님께 드리는 쉼의 무게를 지키려면, 저희가
                동시에 감당할 수 있는 병원 수에는 명확한 한계가 있습니다.
              </p>
            </div>
          </div>
          <ul className="prm-list sx-pills">
            {RULES.map((rule, i) => (
              <li
                key={rule}
                className="prm-row is-single"
                data-reveal
                style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
              >
                <span className="prm-icon tnum" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="prm-title">{rule}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
