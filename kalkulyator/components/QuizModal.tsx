"use client";

import { useEffect, useState, type ReactNode } from "react";
import { APPROX_STEP, CONTACT_STEP, QUIZ_LAST_QUESTION, RESULT_STEP, useQuiz } from "./QuizContext";
import { Arrow } from "./Card";
import PaybackChart from "./PaybackChart";
import {
  BOX_SETUP_RANGE_NOTE,
  DEV_MONTHS,
  MODULE_OPTIONS,
  PLATFORM_OPTIONS,
  SLIDER_MAX,
  TEAM_OPTIONS,
  monthsWord,
  rub,
  type ModuleId,
  type PlatformId,
} from "@/lib/pricing";

const QUESTIONS = [
  { q: "Сколько сотрудников будут работать в системе?", hint: "" },
  { q: "Какие модули вам реально нужны?", hint: "Можно выбрать несколько" },
  { q: "Где должна работать система?", hint: "Можно выбрать несколько" },
  { q: "Что ещё должна уметь система?", hint: "Необязательно. Опишите своими словами — учтём в смете" },
];
/** Прогресс показываем только по вопросам квиза, не по экранам результата/контактов */
const TOTAL_QUESTIONS = QUIZ_LAST_QUESTION + 1;

const fmt = (n: number) => new Intl.NumberFormat("ru-RU").format(n).replace(/ /g, " ");
const parseNum = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 9);
  return d ? Number(d) : null;
};

function formatPhone(raw: string) {
  let d = raw.replace(/\D/g, "");
  if (d.startsWith("8")) d = "7" + d.slice(1);
  if (d && !d.startsWith("7")) d = "7" + d;
  d = d.slice(0, 11);
  const p = d.slice(1);
  let out = "+7";
  if (p.length) out += " (" + p.slice(0, 3);
  if (p.length >= 3) out += ")";
  if (p.length > 3) out += " " + p.slice(3, 6);
  if (p.length > 6) out += "-" + p.slice(6, 8);
  if (p.length > 8) out += "-" + p.slice(8, 10);
  return d ? out : "";
}

