"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { Editor as TiptapEditor } from "@tiptap/react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";

/**
 * 본문 에디터 (Tiptap) — 웹스랩 관리자와 같은 구성.
 * 편집 화면에 공개 페이지와 같은 본문 스타일(.article-body)을 입혀, 보이는 그대로 발행됩니다.
 * initialContent 는 처음 한 번만 반영합니다 — 부모가 글을 불러온 뒤에 마운트하세요.
 */

function Btn({
  onClick,
  active,
  disabled,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      aria-pressed={active}
      disabled={disabled}
      onMouseDown={(e) => e.preventDefault()} // 선택 영역 유지
      onClick={onClick}
      className={`inline-flex h-8 min-w-8 items-center justify-center rounded-md px-2 text-[13px] transition-colors disabled:opacity-35 ${
        active ? "bg-forest-800 text-cream-50" : "text-ink-700 hover:bg-cream-200"
      }`}
    >
      {children}
    </button>
  );
}

const Sep = () => <span className="mx-1 h-5 w-px bg-ink-900/10" aria-hidden="true" />;

export async function uploadImage(file: File): Promise<string> {
  const body = new FormData();
  body.append("file", file);
  const res = await fetch("/api/admin/upload", { method: "POST", body });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || !json.url) throw new Error(json.error || "이미지 업로드에 실패했습니다.");
  return json.url as string;
}

export function Editor({
  initialContent = "",
  onChange,
}: {
  initialContent?: string;
  onChange: (html: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  // 끌어놓기 · 붙여넣기 핸들러는 에디터가 생기기 전에 등록되므로 ref 로 최신 에디터를 봅니다
  const editorRef = useRef<TiptapEditor | null>(null);

  const editor = useEditor({
    immediatelyRender: false, // 서버 렌더와 어긋나지 않게
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        link: { openOnClick: false, autolink: true },
      }),
      Image,
      Placeholder.configure({ placeholder: "본문을 입력하세요. 붙여넣기도 됩니다." }),
    ],
    content: initialContent,
    editorProps: {
      attributes: { class: "article-body admin-editor-body" },
      // 이미지 파일을 끌어다 놓거나 붙여넣으면 바로 올립니다
      handleDrop: (_view, event) => {
        const file = event.dataTransfer?.files?.[0];
        if (!file?.type.startsWith("image/")) return false;
        event.preventDefault();
        void insertFile(file);
        return true;
      },
      handlePaste: (_view, event) => {
        const file = event.clipboardData?.files?.[0];
        if (!file?.type.startsWith("image/")) return false;
        event.preventDefault();
        void insertFile(file);
        return true;
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  useEffect(() => {
    editorRef.current = editor;
  }, [editor]);

  async function insertFile(file: File) {
    const editor = editorRef.current;
    if (!editor) return;
    try {
      setUploading(true);
      const src = await uploadImage(file);
      editor.chain().focus().setImage({ src, alt: "" }).run();
    } catch (err) {
      alert(err instanceof Error ? err.message : "이미지 업로드에 실패했습니다.");
    } finally {
      setUploading(false);
    }
  }

  if (!editor) {
    return <div className="h-[460px] animate-pulse rounded-xl border border-ink-900/10 bg-cream-100" />;
  }

  const setLink = () => {
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("링크 주소 (사이트 안이면 /insight 처럼 /로 시작)", prev || "https://");
    if (url === null) return;
    if (url.trim() === "") {
      editor.chain().focus().unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url.trim() }).run();
  };

  const c = () => editor.chain().focus();

  return (
    <div className="rounded-xl border border-ink-900/15 bg-white">
      <div className="sticky top-14 z-10 flex flex-wrap items-center gap-0.5 rounded-t-xl border-b border-ink-900/10 bg-cream-50 p-1.5">
        <Btn title="소제목" active={editor.isActive("heading", { level: 2 })} onClick={() => c().toggleHeading({ level: 2 }).run()}>
          소제목
        </Btn>
        <Btn title="작은 소제목" active={editor.isActive("heading", { level: 3 })} onClick={() => c().toggleHeading({ level: 3 }).run()}>
          작은 소제목
        </Btn>
        <Sep />
        <Btn title="굵게" active={editor.isActive("bold")} onClick={() => c().toggleBold().run()}>
          <b>B</b>
        </Btn>
        <Btn title="기울임" active={editor.isActive("italic")} onClick={() => c().toggleItalic().run()}>
          <i className="font-serif">I</i>
        </Btn>
        <Sep />
        <Btn title="글머리 목록" active={editor.isActive("bulletList")} onClick={() => c().toggleBulletList().run()}>
          • 목록
        </Btn>
        <Btn title="번호 목록" active={editor.isActive("orderedList")} onClick={() => c().toggleOrderedList().run()}>
          1. 목록
        </Btn>
        <Btn title="인용" active={editor.isActive("blockquote")} onClick={() => c().toggleBlockquote().run()}>
          “ 인용
        </Btn>
        <Btn title="구분선" onClick={() => c().setHorizontalRule().run()}>
          ─
        </Btn>
        <Sep />
        <Btn title="링크" active={editor.isActive("link")} onClick={setLink}>
          링크
        </Btn>
        <Btn title="이미지 넣기" disabled={uploading} onClick={() => fileRef.current?.click()}>
          {uploading ? "올리는 중…" : "이미지"}
        </Btn>
        <Sep />
        <Btn title="실행 취소" disabled={!editor.can().undo()} onClick={() => c().undo().run()}>
          되돌리기
        </Btn>
        <Btn title="다시 실행" disabled={!editor.can().redo()} onClick={() => c().redo().run()}>
          다시
        </Btn>
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            e.target.value = "";
            if (file) void insertFile(file);
          }}
        />
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
