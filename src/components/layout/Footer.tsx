import Image from "next/image";
import Link from "next/link";
import { NAV, NAV_CTA } from "@/config/nav";
import { Container } from "@/components/ui";
import { COMPANY, ADDRESS_LINE, TEL_HREF } from "@/config/company";

/**
 * 푸터 — 히어로와 같은 짙은 숲색 판.
 * 위: 로고와 한 줄 문장 / 연락처를 크게. 가운데: 메뉴 3단 + 사무실.
 * 아래: 저작권 줄, 그리고 판 바닥에 걸린 큰 워드마크.
 */
const COLUMNS = [
  { title: "Company", hrefs: ["/about", "/about/philosophy", "/about/company"] },
  { title: "Services", hrefs: ["/signature", "/branding", "/marketing", "/medical-ai"] },
  { title: "Insight", hrefs: ["/insight/column", "/insight/blog", "/insight/faq", "/insight/notice"] },
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

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="ft">
      <Container className="ft-inner">
        <div className="ft-top">
          <div className="ft-brand">
            <Image
              src="/brand/logo-full-light.png"
              alt="DR.PLANERS — Medical Growth Partners"
              width={1815}
              height={340}
              className="ft-logo"
            />
            <p className="ft-tagline">
              병원은 더 성장하고,
              <br />
              원장님은 더 여유롭게.
            </p>
          </div>

          <div className="ft-contact">
            <p className="ft-label">( Contact )</p>
            <a href={TEL_HREF} className="ft-tel tnum">
              {COMPANY.tel}
            </a>
            <a href={`mailto:${COMPANY.email}`} className="ft-mail">
              {COMPANY.email}
            </a>
            <div className="ft-actions">
              <Link href={NAV_CTA.href} className="ft-action">
                <span>{NAV_CTA.label}</span>
                <span className="ft-action-arrow">
                  <Arrow />
                </span>
              </Link>
              {/* 진단 말고 그냥 물어보고 싶은 분들의 길 */}
              <Link href="/contact" className="ft-action ft-action--quiet">
                <span>문의 남기기</span>
                <span className="ft-action-arrow">
                  <Arrow />
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div className="ft-nav">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="ft-label">( {col.title} )</p>
              <ul className="ft-links">
                {col.hrefs.map((h) => (
                  <li key={h}>
                    <Link href={h} className="ft-link">
                      {labelFor(h)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* 법적 표기 — 상호·대표·사업자등록번호는 사업자 사이트의 필수 표기입니다 */}
          <div>
            <p className="ft-label">( Office )</p>
            <dl className="ft-office">
              <div>
                <dt>상호</dt>
                <dd>
                  {COMPANY.legalName}({COMPANY.legalNameKo})
                </dd>
              </div>
              <div>
                <dt>대표</dt>
                <dd>{COMPANY.ceo}</dd>
              </div>
              <div>
                <dt>사업자등록번호</dt>
                <dd className="tnum">{COMPANY.bizNo}</dd>
              </div>
              <div>
                <dt>주소</dt>
                <dd>{ADDRESS_LINE}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="ft-bottom">
          <span className="ft-copy tnum">© 2026 DR.PLANERS. All rights reserved.</span>
          <Link href="/privacy" className="ft-privacy">
            개인정보처리방침
          </Link>
        </div>
      </Container>

      <p className="ft-wordmark" aria-hidden="true">
        DR.PLANERS
      </p>
    </footer>
  );
}
