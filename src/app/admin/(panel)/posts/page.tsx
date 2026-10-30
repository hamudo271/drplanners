import Link from "next/link";
import type { PostBoard } from "@prisma/client";
import { prisma, hasDb } from "@/lib/cms/db";
import { BOARDS } from "@/lib/cms/posts";
import { setPostStatus, importStaticPosts } from "@/app/admin/actions";
import { Card, PageTitle, Pill, Empty, PrimaryLink, Tabs, fmt } from "@/components/admin/ui";

type Search = { searchParams: Promise<{ board?: string; imported?: string }> };

export default async function PostsPage({ searchParams }: Search) {
  const sp = await searchParams;
  const board = (Object.keys(BOARDS) as PostBoard[]).find((b) => b === sp.board);

  if (!hasDb()) return <PageTitle title="글 목록" />;

  const [posts, counts, total] = await Promise.all([
    prisma.post.findMany({
      where: board ? { board } : {},
      // 임시저장(발행일 없음)을 맨 위에, 그다음 최신 발행순
      orderBy: [{ publishedAt: { sort: "desc", nulls: "first" } }, { updatedAt: "desc" }],
      select: { id: true, board: true, title: true, slug: true, status: true, publishedAt: true, updatedAt: true, viewCount: true },
    }),
    prisma.post.groupBy({ by: ["board"], _count: true }),
    prisma.post.count(),
  ]);
  const countOf = (b: PostBoard) => counts.find((c) => c.board === b)?._count ?? 0;

  return (
    <>
      <PageTitle
        title="글 목록"
        sub="칼럼 · 블로그 · 공지사항. 발행하면 사이트 · 사이트맵 · RSS 에 바로 반영됩니다."
        action={<PrimaryLink href="/admin/posts/new">새 글 쓰기</PrimaryLink>}
      />

      {sp.imported && (
        <p className="mb-5 rounded-lg bg-forest-800/8 px-4 py-3 text-sm text-forest-800">
          기존 글을 가져왔습니다. 이제부터 사이트는 여기 있는 글을 보여줍니다.
        </p>
      )}

      {total === 0 && (
        <Card className="mb-6 border-brass-400 bg-brass-400/10 p-5">
          <p className="font-medium">사이트에 이미 걸린 글 7편을 가져올까요?</p>
          <p className="mt-1 text-sm text-ink-700">
            지금은 사이트가 코드에 들어 있는 글을 보여주고 있습니다. 가져오면 같은 주소 · 같은 날짜로 옮겨지고,
            그 뒤로는 이 화면에서 고치고 지울 수 있습니다. 가져오기 전에 새 글을 먼저 발행하면 기존 7편은 사이트에서 내려갑니다.
          </p>
          <form action={importStaticPosts} className="mt-4">
            <button className="rounded-lg bg-forest-800 px-4 py-2.5 text-sm text-cream-50 hover:bg-forest-700">
              기존 글 7편 가져오기
            </button>
          </form>
        </Card>
      )}

      <Tabs
        current={board ?? "ALL"}
        items={[
          { key: "ALL", href: "/admin/posts", label: "전체", count: total },
          ...(Object.keys(BOARDS) as PostBoard[]).map((b) => ({
            key: b,
            href: `/admin/posts?board=${b}`,
            label: BOARDS[b].label,
            count: countOf(b),
          })),
        ]}
      />

      <Card className="overflow-x-auto">
        {posts.length === 0 ? (
          <Empty>글이 없습니다.</Empty>
        ) : (
          <table className="w-full min-w-[720px] text-sm">
            <thead className="border-b border-ink-900/10 text-left text-xs text-ink-500">
              <tr>
                <th className="px-5 py-3 font-normal">제목</th>
                <th className="px-3 py-3 font-normal">게시판</th>
                <th className="px-3 py-3 font-normal">상태</th>
                <th className="px-3 py-3 font-normal">발행일</th>
                <th className="px-3 py-3 text-right font-normal">조회</th>
                <th className="px-5 py-3 text-right font-normal">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-900/8">
              {posts.map((p) => (
                <tr key={p.id} className="hover:bg-cream-50">
                  <td className="max-w-[360px] px-5 py-3.5">
                    <Link href={`/admin/posts/${p.id}`} className="block truncate font-medium hover:underline">
                      {p.title}
                    </Link>
                    <span className="block truncate text-xs text-ink-400">{BOARDS[p.board].path}/{p.slug}</span>
                  </td>
                  <td className="px-3 py-3.5 text-ink-700">{BOARDS[p.board].label}</td>
                  <td className="px-3 py-3.5">
                    {/* 알약을 누르면 발행 ↔ 임시저장 */}
                    <form action={setPostStatus}>
                      <input type="hidden" name="id" value={p.id} />
                      <input type="hidden" name="status" value={p.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED"} />
                      <button title={p.status === "PUBLISHED" ? "눌러서 발행 취소" : "눌러서 발행"}>
                        <Pill tone={p.status === "PUBLISHED" ? "forest" : "muted"}>
                          {p.status === "PUBLISHED" ? "발행됨" : "임시저장"}
                        </Pill>
                      </button>
                    </form>
                  </td>
                  <td className="px-3 py-3.5 text-ink-500 tabular-nums">{p.publishedAt ? fmt(p.publishedAt, false) : "—"}</td>
                  <td className="px-3 py-3.5 text-right tabular-nums">{p.viewCount.toLocaleString()}</td>
                  <td className="px-5 py-3.5 text-right whitespace-nowrap">
                    <Link href={`/admin/posts/${p.id}`} className="text-brass-600 hover:underline">
                      편집
                    </Link>
                    {p.status === "PUBLISHED" && (
                      <a href={`${BOARDS[p.board].path}/${p.slug}`} target="_blank" rel="noreferrer" className="ml-3 text-ink-500 hover:underline">
                        보기 ↗
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </>
  );
}
