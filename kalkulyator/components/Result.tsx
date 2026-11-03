"use client";

import { useMemo } from "react";
import { useQuiz } from "./QuizContext";
import PaybackChart from "./PaybackChart";
import { calculate, monthsWord, rub, BOX_YEARLY_INDEX } from "@/lib/pricing";

export default function Result() {
  const { answers, done, estimate: e } = useQuiz();

  // Если окупаемость позже 30-го месяца — показываем 5 лет, чтобы было видно пересечение
  const horizon = e.breakEvenMonth && e.breakEvenMonth > 30 ? 60 : 36;
  const chartEstimate = useMemo(() => (horizon === 36 ? e : calculate(answers, horizon)), [e, answers, horizon]);

  if (!done) return null;

  return (
    <section id="result" className="animate-rise bg-navy text-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <p className="text-sm font-bold uppercase tracking-wider text-blue-300">Ваш расчёт</p>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">Момент истины: аренда против своего софта</h2>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl bg-white/[0.06] p-6 ring-1 ring-white/10">
            <p className="text-blue-200">Ориентировочная стоимость разработки вашего софта</p>
            <p className="mt-2 text-3xl font-extrabold leading-tight sm:text-4xl">
              от {rub(e.devMin)} <span className="text-white/60">до</span> {rub(e.devMax)}
            </p>
            <p className="mt-3 text-sm text-white/60">
              Платёж разбит на этапы. Дальше — только хостинг и техподдержка: около {rub(e.ownMonthly)}/мес.
            </p>
          </div>
          <div className="rounded-2xl bg-orange-500/10 p-6 ring-1 ring-orange-400/30">
            <p className="text-orange-200">Ваши затраты на лицензии коробки за 3 года составят</p>
            <p className="mt-2 text-3xl font-extrabold leading-tight text-orange-300 sm:text-4xl">{rub(e.box3y)}</p>
            <p className="mt-3 text-sm text-white/60">
              {e.boxMonthlyIsEstimate
                ? `По средним тарифам для вашей команды — около ${rub(e.boxMonthly)}/мес`
                : `При ${rub(e.boxMonthly)}/мес`}
              , с учётом ежегодного подорожания тарифов на ~{Math.round(BOX_YEARLY_INDEX * 100)}%. И через 3 года софт всё равно не ваш.
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-white p-4 text-ink sm:p-6">
          <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-xl font-extrabold">График окупаемости</h3>
            {e.breakEvenMonth ? (
              <p className="font-bold text-good">
                Свой софт окупится за {e.breakEvenMonth} {monthsWord(e.breakEvenMonth)}
                {e.savings3y > 0 && <> · экономия за 3 года {rub(e.savings3y)}</>}
              </p>
            ) : (
              <p className="font-bold text-muted">При текущей подписке окупаемость дольше 5 лет — обсудим, что можно упростить</p>
            )}
          </div>
          <PaybackChart estimate={chartEstimate} />
          <p className="mt-4 text-sm text-muted">
            После точки пересечения коробка продолжает дорожать каждый месяц, а ваш софт требует лишь копеечного хостинга и
            техподдержки. Расчёт ориентировочный: точную смету дадим после разбора ваших процессов.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="#lead"
            className="inline-flex items-center justify-center rounded-xl bg-cta px-6 py-4 font-bold text-white transition hover:bg-cta-hover"
          >
            Получить точную смету в мессенджер
          </a>
          <a
            href="#calculator"
            className="inline-flex items-center justify-center rounded-xl px-6 py-4 font-bold text-white/80 ring-1 ring-white/20 transition hover:bg-white/5"
          >
            Изменить ответы
          </a>
        </div>
      </div>
    </section>
  );
}
