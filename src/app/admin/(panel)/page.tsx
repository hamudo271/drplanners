import Link from "next/link";
import { prisma, hasDb } from "@/lib/cms/db";
import { BOARDS } from "@/lib/cms/posts";
import { INQUIRY_STATUS } from "@/lib/cms/validators";
import { Card, PageTitle, Pill, Empty, PrimaryLink, fmt } from "@/components/admin/ui";

/** 대시보드 — 새 문의, 이번 달 접수, 글 현황, 많이 읽힌 글 */
export default async function Dashboard() {
  if (!hasDb()) return <PageTitle title="대시보드" />;

  const monthStart = new Date();
  monthStart.setDate(1);
  monthStart.setHours(0, 0, 0, 0);

  const data = await Promise.all([
    prisma.inquiry.count({ where: { status: "NEW" } }),
    prisma.inquiry.count({ where: { createdAt: { gte: monthStart } } }),
    prisma.inquiry.count(),
    prisma.post.count({ where: { status: "PUBLISHED" } }),
    prisma.post.count({ where: { status: "DRAFT" } }),
    prisma.post.aggregate({ _sum: { viewCount: true } }),
    prisma.inquiry.findMany({ orderBy: { createdAt: "desc" }, take: 6 }),
    prisma.post.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { viewCount: "desc" },
      take: 5,
      select: { id: true, title: true, board: true, viewCount: true },
    }),
  ]).catch((e) => {
    console.error("[admin] 대시보드 조회 실패:", e);
    return null;
  });

  if (!data) {
    return (
      <>
        <PageTitle title="대시보드" />
        <Card className="p-6 text-sm text-red-700">데이터베이스에 연결하지 못했습니다. 잠시 후 새로고침해주세요.</Card>
      </>
    );
  }

  const [newCount, monthCount, totalInquiries, published, drafts, views, recent, top] = data;
  const tiles = [
    { label: "새 접수", value: newCount, href: "/admin/inquiries?status=NEW", strong: newCount > 0 },
    { label: "이번 달 접수", value: monthCount, href: "/admin/inquiries" },
    { label: "발행된 글", value: published, href: "/admin/posts" },
    { label: "누적 조회수", value: views?._sum.viewCount ?? 0, href: "/admin/posts" },
  ];

  return (
    <>
      <PageTitle title="대시보드" sub={`전체 접수 ${totalInquiries}건 · 임시저장 글 ${drafts}편`} action={<PrimaryLink href="/admin/posts/new">새 글 쓰기</PrimaryLink>} />

      {published + drafts === 0 && (
        <Card className="mb-6 flex flex-wrap items-center justify-between gap-4 border-brass-400 bg-brass-400/10 p-5">
          <div>
            <p className="font-medium">아직 관리자에 글이 없습니다.</p>
            <p className="mt-1 text-sm text-ink-700">
              지금 사이트에 걸린 칼럼 · 블로그 7편을 가져오면, 여기서 고치고 지울 수 있게 됩니다.
            </p>
          </div>
          <Link href="/admin/posts" className="rounded-lg border border-ink-900/20 bg-white px-4 py-2.5 text-sm hover:bg-cream-100">
            글 목록에서 가져오기 →
          </Link>
        </Card>
      )}

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {tiles.map((t) => (
          <Link key={t.label} href={t.href} className="block">
            <Card className={`p-5 transition hover:border-ink-900/30 ${t.strong ? "border-brass-500 bg-brass-400/10" : ""}`}>
              <p className="text-xs text-ink-500">{t.label}</p>
              <p className="mt-2 text-3xl font-light tabular-nums">{t.value.toLocaleString()}</p>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <Card>
          <div className="flex items-center justify-between border-b border-ink-900/10 px-5 py-4">
            <h2 className="text-sm font-medium">최근 접수</h2>
            <Link href="/admin/inquiries" className="text-xs text-brass-600 hover:underline">
              전체 보기 →
            </Link>
          </div>
          {recent.length === 0 ? (
            <Empty>아직 접수된 문의가 없습니다.</Empty>
          ) : (
            <ul className="divide-y divide-ink-900/8">
              {recent.map((q) => (
                <li key={q.id}>
                  <Link href={`/admin/inquiries/${q.id}`} className="flex items-center gap-3 px-5 py-3.5 hover:bg-cream-50">
                    <Pill tone={q.kind === "DIAGNOSIS" ? "brass" : "muted"}>{q.kind === "DIAGNOSIS" ? "진단" : "문의"}</Pill>
                    <span className="min-w-0 flex-1 truncate text-sm">
                      {q.clinic} <span className="text-ink-500">· {q.name}</span>
                    </span>
                    {q.status === "NEW" && <Pill tone="forest">{INQUIRY_STATUS.NEW}</Pill>}
                    <span className="hidden shrink-0 text-xs text-ink-400 tabular-nums sm:inline">{fmt(q.createdAt)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card>
          <div className="border-b border-ink-900/10 px-5 py-4">
            <h2 className="text-sm font-medium">많이 읽힌 글</h2>
          </div>
          {top.length === 0 ? (
            <Empty>발행된 글이 없습니다.</Empty>
          ) : (
            <ol className="divide-y divide-ink-900/8">
              {top.map((p, i) => (
                <li key={p.id}>
                  <Link href={`/admin/posts/${p.id}`} className="flex items-center gap-3 px-5 py-3.5 hover:bg-cream-50">
                    <span className="w-4 text-xs text-ink-400 tabular-nums">{i + 1}</span>
                    <span className="min-w-0 flex-1 truncate text-sm">{p.title}</span>
                    <span className="text-xs text-ink-500">{BOARDS[p.board].label}</span>
                    <span className="w-12 text-right text-xs tabular-nums">{p.viewCount.toLocaleString()}</span>
                  </Link>
                </li>
              ))}
            </ol>
          )}
        </Card>
      </div>
    </>
  );
}
