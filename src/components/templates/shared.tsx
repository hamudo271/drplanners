import Link from "next/link";
import Image from "next/image";
import { Container, Button } from "@/components/ui";
import { CTA_BAND, DEFAULT_PAGE_HERO } from "@/config/images";
import { NAV } from "@/config/nav";
import { PRIMARY_CTA } from "@/content/home";

/** 하위 페이지 공통 상단 — 메인과 같은 풀블리드 다크 히어로 */
export function PageHero({
  crumbs,
  title,
  lead,
  mediaSrc,
}: {
  crumbs: { label: string; href?: string }[];
  title: string;
  lead?: string;
  /** 배경 이미지 라벨 — 배경으로 흡수되어 더 이상 표시되지 않습니다 */
  mediaLabel?: string;
  mediaSrc?: string;
}) {
  const src = mediaSrc ?? DEFAULT_PAGE_HERO;
  const isEn = /^[A-Za-z0-9 .·&|-]+$/.test(title);
  return (
    <section className="relative flex min-h-[340px] items-end sm:min-h-[400px] md:min-h-[480px]">
      <div className="veil-left absolute inset-0">
        <Image src={src} alt="" fill preload sizes="100vw" className="object-cover" />
      </div>
      <Container className="relative pt-40 pb-14 md:pt-48 md:pb-20">
        <nav
          className="label label-on-dark flex flex-wrap items-center gap-2.5"
          aria-label="breadcrumb"
          data-reveal
        >
          <Link href="/" className="-my-3 py-3 transition-colors hover:text-cream-100">
            HOME
          </Link>
          {crumbs.map((c) => (
            <span key={c.label} className="flex items-center gap-2.5">
              <span aria-hidden>/</span>
              {c.href ? (
                <Link href={c.href} className="-my-3 py-3 transition-colors hover:text-cream-100">
                  {c.label}
                </Link>
              ) : (
                <span className="text-cream-100/85">{c.label}</span>
              )}
            </span>
          ))}
        </nav>
        <h1
          className={`mt-7 text-cream-100 ${
            isEn
              ? "display-en text-[2.25rem] md:text-[3rem] lg:text-[3.5rem]"
              : "display-ko text-[1.875rem] md:text-[2.5rem] lg:text-[3rem]"
          }`}
          data-reveal
        >
          {title}
        </h1>
        {lead && (
          <p
            className="prose-ko mt-6 max-w-2xl text-sm text-cream-100/75 md:text-base"
            data-reveal
          >
            {lead}
          </p>
        )}
      </Container>
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

  return (
    <section className="relative flex min-h-[380px] items-center md:min-h-[440px]">
      <div className="veil-soft absolute inset-0">
        <Image src={CTA_BAND} alt="" fill sizes="100vw" className="object-cover" />
      </div>
      <Container className="relative py-20">
        <div
          className="flex flex-col items-start justify-between gap-10 text-cream-100 lg:flex-row lg:items-end"
          data-reveal
        >
          <div>
            <p className="label label-ko label-on-dark">{PRIMARY_CTA.short}</p>
            <p className="display-ko mt-6 text-2xl leading-snug md:text-3xl lg:text-[2.25rem]">
              {copy.title.map((l, i) => (
                <span key={l}>
                  {l}
                  {i === 0 && <br />}
                </span>
              ))}
            </p>
            <p className="prose-ko mt-5 text-sm text-cream-100/70">{copy.body}</p>
          </div>
          {/* CTA는 하나만 둡니다 — 두 개를 나란히 두면 행동이 갈립니다 */}
          <div className="shrink-0">
            <Link href={PRIMARY_CTA.href}>
              <Button variant="cream">{PRIMARY_CTA.label}</Button>
            </Link>
          </div>
        </div>
      </Container>
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
