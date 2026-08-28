"use client";

import Link from "next/link";
import { useState } from "react";
import { Container, IconBox, Button } from "@/components/ui";
import { DIAGNOSIS } from "@/content/home";
import { DIAGNOSIS_QUESTIONS } from "@/content/diagnosis";

/**
 * 템플릿 3 — 단계형 진단 플로우.
 * 5개 진단 항목 → 병원 정보 입력 → 접수 완료.
 * 와이어프레임 단계라 답변은 저장하지 않고 진행만 확인합니다.
 */

const QUESTION_STEPS = DIAGNOSIS.items; // 브랜드 / 검색 / 콘텐츠 / 광고 / AI 검색
const TOTAL = QUESTION_STEPS.length + 1; // + 정보 입력

export function DiagnosisFlow() {
  const [step, setStep] = useState(0); // 0 = 인트로
  const [done, setDone] = useState(false);

  const isIntro = step === 0;
  const isForm = step === TOTAL;
  const current = step; // 1..5 = 질문
  const progress = done ? 100 : Math.round((step / TOTAL) * 100);

  return (
    <section className="min-h-[80vh] bg-cream-50">
      <Container className="py-16 md:py-24">
        {/* 진행률 */}
        {!isIntro && (
          <div className="mx-auto mb-12 max-w-[680px]">
            <div className="label flex justify-between">
              <span>
                {done ? "완료" : `STEP ${Math.min(step, TOTAL)} / ${TOTAL}`}
              </span>
              <span>{progress}%</span>
            </div>
            <div className="mt-3 h-1 w-full bg-ink-900/12">
              <div
                className="h-full bg-forest-800 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="mx-auto max-w-[680px] border border-ink-900/15 bg-cream-100 p-8 md:p-12">
          {/* ── 인트로 ── */}
          {isIntro && !done && (
            <div className="text-center">
              <p className="label">{DIAGNOSIS.sub}</p>
              <h1 className="mt-5 text-3xl leading-tight font-light md:text-[40px]">
                {DIAGNOSIS.title.map((l) => (
                  <span key={l} className="block">{l}</span>
                ))}
              </h1>
              <p className="mt-5 text-sm text-ink-500">{DIAGNOSIS.body}</p>

              <div className="mt-10 grid grid-cols-2 gap-px border border-ink-900/15 bg-ink-900/12 sm:grid-cols-5">
                {QUESTION_STEPS.map((i) => (
                  <div key={i} className="flex flex-col items-center gap-3 bg-cream-100 p-4">
                    <IconBox size={28} />
                    <span className="text-[11px]">{i}</span>
                  </div>
                ))}
              </div>

              <p className="label mt-8">소요시간 약 3분 · 결과 즉시 확인</p>
              <button onClick={() => setStep(1)} className="mt-6">
                <Button>{DIAGNOSIS.cta}</Button>
              </button>
            </div>
          )}

          {/* ── 질문 1~5 ── */}
          {!done && !isIntro && !isForm && (
            <div>
              <p className="label">
                {String(current).padStart(2, "0")} — {QUESTION_STEPS[current - 1]}
              </p>
              <h2 className="display-ko mt-4 text-xl leading-snug md:text-2xl">
                {DIAGNOSIS_QUESTIONS[current - 1].q}
              </h2>

              <div className="mt-8 space-y-3">
                {DIAGNOSIS_QUESTIONS[current - 1].options.map((o) => (
                  <button
                    key={o}
                    onClick={() => setStep(step + 1)}
                    className="flex w-full items-center gap-4 border border-ink-900/15 px-5 py-4 text-left transition-colors hover:border-forest-800 hover:bg-cream-100"
                  >
                    <span className="h-4 w-4 shrink-0 rounded-full border border-ink-900/25" />
                    <span className="prose-ko text-sm text-ink-700">{o}</span>
                  </button>
                ))}
              </div>

              <div className="mt-8 flex justify-between">
                <button onClick={() => setStep(step - 1)} className="label">
                  ← 이전
                </button>
                <button onClick={() => setStep(step + 1)} className="label">
                  건너뛰기 →
                </button>
              </div>
            </div>
          )}

          {/* ── 병원 정보 입력 ── */}
          {!done && isForm && (
            <div id="form">
              <p className="label">마지막 단계</p>
              <h2 className="mt-4 text-xl font-medium md:text-2xl">
                결과를 받아보실 정보를 입력해주세요.
              </h2>

              <div className="mt-8 space-y-5">
                {["병원명", "진료과목", "담당자명", "연락처", "이메일"].map((f) => (
                  <label key={f} className="block">
                    <span className="label">{f}</span>
                    <span className="mt-2 block h-11 w-full border border-ink-900/15 bg-cream-50" />
                  </label>
                ))}
                <label className="flex items-start gap-3 pt-2">
                  <span className="mt-0.5 h-4 w-4 shrink-0 border border-ink-900/15" />
                  <span className="text-xs text-ink-500">
                    개인정보 수집·이용에 동의합니다. <u>전문보기</u>
                  </span>
                </label>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <button onClick={() => setStep(step - 1)} className="label">
                  ← 이전
                </button>
                <button onClick={() => setDone(true)}>
                  <Button>진단 결과 받기</Button>
                </button>
              </div>
            </div>
          )}

          {/* ── 완료 ── */}
          {done && (
            <div className="text-center">
              <div className="flex justify-center">
                <IconBox size={56} />
              </div>
              <h2 className="mt-6 text-2xl font-light md:text-3xl">
                진단이 접수되었습니다.
              </h2>
              <p className="mt-4 text-sm text-ink-500">
                담당 플래너가 영업일 기준 1일 내에 연락드립니다.
              </p>

              {/* 결과 요약 미리보기 */}
              <div className="mt-10 grid grid-cols-2 gap-px border border-ink-900/15 bg-ink-900/12 sm:grid-cols-5">
                {QUESTION_STEPS.map((i) => (
                  <div key={i} className="bg-cream-100 p-4">
                    <p className="text-xl font-medium">00</p>
                    <p className="label mt-1">{i}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex justify-center gap-3">
                <Link href="/">
                  <Button variant="outline">홈으로</Button>
                </Link>
                <Link href="/insight">
                  <Button>인사이트 보기</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
