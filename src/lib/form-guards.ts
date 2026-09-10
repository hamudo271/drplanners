import "server-only";
import type { ContactState } from "./contact";

/**
 * 문의 폼 공용 방어 로직.
 *
 * /contact 와 /diagnosis 두 폼이 같은 규칙을 씁니다. 봇 대응은 한 곳에서만
 * 관리해야 한쪽만 뚫리는 일이 생기지 않아 여기로 모았습니다.
 * 레이트리밋 카운터도 공유합니다 — 같은 IP가 폼을 바꿔가며 도배하지 못하게.
 */

const recent = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

/** 같은 IP에서 짧은 시간에 반복 제출하는 것을 막습니다 (인메모리, 인스턴스 단위) */
export function rateLimited(key: string) {
  const now = Date.now();
  const hits = (recent.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recent.set(key, hits);
  if (recent.size > 5000) recent.clear(); // 메모리 상한
  return hits.length > MAX_PER_WINDOW;
}

/** 봇 방어. 통과하면 null, 막히면 되돌릴 상태를 반환합니다. */
export function guard(formData: FormData, successMessage: string): ContactState | null {
  // ── 봇 트랩: 사람에게 보이지 않는 필드가 채워졌으면 조용히 성공 처리 ──
  if (String(formData.get("website") ?? "").length > 0) {
    return { status: "success", message: successMessage };
  }

  // ── 너무 빠른 제출 차단 (폼 렌더 후 2초 미만) ──
  const elapsed = Number(formData.get("elapsed") ?? 0);
  if (Number.isFinite(elapsed) && elapsed > 0 && elapsed < 2000) {
    return { status: "error", message: "잠시 후 다시 시도해주세요." };
  }
  return null;
}

export async function clientIp() {
  const { headers } = await import("next/headers");
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
}

export const RATE_LIMITED =
  "접수가 너무 자주 시도되었습니다. 잠시 후 다시 시도해주세요.";

export function failureMessage(reason: string) {
  return reason === "not-configured"
    ? "현재 접수가 불가합니다. 잠시 후 다시 시도해주세요."
    : "전송에 실패했습니다. 잠시 후 다시 시도해주세요.";
}
