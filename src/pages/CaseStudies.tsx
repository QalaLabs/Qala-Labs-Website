"use client";

import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/layout/SEO";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ArrowRight, Play, Target, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ProjectCard from "@/components/portfolio/ProjectCard";
import { supabase } from "@/integrations/supabase/client";

const CaseStudies = () => {
  const [studies, setStudies] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState("");
  const navigate = useNavigate();

  const fetchStudies = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("case_studies")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (!error) setStudies(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchStudies();
  }, []);

  const filteredStudies = studies.filter((study) =>
    study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    study.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Proven Results | Qala Labs" 
        description="Real data from real brands. See how we use our scale engines to dominate markets." 
      />
      <Navbar />
      
      <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <Badge className="bg-blue-600/10 text-blue-700 border-none mb-6 px-4 py-1 rounded-full font-bold">
            The Proof is in the P&L
          </Badge>
          <h1 className="text-5xl md:text-8xl font-black text-slate-900 mb-8 tracking-tighter">
            Proven <span className="text-blue-600">Results.</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            We don't just promise growth. We engineer it. Explore our 8-figure success stories and the data behind them.
          </p>
        </motion.div>

        {/* Featured Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          {/* Music Marketing Case Study */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100 bg-slate-900"
          >
            <img 
              src="https://images.unsplash.com/photo-1514525253361-bee8718a740d?auto=format&fit=crop&q=80&w=800" 
              alt="Music Marketing" 
              className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
            <div className="absolute bottom-10 left-10 right-10">
              <Badge className="bg-blue-600 text-white mb-4">Music Marketing</Badge>
              <h3 className="text-3xl font-black text-white mb-2">Rhythm Records</h3>
              <p className="text-blue-400 font-bold mb-6">3.4M+ Organic Views</p>
              <Link to="/case-studies/music-marketing">
                <button className="w-full py-4 bg-white text-slate-900 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-blue-600 hover:text-white transition-all">
                  View Case Study <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Trotr Case Study */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="group relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100 bg-slate-900"
          >
            <img 
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800" 
              alt="Trotr Travel" 
              className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
            <div className="absolute bottom-10 left-10 right-10">
              <Badge className="bg-blue-600 text-white mb-4">Lead Generation</Badge>
              <h3 className="text-3xl font-black text-white mb-2">Trotr: Spain Pivot</h3>
              <p className="text-blue-400 font-bold mb-6">28x ROAS • ₹14L Revenue</p>
              <Link to="/case-studies/Trotr-Meta-Lead-Generation">
                <button className="w-full py-4 bg-white text-slate-900 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-blue-600 hover:text-white transition-all">
                  View Case Study <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Kashmiri Movement Case Study */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="group relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100 bg-slate-900"
          >
            <img 
              src="https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=800" 
              alt="Kashmiri Sound" 
              className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
            <div className="absolute bottom-10 left-10 right-10">
              <Badge className="bg-blue-600 text-white mb-4">Cultural Movement</Badge>
              <h3 className="text-3xl font-black text-white mb-2">Kashmiri Sound</h3>
              <p className="text-blue-400 font-bold mb-6">Zero Ad Spend • 25K Subs</p>
              <Link to="/case-studies/kashmiri-movement">
                <button className="w-full py-4 bg-white text-slate-900 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-blue-600 hover:text-white transition-all">
                  View Case Study <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Dynamic Grid from Supabase */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-black text-slate-900">More Success Stories</h2>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search stories..." 
                  className="pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-600 outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Target className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
            </div>
          </div>

          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredStudies.map((study) => (
                <ProjectCard 
                  key={study.id} 
                  project={{
                    ...study,
                    result: study.results?.headline || "View Results",
                    image: study.image_url || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
                  }} 
                  onClick={() => navigate(`/case-studies/${study.slug || study.id}`)}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredStudies.length === 0 && (
            <div className="text-center py-20 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
              <p className="text-slate-400 font-bold">No additional case studies found matching your search.</p>
            </div>
          )}
        </div>

        {/* Scale Quiz CTA */}
        <section className="py-20">
          <div className="relative p-12 md:p-20 bg-slate-900 rounded-[4rem] overflow-hidden text-center shadow-2xl">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight text-white">
                Is your brand ready <br /> for an 8-figure scale?
              </h2>
              <p className="text-slate-400 mb-10 max-w-xl mx-auto text-lg">
                Take our 2-minute scale potential assessment and get a custom 90-day roadmap.
              </p>
              <Link to="/quiz">
                <button className="bg-blue-600 text-white hover:bg-blue-700 px-10 py-6 rounded-2xl text-xl font-black group transition-all shadow-xl shadow-blue-500/20">
                  Take the Scale Quiz <Zap className="ml-2 w-6 h-6 inline-block group-hover:rotate-12 transition-transform" />
                </button>
              </Link>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] -ml-32 -mb-32" />
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default CaseStudies;