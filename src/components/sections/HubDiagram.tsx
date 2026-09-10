import Link from "next/link";
import { Section } from "@/components/ui";
import {
  HUB_DIAGRAM,
  TOUCHPOINTS,
  BUDGET_FUNNEL,
  SEARCH_STACK,
} from "@/content/diagrams";

/**
 * 허브별 고유 도식.
 *
 * 세 허브가 같은 카드 목록만 반복하면 페이지 목적이 배치로 드러나지 않아서,
 * 허브마다 형태가 다른 도식을 하나씩 둡니다. 이미지가 아니라 마크업 + CSS로
 * 그리기 때문에 화면 크기와 글자 크기를 따라가고, 읽기 도구에서도 내용이 남습니다.
 *
 * 해당 도식이 없는 허브(/signature)에서는 아무것도 렌더하지 않습니다.
 */
/** 이 허브에 도식이 있는지 — 섹션 번호를 헛되이 소비하지 않으려고 밖에서 먼저 묻습니다 */
export const hasHubDiagram = (href: string) => Boolean(HUB_DIAGRAM[href]);

export function HubDiagram({ href, no }: { href: string; no: string }) {
  const kind = HUB_DIAGRAM[href];
  if (!kind) return null;

  if (kind === "touchpoints") return <Touchpoints no={no} />;
  if (kind === "funnel") return <Funnel no={no} />;
  return <Stack no={no} />;
}

/* ── 브랜딩: 가로 사슬 ─────────────────────────────────── */
function Touchpoints({ no }: { no: string }) {
  const d = TOUCHPOINTS;
  return (
    <Section no={no} label={d.label} className="hub-diagram">
      <DiagramHead title={d.title} lead={d.lead} />

      <ol className="touchpoint-chain">
        {d.steps.map((s, i) => (
          <li
            key={s.no}
            className="touchpoint"
            data-reveal
            style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
          >
            <span className="touchpoint-no tnum">{s.no}</span>
            <p className="touchpoint-name">{s.name}</p>
            <p className="prose-ko touchpoint-body">{s.body}</p>
            <span className="touchpoint-ours">
              {s.ours.map((o) => (
                <Link key={o.href + o.label} href={o.href}>
                  {o.label}
                </Link>
              ))}
            </span>
          </li>
        ))}
      </ol>

      <p className="diagram-closing" data-reveal>
        {d.closing}
      </p>
    </Section>
  );
}

/* ── 마케팅: 깔때기 ────────────────────────────────────── */
function Funnel({ no }: { no: string }) {
  const d = BUDGET_FUNNEL;

  return (
    <Section no={no} label={d.label} tone="paper" className="hub-diagram">
      <DiagramHead title={d.title} lead={d.lead} />

      <ol className="funnel">
        {d.steps.map((s, i) => (
          <li
            key={s.name}
            className="funnel-row"
            data-reveal
            style={
              {
                // 아래로 갈수록 좁아집니다 — 남는 양이 줄어드는 걸 폭으로.
                // 오른쪽 주석이 한 줄로 들어가도록 최대 폭을 88%로 제한합니다.
                "--w": `${88 - i * 11}%`,
                "--reveal-delay": `${i * 90}ms`,
              } as React.CSSProperties
            }
          >
            <span className="funnel-bar">
              <span className="funnel-name">{s.name}</span>
            </span>
            {s.leak && <span className="funnel-leak">{s.leak}</span>}
          </li>
        ))}
      </ol>

      <p className="diagram-closing" data-reveal>
        {d.closing}
      </p>
    </Section>
  );
}

/* ── 메디컬 AI: 계단 ───────────────────────────────────── */
function Stack({ no }: { no: string }) {
  const d = SEARCH_STACK;
  return (
    <Section no={no} label={d.label} tone="forest" className="hub-diagram">
      <DiagramHead title={d.title} lead={d.lead} dark />

      <ol className="search-stack">
        {d.layers.map((l, i) => (
          <li
            key={l.no}
            className="stack-layer"
            data-reveal
            style={
              {
                // 위층일수록 안쪽으로 — 배열은 04부터라 뒤집어 계산합니다
                "--indent": `${(d.layers.length - 1 - i) * 34}px`,
                "--reveal-delay": `${i * 90}ms`,
              } as React.CSSProperties
            }
          >
            <Link href={l.href} className="stack-inner group">
              <span className="stack-no tnum">{l.no}</span>
              <span className="stack-text">
                <span className="stack-name">{l.name}</span>
                <span className="prose-ko stack-body">{l.body}</span>
              </span>
              <span className="stack-arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <p className="diagram-closing diagram-closing-dark" data-reveal>
        {d.closing}
      </p>
    </Section>
  );
}

/* ── 공통 머리말 ───────────────────────────────────────── */
function DiagramHead({
  title,
  lead,
  dark = false,
}: {
  title: string;
  lead: string;
  dark?: boolean;
}) {
  return (
    <div className="editorial-section-heading" data-reveal>
      <div>
        <h2 className={`editorial-title ${dark ? "text-cream-100" : ""}`}>{title}</h2>
      </div>
      <p className={`editorial-intro ${dark ? "text-cream-100/70!" : ""}`}>{lead}</p>
    </div>
  );
}
