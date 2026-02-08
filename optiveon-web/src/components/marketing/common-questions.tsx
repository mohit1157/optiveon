"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const commonQuestions = [
  {
    question: "Can I cancel or change plans anytime?",
    answer:
      "Yes. You can upgrade, downgrade, or cancel from the billing portal. Plan changes apply at the next billing cycle unless noted otherwise.",
  },
  {
    question: "Do I need a credit card to evaluate the platform?",
    answer:
      "For paid plans, checkout is processed by Stripe with secure card handling. Enterprise evaluations can be coordinated through sales.",
  },
  {
    question: "How does API access differ between plans?",
    answer:
      "Professional includes a fixed daily API quota suitable for production pilots. Enterprise provides higher throughput and tailored integration support.",
  },
  {
    question: "What is included in Enterprise onboarding?",
    answer:
      "Enterprise includes tailored rollout support, integration guidance, and a dedicated account contact aligned to your team requirements.",
  },
];

export function CommonQuestions() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((current) => (current === index ? null : index));
  };

  return (
    <section id="faq" className="py-[88px] relative overflow-hidden">
      <div className="container">
        <div className="rounded-2xl border border-border/70 bg-[linear-gradient(165deg,rgba(13,20,32,0.95),rgba(9,14,23,0.92))] p-xl md:p-2xl">
          <h3 className="text-3xl md:text-[2.55rem] font-semibold leading-tight text-balance mb-xl">
            Exploring Some{" "}
            <span className="gradient-text">Common Questions</span>
          </h3>

          <div className="overflow-hidden rounded-xl border border-border/55 bg-background-dark/45">
            {commonQuestions.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              const answerId = `common-faq-answer-${index}`;

              return (
                <div
                  key={faq.question}
                  className={cn(
                    "border-b border-accent/20 last:border-b-0",
                    isOpen && "bg-background-card/35"
                  )}
                >
                  <button
                    type="button"
                    className="w-full px-lg py-md flex items-center justify-between gap-md text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-0"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => toggleFaq(index)}
                  >
                    <span
                      className={cn(
                        "text-[1.02rem] leading-snug font-semibold transition-colors duration-normal",
                        isOpen ? "text-accent" : "text-foreground-secondary"
                      )}
                    >
                      {faq.question}
                    </span>

                    <span
                      className={cn(
                        "flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border backdrop-blur-sm transition-all duration-normal",
                        isOpen
                          ? "border-accent/45 bg-accent/10 text-accent shadow-[0_0_16px_rgba(214,179,106,0.35)]"
                          : "border-border/70 bg-background-dark/55 text-foreground-muted"
                      )}
                    >
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform duration-normal",
                          isOpen && "rotate-180"
                        )}
                      />
                    </span>
                  </button>

                  <div
                    id={answerId}
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-slow ease-out",
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="px-lg pb-lg text-sm leading-relaxed text-foreground-muted">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
