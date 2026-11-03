import DeviceMockup from "./DeviceMockup";
import { CONTACT, waLink } from "@/lib/contacts";

export default function Hero() {
  return (
    <header className="relative overflow-hidden border-b border-line bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <span className="text-[15px] font-extrabold tracking-tight">
          <span className="text-accent">●</span> Свой софт для бизнеса
        </span>
        <a
          href={waLink("Здравствуйте! Хочу обсудить разработку своего софта для бизнеса.")}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded-lg px-3 py-2 text-sm font-semibold text-ink hover:bg-bg sm:block"
        >
          Пиши Расулу · {CONTACT.phoneDisplay}
        </a>
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-6 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:pb-24 lg:pt-12">
        <div>
          <h1 className="text-[34px] font-extrabold leading-[1.08] tracking-tight text-balance sm:text-5xl">
            Свой софт для управления бизнесом{" "}
            <span className="text-accent">по цене внедрения готовой коробки</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            Объединим CRM, склад и аналитику в одном приложении. Без ежемесячных подписок, лимитов вендоров
            и скрытых платежей.
          </p>
          <p className="mt-6 flex max-w-xl gap-3 rounded-xl border border-accent/20 bg-accent-soft p-4 text-[17px] font-bold leading-snug">
            <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-accent text-sm text-white">
              ✓
            </span>
            Перестаньте платить аренду за софт — создайте собственный цифровой актив
          </p>
          <a
            href="#calculator"
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cta px-6 py-4 text-center text-[17px] font-bold text-white shadow-lg shadow-orange-500/25 transition hover:bg-cta-hover sm:w-auto"
          >
            Рассчитать стоимость и окупаемость софта
            <span aria-hidden="true">↓</span>
          </a>
          <p className="mt-3 text-sm text-muted">4 вопроса · 1 минута · без регистрации</p>
        </div>
        <DeviceMockup />
      </div>
    </header>
  );
}
