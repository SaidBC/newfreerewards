import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is this website about?",
    answer: "This website helps you find and claim free rewards, events, and opportunities.",
  },
  {
    question: "Are the rewards really free?",
    answer: "Yes, all the rewards listed on our website are completely free to claim.",
  },
  {
    question: "How do I claim a reward?",
    answer: "Each reward has a set of instructions on how to claim it. Follow the steps provided to get your reward.",
  },
  {
    question: "How often are new rewards added?",
    answer: "We update our list of rewards regularly, so be sure to check back often for new opportunities.",
  },
];

export default function FaqSection() {
  return (
    <section id="faq" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold font-concert-one text-amber-400 tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full max-w-2xl mx-auto">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
