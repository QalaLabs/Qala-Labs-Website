"use client";

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { Filter } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "GlowSkin DTC",
    category: "DTC",
    result: "₹12Cr in 90 Days",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800",
    video: "https://assets.mixkit.co/videos/preview/mixkit-woman-applying-face-cream-42884-large.mp4",
    metrics: { roas: "4.2x", growth: "310%" },
    tags: ["Meta Ads", "TikTok", "LTV Optimization"],
    description: "How we leveraged creator-led content and proprietary attribution to dominate the skincare niche."
  },
  {
    id: 2,
    title: "UrbanThread",
    category: "Fashion",
    result: "3.5x ROAS on TikTok",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800",
    video: "https://assets.mixkit.co/videos/preview/mixkit-fashion-model-walking-on-a-runway-42885-large.mp4",
    metrics: { roas: "3.5x", growth: "180%" },
    tags: ["TikTok Ads", "UGC", "Influencer"],
    description: "Scaling a streetwear brand through high-velocity creative testing and creator partnerships."
  },
  {
    id: 3,
    title: "PureHydrate",
    category: "Performance",
    result: "42% CVR Lift",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    video: "https://assets.mixkit.co/videos/preview/mixkit-pouring-water-into-a-glass-42886-large.mp4",
    metrics: { roas: "5.1x", growth: "220%" },
    tags: ["CRO", "A/B Testing", "Landing Pages"],
    description: "Optimizing the post-click experience to maximize every rupee of ad spend."
  },
  {
    id: 4,
    title: "LuxeDecor",
    category: "DTC",
    result: "Scaled to $1M/mo",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800",
    video: "https://assets.mixkit.co/videos/preview/mixkit-interior-of-a-modern-living-room-42887-large.mp4",
    metrics: { roas: "3.8x", growth: "450%" },
    tags: ["Google Ads", "PMax", "Retention"],
    description: "Building a sustainable scale engine for a high-ticket home decor brand."
  },
  {
    id: 5,
    title: "FitFuel",
    category: "Performance",
    result: "50% Lower CPA",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800",
    video: "https://assets.mixkit.co/videos/preview/mixkit-man-exercising-in-a-gym-42888-large.mp4",
    metrics: { roas: "4.8x", growth: "120%" },
    tags: ["Meta Ads", "Creative Strategy", "Data"],
    description: "Reducing acquisition costs through aggressive creative iteration and audience modeling."
  },
  {
    id: 6,
    title: "AuraJewels",
    category: "Fashion",
    result: "Global Expansion",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800",
    video: "https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-woman-wearing-jewelry-42889-large.mp4",
    metrics: { roas: "6.2x", growth: "510%" },
    tags: ["International", "Localization", "SEO"],
    description: "Taking a boutique jewelry brand to the US and UAE markets with localized scale engines."
  },
  {
    id: 7,
    title: "EcoHome",
    category: "DTC",
    result: "8-Figure Transformation",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800",
    video: "https://assets.mixkit.co/videos/preview/mixkit-woman-cleaning-a-kitchen-counter-42890-large.mp4",
    metrics: { roas: "3.9x", growth: "280%" },
    tags: ["Headless", "Shopify", "Performance"],
    description: "Modernizing a sustainable home goods brand for the digital-first economy."
  },
  {
    id: 8,
    title: "TechGadget",
    category: "Performance",
    result: "Omnichannel Dominance",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800",
    video: "https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-computer-keyboard-42891-large.mp4",
    metrics: { roas: "4.5x", growth: "150%" },
    tags: ["Google Ads", "Meta", "YouTube"],
    description: "Dominating the tech niche through a unified omnichannel growth strategy."
  }
];

const categories = ["All", "DTC", "Fashion", "Performance"];

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
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onClick={() => setSelectedProject(project)}
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