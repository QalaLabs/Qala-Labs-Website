"use client";

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQBlockProps {
  title?: string;
  items: FAQItem[];
}

const FAQBlock = ({ title, items }: FAQBlockProps) => {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-3xl mx-auto px-4">
        {title && (
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900">{title}</h2>
          </div>
        )}
        <Accordion type="single" collapsible className="w-full space-y-4">
          {items?.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="bg-white rounded-2xl border border-slate-100 px-6">
              <AccordionTrigger className="text-left font-bold text-slate-900 hover:no-underline py-6">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-500 pb-6">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQBlock;