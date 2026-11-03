"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { calculate, type Estimate, type QuizAnswers } from "@/lib/pricing";

type Ctx = {
  answers: QuizAnswers;
  setAnswers: (fn: (a: QuizAnswers) => QuizAnswers) => void;
  done: boolean;
  setDone: (v: boolean) => void;
  estimate: Estimate;
};

const QuizCtx = createContext<Ctx | null>(null);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswersState] = useState<QuizAnswers>({
    team: null,
    modules: [],
    platforms: [],
    boxMonthly: 30_000,
  });
  const [done, setDone] = useState(false);
  const estimate = useMemo(() => calculate(answers), [answers]);
  const value = useMemo(
    () => ({ answers, setAnswers: (fn: (a: QuizAnswers) => QuizAnswers) => setAnswersState(fn), done, setDone, estimate }),
    [answers, done, estimate],
  );
  return <QuizCtx.Provider value={value}>{children}</QuizCtx.Provider>;
}

export function useQuiz() {
  const ctx = useContext(QuizCtx);
  if (!ctx) throw new Error("useQuiz outside QuizProvider");
  return ctx;
}
