import Link from "next/link";
import { Container, Media, Button, Section } from "@/components/ui";
import { NAV } from "@/config/nav";

/** 하위 페이지 공통 상단 — 브레드크럼 + 타이틀 */
export function PageHero({
  crumbs,
  title,
  lead,
  mediaLabel,
  mediaSrc,
}: {
  crumbs: { label: string; href?: string }[];
  title: string;
  lead?: string;
  mediaLabel?: string;
  mediaSrc?: string;
}) {
  return (
    <section className="border-b border-ink-900/10 bg-cream-50 pt-20 md:pt-24">
      <Container className="py-14 md:py-20">
        <nav className="label flex flex-wrap items-center gap-2">
          <Link href="/">HOME</Link>
          {crumbs.map((c) => (
            <span key={c.label} className="flex items-center gap-2">
              <span>/</span>
              {c.href ? <Link href={c.href}>{c.label}</Link> : <span>{c.label}</span>}
            </span>
          ))}
        </nav>
        <h1 className="mt-6 text-3xl leading-tight font-light md:text-[46px]">{title}</h1>
        {lead && <p className="mt-5 max-w-xl text-sm leading-relaxed text-ink-500">{lead}</p>}
        {mediaLabel && (
          <Media
            label={mediaLabel}
            ratio="aspect-[21/9]"
            className="mt-10"
            src={mediaSrc}
            sizes="(max-width: 1240px) 100vw, 1160px"
          />
        )}
      </Container>
    </section>
  );
}

/** 하위 페이지 공통 하단 CTA */
export function CtaBand() {
  return (
    <Section tone="forest">
      <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div>
          <p className="text-2xl leading-snug font-light md:text-3xl">
            우리 병원에 맞는 계획이 궁금하신가요?
          </p>
          <p className="mt-3 text-sm text-white/60">
            5분 진단으로 현재 위치부터 확인해보세요.
          </p>
        </div>
        <div className="flex shrink-0 gap-3">
          <Link href="/diagnosis">
            <Button className="!border-white !bg-white !text-ink-900">병원 진단 시작하기</Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" className="!border-white/40 !text-white">
              문의하기
            </Button>
          </Link>
        </div>
      </div>
    </Section>
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
