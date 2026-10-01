"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { INTRO, PRIMARY_CTA } from "@/content/home";
import { HOME } from "@/config/images";

/**
 * 메인 첫 두 화면 — 더가든피부과 메인의 구조를 따릅니다.
 *
 *   01 히어로   고정된 배경 위로 마크 → 선 → 태그라인이 차례로 들어옵니다.
 *   02 Why     배경이 흐린 공간으로 바뀌고, 아래에서 올라온 카드로 히어로의 마크가
 *              곡선을 그리며 날아듭니다. 화면이 멈춘 채 카드가 전체로 열리고,
 *              양옆에 선이 그어진 뒤 문단이 한 화면에 하나씩 지나갑니다.
 *
 * 구현 메모
 * - 히어로 등장은 시간 기반이라 CSS 애니메이션입니다. JS가 늦거나 없어도 재생됩니다.
 * - 02의 스크롤 연동만 GSAP ScrollTrigger 로 합니다. 화면 고정은 pin 대신
 *   position: sticky 를 씁니다 — 레이아웃을 건드리지 않아 라우팅·리사이즈에 강합니다.
 * - 기본 마크업은 "움직이지 않는 판"입니다(모든 문장이 보이는 정적 배치).
 *   JS가 붙고 모션 축소 설정이 아닐 때만 .is-motion 을 달아 스크롤 연출로 바꿉니다.
 * - 고정 배경은 .intro 의 clip-path 로 이 두 화면 안에서만 보이게 가둡니다.
 */

/* 02 화면의 스크롤 길이 비율 — 더가든과 같은 값(뷰포트 배수, CSS 쪽 높이와 짝) */
const PIN_VH = 4.15; // 화면이 멈춰 있는 동안의 스크롤 길이
const EXPAND_VH = 0.72; // 그중 카드가 전체 화면으로 열리는 구간
const LINE_RATIO = 0.1; // 열린 뒤 양옆 선이 그어지는 구간
const INTRO_RATIO = 0.11; // 문장 묶음이 켜지기까지

/** 문장이 화면을 통과하는 거리와 입·퇴장 비율 */
const MOTION_Y = 160;
const ENTER_RATIO = 0.52;
const EXIT_RATIO = 0.38;

/* 히어로 등장 타이밍(ms) — 마크 0.9s → 선 0.7s(겹침 0.25s) → 글자 */
const MARK_AT = 150;
const LINE_AT = MARK_AT + 900 - 250;
const TITLE_AT = LINE_AT + 700;
const TITLE_STEP = 32;
const TITLE_DUR = 720;
const DESC_STEP = 26;
const DESC_DUR = 640;

const titleCount = INTRO.hero.title.join("").replace(/\s/g, "").length;
const descCount = INTRO.hero.desc.join("").replace(/\s/g, "").length;
const DESC_AT = TITLE_AT + TITLE_DUR + TITLE_STEP * (titleCount - 1) - 350;
const CTA_AT = DESC_AT + DESC_DUR + DESC_STEP * (descCount - 1) - 150;

/**
 * 글자 단위로 쪼개 그립니다. 낱자는 inline-block 이라 아무 데서나 줄이 바뀔 수
 * 있으므로, 어절을 한 덩어리(nowrap)로 묶어 띄어쓰기에서만 줄이 바뀌게 합니다.
 */
function Chars({
  lines,
  at,
  step,
  lineClass,
}: {
  lines: string[];
  at: number;
  step: number;
  lineClass: string;
}) {
  let n = 0;
  return (
    <>
      {lines.map((line) => (
        <span key={line} className={lineClass}>
          {line.split(" ").map((word, wi) => (
            // 띄어쓰기는 덩어리 바깥에 둬야 그 자리에서 줄이 바뀝니다
            <Fragment key={`${word}-${wi}`}>
              {wi > 0 && " "}
              <span className="intro-word">
                {[...word].map((ch, ci) => (
                  <span
                    key={ci}
                    className="intro-char"
                    style={{ "--d": `${at + step * n++}ms` } as React.CSSProperties}
                  >
                    {ch}
                  </span>
                ))}
              </span>
            </Fragment>
          ))}
        </span>
      ))}
    </>
  );
}

