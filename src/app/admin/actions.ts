"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { InquiryStatus, PostStatus } from "@prisma/client";
import { prisma } from "@/lib/cms/db";
import { requireAdmin } from "@/lib/cms/auth";
import { cleanHtml } from "@/lib/cms/sanitize";
import { baseSlug } from "@/lib/cms/slug";
import { STATIC_POSTS } from "@/lib/cms/posts";
import { postInputSchema, type PostInput } from "@/lib/cms/validators";

/** 공개 사이트 전체(메인 카드 · 인사이트 · 사이트맵 · RSS)를 새로 그리게 합니다 */
function refreshSite() {
  revalidatePath("/", "layout");
}

/** 겹치지 않는 주소 — 같은 주소가 있으면 -2, -3 … */
async function uniqueSlug(desired: string, title: string, excludeId: number | null) {
  const base = baseSlug(desired || title);
  for (let n = 1; ; n++) {
    const candidate = n === 1 ? base : `${base}-${n}`;
    const found = await prisma.post.findUnique({ where: { slug: candidate }, select: { id: true } });
    if (!found || found.id === excludeId) return candidate;
  }
}

/** 처음 발행한 날짜를 지킵니다 — 임시저장으로 돌렸다가 다시 발행해도 원래 날짜 */
function publishedAt(existing: Date | null | undefined, status: PostStatus) {
  if (status === "PUBLISHED") return existing ?? new Date();
  return existing ?? null;
}

export type SaveResult =
  | { ok: true; id: number; slug: string; status: PostStatus }
  | { ok: false; error: string };

export async function savePost(id: number | null, input: PostInput): Promise<SaveResult> {
  await requireAdmin();
  const parsed = postInputSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "입력 내용을 확인해주세요." };
  }
  const d = parsed.data;
  const content = cleanHtml(d.content);
  if (d.status === "PUBLISHED" && !content.replace(/<[^>]+>/g, "").trim()) {
    return { ok: false, error: "본문이 비어 있어 발행할 수 없습니다." };
  }

  try {
    const existing = id
      ? await prisma.post.findUnique({ where: { id }, select: { publishedAt: true } })
      : null;
    if (id && !existing) return { ok: false, error: "글을 찾을 수 없습니다. 이미 삭제되었을 수 있습니다." };

    const data = {
      board: d.board,
      title: d.title,
      slug: await uniqueSlug(d.slug, d.title, id),
      excerpt: d.excerpt || null,
      thumbnailUrl: d.thumbnailUrl || null,
      content,
      status: d.status,
      publishedAt: publishedAt(existing?.publishedAt, d.status),
    };
    const row = id
      ? await prisma.post.update({ where: { id }, data })
      : await prisma.post.create({ data });

    refreshSite();
    return { ok: true, id: row.id, slug: row.slug, status: row.status };
  } catch (e) {
    console.error("[admin] 글 저장 실패:", e);
    return { ok: false, error: "저장하지 못했습니다. 데이터베이스 연결을 확인해주세요." };
  }
}

export async function setPostStatus(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  const status = formData.get("status") === "PUBLISHED" ? "PUBLISHED" : "DRAFT";
  const existing = await prisma.post.findUnique({ where: { id }, select: { publishedAt: true } });
  if (!existing) return;
  await prisma.post.update({
    where: { id },
    data: { status, publishedAt: publishedAt(existing.publishedAt, status) },
  });
  refreshSite();
  revalidatePath("/admin/posts");
}

export async function deletePost(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  await prisma.post.delete({ where: { id } }).catch(() => {});
  refreshSite();
  redirect("/admin/posts");
}

/**
 * 기존 정적 글(content/articles.ts) 을 DB로 옮깁니다.
 * 이미 같은 주소의 글이 있으면 건너뜁니다 — 여러 번 눌러도 중복되지 않습니다.
 * 이 뒤로는 DB가 정본이 되어, 관리자에서 고치고 지울 수 있습니다.
 */
export async function importStaticPosts() {
  await requireAdmin();
  for (const p of STATIC_POSTS) {
    const exists = await prisma.post.findUnique({ where: { slug: p.slug }, select: { id: true } });
    if (exists) continue;
    await prisma.post.create({
      data: {
        board: p.board,
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt,
        content: cleanHtml(p.html),
        status: "PUBLISHED",
        publishedAt: p.publishedAt,
      },
    });
  }
  refreshSite();
  redirect("/admin/posts?imported=1");
}

export async function updateInquiry(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  const s = String(formData.get("status"));
  const status: InquiryStatus = s === "IN_PROGRESS" || s === "DONE" ? s : "NEW";
  const memo = String(formData.get("memo") ?? "").slice(0, 5000);
  await prisma.inquiry.update({ where: { id }, data: { status, memo: memo || null } });
  revalidatePath("/admin", "layout");
  redirect(`/admin/inquiries/${id}?saved=1`);
}

export async function deleteInquiry(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  await prisma.inquiry.delete({ where: { id } }).catch(() => {});
  revalidatePath("/admin", "layout");
  redirect("/admin/inquiries");
}
