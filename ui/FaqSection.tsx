import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getDictionary, type Locale } from "@/lib/i18n";

const faqs: Record<Locale, { question: string; answer: string }[]> = {
  en: [
    {
      question: "What is this website about?",
      answer:
        "This website helps you find and claim free rewards, events, and opportunities.",
    },
    {
      question: "Are the rewards really free?",
      answer:
        "Yes, all the rewards listed on our website are completely free to claim.",
    },
    {
      question: "How do I claim a reward?",
      answer:
        "Each reward has a set of instructions on how to claim it. Follow the steps provided to get your reward.",
    },
    {
      question: "How often are new rewards added?",
      answer:
        "We update our list of rewards regularly, so be sure to check back often for new opportunities.",
    },
  ],
  es: [
    {
      question: "¿De qué trata este sitio web?",
      answer:
        "Este sitio te ayuda a encontrar y reclamar recompensas, eventos y oportunidades gratuitas.",
    },
    {
      question: "¿Las recompensas realmente son gratis?",
      answer:
        "Sí, todas las recompensas publicadas en el sitio son totalmente gratis.",
    },
    {
      question: "¿Cómo reclamo una recompensa?",
      answer:
        "Cada recompensa incluye instrucciones. Sigue los pasos para obtenerla.",
    },
    {
      question: "¿Cada cuánto agregan nuevas recompensas?",
      answer:
        "Actualizamos la lista con frecuencia, así que vuelve a revisar seguido.",
    },
  ],
  ar: [
    {
      question: "عن ماذا يتحدث هذا الموقع؟",
      answer:
        "يساعدك هذا الموقع في العثور على المكافآت والفعاليات والفرص المجانية والمطالبة بها.",
    },
    {
      question: "هل المكافآت مجانية فعلاً؟",
      answer: "نعم، كل المكافآت المدرجة في الموقع مجانية بالكامل.",
    },
    {
      question: "كيف أطالب بمكافأة؟",
      answer:
        "كل مكافأة تحتوي على خطوات واضحة للمطالبة بها. اتبع التعليمات المذكورة.",
    },
    {
      question: "كم مرة تتم إضافة مكافآت جديدة؟",
      answer:
        "نحدّث قائمة المكافآت باستمرار، لذا تأكد من زيارة الموقع بشكل متكرر.",
    },
  ],
};

export default function FaqSection({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <section id="faq" className="w-full py-24 md:py-32 bg-muted/30">
      <div className="container-wrapper px-4 md:px-6">
        <div className="flex flex-col items-center mb-12 text-center">
          <h2 className="text-3xl md:text-5xl font-concert-one mb-4 uppercase tracking-tight">
            {t.home.faqTitle.split(' ').map((word, i) => (
               <span key={i} className={i % 2 === 1 ? 'text-primary' : ''}>{word} </span>
            ))}
          </h2>
          <div className="h-1.5 w-24 bg-primary rounded-full" />
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs[locale].map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-2xl px-6 bg-background/50 backdrop-blur-sm overflow-hidden transition-all hover:border-primary/30">
                <AccordionTrigger className="text-lg font-concert-one uppercase tracking-tight hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-base pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
