"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useQuiz } from "./QuizContext";
import { Arrow, Card } from "./Card";
import PaybackChart from "./PaybackChart";
import {
  BOX_YEARLY_INDEX,
  DEV_MONTHS,
  MODULE_OPTIONS,
  PLATFORM_OPTIONS,
  SLIDER_MAX,
  TEAM_OPTIONS,
  averageBox,
  compare,
  monthsWord,
  rub,
  type BoxCosts,
  type ModuleId,
  type PlatformId,
} from "@/lib/pricing";

const STEPS = [
  { q: "Сколько сотрудников будут работать в системе?", hint: "" },
  { q: "Какие модули вам реально нужны?", hint: "Можно выбрать несколько" },
  { q: "Где должна работать система?", hint: "Можно выбрать несколько" },
  { q: "Что ещё должна уметь система?", hint: "Необязательно. Опишите своими словами — учтём в смете" },
];

const fmt = (n: number) => new Intl.NumberFormat("ru-RU").format(n).replace(/ /g, " ");
const parseNum = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 9);
  return d ? Number(d) : null;
};

function Tick({ on, round }: { on: boolean; round?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`grid size-[22px] shrink-0 place-items-center border transition-colors duration-300 ${round ? "rounded-full" : "rounded-[7px]"} ${
        on ? "border-accent bg-accent text-white" : "border-line-strong bg-white/80 text-transparent"
      }`}
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12.5l4.5 4.5L19 7.5" />
      </svg>
    </span>
  );
}

function OptText({ title, hint }: { title: string; hint?: string }) {
  return (
    <span className="flex flex-col">
      <span className="text-[16px] font-semibold leading-snug text-ink">{title}</span>
      {hint && <span className="text-[14px] leading-snug text-faint">{hint}</span>}
    </span>
  );
}

function Money({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`whitespace-nowrap tabular-nums ${className}`}>{children}</span>;
}

/* ───────────── Квиз ───────────── */

