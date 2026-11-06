import type { Metadata } from "next";
import Topbar from "@/components/Topbar";
import Hero from "@/components/home/Hero";
import Results from "@/components/home/Results";
import Solutions from "@/components/home/Solutions";

export const metadata: Metadata = {
  description: "Готовые сайты и интернет-магазины с автоматизацией: заявки, CRM и оплата работают без ручной рутины.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Topbar home />
      <main>
        <Hero />
        <Results />
        <Solutions />
      </main>
    </>
  );
}
