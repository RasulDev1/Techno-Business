import { Backdrop } from "@/components/Backdrop";
import { Logo } from "@/components/Logo";
import Hero from "@/components/Hero";
import QuizModal from "@/components/QuizModal";
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
        <Hero />
        <Trap />
        <Trust />
        <LeadForm />
      </main>
      <Footer />
      <QuizModal />
    </QuizProvider>
  );
}
