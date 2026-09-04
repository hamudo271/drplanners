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
    ];
  },
};

export default nextConfig;
