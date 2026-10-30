import { z } from "zod";

/** 글 저장 — 관리자 폼과 서버 액션이 같은 규칙을 씁니다 */
export const postInputSchema = z.object({
  board: z.enum(["COLUMN", "BLOG", "NOTICE"]),
  title: z.string().trim().min(1, "제목을 입력해주세요.").max(200),
  slug: z.string().trim().max(120).default(""),
  excerpt: z.string().trim().max(300, "요약은 300자 이내로 써주세요.").default(""),
  thumbnailUrl: z
    .string()
    .trim()
    .max(500)
    .refine((v) => v === "" || v.startsWith("/media/") || /^https:\/\//.test(v), "이미지 주소가 올바르지 않습니다.")
    .default(""),
  content: z.string().max(500_000, "본문이 너무 깁니다."),
  status: z.enum(["DRAFT", "PUBLISHED"]),
});

export type PostInput = z.infer<typeof postInputSchema>;

export const INQUIRY_STATUS = {
  NEW: "새 접수",
  IN_PROGRESS: "상담 중",
  DONE: "완료",
} as const;
