import Link from "next/link";
import { Container, Button } from "@/components/ui";
import { NAV, NAV_CTA } from "@/config/nav";

/**
 * 404.
 *
 * 없는 주소로 들어온 사람에게 Next.js 기본 화면을 보여주면 회사가 없는 것처럼
 * 읽힙니다. 브랜드 안에서 받아주고, 어디로 갈 수 있는지를 바로 보여줍니다.
 * 링크는 nav.ts에서 파생되므로 메뉴가 바뀌면 여기도 따라옵니다.
 */
export const metadata = { title: "페이지를 찾을 수 없습니다" };

export default function NotFound() {
  return (
    <section className="notfound">
      <Container>
        <div className="notfound-grid">
          <div>
            <p className="display-serif notfound-code tnum">404</p>
            <h1 className="notfound-title">
              <span>찾으시는 페이지가</span>
              <span>여기에는 없습니다.</span>
            </h1>
            <p className="prose-ko notfound-lead">
              주소가 바뀌었거나, 잘못 입력되었을 수 있습니다.
              아래에서 찾으시던 것으로 바로 가실 수 있습니다.
            </p>
            <div className="notfound-actions">
              <Link href={NAV_CTA.href}>
                <Button>{NAV_CTA.label}</Button>
              </Link>
              <Link href="/" className="notfound-home">
                홈으로 돌아가기 <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <nav className="notfound-map" aria-label="전체 메뉴">
            <p className="label label-ko">전체 메뉴</p>
            <ul>
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="notfound-hub">
                    {item.fullLabel}
                  </Link>
                  {item.children && (
                    <span className="notfound-children">
                      {item.children.map((c) => (
                        <Link key={c.href} href={c.href}>
                          {c.label}
                        </Link>
                      ))}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </section>
  );
}
