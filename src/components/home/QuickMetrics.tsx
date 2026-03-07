"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

const QuickMetrics = () => {
  const [metrics, setMetrics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      // Fetching metrics from the latest 2 case studies
      const { data, error } = await supabase
        .from('case_studies')
        .select('title, results')
        .order('created_at', { ascending: false })
        .limit(2);
      
      if (!error && data) {
        const formattedMetrics = data.map(study => ({
          brand: study.title,
          stats: study.results?.metrics?.slice(0, 4) || []
        }));
        setMetrics(formattedMetrics);
      }
      setLoading(false);
    };
    fetchMetrics();
  }, []);

  if (loading) {
    return (
      <div className="py-20 flex justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-16">
          <h2 className="text-sm font-black text-blue-600 uppercase tracking-[0.2em] mb-4">
            Recent Results
          </h2>
          <h3 className="text-4xl md:text-6xl font-black text-slate-900 mb-6">Recent Results</h3>
        </div>
        <div className="grid gap-8">
          {metrics.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-none shadow-xl bg-slate-900 text-white rounded-[2.5rem] overflow-hidden">
                <CardContent className="p-10 md:p-16">
                  <h3 className="text-xl font-bold mb-12 text-blue-400">{item.brand}</h3>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {item.stats.map((stat: any, j: number) => (
                      <div key={j} className="space-y-2">
                        <p className="text-4xl md:text-5xl font-black tracking-tighter">{stat.value}</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
 </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickMetrics;