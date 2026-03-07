"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      q: "Who do you work with?",
      a: "DTC and ecommerce brands ready to scale with ad spend and product-market fit."
    },
    {
      q: "How quickly can we see results?",
      a: "Signals in 30 days; meaningful scale in 60–120 days."
    },
    {
      q: "Do you run Amazon & Shopify?",
      a: "Yes: we run marketplace and direct-to-consumer growth programs."
    },
    {
      q: "What do you measure?",
      a: "Revenue, CAC, ROAS, AOV, LTV and retention velocity."
    }
  ];

  return (
    <section className="py-24 bg-zinc-900/30 border-y border-zinc-800/50">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-zinc-50 tracking-tight">FAQ</h2>
        </div>
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="bg-zinc-950 rounded-[2rem] border border-zinc-800 px-10 overflow-hidden group">
              <AccordionTrigger className="text-left font-bold text-zinc-100 hover:no-underline py-8 text-lg hover:text-indigo-400 transition-colors">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-zinc-400 pb-8 leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;