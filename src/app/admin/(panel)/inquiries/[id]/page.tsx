import Link from "next/link";
import { notFound } from "next/navigation";
import type { InquiryStatus } from "@prisma/client";
import { prisma } from "@/lib/cms/db";
import { updateInquiry, deleteInquiry } from "@/app/admin/actions";
import { INQUIRY_STATUS } from "@/lib/cms/validators";
import { Card, PageTitle, Pill, fmt } from "@/components/admin/ui";
import { ConfirmButton } from "@/components/admin/ConfirmButton";

type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ saved?: string }> };

export default async function InquiryPage({ params, searchParams }: Props) {
  const id = Number((await params).id);
  const { saved } = await searchParams;
  if (!Number.isInteger(id)) notFound();
  const r = await prisma.inquiry.findUnique({ where: { id } });
  if (!r) notFound();

  const answers = Array.isArray(r.answers) ? (r.answers as { q: string; a: string }[]) : [];
  const rows: [string, React.ReactNode][] = [
    ["병원명", r.clinic],
    ["진료과목", r.department],
    ["담당자", r.position ? `${r.name} (${r.position})` : r.name],
    ["연락처", <a key="t" href={`tel:${r.phone.replace(/[^\d]/g, "")}`} className="text-brass-600 hover:underline">{r.phone}</a>],
    ["이메일", <a key="m" href={`mailto:${r.email}`} className="text-brass-600 hover:underline">{r.email}</a>],
    ...(r.interests.length ? [["관심 솔루션", r.interests.join(", ")] as [string, string]] : []),
    ["접수 시각", fmt(r.createdAt)],
    ["메일 알림", r.mailed ? "발송됨" : "발송 안 됨 (메일 설정 확인)"],
  ];

  return (
    <>
      <PageTitle
        title={`${r.clinic} · ${r.name}`}
        sub={r.kind === "DIAGNOSIS" ? "무료 병원 진단 신청" : "문의하기"}
        action={
          <Link href="/admin/inquiries" className="text-sm text-ink-500 hover:underline">
            ← 접수 목록
          </Link>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          <Card>
            <dl className="divide-y divide-ink-900/8">
              {rows.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[110px_1fr] gap-4 px-5 py-3.5 text-sm">
                  <dt className="text-ink-500">{k}</dt>
                  <dd className="min-w-0 break-words">{v}</dd>
                </div>
              ))}
            </dl>
          </Card>

          {answers.length > 0 && (
            <Card>
              <h2 className="border-b border-ink-900/10 px-5 py-4 text-sm font-medium">진단 응답</h2>
              <ol className="divide-y divide-ink-900/8">
                {answers.map((a, i) => (
                  <li key={i} className="grid grid-cols-[28px_120px_1fr] gap-3 px-5 py-3.5 text-sm">
                    <span className="text-ink-400 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-ink-500">{a.q}</span>
                    <span>{a.a}</span>
                  </li>
                ))}
              </ol>
            </Card>
          )}

          {r.message && (
            <Card>
              <h2 className="border-b border-ink-900/10 px-5 py-4 text-sm font-medium">문의 내용</h2>
              <p className="px-5 py-4 text-sm leading-7 whitespace-pre-wrap">{r.message}</p>
            </Card>
          )}
        </div>

        <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
          <Card className="p-5">
            <form action={updateInquiry} className="space-y-4">
              <input type="hidden" name="id" value={r.id} />
              <fieldset>
                <legend className="mb-2 text-xs text-ink-500">진행 상태</legend>
                <div className="grid grid-cols-3 gap-1.5">
                  {(Object.keys(INQUIRY_STATUS) as InquiryStatus[]).map((s) => (
                    <label key={s} className="cursor-pointer">
                      <input type="radio" name="status" value={s} aria-label={INQUIRY_STATUS[s]} defaultChecked={r.status === s} className="peer sr-only" />
                      <span className="block rounded-lg border border-ink-900/15 py-2 text-center text-sm peer-checked:border-forest-800 peer-checked:bg-forest-800 peer-checked:text-cream-50 peer-focus-visible:ring-2 peer-focus-visible:ring-forest-700/30">
                        {INQUIRY_STATUS[s]}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <label className="block">
                <span className="mb-1.5 block text-xs text-ink-500">메모 (관리자만 봅니다)</span>
                <textarea
                  name="memo"
                  defaultValue={r.memo ?? ""}
                  rows={6}
                  maxLength={5000}
                  placeholder="통화 내용, 다음 연락 일정 등"
                  className="w-full resize-y rounded-lg border border-ink-900/15 px-3 py-2.5 text-sm outline-none focus:border-forest-700"
                />
              </label>
              <button className="w-full rounded-lg bg-forest-800 py-2.5 text-sm text-cream-50 hover:bg-forest-700">저장</button>
              {saved && <p role="status" className="text-center text-sm text-forest-800">저장했습니다.</p>}
            </form>
          </Card>
          <div className="flex items-center justify-between px-1">
            <Pill tone={r.kind === "DIAGNOSIS" ? "brass" : "muted"}>{r.kind === "DIAGNOSIS" ? "진단" : "문의"} #{r.id}</Pill>
            <form action={deleteInquiry}>
              <input type="hidden" name="id" value={r.id} />
              <ConfirmButton message="이 접수를 삭제할까요? 되돌릴 수 없습니다.">삭제</ConfirmButton>
            </form>
          </div>
        </aside>
      </div>
    </>
  );
}
