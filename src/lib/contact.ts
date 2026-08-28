import { z } from "zod";

/** 관심 솔루션 — nav.ts의 대분류와 맞춥니다 */
export const INTERESTS = [
  "브랜딩",
  "마케팅",
  "메디컬 AI",
  "DRP 시그니처",
  "기타",
] as const;

/** 국내 유선·휴대폰 번호 (하이픈 유무 무관) */
const PHONE = /^0\d{1,2}-?\d{3,4}-?\d{4}$/;

export const contactSchema = z.object({
  clinic: z.string().trim().min(1, "병원명을 입력해주세요.").max(100),
  department: z.string().trim().min(1, "진료과목을 입력해주세요.").max(100),
  name: z.string().trim().min(1, "담당자명을 입력해주세요.").max(50),
  title: z.string().trim().max(50).optional().or(z.literal("")),
  phone: z
    .string()
    .trim()
    .min(1, "연락처를 입력해주세요.")
    .refine((v) => PHONE.test(v.replace(/\s/g, "")), {
      message: "연락처 형식을 확인해주세요. (예: 02-1234-5678)",
    }),
  email: z
    .string()
    .trim()
    .min(1, "이메일을 입력해주세요.")
    .pipe(z.email("이메일 형식을 확인해주세요.")),
  interests: z.array(z.enum(INTERESTS)).default([]),
  message: z
    .string()
    .trim()
    .min(10, "문의 내용을 10자 이상 입력해주세요.")
    .max(5000, "문의 내용이 너무 깁니다. (최대 5000자)"),
  consent: z.literal("on", { error: "개인정보 수집·이용에 동의해주세요." }),
});

export type ContactInput = z.infer<typeof contactSchema>;

/** 서버 액션 반환 형태 */
export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  /** 필드명 → 에러 메시지 배열 */
  errors?: Record<string, string[]>;
  /**
   * 제출된 값 되돌려주기.
   * React 19는 액션 완료 후 폼을 초기화하므로, 검증 실패 시
   * 입력값이 날아가지 않도록 defaultValue로 다시 채웁니다.
   */
  values?: { text: Record<string, string>; interests: string[] };
};

export const CONTACT_INITIAL: ContactState = { status: "idle" };

/** FormData → 검증. 폼 필드명과 스키마 키를 한 곳에서 매핑합니다. */
export function parseContactForm(formData: FormData) {
  return contactSchema.safeParse({
    clinic: formData.get("clinic") ?? "",
    department: formData.get("department") ?? "",
    name: formData.get("name") ?? "",
    title: formData.get("title") ?? "",
    phone: formData.get("phone") ?? "",
    email: formData.get("email") ?? "",
    interests: formData.getAll("interests"),
    message: formData.get("message") ?? "",
    consent: formData.get("consent") ?? "",
  });
}
