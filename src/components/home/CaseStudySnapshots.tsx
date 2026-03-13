"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Loader2, XCircle, Lightbulb, TrendingUp, Zap, Users } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface CaseStudySnapshotsProps {
  studyIds?: string[];
  slugs?: string[];
}

const CaseStudySnapshots = ({ slugs: propSlugs }: CaseStudySnapshotsProps) => {
  const [studies, setStudies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Use provided slugs or default to the two requested ones
  const targetSlugs = propSlugs && propSlugs.length > 0 
    ? propSlugs 
    : ['Trotr-Meta-Lead-Generation', 'kashmiri-movement'];

  useEffect(() => {
    const fetchCaseStudies = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('case_studies')
        .select('*')
        .in('slug', targetSlugs);
      
      if (!error && data) {
        // Sort to match the order of targetSlugs
        const sortedData = [...data].sort((a, b) => targetSlugs.indexOf(a.slug) - targetSlugs.indexOf(b.slug));
        setStudies(sortedData);
      }
      setLoading(false);
    };
    fetchCaseStudies();
  }, [propSlugs]);

  // Specific data mapping for the requested case studies
  const getCustomData = (slug: string) => {
    if (slug === 'Trotr-Meta-Lead-Generation') {
      return {
        category: "Lead Generation",
        challenge: "Scaling high-ticket travel conversions (Turkey trip) failed with standard WhatsApp ads due to a lack of trust and funnel clarity.",
        outcome: "₹14L Revenue • 28x ROAS • 64.7% Close Rate",
        insight: {
          myth: "Click-to-WhatsApp always converts for travel.",
          reality: "High-ticket trust requires a frictionless website funnel and founder-led storytelling to convert belief into booking."
        }
      };
    }
    if (slug === 'kashmiri-movement') {
      return {
        category: "Cultural Movement",
        challenge: "Launching Kashmir's first digital-first music label with zero previous audience, fanbase, or established distribution playbook.",
        outcome: "3.4M+ Views • 25.7K Subs • Zero Ad Spend",
        insight: {
          myth: "Drop all songs together for maximum virality.",
          reality: "Staggered storytelling and offline community activations build significantly deeper digital momentum and loyalty."
        }
      };
    }
    return null;
  };

  if (loading) {
    return (
      <div className="py-20 flex justify-center bg-slate-900">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  if (studies.length === 0) return null;

  return (
    <section className="py-24 bg-slate-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-20">
          <h2 className="text-sm font-black text-blue-400 uppercase tracking-[0.2em] mb-4">
            Case study snapshots
          </h2>
          <h3 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Proven Results.</h3>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {studies.map((study, i) => {
            const custom = getCustomData(study.slug);
            return (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 md:p-14 bg-white/5 backdrop-blur-xl rounded-[3.5rem] border border-white/10 flex flex-col h-full hover:border-blue-500/50 transition-colors group"
              >
                <div className="mb-8">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-2 block">
                    {custom?.category || study.category || "Case Study"}
                  </span>
                  <h3 className="text-3xl font-black mb-8 group-hover:text-blue-400 transition-colors">
                    {study.title}
                  </h3>
                </div>
                
                <div className="space-y-10 flex-1">
                  {/* Challenge */}
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3">The Challenge</p>
                    <p className="text-slate-300 leading-relaxed">
                      {custom?.challenge || study.description}
                    </p>
                  </div>

                  {/* Outcome */}
                  <div className="p-6 bg-blue-600/10 rounded-3xl border border-blue-600/20">
                    <p className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-2">The Outcome</p>
                    <p className="text-xl font-bold text-white">
                      {custom?.outcome || study.results?.headline}
                    </p>
                  </div>

                  {/* Insights / Learnings */}
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
                      <Lightbulb className="w-3 h-3 text-blue-400" /> Key Insight
                    </p>
                    {custom?.insight ? (
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-1" />
                          <div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-red-400 block mb-1">Myth</span>
                            <p className="text-sm font-bold text-slate-200">"{custom.insight.myth}"</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-1" />
                          <div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-green-400 block mb-1">Reality</span>
                            <p className="text-sm text-slate-400 leading-relaxed">{custom.insight.reality}</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-1" />
                        <p className="text-sm italic text-slate-400">Data-driven storytelling and technical funnel optimization are the primary levers for 8-figure scale.</p>
                      </div>
                    )}
                  </div>
                </div>

                <Link to={`/case-studies/${study.slug || study.id}`} className="mt-12">
                  <Button variant="outline" className="w-full py-7 rounded-2xl border-white/10 text-white hover:bg-white hover:text-slate-900 font-black transition-all">
                    View Full Case Study <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CaseStudySnapshots;