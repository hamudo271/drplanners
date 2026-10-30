import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { timingSafeEqual } from "node:crypto";

/**
 * 관리자 인증 — 공용 비밀번호 하나 + 서명된 쿠키 (웹스랩 관리자와 같은 방식)
 *
 * 환경변수 (Railway → Variables 에서 직접 설정):
 *   ADMIN_PASSWORD    관리자 비밀번호
 *   ADMIN_JWT_SECRET  쿠키 서명 키 — `openssl rand -base64 32` 로 만든 임의 문자열
 */
export const ADMIN_COOKIE = "drp_admin";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7일
const AUDIENCE = "drplanners-admin";

function secretKey() {
  const s = process.env.ADMIN_JWT_SECRET;
  if (!s) throw new Error("ADMIN_JWT_SECRET 환경변수가 없습니다.");
  return new TextEncoder().encode(s);
}

export function signAdminToken() {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setAudience(AUDIENCE)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(secretKey());
}

export async function verifyAdminToken(token: string | undefined) {
  if (!token || !process.env.ADMIN_JWT_SECRET) return false;
  try {
    await jwtVerify(token, secretKey(), { audience: AUDIENCE });
    return true;
  } catch {
    return false;
  }
}

/** 길이가 달라도 시간 차로 새지 않게 비교합니다 */
export function passwordMatches(input: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || !input) return false;
  const a = Buffer.from(input);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function adminConfigured() {
  return !!process.env.ADMIN_PASSWORD && !!process.env.ADMIN_JWT_SECRET;
}

/**
 * 서버 액션 · 라우트 핸들러 안에서 다시 확인합니다.
 * proxy 가 /admin 을 막아주지만, 서버 액션은 다른 경로로도 호출될 수 있어 이중으로 둡니다.
 */
export async function requireAdmin() {
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!(await verifyAdminToken(token))) throw new Error("로그인이 필요합니다.");
}
