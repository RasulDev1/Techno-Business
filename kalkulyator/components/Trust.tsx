import { Card, Eyebrow, SectionTitle } from "./Card";

const steps = [
  {
    title: "Поэтапная оплата",
    text: "Не нужно платить всю сумму сразу. Разбиваем проект на понятные этапы (спринты). Оплата только за готовый и протестированный кусок софта.",
  },
  {
    title: "Проектирование до договора",
    text: "Сначала детально прописываем логику и согласовываем кликабельный прототип, чтобы вы видели, как будет выглядеть приложение, до написания первой строчки кода.",
  },
  {
    title: "Безопасность",
    text: "Разворачиваем софт на серверах в СНГ (Яндекс.Облако / VK Cloud / Selectel). Никакие зарубежные санкции не заблокируют ваш бизнес.",
  },
];

const sprints = ["Прототип", "Этап 1", "Этап 2", "Запуск"];

export default function Trust() {
  return (
    <section className="pt-24 sm:pt-32">
      <div className="mx-auto max-w-[760px] text-center">
        <Eyebrow>Как это работает</Eyebrow>
        <SectionTitle>Платите только за то, что уже работает</SectionTitle>
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {steps.map((s, i) => (
          <Card key={s.title} className="h-full p-7">
            <span className="font-[family-name:var(--font-display)] text-[40px] leading-none text-accent/40">0{i + 1}</span>
            <h3 className="m-0 mt-4 text-[21px] font-semibold tracking-[-0.02em]">{s.title}</h3>
            <p className="m-0 mt-2 text-[15px] leading-relaxed text-muted">{s.text}</p>
          </Card>
        ))}
      </div>
      <ol className="mx-auto mt-8 flex max-w-[760px] list-none flex-wrap items-center justify-center gap-2 p-0 text-[14px] font-medium text-muted">
        {sprints.map((s, i) => (
          <li key={s} className="flex items-center gap-2">
            <span className={`rounded-full px-4 py-2 ${i === sprints.length - 1 ? "bg-good-soft text-good" : "bg-white/70"}`}>
              {s} {i < sprints.length - 1 ? "→ оплата" : "→ софт ваш"}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
