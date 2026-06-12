"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import ProjectCard from '../portfolio/ProjectCard';
import CSKUGCHero from '@/assets/csk-ugc-hero.png';
import TeamLogos from '@/assets/ipl/team-logos.png';
import WPLHero from '@/assets/pickleball/wpl-hero.png';

const PortfolioSnapshots = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const featuredProjects = [
    {
      id: 'ugc-featured',
      title: "Instagram UGC: Creator Content Campaign",
      slug: "Instagram-user-generated-content",
      category: "Social Media",
      result: "100K+ Views • 8.4% Engagement",
      image: CSKUGCHero
    },
    {
      id: 'wwf-featured',
      title: "WWF India: AI Ad Creatives",
      slug: "ai-ad-creatives-wwfindia",
      category: "AI Creative",
      result: "-80% Production Time • 42% Lift",
      image: "/clients/wwf.png"
    },
    {
      id: 'capital-keys-featured',
      title: "Capital Keys: Real Estate Platform",
      slug: "real-estate-website-development",
      category: "Web Development",
      result: "17+ Leads • 64.7% Conversion",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800"
    }
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('portfolio_projects')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);
      
      if (!error && data && data.length > 0) {
        const merged = [...featuredProjects];
        data.forEach(dbP => {
          if (!merged.find(m => m.slug === dbP.slug)) {
            merged.push({
              ...dbP,
              result: dbP.description?.substring(0, 40) + "...",
              image: dbP.image_url || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
            });
          }
        });
        setProjects(merged.slice(0, 6));
      } else {
        setProjects(featuredProjects);
      }
      setLoading(false);
    };
    fetchProjects();
  }, []);

  if (loading) return null;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-sm font-black text-blue-600 uppercase tracking-[0.2em] mb-4">
              Portfolio Highlights
            </h2>
            <h3 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">
              The Creative Edge.
            </h3>
          </div>
          <Link to="/portfolio">
            <Button variant="outline" className="rounded-2xl px-8 py-6 font-black border-2 border-slate-100 hover:bg-slate-50 group">
              View All Work <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onClick={() => navigate(`/portfolio/${project.slug}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSnapshots;