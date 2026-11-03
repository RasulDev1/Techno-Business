"use client";

import { useState, type FormEvent } from "react";
import { useQuiz } from "./QuizContext";
import { MODULE_OPTIONS, PLATFORM_OPTIONS, TEAM_OPTIONS, monthsWord, rub } from "@/lib/pricing";
import { Arrow, Card, Eyebrow, SectionTitle } from "./Card";
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
  const { answers, done, dev, compared, comparison: c } = useQuiz();
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
      );
      if (answers.wishes.trim()) lines.push(`• Ещё нужно: ${answers.wishes.trim()}`);
      lines.push(`• Стоимость разработки: от ${rub(dev.devMin)} до ${rub(dev.devMax)}`);
      if (compared) {
        lines.push(
          `• Сейчас трачу на коробку: подписка ${rub(c.subscription)}/мес, интеграции ${rub(c.integrations)}/мес, внедрение ${rub(c.setup)}`,
        );
        if (c.breakEvenMonth) lines.push(`• Окупаемость своего софта: ${c.breakEvenMonth} ${monthsWord(c.breakEvenMonth)}`);
      }
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
    <section id="lead" className="scroll-mt-6 pt-24 sm:pt-32">
      <div className="mx-auto max-w-[760px] text-center">
        <Eyebrow>Смета и примеры</Eyebrow>
        <SectionTitle>Не покупайте кота в мешке</SectionTitle>
        <p className="mx-auto mt-4 max-w-[34em] text-balance text-[15px] leading-[1.8] text-muted">
          Оставьте контакты — мы пришлём вам подробный разбор архитектуры под вашу нишу и покажем примеры интерфейсов
          аналогичных систем, которые уже работают.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-[680px]">
        <Card>
          <form onSubmit={submit} noValidate className="flex flex-col gap-7 px-6 py-8 sm:px-12 sm:py-11">
            {done && (
              <p className="m-0 rounded-xl bg-accent-soft px-4 py-3 text-[14px] leading-relaxed text-muted">
                Приложим ваш расчёт: разработка от {rub(dev.devMin)} до {rub(dev.devMax)}
                {compared && c.breakEvenMonth ? `, окупаемость ${c.breakEvenMonth} ${monthsWord(c.breakEvenMonth)}` : ""}
              </p>
            )}
            <div className="flex flex-col gap-3">
              <label className="text-[18px] font-semibold tracking-[-0.01em]" htmlFor="lead-name">Ваше имя</label>
              <div className="fw">
                <input id="lead-name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)}
                  placeholder="Как к вам обращаться" className="field" aria-invalid={error && name.trim().length < 2 ? true : undefined} />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-[18px] font-semibold tracking-[-0.01em]" htmlFor="lead-phone">Номер телефона (WhatsApp / Telegram)</label>
              <div className="fw">
                <input id="lead-phone" type="tel" autoComplete="tel" inputMode="tel" value={phone}
                  onChange={(e) => setPhone(formatPhone(e.target.value))} placeholder="+7 (___) ___-__-__" className="field" />
              </div>
            </div>
            {error && <p className="-mt-3 m-0 text-sm font-medium text-error" role="alert">{error}</p>}
            <div className="flex flex-col gap-3">
              <button type="submit"
                className="btn-primary inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-xl px-8 py-4 text-base font-semibold leading-none text-white">
                Получить смету и примеры в мессенджер
                <span className="nudge"><Arrow /></span>
              </button>
              <button type="button" onClick={toTelegram}
                className="btn-back cursor-pointer rounded-xl px-4 py-3 text-[15px] font-medium text-faint hover:text-accent">
                Удобнее в Telegram
              </button>
            </div>
            {sent && (
              <p className="m-0 rounded-xl bg-good-soft px-4 py-3 text-[14px] font-medium text-good">
                {sent === "wa"
                  ? "Открыли WhatsApp с готовым сообщением — осталось нажать «Отправить»."
                  : "Скопировали сообщение и открыли Telegram — вставьте его в чат и отправьте."}
              </p>
            )}
            <p className="m-0 text-center text-[13px] text-faint">Нажимая кнопку, вы соглашаетесь на обработку персональных данных.</p>
          </form>
        </Card>
      </div>
    </section>
  );
}
