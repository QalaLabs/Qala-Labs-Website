"use client";

import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/layout/SEO";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Zap, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ProjectCard from "@/components/portfolio/ProjectCard";
import { CaseStudyCardSkeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { showError } from "@/utils/toast";
import GaffarLogo from '@/assets/gaffar-new-logo.webp';
import NutrivendThumbnail from '@/assets/nutrivend/training-boxers-gym.jpg?w=900&format=webp&quality=82';
import TrotrFeatured from '@/assets/trotr-featured.jpeg?w=900&format=webp&quality=82';
import KashmirFeatured from '@/assets/kashmir-street-musician.jpg?w=900&format=webp&quality=82';

const CaseStudies = () => {
  const [studies, setStudies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();

  const featuredStudies = [
    {
      id: 'nutrivend-uk-meta-lead-gen',
      title: "Nutrivend UK: B2B Market Validation",
      slug: "Meta-Lead-Generation-Ad-UK-Market",
      category: "Meta Lead Generation",
      result: "45 B2B Leads • 71% Untapped Market",
      image: NutrivendThumbnail,
      imageClassName: "object-center",
      imageAlt: "Nutrivend UK Meta lead generation case study thumbnail showing boxing gym audience validation"
    },
    {
      id: 'trotr-featured',
      title: "Trotr: Spain Pivot",
      slug: "Trotr-Meta-Lead-Generation",
      category: "Lead Generation",
      result: "28x ROAS • ₹14L Revenue",
      image: TrotrFeatured,
      imageClassName: "object-center",
      imageAlt: "Trotr Meta lead generation case study thumbnail showing Spain travel campaign audience"
    },
    {
      id: 'gaffar-featured',
      title: "Gaffar India",
      slug: "gaffar-india-rebrand",
      category: "Brand Identity",
      result: "Marketplace Rebrand",
      image: GaffarLogo,
      isLogo: true
    },
    {
      id: 'kashmiri-featured',
      title: "Kashmiri Sound",
      slug: "kashmiri-movement",
      category: "Cultural Movement",
      result: "Zero Ad Spend • 25K Subs",
      image: KashmirFeatured,
      imageClassName: "object-center",
      imageAlt: "Kashmiri music organic growth case study thumbnail showing a traditional street musician"
    }
  ];

  useEffect(() => {
    const fetchStudies = async () => {
      const { data, error } = await supabase
        .from("case_studies")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) showError("Failed to load case studies. Please refresh.");
      const dbStudies = data || [];
      const merged = [...featuredStudies];
      
      dbStudies.forEach(dbS => {
        if (!merged.find(m => m.slug === dbS.slug)) {
          merged.push({
            ...dbS,
            result: dbS.results?.headline || "View Results",
            image: dbS.image_url || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
          });
        }
      });

      setStudies(merged);
      setLoading(false);
    };
    fetchStudies();
  }, []);

  const categories = ["All", ...new Set(studies.map(s => s.category).filter(Boolean))];
  const filteredStudies = activeCategory === "All" 
    ? studies 
    : studies.filter(s => s.category === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="DTC Ecommerce Case Studies India | Proven Revenue Growth | Qala Labs"
        description="Real results from real DTC brands — 28x ROAS, 11.2x Amazon ROAS, 5M+ viral reach. See how Qala Labs builds scale engines for ecommerce brands in India."
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

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
            {Array.from({ length: 6 }).map((_, i) => <CaseStudyCardSkeleton key={i} />)}
          </div>
        ) : (
          <>
            <div className="flex flex-wrap justify-center gap-3 mb-16">
              {categories.map((cat: any) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  aria-pressed={activeCategory === cat}
                  className={`px-8 py-4 rounded-2xl font-black text-sm transition-all duration-500 flex items-center gap-2 ${
                    activeCategory === cat
                      ? "bg-blue-600 text-white shadow-2xl shadow-blue-200 scale-105"
                      : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-100"
                  }`}
                >
                  {cat === "All" && <Filter className="w-4 h-4" />}
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
              <AnimatePresence mode="popLayout">
                {filteredStudies.map((study) => (
                  <ProjectCard
                    key={study.id || study.slug}
                    project={study}
                    onClick={() => navigate(`/case-studies/${study.slug}`)}
                  />
                ))}
              </AnimatePresence>
            </div>
          </>
        )}

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
