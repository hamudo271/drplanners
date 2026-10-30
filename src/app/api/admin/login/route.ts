import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  SESSION_MAX_AGE,
  adminConfigured,
  passwordMatches,
  signAdminToken,
} from "@/lib/cms/auth";
import { rateLimited, clientIp } from "@/lib/form-guards";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!adminConfigured()) {
    return NextResponse.json(
      { error: "관리자 비밀번호가 아직 설정되지 않았습니다. (ADMIN_PASSWORD · ADMIN_JWT_SECRET)" },
      { status: 500 },
    );
  }
  // 비밀번호 대입을 막습니다 — 문의 폼과 같은 IP당 제한
  if (rateLimited(`admin-login:${await clientIp()}`)) {
    return NextResponse.json({ error: "잠시 후 다시 시도해주세요." }, { status: 429 });
  }

  const body = await req.json().catch(() => ({}));
  const password = typeof body?.password === "string" ? body.password : "";
  if (!passwordMatches(password)) {
    return NextResponse.json({ error: "비밀번호가 올바르지 않습니다." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, await signAdminToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return res;
}
