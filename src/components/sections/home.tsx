import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui";
import * as C from "@/content/home";
import { BUDGET_FUNNEL } from "@/content/diagrams";
import { HOME } from "@/config/images";
import { latestArticles, readingTime, type Article } from "@/content/articles";
import { ProcessTrack } from "./ProcessTrack";

/* ══ 첫 두 화면(히어로 · Why) ═════════════════════════
   스크롤 연출이 두 화면에 걸쳐 이어지므로 한 클라이언트 컴포넌트로 묶었습니다. */
export { HomeIntro } from "./HomeIntro";

/* ═══════════════════════════════════════════════════════════
   공통 조각 — 더가든 메인의 어휘
   · 섹션 머리: ( 영문 괄호 라벨 ) + 한글 제목. 영문은 장식, 뜻은 한글이 집니다.
   · 양옆 세로선: 콘텐츠 폭의 바깥 모서리에 같은 자리로 이어집니다.
   · VIEW MORE: 작은 테두리 버튼. 링크의 뜻은 aria-label 로 한글로 붙입니다.
   ═══════════════════════════════════════════════════════════ */

function TitleBox({
  id,
  cate,
  title,
  light = false,
  center = false,
}: {
  id: string;
  cate: string;
  title: readonly string[];
  light?: boolean;
  center?: boolean;
}) {
  return (
    <div className={`gt ${light ? "gt--light" : ""} ${center ? "gt--center" : ""}`} data-reveal>
      <p className="gt-cate">{cate}</p>
      <h2 id={id} className="gt-title">
        {title.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </h2>
    </div>
  );
}

function FrameLines({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`frame-lines ${dark ? "frame-lines--dark" : ""}`} aria-hidden="true">
      <span />
      <span />
    </div>
  );
}

function MoreButton({ href, label, text = "VIEW MORE" }: { href: string; label: string; text?: string }) {
  return (
    <Link href={href} className="more-btn" aria-label={label}>
      <span>{text}</span>
      <svg width="7" height="8" viewBox="0 0 7 8" fill="currentColor" aria-hidden="true">
        <path d="M7 4 0 8V0z" />
      </svg>
    </Link>
  );
}

/* ══ 세 번째 화면 — 대상 확인 ══════════════════════════
   더가든 메인 3번 화면의 배치를 따릅니다: 괄호 라벨 + 제목, 대문자 세리프 문장,
   세로 사진과 오른쪽 목록, 아래로 흐르는 외곽선 글씨.
   더가든은 오른쪽에 실적 숫자를 세지만, 저희는 확인된 실적이 없으므로
   지어내지 않고 "어떤 병원인가" 세 가지를 같은 무게로 놓습니다. */
