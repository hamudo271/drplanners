"use server";

import { z } from "zod";
import { parseContactForm, type ContactState } from "@/lib/contact";
import { sendContactEmail } from "@/lib/mailer";

/** 같은 IP에서 짧은 시간에 반복 제출하는 것을 막습니다 (인메모리, 인스턴스 단위) */
const recent = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function rateLimited(key: string) {
  const now = Date.now();
  const hits = (recent.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recent.set(key, hits);
  if (recent.size > 5000) recent.clear(); // 메모리 상한
  return hits.length > MAX_PER_WINDOW;
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // ── 봇 트랩: 사람에게 보이지 않는 필드가 채워졌으면 조용히 성공 처리 ──
  if (String(formData.get("website") ?? "").length > 0) {
    return { status: "success", message: "문의가 접수되었습니다." };
  }

  // ── 너무 빠른 제출 차단 (폼 렌더 후 2초 미만) ──
  const elapsed = Number(formData.get("elapsed") ?? 0);
  if (Number.isFinite(elapsed) && elapsed > 0 && elapsed < 2000) {
    return { status: "error", message: "잠시 후 다시 시도해주세요." };
  }

  // 검증 실패 시 되돌려줄 입력값
  const values = {
    text: Object.fromEntries(
      ["clinic", "department", "name", "title", "phone", "email", "message"].map((k) => [
        k,
        String(formData.get(k) ?? ""),
      ]),
    ),
    interests: formData.getAll("interests").map(String),
  };

  const parsed = parseContactForm(formData);
  if (!parsed.success) {
    return {
      status: "error",
      message: "입력 내용을 확인해주세요.",
      errors: z.flattenError(parsed.error).fieldErrors as Record<string, string[]>,
      values,
    };
  }

  const { headers } = await import("next/headers");
  const h = await headers();
  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";

  if (rateLimited(ip)) {
    return {
      status: "error",
      message: "문의가 너무 자주 접수되었습니다. 잠시 후 다시 시도해주세요.",
      values,
    };
  }

  const result = await sendContactEmail(parsed.data);

  if (!result.ok) {
    return {
      status: "error",
      message:
        result.reason === "not-configured"
          ? "현재 문의 접수가 불가합니다. 대표번호로 연락해주세요."
          : "전송에 실패했습니다. 잠시 후 다시 시도해주세요.",
      values,
    };
  }

  return {
    status: "success",
    message: result.devMode
      ? "접수되었습니다. (개발 모드 — 메일은 발송되지 않았습니다)"
      : "문의가 접수되었습니다.",
  };
}