function Tick({ on }: { on: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`grid size-[22px] shrink-0 place-items-center rounded-[7px] border transition-colors duration-300 ${
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

export default function QuizModal() {
  const { modalOpen, closeModal, step, setStep, answers, setAnswers } = useQuiz();
  const [error, setError] = useState("");

  // Esc закрывает попап, прокрутка страницы позади блокируется, пока он открыт
  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeModal();
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [modalOpen, closeModal]);

  if (!modalOpen) return null;

  const toggle = <T extends string>(list: T[], id: T) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);

  const questionValid =
    (step === 0 && answers.team !== null) ||
    (step === 1 && answers.modules.length > 0) ||
    (step === 2 && answers.platforms.length > 0) ||
    step === 3;

  const next = () => {
    if (!questionValid) {
      setError(step === 0 ? "Выберите вариант" : "Выберите хотя бы один вариант");
      return;
    }
    setError("");
    setStep(step + 1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true" aria-label="Калькулятор стоимости софта">
      <button
        type="button"
        aria-label="Закрыть"
        onClick={closeModal}
        className="absolute inset-0 cursor-default bg-[#0e1626]/55 backdrop-blur-sm"
      />
      <div className="step-in relative max-h-[92vh] w-full max-w-[560px] overflow-y-auto rounded-[22px] bg-[linear-gradient(145deg,rgba(255,255,255,.98)_0%,rgba(255,255,255,.6)_35%,rgba(180,192,225,.5)_70%,rgba(255,255,255,.95)_100%)] p-px shadow-card">
        <div className="relative rounded-[21px] bg-white/95 backdrop-blur-2xl backdrop-saturate-150">
          <button
            type="button"
            onClick={closeModal}
            aria-label="Закрыть калькулятор"
            className="absolute right-4 top-4 z-10 grid size-9 cursor-pointer place-items-center rounded-full text-faint hover:bg-bg hover:text-ink"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          <div className="flex flex-col gap-8 px-6 pb-8 pt-8 sm:px-10 sm:pb-11 sm:pt-11">
            {step <= QUIZ_LAST_QUESTION && (
              <>
                <div className="flex flex-col gap-4 pr-10">
                  <div className="h-[2px] w-full overflow-hidden rounded-full bg-accent/10" role="progressbar" aria-label="Прогресс" aria-valuemin={0} aria-valuemax={TOTAL_QUESTIONS} aria-valuenow={step + 1}>
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#7a9bff] via-accent to-[#7a5cff] shadow-[0_0_10px_rgb(31_63_209/.5)] transition-[width] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                      style={{ width: `${((step + 1) / TOTAL_QUESTIONS) * 100}%` }}
                    />
                  </div>
                  <p className="m-0 text-[13px] font-medium uppercase tabular-nums tracking-[0.14em] text-faint">
                    Шаг {step + 1} из {TOTAL_QUESTIONS}
                  </p>
                </div>

                <div key={step} className="step-in flex flex-col gap-5">
                  <div>
                    <h3 className="m-0 text-[22px] font-semibold leading-[1.25] tracking-[-0.02em] sm:text-[26px]">{QUESTIONS[step].q}</h3>
                    {QUESTIONS[step].hint && <p className="m-0 mt-1.5 text-[15px] text-faint">{QUESTIONS[step].hint}</p>}
                  </div>

                  {step === 0 && (
                    <div className="grid grid-cols-2 gap-3">
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
                    Далее
                    <span className="nudge"><Arrow /></span>
                  </button>
                </div>
              </>
            )}

            {step === APPROX_STEP && <ApproxResultStep onNext={() => setStep(CONTACT_STEP)} onBack={() => setStep(QUIZ_LAST_QUESTION)} />}
            {step === CONTACT_STEP && <ContactStep onBack={() => setStep(APPROX_STEP)} />}
            {step === RESULT_STEP && <ResultStep onClose={closeModal} />}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────── Примерный результат ───────────── */

function ApproxResultStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { dev } = useQuiz();
  return (
    <div className="step-in flex flex-col gap-7 pr-10">
      <div>
        <p className="m-0 text-[13px] font-medium uppercase tracking-[0.14em] text-faint">Ориентировочная стоимость вашего софта</p>
        <p className="m-0 mt-3 font-[family-name:var(--font-display)] text-[clamp(30px,7vw,44px)] font-medium leading-[1.05] tracking-[-0.02em] [font-variant-numeric:lining-nums]">
          <Money>от {rub(dev.devMin)}</Money> <span className="text-faint">до</span> <Money>{rub(dev.devMax)}</Money>
        </p>
        <p className="m-0 mt-3 text-[15px] text-muted">
          Это приблизительный диапазон по вашим ответам. Оставьте контакты — пришлём точную смету с разбивкой по модулям,
          сравнением с готовой коробкой и графиком окупаемости.
        </p>
      </div>

      <button type="button" onClick={onNext}
        className="btn-primary inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-xl px-8 py-4 text-base font-semibold leading-none text-white">
        Получить точную смету и график
        <span className="nudge"><Arrow /></span>
      </button>
      <button type="button" onClick={onBack} className="btn-back -mt-3 inline-flex cursor-pointer items-center gap-2 self-start text-[15px] font-medium text-faint hover:text-accent">
        <span className="nudge"><Arrow dir="left" /></span>
        Назад
      </button>
    </div>
  );
}

/* ───────────── Контакты ───────────── */

function ContactStep({ onBack }: { onBack: () => void }) {
  const { name, setName, phone, setPhone, boxMonthly, setBoxMonthly, submitContact } = useQuiz();
  const [error, setError] = useState("");
  const [pending, setPending] = useState<null | "wa" | "tg">(null);
  const pct = Math.min(100, ((boxMonthly ?? 0) / SLIDER_MAX) * 100);

  const go = (via: "wa" | "tg") => {
    setPending(via);
    const ok = submitContact(via);
    if (!ok) {
      setError("Проверьте имя и номер телефона");
      setPending(null);
    }
  };

  return (
    <div className="step-in flex flex-col gap-7 pr-10">
      <div>
        <h3 className="m-0 text-[22px] font-semibold leading-[1.25] tracking-[-0.02em] sm:text-[26px]">Куда прислать расчёт?</h3>
        <p className="m-0 mt-1.5 text-[15px] text-faint">Сразу после этого на экране появится стоимость разработки и график окупаемости.</p>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="lead-name" className="text-[16px] font-semibold leading-snug">Ваше имя</label>
          <div className="fw"><input id="lead-name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Как к вам обращаться" className="field" /></div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="lead-phone" className="text-[16px] font-semibold leading-snug">Номер телефона (WhatsApp / Telegram)</label>
          <div className="fw"><input id="lead-phone" type="tel" autoComplete="tel" inputMode="tel" value={phone} onChange={(e) => setPhone(formatPhone(e.target.value))} placeholder="+7 (___) ___-__-__" className="field" /></div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="box-monthly" className="text-[16px] font-semibold leading-snug">Сколько сейчас платите за готовый софт?</label>
          <span className="-mt-1 text-[14px] leading-snug text-faint">Необязательно. Подписка и платные интеграции вместе, ₽/мес</span>
          <div className="fw">
            <input id="box-monthly" inputMode="numeric" className="field pr-16 text-[18px] tabular-nums"
              placeholder="не знаю — учтём средний тариф" value={boxMonthly === null ? "" : fmt(boxMonthly)}
              onChange={(e) => setBoxMonthly(parseNum(e.target.value))} />
            <span className="pointer-events-none absolute inset-y-0 right-5 flex items-center text-[15px] text-faint">₽/мес</span>
          </div>
          <input type="range" className="range mt-1" min={0} max={SLIDER_MAX} step={1000}
            value={Math.min(boxMonthly ?? 0, SLIDER_MAX)} aria-label="Сколько сейчас платите за готовый софт в месяц"
            style={{ ["--p" as string]: `${pct}%` }} onChange={(e) => setBoxMonthly(Number(e.target.value))} />
        </div>
      </div>

      {error && <p role="alert" className="m-0 text-sm font-medium text-error">{error}</p>}

      <div className="flex flex-col gap-3">
        <button type="button" onClick={() => go("wa")} disabled={pending !== null}
          className="btn-primary inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-xl px-8 py-4 text-base font-semibold leading-none text-white disabled:cursor-progress disabled:opacity-65">
          Показать расчёт и получить смету
          <span className="nudge"><Arrow /></span>
        </button>
        <button type="button" onClick={() => go("tg")} disabled={pending !== null}
          className="btn-back cursor-pointer rounded-xl px-4 py-3 text-[15px] font-medium text-faint hover:text-accent disabled:opacity-65">
          Удобнее в Telegram
        </button>
      </div>
      <div className="flex items-center justify-between">
        <button type="button" onClick={onBack} className="btn-back inline-flex cursor-pointer items-center gap-2 text-[15px] font-medium text-faint hover:text-accent">
          <span className="nudge"><Arrow dir="left" /></span>
          Назад
        </button>
        <p className="m-0 text-[13px] text-faint">Нажимая кнопку, вы соглашаетесь на обработку персональных данных</p>
      </div>
    </div>
  );
}

/* ───────────── Результат ───────────── */

function ResultStep({ onClose }: { onClose: () => void }) {
  const { dev, answers, comparison: c, leadSent } = useQuiz();

  return (
    <div className="step-in flex flex-col gap-7 pr-10">
      {leadSent && (
        <p className="m-0 rounded-xl bg-good-soft px-4 py-3 text-[14px] font-medium text-good">
          {leadSent === "wa"
            ? "Открыли WhatsApp с готовым сообщением — осталось нажать «Отправить»."
            : "Скопировали сообщение и открыли Telegram — вставьте его в чат и отправьте."}
        </p>
      )}

      <div>
        <p className="m-0 text-[13px] font-medium uppercase tracking-[0.14em] text-faint">Расчётная стоимость вашего софта</p>
        <p className="m-0 mt-3 font-[family-name:var(--font-display)] text-[clamp(30px,7vw,44px)] font-medium leading-[1.05] tracking-[-0.02em] [font-variant-numeric:lining-nums]">
          <Money>от {rub(dev.devMin)}</Money> <span className="text-faint">до</span> <Money>{rub(dev.devMax)}</Money>
        </p>
        <p className="m-0 mt-3 text-[15px] text-muted">
          Оплата по этапам за ~{DEV_MONTHS} {monthsWord(DEV_MONTHS)}. После запуска — только хостинг и поддержка, около{" "}
          <Money className="font-semibold text-ink">{rub(dev.ownMonthly)}/мес</Money>.
        </p>
        <ul className="m-0 mt-5 flex list-none flex-col p-0">
          {dev.breakdown.map((b) => (
            <li key={b.label} className="flex items-baseline justify-between gap-4 border-b border-line py-2.5 text-[14px] last:border-0">
              <span className="text-ink">{b.label}</span>
              <Money className="text-muted">{fmt(b.min)}–{fmt(b.max)} ₽</Money>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl bg-bg/70 p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <p className="m-0 text-[13px] font-medium text-box">Готовая коробка за 3 года</p>
            <p className="m-0 mt-1 text-[24px] font-semibold tracking-[-0.02em] text-ink"><Money>{rub(c.box3y)}</Money></p>
            <p className="m-0 mt-1 text-[13px] leading-relaxed text-muted">
              включая внедрение у интегратора <Money>{rub(c.setup)}</Money> (в среднем по СНГ {BOX_SETUP_RANGE_NOTE})
            </p>
          </div>
          <div>
            <p className="m-0 text-[13px] font-medium text-accent">Свой софт за 3 года</p>
            <p className="m-0 mt-1 text-[24px] font-semibold tracking-[-0.02em] text-ink"><Money>{rub(c.own3y)}</Money></p>
            <p className="m-0 mt-1 text-[13px] leading-relaxed text-muted">разработка + хостинг и поддержка, без внедрения и подписок</p>
          </div>
        </div>

        <div className="mt-5 mb-3 flex flex-wrap items-baseline justify-between gap-2">
          <h4 className="m-0 text-[17px] font-semibold tracking-[-0.02em]">График окупаемости</h4>
          {c.breakEvenMonth ? (
            <p className="m-0 text-[14px] font-semibold text-good">
              Окупится за {c.breakEvenMonth} {monthsWord(c.breakEvenMonth)}
              {c.savings3y > 0 && <> · экономия <Money>{rub(c.savings3y)}</Money></>}
            </p>
          ) : (
            <p className="m-0 text-[14px] font-semibold text-muted">При таких затратах окупаемость дольше 5 лет</p>
          )}
        </div>
        <PaybackChart estimate={c} />
        {c.monthlyIsAverage && (
          <p className="m-0 mt-3 text-[13px] text-faint">Вы не указали, сколько платите сейчас — взяли средний тариф по рынку для вашей команды.</p>
        )}
      </div>

      {answers.wishes.trim() && <p className="m-0 text-[14px] text-faint">Ваши пожелания учтём в точной смете.</p>}

      <button type="button" onClick={onClose}
        className="btn-primary inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-xl px-8 py-4 text-base font-semibold leading-none text-white">
        Готово
      </button>
    </div>
  );
}
