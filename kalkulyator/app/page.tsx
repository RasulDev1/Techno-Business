import Hero from "@/components/Hero";
import Quiz from "@/components/Quiz";
import Result from "@/components/Result";
import Trap from "@/components/Trap";
import Trust from "@/components/Trust";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";
import { QuizProvider } from "@/components/QuizContext";

export default function Page() {
  return (
    <QuizProvider>
      <Hero />
      <main>
        <Quiz />
        <Result />
        <Trap />
        <Trust />
        <LeadForm />
      </main>
      <Footer />
    </QuizProvider>
  );
}
