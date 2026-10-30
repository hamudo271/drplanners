import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/cms/db";
import { deletePost } from "@/app/admin/actions";
import { PostForm } from "@/components/admin/PostForm";
import { PageTitle, fmt } from "@/components/admin/ui";
import { ConfirmButton } from "@/components/admin/ConfirmButton";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const id = Number((await params).id);
  if (!Number.isInteger(id)) notFound();
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) notFound();

  return (
    <>
      <PageTitle
        title="글 편집"
        sub={`만든 날 ${fmt(post.createdAt)} · 마지막 수정 ${fmt(post.updatedAt)} · 조회 ${post.viewCount.toLocaleString()}`}
        action={
          <Link href="/admin/posts" className="text-sm text-ink-500 hover:underline">
            ← 글 목록
          </Link>
        }
      />
      <PostForm
        key={post.id}
        id={post.id}
        initial={{
          board: post.board,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt ?? "",
          thumbnailUrl: post.thumbnailUrl ?? "",
          content: post.content,
          status: post.status,
        }}
      />
      <form action={deletePost} className="mt-12 border-t border-ink-900/10 pt-6">
        <input type="hidden" name="id" value={post.id} />
        <ConfirmButton message="이 글을 삭제할까요? 되돌릴 수 없습니다.">글 삭제</ConfirmButton>
      </form>
    </>
  );
}