export function HomeIntro() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    // 주소창이 접힐 때마다 다시 계산하면 멈춘 화면이 튑니다 — 높이는 lvh 로 고정해 두었습니다
    ScrollTrigger.config({ ignoreMobileResize: true });
    el.classList.add("is-motion");

    const q = gsap.utils.selector(el);
    const section = q(".intro-why")[0] as HTMLElement;
    const approach = q(".why-approach")[0] as HTMLElement;
    const runway = q(".why-runway")[0] as HTMLElement;
    const card = q(".why-card")[0] as HTMLElement;
    const cardLogo = q(".why-card-logo")[0] as HTMLElement;
    const heroMark = q(".intro-mark")[0] as HTMLElement;
    const fly = q(".intro-flymark")[0] as HTMLElement;
    const whyBg = q(".intro-bg--why")[0];
    const heroCopy = q(".intro-hero-row, .intro-scroll");
    const cardFade = q(".why-card-logo, .why-card-desc");
    const dim = q(".why-card-dim")[0];
    const track = q(".why-track")[0];
    const lines = q(".why-lines > span");
    const copy = q(".why-copy")[0];
    const head = q(".why-head .why-motion");
    const paras = q(".why-body > .why-motion");

    const ctx = gsap.context(() => {
      /* ── 초기 상태 ── */
      gsap.set(whyBg, { opacity: 0 });
      gsap.set(dim, { opacity: 0 });
      gsap.set(lines, { scaleY: 0, transformOrigin: "top center" });
      gsap.set(copy, { autoAlpha: 0 });
      gsap.set([...head, ...paras], {
        opacity: 0,
        y: MOTION_Y,
        "--grad-a": -50,
        "--grad-b": 0,
      });
      gsap.set(fly, { autoAlpha: 0 });

      /* ── 배경 교체: 히어로가 거의 다 올라갔을 때 흐린 공간이 덮습니다 ── */
      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 22%",
            end: "top 1%",
            scrub: true,
          },
        })
        .fromTo(whyBg, { opacity: 0 }, { opacity: 1, ease: "none", duration: 1, immediateRender: false }, 0)
        .fromTo(heroCopy, { opacity: 1 }, { opacity: 0, ease: "none", duration: 0.4, immediateRender: false }, 0);

      /* ── 마크 비행: 히어로의 마크 자리(화면 위)에서 카드 안 로고 아래로, 2차 곡선 ── */
      const flySize = () => {
        const r = fly.getBoundingClientRect();
        return { w: r.width, h: r.height };
      };
      const flyStart = () => {
        const m = heroMark.getBoundingClientRect();
        const { h } = flySize();
        return { x: m.left + m.width / 2, y: -(h / 2) - 80 };
      };
      const flyEnd = () => {
        const c = card.getBoundingClientRect();
        const l = cardLogo.getBoundingClientRect();
        const { h } = flySize();
        return { x: c.left + c.width / 2, y: l.bottom + 24 + h / 2 };
      };
      const easeFly = gsap.parseEase("power2.inOut");

      ScrollTrigger.create({
        trigger: section,
        start: "top 22%",
        end: () => `top+=${approach.offsetHeight} top`,
        scrub: 1,
        invalidateOnRefresh: true,
        onLeaveBack: () => gsap.set(fly, { autoAlpha: 0 }),
        onUpdate: (self) => {
          const s = flyStart();
          const e = flyEnd();
          const t = easeFly(self.progress);
          const mt = 1 - t;
          // 제어점을 (출발 x, 도착 y)에 두면 떨어지다가 옆으로 감겨 들어갑니다
          const x = mt * mt * s.x + 2 * mt * t * s.x + t * t * e.x;
          const y = mt * mt * s.y + 2 * mt * t * e.y + t * t * e.y;
          gsap.set(fly, { left: x, top: y, xPercent: -50, yPercent: -50, autoAlpha: 1 });
        },
      });

      /* ── 화면이 멈춘 구간: 카드 열림 → 선 → 머리말 → 문단 셋 ── */
      const expand = EXPAND_VH / PIN_VH;
      const post = 1 - expand;
      const lineDur = post * LINE_RATIO;
      const introDur = post * INTRO_RATIO;
      const switchDur = Math.max(post - lineDur - introDur, 0);
      const base = expand + lineDur;
      const seg = switchDur / (1 + paras.length);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: () => `top+=${approach.offsetHeight} top`,
          end: () => `+=${runway.offsetHeight}`,
          scrub: 0.75,
          invalidateOnRefresh: true,
        },
      });

      tl.to(card, { width: "100%", height: "100%", ease: "none", duration: expand }, 0)
        .to(cardFade, { opacity: 0, ease: "none", duration: expand }, 0)
        .fromTo(fly, { autoAlpha: 1 }, { autoAlpha: 0, ease: "none", duration: expand * 0.35, immediateRender: false }, expand * 0.65)
        .to(dim, { opacity: 0.8, ease: "none", duration: expand * 0.55 }, 0)
        .to(track, { autoAlpha: 0, ease: "none", duration: expand * 0.55 }, 0)
        .to(lines, { scaleY: 1, ease: "none", duration: lineDur }, expand)
        .to(copy, { autoAlpha: 1, ease: "none", duration: introDur * 0.4 }, expand + lineDur * 0.85);

      /** 한 문장이 아래에서 올라와 가운데를 지나 위로 사라지는 한 구간 */
      const pass = (target: Element, at: number, dur: number) => {
        const enter = dur * ENTER_RATIO;
        const exit = dur * EXIT_RATIO;
        tl.fromTo(target, { y: MOTION_Y }, { y: -MOTION_Y, ease: "none", duration: dur }, at)
          .to(target, { opacity: 1, ease: "none", duration: enter }, at)
          .fromTo(
            target,
            { "--grad-a": -50, "--grad-b": 0 },
            { "--grad-a": 100, "--grad-b": 150, ease: "none", duration: enter },
            at,
          )
          .to(target, { opacity: 0, ease: "none", duration: exit }, at + dur - exit);
      };

      head.forEach((h) => pass(h, base, seg));
      paras.forEach((p, i) => pass(p, base + seg * (i + 1), seg));
    }, el);

    // .is-motion 으로 높이가 바뀌었으니 한 프레임 뒤, 그리고 글꼴이 들어온 뒤 다시 잽니다
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(raf);
      ctx.revert();
      el.classList.remove("is-motion");
    };
  }, []);

  const { hero, why } = INTRO;

  return (
    <div ref={root} className="intro" data-header-theme="dark">
      {/* ── 고정 배경 두 겹 — .intro 의 clip-path 안에서만 보입니다 ── */}
      <div className="intro-bg intro-bg--hero" aria-hidden="true">
        {HOME.introFrames.map((src, i) => (
          <div key={src} className="intro-frame" style={{ "--i": i } as React.CSSProperties}>
            <Image src={src} alt="" fill preload={i === 0} sizes="100vw" className="object-cover" />
          </div>
        ))}
        <div className="intro-bg-shade" />
      </div>
      <div className="intro-bg intro-bg--why" aria-hidden="true">
        <Image src={HOME.introWhyBg} alt="" fill sizes="100vw" className="object-cover" />
        <div className="intro-bg-shade intro-bg-shade--why" />
      </div>

      {/* ══ 01 히어로 ══════════════════════════════════════ */}
      <section className="intro-hero" aria-label="닥터플래너스 소개">
        <h1 className="sr-only">{hero.h1}</h1>

        <div className="intro-hero-inner">
          <div className="intro-hero-row">
            <Image
              src="/brand/mark-light.png"
              alt=""
              width={161}
              height={340}
              preload
              className="intro-mark"
            />
            <span className="intro-line" aria-hidden="true" />

            <div className="intro-copy">
              {/* 영문은 브랜드 태그라인 — 장식이라 낭독에서 빼고 h1이 뜻을 전합니다 */}
              <p className="intro-title" aria-hidden="true">
                <Chars lines={hero.title} at={TITLE_AT} step={TITLE_STEP} lineClass="intro-title-line" />
              </p>

              <div className="intro-side">
                <p className="intro-desc">
                  <span className="sr-only">{hero.desc.join(" ")}</span>
                  <span aria-hidden="true">
                    <Chars lines={hero.desc} at={DESC_AT} step={DESC_STEP} lineClass="intro-desc-line" />
                  </span>
                </p>
                <Link
                  href={PRIMARY_CTA.href}
                  className="intro-cta"
                  style={{ "--d": `${CTA_AT}ms` } as React.CSSProperties}
                >
                  {PRIMARY_CTA.label}
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 원 안에서 튀는 점 대신, 히어로의 가로선과 같은 결의 세로 헤어라인 위로 빛이 흘러내립니다 */}
        <a
          href="#why"
          className="intro-scroll"
          aria-label="다음 화면으로"
          style={{ "--d": `${CTA_AT + 300}ms` } as React.CSSProperties}
        >
          <span className="intro-scroll-label" aria-hidden="true">
            {hero.scroll}
          </span>
          <span className="intro-scroll-line" aria-hidden="true" />
        </a>
      </section>

      {/* ══ 02 Why DR.PLANERS ══════════════════════════════ */}
      <section id="why" className="intro-why" aria-labelledby="why-title">
        <div className="why-approach" aria-hidden="true" />

        <div className="why-stage">
          {/* 카드 뒤로 흐르는 외곽선 글씨 */}
          <div className="why-track" aria-hidden="true">
            <div className="why-track-inner">
              {Array.from({ length: 4 }, (_, i) => (
                <span key={i}>{why.track} —&nbsp;</span>
              ))}
            </div>
          </div>

          <div className="why-card">
            <div className="why-card-media">
              <Image src={HOME.introWhyCard} alt="" fill sizes="100vw" className="object-cover" />
            </div>
            <Image
              src="/intro/wordmark-full-light.png"
              alt=""
              width={1569}
              height={335}
              className="why-card-logo"
            />
            <p className="why-card-desc">
              {why.card.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </p>
            <div className="why-card-dim" />
          </div>

          <div className="why-lines" aria-hidden="true">
            <span />
            <span />
          </div>

          <div className="why-copy">
            <div className="why-head">
              <p className="why-label why-motion">{why.label}</p>
              <Image
                src="/intro/wordmark-light.png"
                alt="DR.PLANERS"
                width={1569}
                height={136}
                className="why-wordmark why-motion"
              />
              <h2 id="why-title" className="why-title why-motion">
                {why.title}
              </h2>
            </div>
            <div className="why-body">
              {why.body.map((p) => (
                <p key={p[0]} className="why-motion">
                  {p.map((l) => (
                    <span key={l}>{l}</span>
                  ))}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="why-runway" aria-hidden="true" />
      </section>

      {/* 히어로 마크의 분신 — 스크롤에 따라 카드 안으로 날아듭니다 */}
      <Image
        src="/brand/mark-light.png"
        alt=""
        width={161}
        height={340}
        className="intro-flymark"
        aria-hidden="true"
      />
    </div>
  );
}
