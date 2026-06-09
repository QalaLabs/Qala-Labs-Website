"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, XCircle, Lightbulb, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const CaseStudySnapshots = () => {
  const [studies, setStudies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentStudies = async () => {
      const { data, error } = await supabase
        .from('case_studies')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(2);
      
      if (!error && data && data.length > 0) {
        setStudies(data);
      } else {
        // Fallback to high-quality defaults if DB is empty
        setStudies([
          {
            slug: 'Trotr-Meta-Lead-Generation',
            title: "Trotr: The Spain Strategy Pivot",
            category: "Lead Generation",
            description: "Scaling high-ticket travel conversions failed with standard WhatsApp ads due to a lack of trust.",
            results: {
              headline: "₹14L Revenue • 28x ROAS",
              learnings: [{ myth: "Click-to-WhatsApp always converts.", reality: "High-ticket trust requires a frictionless website funnel." }]
            }
          },
          {
            slug: 'nutrivend-uk-expansion',
            title: "Nutrivend: UK Market Expansion",
            category: "International Expansion",
            description: "Cold audience lead generation campaigns across the UK market for a health & wellness vending brand entering a new geography.",
            results: {
              headline: "1,200+ Leads • 6.8x ROAS",
              learnings: [{ myth: "Cold audiences are too expensive to convert.", reality: "Strategic targeting and localized creative unlocked profitable UK acquisition at £2.45 CPL." }]
            }
          }
        ]);
      }
      setLoading(false);
    };

    fetchRecentStudies();
  }, []);

  if (loading) {
    return (
      <div className="py-24 bg-slate-900 flex justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-blue-400" />
      </div>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-slate-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12 md:mb-20">
          <h2 className="text-sm font-black text-blue-400 uppercase tracking-[0.2em] mb-4">
            Case study snapshots
          </h2>
          <h3 className="text-3xl md:text-6xl font-black mb-6 tracking-tight">Proven Results.</h3>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
          {studies.map((study, i) => (
            <motion.div
              key={study.slug || study.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, scale: 1.015, boxShadow: "0 40px 80px -20px rgba(59,130,246,0.3)" }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 300, damping: 22 }}
              className="p-8 md:p-14 bg-white/5 backdrop-blur-xl rounded-[2.5rem] md:rounded-[3.5rem] border border-white/10 flex flex-col h-full hover:border-blue-500/50 transition-colors group cursor-default"
            >
              <div className="mb-6 md:mb-8">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-2 block">
                  {study.category}
                </span>
                <h3 className="text-2xl md:text-3xl font-black mb-6 md:mb-8 group-hover:text-blue-400 transition-colors">
                  {study.title}
                </h3>
              </div>
              
              <div className="space-y-6 md:space-y-8 flex-1">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3">The Challenge</p>
                  <p className="text-slate-300 text-sm md:text-base leading-relaxed line-clamp-3">
                    {study.description}
                  </p>
                </div>

                <div className="p-5 md:p-6 bg-blue-600/10 rounded-2xl md:rounded-3xl border border-blue-600/20">
                  <p className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-2">The Outcome</p>
                  <p className="text-lg md:text-xl font-bold text-white">
                    {study.results?.headline || "View Results"}
                  </p>
                </div>

                {study.results?.learnings?.[0] && (
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-blue-400" /> Key Insight
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-1" />
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-widest text-red-400 block mb-1">Myth</span>
                          <p className="text-xs md:text-sm font-bold text-slate-200">"{study.results.learnings[0].myth}"</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-1" />
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-widest text-green-400 block mb-1">Reality</span>
                          <p className="text-xs md:text-sm text-slate-400 leading-relaxed">{study.results.learnings[0].reality}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link to={`/case-studies/${study.slug || study.id}`} className="mt-10 md:mt-12">
                <Button variant="outline" className="w-full py-6 md:py-7 rounded-xl md:rounded-2xl border-white/10 text-white hover:bg-white hover:text-slate-900 font-black transition-all">
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