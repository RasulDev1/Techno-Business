import { CONTACT, tgLink, waLink } from "@/lib/contacts";

export default function Footer() {
  return (
    <footer className="pb-12 pt-24 text-center sm:pt-32">
      <p className="m-0 text-[13px] font-medium uppercase tracking-[0.14em] text-faint">Остались вопросы?</p>
      <p className="m-0 mt-3 font-[family-name:var(--font-display)] text-[clamp(34px,7vw,48px)] font-medium leading-none tracking-[-0.02em]">
        Пиши Расулу
      </p>
      <a href={`tel:${CONTACT.phoneTel}`} className="mt-3 inline-block text-[20px] font-semibold text-ink no-underline hover:text-accent">
        {CONTACT.phoneDisplay}
      </a>
      <div className="mt-6 flex justify-center gap-3">
        <a href={waLink("Здравствуйте! Хочу обсудить разработку своего софта для бизнеса.")} target="_blank" rel="noopener noreferrer"
          className="rounded-xl bg-white/70 px-6 py-3 text-[15px] font-medium text-ink no-underline shadow-[0_6px_16px_-8px_rgb(31_63_209/.35)] hover:text-accent">
          WhatsApp
        </a>
        <a href={tgLink()} target="_blank" rel="noopener noreferrer"
          className="rounded-xl bg-white/70 px-6 py-3 text-[15px] font-medium text-ink no-underline shadow-[0_6px_16px_-8px_rgb(31_63_209/.35)] hover:text-accent">
          Telegram
        </a>
      </div>
      <p className="m-0 mt-12 text-sm text-faint">© 2026 · Автоматизация Бизнеса</p>
    </footer>
  );
}
