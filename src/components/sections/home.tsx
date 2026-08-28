import Image from "next/image";
import Link from "next/link";
import {
  Container,
  Section,
  Media,
  Button,
  CircleArrow,
  BrassIcon,
  H2,
  H2En,
} from "@/components/ui";
import * as C from "@/content/home";
import { HOME } from "@/config/images";

/* ══ 01 HERO ══════════════════════════════════════════ */
export function Hero() {
  return (
    <section className="relative flex min-h-[88svh] items-center md:min-h-screen">
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

          <Link href="/about/philosophy" className="group mt-14 inline-flex items-center gap-5">
            <CircleArrow size={46} dark />
            <span className="text-sm tracking-[0.06em] text-cream-100">
              {C.HERO.cta}
            </span>
          </Link>
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
          <Media
            label="야근하는 원장 이미지"
            ratio="aspect-[16/10]"
            className="mt-12"
            src={HOME.problem}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <div className="flex flex-col justify-center">
          <ul className="border-l border-ink-900/15 pl-8">
            {C.PROBLEM.timeline.map((t, i) => (
              <li
                key={t.time}
                className="relative py-6"
                data-reveal
                style={{ "--reveal-delay": `${i * 110}ms` } as React.CSSProperties}
              >
                <span className="absolute top-[30px] -left-[36px] h-1.5 w-1.5 rounded-full bg-brass-500" />
                <p className="label tnum">{t.time}</p>
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
          <p className="label label-on-dark mt-16">{C.PHILOSOPHY.formula}</p>
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

        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4">
          {C.SIGNATURE.steps.map((s, i) => (
            <div
              key={s.no}
              data-reveal
              style={{ "--reveal-delay": `${i * 110}ms` } as React.CSSProperties}
            >
              <BrassIcon size={38} />
              <p className="label tnum mt-7">{s.no}</p>
              <p className="mt-2 text-sm tracking-[0.14em] text-ink-900">{s.en}</p>
              <p className="prose-ko mt-3 text-xs whitespace-pre-line text-ink-500">
                {s.ko}
              </p>
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
      <div className="flex flex-wrap items-end justify-between gap-4" data-reveal>
        <H2En>{C.WORKS.title}</H2En>
        <Link href="/insight" className="group flex items-center gap-3">
          <span className="label">{C.WORKS.more}</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {C.WORKS.cases.map((w, i) => (
          <article
            key={w.tag}
            className="bg-cream-50 p-7 shadow-[0_1px_2px_rgba(22,35,27,0.06),0_12px_32px_-12px_rgba(22,35,27,0.14)]"
            data-reveal
            style={{ "--reveal-delay": `${i * 120}ms` } as React.CSSProperties}
          >
            <div className="flex items-center gap-2.5">
              <BrassIcon size={22} />
              <p className="label">{w.tag}</p>
            </div>

            <p className="display-ko mt-5 text-base md:text-lg">{w.headline}</p>

            <Media
              label="케이스 썸네일"
              ratio="aspect-[4/3]"
              className="mt-6"
              src={HOME.works[i]}
              sizes="(max-width: 768px) 100vw, 33vw"
            />

            <div className="mt-6 flex gap-2">
              {w.chips.map((c) => (
                <span
                  key={c}
                  className="border border-ink-900/15 px-2.5 py-1 text-[11px] tracking-[0.06em] text-ink-500"
                >
                  {c}
                </span>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-ink-900/10 pt-6">
              {w.metrics.map((m) => (
                <div key={m.label}>
                  <p className="tnum text-[1.75rem] leading-none font-light">{m.value}</p>
                  <p className="label mt-2">{m.label}</p>
                </div>
              ))}
            </div>

            <div className="label mt-6 flex items-center gap-2">
              {C.WORKS.flow.map((f, j) => (
                <span key={f}>
                  {f}
                  {j < C.WORKS.flow.length - 1 && <span className="px-2">→</span>}
                </span>
              ))}
            </div>
          </article>
        ))}
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

        <div className="grid grid-cols-2 border-t border-l border-ink-900/12 sm:grid-cols-5">
          {C.DIAGNOSIS.items.map((it, i) => (
            <div
              key={it}
              className="flex flex-col items-center gap-5 border-r border-b border-ink-900/12 px-4 py-10"
              data-reveal
              style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
            >
              <BrassIcon size={34} />
              <p className="text-center text-xs text-ink-700">{it}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ══ 09 INSIGHT ═══════════════════════════════════════ */
export function Insight() {
  return (
    <Section no="09" label="Insight" tone="paper">
      <div className="text-center" data-reveal>
        <H2En>{C.INSIGHT.title}</H2En>
        <div className="mt-8 inline-flex gap-8 border-b border-ink-900/12">
          {C.INSIGHT.tabs.map((t, i) => (
            <span
              key={t}
              className={`pb-3.5 text-sm ${
                i === 0
                  ? "border-b border-ink-900 text-ink-900"
                  : "text-ink-400"
              }`}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {C.INSIGHT.cards.map((c, i) => (
          <Link
            key={c.title}
            href="/insight/column"
            className="group bg-cream-50"
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
            <div className="p-7">
              <p className="display-ko text-base">{c.title}</p>
              <p className="label mt-6">
                {c.cat} · <span className="tnum">{c.date}</span>
              </p>
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
              <span className="label label-on-dark">Contact</span>
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
