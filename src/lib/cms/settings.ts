import "server-only";
import { prisma, hasDb } from "./db";

/** 관리자 설정 — Setting 테이블. 자주 읽는 값은 1분 캐시 */
const cache = new Map<string, { v: string; at: number }>();

export async function getSetting(key: string, fallback = "") {
  if (!hasDb()) return fallback;
  const c = cache.get(key);
  if (c && Date.now() - c.at < 60_000) return c.v;
  try {
    const row = await prisma.setting.findUnique({ where: { key } });
    const v = row?.value ?? fallback;
    cache.set(key, { v, at: Date.now() });
    return v;
  } catch {
    return fallback;
  }
}

export async function setSetting(key: string, value: string) {
  await prisma.setting.upsert({ where: { key }, create: { key, value }, update: { value } });
  cache.delete(key);
}

/** 통계에서 뺄 IP — 공백 · 쉼표 · 줄바꿈으로 구분 */
export async function getExcludedIps() {
  return (await getSetting("exclude_ips")).split(/[\s,]+/).filter(Boolean);
}
