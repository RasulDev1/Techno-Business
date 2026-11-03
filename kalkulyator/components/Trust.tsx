const steps = [
  {
    n: "01",
    title: "Поэтапная оплата",
    text: "Не нужно платить всю сумму сразу. Разбиваем проект на понятные этапы (спринты). Оплата только за готовый и протестированный кусок софта.",
  },
  {
    n: "02",
    title: "Проектирование до договора",
    text: "Сначала детально прописываем логику и согласовываем кликабельный прототип, чтобы вы видели, как будет выглядеть приложение, до написания первой строчки кода.",
  },
  {
    n: "03",
    title: "Безопасность",
    text: "Разворачиваем софт на серверах в СНГ (Яндекс.Облако / VK Cloud / Selectel). Никакие зарубежные санкции не заблокируют ваш бизнес.",
  },
];

const sprints = [
  { label: "Прототип", note: "согласовали — платите" },
  { label: "Этап 1", note: "приняли — платите" },
  { label: "Этап 2", note: "приняли — платите" },
  { label: "Запуск", note: "софт ваш навсегда" },
];

export default function Trust() {
  return (
    <section className="border-y border-line bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <p className="text-sm font-bold uppercase tracking-wider text-accent">Как это работает</p>
        <h2 className="mt-2 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-4xl">
          Разработка без риска: платите только за то, что уже работает
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n}>
              <span className="text-4xl font-extrabold text-accent/30">{s.n}</span>
              <h3 className="mt-2 text-xl font-extrabold">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{s.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-bg p-5 sm:p-6">
          <p className="font-bold">Как выглядит оплата по этапам</p>
          <ol className="mt-4 grid gap-3 sm:grid-cols-4">
            {sprints.map((s, i) => (
              <li key={s.label} className="relative rounded-xl border border-line bg-white p-4">
                <div className="flex items-center gap-2">
                  <span
                    className={`flex size-7 items-center justify-center rounded-full text-sm font-bold ${
                      i === sprints.length - 1 ? "bg-good text-white" : "bg-accent-soft text-accent"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span className="font-extrabold">{s.label}</span>
                </div>
                <p className="mt-2 text-sm text-muted">{s.note}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
