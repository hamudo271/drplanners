import Link from "next/link";
import Image from "next/image";
import { Container, Button } from "@/components/ui";
import { CTA_BAND, DEFAULT_PAGE_HERO } from "@/config/images";
import { NAV } from "@/config/nav";

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
        <Image src={src} alt="" fill priority sizes="100vw" className="object-cover" />
      </div>
      <Container className="relative pt-36 pb-14 md:pt-44 md:pb-20">
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

/** 하위 페이지 공통 하단 CTA — 풀블리드 사진 밴드 */
export function CtaBand() {
  return (
    <section className="relative flex min-h-[380px] items-center md:min-h-[440px]">
      <div className="veil-soft absolute inset-0">
        <Image
          src={CTA_BAND}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <Container className="relative py-20">
        <div
          className="flex flex-col items-start justify-between gap-10 text-cream-100 lg:flex-row lg:items-end"
          data-reveal
        >
          <div>
            <p className="label label-on-dark">Next step</p>
            <p className="display-ko mt-6 text-2xl leading-snug md:text-3xl lg:text-[2.25rem]">
              우리 병원에 맞는 계획이
              <br />
              궁금하신가요?
            </p>
            <p className="prose-ko mt-5 text-sm text-cream-100/70">
              5분 진단으로 현재 위치부터 확인해보세요.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Link href="/diagnosis">
              <Button className="border-cream-100! bg-cream-100! text-forest-900!">
                병원 진단 시작하기
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="light">문의하기</Button>
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
