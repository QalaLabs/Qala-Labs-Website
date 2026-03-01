"use client";

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import ServiceCard from './ServiceCard';
import { 
  BarChart3, 
  Zap, 
  Globe2, 
  Search, 
  Database, 
  Rocket,
  Filter
} from 'lucide-react';

const services = [
  {
    title: "Performance Marketing",
    category: "Growth",
    description: "We dominate paid social and search by combining aggressive bidding strategies with proprietary attribution models. Our team manages millions in monthly spend across Meta, TikTok, and Google, ensuring every rupee is optimized for maximum return.",
    metric: "ROAS 28x",
    icon: <BarChart3 className="w-7 h-7" />,
    href: "/services/performance"
  },
  {
    title: "Creative Production",
    category: "Creative",
    description: "High-velocity creative testing is the heartbeat of modern scale. We produce 100+ high-converting ad variants weekly, leveraging creator-led content and data-driven editing to identify winning hooks that stop the scroll.",
    metric: "35% Lower CPA",
    icon: <Zap className="w-7 h-7" />,
    href: "/services/creative"
  },
  {
    title: "Web Development",
    category: "Tech",
    description: "We build headless commerce experiences that load in under 1 second. By decoupling the frontend from Shopify, we provide total design freedom and unmatched performance built for conversion and speed.",
    metric: "<1s Load Time",
    icon: <Globe2 className="w-7 h-7" />,
    href: "/services/web-dev"
  },
  {
    title: "Conversion Optimization",
    category: "Growth",
    description: "Stop leaking revenue at the finish line. We use heatmaps, session recordings, and rigorous A/B testing to identify and eliminate friction in your customer journey from landing page to checkout.",
    metric: "+42% CVR Lift",
    icon: <Search className="w-7 h-7" />,
    href: "/services/cro"
  },
  {
    title: "Analytics & Data",
    category: "Tech",
    description: "Data is only useful if it's actionable. We build custom dashboards and server-side tracking solutions that provide a single source of truth for your brand's LTV, CAC, and contribution margin.",
    metric: "100% Accuracy",
    icon: <Database className="w-7 h-7" />,
    href: "/services/data"
  },
  {
    title: "eCommerce Growth",
    category: "Strategy",
    description: "A holistic approach to scaling your brand to 8-figures and beyond. We act as your fractional growth team, aligning your product roadmap, inventory planning, and marketing strategy for market dominance.",
    metric: "310% YoY Growth",
    icon: <Rocket className="w-7 h-7" />,
    href: "/services/strategy"
  }
];

const categories = ["All", "Growth", "Creative", "Tech", "Strategy"];

const ServicesGrid = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredServices = activeCategory === "All" 
    ? services 
    : services.filter(s => s.category === activeCategory);

  return (
    <div className="w-full">
      {/* Filter Controls */}
      <div className="flex flex-wrap justify-center gap-3 mb-16">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 flex items-center gap-2 ${
              activeCategory === cat 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-200" 
                : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-100"
            }`}
          >
            {cat === "All" && <Filter className="w-4 h-4" />}
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredServices.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ServicesGrid;