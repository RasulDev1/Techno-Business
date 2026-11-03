"use client";

import { createContext, useContext, useMemo, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import { tgLink, waLink } from "@/lib/contacts";
import {
  MODULE_OPTIONS,
  TEAM_OPTIONS,
  compare,
  estimateDev,
  monthsWord,
  rub,
  type Comparison,
  type DevEstimate,
  type QuizAnswers,
} from "@/lib/pricing";

/** Шаги модального квиза: 0 команда, 1 модули, 2 пожелания,
 * 3 результат (цена, разница с коробкой, график), 4 контакты — заявка отправляется в конце */
export const QUIZ_LAST_QUESTION = 2;
export const RESULT_STEP = 3;
export const CONTACT_STEP = 4;

type Ctx = {
  answers: QuizAnswers;
  setAnswers: Dispatch<SetStateAction<QuizAnswers>>;
  dev: DevEstimate;
  /** Сравнение с готовой коробкой — всегда на средних рыночных тарифах, человек их не вводит */
  comparison: Comparison;

  name: string;
  setName: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  /** Заявка отправлена */
  contactDone: boolean;

  modalOpen: boolean;
  step: number;
  setStep: (n: number) => void;
  /** Открыть попап квиза с того места, где человек остановился в прошлый раз */
  openModal: () => void;
  closeModal: () => void;
  /** Отправить лид (WhatsApp или Telegram) */
  submitContact: (via: "wa" | "tg") => boolean;
  leadSent: null | "wa" | "tg";
};

const QuizCtx = createContext<Ctx | null>(null);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState<QuizAnswers>({ team: null, modules: [], wishes: "" });
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [contactDone, setContactDone] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [leadSent, setLeadSent] = useState<null | "wa" | "tg">(null);

  const dev = useMemo(() => estimateDev(answers), [answers]);
  const comparison = useMemo(() => compare(answers, dev, { monthly: null }), [answers, dev]);

  const openModal = () => {
    setModalOpen(true);
    if (contactDone) setStep(RESULT_STEP);
  };
  const closeModal = () => setModalOpen(false);

  const submitContact = (via: "wa" | "tg") => {
    if (name.trim().length < 2 || phone.replace(/\D/g, "").length !== 11) return false;

    const team = TEAM_OPTIONS.find((t) => t.id === answers.team)?.label;
    const mods = answers.modules.map((id) => MODULE_OPTIONS.find((m) => m.id === id)?.label).join(", ");
    const lines = [
      `Здравствуйте! Меня зовут ${name.trim()}, телефон ${phone}.`,
      "Прошёл калькулятор на сайте, хочу смету и примеры интерфейсов.",
      "",
      `• Сотрудников: ${team}`,
      `• Модули: ${mods}`,
    ];
    if (answers.wishes.trim()) lines.push(`• Ещё нужно: ${answers.wishes.trim()}`);
    lines.push(`• Стоимость разработки: от ${rub(dev.devMin)} до ${rub(dev.devMax)}`);
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
    return true;
  };

  const value = useMemo(
    () => ({
      answers, setAnswers, dev, comparison,
      name, setName, phone, setPhone, contactDone,
      modalOpen, step, setStep, openModal, closeModal, submitContact, leadSent,
    }),
    [answers, dev, comparison, name, phone, contactDone, modalOpen, step, leadSent],
  );
  return <QuizCtx.Provider value={value}>{children}</QuizCtx.Provider>;
}

export function useQuiz() {
  const ctx = useContext(QuizCtx);
  if (!ctx) throw new Error("useQuiz outside QuizProvider");
  return ctx;
}
