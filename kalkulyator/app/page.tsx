import { Backdrop } from "@/components/Backdrop";
import { Logo } from "@/components/Logo";
import Calculator from "@/components/Calculator";
import Trap from "@/components/Trap";
import Trust from "@/components/Trust";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";
import { QuizProvider } from "@/components/QuizContext";
import { CONTACT, waLink } from "@/lib/contacts";

const gutter = "mx-auto max-w-[1100px] pl-[max(20px,env(safe-area-inset-left))] pr-[max(20px,env(safe-area-inset-right))]";

export default function Page() {
  return (
    <QuizProvider>
      <Backdrop />
      <header className={`${gutter} flex items-center justify-between gap-4 py-6 sm:py-8`}>
        <Logo />
        <a href={waLink("Здравствуйте! Хочу обсудить разработку своего софта для бизнеса.")} target="_blank" rel="noopener noreferrer"
          className="hidden text-[15px] font-medium text-muted no-underline hover:text-accent sm:block">
          Пиши Расулу · {CONTACT.phoneDisplay}
        </a>
      </header>

      <main className={gutter}>
        <section className="mx-auto max-w-[900px] pb-10 pt-6 text-center sm:pb-14 sm:pt-12">
          <h1 className="mb-6 text-balance font-[family-name:var(--font-display)] text-[clamp(34px,8.4vw,64px)] font-medium leading-[1.04] tracking-[-0.025em]">
            Свой софт для управления бизнесом по цене внедрения готовой коробки
          </h1>
          <p className="mx-auto max-w-[34em] text-balance text-[15px] leading-[1.9] tracking-[0.02em] text-muted sm:text-[16px]">
            Объединим CRM, склад и аналитику в одном приложении. Без ежемесячных подписок, лимитов вендоров и скрытых платежей.
          </p>
          <p className="mx-auto mt-6 inline-flex items-center gap-2.5 rounded-full bg-white/70 px-5 py-2.5 text-[15px] font-semibold text-accent shadow-[0_6px_16px_-8px_rgb(31_63_209/.45)]">
            <span aria-hidden="true" className="size-2 rounded-full bg-accent shadow-[0_0_8px_rgb(31_63_209/.8)]" />
            Перестаньте платить аренду за софт — создайте собственный цифровой актив
          </p>
        </section>

        <Calculator />
        <Trap />
        <Trust />
        <LeadForm />
      </main>
      <Footer />
    </QuizProvider>
  );
}