function Quiz() {
  const { answers, setAnswers, setDone } = useQuiz();
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const last = STEPS.length - 1;

  const toggle = <T extends string>(list: T[], id: T) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);

  const valid =
    (step === 0 && answers.team !== null) || (step === 1 && answers.modules.length > 0) || (step === 2 && answers.platforms.length > 0) || step === 3;

  const next = () => {
    if (!valid) {
      setError(step === 0 ? "Выберите вариант" : "Выберите хотя бы один вариант");
      return;
    }
    setError("");
    if (step < last) setStep(step + 1);
    else {
      setDone(true);
      requestAnimationFrame(() => document.getElementById("price")?.scrollIntoView({ behavior: "smooth", block: "start" }));
    }
  };

  return (
    <Card id="calculator">
      <div className="flex flex-col gap-9 px-6 pb-8 pt-8 sm:px-12 sm:pb-11 sm:pt-11">
        <div className="flex flex-col gap-4">
          <div className="h-[2px] w-full overflow-hidden rounded-full bg-accent/10" role="progressbar" aria-label="Прогресс" aria-valuemin={0} aria-valuemax={STEPS.length} aria-valuenow={step + 1}>
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#7a9bff] via-accent to-[#7a5cff] shadow-[0_0_10px_rgb(31_63_209/.5)] transition-[width] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
            />
          </div>
          <p className="m-0 text-[13px] font-medium uppercase tabular-nums tracking-[0.14em] text-faint">
            Шаг {step + 1} из {STEPS.length}
          </p>
        </div>

        <div key={step} className="step-in flex flex-col gap-5">
          <div>
            <h3 className="m-0 text-[22px] font-semibold leading-[1.25] tracking-[-0.02em] sm:text-[26px]">{STEPS[step].q}</h3>
            {STEPS[step].hint && <p className="m-0 mt-1.5 text-[15px] text-faint">{STEPS[step].hint}</p>}
          </div>

          {step === 0 && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {TEAM_OPTIONS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  aria-pressed={answers.team === t.id}
                  className="opt flex-col !items-center !gap-0 !py-5 text-center"
                  onClick={() => {
                    setAnswers((a) => ({ ...a, team: t.id }));
                    setError("");
                    setTimeout(() => setStep(1), 220);
                  }}
                >
                  <span className="text-[24px] font-semibold tracking-[-0.02em] text-ink">{t.label}</span>
                  <span className="text-[14px] text-faint">человек</span>
                </button>
              ))}
            </div>
          )}

          {step === 1 && (
            <div className="grid gap-2.5">
              {MODULE_OPTIONS.map((m) => {
                const on = answers.modules.includes(m.id);
                return (
                  <button key={m.id} type="button" role="checkbox" aria-checked={on} className="opt"
                    onClick={() => { setAnswers((a) => ({ ...a, modules: toggle<ModuleId>(a.modules, m.id) })); setError(""); }}>
                    <Tick on={on} />
                    <OptText title={m.label} hint={m.hint} />
                  </button>
                );
              })}
            </div>
          )}

          {step === 2 && (
            <div className="grid gap-2.5">
              {PLATFORM_OPTIONS.map((p) => {
                const on = answers.platforms.includes(p.id);
                return (
                  <button key={p.id} type="button" role="checkbox" aria-checked={on} className="opt"
                    onClick={() => { setAnswers((a) => ({ ...a, platforms: toggle<PlatformId>(a.platforms, p.id) })); setError(""); }}>
                    <Tick on={on} />
                    <OptText title={p.label} hint={p.hint} />
                  </button>
                );
              })}
            </div>
          )}

          {step === 3 && (
            <div className="fw">
              <textarea
                id="wishes"
                className="field min-h-[130px] resize-none"
                placeholder="Например: заявки из Instagram и Авито сразу в CRM, напоминания клиентам в WhatsApp, отчёт владельцу в Telegram каждое утро"
                value={answers.wishes}
                onChange={(e) => setAnswers((a) => ({ ...a, wishes: e.target.value.slice(0, 1000) }))}
              />
            </div>
          )}

          {error && <p role="alert" className="m-0 text-sm font-medium text-error">{error}</p>}
        </div>

        <div className="flex items-center justify-between gap-3">
          <button type="button" onClick={() => { setError(""); setStep(step - 1); }}
            className={`btn-back inline-flex cursor-pointer items-center gap-2 rounded-xl px-3 py-3.5 text-[15px] font-medium leading-none text-faint hover:text-accent ${step === 0 ? "invisible" : ""}`}>
            <span className="nudge"><Arrow dir="left" /></span>
            Назад
          </button>
          <button type="button" onClick={next}
            className="btn-primary inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-xl px-8 py-4 text-base font-semibold leading-none text-white max-sm:flex-1">
            {step < last ? "Далее" : "Рассчитать стоимость"}
            <span className="nudge"><Arrow /></span>
          </button>
        </div>
      </div>
    </Card>
  );
}

/* ───────────── Расчётная стоимость ───────────── */

function Price() {
  const { dev, answers } = useQuiz();
  return (
    <Card id="price" className="step-in px-6 py-8 sm:px-12 sm:py-11">
      <p className="m-0 text-[13px] font-medium uppercase tracking-[0.14em] text-faint">Расчётная стоимость вашего софта</p>
      <p className="m-0 mt-3 font-[family-name:var(--font-display)] text-[clamp(34px,7vw,52px)] font-medium leading-[1.05] tracking-[-0.02em] [font-variant-numeric:lining-nums]">
        <Money>от {rub(dev.devMin)}</Money> <span className="text-faint">до</span> <Money>{rub(dev.devMax)}</Money>
      </p>
      <p className="m-0 mt-3 text-[15px] text-muted">
        Оплата по этапам за ~{DEV_MONTHS} {monthsWord(DEV_MONTHS)}. После запуска — только хостинг и поддержка, около{" "}
        <Money className="font-semibold text-ink">{rub(dev.ownMonthly)}/мес</Money>. Без подписок и оплаты за пользователей.
      </p>

      <ul className="m-0 mt-7 flex list-none flex-col p-0">
        {dev.breakdown.map((b) => (
          <li key={b.label} className="flex items-baseline justify-between gap-4 border-b border-line py-3 text-[15px] last:border-0">
            <span className="text-ink">{b.label}</span>
            <Money className="text-muted">{fmt(b.min)}–{fmt(b.max)} ₽</Money>
          </li>
        ))}
      </ul>
      <p className="m-0 mt-4 text-[14px] text-faint">
        {answers.platforms.map((id) => PLATFORM_OPTIONS.find((p) => p.id === id)?.label).join(" · ")}
        {answers.wishes.trim() && " · ваши пожелания учтём в точной смете"}
      </p>
    </Card>
  );
}

