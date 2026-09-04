import Link from "next/link";
import { Section, Media, IconBox, H2, BrassIcon, Button } from "@/components/ui";
import { PageHero, CtaBand, findHub } from "./shared";
import { HUB_HERO, hubCard } from "@/config/images";
import { hubContent } from "@/content/solutions";

/** 사례가 비어 있는 동안, 빈 카드 대신 사례를 다루는 원칙을 보여줍니다 */
const CASE_PRINCIPLES = [
  {
    title: "동의 없이 공개하지 않습니다",
    body: "병원명·수치·화면은 계약 병원의 승인을 받은 것만 게재합니다. 원장님의 병원도 같은 원칙으로 다뤄집니다.",
  },
  {
    title: "같은 상권, 같은 진료과는 중복해서 맡지 않습니다",
    body: "사례가 경쟁 병원의 교본이 되지 않도록, 수주 단계에서부터 겹치지 않게 받습니다.",
  },
  {
    title: "숫자는 전환 기준으로만 씁니다",
    body: "노출·순위 같은 중간 지표가 아니라, 문의와 예약이 어떻게 바뀌었는지로만 사례를 말합니다.",
  },
];

/** 템플릿 1 — 솔루션 허브 (/signature /branding /marketing /medical-ai) */
export function SolutionHub({ href }: { href: string }) {
  const hub = findHub(href);
  const c = hubContent(href);

  const items = hub.children ?? [];
  // 3열 기준으로 남는 칸 수 (5개 → 1칸)
  const fillers = (3 - (items.length % 3)) % 3;

  // 섹션 번호 — 환자 여정이 있는 허브는 뒤 섹션이 한 칸씩 밀립니다
  let n = 0;
  const no = () => String(++n).padStart(2, "0");

  return (
    <>
      <PageHero
        crumbs={[{ label: hub.fullLabel }]}
        title={hub.fullLabel}
        lead={c?.lead ?? "이 영역에서 닥터플래너스가 제공하는 세부 솔루션입니다. 병원 상황에 따라 조합해 설계합니다."}
        mediaLabel={`${hub.fullLabel} 키비주얼`}
        mediaSrc={HUB_HERO[href]}
      />

      <Section no={no()} label="Sub solutions">
        {/* 3열 — 3의 배수가 아닌 허브(5개)는 남는 칸을 진단 안내 카드로 채워 빈 칸을 없앱니다 */}
        <div className="grid border-t border-l border-ink-900/15 md:grid-cols-2 lg:grid-cols-3">
          {items.map((c, i) => (
            <Link
              key={c.href}
              href={c.href}
              className="group border-r border-b border-ink-900/15 bg-cream-100"
            >
              <div className="overflow-hidden">
                <Media
                  label={c.label}
                  ratio="aspect-[16/10]"
                  src={hubCard(href, i)}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
              </div>
              <div className="p-8">
                <span className="label tnum">{String(i + 1).padStart(2, "0")}</span>
                <div className="mt-4 flex items-start gap-4">
                  <IconBox size={36} />
                  <div>
                    <p className="display-ko text-lg">{c.label}</p>
                    <p className="prose-ko mt-1.5 text-sm text-ink-500">{c.blurb}</p>
                  </div>
                </div>
                <span className="label mt-7 block">자세히 보기 →</span>
              </div>
            </Link>
          ))}

          {Array.from({ length: fillers }).map((_, i) => (
            <Link
              key={`filler-${i}`}
              href="/diagnosis"
              className="group flex min-h-[320px] flex-col justify-between border-r border-b border-ink-900/15 bg-forest-800 p-8 text-cream-100"
            >
              <p className="label label-on-dark">어떤 조합이 맞을지 모르겠다면</p>
              <div>
                <p className="display-ko text-xl">
                  5가지 항목으로
                  <br />
                  지금 위치부터 확인하세요.
                </p>
                <p className="prose-ko mt-4 text-sm text-cream-100/65">
                  약 3분. 자동 점수가 아니라 담당 플래너가 직접 읽고 회신합니다.
                </p>
                <span className="label label-on-dark mt-10 block transition-colors group-hover:text-cream-100">
                  병원 진단 시작하기 →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* 환자 여정 — 우리 솔루션이 어느 단계에 붙는지 */}
      {c?.journey && (
        <Section no={no()} label="Patient journey" tone="forest">
          <div
            className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end"
            data-reveal
          >
            <H2 className="text-cream-100">{c.journey.title}</H2>
            <p className="prose-ko text-sm text-cream-100/70">{c.journey.lead}</p>
          </div>

          <ol className="mt-14 grid gap-px border-t border-l border-cream-100/15 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {c.journey.steps.map((s, i) => (
              <li
                key={s.title}
                className="flex flex-col border-r border-b border-cream-100/15 p-6"
                data-reveal
                style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
              >
                <span className="display-serif tnum text-3xl leading-none text-brass-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="display-ko mt-4 text-lg text-cream-100">{s.title}</p>
                <p className="prose-ko mt-2.5 text-sm text-cream-100/65">{s.body}</p>

                <div className="mt-auto pt-7">
                  <p className="label label-on-dark">
                    {s.ours.length ? "저희가 붙는 자리" : "아직 병원 이름을 모릅니다"}
                  </p>
                  {s.ours.length > 0 && (
                    <ul className="mt-3 space-y-1.5">
                      {s.ours.map((o) => (
                        <li key={o.href + o.label}>
                          <Link
                            href={o.href}
                            className="text-sm text-cream-100/85 underline-offset-4 transition-colors hover:text-cream-100 hover:underline"
                          >
                            {o.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>

          <div
            className="mt-12 flex flex-wrap items-center justify-between gap-6"
            data-reveal
          >
            <p className="display-ko max-w-2xl text-lg text-cream-100 md:text-xl">
              {c.journey.closing}
            </p>
            <Link href="/diagnosis" className="shrink-0">
              <Button variant="light">병원 진단 시작하기</Button>
            </Link>
          </div>
        </Section>
      )}

      <Section no={no()} label="Process" tone="paper">
        <H2>{c?.processTitle ?? "진행 방식"}</H2>
        <div
          className={`mt-12 grid gap-px border-t border-l border-ink-900/12 ${
            (c?.process.length ?? 4) > 4 ? "sm:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-4"
          }`}
        >
          {(c?.process ?? [
            { title: "상담 · 진단", body: "" },
            { title: "전략 설계", body: "" },
            { title: "실행", body: "" },
            { title: "리포트 · 관리", body: "" },
          ]).map((step, i) => (
            <div
              key={step.title}
              className="border-r border-b border-ink-900/12 bg-cream-100 p-7"
              data-reveal
              style={{ "--reveal-delay": `${i * 110}ms` } as React.CSSProperties}
            >
              <span className="label tnum">STEP {i + 1}</span>
              <p className="display-ko mt-4 text-lg">{step.title}</p>
              {step.body && (
                <p className="prose-ko mt-3 text-sm text-ink-500">{step.body}</p>
              )}
              {step.you && (
                <p className="label mt-5 text-brass-600!">{step.you}</p>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* 사례 — 공개 가능한 것이 생기기 전까지는 원칙으로 신뢰를 대신합니다 */}
      <Section no={no()} label="Related works">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <div data-reveal>
            <H2>관련 사례</H2>
            <p className="prose-ko mt-6 max-w-md text-sm text-ink-500">
              {c?.casesNote ?? "공개 가능한 사례부터 순차적으로 게재할 예정입니다."}
            </p>
            <Link href="/signature" className="group mt-8 inline-flex items-center gap-3">
              <span className="label">사례 대신, 일하는 순서 먼저 보기</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

          <div className="border border-ink-900/15 bg-cream-50 p-8 md:p-10" data-reveal>
            <p className="label">사례를 다루는 원칙</p>
            <ul className="mt-4 divide-y divide-ink-900/10">
              {CASE_PRINCIPLES.map((p) => (
                <li key={p.title} className="flex gap-5 py-6">
                  <BrassIcon size={28} />
                  <div>
                    <p className="display-ko text-base">{p.title}</p>
                    <p className="prose-ko mt-2 text-sm text-ink-500">{p.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
