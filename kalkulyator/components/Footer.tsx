import { CONTACT, tgLink, waLink } from "@/lib/contacts";

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-12 sm:px-6 md:flex-row md:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-blue-300">Остались вопросы?</p>
          <p className="mt-1 text-3xl font-extrabold">Пиши Расулу</p>
          <a href={`tel:${CONTACT.phoneTel}`} className="mt-1 block text-2xl font-bold text-white/90 hover:text-white">
            {CONTACT.phoneDisplay}
          </a>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <a
            href={waLink("Здравствуйте! Хочу обсудить разработку своего софта для бизнеса.")}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-[#25d366] px-6 py-3.5 text-center font-bold text-navy transition hover:brightness-95"
          >
            WhatsApp
          </a>
          <a
            href={tgLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-[#2aabee] px-6 py-3.5 text-center font-bold text-white transition hover:brightness-95"
          >
            Telegram
          </a>
        </div>
      </div>
    </footer>
  );
}
