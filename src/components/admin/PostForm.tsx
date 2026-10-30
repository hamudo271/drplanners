"use client";

import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Editor, uploadImage } from "./Editor";
import { savePost } from "@/app/admin/actions";
import type { PostInput } from "@/lib/cms/validators";

/**
 * 글쓰기 폼 — 웹스랩 관리자의 PostForm 과 같은 흐름.
 *   게시판 · 제목 · 주소 · 요약 · 대표 이미지 · 본문 → 임시저장 / 발행
 * 임시저장 상태인 글은 3분마다 자동 저장합니다. (발행된 글은 자동으로 바꾸지 않습니다)
 */

const BOARD_OPTIONS = [
  { value: "COLUMN", label: "칼럼", path: "/insight/column" },
  { value: "BLOG", label: "블로그", path: "/insight/blog" },
  { value: "NOTICE", label: "공지사항", path: "/insight/notice" },
] as const;

const AUTOSAVE_MS = 3 * 60 * 1000;

const field =
  "w-full rounded-lg border border-ink-900/15 bg-white px-3.5 py-2.5 text-[15px] text-ink-900 outline-none transition focus:border-forest-700 focus:ring-2 focus:ring-forest-700/15";

export function PostForm({
  id: initialId = null,
  initial,
}: {
  id?: number | null;
  initial?: PostInput;
}) {
  const router = useRouter();
  const [id, setId] = useState<number | null>(initialId);
  const [v, setV] = useState<PostInput>(
    initial ?? {
      board: "COLUMN",
      title: "",
      slug: "",
      excerpt: "",
      thumbnailUrl: "",
      content: "",
      status: "DRAFT",
    },
  );
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [thumbBusy, setThumbBusy] = useState(false);
  const [pending, start] = useTransition();
  const dirty = useRef(false);
  const latest = useRef(v);

  useEffect(() => {
    latest.current = v;
  }, [v]);

  const set = <K extends keyof PostInput>(k: K, value: PostInput[K]) => {
    dirty.current = true;
    setV((prev) => ({ ...prev, [k]: value }));
  };

  const save = useCallback(
    (status: PostInput["status"], quiet = false) => {
      start(async () => {
        const res = await savePost(id, { ...latest.current, status });
        if (!res.ok) {
          setMsg({ kind: "err", text: res.error });
          return;
        }
        dirty.current = false;
        setSavedAt(new Date());
        setV((prev) => ({ ...prev, status: res.status, slug: res.slug }));
        if (!quiet) {
          setMsg({
            kind: "ok",
            text: res.status === "PUBLISHED" ? "발행했습니다. 사이트에 바로 반영됩니다." : "임시저장했습니다.",
          });
        }
        if (id === null) {
          setId(res.id);
          router.replace(`/admin/posts/${res.id}`);
        }
      });
    },
    [id, router],
  );

  // 임시저장 글만 자동 저장
  useEffect(() => {
    const t = setInterval(() => {
      if (dirty.current && latest.current.status === "DRAFT" && latest.current.title.trim()) {
        save("DRAFT", true);
      }
    }, AUTOSAVE_MS);
    return () => clearInterval(t);
  }, [save]);

  // 저장하지 않고 나가려 하면 확인
  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => {
      if (dirty.current) e.preventDefault();
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, []);

  const board = BOARD_OPTIONS.find((b) => b.value === v.board)!;
  const published = v.status === "PUBLISHED";

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
      {/* ── 본문 ── */}
      <div className="min-w-0 space-y-5">
        <input
          className="w-full border-0 border-b border-ink-900/15 bg-transparent pb-3 text-2xl font-medium text-ink-900 outline-none placeholder:text-ink-400 focus:border-forest-700 focus-visible:outline-none md:text-[28px]"
          placeholder="제목을 입력하세요"
          value={v.title}
          maxLength={200}
          onChange={(e) => set("title", e.target.value)}
        />
        <Editor initialContent={v.content} onChange={(html) => set("content", html)} />
      </div>

      {/* ── 설정 ── */}
      <aside className="space-y-5 lg:sticky lg:top-20 lg:self-start">
        <div className="rounded-xl border border-ink-900/10 bg-white p-5">
          <div className="flex items-center justify-between">
            <span
              className={`rounded-full px-2.5 py-1 text-xs ${
                published ? "bg-forest-800 text-cream-50" : "bg-cream-200 text-ink-700"
              }`}
            >
              {published ? "발행됨" : "임시저장"}
            </span>
            <span className="text-xs text-ink-400">
              {pending
                ? "저장 중…"
                : savedAt
                  ? `${savedAt.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })} 저장됨`
                  : ""}
            </span>
          </div>

          <div className="mt-4 grid gap-2">
            <button
              type="button"
              disabled={pending}
              onClick={() => save("PUBLISHED")}
              className="rounded-lg bg-forest-800 px-4 py-3 text-sm text-cream-50 transition hover:bg-forest-700 disabled:opacity-50"
            >
              {published ? "수정 내용 발행" : "발행하기"}
            </button>
            <button
              type="button"
              disabled={pending}
              onClick={() => save("DRAFT")}
              className="rounded-lg border border-ink-900/15 px-4 py-2.5 text-sm text-ink-700 transition hover:bg-cream-100 disabled:opacity-50"
            >
              {published ? "발행 취소 (임시저장으로)" : "임시저장"}
            </button>
            {published && id !== null && (
              <a
                href={`${board.path}/${v.slug}`}
                target="_blank"
                rel="noreferrer"
                className="text-center text-sm text-brass-600 underline-offset-4 hover:underline"
              >
                사이트에서 보기 ↗
              </a>
            )}
          </div>

          {msg && (
            <p
              role="status"
              className={`mt-4 rounded-lg px-3 py-2 text-sm ${
                msg.kind === "ok" ? "bg-forest-800/8 text-forest-800" : "bg-red-50 text-red-700"
              }`}
            >
              {msg.text}
            </p>
          )}
        </div>

        <div className="space-y-4 rounded-xl border border-ink-900/10 bg-white p-5">
          <label className="block">
            <span className="mb-1.5 block text-xs text-ink-500">게시판</span>
            <select className={field} value={v.board} onChange={(e) => set("board", e.target.value as PostInput["board"])}>
              {BOARD_OPTIONS.map((b) => (
                <option key={b.value} value={b.value}>
                  {b.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs text-ink-500">주소 (비우면 제목으로 자동)</span>
            <input
              className={field}
              placeholder="place-ranking-tips"
              value={v.slug}
              maxLength={120}
              onChange={(e) => set("slug", e.target.value)}
            />
            <span className="mt-1.5 block break-all text-[11px] text-ink-400">
              dr-planners.com{board.path}/{v.slug || "…"}
            </span>
          </label>

          <label className="block">
            <span className="mb-1.5 flex justify-between text-xs text-ink-500">
              <span>요약 (검색 결과 · 목록 카드)</span>
              <span className="tabular-nums">{v.excerpt.length}/300</span>
            </span>
            <textarea
              className={`${field} min-h-[96px] resize-y text-sm`}
              placeholder="비우면 본문 앞부분을 씁니다"
              value={v.excerpt}
              maxLength={300}
              onChange={(e) => set("excerpt", e.target.value)}
            />
          </label>

          <div>
            <span className="mb-1.5 block text-xs text-ink-500">대표 이미지 (목록 카드 · 공유 썸네일)</span>
            {v.thumbnailUrl ? (
              <div className="relative overflow-hidden rounded-lg border border-ink-900/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={v.thumbnailUrl} alt="" className="aspect-[16/10] w-full object-cover" />
                <button
                  type="button"
                  onClick={() => set("thumbnailUrl", "")}
                  className="absolute top-2 right-2 rounded-md bg-ink-900/70 px-2 py-1 text-xs text-white"
                >
                  빼기
                </button>
              </div>
            ) : (
              <label className="flex aspect-[16/10] cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-ink-900/20 text-sm text-ink-500 hover:bg-cream-100">
                {thumbBusy ? "올리는 중…" : "이미지 선택"}
                <span className="mt-1 text-[11px] text-ink-400">비우면 기본 이미지를 씁니다</span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    e.target.value = "";
                    if (!file) return;
                    try {
                      setThumbBusy(true);
                      set("thumbnailUrl", await uploadImage(file));
                    } catch (err) {
                      alert(err instanceof Error ? err.message : "업로드에 실패했습니다.");
                    } finally {
                      setThumbBusy(false);
                    }
                  }}
                />
              </label>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
