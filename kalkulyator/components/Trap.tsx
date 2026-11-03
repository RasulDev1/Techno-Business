import { Card, Eyebrow, SectionTitle } from "./Card";

const items = [
  {
    title: "Блокировка данных",
    pain: "Забыли вовремя оплатить подписку Битрикс/AMO? Менеджеры заблокированы, база недоступна, работа встала.",
    fix: "В своём софте база на 100% ваша.",
    icon: <><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>,
  },
  {
    title: "Платные костыли",
    pain: "Нужна интеграция с Telegram или Авито? Платите каждый месяц сторонним разработчикам в Маркетплейсе.",
    fix: "В своём софте все интеграции вшиты навсегда.",
    icon: <><path d="M9 3v4M15 3v4M7 7h10v4a5 5 0 0 1-10 0V7Z" /><path d="M12 16v5" /></>,
  },
  {
    title: "Смерть от функций",
    pain: "Готовые CRM перегружены. Вашим сотрудникам нужны 3 кнопки, а они видят 300. Отсюда долгий ввод в работу и ошибки.",
    fix: "Ваш софт — это чистый интерфейс без мусора.",
    icon: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M8 13h3M8 16h6M14 13h2" /></>,
  },
];

export default function Trap() {
  return (
    <section className="pt-24 sm:pt-32">
      <div className="mx-auto max-w-[760px] text-center">
        <Eyebrow>Почему не купить готовое?</Eyebrow>
        <SectionTitle>Ловушка готовых CRM</SectionTitle>
        <p className="mx-auto mt-4 max-w-[30em] text-balance text-[15px] leading-[1.8] text-muted">
          Скрытые расходы, о которых не пишут на странице тарифов
        </p>
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {items.map((it) => (
          <Card key={it.title} className="flex h-full flex-col p-7">
            <span className="grid size-11 place-items-center rounded-xl bg-white/80 text-error shadow-[0_6px_16px_-8px_rgb(200_55_45/.45)]">
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{it.icon}</svg>
            </span>
            <h3 className="m-0 mt-5 text-[21px] font-semibold tracking-[-0.02em]">{it.title}</h3>
            <p className="m-0 mt-2 flex-1 text-[15px] leading-relaxed text-muted">{it.pain}</p>
            <p className="m-0 mt-5 rounded-xl bg-good-soft px-4 py-3 text-[15px] font-semibold leading-snug text-good">{it.fix}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
