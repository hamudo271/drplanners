import Image from "next/image";
import Link from "next/link";
import {
  Container,
  Section,
  Media,
  Button,
  CircleArrow,
  H2,
  H2En,
} from "@/components/ui";
import * as C from "@/content/home";
import { HOME } from "@/config/images";
import { DIAGNOSIS_QUESTIONS } from "@/content/diagnosis";
import { latestArticles, readingTime } from "@/content/articles";

/* ══ 01 HERO ══════════════════════════════════════════ */
export function Hero() {
  return (
    // 화면 높이에 따라 늘어나지 않도록 고정 높이 — 와이드 모니터에서도 시안 비율을 유지합니다
    <section className="relative flex min-h-[640px] items-center md:min-h-[760px] xl:min-h-[820px]">
      <div className="veil-left absolute inset-0">
        <Image
          src={HOME.hero}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <Container className="relative pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="max-w-3xl text-cream-100" data-reveal>
          <h1 className="display-en text-[2.75rem] leading-[1.06] sm:text-[3.75rem] lg:text-[5rem]">
            {C.HERO.title.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </h1>

          <div className="mt-10 h-px w-14 bg-cream-100/45" />

          <p className="prose-ko mt-8 text-sm text-cream-100/85 md:text-base">
            {C.HERO.body.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </p>

          <p className="label label-on-dark mt-9">{C.HERO.services}</p>

          {/* 첫 화면에서 바로 움직일 수 있는 두 갈래 — 진단(주) / 소개(부) */}
          <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-6">
            <Link href="/diagnosis">
              <Button variant="cream">{C.HERO.primary}</Button>
            </Link>
            <Link href="/about/philosophy" className="group inline-flex items-center gap-5">
              <CircleArrow size={46} dark />
              <span className="text-sm tracking-[0.06em] text-cream-100">
                {C.HERO.cta}
              </span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ══ 02 PROBLEM ═══════════════════════════════════════ */
export function Problem() {
  return (
    <Section no="02" label="Problem">
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div data-reveal>
          <H2>
            {C.PROBLEM.title.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </H2>
          <p className="prose-ko mt-6 max-w-md text-sm text-ink-500">{C.PROBLEM.lead}</p>
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
            {C.PROBLEM.timeline.map((t, i) => (
              <li
                key={t.time}
                className="tl-item relative py-6"
                data-reveal
                style={{ "--reveal-delay": `${i * 110}ms`, "--i": i } as React.CSSProperties}
              >
                <span className="tl-dot absolute top-[30px] -left-[36px] h-1.5 w-1.5 rounded-full bg-brass-500" />
                <p className="tl-time label tnum">{t.time}</p>
                <p className="prose-ko mt-2.5 text-sm text-ink-700 md:text-base">
                  {t.text}
                </p>
              </li>
            ))}
          </ul>
          <p
            className="display-ko mt-14 text-right text-lg md:text-xl lg:text-2xl"
            data-reveal
          >
            {C.PROBLEM.closing}
          </p>
        </div>
      </div>
    </Section>
  );
}

/* ══ 03 PHILOSOPHY ════════════════════════════════════ */
export function Philosophy() {
  return (
    <section className="relative overflow-hidden bg-forest-800 text-cream-100">
      {/* 시안의 은은한 식물 텍스처 */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-[0.16]">
        <Image
          src={HOME.philosophyTexture}
          alt=""
          fill
          sizes="50vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-forest-800 via-forest-800/90 to-transparent" />

      <Container className="relative py-24 md:py-36 lg:py-44">
        <div className="mb-12 flex items-center gap-4" data-reveal>
          <span className="label label-on-dark">03</span>
          <span className="h-px w-8 bg-cream-100/30" aria-hidden />
          <span className="label label-on-dark">Philosophy</span>
        </div>

        <div className="max-w-2xl" data-reveal>
          <h2 className="display-serif text-[2.75rem] sm:text-[3.5rem] lg:text-[4.5rem]">
            {C.PHILOSOPHY.title.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </h2>
          <p className="prose-ko mt-10 text-sm text-cream-100/70 md:text-base">
            {C.PHILOSOPHY.body.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </p>
          <p className="display-serif mt-12 text-xl text-brass-400 md:text-2xl">
            “{C.PHILOSOPHY.quote}”
          </p>
          <p className="label label-on-dark mt-12">{C.PHILOSOPHY.formula}</p>
        </div>
      </Container>
    </section>
  );
}

/* ══ 04 SIGNATURE ═════════════════════════════════════ */
export function Signature() {
  return (
    <Section no="04" label="Signature" tone="paper">
      <div className="grid gap-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-24">
        <div data-reveal>
          <h2 className="display-en text-[2rem] md:text-[2.75rem] lg:text-[3.25rem]">
            {C.SIGNATURE.title.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </h2>
          <p className="display-ko mt-7 text-lg md:text-xl">{C.SIGNATURE.subtitle}</p>
          <p className="prose-ko mt-7 text-sm text-ink-500">
            {C.SIGNATURE.body.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </p>
        </div>

        {/* 세리프 숫자가 앵커 — 각 단계마다 원장님이 실제로 하실 일을 적습니다 */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4 md:gap-x-8">
          {C.SIGNATURE.steps.map((s, i) => (
            <div
              key={s.no}
              className="flex flex-col border-t border-brass-500/40 pt-7"
              data-reveal
              style={{ "--reveal-delay": `${i * 110}ms` } as React.CSSProperties}
            >
              <p className="display-serif tnum text-[2.75rem] leading-none text-brass-500 md:text-[3.25rem]">
                {s.no}
              </p>
              <p className="mt-6 text-sm tracking-[0.18em] text-ink-900">{s.en}</p>
              <p className="prose-ko mt-3 text-sm whitespace-pre-line text-ink-700">
                {s.ko}
              </p>
              <div className="mt-auto pt-7">
                <p className="label">원장님이 하실 일</p>
                <p className="mt-1.5 text-sm text-brass-600">{s.you}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ══ 05 SOLUTIONS ═════════════════════════════════════ */
export function Solutions() {
  return (
    <Section no="05" label="Solutions">
      <H2En className="text-center">{C.SOLUTIONS.title}</H2En>

      <div className="mt-16 grid gap-5 md:grid-cols-3">
        {C.SOLUTIONS.cards.map((card, i) => (
          <Link
            key={card.en}
            href={card.href}
            className="group relative flex min-h-[420px] flex-col overflow-hidden bg-forest-900 p-8 text-cream-100 md:min-h-[480px]"
            data-reveal
            style={{ "--reveal-delay": `${i * 120}ms` } as React.CSSProperties}
          >
            <Image
              src={HOME.solutions[i]}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover opacity-45 transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/55 to-forest-950/20" />

            <div className="relative flex h-full flex-col">
              <p className="text-sm tracking-[0.2em]">{card.en}</p>
              <p className="prose-ko mt-3 text-sm text-cream-100/70">{card.ko}</p>

              <ul className="mt-auto space-y-2 pt-16">
                {card.items.map((it) => (
                  <li key={it} className="text-xs text-cream-100/60">
                    · {it}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex items-center gap-4">
                <CircleArrow size={38} dark />
                <span className="text-xs tracking-[0.08em]">자세히 보기</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}

/* ══ 06 REST ══════════════════════════════════════════ */
export function Rest() {
  return (
    <section className="relative flex min-h-[70svh] items-center md:min-h-[80svh]">
      <div className="veil-soft absolute inset-0">
        <Image
          src={HOME.rest}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <Container className="relative py-24">
        <div className="text-cream-100" data-reveal>
          <div className="mb-10 flex items-center gap-4">
            <span className="label label-on-dark">06</span>
            <span className="h-px w-8 bg-cream-100/30" aria-hidden />
            <span className="label label-on-dark">Rest</span>
          </div>
          <h2 className="display-ko text-[1.875rem] md:text-[2.75rem] lg:text-[3.25rem]">
            {C.REST.title.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </h2>
          <p className="display-en mt-8 text-lg text-cream-100/70 md:text-xl">
            {C.REST.sub}
          </p>
        </div>
      </Container>
    </section>
  );
}

/* ══ 07 WORKS ═════════════════════════════════════════ */
export function Works() {
  return (
    <Section no="07" label="Works" tone="paper">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-end" data-reveal>
        <H2En>{C.WORKS.title}</H2En>
        <p className="prose-ko text-sm text-ink-500">{C.WORKS.lead}</p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {C.WORKS.approach.map((a, i) => (
          <article
            key={a.no}
            className="flex flex-col bg-cream-50 p-8 shadow-[0_1px_2px_rgba(22,35,27,0.06),0_12px_32px_-12px_rgba(22,35,27,0.14)]"
            data-reveal
            style={{ "--reveal-delay": `${i * 120}ms` } as React.CSSProperties}
          >
            <div className="flex items-center justify-between">
              <span className="label tnum">{a.no}</span>
              <span className="label text-brass-600!">{a.tag}</span>
            </div>

            <Media
              label="접근 방식 이미지"
              ratio="aspect-[4/3]"
              className="mt-6"
              src={HOME.works[i]}
              sizes="(max-width: 768px) 100vw, 33vw"
            />

            <p className="display-ko mt-7 text-lg">{a.title}</p>
            <p className="prose-ko mt-3 text-sm text-ink-500">{a.body}</p>
          </article>
        ))}
      </div>

      <div className="mt-12 flex flex-wrap items-center justify-between gap-6" data-reveal>
        <p className="prose-ko border-l-2 border-brass-500 pl-5 text-xs text-ink-500">
          {C.WORKS.note}
        </p>
        <Link href="/diagnosis" className="group flex items-center gap-3">
          <span className="label">{C.WORKS.more}</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </Section>
  );
}

/* ══ 08 MEDICAL DIAGNOSIS ═════════════════════════════ */
export function DiagnosisTeaser() {
  return (
    <Section no="08" label="Medical Diagnosis">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        <div data-reveal>
          <H2>
            {C.DIAGNOSIS.title.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </H2>
          <p className="label mt-10">{C.DIAGNOSIS.sub}</p>
          <p className="prose-ko mt-3 text-sm text-ink-500">{C.DIAGNOSIS.body}</p>
          <Link href="/diagnosis" className="mt-10 inline-block">
            <Button>{C.DIAGNOSIS.cta}</Button>
          </Link>
        </div>

        {/* 실제 진단 문항을 그대로 미리 보여줍니다 — content/diagnosis.ts */}
        <ol className="border-t border-ink-900/12">
          {DIAGNOSIS_QUESTIONS.map((q, i) => (
            <li
              key={q.area}
              data-reveal
              style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
            >
              <Link
                href="/diagnosis"
                className="group -mx-3 grid grid-cols-[3.25rem_1fr_auto] items-baseline gap-4 border-b border-ink-900/12 px-3 py-6 transition-colors duration-300 hover:bg-cream-50 md:grid-cols-[4rem_1fr_auto]"
              >
                <span className="display-serif tnum text-2xl leading-none text-brass-500 md:text-3xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm tracking-[0.06em] text-ink-900">{q.area}</span>
                  <span className="prose-ko mt-1.5 block text-sm text-ink-500">{q.q}</span>
                </span>
                <span
                  aria-hidden
                  className="label transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

/* ══ 09 INSIGHT ═══════════════════════════════════════ */
export function Insight() {
  // 최신 칼럼 3건 — content/articles.ts에서 직접 가져와 목록과 항상 같습니다
  const posts = latestArticles("/insight/column").slice(0, 3);

  return (
    <Section no="09" label="Insight" tone="paper">
      <div className="text-center" data-reveal>
        <H2En>{C.INSIGHT.title}</H2En>
        <div className="mt-8 inline-flex flex-wrap justify-center gap-8 border-b border-ink-900/12">
          {C.INSIGHT.tabs.map((t, i) => (
            <Link
              key={t.href}
              href={t.href}
              className={`pb-3.5 text-sm transition-colors ${
                i === 0
                  ? "border-b border-ink-900 text-ink-900"
                  : "text-ink-400 hover:text-ink-900"
              }`}
            >
              {t.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {posts.map((a, i) => (
          <Link
            key={a.slug}
            href={`${a.list}/${a.slug}`}
            className="group flex flex-col bg-cream-50"
            data-reveal
            style={{ "--reveal-delay": `${i * 120}ms` } as React.CSSProperties}
          >
            <div className="overflow-hidden">
              <Media
                label="아티클 썸네일"
                ratio="aspect-[16/10]"
                src={HOME.insight[i]}
                sizes="(max-width: 768px) 100vw, 33vw"
                className="transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col p-7">
              <p className="label tnum">
                {a.category} · {a.date} · {readingTime(a)}분 읽기
              </p>
              <p className="display-ko mt-4 text-base">{a.title}</p>
              <p className="prose-ko mt-3 line-clamp-2 text-sm text-ink-500">{a.excerpt}</p>
              <span className="label mt-auto block pt-6">읽어보기 →</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 text-center" data-reveal>
        <Link href="/insight" className="group inline-flex items-center gap-3">
          <span className="label">{C.INSIGHT.more}</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </Section>
  );
}

/* ══ 10 CTA ═══════════════════════════════════════════ */
export function ClosingCta() {
  return (
    <section className="relative flex min-h-[46svh] items-center md:min-h-[54svh]">
      <div className="veil-soft absolute inset-0">
        <Image src={HOME.cta} alt="" fill sizes="100vw" className="object-cover" />
      </div>
      <Container className="relative py-20">
        <div
          className="flex flex-col items-start justify-between gap-10 text-cream-100 lg:flex-row lg:items-end"
          data-reveal
        >
          <div>
            <div className="mb-8 flex items-center gap-4">
              <span className="label label-on-dark">10</span>
              <span className="h-px w-8 bg-cream-100/30" aria-hidden />
              <span className="label label-on-dark">{C.CTA.eyebrow}</span>
            </div>
            <h2 className="display-ko text-[1.625rem] md:text-[2.25rem] lg:text-[2.625rem]">
              {C.CTA.title.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </h2>
            <p className="prose-ko mt-5 text-sm text-cream-100/70">{C.CTA.body}</p>
          </div>
          <Link href="/contact" className="shrink-0">
            <Button variant="light">{C.CTA.button}</Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