export function Fit() {
  const A = C.AUDIENCE;
  return (
    <section id="audience" className="fit" aria-labelledby="fit-title">
      <div className="fit-deco-mark" aria-hidden="true">
        <Image src="/brand/mark.png" alt="" width={161} height={340} />
      </div>
      <FrameLines />

      <Container className="fit-inner">
        <TitleBox id="fit-title" cate={A.cate} title={A.title} />

        <p className="fit-point" aria-hidden="true" data-reveal>
          {A.point.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </p>

        <div className="fit-cols">
          <div className="fit-deco" aria-hidden="true" data-reveal>
            <span className="fit-deco-box" />
            <span className="fit-deco-img">
              <Image src={HOME.fitDeco} alt="" fill sizes="240px" className="object-cover" />
            </span>
          </div>

          <figure className="fit-photo" data-reveal="left">
            <Image
              src={HOME.fitPhoto}
              alt=""
              fill
              sizes="(max-width: 1023px) 100vw, 46vw"
              className="object-cover"
            />
            <figcaption className="fit-photo-note">
              <span className="fit-photo-ko">
                {A.photoNote.map((l) => (
                  <span key={l}>{l}</span>
                ))}
              </span>
              <span className="fit-photo-en">{A.photoNoteEn}</span>
            </figcaption>
          </figure>

          <ol className="fit-list">
            {A.cards.map((card, i) => (
              <li
                key={card.no}
                data-reveal
                style={{ "--reveal-delay": `${i * 120}ms` } as React.CSSProperties}
              >
                <div className="fit-num-row">
                  <span className="fit-num tnum">{card.no}</span>
                  {card.tag && <span className="fit-tag">{card.tag}</span>}
                </div>
                <p className="fit-item-title">{card.title}</p>
                <p className="fit-item-body">{card.body}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* 거르는 장치 — "월 4곳만"이 진짜가 되려면 안 받는 경우도 밝혀야 합니다 */}
        <div className="exclude-block" data-reveal>
          <p className="exclude-label">{A.excludeLabel}</p>
          <ul className="exclude-list">
            {A.exclude.map((e) => (
              <li key={e}>
                <span className="exclude-mark" aria-hidden="true">
                  ✕
                </span>
                <span className="prose-ko">{e}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="fit-track" aria-hidden="true">
        <div className="fit-track-inner">
          {Array.from({ length: 4 }, (_, i) => (
            <span key={i}>{A.track}&nbsp;—&nbsp;</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══ 어디가 막혔는지 — 어두운 판 ═════════════════════════
   더가든 4번(어두운 사진 판)의 자리. 광고비가 여섯 칸을 지나 신환이 되는 길을
   가는 막대로 그리고, 칸마다 새는 이유를 옆에 붙입니다. 막대는 화면에 들어올 때
   왼쪽에서부터 그어집니다. /marketing 의 깔때기와 같은 데이터를 씁니다. */
export function Bottleneck() {
  const B = C.BOTTLENECK;
  const F = BUDGET_FUNNEL;
  const last = F.steps.length - 1;

  return (
    <section id="bottleneck" className="bn" aria-labelledby="bn-title">
      <div className="bn-bg" aria-hidden="true">
        <Image src={HOME.bottleneckBg} alt="" fill sizes="100vw" className="object-cover" />
      </div>
      <FrameLines dark />

      <Container className="bn-inner">
        <div className="bn-head">
          <TitleBox id="bn-title" cate={B.cate} title={B.title} light />
          <p className="bn-lead" data-reveal>
            {B.lead}
          </p>
        </div>

        <ol className="bn-funnel" aria-label={F.title}>
          {F.steps.map((s, i) => (
            <li
              key={s.name}
              className={`bn-row ${i === last ? "is-last" : ""}`}
              data-reveal
              style={
                {
                  // 아래로 갈수록 좁아집니다 — 남는 양이 줄어드는 걸 폭으로
                  "--w": `${100 - i * 11}%`,
                  "--reveal-delay": `${i * 90}ms`,
                } as React.CSSProperties
              }
            >
              <span className="bn-no tnum">{String(i + 1).padStart(2, "0")}</span>
              <span className="bn-lane">
                <span className="bn-bar">
                  <span className="bn-name">{s.name}</span>
                </span>
                {s.leak && <span className="bn-leak">{s.leak}</span>}
              </span>
            </li>
          ))}
        </ol>
        <p className="bn-closing" data-reveal>
          {F.closing}
        </p>

        {/* 세 원인 — 새는 칸에 따라 처방이 갈립니다 */}
        <ul className="bn-routes">
          {B.items.map((it, i) => (
            <li key={it.no} data-reveal style={{ "--reveal-delay": `${i * 110}ms` } as React.CSSProperties}>
              <Link href={it.href} className="bn-route">
                <span className="bn-route-no tnum">{it.no}</span>
                <span className="bn-route-q">{it.q}</span>
                <span className="bn-route-body">{it.body}</span>
                <span className="bn-route-fix">
                  {it.fix}
                  <span aria-hidden="true">→</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA 2회차 — 상단·중단·하단 3회 정책 */}
        <div className="bn-cta" data-reveal>
          <Link href={C.PRIMARY_CTA.href} className="pill pill--cream">
            {C.PRIMARY_CTA.label}
            <span aria-hidden="true">→</span>
          </Link>
          <p className="bn-cta-note">어디가 막혔는지 모르시겠다면, 진단부터 받아보십시오.</p>
        </div>
      </Container>
    </section>
  );
}

/* ══ 솔루션 — 더가든 '맞춤 솔루션' 판 ══════════════════════
   가는 선으로 나뉜 편집형 그리드. 칸마다 사진과 큰 숫자가 엇갈려 놓이고
   VIEW MORE 로 서비스 페이지에 닿습니다. (예전 서비스 3축 아코디언의 자리) */
export function Solutions() {
  const S = C.SOLUTIONS;
  return (
    <section className="sol" aria-labelledby="sol-title">
      <FrameLines />
      <Container>
        <TitleBox id="sol-title" cate={S.cate} title={S.heading} />

        <div className="sol-board">
          {S.cards.map((card, i) => (
            <article key={card.href} className={`sol-item sol-item--${i + 1}`}>
              <div className="sol-text" data-reveal>
                <p className="sol-tag">{card.tag}</p>
                <h3 className="sol-title">{card.title}</h3>
                <p className="sol-blurb">{card.blurb}</p>
                <p className="sol-items">{card.items.join(" · ")}</p>
                <MoreButton href={card.href} label={`${card.tag} 자세히 보기`} />
              </div>
              <div className="sol-media" data-reveal="wipe">
                <div className="sol-img">
                  <Image
                    src={HOME.solutions[i]}
                    alt=""
                    fill
                    sizes={i === 2 ? "(max-width: 1023px) 100vw, 52vw" : "(max-width: 1023px) 100vw, 34vw"}
                    className="object-cover"
                  />
                </div>
                <span className="sol-num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ══ 일하는 순서 — 더가든 '진료 여정' ════════════════════
   왼쪽에 제목과 PREV/NEXT, 오른쪽에 아치형 사진 카드가 화면 밖까지 이어집니다.
   카드마다 "원장님이 하실 일"을 붙여 철학(시간을 덜어드린다)을 숫자로 보입니다. */
export function Plan() {
  const P = C.PLAN;
  return (
    <section className="proc" aria-labelledby="proc-title">
      <FrameLines />
      <div className="proc-grid">
        <div className="proc-left">
          <TitleBox id="proc-title" cate={P.cate} title={P.title} />
          <p className="proc-lead" data-reveal>
            {P.lead.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </p>
        </div>

        <ProcessTrack>
          {P.steps.map((s, i) => (
            <article key={s.no} className="proc-card">
              <div className="proc-media">
                <div className="proc-arch">
                  <Image
                    src={HOME.process[i]}
                    alt=""
                    fill
                    sizes="(max-width: 767px) 78vw, 380px"
                    className="object-cover"
                  />
                </div>
                <span className="proc-num" aria-hidden="true">
                  {s.no}
                </span>
              </div>
              <h3 className="proc-name">{s.name}</h3>
              <p className="proc-ko">{s.ko}</p>
              <p className="proc-you">
                <span>원장님이 하실 일</span>
                {s.you}
              </p>
            </article>
          ))}
        </ProcessTrack>
      </div>
    </section>
  );
}

/* ══ 지키는 것 — 더가든 '프라이빗 룸' 판 ═══════════════════
   어두운 사진 위 가운데 워드마크 → 세로선 → 제목, 그 아래 흰 알약 줄 넷.
   ⚠️ metrics 가 비어 있으면 수치 줄은 통째로 숨겨집니다 — 지어내지 않습니다. */
export function Evidence() {
  const E = C.EVIDENCE;
  return (
    <section className="prm" aria-labelledby="prm-title">
      <div className="prm-bg" aria-hidden="true">
        <Image src={HOME.promiseBg} alt="" fill sizes="100vw" className="object-cover" />
      </div>
      <FrameLines dark />

      <Container className="prm-inner">
        <div className="prm-head" data-reveal>
          <Image
            src="/intro/wordmark-light.png"
            alt=""
            width={1569}
            height={136}
            className="prm-logo"
          />
          <span className="prm-vline" aria-hidden="true" />
        </div>
        <TitleBox id="prm-title" cate={E.cate} title={E.title} light center />

        <p className="prm-desc" data-reveal>
          {E.intro.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </p>

        <ul className="prm-list">
          {E.promises.map((p, i) => (
            <li
              key={p.v}
              className="prm-row"
              data-reveal
              style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
            >
              <span className="prm-icon tnum" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="prm-title">
                <strong>{p.v}</strong> {p.k}
              </p>
              <p className="prm-text">{p.d}</p>
            </li>
          ))}
        </ul>

        {E.metrics.length > 0 && (
          <ul className="prm-metrics" data-reveal>
            {E.metrics.map((m) => (
              <li key={m.label}>
                <span className="prm-metric-value tnum">{m.value}</span>
                <span className="prm-metric-label">{m.label}</span>
              </li>
            ))}
          </ul>
        )}

        <p className="prm-note" data-reveal>
          {E.note}
        </p>
      </Container>
    </section>
  );
}

/* ══ 읽을거리 — 더가든 '컴포트 케어' 판 ═══════════════════
   왼쪽은 크림 바탕에 제목과 글 목록(흰 상자 줄), 오른쪽은 옅은 판 위에
   포개진 카드 두 장. 가장 최근 두 편이 카드, 그다음 세 편이 목록입니다. */
function InsightCard({ a, src, back = false }: { a: Article; src: string; back?: boolean }) {
  return (
    <Link
      href={`${a.list}/${a.slug}`}
      className={`ins-card ${back ? "is-back" : "is-front"}`}
      tabIndex={back ? -1 : undefined}
      aria-hidden={back || undefined}
    >
      <span className="ins-card-bg">
        <Image src={src} alt="" fill sizes="(max-width: 1023px) 90vw, 36vw" className="object-cover" />
      </span>
      <span className="ins-card-body">
        <span className="ins-card-meta tnum">
          {a.category} · {a.date} · {readingTime(a)}분 읽기
        </span>
        <span className="ins-card-title">{a.title}</span>
        {!back && <span className="ins-card-excerpt">{a.excerpt}</span>}
      </span>
    </Link>
  );
}

export function Insight() {
  const I = C.INSIGHT;
  const [front, back, ...rest] = latestArticles();
  const rows = rest.slice(0, 3);

  return (
    <section className="ins" aria-labelledby="ins-title">
      <div className="ins-layout">
        <div className="ins-left">
          <TitleBox id="ins-title" cate={I.cate} title={I.title} />
          <p className="ins-lead" data-reveal>
            {I.lead}
          </p>
          <nav className="ins-tabs" aria-label="읽을거리 분류" data-reveal>
            {I.tabs.map((t) => (
              <Link key={t.href} href={t.href} className="ins-tab">
                {t.label}
              </Link>
            ))}
          </nav>

          <ol className="ins-list">
            {rows.map((a, i) => (
              <li
                key={a.slug}
                data-reveal
                style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
              >
                <Link href={`${a.list}/${a.slug}`} className="ins-row">
                  <span className="ins-row-head">
                    <span className="ins-no tnum">{String(i + 1).padStart(2, "0")}</span>
                    <span className="ins-slash" aria-hidden="true" />
                    <span className="ins-row-title">{a.title}</span>
                  </span>
                  <span className="ins-row-meta tnum">
                    {a.category} · {a.date}
                  </span>
                </Link>
              </li>
            ))}
          </ol>

          <div className="ins-more" data-reveal>
            <MoreButton href="/insight" label="읽을거리 전체 보기" text="VIEW ALL" />
          </div>
        </div>

        <div className="ins-right">
          <div className="ins-stack" data-reveal>
            {back && <InsightCard a={back} src={HOME.insight[1]} back />}
            {front && <InsightCard a={front} src={HOME.insight[0]} />}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══ 묻기 전에 ═════════════════════════════════════════
   흰 상자 줄로 — 더가든의 단계 목록 상자와 같은 결. 펼침 애니메이션은 globals.css. */
export function Faq() {
  const F = C.FAQ_HOME;
  return (
    <section className="faqx" aria-labelledby="faq-title">
      <FrameLines />
      <Container className="faqx-inner">
        <div className="faqx-left">
          <TitleBox id="faq-title" cate={F.cate} title={F.title} />
          <div className="faqx-more" data-reveal>
            <MoreButton href="/insight/faq" label={F.more} />
          </div>
        </div>

        <div className="faqx-list">
          {F.items.map((f, i) => (
            <details
              key={f.q}
              className="faqx-item"
              data-reveal
              style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
            >
              <summary className="faqx-q">
                <span className="faqx-no tnum" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="faqx-q-text">{f.q}</span>
                <span className="label faqx-plus" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="faqx-a">{f.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ══ 마지막 행동 — 더가든 '상담문의' 배너 ═════════════════
   로고가 양각된 상자가 오른쪽에 걸린 와이드 사진, 왼쪽에 제목과 알약 버튼 둘. */
export function ClosingCta() {
  const T = C.CTA;
  return (
    <section className="ctab" aria-labelledby="cta-title">
      <div className="ctab-bg" aria-hidden="true">
        <Image src={HOME.cta} alt="" fill sizes="100vw" className="object-cover" />
      </div>

      <Container className="ctab-inner">
        <TitleBox id="cta-title" cate={T.cate} title={T.title} light />
        <p className="ctab-body" data-reveal>
          {T.body}
        </p>

        <div className="ctab-btns" data-reveal>
          <Link href={C.PRIMARY_CTA.href} className="pill pill--cream">
            {C.PRIMARY_CTA.label}
            <span aria-hidden="true">→</span>
          </Link>
          <Link href={T.second.href} className="pill pill--ghost">
            {T.second.label}
          </Link>
        </div>

        {/* 누르면 무슨 일이 일어나는지 — 한 줄로 */}
        <ol className="ctab-steps" aria-label={T.stepsLabel} data-reveal>
          {T.steps.map((s, i) => (
            <li key={s.title}>
              <span className="tnum">{String(i + 1).padStart(2, "0")}</span>
              {s.title}
            </li>
          ))}
        </ol>
        <p className="ctab-note" data-reveal>
          {T.note}
        </p>
      </Container>
    </section>
  );
}
