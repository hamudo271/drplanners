"use server";

import { z } from "zod";
import { parseContactForm, type ContactState } from "@/lib/contact";
import { sendContactEmail } from "@/lib/mailer";
import { saveInquiry, markMailed } from "@/lib/cms/inquiries";
import {
  guard,
  rateLimited,
  clientIp,
  RATE_LIMITED,
  failureMessage,
} from "@/lib/form-guards";

const SUCCESS = "문의가 접수되었습니다.";

function successMessage(devMode: boolean) {
  return devMode ? `${SUCCESS} (개발 모드 — 메일은 발송되지 않았습니다)` : SUCCESS;
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const blocked = guard(formData, SUCCESS);
  if (blocked) return blocked;

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

  if (rateLimited(await clientIp())) {
    return { status: "error", message: RATE_LIMITED, values };
  }

  const d = parsed.data;
  const saved = await saveInquiry({
    kind: "CONTACT",
    clinic: d.clinic,
    department: d.department,
    name: d.name,
    position: d.title,
    phone: d.phone,
    email: d.email,
    visitId: String(formData.get("v") ?? ""),
    interests: d.interests,
    message: d.message,
  });

  const result = await sendContactEmail(d);
  await markMailed(saved, result.ok && !result.devMode);
  // 메일이 실패해도 DB에 남았으면 접수된 것입니다 — 관리자 화면에서 확인
  if (saved !== null) return { status: "success", message: SUCCESS };
  if (!result.ok) {
    return { status: "error", message: failureMessage(result.reason), values };
  }
  return { status: "success", message: successMessage(result.devMode) };
}
