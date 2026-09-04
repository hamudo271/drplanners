import "server-only";
import { Resend } from "resend";
import type { ContactInput, QuickInput } from "./contact";

/**
 * 문의 전송 어댑터.
 *
 * RESEND_API_KEY가 없으면 콘솔에 출력하고 성공 처리합니다 — 키 없이도
 * 로컬에서 폼 전체 흐름을 확인할 수 있게 하기 위함입니다.
 * 운영 배포 전에 아래 환경변수를 반드시 설정하세요. (.env.example 참고)
 */

const API_KEY = process.env.RESEND_API_KEY;
const TO = process.env.CONTACT_TO_EMAIL;
const FROM = process.env.CONTACT_FROM_EMAIL;

export type SendResult = { ok: true; devMode: boolean } | { ok: false; reason: string };

/** 본 문의·빠른 문의가 공유하는 메일 형태 */
type Mail = {
  subject: string;
  heading: string;
  rows: [string, string][];
  message: string;
  replyTo?: string;
};

function renderText(m: Mail) {
  const width = Math.max(...m.rows.map(([k]) => k.length));
  return [
    m.heading,
    "─".repeat(40),
    ...m.rows.map(([k, v]) => `${k.padEnd(width, " ")}  ${v}`),
    "─".repeat(40),
    "문의 내용",
    "",
    m.message,
  ].join("\n");
}

function esc(s: string) {
  return s.replace(/[&<>"]/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] as string,
  );
}

function renderHtml(m: Mail) {
  return `<div style="font-family:-apple-system,BlinkMacSystemFont,'Apple SD Gothic Neo',sans-serif;color:#16201A;max-width:600px">
  <h2 style="font-weight:500;font-size:18px;margin:0 0 20px">${esc(m.heading)}</h2>
  <table style="border-collapse:collapse;width:100%;font-size:14px">
    ${m.rows
      .map(
        ([k, v]) =>
          `<tr><th align="left" style="padding:8px 12px 8px 0;border-bottom:1px solid #E9E3D6;width:110px;font-weight:400;color:#6B7770">${esc(k)}</th><td style="padding:8px 0;border-bottom:1px solid #E9E3D6">${esc(v)}</td></tr>`,
      )
      .join("")}
  </table>
  <p style="margin:24px 0 8px;font-size:12px;letter-spacing:.1em;color:#6B7770">문의 내용</p>
  <div style="white-space:pre-wrap;font-size:14px;line-height:1.7">${esc(m.message)}</div>
</div>`;
}

async function deliver(m: Mail): Promise<SendResult> {
  // ── 개발 폴백: 키가 없으면 콘솔 출력 ──
  if (!API_KEY || !TO || !FROM) {
    const missing = [
      !API_KEY && "RESEND_API_KEY",
      !TO && "CONTACT_TO_EMAIL",
      !FROM && "CONTACT_FROM_EMAIL",
    ].filter(Boolean);

    if (process.env.NODE_ENV === "production") {
      console.error(`[contact] 환경변수 누락: ${missing.join(", ")}`);
      return { ok: false, reason: "not-configured" };
    }

    console.info(
      `\n[contact] 개발 모드 — 메일 미발송 (미설정: ${missing.join(", ")})\n` +
        renderText(m) +
        "\n",
    );
    return { ok: true, devMode: true };
  }

  try {
    const { error } = await new Resend(API_KEY).emails.send({
      from: FROM,
      to: TO.split(",").map((s) => s.trim()),
      ...(m.replyTo ? { replyTo: m.replyTo } : {}),
      subject: m.subject,
      text: renderText(m),
      html: renderHtml(m),
    });

    if (error) {
      console.error("[contact] Resend 오류:", error);
      return { ok: false, reason: "provider-error" };
    }
    return { ok: true, devMode: false };
  } catch (e) {
    console.error("[contact] 전송 실패:", e);
    return { ok: false, reason: "network-error" };
  }
}

/** /contact 본 문의 폼 */
export function sendContactEmail(data: ContactInput) {
  return deliver({
    subject: `[문의] ${data.clinic} — ${data.name}`,
    heading: "닥터플래너스 홈페이지 문의",
    rows: [
      ["병원명", data.clinic],
      ["진료과목", data.department],
      ["담당자", data.title ? `${data.name} (${data.title})` : data.name],
      ["연락처", data.phone],
      ["이메일", data.email],
      ["관심 솔루션", data.interests.length ? data.interests.join(", ") : "-"],
    ],
    message: data.message,
    replyTo: data.email,
  });
}

/** 플로팅 독 · 모바일 하단 바의 빠른 문의 */
export function sendQuickInquiryEmail(data: QuickInput, page: string) {
  return deliver({
    subject: `[빠른 문의] ${data.name} · ${data.phone}`,
    heading: "닥터플래너스 빠른 문의",
    rows: [
      ["성함", data.name],
      ["연락처", data.phone],
      ["문의한 페이지", page],
    ],
    message: data.message,
  });
}
