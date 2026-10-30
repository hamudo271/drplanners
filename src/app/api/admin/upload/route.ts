import { NextResponse } from "next/server";
import { prisma } from "@/lib/cms/db";
import { requireAdmin } from "@/lib/cms/auth";

export const dynamic = "force-dynamic";

const MAX = 5 * 1024 * 1024; // 5MB
const TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

/** 본문 이미지 · 대표 이미지 업로드 → { url: "/media/<id>" } */
export async function POST(req: Request) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "파일이 없습니다." }, { status: 400 });
  }
  if (!TYPES.has(file.type)) {
    return NextResponse.json({ error: "JPG · PNG · WEBP · GIF 이미지만 올릴 수 있습니다." }, { status: 400 });
  }
  if (file.size > MAX) {
    return NextResponse.json({ error: "5MB 이하 이미지만 올릴 수 있습니다." }, { status: 400 });
  }

  const media = await prisma.media.create({
    data: {
      filename: file.name.slice(0, 200),
      mimeType: file.type,
      size: file.size,
      data: Buffer.from(await file.arrayBuffer()),
    },
    select: { id: true },
  });
  return NextResponse.json({ url: `/media/${media.id}` });
}
