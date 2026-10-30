"use client";

/** 삭제처럼 되돌릴 수 없는 제출 버튼 — 한 번 더 묻습니다 */
export function ConfirmButton({ message, children }: { message: string; children: React.ReactNode }) {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!window.confirm(message)) e.preventDefault();
      }}
      className="rounded-lg border border-red-200 px-4 py-2 text-sm text-red-700 transition hover:bg-red-50"
    >
      {children}
    </button>
  );
}
