"use client";

import Link from "next/link";
import { useActionState, useEffect, useId, useRef, useState } from "react";
import { IconBox, Button } from "@/components/ui";
import { DIAGNOSIS_QUESTIONS } from "@/content/diagnosis";
import { CONTACT_INITIAL } from "@/lib/contact";
import { submitDiagnosis } from "@/app/diagnosis/actions";

/**
 * 무료 병원 진단 — 카드 하나.
 *
 * 5개 문항 → 병원 정보 입력 → 접수. 전 사이트의 CTA가 여기 하나로 모이므로
 * 실제로 접수되어야 합니다. 응답은 hidden 필드로 함께 전송되어
 * 담당 플래너가 연락 전에 병원 상태를 먼저 봅니다.
 *
 * 인트로 단계는 없습니다 — 이 카드를 감싼 페이지가 곧 인트로입니다.
 * 방문자는 도착하자마자 1번 문항을 봅니다. 바깥 섹션·여백은 페이지가 책임집니다.
 */

const QUESTIONS = DIAGNOSIS_QUESTIONS;
const TOTAL = QUESTIONS.length + 1; // + 정보 입력

export function DiagnosisFlow() {
  const [step, setStep] = useState(1); // 1..5 = 문항, 6 = 정보 입력
  const [answers, setAnswers] = useState<string[]>([]);
  const [state, formAction, pending] = useActionState(submitDiagnosis, CONTACT_INITIAL);

  const mountedAt = useRef(0);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const uid = useId();

  const fieldId = (n: string) => `${uid}-${n}`;
  const errId = (n: string) => `${uid}-${n}-error`;
  const err = (n: string) => state.errors?.[n]?.[0];
  const val = (n: string) => state.values?.text[n] ?? "";

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (state.status === "error") errorRef.current?.focus();
  }, [state]);

  const action = (fd: FormData) => {
    fd.set("elapsed", mountedAt.current ? String(Date.now() - mountedAt.current) : "0");
    return formAction(fd);
  };

  const choose = (index: number, choice: string) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = `${QUESTIONS[index].area}|${choice}`;
      return next;
    });
    setStep(index + 2); // 다음 문항 (마지막이면 정보 입력)
  };

  const done = state.status === "success";
  const isForm = step === TOTAL;
  const progress = done ? 100 : Math.round(((step - 1) / TOTAL) * 100);

  return (
    <div className="diagnosis-card" id="form">
      {/* 진행률 */}
      <div className="label label-ko flex justify-between">
        <span>{done ? "접수 완료" : `${Math.min(step, TOTAL)} / ${TOTAL} 단계`}</span>
        <span className="tnum">{progress}%</span>
      </div>
      <div className="mt-3 h-1 w-full bg-ink-900/12">
        <div
          className="h-full bg-forest-800 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-8">
        {/* ── 문항 1~5 ── */}
        {!done && !isForm && (
          <div>
            <p className="label label-ko">
              <span className="tnum">{String(step).padStart(2, "0")}</span> —{" "}
              {QUESTIONS[step - 1].area}
            </p>
            <h2 className="display-ko mt-4 text-xl leading-snug md:text-2xl">
              {QUESTIONS[step - 1].q}
            </h2>

            <div className="mt-7 space-y-3">
              {QUESTIONS[step - 1].options.map((o) => {
                const picked = answers[step - 1]?.split("|")[1] === o;
                return (
                  <button
                    key={o}
                    type="button"
                    onClick={() => choose(step - 1, o)}
                    aria-pressed={picked}
                    className={`flex w-full items-center gap-4 border px-5 py-4 text-left transition-colors ${
                      picked
                        ? "border-forest-800 bg-cream-50"
                        : "border-ink-900/15 hover:border-forest-800 hover:bg-cream-50"
                    }`}
                  >
                    <span
                      className={`h-4 w-4 shrink-0 rounded-full border ${
                        picked ? "border-[5px] border-forest-800" : "border-ink-900/25"
                      }`}
                    />
                    <span className="prose-ko text-sm text-ink-700 md:text-[15px]">{o}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-7 flex justify-between">
              {step > 1 ? (
                <button type="button" onClick={() => setStep(step - 1)} className="label label-ko">
                  ← 이전
                </button>
              ) : (
                <span />
              )}
              <button type="button" onClick={() => setStep(step + 1)} className="label label-ko">
                건너뛰기 →
              </button>
            </div>
          </div>
        )}

        {/* ── 병원 정보 입력 ── */}
        {!done && isForm && (
          <form action={action} noValidate>
            <p className="label label-ko">마지막 단계</p>
            <h2 className="mt-4 text-xl font-medium md:text-2xl">
              결과를 받아보실 정보를 입력해주세요.
            </h2>

            {/* 응답을 함께 전송 — 담당자가 연락 전에 상태를 먼저 봅니다 */}
            {answers.filter(Boolean).map((a) => (
              <input key={a} type="hidden" name="answers" value={a} readOnly />
            ))}

            {/* 봇 트랩 — 사람에게는 보이지 않습니다 */}
            <div className="absolute h-0 w-0 overflow-hidden" aria-hidden>
              <label>
                이 항목은 비워두세요
                <input type="text" name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            {state.status === "error" && (
              <p
                ref={errorRef}
                tabIndex={-1}
                role="alert"
                className="mt-6 border-l-2 border-forest-800 bg-cream-50 py-3 pl-4 text-sm text-ink-900"
              >
                {state.message}
              </p>
            )}

            <div className="mt-7 space-y-5">
              {(
                [
                  { name: "clinic", label: "병원명", type: "text", ac: "organization" },
                  { name: "department", label: "진료과목", type: "text", ac: "off" },
                  { name: "name", label: "담당자명", type: "text", ac: "name" },
                  { name: "phone", label: "연락처", type: "tel", ac: "tel" },
                  { name: "email", label: "이메일", type: "email", ac: "email" },
                ] as const
              ).map((f) => (
                <div key={f.name}>
                  <label htmlFor={fieldId(f.name)} className="label label-ko">
                    {f.label} <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id={fieldId(f.name)}
                    name={f.name}
                    type={f.type}
                    required
                    autoComplete={f.ac}
                    defaultValue={val(f.name)}
                    aria-invalid={!!err(f.name)}
                    aria-describedby={err(f.name) ? errId(f.name) : undefined}
                    className="mt-2 block h-11 w-full border border-ink-900/15 bg-cream-50 px-3.5 text-sm text-ink-900 transition-colors outline-none focus:border-forest-800"
                  />
                  {err(f.name) && (
                    <p id={errId(f.name)} className="mt-2 text-sm text-ink-900">
                      {err(f.name)}
                    </p>
                  )}
                </div>
              ))}

              <div>
                <label className="flex cursor-pointer items-start gap-3 pt-2">
                  <input
                    type="checkbox"
                    name="consent"
                    aria-invalid={!!err("consent")}
                    className="mt-0.5 h-[18px] w-[18px] shrink-0 accent-forest-800"
                  />
                  <span className="text-sm leading-relaxed text-ink-700">
                    개인정보 수집·이용에 동의합니다.{" "}
                    <Link href="/privacy" className="underline underline-offset-2">
                      전문보기
                    </Link>
                  </span>
                </label>
                {err("consent") && (
                  <p className="mt-2 text-sm text-ink-900">{err("consent")}</p>
                )}
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="label label-ko"
              >
                ← 이전
              </button>
              <button type="submit" disabled={pending} className="disabled:opacity-50">
                <Button>{pending ? "접수 중…" : "진단 신청하기"}</Button>
              </button>
            </div>
          </form>
        )}

        {/* ── 접수 완료 ── */}
        {done && (
          <div className="text-center" role="status">
            <div className="flex justify-center">
              <IconBox size={56} />
            </div>
            <h2 className="mt-6 text-2xl font-light md:text-3xl">
              진단 신청이 접수되었습니다.
            </h2>
            <p className="mt-4 text-sm text-ink-500">
              담당 플래너가 영업일 기준 1일 내에 연락드립니다.
            </p>
            {state.message?.includes("개발 모드") && (
              <p className="label label-ko mt-4 text-ink-500!">{state.message}</p>
            )}

            {/* 무엇을 보내셨는지 그대로 돌려드립니다 */}
            {answers.filter(Boolean).length > 0 && (
              <ul className="mt-10 border-t border-ink-900/15 text-left">
                {answers.filter(Boolean).map((a) => {
                  const [area, choice] = a.split("|");
                  return (
                    <li
                      key={a}
                      className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-ink-900/15 py-4"
                    >
                      <span className="label label-ko">{area}</span>
                      <span className="text-sm text-ink-700">{choice}</span>
                    </li>
                  );
                })}
              </ul>
            )}

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link href="/">
                <Button variant="outline">홈으로</Button>
              </Link>
              <Link href="/insight">
                <Button>읽을거리 보기</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
