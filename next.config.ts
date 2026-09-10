import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Railway 기본 도메인으로 들어온 요청은 커스텀 도메인으로 보냅니다 (중복 콘텐츠 방지)
      {
        source: "/:path*",
        has: [{ type: "host", value: "drplanners-production-e227.up.railway.app" }],
        destination: "https://dr-planners.com/:path*",
        permanent: true,
      },

      /* 짐작하기 쉬운 짧은 주소들 — 메뉴에서 링크하지는 않지만,
         직접 입력하거나 외부에서 잘못 걸어놨을 때 404 대신 제자리로 보냅니다. */
      { source: "/company", destination: "/about/company", permanent: true },
      { source: "/ai", destination: "/medical-ai", permanent: true },
      { source: "/faq", destination: "/insight/faq", permanent: true },
      { source: "/blog", destination: "/insight/blog", permanent: true },
      { source: "/column", destination: "/insight/column", permanent: true },
      { source: "/notice", destination: "/insight/notice", permanent: true },
      { source: "/about/philosophy/", destination: "/about/philosophy", permanent: true },
    ];
  },
};

export default nextConfig;
