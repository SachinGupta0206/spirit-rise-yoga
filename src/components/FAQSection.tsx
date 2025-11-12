import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "I'm a beginner. Can I join?",
      answer:
        "Absolutely! Our classes are beginner-friendly with modifications for all levels. Our expert instructors will guide you through each pose and ensure you feel comfortable throughout your journey.",
    },
    {
      question: "Will I get recordings if I miss a class?",
      answer:
        "Yes, all sessions are recorded and available to registered participants. You can access them anytime to catch up on missed classes or revisit specific practices.",
    },
    {
      question: "What do I need for the sessions?",
      answer:
        "Just a yoga mat, a water bottle, and your energy! Comfortable clothing that allows movement is recommended. Optional props like blocks or straps can be helpful but aren't required.",
    },
    {
      question: "Can I choose my batch timing?",
      answer:
        "Yes, you can select your preferred batch timing during registration. We offer multiple morning and evening slots to fit your schedule. You'll attend the same time slot throughout the 21 days.",
    },
    {
      question: "What if I have physical limitations or injuries?",
      answer:
        "Please inform your instructor before the first session. They will provide personalized modifications to ensure your practice is safe and beneficial for your specific needs.",
    },
  ];

  return (
    <section
      id="faqs"
      className="py-20 bg-gradient-to-b from-muted/30 to-background"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Got questions? We've got answers!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-2xl px-6 shadow-soft hover:shadow-hover transition-all duration-300 border-none"
              >
                <AccordionTrigger className="text-left text-lg font-semibold text-foreground hover:text-primary transition-colors py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
