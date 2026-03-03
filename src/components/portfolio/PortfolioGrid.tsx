"use client";

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const projects = [
  {
    id: 11,
    title: "Amazon Ads: Performance Scaling",
    category: "Ecommerce",
    result: "11.2x ROAS & ₹2.7L+ Sales",
    slug: "amazon-ads",
    image: "/src/assets/amazon-ads-hero.png",
    video: "https://assets.mixkit.co/videos/preview/mixkit-shopping-online-on-a-laptop-42890-large.mp4",
    metrics: { roas: "11.2x", growth: "₹2.7L+ Sales" },
    tags: ["Amazon Ads", "E-com", "Scaling"],
    description: "Scaling Amazon Ads profitably for an apparel brand through structured campaign segmentation and search term mining."
  },
  {
    id: 13,
    title: "The Try on campaign",
    category: "Social Media - User Generated Content",
    result: "1.2M+ Views & 22% Conv. Lift",
    slug: "try-on-campaign",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800",
    video: "https://assets.mixkit.co/videos/preview/mixkit-woman-holding-a-smartphone-and-smiling-42896-large.mp4",
    metrics: { roas: "N/A", growth: "1.2M+ Views" },
    tags: ["UGC", "Instagram", "Fashion"],
    description: "A high-velocity UGC campaign for playR that focused on relatability and real-life style integration."
  },
  {
    id: 12,
    title: "Brand Identity: Eco-Luxe",
    category: "Branding",
    result: "Global Brand Launch",
    slug: "eco-luxe",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?auto=format&fit=crop&q=80&w=800",
    video: "https://assets.mixkit.co/videos/preview/mixkit-graphic-designer-working-on-a-tablet-42894-large.mp4",
    metrics: { roas: "N/A", growth: "Global" },
    tags: ["Branding", "Design", "Identity"],
    description: "Crafting a premium, sustainable brand identity for a luxury skincare line."
  }
];

const categories = ["All", "Ecommerce", "Social Media - User Generated Content", "Branding"];

const PortfolioGrid = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="w-full">
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