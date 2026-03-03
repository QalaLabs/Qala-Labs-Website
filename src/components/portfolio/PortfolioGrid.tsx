"use client";

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { Filter } from 'lucide-react';

const projects = [
  {
    id: 10,
    title: "Trotr: Founder-Led Storytelling",
    category: "Meta Lead Generation",
    result: "28x ROAS & ₹14L Revenue",
    slug: "meta-lead-generation-trotr",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800",
    video: "https://assets.mixkit.co/videos/preview/mixkit-traveler-walking-on-a-mountain-path-42888-large.mp4",
    metrics: { roas: "28x", growth: "₹14L Rev" },
    tags: ["Meta Ads", "Lead Gen", "Storytelling"],
    description: "How we pivoted from failing WhatsApp ads to a founder-led storytelling engine that sold out a high-ticket Spain trip."
  },
  {
    id: 9,
    title: "Turning Regional Roots into a Global Soundtrack",
    category: "Music Marketing",
    result: "3.4M+ Views in 90 Days",
    slug: "music-marketing",
    image: "https://images.unsplash.com/photo-1514525253361-bee8718a740b?auto=format&fit=crop&q=80&w=800",
    video: "https://assets.mixkit.co/videos/preview/mixkit-man-singing-into-a-microphone-42892-large.mp4",
    metrics: { roas: "N/A", growth: "25.7K Subs" },
    tags: ["Music Label", "Kashmir", "Digital Strategy"],
    description: "Building Kashmir's first digital-first music label through staggered storytelling and community-first activations."
  }
];

const categories = ["All", "Music Marketing", "Meta Lead Generation"];

const PortfolioGrid = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="w-full">
      {/* Filter Controls */}
      <div className="flex flex-wrap justify-center gap-3 mb-16">
        {categories.map((cat) => (
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

      {/* Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onClick={() => {
                if (project.slug) {
                  window.location.href = `/case-studies/${project.slug}`;
                } else {
                  setSelectedProject(project);
                }
              }}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Project Modal */}
      <ProjectModal 
        project={selectedProject} 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </div>
  );
};

export default PortfolioGrid;