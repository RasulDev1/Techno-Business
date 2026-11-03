"use client";

import { useState, type FormEvent } from "react";
import { useQuiz } from "./QuizContext";
import { MODULE_OPTIONS, PLATFORM_OPTIONS, TEAM_OPTIONS, monthsWord, rub } from "@/lib/pricing";
import { tgLink, waLink } from "@/lib/contacts";

function formatPhone(raw: string) {
  let d = raw.replace(/\D/g, "");
  if (d.startsWith("8")) d = "7" + d.slice(1);
  if (d && !d.startsWith("7")) d = "7" + d;
  d = d.slice(0, 11);
  const p = d.slice(1);
  let out = "+7";
  if (p.length) out += " (" + p.slice(0, 3);
  if (p.length >= 3) out += ")";
  if (p.length > 3) out += " " + p.slice(3, 6);
  if (p.length > 6) out += "-" + p.slice(6, 8);
  if (p.length > 8) out += "-" + p.slice(8, 10);
  return d ? out : "";
}

export default function LeadForm() {
  const { answers, done, estimate: e } = useQuiz();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState<null | "wa" | "tg">(null);

  const buildMessage = () => {
    const lines = [`Здравствуйте! Меня зовут ${name.trim()}, телефон ${phone}.`, "Хочу смету и примеры интерфейсов."];
    if (done) {
      const team = TEAM_OPTIONS.find((t) => t.id === answers.team)?.label;
      const mods = answers.modules.map((id) => MODULE_OPTIONS.find((m) => m.id === id)?.label).join(", ");
      const plats = answers.platforms.map((id) => PLATFORM_OPTIONS.find((p) => p.id === id)?.label).join(", ");
      lines.push(
        "",
        "Мой расчёт на сайте:",
        `• Сотрудников: ${team}`,
        `• Модули: ${mods}`,
        `• Платформы: ${plats}`,
        `• Сейчас плачу за софт: ${answers.boxMonthly ? rub(answers.boxMonthly) + "/мес" : "не указано"}`,
        `• Разработка: от ${rub(e.devMin)} до ${rub(e.devMax)}`,
      );
      if (e.breakEvenMonth) lines.push(`• Окупаемость: ${e.breakEvenMonth} ${monthsWord(e.breakEvenMonth)}`);
    }
    return lines.join("\n");
  };

  const validate = () => {
    if (name.trim().length < 2) return "Напишите, как к вам обращаться";
    if (phone.replace(/\D/g, "").length !== 11) return "Проверьте номер телефона";
    return "";
  };

  const submit = (ev: FormEvent) => {
    ev.preventDefault();
    const err = validate();
    setError(err);
    if (err) return;
    window.open(waLink(buildMessage()), "_blank", "noopener,noreferrer");
    setSent("wa");
  };

  const toTelegram = async () => {
    const err = validate();
    setError(err);
    if (err) return;
    // Telegram не умеет подставлять текст в личный чат — копируем сообщение, чтобы его осталось вставить
    try {
      await navigator.clipboard.writeText(buildMessage());
    } catch {
      /* буфер обмена недоступен — человек напишет сам */
    }
    window.open(tgLink(), "_blank", "noopener,noreferrer");
    setSent("tg");
  };

  return (
    <section id="lead" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
      <div className="grid overflow-hidden rounded-3xl bg-accent text-white lg:grid-cols-[1.1fr_1fr]">
        <div className="p-6 sm:p-10">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">Не покупайте кота в мешке</h2>
          <p className="mt-4 text-lg leading-relaxed text-blue-50">
            Оставьте контакты — мы пришлём вам подробный разбор архитектуры под вашу нишу и покажем примеры интерфейсов
            аналогичных систем, которые уже работают.
          </p>
          {done && (
            <div className="mt-6 rounded-xl bg-white/10 p-4 text-sm ring-1 ring-white/20">
              <p className="font-bold">Ваш расчёт приложим к заявке:</p>
              <p className="mt-1 text-blue-50">
                разработка от {rub(e.devMin)} до {rub(e.devMax)}
                {e.breakEvenMonth ? `, окупаемость ${e.breakEvenMonth} ${monthsWord(e.breakEvenMonth)}` : ""}
              </p>
            </div>
          )}
        </div>

        <form onSubmit={submit} noValidate className="flex flex-col gap-3 bg-white p-6 text-ink sm:p-10">
          <label className="text-sm font-bold" htmlFor="lead-name">
            Ваше имя
          </label>
          <input
            id="lead-name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Как к вам обращаться"
            className="rounded-xl border-2 border-line px-4 py-3.5 text-lg outline-none focus:border-accent"
          />
          <label className="mt-2 text-sm font-bold" htmlFor="lead-phone">
            Номер телефона (WhatsApp / Telegram)
          </label>
          <input
            id="lead-phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
            placeholder="+7 (___) ___-__-__"
            className="rounded-xl border-2 border-line px-4 py-3.5 text-lg outline-none focus:border-accent"
          />
          <p className="min-h-5 text-sm font-semibold text-bad" role="alert">
            {error}
          </p>
          <button
            type="submit"
            className="rounded-xl bg-cta px-6 py-4 text-[17px] font-bold text-white shadow-lg shadow-orange-500/25 transition hover:bg-cta-hover"
          >
            Получить смету и примеры в мессенджер
          </button>
          <button
            type="button"
            onClick={toTelegram}
            className="rounded-xl px-6 py-3 font-bold text-accent ring-2 ring-accent/20 transition hover:bg-accent-soft"
          >
            Удобнее в Telegram
          </button>
          {sent && (
            <p className="rounded-lg bg-green-50 p-3 text-sm font-semibold text-green-800">
              {sent === "wa"
                ? "Открыли WhatsApp с готовым сообщением — осталось нажать «Отправить»."
                : "Скопировали сообщение и открыли Telegram — вставьте его в чат и отправьте."}
            </p>
          )}
          <p className="text-xs text-muted">Нажимая кнопку, вы соглашаетесь на обработку персональных данных.</p>
        </form>
      </div>
    </section>
  );
}
