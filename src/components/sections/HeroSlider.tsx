"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Container, CircleArrow } from "@/components/ui";
import { HERO_SLIDES, PRIMARY_CTA, SECONDARY_CTA } from "@/content/home";
import { HOME } from "@/config/images";

/** 자동 전환 간격 — 한글 두 줄을 읽을 시간을 둡니다 */
const INTERVAL = 6500;

/**
 * 히어로 로테이션.
 *
 * 4매가 돌지만 주장은 하나이고 **CTA도 하나**입니다. 슬라이드마다 다른 곳으로
 * 보내면 첫 화면에서 행동이 분산되기 때문에, 목적지는 전부 무료 병원 진단입니다.
 *
 * 슬라이드는 CSS 그리드의 같은 칸에 포개두고 opacity로 교대합니다.
 * 포개두면 컨테이너 높이가 가장 긴 슬라이드에 고정돼 전환 때 아래가 밀리지 않습니다.
 *
 * a11y 메모
 * - h1은 로테이션 밖에 sr-only로 고정합니다. 슬라이드 안에 두면 비활성 구간에서
 *   inert에 걸려 문서에서 h1이 사라집니다.
 * - 비활성 슬라이드는 inert — 보이지 않는 링크로 탭이 빠지지 않게 합니다.
 * - 호버·포커스 중에는 자동 전환을 멈춥니다. 읽는 중에 넘어가지 않도록.
 */
export function HeroSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const slide = HERO_SLIDES[active];

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(
      () => setActive((i) => (i + 1) % HERO_SLIDES.length),
      INTERVAL,
    );
    return () => window.clearInterval(id);
  }, [paused, active]);

  return (
    <section
      className="home-hero"
      aria-roledescription="캐러셀"
      aria-label="닥터플래너스 주요 안내"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <h1 className="sr-only">
        닥터플래너스 — 광고비는 쓰는데 신환이 늘지 않는 병원의 마케팅을 진단부터 실행까지 맡습니다
      </h1>

      <div className="home-hero-image">
        {HERO_SLIDES.map((s, i) => (
          <Image
            key={s.key}
            src={HOME.heroSlides[i]}
            alt=""
            fill
            preload={i === 0}
            sizes="100vw"
            className={`hero-photo object-cover ${i === active ? "is-active" : ""}`}
          />
        ))}
      </div>
      <div className="home-hero-shade" />

      <Container className="home-hero-content">
        {HERO_SLIDES.map((s, i) => (
          <div
            key={s.key}
            className={`hero-slide ${i === active ? "is-active" : ""}`}
            aria-hidden={i !== active}
            inert={i !== active}
          >
            <p className="editorial-eyebrow">
              <span aria-hidden="true">✦</span> {s.eyebrow}
            </p>
            <p className="hero-title">
              {s.title.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>
            <p className="hero-lead">{s.lead}</p>
            <p className="hero-description">{s.description}</p>
            {/* 버튼은 하나만. 보조는 무게가 다른 텍스트 링크로 둡니다 */}
            <div className="hero-actions">
              <Link href={PRIMARY_CTA.href} className="editorial-link hero-cta">
                {PRIMARY_CTA.label} <CircleArrow size={44} />
              </Link>
              <Link href={SECONDARY_CTA.href} className="hero-secondary">
                {SECONDARY_CTA.label}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        ))}
      </Container>

      {/* 하단 중앙 페이지네이션 — 하단 행에 끼우면 SCROLL 문구가 사진 위로 밀립니다 */}
      <div className="hero-dots" aria-label="슬라이드 선택">
        {HERO_SLIDES.map((s, i) => (
          <button
            key={s.key}
            type="button"
            className="hero-dot"
            aria-current={i === active}
            aria-label={`${s.indexNo} ${s.indexLabel}`}
            onClick={() => setActive(i)}
          />
        ))}
      </div>

      <Container className="hero-bottom">
        <span className="hero-index">
          {slide.indexNo} <span /> {slide.indexLabel}
        </span>

        <a href="#audience" className="hero-scroll">
          아래로 내려서 보기
          <span className="scroll-dots" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </span>
        </a>

        <span className="hero-bottom-note">월 4곳 한정</span>
      </Container>
    </section>
  );
}
