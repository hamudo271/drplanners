import "server-only";
import { PrismaClient } from "@prisma/client";

/**
 * Prisma 클라이언트 — 개발 중 HMR로 연결이 쌓이지 않도록 전역에 하나만 둡니다.
 *
 * DATABASE_URL 이 없으면(로컬에서 DB 없이 돌릴 때, 빌드 중) 공개 페이지는
 * content/articles.ts 의 정적 글로 그대로 동작합니다 — hasDb() 로 먼저 확인하세요.
 */
const g = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = g.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") g.prisma = prisma;

/** DB를 써도 되는 상황인지 — 빌드 단계에서는 Railway 내부망에 닿지 않으므로 건너뜁니다 */
export function hasDb() {
  return !!process.env.DATABASE_URL && process.env.NEXT_PHASE !== "phase-production-build";
}
