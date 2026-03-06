"use client";

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { Filter, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const PortfolioGrid = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('portfolio_projects')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error) setProjects(data || []);
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
              project={{
                ...project,
                result: project.description?.substring(0, 60) + "...",
                image: project.image_url || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
              }} 
              onClick={() => navigate(`/portfolio/${project.slug || project.id}`)}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {projects.length === 0 && (
        <div className="text-center py-20 bg-white rounded-[3rem] border border-slate-100">
          <p className="text-slate-400 font-bold">No projects found. Add some in the admin panel.</p>
        </div>
      )}
    </div>
  );
};

export default PortfolioGrid;