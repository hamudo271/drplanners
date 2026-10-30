import { prisma, hasDb } from "@/lib/cms/db";

/**
 * 관리자에서 올린 이미지 — DB에 보관한 원본을 그대로 내보냅니다.
 * 주소(id)가 바뀌지 않는 한 내용도 바뀌지 않으므로 1년 동안 캐시합니다.
 */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!hasDb() || !/^[a-z0-9]{20,32}$/.test(id)) return new Response("Not found", { status: 404 });

  const media = await prisma.media
    .findUnique({ where: { id }, select: { data: true, mimeType: true } })
    .catch(() => null);
  if (!media) return new Response("Not found", { status: 404 });

  return new Response(new Uint8Array(media.data), {
    headers: {
      "Content-Type": media.mimeType,
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
