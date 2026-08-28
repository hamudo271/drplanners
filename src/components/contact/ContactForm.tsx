"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef, useId } from "react";
import { submitContact } from "@/app/contact/actions";
import { CONTACT_INITIAL, INTERESTS } from "@/lib/contact";
import { Button, IconBox } from "@/components/ui";

const TEXT_FIELDS = [
  { name: "clinic", label: "병원명", required: true, autoComplete: "organization" },
  { name: "department", label: "진료과목", required: true, autoComplete: "off" },
  { name: "name", label: "담당자명", required: true, autoComplete: "name" },
  { name: "title", label: "직함", required: false, autoComplete: "organization-title" },
] as const;

const CONTACT_FIELDS = [
  { name: "phone", label: "연락처", type: "tel", autoComplete: "tel", placeholder: "02-1234-5678" },
  { name: "email", label: "이메일", type: "email", autoComplete: "email", placeholder: "name@clinic.co.kr" },
] as const;

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, CONTACT_INITIAL);
  const mountedAt = useRef(0);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const uid = useId();

  const fieldId = (n: string) => `${uid}-${n}`;
  const errId = (n: string) => `${uid}-${n}-error`;
  const err = (n: string) => state.errors?.[n]?.[0];
  const val = (n: string) => state.values?.text[n] ?? "";

  // 마운트 시각 기록 (렌더 중 Date.now() 호출 금지)
  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  // 제출 실패 시 에러 요약으로 포커스 이동
  useEffect(() => {
    if (state.status === "error") errorRef.current?.focus();
  }, [state]);

  // 봇 판별용 경과시간을 붙여서 전송
  const action = (fd: FormData) => {
    fd.set("elapsed", mountedAt.current ? String(Date.now() - mountedAt.current) : "0");
    return formAction(fd);
  };

  /* ── 접수 완료 ── */
  if (state.status === "success") {
    return (
      <div className="border border-ink-900/15 p-10 text-center" role="status">
        <div className="flex justify-center">
          <IconBox size={48} />
        </div>
        <h2 className="mt-6 text-2xl font-light">문의가 접수되었습니다.</h2>
        <p className="mt-4 text-sm text-ink-500">
          담당 플래너가 영업일 기준 1일 내에 연락드립니다.
        </p>
        {state.message?.includes("개발 모드") && (
          <p className="label mt-4 text-ink-500!">{state.message}</p>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/">
            <Button variant="outline">홈으로</Button>
          </Link>
          <Link href="/diagnosis">
            <Button>병원 진단 받아보기</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form action={action} noValidate className="space-y-6">
      {/* 봇 트랩 — 사람에게는 보이지 않습니다 */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          웹사이트
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {/* 에러 요약 */}
      <p
        ref={errorRef}
        tabIndex={-1}
        aria-live="polite"
        className={
          state.status === "error"
            ? "border border-ink-900 bg-cream-50 px-4 py-3 text-sm outline-none"
            : "sr-only"
        }
      >
        {state.status === "error" ? state.message : ""}
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        {TEXT_FIELDS.map((f) => (
          <Field
            key={f.name}
            id={fieldId(f.name)}
            errorId={errId(f.name)}
            label={f.label}
            required={f.required}
            error={err(f.name)}
          >
            <input
              id={fieldId(f.name)}
              name={f.name}
              type="text"
              defaultValue={val(f.name)}
              autoComplete={f.autoComplete}
              aria-invalid={!!err(f.name)}
              aria-describedby={err(f.name) ? errId(f.name) : undefined}
              className={inputCls(!!err(f.name))}
            />
          </Field>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {CONTACT_FIELDS.map((f) => (
          <Field
            key={f.name}
            id={fieldId(f.name)}
            errorId={errId(f.name)}
            label={f.label}
            required
            error={err(f.name)}
          >
            <input
              id={fieldId(f.name)}
              name={f.name}
              type={f.type}
              inputMode={f.type === "tel" ? "tel" : "email"}
              placeholder={f.placeholder}
              defaultValue={val(f.name)}
              autoComplete={f.autoComplete}
              aria-invalid={!!err(f.name)}
              aria-describedby={err(f.name) ? errId(f.name) : undefined}
              className={inputCls(!!err(f.name))}
            />
          </Field>
        ))}
      </div>

      {/* 관심 솔루션 */}
      <fieldset>
        <legend className="label">관심 솔루션 (중복 선택)</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {INTERESTS.map((t) => (
            <label
              key={t}
              className="flex cursor-pointer items-center gap-2 border border-ink-900/15 px-4 py-2 text-xs text-ink-500 has-checked:border-ink-900 has-checked:bg-forest-800 has-checked:text-white"
            >
              <input
                type="checkbox"
                name="interests"
                value={t}
                defaultChecked={state.values?.interests.includes(t)}
                className="sr-only"
              />
              {t}
            </label>
          ))}
        </div>
      </fieldset>

      {/* 문의 내용 */}
      <Field
        id={fieldId("message")}
        errorId={errId("message")}
        label="문의 내용"
        required
        error={err("message")}
      >
        <textarea
          id={fieldId("message")}
          name="message"
          rows={7}
          defaultValue={val("message")}
          placeholder="병원 상황과 궁금한 점을 자유롭게 적어주세요."
          aria-invalid={!!err("message")}
          aria-describedby={err("message") ? errId("message") : undefined}
          className={`${inputCls(!!err("message"))} resize-y py-3 leading-relaxed`}
        />
      </Field>

      {/* 동의 */}
      <div>
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            name="consent"
            aria-invalid={!!err("consent")}
            aria-describedby={err("consent") ? errId("consent") : undefined}
            className="mt-0.5 h-4 w-4 shrink-0 accent-forest-800"
          />
          <span className="text-xs text-ink-500">
            개인정보 수집·이용에 동의합니다. <u>전문보기</u>
          </span>
        </label>
        {err("consent") && (
          <p id={errId("consent")} className="mt-2 text-xs text-ink-900">
            {err("consent")}
          </p>
        )}
      </div>

      <button type="submit" disabled={pending} className="disabled:opacity-50">
        <Button>{pending ? "접수 중…" : "문의 접수하기"}</Button>
      </button>
    </form>
  );
}

function inputCls(hasError: boolean) {
  return [
    "mt-2 block h-11 w-full border bg-cream-50 px-3 text-sm",
    "focus:outline-none focus:ring-2 focus:ring-forest-800 focus:ring-offset-1",
    hasError ? "border-ink-900" : "border-ink-900/15",
  ].join(" ");
}

function Field({
  id,
  errorId,
  label,
  required,
  error,
  children,
}: {
  id: string;
  errorId: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="label">
        {label}
        {required && <span aria-hidden> *</span>}
        {required && <span className="sr-only"> (필수)</span>}
      </label>
      {children}
      {error && (
        <p id={errorId} className="mt-2 text-xs text-ink-900">
          {error}
        </p>
      )}
    </div>
  );
}
