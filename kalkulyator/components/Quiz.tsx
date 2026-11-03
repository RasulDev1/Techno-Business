"use client";

import { useState } from "react";
import { useQuiz } from "./QuizContext";
import {
  MODULE_OPTIONS,
  PLATFORM_OPTIONS,
  SLIDER_MAX,
  TEAM_OPTIONS,
  rub,
  type ModuleId,
  type PlatformId,
} from "@/lib/pricing";

const STEPS = [
  "Сколько сотрудников будут работать в системе?",
  "Какие модули вам реально нужны?",
  "Где должна работать система?",
  "Сколько вы платите за готовый софт сейчас?",
];

function Check({ on }: { on: boolean }) {
  return (
    <span
      className={`flex size-6 shrink-0 items-center justify-center rounded-md border-2 text-sm font-bold transition ${
        on ? "border-accent bg-accent text-white" : "border-line-strong bg-white text-transparent"
      }`}
      aria-hidden="true"
    >
      ✓
    </span>
  );
}

const optionCls = (on: boolean) =>
  `flex w-full items-center gap-3 rounded-xl border-2 p-4 text-left transition ${
    on ? "border-accent bg-accent-soft" : "border-line bg-white hover:border-line-strong"
  }`;

export default function Quiz() {
  const { answers, setAnswers, done, setDone } = useQuiz();
  const [step, setStep] = useState(0);

  const canNext =
    (step === 0 && answers.team !== null) ||
    (step === 1 && answers.modules.length > 0) ||
    (step === 2 && answers.platforms.length > 0) ||
    step === 3;

  const toggle = <T extends string>(list: T[], id: T) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);

  const next = () => {
    if (!canNext) return;
    if (step < STEPS.length - 1) setStep(step + 1);
    else {
      setDone(true);
      requestAnimationFrame(() => document.getElementById("result")?.scrollIntoView({ block: "start" }));
    }
  };

  const pct = Math.min(100, (answers.boxMonthly / SLIDER_MAX) * 100);

  return (
    <section id="calculator" className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
      <p className="text-sm font-bold uppercase tracking-wider text-accent">Калькулятор</p>
      <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">Соберите ТЗ за 1 минуту</h2>
      <p className="mt-3 text-muted">Отвечайте как есть — расчёт появится сразу, без ввода контактов.</p>

      <div className="mt-8 rounded-2xl border border-line bg-white p-5 shadow-[0_8px_24px_-12px_rgb(15_23_42/0.12)] sm:p-8">
        {/* Прогресс */}
        <div className="flex items-center justify-between text-sm font-semibold text-muted">
          <span>
            Шаг {step + 1} из {STEPS.length}
          </span>
          {done && <span className="text-good">Расчёт готов ✓</span>}
        </div>
        <div className="mt-2 grid grid-cols-4 gap-1.5" aria-hidden="true">
          {STEPS.map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition ${i <= step ? "bg-accent" : "bg-line"}`} />
          ))}
        </div>

        <fieldset key={step} className="animate-rise mt-6">
          <legend className="text-xl font-extrabold leading-snug sm:text-2xl">{STEPS[step]}</legend>

          {step === 0 && (
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {TEAM_OPTIONS.map((t) => {
                const on = answers.team === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => {
                      setAnswers((a) => ({ ...a, team: t.id }));
                      setTimeout(() => setStep(1), 180);
                    }}
                    className={`rounded-xl border-2 px-3 py-5 text-center transition ${
                      on ? "border-accent bg-accent-soft" : "border-line bg-white hover:border-line-strong"
                    }`}
                  >
                    <span className="block text-2xl font-extrabold">{t.label}</span>
                    <span className="mt-1 block text-sm text-muted">человек</span>
                  </button>
                );
              })}
            </div>
          )}

          {step === 1 && (
            <div className="mt-5 grid gap-3">
              {MODULE_OPTIONS.map((m) => {
                const on = answers.modules.includes(m.id);
                return (
                  <button
                    key={m.id}
                    type="button"
                    role="checkbox"
                    aria-checked={on}
                    onClick={() => setAnswers((a) => ({ ...a, modules: toggle<ModuleId>(a.modules, m.id) }))}
                    className={optionCls(on)}
                  >
                    <Check on={on} />
                    <span>
                      <span className="block font-bold">{m.label}</span>
                      <span className="block text-sm text-muted">{m.hint}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {step === 2 && (
            <div className="mt-5 grid gap-3">
              {PLATFORM_OPTIONS.map((p) => {
                const on = answers.platforms.includes(p.id);
                return (
                  <button
                    key={p.id}
                    type="button"
                    role="checkbox"
                    aria-checked={on}
                    onClick={() => setAnswers((a) => ({ ...a, platforms: toggle<PlatformId>(a.platforms, p.id) }))}
                    className={optionCls(on)}
                  >
                    <Check on={on} />
                    <span>
                      <span className="block font-bold">{p.label}</span>
                      <span className="block text-sm text-muted">{p.hint}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {step === 3 && (
            <div className="mt-6">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <label htmlFor="box-input" className="text-sm font-semibold text-muted">
                  Подписки на CRM, учёт, интеграции — в месяц
                </label>
                <div className="flex items-center gap-2 rounded-xl border-2 border-line bg-white px-3 py-2 focus-within:border-accent">
                  <input
                    id="box-input"
                    inputMode="numeric"
                    value={answers.boxMonthly ? new Intl.NumberFormat("ru-RU").format(answers.boxMonthly) : ""}
                    placeholder="0"
                    onChange={(e) => {
                      const n = Number(e.target.value.replace(/\D/g, "").slice(0, 8)) || 0;
                      setAnswers((a) => ({ ...a, boxMonthly: n }));
                    }}
                    className="w-28 bg-transparent text-right text-xl font-extrabold outline-none"
                  />
                  <span className="text-lg font-bold text-muted">₽/мес</span>
                </div>
              </div>
              <input
                type="range"
                className="range mt-6"
                min={0}
                max={SLIDER_MAX}
                step={1000}
                value={Math.min(answers.boxMonthly, SLIDER_MAX)}
                aria-label="Сумма подписки в месяц"
                style={{ ["--p" as string]: `${pct}%` }}
                onChange={(e) => setAnswers((a) => ({ ...a, boxMonthly: Number(e.target.value) }))}
              />
              <div className="mt-2 flex justify-between text-sm text-muted">
                <span>0 ₽</span>
                <span>{rub(50_000)}</span>
                <span>100 000+ ₽</span>
              </div>
              {answers.boxMonthly === 0 && (
                <p className="mt-4 rounded-lg bg-bg p-3 text-sm text-muted">
                  Пока не пользуетесь готовой системой? Сравним со средними тарифами коробочных CRM для вашей команды.
                </p>
              )}
            </div>
          )}
        </fieldset>

        <div className="mt-8 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setStep(Math.max(0, step - 1))}
            className={`rounded-xl px-4 py-3 font-semibold text-muted hover:bg-bg ${step === 0 ? "invisible" : ""}`}
          >
            ← Назад
          </button>
          <button
            type="button"
            onClick={next}
            disabled={!canNext}
            className="rounded-xl bg-accent px-6 py-3.5 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-line-strong"
          >
            {step === STEPS.length - 1 ? "Показать расчёт" : "Далее →"}
          </button>
        </div>
      </div>
    </section>
  );
}
