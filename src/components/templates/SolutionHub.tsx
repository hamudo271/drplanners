import Image from "next/image";
import Link from "next/link";
import { Container, H2 } from "@/components/ui";
import { PageHero, CtaBand, findHub } from "./shared";
import { HubDiagram, hasHubDiagram } from "@/components/sections/HubDiagram";
import { HUB_HERO, hubCard } from "@/config/images";
import { enFor } from "@/config/nav";
import { hubContent } from "@/content/solutions";

/**
 * 템플릿 1 — 솔루션 허브 (/signature /branding /marketing /medical-ai)
 *
 * 더가든 서브페이지 어휘: 세부 서비스는 "Brand Values"식 세로 카드(위 글, 아래 사진),
 * 환자 여정은 어두운 띠 위 흰 카드, 진행 순서는 흰 카드 줄.
 */
export function SolutionHub({ href }: { href: string }) {
  const hub = findHub(href);
  const c = hubContent(href);

  const items = hub.children ?? [];
  // 3열 기준으로 남는 칸 수 (5개 → 1칸)
  const fillers = (3 - (items.length % 3)) % 3;

  return (
    <>
      <PageHero
        crumbs={[{ label: hub.fullLabel }]}
        title={hub.fullLabel}
        en={enFor(href)}
        lead={c?.lead ?? "이 영역에서 닥터플래너스가 제공하는 세부 서비스입니다. 병원 상황에 따라 조합해 설계합니다."}
        mediaLabel={`${hub.fullLabel} 키비주얼`}
        mediaSrc={HUB_HERO[href]}
      />

      {/* ── 세부 서비스 — 세로 카드 ── */}
      <section className="sx bg-cream-100 text-ink-900">
        <Container className="sx-pad">
          <div className="sx-head-center" data-reveal>
            <p className="sx-cate">( Services )</p>
            <H2>세부 서비스</H2>
          </div>

          <div className="hub-cards">
            {items.map((it, i) => (
              <Link
                key={it.href}
                href={it.href}
                className="hub-card"
                data-reveal
                style={{ "--reveal-delay": `${(i % 3) * 100}ms` } as React.CSSProperties}
              >
                <span className="hub-card-no tnum">{String(i + 1).padStart(2, "0")}</span>
                <span className="hub-card-en">{it.en}</span>
                <span className="hub-card-title">{it.label}</span>
                <span className="hub-card-blurb">{it.blurb}</span>
                <span className="hub-card-media">
                  <Image
                    src={hubCard(href, i)}
                    alt=""
                    fill
                    sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                    className="object-cover"
                  />
                </span>
              </Link>
            ))}

            {/* 3의 배수가 아닌 허브(5개)는 남는 칸을 진단 안내로 채워 빈 칸을 없앱니다 */}
            {Array.from({ length: fillers }).map((_, i) => (
              <Link key={`filler-${i}`} href="/diagnosis" className="hub-card is-filler" data-reveal>
                <span className="hub-card-en">Not sure where to start?</span>
                <span className="hub-card-title">
                  5가지 항목으로
                  <br />
                  지금 위치부터 확인하세요.
                </span>
                <span className="hub-card-blurb">
                  약 3분. 자동 점수가 아니라 담당 플래너가 직접 읽고 회신합니다.
                </span>
                <span className="pill pill--cream hub-card-pill">
                  병원 진단 시작하기
                  <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* 허브별 고유 도식 — 브랜딩 접점 맵 / 마케팅 예산 흐름 / 메디컬 AI 노출 구조 */}
      {hasHubDiagram(href) && <HubDiagram href={href} no="" />}

      {/* ── 환자가 오는 길 — 어두운 띠 + 흰 카드 ── */}
      {c?.journey && (
        <section className="sx sx-dark">
          <Container className="sx-pad sx-dark-inner">
            <div className="sx-head-center" data-reveal>
              <p className="sx-cate is-dark">( Patient Journey )</p>
              <H2>{c.journey.title}</H2>
              <span className="sx-slash" aria-hidden="true" />
              <div className="sx-lead-center">
                <p>{c.journey.lead}</p>
              </div>
            </div>

            <ol className="sx-cards sx-cards--3">
              {c.journey.steps.map((s, i) => (
                <li
                  key={s.title}
                  className="sx-card"
                  data-reveal
                  style={{ "--reveal-delay": `${(i % 3) * 90}ms` } as React.CSSProperties}
                >
                  <span className="sx-card-no tnum">{String(i + 1).padStart(2, "0")}</span>
                  <p className="sx-card-title">{s.title}</p>
                  <p className="sx-card-body">{s.body}</p>
                  <div className="sx-card-foot">
                    <p className="sx-card-foot-label">
                      {s.ours.length ? "저희가 붙는 자리" : "아직 병원 이름을 모릅니다"}
                    </p>
                    {s.ours.length > 0 && (
                      <ul className="sx-card-links">
                        {s.ours.map((o) => (
                          <li key={o.href + o.label}>
                            <Link href={o.href}>{o.label}</Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              ))}
            </ol>

            <div className="sx-dark-foot" data-reveal>
              <p>{c.journey.closing}</p>
              <Link href="/diagnosis" className="pill pill--cream">
                병원 진단 시작하기
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </Container>
        </section>
      )}

      {/* ── 진행 순서 ── */}
      <section className="sx bg-cream-50 text-ink-900">
        <Container className="sx-pad">
          {href === "/signature" && c ? (
            /* 회사 이름이 곧 프로세스 — 여섯 글자가 이끄는 카드 */
            <>
              <div className="sx-head-center" data-reveal>
                <p className="sx-cate">( DR.PLAN Process )</p>
                <H2>{c.processTitle}</H2>
                <p className="sx-text sx-text-center">
                  여섯 단계를 전부 더해도 원장님이 움직이실 시간은 채 10분이 되지 않습니다.
                  각 단계 아래에 원장님이 실제로 하실 일을 적었습니다.
                </p>
              </div>
              <ol className="sx-steps sx-steps--6">
                {c.process.map((step, i) => {
                  const [letter, rest] = step.title.split(" — ");
                  return (
                    <li
                      key={step.title}
                      className="sx-step is-letter"
                      data-reveal
                      style={{ "--reveal-delay": `${(i % 3) * 100}ms` } as React.CSSProperties}
                    >
                      <span className="sx-letter">{letter}</span>
                      <p className="sx-card-title">{rest}</p>
                      <p className="sx-card-body">{step.body}</p>
                      {step.you && <p className="sx-step-you">{step.you}</p>}
                    </li>
                  );
                })}
              </ol>
            </>
          ) : (
            <>
              <div className="sx-head-center" data-reveal>
                <p className="sx-cate">( Process )</p>
                <H2>{c?.processTitle ?? "진행 방식"}</H2>
              </div>
              <ol className="sx-steps">
                {(c?.process ?? []).map((step, i) => (
                  <li
                    key={step.title}
                    className="sx-step"
                    data-reveal
                    style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}
                  >
                    <div className="sx-step-top">
                      <span className="sx-step-no tnum">STEP {String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <p className="sx-card-title">{step.title}</p>
                    {step.body && <p className="sx-card-body">{step.body}</p>}
                    {step.you && <p className="sx-step-you">{step.you}</p>}
                  </li>
                ))}
              </ol>
            </>
          )}
        </Container>
      </section>

      <CtaBand kind="service" />
    </>
  );
}
