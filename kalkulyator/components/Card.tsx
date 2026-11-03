import type { ReactNode } from "react";

// Карточка с ультратонкой градиентной рамкой и «парящей» тенью — как в анкете «Автоматизация Бизнеса»
export function Card({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <div
      id={id}
      className="scroll-mt-6 rounded-[22px] bg-[linear-gradient(145deg,rgba(255,255,255,.95)_0%,rgba(255,255,255,.35)_35%,rgba(180,192,225,.35)_70%,rgba(255,255,255,.8)_100%)] p-px shadow-card"
    >
      <div className={`rounded-[21px] bg-white/60 backdrop-blur-2xl backdrop-saturate-150 ${className}`}>{children}</div>
    </div>
  );
}

export function Arrow({ dir = "right" }: { dir?: "left" | "right" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {dir === "right" ? <path d="M5 12h14M13 6l6 6-6 6" /> : <path d="M19 12H5M11 6l-6 6 6 6" />}
    </svg>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="m-0 text-[13px] font-medium uppercase tracking-[0.14em] text-faint">{children}</p>;
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="mt-3 text-balance font-[family-name:var(--font-display)] text-[clamp(32px,6vw,48px)] font-medium leading-[1.08] tracking-[-0.02em]">
      {children}
    </h2>
  );
}
