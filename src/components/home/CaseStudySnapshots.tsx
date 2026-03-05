"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const CaseStudySnapshots = () => {
  const studies = [
    {
      brand: "TroTr: Lead Generation",
      challenge: "Low lead volume and rising CPL while the product-market-fit window was opening.",
      action: "Rebuilt the funnel: attention creative, mid-funnel nurture, AI-driven lead scoring and server-side conversions.",
      outcome: "₹14L attributed revenue; ₹6,700 CPL; 28× ROAS; ₹1.9L average order value.",
      meaning: "Rapid, measurable growth that turned cost centers into profitable acquisition machines.",
      slug: "meta-lead-generation-trotr"
    },
    {
      brand: "Mystic Studio 8: Music Movement",
      challenge: "Total lack of historical data and digital infrastructure in a region with deep-rooted traditions.",
      action: "Deployed a 3-month staggered release framework with server-side tracking and proprietary attribution models.",
      outcome: "3.4M+ views; 25.7K subscribers; 61% retention; 91% positive sentiment.",
      meaning: "Transformed an unknown regional label into a cultural movement through data-driven storytelling.",
      slug: "music-marketing"
    }
  ];

  return (
    <section className="py-24 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-20">
          <h2 className="text-4xl md:text-6xl font-black mb-6">Case study snapshots</h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-12">
          {studies.map((study, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-10 md:p-16 bg-white/5 backdrop-blur-xl rounded-[3rem] border border-white/10 flex flex-col"
            >
              <h3 className="text-2xl font-bold mb-8 text-blue-400">{study.brand}</h3>
              
              <div className="space-y-8 flex-1">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Challenge</p>
                  <p className="text-slate-300">{study.challenge}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">What we did</p>
                  <p className="text-slate-300">{study.action}</p>
                </div>
                <div className="p-6 bg-blue-600/10 rounded-2xl border border-blue-600/20">
                  <p className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-2">Outcome (90 days)</p>
                  <p className="text-xl font-bold">{study.outcome}</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-1" />
                  <p className="text-sm italic text-slate-400">{study.meaning}</p>
                </div>
              </div>

              <Link to={`/case-studies/${study.slug}`} className="mt-12">
                <Button variant="outline" className="w-full py-6 rounded-xl border-white/20 text-white hover:bg-white hover:text-slate-900">
                  View Full Case Study <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudySnapshots;