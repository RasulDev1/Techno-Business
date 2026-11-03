"use client";

import { createContext, useContext, useMemo, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import { compare, estimateDev, type BoxCosts, type Comparison, type DevEstimate, type QuizAnswers } from "@/lib/pricing";

type Ctx = {
  answers: QuizAnswers;
  setAnswers: Dispatch<SetStateAction<QuizAnswers>>;
  /** Квиз пройден — показана расчётная стоимость */
  done: boolean;
  setDone: (v: boolean) => void;
  dev: DevEstimate;
  /** Затраты на коробку, которые ввёл человек */
  box: BoxCosts;
  setBox: Dispatch<SetStateAction<BoxCosts>>;
  /** Сравнение открыто (человек ввёл затраты и нажал «Сравнить») */
  compared: boolean;
  setCompared: (v: boolean) => void;
  comparison: Comparison;
};

const QuizCtx = createContext<Ctx | null>(null);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState<QuizAnswers>({ team: null, modules: [], platforms: [], wishes: "" });
  const [box, setBox] = useState<BoxCosts>({ subscription: null, integrations: null, setup: null });
  const [done, setDone] = useState(false);
  const [compared, setCompared] = useState(false);
  const dev = useMemo(() => estimateDev(answers), [answers]);
  const comparison = useMemo(() => compare(answers, dev, box), [answers, dev, box]);
  const value = useMemo(
    () => ({ answers, setAnswers, done, setDone, dev, box, setBox, compared, setCompared, comparison }),
    [answers, done, dev, box, compared, comparison],
  );
  return <QuizCtx.Provider value={value}>{children}</QuizCtx.Provider>;
}

export function useQuiz() {
  const ctx = useContext(QuizCtx);
  if (!ctx) throw new Error("useQuiz outside QuizProvider");
  return ctx;
}
