import "server-only";
import type { PostBoard } from "@prisma/client";
import { prisma, hasDb } from "./db";
import { stripHtml, makeExcerpt } from "./sanitize";
import { ARTICLES, articleDate, articleHtml } from "@/content/articles";

/**
 * 인사이트 글 피드 — 공개 페이지 · 메인 · 사이트맵 · RSS 가 모두 여기서 읽습니다.
 *
 * DB에 글이 한 편이라도 있으면 DB가 정본입니다. (관리자 → "기존 글 가져오기"로 옮긴 뒤부터)
 * DB가 없거나, 비어 있거나, 연결이 끊기면 content/articles.ts 의 정적 글로 대신합니다 —
 * 어떤 경우에도 인사이트 페이지가 비거나 500이 나지 않게 하기 위함입니다.
 */

export const BOARDS = {
  COLUMN: { path: "/insight/column", label: "칼럼" },
  BLOG: { path: "/insight/blog", label: "블로그" },
  NOTICE: { path: "/insight/notice", label: "공지사항" },
} as const satisfies Record<PostBoard, { path: string; label: string }>;

export type BoardPath = (typeof BOARDS)[PostBoard]["path"];

export const boardByPath = (path: string) =>
  (Object.keys(BOARDS) as PostBoard[]).find((b) => BOARDS[b].path === path);

export type FeedPost = {
  /** DB 글이면 id, 정적 글이면 null */
  id: number | null;
  board: PostBoard;
  list: BoardPath;
  category: string;
  slug: string;
  title: string;
  excerpt: string;
  html: string;
  thumbnail: string | null;
  publishedAt: Date;
  /** "2026.08.29" — 화면 표기 */
  date: string;
  minutes: number;
};

/** 한국 시간 기준 "YYYY.MM.DD" */
export function dotDate(d: Date) {
  const kst = new Date(d.getTime() + 9 * 3600_000);
  return kst.toISOString().slice(0, 10).replace(/-/g, ".");
}

/** 한글 기준 분당 500자 */
export const minutesFor = (html: string) => Math.max(1, Math.round(stripHtml(html).length / 500));

const STATIC: FeedPost[] = ARTICLES.map((a) => {
  const board: PostBoard = a.list === "/insight/blog" ? "BLOG" : "COLUMN";
  const html = articleHtml(a);
  return {
    id: null,
    board,
    list: BOARDS[board].path,
    category: BOARDS[board].label,
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    html,
    thumbnail: null,
    publishedAt: articleDate(a),
    date: a.date,
    minutes: minutesFor(html),
  };
}).sort((a, b) => +b.publishedAt - +a.publishedAt);

type Row = {
  id: number;
  board: PostBoard;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  thumbnailUrl: string | null;
  publishedAt: Date | null;
  createdAt: Date;
};

function fromRow(r: Row): FeedPost {
  const publishedAt = r.publishedAt ?? r.createdAt;
  return {
    id: r.id,
    board: r.board,
    list: BOARDS[r.board].path,
    category: BOARDS[r.board].label,
    slug: r.slug,
    title: r.title,
    excerpt: makeExcerpt(r.excerpt, r.content),
    html: r.content,
    thumbnail: r.thumbnailUrl,
    publishedAt,
    date: dotDate(publishedAt),
    minutes: minutesFor(r.content),
  };
}

/** DB를 정본으로 써도 되는지 — 연결되고, 글이 한 편 이상 있을 때 */
async function dbInUse() {
  if (!hasDb()) return false;
  try {
    return (await prisma.post.count()) > 0;
  } catch (e) {
    console.error("[cms] DB 연결 실패 — 정적 글로 대신합니다:", e);
    return false;
  }
}

/** 발행된 글 — 최신순. board 를 주면 그 게시판만 */
export async function getFeed(board?: PostBoard): Promise<FeedPost[]> {
  if (await dbInUse()) {
    try {
      const rows = await prisma.post.findMany({
        where: { status: "PUBLISHED", ...(board ? { board } : {}) },
        orderBy: { publishedAt: "desc" },
      });
      return rows.map(fromRow);
    } catch (e) {
      console.error("[cms] 글 목록 조회 실패:", e);
    }
  }
  return board ? STATIC.filter((p) => p.board === board) : STATIC;
}

/** 공개 상세 — 발행된 글만 */
export async function getPost(board: PostBoard, slug: string): Promise<FeedPost | null> {
  if (await dbInUse()) {
    try {
      const row = await prisma.post.findFirst({ where: { board, slug, status: "PUBLISHED" } });
      return row ? fromRow(row) : null;
    } catch (e) {
      console.error("[cms] 글 조회 실패:", e);
    }
  }
  return STATIC.find((p) => p.board === board && p.slug === slug) ?? null;
}

/** 조회수 +1 — 실패해도 페이지에는 영향 없음 */
export async function countView(id: number | null) {
  if (id === null || !hasDb()) return;
  await prisma.post.update({ where: { id }, data: { viewCount: { increment: 1 } } }).catch(() => {});
}

/** "기존 글 가져오기" 용 — 정적 글 원본 */
export const STATIC_POSTS = STATIC;