/* ───────────── Сравнение с коробкой ───────────── */

function MoneyField({ id, label, hint, value, avg, onChange, suffix }: {
  id: string; label: string; hint: string; value: number | null; avg: number; suffix: string; onChange: (v: number | null) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[16px] font-semibold leading-snug">{label}</label>
      <span className="-mt-1 text-[14px] leading-snug text-faint">{hint}</span>
      <div className="fw">
        <input
          id={id}
          inputMode="numeric"
          className="field pr-24 text-[18px] tabular-nums"
          placeholder={`не знаю — возьмём ≈ ${fmt(avg)}`}
          value={value === null ? "" : fmt(value)}
          onChange={(e) => onChange(parseNum(e.target.value))}
        />
        <span className="pointer-events-none absolute inset-y-0 right-5 flex items-center text-[15px] text-faint">{suffix}</span>
      </div>
    </div>
  );
}

function Compare() {
  const { answers, dev, box, setBox, compared, setCompared, comparison: c } = useQuiz();
  const avg = averageBox(answers);
  const set = (k: keyof BoxCosts) => (v: number | null) => setBox((b) => ({ ...b, [k]: v }));
  const sub = box.subscription ?? 0;
  const pct = Math.min(100, (sub / SLIDER_MAX) * 100);

  const resultRef = useRef<HTMLDivElement>(null);
  const [scrollOnOpen, setScrollOnOpen] = useState(false);
  useEffect(() => {
    if (scrollOnOpen && compared) {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      setScrollOnOpen(false);
    }
  }, [scrollOnOpen, compared]);

  // Если окупаемость позже 30-го месяца — показываем 5 лет, чтобы было видно пересечение
  const horizon = c.breakEvenMonth && c.breakEvenMonth > 30 ? 60 : 36;
  const chart = horizon === 36 ? c : compare(answers, dev, box, horizon);

  return (
    <>
      <Card className="step-in px-6 py-8 sm:px-12 sm:py-11">
        <p className="m-0 text-[13px] font-medium uppercase tracking-[0.14em] text-faint">Сравнение</p>
        <h3 className="m-0 mt-2 text-[22px] font-semibold leading-[1.25] tracking-[-0.02em] sm:text-[26px]">
          Сколько вы тратите на готовую CRM сейчас?
        </h3>
        <p className="m-0 mt-1.5 text-[15px] text-faint">
          Впишите свои цифры — или оставьте пустыми, подставим средние по рынку для вашей команды.
        </p>

        <div className="mt-7 flex flex-col gap-7">
          <div className="flex flex-col gap-3">
            <MoneyField id="box-sub" label="Подписка на сервис" hint="Битрикс24, amoCRM, МойСклад и т.п. — за всех пользователей"
              value={box.subscription} avg={avg.subscription} suffix="₽/мес" onChange={set("subscription")} />
            <input
              type="range" className="range" min={0} max={SLIDER_MAX} step={1000}
              value={Math.min(sub, SLIDER_MAX)} aria-label="Подписка в месяц"
              style={{ ["--p" as string]: `${pct}%` }}
              onChange={(e) => set("subscription")(Number(e.target.value))}
            />
            <div className="flex justify-between text-[13px] text-faint"><span>0 ₽</span><span>50 000 ₽</span><span>100 000+ ₽</span></div>
          </div>
          <MoneyField id="box-int" label="Платные интеграции и виджеты" hint="Telegram, Авито, WhatsApp, телефония, 1С — приложения из маркетплейса"
            value={box.integrations} avg={avg.integrations} suffix="₽/мес" onChange={set("integrations")} />
          <MoneyField id="box-setup" label="Внедрение и настройка у интегратора" hint="Разово: воронки, поля, права, обучение, доработки"
            value={box.setup} avg={avg.setup} suffix="₽ разово" onChange={set("setup")} />
        </div>

        {!compared && (
          <div className="mt-8 flex justify-end">
            <button type="button" onClick={() => { setCompared(true); setScrollOnOpen(true); }}
              className="btn-primary inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-xl px-8 py-4 text-base font-semibold leading-none text-white max-sm:w-full">
              Сравнить со своим софтом
              <span className="nudge"><Arrow /></span>
            </button>
          </div>
        )}
      </Card>

      {compared && (
        <div ref={resultRef} className="step-in scroll-mt-6">
          <Card className="px-5 py-7 sm:px-10 sm:py-10">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-box-soft p-5">
                <p className="m-0 text-[14px] font-medium text-box">Готовая коробка за 3 года</p>
                <p className="m-0 mt-1 text-[30px] font-semibold tracking-[-0.02em] text-ink"><Money>{rub(c.box3y)}</Money></p>
                <p className="m-0 mt-2 text-[13px] leading-relaxed text-muted">
                  внедрение <Money>{rub(c.setup)}</Money> + подписка <Money>{rub(c.subscription)}/мес</Money> + интеграции{" "}
                  <Money>{rub(c.integrations)}/мес</Money>, тарифы дорожают ~{Math.round(BOX_YEARLY_INDEX * 100)}% в год
                </p>
              </div>
              <div className="rounded-2xl bg-accent-soft p-5">
                <p className="m-0 text-[14px] font-medium text-accent">Свой софт за 3 года</p>
                <p className="m-0 mt-1 text-[30px] font-semibold tracking-[-0.02em] text-ink"><Money>{rub(c.own3y)}</Money></p>
                <p className="m-0 mt-2 text-[13px] leading-relaxed text-muted">
                  разработка <Money>{rub(dev.devMid)}</Money> + хостинг и поддержка <Money>{rub(dev.ownMonthly)}/мес</Money>. Все интеграции вшиты, софт ваш навсегда
                </p>
              </div>
            </div>

            <div className="mt-6 mb-4 flex flex-wrap items-baseline justify-between gap-2">
              <h4 className="m-0 text-[20px] font-semibold tracking-[-0.02em]">График окупаемости</h4>
              {c.breakEvenMonth ? (
                <p className="m-0 text-[15px] font-semibold text-good">
                  Окупится за {c.breakEvenMonth} {monthsWord(c.breakEvenMonth)}
                  {c.savings3y > 0 && <> · экономия за 3 года <Money>{rub(c.savings3y)}</Money></>}
                </p>
              ) : (
                <p className="m-0 text-[15px] font-semibold text-muted">При таких затратах окупаемость дольше 5 лет — обсудим, что упростить</p>
              )}
            </div>
            <PaybackChart estimate={chart} />
            {c.estimated.length > 0 && (
              <p className="m-0 mt-3 text-[13px] text-faint">
                Где вы не указали сумму, взяли средние значения по рынку. Впишите свои цифры выше — график пересчитается сразу.
              </p>
            )}
          </Card>
        </div>
      )}
    </>
  );
}

export default function Calculator() {
  const { done } = useQuiz();
  return (
    <div className="mx-auto flex max-w-[760px] flex-col gap-5">
      <Quiz />
      {done && <Price />}
      {done && <Compare />}
    </div>
  );
}
