"use client";

import { useQuiz } from "./QuizContext";
import { Arrow } from "./Card";

const bars = [38, 58, 46, 72, 60, 82, 94];

// Фоновый силуэт интерфейса: ряд карточек CRM, едва заметный, чисто декоративный
function BackgroundScreen() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-[64px] -z-10 flex justify-center opacity-[0.1] blur-[0.3px] sm:top-[40px] sm:opacity-[0.14]"
    >
      <div className="w-[min(1040px,94vw)] overflow-hidden rounded-[28px] border border-ink/15 bg-white shadow-[0_60px_120px_-40px_rgb(14_22_38/.4)]">
        <div className="flex items-center gap-2 border-b border-ink/10 px-6 py-4">
          <span className="size-2.5 rounded-full bg-ink/20" />
          <span className="size-2.5 rounded-full bg-ink/20" />
          <span className="size-2.5 rounded-full bg-ink/20" />
          <span className="ml-4 h-2.5 w-40 rounded-full bg-ink/10" />
        </div>
        <div className="flex">
          <div className="hidden w-[200px] flex-col gap-3 border-r border-ink/10 p-5 sm:flex">
            <span className="h-2.5 w-24 rounded-full bg-accent/50" />
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="h-2.5 w-full rounded-full bg-ink/10" />
            ))}
          </div>
          <div className="flex-1 p-6 sm:p-8">
            <div className="grid grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="rounded-2xl bg-ink/5 p-4">
                  <span className="block h-2 w-16 rounded-full bg-ink/15" />
                  <span className="mt-3 block h-5 w-20 rounded-full bg-ink/20" />
                </div>
              ))}
            </div>
            <div className="mt-5 flex h-36 items-end gap-3 rounded-2xl bg-ink/5 p-5">
              {bars.map((h, i) => (
                <span key={i} className="flex-1 rounded-t-md bg-accent/40" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const { openModal } = useQuiz();
  return (
    <section className="relative mx-auto max-w-[900px] overflow-hidden pb-14 pt-6 text-center sm:pb-20 sm:pt-12">
      <BackgroundScreen />
      <h1 className="mb-6 text-balance font-[family-name:var(--font-display)] text-[clamp(34px,8.4vw,64px)] font-medium leading-[1.04] tracking-[-0.025em]">
        Свой софт для управления бизнесом по цене внедрения готовой коробки
      </h1>
      <p className="mx-auto max-w-[34em] text-balance text-[15px] leading-[1.9] tracking-[0.02em] text-muted sm:text-[16px]">
        Объединим CRM, склад и аналитику в одном приложении. Без ежемесячных подписок, лимитов вендоров и скрытых платежей.
      </p>
      <p className="mx-auto mt-6 inline-flex items-center gap-2.5 rounded-full bg-white/80 px-5 py-2.5 text-[15px] font-semibold text-accent shadow-[0_6px_16px_-8px_rgb(31_63_209/.45)]">
        <span aria-hidden="true" className="size-2 rounded-full bg-accent shadow-[0_0_8px_rgb(31_63_209/.8)]" />
        Перестаньте платить аренду за софт — создайте собственный цифровой актив
      </p>

      <div className="mt-10">
        <button
          type="button"
          onClick={openModal}
          className="btn-primary inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-xl px-9 py-5 text-[17px] font-semibold leading-none text-white max-sm:w-full"
        >
          Рассчитать стоимость софта под мой бизнес
          <span className="nudge"><Arrow /></span>
        </button>
        <p className="mt-4 text-[14px] text-faint">4 вопроса · telegram или whatsapp · без регистрации</p>
      </div>
    </section>
  );
}
