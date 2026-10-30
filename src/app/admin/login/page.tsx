"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.replace("/admin");
      router.refresh();
      return;
    }
    const json = await res.json().catch(() => ({}));
    setError(json.error || "로그인하지 못했습니다.");
    setBusy(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-forest-900 px-4">
      <form onSubmit={submit} className="w-full max-w-sm rounded-2xl bg-cream-50 p-8 shadow-2xl">
        <Image src="/brand/logo.png" alt="DR.PLANERS" width={1815} height={340} className="h-7 w-auto" />
        <h1 className="mt-6 text-lg font-medium">관리자 로그인</h1>
        <p className="mt-1 text-sm text-ink-500">글 관리 · 문의 확인</p>

        <label className="mt-7 block">
          <span className="mb-1.5 block text-xs text-ink-500">비밀번호</span>
          <input
            type="password"
            autoFocus
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-ink-900/15 bg-white px-3.5 py-3 outline-none focus:border-forest-700 focus:ring-2 focus:ring-forest-700/15"
          />
        </label>
        {error && (
          <p role="alert" className="mt-3 text-sm text-red-700">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={busy || !password}
          className="mt-6 w-full rounded-lg bg-forest-800 py-3 text-sm text-cream-50 transition hover:bg-forest-700 disabled:opacity-50"
        >
          {busy ? "확인 중…" : "로그인"}
        </button>
      </form>
    </div>
  );
}
