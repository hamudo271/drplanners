import { AdminNav } from "@/components/admin/AdminNav";
import { prisma, hasDb } from "@/lib/cms/db";

export const dynamic = "force-dynamic";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const newInquiries = hasDb()
    ? await prisma.inquiry.count({ where: { status: "NEW" } }).catch(() => 0)
    : 0;

  return (
    <>
      <AdminNav newInquiries={newInquiries} />
      <div className="mx-auto max-w-6xl px-4 py-8 md:py-10">
        {!hasDb() && (
          <p className="mb-6 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            데이터베이스가 연결되지 않았습니다. Railway 의 웹 서비스 Variables 에{" "}
            <code className="font-mono">DATABASE_URL</code> 을 연결해주세요. 그 전까지 공개 사이트는 기존 글로 동작합니다.
          </p>
        )}
        {children}
      </div>
    </>
  );
}
