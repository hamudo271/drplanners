import Image from "next/image";
import type { ReactNode } from "react";

/* ─── 레이아웃 ────────────────────────────────────── */

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1400px] px-6 md:px-10 lg:px-14 ${className}`}>
      {children}
    </div>
  );
}

/**
 * 섹션. 시안의 "02 ── PROBLEM" 라벨을 그대로 재현합니다.
 * tone: cream(기본) / forest(딥그린 밴드) / paper(살짝 밝은 크림)
 */
export function Section({
  label,
  en,
  tone = "cream",
  children,
  className = "",
  id,
}: {
  /** 예전 "01 ──" 번호 — 더가든 문법에는 번호가 없어 표시하지 않습니다(호출부 호환용) */
  no?: string;
  label?: string;
  /** 괄호 영문 라벨 "( Process )" — 있으면 한글 라벨 대신 이걸 씁니다 */
  en?: string;
  tone?: "cream" | "forest" | "paper";
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  const tones = {
    cream: "bg-cream-100 text-ink-900",
    paper: "bg-cream-50 text-ink-900",
    forest: "bg-forest-900 text-cream-100",
  };
  const dark = tone === "forest";
  return (
    <section id={id} className={`sx ${tones[tone]} ${className}`}>
      <Container className="py-20 md:py-28 lg:py-32">
        {(en || label) && (
          <p className={`sx-cate ${en ? "" : "is-ko"} ${dark ? "is-dark" : ""}`} data-reveal>
            {en ? `( ${en} )` : label}
          </p>
        )}
        {children}
      </Container>
    </section>
  );
}

/* ─── 이미지 ──────────────────────────────────────── */

export function Media({
  label,
  ratio = "aspect-[16/9]",
  className = "",
  src,
  preload,
  sizes = "100vw",
  position = "object-center",
}: {
  label: string;
  ratio?: string;
  className?: string;
  src?: string;
  preload?: boolean;
  sizes?: string;
  position?: string;
}) {
  if (!src) {
    return (
      <div
        className={`${ratio} ${className} flex items-center justify-center bg-cream-200`}
      >
        <span className="label px-4 text-center">{label}</span>
      </div>
    );
  }
  return (
    <div
      className={`relative ${ratio} ${className} overflow-hidden bg-forest-900`}
      data-reveal="wipe"
    >
      <Image
        src={src}
        alt=""
        fill
        preload={preload}
        sizes={sizes}
        className={`object-cover ${position}`}
      />
    </div>
  );
}

/* ─── 텍스트 ──────────────────────────────────────── */

export function Eyebrow({
  children,
  dark = false,
}: {
  children: ReactNode;
  dark?: boolean;
}) {
  return <p className={`label ${dark ? "label-on-dark" : ""}`}>{children}</p>;
}

/** 한글 대형 헤드라인 */
export function H2({
  children,
  className = "",
  lines = false,
}: {
  children: ReactNode;
  className?: string;
  /** 줄 단위로 차례차례 올라오게 합니다 (자식이 <span class="block"> 구조일 때) */
  lines?: boolean;
}) {
  // 색은 섹션 글자색을 물려받습니다 — 어두운 판에서도 따로 지정할 필요가 없습니다
  return (
    <h2 className={`sx-h2 ${className}`} data-lines={lines ? "" : undefined}>
      {children}
    </h2>
  );
}

/** 영문 대형 헤드라인 — 트래킹 넓게 */
export function H2En({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`display-en text-[1.375rem] md:text-[1.75rem] lg:text-[2rem] ${className}`}
    >
      {children}
    </h2>
  );
}

/** 본문 더미 — 콘텐츠 미확정 구간에서만 사용 */
export function TextLines({ n = 3, className = "" }: { n?: number; className?: string }) {
  return (
    <div className={`space-y-2.5 ${className}`} aria-hidden>
      {Array.from({ length: n }).map((_, i) => (
        <div
          key={i}
          className="h-2.5 bg-ink-900/8"
          style={{ width: i === n - 1 ? "58%" : "100%" }}
        />
      ))}
    </div>
  );
}

/* ─── 버튼 ────────────────────────────────────────── */

export function Button({
  children,
  variant = "solid",
  className = "",
}: {
  children: ReactNode;
  variant?: "solid" | "outline" | "light" | "brass" | "cream";
  className?: string;
}) {
  const styles = {
    solid: "border-forest-800 bg-forest-800 text-cream-100 hover:bg-forest-700",
    outline: "border-ink-900/25 text-ink-900 hover:border-ink-900/60",
    light: "border-cream-100/40 text-cream-100 hover:border-cream-100",
    cream: "border-cream-100 bg-cream-100 text-forest-900 hover:border-cream-50 hover:bg-cream-50",
    brass: "border-brass-500 text-brass-400 hover:bg-brass-500 hover:text-forest-900",
  }[variant];

  return (
    <span
      className={`group/btn rounded-full inline-flex items-center gap-4 border px-8 py-4 text-sm tracking-[0.08em] transition-colors duration-300 ${styles} ${className}`}
    >
      {children}
      <span
        aria-hidden
        className="transition-transform duration-300 group-hover/btn:translate-x-1"
      >
        →
      </span>
    </span>
  );
}

/** 시안의 원형 화살표 버튼 */
export function CircleArrow({
  size = 44,
  dark = false,
}: {
  size?: number;
  dark?: boolean;
}) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${ dark ? "border-cream-100/40 text-cream-100 group-hover:bg-cream-100 group-hover:text-forest-900" : "border-ink-900/30 text-ink-900 group-hover:bg-ink-900 group-hover:text-cream-100" }`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      →
    </span>
  );
}

/** 브라스 헤어라인 아이콘 자리 — 시안 SIGNATURE 섹션 */
export function BrassIcon({ size = 40 }: { size?: number }) {
  return (
    <span
      className="relative inline-flex shrink-0 items-center justify-center"
      style={{ width: size, height: size }}
      aria-hidden
    >
      <span className="absolute inset-0 rotate-45 border border-brass-500/45" />
      <span className="h-1.5 w-1.5 rounded-full bg-brass-500" />
    </span>
  );
}

/** 이전 IconBox 호출부 호환 */
export function IconBox({ size = 40 }: { size?: number }) {
  return <BrassIcon size={size} />;
}
