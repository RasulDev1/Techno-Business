"use client";

import { createContext, useContext, useMemo, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import { tgLink, waLink } from "@/lib/contacts";
import {
  MODULE_OPTIONS,
  PLATFORM_OPTIONS,
  TEAM_OPTIONS,
  compare,
  estimateDev,
  monthsWord,
  rub,
  type Comparison,
  type DevEstimate,
  type QuizAnswers,
} from "@/lib/pricing";

/** Шаги модального квиза: 0 команда, 1 модули, 2 платформы, 3 пожелания,
 * 4 примерный результат, 5 контакты, 6 точный результат с графиком */
export const QUIZ_LAST_QUESTION = 3;
export const APPROX_STEP = 4;
export const CONTACT_STEP = 5;
export const RESULT_STEP = 6;

type Ctx = {
  answers: QuizAnswers;
  setAnswers: Dispatch<SetStateAction<QuizAnswers>>;
  dev: DevEstimate;

  /** Сколько сейчас уходит на коробку, ₽/мес (null — не указано, берём среднее) */
  boxMonthly: number | null;
  setBoxMonthly: (v: number | null) => void;
  comparison: Comparison;

  name: string;
  setName: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  /** Контакт отправлен — можно показывать расчётную стоимость и график */
  contactDone: boolean;

  modalOpen: boolean;
  step: number;
  setStep: (n: number) => void;
  /** Открыть попап квиза с того места, где человек остановился в прошлый раз */
  openModal: () => void;
  closeModal: () => void;
  /** Отправить лид (WhatsApp или Telegram) и открыть экран результата */
  submitContact: (via: "wa" | "tg") => boolean;
  leadSent: null | "wa" | "tg";
};

const QuizCtx = createContext<Ctx | null>(null);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState<QuizAnswers>({ team: null, modules: [], platforms: [], wishes: "" });
  const [boxMonthly, setBoxMonthly] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [contactDone, setContactDone] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [leadSent, setLeadSent] = useState<null | "wa" | "tg">(null);

  const dev = useMemo(() => estimateDev(answers), [answers]);
  const comparison = useMemo(() => compare(answers, dev, { monthly: boxMonthly }), [answers, dev, boxMonthly]);

  const openModal = () => {
    setModalOpen(true);
    if (contactDone) setStep(RESULT_STEP);
  };
  const closeModal = () => setModalOpen(false);

  const submitContact = (via: "wa" | "tg") => {
    if (name.trim().length < 2 || phone.replace(/\D/g, "").length !== 11) return false;

    const team = TEAM_OPTIONS.find((t) => t.id === answers.team)?.label;
    const mods = answers.modules.map((id) => MODULE_OPTIONS.find((m) => m.id === id)?.label).join(", ");
    const plats = answers.platforms.map((id) => PLATFORM_OPTIONS.find((p) => p.id === id)?.label).join(", ");
    const lines = [
      `Здравствуйте! Меня зовут ${name.trim()}, телефон ${phone}.`,
      "Прошёл калькулятор на сайте, хочу смету и примеры интерфейсов.",
      "",
      `• Сотрудников: ${team}`,
      `• Модули: ${mods}`,
      `• Платформы: ${plats}`,
    ];
    if (answers.wishes.trim()) lines.push(`• Ещё нужно: ${answers.wishes.trim()}`);
    lines.push(`• Стоимость разработки: от ${rub(dev.devMin)} до ${rub(dev.devMax)}`);
    if (boxMonthly !== null) lines.push(`• Сейчас плачу за коробку: ${rub(boxMonthly)}/мес`);
    if (comparison.breakEvenMonth) lines.push(`• Окупаемость своего софта: ${comparison.breakEvenMonth} ${monthsWord(comparison.breakEvenMonth)}`);
    const text = lines.join("\n");

    if (via === "wa") {
      window.open(waLink(text), "_blank", "noopener,noreferrer");
    } else {
      try {
        void navigator.clipboard.writeText(text);
      } catch {
        /* буфер обмена недоступен — человек напишет сам */
      }
      window.open(tgLink(), "_blank", "noopener,noreferrer");
    }
    setLeadSent(via);
    setContactDone(true);
    setStep(RESULT_STEP);
    return true;
  };

  const value = useMemo(
    () => ({
      answers, setAnswers, dev,
      boxMonthly, setBoxMonthly, comparison,
      name, setName, phone, setPhone, contactDone,
      modalOpen, step, setStep, openModal, closeModal, submitContact, leadSent,
    }),
    [answers, dev, boxMonthly, comparison, name, phone, contactDone, modalOpen, step, leadSent],
  );
  return <QuizCtx.Provider value={value}>{children}</QuizCtx.Provider>;
}

export function useQuiz() {
  const ctx = useContext(QuizCtx);
  if (!ctx) throw new Error("useQuiz outside QuizProvider");
  return ctx;
}
