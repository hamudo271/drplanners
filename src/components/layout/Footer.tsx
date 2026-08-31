import Image from "next/image";
import Link from "next/link";
import { NAV, NAV_CTA } from "@/config/nav";
import { Container } from "@/components/ui";

/** 시안 푸터: COMPANY / SERVICE / RESOURCES / CONTACT 4단 */
const COLUMNS = [
  { title: "COMPANY", hrefs: ["/about", "/about/philosophy", "/about/company"] },
  { title: "SERVICE", hrefs: ["/signature", "/branding", "/marketing", "/medical-ai"] },
  { title: "RESOURCES", hrefs: ["/insight/column", "/insight/blog", "/insight/faq", "/insight/notice"] },
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
    <footer className="bg-forest-900 text-cream-100">
      <Container className="py-20 md:py-24">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_2fr]">
          <div>
            <Image
              src="/brand/logo-full-light.png"
              alt="DR.PLANERS — Medical Growth Partners"
              width={1815}
              height={340}
              className="h-12 w-auto md:h-14"
            />
            <p className="prose-ko mt-7 text-sm text-cream-100/55">
              병원은 더 성장하고,
              <br />
              원장님은 더 여유롭게.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 sm:gap-x-8 sm:gap-y-12">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="label label-on-dark mb-5">{col.title}</p>
                <ul className="space-y-1 sm:space-y-1.5">
                  {col.hrefs.map((h) => (
                    <li key={h}>
                      <Link
                        href={h}
                        className="-my-2.5 block py-2.5 text-sm text-cream-100/70 transition-colors hover:text-cream-100"
                      >
                        {labelFor(h)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <p className="label label-on-dark mb-5">CONTACT</p>
              <ul className="space-y-3 text-sm text-cream-100/70">
                <li className="tnum">대표번호 자리</li>
                <li>이메일 자리</li>
                <li className="leading-relaxed">주소 자리</li>
                <li className="pt-2">
                  <Link
                    href={NAV_CTA.href}
                    className="inline-block border-b border-cream-100/30 py-2.5 transition-colors hover:border-cream-100"
                  >
                    문의하기
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-cream-100/12 pt-7">
          <span className="label label-on-dark tnum">
            © 2026 DR.PLANERS. All rights reserved.
          </span>
          <Link href="/insight/notice" className="label label-on-dark -my-3 py-3">
            개인정보처리방침
          </Link>
          <Link href="/insight/notice" className="label label-on-dark -my-3 py-3">
            이용약관
          </Link>
          <Link href="/sitemap-view" className="label label-on-dark -my-3 py-3 sm:ml-auto">
            사이트맵
          </Link>
        </div>
      </Container>
    </footer>
  );
}
