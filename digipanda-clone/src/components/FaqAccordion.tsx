import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'What makes Qala Labs fundamentally different from traditional agencies?',
    a: 'Traditional agencies separate engineering, creative, and performance marketing into slow, disconnected silos. Qala Labs operates as an integrated growth and technology studio where full-stack engineers, AI modelers, and brand strategists collaborate directly. We engineer the software, craft the narrative, and scale the distribution under one unified system.',
  },
  {
    q: 'How did Qala Labs achieve a 28x ROAS for high-ticket travel with Trotr?',
    a: 'For high-ticket purchases, generic ads fail because buyers require community proof and founder credibility. We pivoted Trotr to founder-led documentary storytelling combined with A/B audience engineering and sequential video retargeting. This drove ₹14 Lakhs in revenue with 100% lead booking conversion in 30 days.',
  },
  {
    q: 'How does your AI Creative Engine reduce production costs by 80%?',
    a: 'As proven with WWF India, we build custom generative pipelines that adhere to brand guidelines, typography, and color tokens. The system produces dozens of on-brand creative variations automatically, cutting turnaround from weeks to minutes and lifting CTR by 23% through rapid A/B testing.',
  },
  {
    q: 'How does your B2B market validation framework work?',
    a: 'Instead of spending months and huge budgets guessing market demand, we deploy audience engineering campaigns that test real purchasing intent across multiple niche B2B segments simultaneously. For Nutrivend UK, we validated a 71% untapped fitness market and generated 45 qualified leads in just 7 days.',
  },
  {
    q: 'Can Qala Labs build full-scale web platforms and marketplaces?',
    a: 'Yes. We have built multi-vendor marketplace engines like Gaffar India (vendor portals, 1,000+ live SKUs, rapid checkout) and proptech engines like Capital Keys (delivering 64.7% lead conversion and automated CRM routing).',
  },
  {
    q: 'How do you optimize D2C conversion rates through payment strategy?',
    a: 'Payment friction is often the single biggest conversion killer for D2C founders. We help brands integrate BNPL (Buy Now Pay Later) and optimized multi-provider checkout flows, which consistently yield a 15-30% conversion uplift and a 20-40% increase in Average Order Value (AOV).',
  },
  {
    q: 'What does an engagement with Qala Labs look like?',
    a: 'We engage either through focused 30-day sprints (e.g. Market Validation, Marketplace Launch, AI Creative Setup) or long-term growth partnerships where we operate as your dedicated engineering and growth lab.',
  },
];

export const FaqAccordion: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="relative py-28 bg-[#06070D] overflow-hidden">
      <div className="absolute inset-0 bg-[url('/assets/bgrk2.webp')] bg-center bg-cover opacity-15 pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-4xl">
        <div className="text-center mb-16">
          <div className="eyebrow">
            <span className="w-2 h-2 rounded-full bg-[#3FE0E0] animate-blink" />
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-white tracking-tight">
            Have Questions? We’ve Answers!
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#121324]/80 border border-white/10 overflow-hidden transition-all duration-300 hover:border-[#3FE0E0]/40"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full text-left py-5 px-6 md:px-8 flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-medium text-base md:text-lg text-white">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180 bg-[#3FE0E0] text-black' : 'text-white/60'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 md:px-8 pb-6 pt-1 text-white/70 text-sm md:text-base leading-relaxed border-t border-white/5">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-center pt-12">
          <a
            href="mailto:hello@qalalabs.com"
            className="group relative bg-gradient-to-r from-[#4F46E5] to-[#3FE0E0] hover:brightness-110 text-white py-3 px-8 rounded-full font-semibold text-sm transition-all duration-300 flex items-center gap-3 overflow-hidden shadow-xl hover:scale-105"
          >
            <span className="w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center font-bold text-xs transition-transform duration-500 transform group-hover:translate-x-20">
              Q
            </span>
            <span className="transition-transform duration-500 transform group-hover:-translate-x-4">
              Ask A Question
            </span>
          </a>
        </div>

      </div>
    </section>
  );
};
