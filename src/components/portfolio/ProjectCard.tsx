"use client";

import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, ArrowUpRight } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  project: any;
  onClick?: () => void;
  href?: string;
  featured?: boolean;
}

const ProjectCard = ({ project, onClick, href, featured = false }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    videoRef.current?.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    videoRef.current?.pause();
    if (videoRef.current) videoRef.current.currentTime = 0;
  };

  const cardContent = (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -10 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      onKeyDown={(e) => !href && (e.key === 'Enter' || e.key === ' ') && onClick?.()}
      role={href ? undefined : "button"}
      tabIndex={href ? undefined : 0}
      aria-label={href ? undefined : `View ${project.title}`}
      className={`group relative bg-white rounded-[2.5rem] overflow-hidden shadow-xl cursor-pointer border focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-600 focus-visible:ring-offset-2 h-full ${
        featured ? 'border-blue-600/30 ring-1 ring-blue-600/20' : 'border-slate-100'
      }`}
    >
      {/* Media Container */}
      <div className={`relative overflow-hidden bg-slate-900 h-full ${featured ? 'aspect-[16/10] md:aspect-auto' : 'aspect-[4/5]'}`}>
        <img 
          src={project.image} 
          alt={project.imageAlt || project.title}
          width={400}
          height={500}
          loading="lazy"
          className={`w-full h-full object-cover transition-opacity duration-500 ${project.imageClassName || ''} ${isHovered ? 'opacity-0' : 'opacity-100'}`}
        />
        {project.video && (
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="none"
            width="400"
            height="500"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          >
            <source src={project.video} type="video/mp4" />
          </video>
        )}

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
        
        <div className="absolute top-6 left-6 flex items-center gap-2">
          <Badge className="bg-white/20 backdrop-blur-md text-white border-none px-4 py-1 rounded-full font-bold">
            {project.category}
          </Badge>
          {featured && (
            <Badge className="bg-blue-600 text-white border-none px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-widest">
              Featured
            </Badge>
          )}
        </div>

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-500">
            <Play className="w-6 h-6 fill-current" />
          </div>
        </div>

        <div className="absolute bottom-8 left-8 right-8">
          <h3 className={`font-black text-white mb-2 group-hover:translate-y-[-5px] transition-transform duration-500 ${featured ? 'text-3xl md:text-4xl' : 'text-2xl'}`}>
            {project.title}
          </h3>
          <p className="text-blue-400 font-bold text-sm opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
            {project.result}
          </p>
        </div>

        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-900">
            <ArrowUpRight className="w-6 h-6" />
          </div>
        </div>
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <Link to={href} aria-label={`View case study: ${project.title}`} className="block h-full outline-none focus-visible:ring-4 focus-visible:ring-blue-600 rounded-[2.5rem]">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
};

export default ProjectCard;
