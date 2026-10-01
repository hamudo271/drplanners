import Link from "next/link";
import Image from "next/image";
import { CTA_BAND, DEFAULT_PAGE_HERO } from "@/config/images";
import { NAV } from "@/config/nav";
import { PRIMARY_CTA } from "@/content/home";

/**
 * 하위 페이지 공통 상단 — 더가든 서브 비주얼.
 *
 * 사진 띠 가운데에 큰 세리프 영문(장식) → 굵은 한글 제목(h1) → 가는 세로선 → 짧은 설명.
 * 영문이 없으면 한글 제목이 그 자리를 크게 맡습니다. 경로 표시는 아래 왼쪽에 작게 둡니다.
 */
export function PageHero({
  crumbs,
  title,
  en,
  lead,
  mediaSrc,
}: {
  crumbs: { label: string; href?: string }[];
  title: string;
  /** 큰 세리프 영문 제목 — nav.ts 의 enFor(href) 로 넘깁니다 */
  en?: string;
  lead?: string;
  /** 배경 이미지 라벨 — 배경으로 흡수되어 더 이상 표시되지 않습니다 */
  mediaLabel?: string;
  mediaSrc?: string;
}) {
  const src = mediaSrc ?? DEFAULT_PAGE_HERO;
  return (
    <section className={`subv ${en ? "has-en" : ""}`}>
      <div className="subv-bg" aria-hidden="true">
        <Image src={src} alt="" fill preload sizes="100vw" className="object-cover" />
      </div>

      <div className="subv-inner">
        {en && (
          <p className="subv-en" aria-hidden="true">
            {en}
          </p>
        )}
        <h1 className="subv-title">{title}</h1>
        <span className="subv-line" aria-hidden="true" />
        {lead && <p className="subv-lead">{lead}</p>}
      </div>

      <nav className="subv-crumbs" aria-label="breadcrumb">
        <Link href="/">HOME</Link>
        {crumbs.map((c) => (
          <span key={c.label}>
            <span aria-hidden="true">/</span>
            {c.href ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
          </span>
        ))}
      </nav>
    </section>
  );
}

/**
 * 하위 페이지 하단 CTA — 풀블리드 사진 밴드.
 *
 * 목적지와 버튼 문구는 전 사이트 하나(PRIMARY_CTA)로 고정하되, **문맥은 페이지 성격을
 * 따라갑니다.** 28개 페이지가 똑같은 문장으로 끝나면 설득이 아니라 템플릿으로 읽힙니다.
 *
 *   service — 서비스를 읽고 난 사람. "이게 우리 병원에 맞나?"가 다음 질문입니다.
 *   insight — 글을 읽고 난 사람. 아직 파는 단계가 아니라 판단을 돕는 톤으로.
 *   default — 회사/철학처럼 이미 설득 문맥에 있는 페이지.
 *
 * 공지사항처럼 영업 문맥이 아닌 페이지에서는 아예 부르지 않습니다.
 */
type CtaKind = "default" | "service" | "insight";

const CTA_COPY: Record<CtaKind, { title: string[]; body: string }> = {
  default: {
    title: ["광고비가 어디서 새는지,", "먼저 확인해보십시오."],
    body: "5개 항목만 확인하면 됩니다. 3분이면 충분하고, 비용은 없습니다.",
  },
  service: {
    title: ["이게 우리 병원에 맞는지부터", "확인해보십시오."],
    body: "무엇부터 손대야 하는지는 병원마다 다릅니다. 진단 결과를 보고 순서를 정해드립니다.",
  },
  insight: {
    title: ["글로만 판단하기", "어려우시다면."],
    body: "우리 병원 상황에 대입해서 직접 봐드립니다. 진단과 상담에는 비용이 없습니다.",
  },
};

export function CtaBand({ kind = "default" }: { kind?: CtaKind }) {
  const copy = CTA_COPY[kind];

  /* 더가든 서브페이지 마지막 배너 — 사진 위 가운데 정렬, 알약 버튼 하나 */
  return (
    <section className="subcta" aria-label={PRIMARY_CTA.short}>
      <div className="subcta-bg" aria-hidden="true">
        <Image src={CTA_BAND} alt="" fill sizes="100vw" className="object-cover" />
      </div>
      <div className="subcta-inner" data-reveal>
        <p className="subcta-cate">( Free Diagnosis )</p>
        <p className="subcta-title">
          {copy.title.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </p>
        <p className="subcta-body">{copy.body}</p>
        {/* CTA는 하나만 둡니다 — 두 개를 나란히 두면 행동이 갈립니다 */}
        <Link href={PRIMARY_CTA.href} className="pill pill--cream">
          {PRIMARY_CTA.label}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}

/** nav.ts에서 해당 대메뉴 정보를 찾아옵니다 */
export function findHub(href: string) {
  const hub = NAV.find((n) => n.href === href);
  if (!hub) throw new Error(`nav.ts에 없는 경로: ${href}`);
  return hub;
}

export function findDetail(hubHref: string, detailHref: string) {
  const hub = findHub(hubHref);
  const detail = hub.children?.find((c) => c.href === detailHref);
  if (!detail) throw new Error(`nav.ts에 없는 경로: ${detailHref}`);
  return { hub, detail };
}
