import "server-only";
import type { InquiryKind } from "@prisma/client";
import { prisma, hasDb } from "./db";

/**
 * 문의 · 진단 접수 보관.
 *
 * 메일 발송과 별개로 항상 DB에 남깁니다 — 메일 설정이 비었거나 발송이 실패해도
 * 관리자 화면에서 접수 건을 확인할 수 있게 하기 위함입니다.
 * 저장된 id 를 돌려주고, 메일 결과는 markMailed 로 나중에 기록합니다.
 */
export async function saveInquiry(data: {
  kind: InquiryKind;
  clinic: string;
  department: string;
  name: string;
  position?: string;
  phone: string;
  email: string;
  interests?: string[];
  message?: string;
  answers?: { q: string; a: string }[];
  /** 브라우저의 방문 번호 (Tracker) — 어느 채널로 들어왔는지 잇는 열쇠 */
  visitId?: string | null;
}): Promise<number | null> {
  if (!hasDb()) return null;
  try {
    const row = await prisma.inquiry.create({
      data: {
        kind: data.kind,
        clinic: data.clinic,
        department: data.department,
        name: data.name,
        position: data.position || null,
        phone: data.phone,
        email: data.email,
        interests: data.interests ?? [],
        message: data.message || null,
        ...(data.answers ? { answers: data.answers } : {}),
        visitId: data.visitId && /^[a-z0-9]{8,40}$/i.test(data.visitId) ? data.visitId : null,
      },
      select: { id: true },
    });
    return row.id;
  } catch (e) {
    console.error("[cms] 문의 저장 실패:", e);
    return null;
  }
}

export async function markMailed(id: number | null, mailed: boolean) {
  if (id === null || !mailed) return;
  await prisma.inquiry.update({ where: { id }, data: { mailed: true } }).catch(() => {});
}
