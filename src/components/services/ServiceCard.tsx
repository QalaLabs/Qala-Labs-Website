"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  title: string;
  description: string;
  metric: string;
  icon: React.ReactNode;
  category: string;
  href: string;
}

const ServiceCard = ({ title, description, metric, icon, href }: ServiceCardProps) => {
  return (
    <motion.a
      href={href}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8 }}
      className="group relative bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full overflow-hidden"
    >
      {/* Icon Morph Container */}
      <div className="mb-6 relative">
        <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
          <div className="transform group-hover:scale-110 transition-transform duration-500" aria-hidden="true">
            {icon}
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
        {title}
      </h3>
      
      <p className="text-slate-600 leading-relaxed mb-8 flex-grow">
        {description}
      </p>

      {/* Hover Metric Reveal */}
      <div className="relative mt-auto">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-blue-600 flex items-center gap-2">
            Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
          
          <div className="absolute right-0 translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
            <div className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-xl">
              {metric}
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Background Pattern */}
      <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-50/50 rounded-full blur-2xl group-hover:bg-blue-100/50 transition-colors" />
    </motion.a>
  );
};

export default ServiceCard;