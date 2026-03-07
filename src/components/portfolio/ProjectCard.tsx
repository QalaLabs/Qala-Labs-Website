"use client";

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowUpRight } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  project: any;
  onClick: () => void;
}

const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
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

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -10 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="group relative bg-zinc-900/40 backdrop-blur-xl rounded-[2.5rem] overflow-hidden shadow-2xl cursor-pointer border border-zinc-800/50 hover:border-indigo-500/30 transition-all duration-500"
    >
      {/* Media Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-zinc-950">
        <img 
          src={project.image} 
          alt={project.title}
          className={`w-full h-full object-cover transition-opacity duration-700 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
        />
        {project.video && (
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="none"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          >
            <source src={project.video} type="video/mp4" />
          </video>
        )}

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="absolute top-6 left-6">
          <Badge className="bg-zinc-900/60 backdrop-blur-md text-zinc-100 border-zinc-700/50 px-4 py-1 rounded-full font-bold text-[10px] uppercase tracking-widest">
            {project.category}
          </Badge>
        </div>

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-500">
            <Play className="w-6 h-6 fill-current" />
          </div>
        </div>

        <div className="absolute bottom-8 left-8 right-8">
          <h3 className="text-2xl font-black text-zinc-50 mb-2 group-hover:translate-y-[-5px] transition-transform duration-500 tracking-tight">
            {project.title}
          </h3>
          <p className="text-indigo-400 font-bold text-sm opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
            {project.result}
          </p>
        </div>

        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center text-zinc-950 shadow-xl">
            <ArrowUpRight className="w-6 h-6" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;