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
    <section className="py-24 bg-slate-50">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-slate-900">FAQ</h2>
        </div>
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="bg-white rounded-2xl border border-slate-100 px-6">
              <AccordionTrigger className="text-left font-bold text-slate-900 hover:no-underline py-6">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-slate-500 pb-6">
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