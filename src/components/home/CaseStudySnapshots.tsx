"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const CaseStudySnapshots = () => {
  const studies = [
    {
      title: "GlowSkin: Scaled to ₹12Cr in 90 Days",
      challenge: "High CAC and plateaued growth on Meta. Needed a high-velocity creative system to unlock the next level of scale.",
      outcome: "Deployed a high-velocity UGC engine and server-side tracking. CVR lifted by 42% while ROAS sustained at 6x on aggressive spend.",
      cta: "View Full Case Study"
    },
    {
      title: "Home Decor: 8.4x ROAS on Google Shopping",
      challenge: "Inefficient PMax performance and poor catalog hygiene led to high spend with low returns.",
      outcome: "Audited the product feed, implemented Python-based bidding scripts, and optimized inventory syncing. Revenue jumped by 310% YoY.",
      cta: "View Full Case Study"
    }
  ];

  return (
    <section className="py-32 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-24">
          <h2 className="text-4xl md:text-7xl font-black tracking-tight">Case study snapshots</h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-10">
          {studies.map((study, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-12 md:p-16 bg-white/5 backdrop-blur-xl rounded-[4rem] border border-white/10 flex flex-col hover:border-blue-500/30 transition-all duration-500"
            >
              <h3 className="text-2xl md:text-3xl font-black mb-12 text-blue-400 tracking-tight">{study.title}</h3>
              
              <div className="space-y-10 flex-1">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3">The Challenge</p>
                  <p className="text-slate-300 leading-relaxed text-lg">{study.challenge}</p>
                </div>
                <div className="p-8 bg-blue-600/10 rounded-3xl border border-blue-600/20">
                  <p className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-3">The Outcome</p>
                  <p className="text-xl font-bold leading-snug">{study.outcome}</p>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                  <p className="text-sm italic text-slate-400 leading-relaxed">Proven systems that turn marketing spend into a predictable revenue asset.</p>
                </div>
              </div>

              <Link to="/case-studies" className="mt-16">
                <Button variant="outline" className="w-full h-16 rounded-2xl border-white/10 text-white hover:bg-white hover:text-slate-900 font-black">
                  {study.cta} <ArrowRight className="ml-2 w-5 h-5" />
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