"use client";

import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/layout/SEO";
import CaseStudyGrid from "@/components/case-studies/CaseStudyGrid";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ProjectCard from "@/components/portfolio/ProjectCard";
import { AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

const CaseStudies = () => {
  const [studies, setStudies] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchParams] = useSearchParams();
  const isPreview = searchParams.get("preview") === "true";
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
  }, [fetchStudies]);

  const filteredStudies = studies.filter((study) =>
    study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    study.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="py-20 flex justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <SEO 
        title="Proven Results" 
        description="Real data from real brands. See how we use our scale engines to dominate markets." 
      />
      <Navbar />
      
      <div className="pt-32 pb-20 px-4 max-w-[1600px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-8xl font-black text-slate-900 mb-6 tracking-tighter">
            Proven <span className="text-blue-600">Results.</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            We don't just promise growth. We deliver it. Explore our 8-figure success stories and the data behind them.
          </p>
        </motion.div>

        {/* Featured Case Studies */}
        <div className="mb-32">
          <div className="flex flex-wrap justify-center gap-8 mb-16">
            {/* Music Marketing Case Study */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group hover:scale-105 transition-transform duration-500"
            >
              <a href="/case-studies/music-marketing">
                <div className="w-full rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100 bg-white">
                  <img 
                    src="https://example.com/music-marketing-hero.jpg" 
                    alt="Music Marketing Case Study" 
                    className="w-full h-full object-cover transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-4 left-4">
                      <Badge className="bg-blue-600 text-white px-3 py-1 rounded-full font-bold uppercase tracking-widest text-[10px]">
                        Music Marketing
                      </Badge>
                      <h3 className="text-2xl font-black text-white mb-2">Rhythm Records</h3>
                      <p className="text-sm text-white opacity-90">3.4M+ Views</p>
                    </div>
                  </div>
                </div>
              </a>
            </motion.div>

            {/* Trotr Case Study */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group hover:scale-105 transition-transform duration-500"
            >
              <a href="/case-studies/Trotr-Meta-Lead-Generation">
                <div className="w-full rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100 bg-white">
                  <img 
                    src="https://example.com/trotr-hero.jpg" 
                    alt="Trotr Case Study" 
                    className="w-full h-full object-cover transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-4 left-4">
                      <Badge className="bg-blue-600 text-white px-4 py-1 rounded-full font-bold uppercase tracking-widest text-[10px]">
                        Founder-Led Marketing
                      </Badge>
                      <h3 className="text-2xl font-black text-white mb-2">Trotr: ₹14L Revenue</h3>
                      <p className="text-sm text-white opacity-90">28x ROAS</p>
                    </div>
                  </div>
                </div>
              </a>
            </motion.div>
          </div>
        </div>

        {/* Main Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          <AnimatePresence mode="popLayout">
            {studies.map((study) => (
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

        {studies.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[3rem] border border-slate-100">
            <p className="text-slate-400 font-bold">No case studies found. Add some in the admin panel.</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CaseStudies;