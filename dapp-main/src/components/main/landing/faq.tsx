"use client";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqQuestions = [
  {
    id: 1,
    title: "What do I own?",
    content:
      "Digital shares representing an economic interest in the property SPV, recorded on-chain.",
  },
  {
    id: 2,
    title: "How do I get paid?",
    content:
      "Net rental income is calculated monthly and paid as monthly dividends.",
  },
  {
    id: 3,
    title: "What’s the holding period?",
    content: "Typically 3–5 years. Capital appreciation is distributed at exit",
  },
  {
    id: 4,
    title: "Can I use fiat?",
    content:
      "Yes. Invest via Stripe (cards/bank), fiat bank transfer, mobile money (in supported African countries), or USDC on Hedera.",
  },
  {
    id: 5,
    title: "Minimum investment?",
    content: "From $25 per bloc.",
  },
  {
    id: 6,
    title: "Can I sell before exit?",
    content:
      "A secondary marketplace is planned; until then, liquidity is limited.",
  },
  {
    id: 7,
    title: "Are returns guaranteed?",
    content: "No. Targets are not promises; capital is at risk.",
  },
];

export default function Faq() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (id: number) => {
    if (id === openFaq) {
      setOpenFaq(null);
    } else {
      setOpenFaq(id);
    }
  };

  return (
    <section id="faq" className="text-Gray-900 w-full bg-white">
      <div className="container py-16">
        <div className="grid w-full lg:grid-cols-[403px_1fr]">
          <h2 className="text-center text-3xl font-bold lg:text-start lg:text-[40px] lg:leading-[100%]">
            FAQs
          </h2>
          <div className="col-start w-full gap-y-3">
            {faqQuestions.map((question) => (
              <button
                key={question.id}
                onClick={() => toggleFaq(question.id)}
                className="border-Gray-50 w-full rounded-2xl border p-3 text-start outline-none"
              >
                <div className="flex w-full items-center justify-between select-none">
                  <h4 className="max-w-[511px] text-base font-semibold md:text-lg">
                    {question.title}
                  </h4>
                  <ChevronDown
                    className={`text-base text-inherit ${
                      openFaq === question.id ? "rotate-180" : "rotate-0"
                    } transition-all duration-300`}
                  />
                </div>
                <p
                  className={cn(
                    "w-full overflow-hidden text-sm font-normal transition-all duration-300 md:text-base",
                    openFaq === question.id ? "max-h-[1000px] py-2" : "max-h-0",
                  )}
                >
                  {question.content}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
