"use client";

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { Filter, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import TeamLogos from '@/assets/ipl/team-logos.png';
import WPLHero from '@/assets/pickleball/wpl-hero.png';

const PortfolioGrid = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();

  // Hardcoded featured projects to ensure they are always visible
  const featuredProjects = [
    {
      id: 'wwf-india-featured',
      title: "WWF India: AI Ad Creatives",
      slug: "ai-ad-creatives-wwfindia",
      category: "AI Creative",
      result: "80% Lower Production Cost",
      image: "dyad-media://media/flying-kraken-wag/.dyad/media/b6a576bf9964decedd3f805bcebaefbd.png",
      isFeatured: true
    },
    {
      id: 'ipl-merch-featured',
      title: "playR: IPL Merchandise Partner",
      slug: "ipl-merchandise-partner-playr",
      category: "Merchandise Design",
      result: "Full Ecosystem • 8 Franchises",
      image: TeamLogos,
      isFeatured: true
    },
    {
      id: 'pickleball-featured',
      title: "World Pickleball League: Apparel",
      slug: "merchandise-design-apparel",
      category: "Merchandise Design",
      result: "Full Kit & Retail System",
      image: WPLHero,
      isFeatured: true
    },
    {
      id: 'capital-keys-featured',
      title: "Capital Keys: Real Estate Platform",
      slug: "real-estate-website-development",
      category: "Web Development",
      result: "17+ Leads • 64.7% Conversion",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
      isFeatured: true
    },
    {
      id: 'amazon-ads-featured',
      title: "Amazon Ads: Performance Scaling",
      slug: "Amazon-ads",
      category: "Performance Marketing",
      result: "11.2x ROAS • ₹2.7L Sales",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
      isFeatured: true
    },
    {
      id: 'instagram-ugc-featured',
      title: "Instagram UGC: Style Meets Real Life",
      slug: "Instagram-user-generated-content",
      category: "Content Creation",
      result: "Relatability Converts Better",
      image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=800",
      isFeatured: true
    },
    {
      id: 'csk-influencer-featured',
      title: "CSK: Real Fans, Real Roar",
      slug: "influencer-marketing-campaign-chennai-super-kings",
      category: "User Generated Content",
      result: "Viral Fandom Momentum",
      image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=800",
      isFeatured: true
    }
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('portfolio_projects')
        .select('*')
        .order('created_at', { ascending: false });
      
      const dbProjects = data || [];
      // Merge hardcoded with DB projects, avoiding duplicates by slug
      const merged = [...featuredProjects];
      dbProjects.forEach(dbP => {
        if (!merged.find(m => m.slug === dbP.slug)) {
          merged.push({
            ...dbP,
            result: dbP.description?.substring(0, 60) + "...",
            image: dbP.image_url || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
          });
        }
      });
      
      setProjects(merged);
      setLoading(false);
    };
    fetchProjects();
  }, []);

  const categories = ["All", ...new Set(projects.map(p => p.category).filter(Boolean))];

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  if (loading) {
    return (
      <div className="py-20 flex justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Filter Controls */}
      <div className="flex flex-wrap justify-center gap-3 mb-16">
        {categories.map((cat: any) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
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

      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onClick={() => navigate(`/portfolio/${project.slug}`)}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default PortfolioGrid;