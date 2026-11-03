"use client";

import { useQuiz } from "./QuizContext";
import { Arrow } from "./Card";

export default function Hero() {
  const { openModal } = useQuiz();
  return (
    <section className="relative mx-auto max-w-[900px] pb-14 pt-6 text-center sm:pb-20 sm:pt-12">
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
