import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "회사 소개",
  description: "블로그 몇 건, 광고 소재 몇 개를 채우는 회사가 아닙니다. 무엇을 하고 무엇을 하지 않을지 정하고, 결과를 숫자로 설명하는 일까지가 저희 몫입니다.",
  path: "/about",
});

import Image from "next/image";
import Link from "next/link";
import { Container, H2 } from "@/components/ui";
import { PageHero, CtaBand, findHub } from "@/components/templates/shared";
import { ABOUT, HUB_HERO } from "@/config/images";
import { enFor } from "@/config/nav";

const VALUES = [
  { t: "한 병원, 한 계획", d: "진료과와 상권에 따라 작동하는 전략이 다릅니다." },
  { t: "먼저 검증한 것만", d: "저희 예산으로 깨져본 전략만 제안합니다." },
  { t: "숫자로 설명", d: "신환 1명이 얼마에 만들어졌는지까지 봅니다." },
  { t: "원장님의 시간", d: "움직이셔야 하는 시간은 채 10분이 되지 않습니다." },
];

export default function Page() {
  const hub = findHub("/about");
  return (
    <>
      <PageHero
        crumbs={[{ label: "닥터플래너스" }]}
        title="닥터플래너스"
        en={enFor("/about")}
        lead="병원의 성장을 대신 고민하는 사람들. 우리가 어떤 관점으로 일하는지 소개합니다."
        mediaLabel="브랜드 키비주얼"
        mediaSrc={HUB_HERO["/about"]}
      />

      {/* 무엇을 하는가 — 더가든 BRAND PHILOSOPHY 의 글 + 둥근 사진 */}
      <section className="sx bg-cream-100 text-ink-900">
        <Container className="sx-pad">
          <div className="sx-split">
            <div data-reveal>
              <p className="sx-cate">( What We Do )</p>
              <H2>
                마케팅 대행이 아니라
                <br />
                방향 결정입니다.
              </H2>
              <p className="sx-text">
                닥터플래너스는 DOCTOR와 PLANNERS를 합친 이름입니다. 원장님이 마케팅이라는
                짐을 완전히 내려놓고 쉬실 수 있도록, 그 결정을 대신 설계하는 사람들이라는
                뜻입니다.
              </p>
              <p className="sx-text">
                블로그 몇 건, 광고 소재 몇 개를 채워드리는 회사가 아닙니다. 무엇을 하고 무엇을
                하지 않을지 정하고, 그 결과를 숫자로 설명하는 일까지가 저희 몫입니다.
              </p>
            </div>
            <div className="sx-photo is-oval" data-reveal="right">
              <Image src={ABOUT.intro} alt="" fill sizes="(max-width: 1023px) 100vw, 40vw" className="object-cover" />
            </div>
          </div>
        </Container>
      </section>

      {/* 일하는 원칙 — 어두운 띠 위 흰 카드 넷 */}
      <section className="sx sx-dark">
        <Container className="sx-pad sx-dark-inner">
          <div className="sx-head-center" data-reveal>
            <p className="sx-cate is-dark">( Our Values )</p>
            <H2>저희가 일하는 방식</H2>
          </div>
          <ol className="sx-cards sx-cards--4">
            {VALUES.map((v, i) => (
              <li
                key={v.t}
                className="sx-card"
                data-reveal
                style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
              >
                <span className="sx-card-no tnum">{String(i + 1).padStart(2, "0")}</span>
                <p className="sx-card-title">{v.t}</p>
                <p className="sx-card-body">{v.d}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* 하위 페이지 — 세로 카드 */}
      <section className="sx bg-cream-50 text-ink-900">
        <Container className="sx-pad">
          <div className="sx-head-center" data-reveal>
            <p className="sx-cate">( More About Us )</p>
            <H2>더 알아보기</H2>
          </div>
          <div className="hub-cards hub-cards--2">
            {hub.children?.map((c, i) => (
              <Link
                key={c.href}
                href={c.href}
                className="hub-card"
                data-reveal
                style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}
              >
                <span className="hub-card-no tnum">{String(i + 1).padStart(2, "0")}</span>
                <span className="hub-card-en">{c.en}</span>
                <span className="hub-card-title">{c.label}</span>
                <span className="hub-card-blurb">{c.blurb}</span>
                <span className="hub-card-media">
                  <Image src={ABOUT.cards[i]} alt="" fill sizes="(max-width: 767px) 100vw, 50vw" className="object-cover" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
