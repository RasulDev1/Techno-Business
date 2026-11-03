"use client";

import { useQuiz } from "./QuizContext";
import { Arrow, Card, Eyebrow, SectionTitle } from "./Card";

export default function LeadForm() {
  const { openModal, contactDone } = useQuiz();

  return (
    <section id="lead" className="scroll-mt-6 pt-24 sm:pt-32">
      <div className="mx-auto max-w-[760px] text-center">
        <Eyebrow>Смета и примеры</Eyebrow>
        <SectionTitle>Не покупайте кота в мешке</SectionTitle>
        <p className="mx-auto mt-4 max-w-[34em] text-balance text-[15px] leading-[1.8] text-muted">
          Оставьте телефон, и система мгновенно рассчитает окупаемость софта под ваш размер команды и пришлёт смету в мессенджер.
          Заодно покажем примеры интерфейсов аналогичных систем, которые уже работают.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-[560px]">
        <Card className="flex flex-col items-center gap-5 px-6 py-10 text-center sm:px-12">
          <button
            type="button"
            onClick={openModal}
            className="btn-primary inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-xl px-8 py-4 text-base font-semibold leading-none text-white max-sm:w-full"
          >
            {contactDone ? "Посмотреть расчёт ещё раз" : "Рассчитать стоимость и получить смету"}
            <span className="nudge"><Arrow /></span>
          </button>
          <p className="m-0 text-[13px] text-faint">4 вопроса · 1 минута · нажимая кнопку, вы соглашаетесь на обработку персональных данных</p>
        </Card>
      </div>
    </section>
  );
}
