const items = [
  {
    icon: "🔒",
    title: "Блокировка данных",
    pain: "Забыли вовремя оплатить подписку Битрикс/AMO? Менеджеры заблокированы, база недоступна, работа встала.",
    fix: "В своём софте база на 100% ваша.",
  },
  {
    icon: "🧩",
    title: "Платные костыли",
    pain: "Нужна интеграция с Telegram или Авито? Платите каждый месяц сторонним разработчикам в Маркетплейсе.",
    fix: "В своём софте все интеграции вшиты навсегда.",
  },
  {
    icon: "🤯",
    title: "Смерть от функций",
    pain: "Готовые CRM перегружены. Вашим сотрудникам нужны 3 кнопки, а они видят 300. Отсюда долгий ввод в работу и ошибки.",
    fix: "Ваш софт — это чистый интерфейс без мусора.",
  },
];

export default function Trap() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
      <p className="text-sm font-bold uppercase tracking-wider text-bad">Почему не купить готовое?</p>
      <h2 className="mt-2 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-4xl">Ловушка готовых CRM: скрытые расходы, о которых молчат</h2>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {items.map((it) => (
          <article key={it.title} className="flex flex-col rounded-2xl border border-line bg-white p-6">
            <span className="flex size-12 items-center justify-center rounded-xl bg-red-50 text-2xl" aria-hidden="true">
              {it.icon}
            </span>
            <h3 className="mt-4 text-xl font-extrabold">{it.title}</h3>
            <p className="mt-2 flex-1 leading-relaxed text-muted">{it.pain}</p>
            <p className="mt-5 flex gap-2 rounded-xl bg-green-50 p-3 font-bold text-green-800">
              <span aria-hidden="true">✓</span>
              {it.fix}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
