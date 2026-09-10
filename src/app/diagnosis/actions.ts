"use server";

import { z } from "zod";
import { parseDiagnosisForm, type ContactState } from "@/lib/contact";
import { sendDiagnosisEmail } from "@/lib/mailer";
import {
  guard,
  rateLimited,
  clientIp,
  RATE_LIMITED,
  failureMessage,
} from "@/lib/form-guards";

const SUCCESS = "진단 신청이 접수되었습니다.";

function successMessage(devMode: boolean) {
  return devMode ? `${SUCCESS} (개발 모드 — 메일은 발송되지 않았습니다)` : SUCCESS;
}

/**
 * 무료 병원 진단 접수.
 *
 * 전 사이트의 CTA가 이 액션 하나로 모입니다. 5개 문항 응답은 answers[] 로
 * 함께 넘어와 메일 본문에 붙습니다 — 담당 플래너가 연락 전에 상태를 먼저 봅니다.
 */
export async function submitDiagnosis(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const blocked = guard(formData, SUCCESS);
  if (blocked) return blocked;

  const values = {
    text: Object.fromEntries(
      ["clinic", "department", "name", "phone", "email"].map((k) => [
        k,
        String(formData.get(k) ?? ""),
      ]),
    ),
    interests: [] as string[],
  };

  const parsed = parseDiagnosisForm(formData);
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

  const result = await sendDiagnosisEmail(parsed.data);
  if (!result.ok) {
    return { status: "error", message: failureMessage(result.reason), values };
  }
  return { status: "success", message: successMessage(result.devMode) };
}
