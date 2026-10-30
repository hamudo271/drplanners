import Link from "next/link";
import type { InquiryKind, InquiryStatus, Prisma } from "@prisma/client";
import { prisma, hasDb } from "@/lib/cms/db";
import { INQUIRY_STATUS } from "@/lib/cms/validators";
import { Card, PageTitle, Pill, Empty, Tabs, fmt } from "@/components/admin/ui";

type Search = { searchParams: Promise<{ status?: string; kind?: string }> };

const STATUS_TONE = { NEW: "forest", IN_PROGRESS: "brass", DONE: "muted" } as const;

export default async function InquiriesPage({ searchParams }: Search) {
  const sp = await searchParams;
  const status = (Object.keys(INQUIRY_STATUS) as InquiryStatus[]).find((s) => s === sp.status);
  const kind = (["CONTACT", "DIAGNOSIS"] as InquiryKind[]).find((k) => k === sp.kind);

  if (!hasDb()) return <PageTitle title="문의 · 진단" />;

  const where: Prisma.InquiryWhereInput = { ...(status ? { status } : {}), ...(kind ? { kind } : {}) };
  const [rows, byStatus, total] = await Promise.all([
    prisma.inquiry.findMany({ where, orderBy: { createdAt: "desc" }, take: 200 }),
    prisma.inquiry.groupBy({ by: ["status"], _count: true }),
    prisma.inquiry.count(),
  ]);
  const countOf = (s: InquiryStatus) => byStatus.find((c) => c.status === s)?._count ?? 0;
  const q = (next: { status?: string; kind?: string }) => {
    const p = new URLSearchParams();
    const st = "status" in next ? next.status : status;
    const kd = "kind" in next ? next.kind : kind;
    if (st) p.set("status", st);
    if (kd) p.set("kind", kd);
    const s = p.toString();
    return `/admin/inquiries${s ? `?${s}` : ""}`;
  };

  return (
    <>
      <PageTitle title="문의 · 진단" sub="사이트의 문의하기 · 무료 병원 진단으로 들어온 접수입니다. 메일 발송과 별개로 모두 저장됩니다." />

      <Tabs
        current={status ?? "ALL"}
        items={[
          { key: "ALL", href: q({ status: undefined }), label: "전체", count: total },
          ...(Object.keys(INQUIRY_STATUS) as InquiryStatus[]).map((s) => ({
            key: s,
            href: q({ status: s }),
            label: INQUIRY_STATUS[s],
            count: countOf(s),
          })),
        ]}
      />
      <div className="-mt-2 mb-5 flex gap-3 text-sm">
        {[
          { k: undefined, label: "모든 유형" },
          { k: "DIAGNOSIS", label: "진단만" },
          { k: "CONTACT", label: "문의만" },
        ].map((t) => (
          <Link
            key={t.label}
            href={q({ kind: t.k })}
            className={kind === t.k ? "text-ink-900 underline underline-offset-4" : "text-ink-500 hover:text-ink-900"}
          >
            {t.label}
          </Link>
        ))}
      </div>

      <Card className="overflow-x-auto">
        {rows.length === 0 ? (
          <Empty>해당하는 접수가 없습니다.</Empty>
        ) : (
          <table className="w-full min-w-[760px] text-sm">
            <thead className="border-b border-ink-900/10 text-left text-xs text-ink-500">
              <tr>
                <th className="px-5 py-3 font-normal">접수일</th>
                <th className="px-3 py-3 font-normal">유형</th>
                <th className="px-3 py-3 font-normal">병원 · 진료과</th>
                <th className="px-3 py-3 font-normal">담당자</th>
                <th className="px-3 py-3 font-normal">연락처</th>
                <th className="px-5 py-3 font-normal">상태</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-900/8">
              {rows.map((r) => (
                <tr key={r.id} className={`hover:bg-cream-50 ${r.status === "NEW" ? "font-medium" : ""}`}>
                  <td className="px-5 py-3.5 whitespace-nowrap text-ink-500 tabular-nums">
                    <Link href={`/admin/inquiries/${r.id}`} className="hover:underline">
                      {fmt(r.createdAt)}
                    </Link>
                  </td>
                  <td className="px-3 py-3.5">
                    <Pill tone={r.kind === "DIAGNOSIS" ? "brass" : "muted"}>{r.kind === "DIAGNOSIS" ? "진단" : "문의"}</Pill>
                  </td>
                  <td className="max-w-[240px] px-3 py-3.5">
                    <Link href={`/admin/inquiries/${r.id}`} className="block truncate hover:underline">
                      {r.clinic} <span className="font-normal text-ink-500">· {r.department}</span>
                    </Link>
                  </td>
                  <td className="px-3 py-3.5">{r.name}</td>
                  <td className="px-3 py-3.5 whitespace-nowrap tabular-nums">{r.phone}</td>
                  <td className="px-5 py-3.5">
                    <Pill tone={STATUS_TONE[r.status]}>{INQUIRY_STATUS[r.status]}</Pill>
                    {!r.mailed && <span className="ml-1.5 text-[11px] font-normal text-ink-400" title="메일 발송 안 됨">메일✕</span>}
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
