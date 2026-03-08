"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface CaseStudySnapshotsProps {
  studyIds?: string[];
}

const CaseStudySnapshots = ({ studyIds }: CaseStudySnapshotsProps) => {
  const [studies, setStudies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestStudies = async () => {
      setLoading(true);
      let query = supabase.from('case_studies').select('*');
      
      if (studyIds && studyIds.length > 0) {
        query = query.in('id', studyIds);
      } else {
        query = query.order('created_at', { ascending: false }).limit(2);
      }
      
      const { data, error } = await query;
      
      if (!error && data) {
        // If we have specific IDs, preserve the order they were provided in
        if (studyIds && studyIds.length > 0) {
          const orderedData = studyIds
            .map(id => data.find(s => s.id === id))
            .filter(Boolean);
          setStudies(orderedData);
        } else {
          setStudies(data);
        }
      }
      setLoading(false);
    };
    fetchLatestStudies();
  }, [studyIds]);

  if (loading) {
    return (
      <div className="py-20 flex justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <section className="py-24 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-20">
          <h2 className="text-sm font-black text-blue-400 uppercase tracking-[0.2em] mb-4">
            Case study snapshots
          </h2>
          <h3 className="text-4xl md:text-6xl font-black mb-6">Proven results</h3>
        </div>
        <div className="grid lg:grid-cols-2 gap-12">
          {studies.map((study, i) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-10 md:p-16 bg-white/5 backdrop-blur-xl rounded-[3rem] border border-white/10 flex flex-col"
            >
              <h3 className="text-2xl font-bold mb-8 text-blue-400">{study.title}</h3>
              
              <div className="space-y-8 flex-1">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Challenge</p>
                  <p className="text-slate-300 line-clamp-3">{study.description}</p>
                </div>
                {study.results?.headline && (
                  <div className="p-6 bg-blue-600/10 rounded-2xl border border-blue-600/20">
                    <p className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-2">Outcome</p>
                    <p className="text-xl font-bold">{study.results.headline}</p>
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-1" />
                  <p className="text-sm italic text-slate-400">Rapid, measurable growth that turned cost centers into profitable acquisition machines.</p>
                </div>
              </div>

              <Link to={`/case-studies/${study.slug || study.id}`} className="mt-12">
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