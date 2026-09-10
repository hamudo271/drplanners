import Image from "next/image";
import Link from "next/link";
import { NAV, NAV_CTA } from "@/config/nav";
import { Container } from "@/components/ui";
import { COMPANY, ADDRESS_LINE, TEL_HREF, LEGAL_LINE } from "@/config/company";

/** 시안 푸터: COMPANY / SERVICE / RESOURCES / CONTACT 4단 */
const COLUMNS = [
  { title: "회사", hrefs: ["/about", "/about/philosophy", "/about/company"] },
  { title: "서비스", hrefs: ["/signature", "/branding", "/marketing", "/medical-ai"] },
  { title: "읽을거리", hrefs: ["/insight/column", "/insight/blog", "/insight/faq", "/insight/notice"] },
];

/** nav.ts에서 라벨을 찾아옵니다 — 메뉴 변경 시 푸터도 같이 따라갑니다 */
function labelFor(href: string) {
  for (const item of NAV) {
    if (item.href === href) return item.fullLabel;
    const child = item.children?.find((c) => c.href === href);
    if (child) return child.label;
  }
  return href;
}

export function Footer() {
  return (
    <footer className="site-footer bg-cream-100 text-ink-900">
      <Container className="py-20 md:py-24">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_2fr]">
          <div>
            <Image
              src="/brand/logo-full.png"
              alt="DR.PLANERS — Medical Growth Partners"
              width={1815}
              height={340}
              className="h-12 w-auto md:h-14"
            />
            <p className="prose-ko mt-7 text-sm text-ink-500">
              병원은 더 성장하고,
              <br />
              원장님은 더 여유롭게.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 sm:gap-x-8 sm:gap-y-12">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="label label-ko mb-5">{col.title}</p>
                <ul className="space-y-1 sm:space-y-1.5">
                  {col.hrefs.map((h) => (
                    <li key={h}>
                      <Link
                        href={h}
                        className="-my-2.5 block py-2.5 text-sm text-ink-700 transition-colors hover:text-forest-800"
                      >
                        {labelFor(h)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <p className="label label-ko mb-5">문의</p>
              <ul className="space-y-3 text-sm text-ink-700">
                <li className="leading-relaxed">
                  광고비가 어디서 새는지
                  <br />
                  먼저 확인해보십시오.
                </li>
                <li className="pt-2">
                  <Link
                    href={NAV_CTA.href}
                    className="inline-block border-b border-ink-900/20 py-2.5 transition-colors hover:border-ink-900"
                  >
                    {NAV_CTA.label}
                  </Link>
                </li>
                {/* 진단 말고 그냥 물어보고 싶은 분들의 길 */}
                <li>
                  <Link
                    href="/contact"
                    className="-my-2.5 block py-2.5 text-ink-500 transition-colors hover:text-forest-800"
                  >
                    바로 문의하기
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 법적 표기 — 상호·대표·사업자등록번호는 사업자 사이트의 필수 표기입니다 */}
        <div className="mt-16 border-t border-ink-900/12 pt-7">
          <p className="text-xs leading-relaxed text-ink-500">{LEGAL_LINE}</p>
          <p className="mt-2 text-xs leading-relaxed text-ink-500">
            {ADDRESS_LINE} · <a href={TEL_HREF} className="hover:text-forest-800">{COMPANY.tel}</a> ·{" "}
            <a href={`mailto:${COMPANY.email}`} className="hover:text-forest-800">
              {COMPANY.email}
            </a>
          </p>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-3">
          <span className="label tnum">
            © 2026 DR.PLANERS. All rights reserved.
          </span>
          <Link href="/privacy" className="label label-ko -my-3 py-3">
            개인정보처리방침
          </Link>
          <Link href="/sitemap-view" className="label -my-3 py-3 sm:ml-auto">
            사이트맵
          </Link>
        </div>
      </Container>
    </footer>
  );
}
