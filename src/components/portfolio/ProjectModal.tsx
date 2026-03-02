"use client";

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ExternalLink, Target, TrendingUp, Zap } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProjectModalProps {
  project: any;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  // Trap focus and handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/90 backdrop-blur-xl"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-6xl bg-white rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row max-h-[90vh]"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 z-10 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white lg:text-slate-900 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Media Section */}
            <div className="lg:w-3/5 bg-slate-900 relative overflow-hidden">
              <video 
                autoPlay 
                muted 
                loop 
                playsInline
                className="w-full h-full object-cover opacity-80"
                poster={project.image}
              >
                <source src={project.video} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
              <div className="absolute bottom-10 left-10">
                <Badge className="bg-blue-600 text-white mb-4">{project.category}</Badge>
                <h2 className="text-4xl font-black text-white">{project.title}</h2>
              </div>
            </div>

            {/* Content Section */}
            <div className="lg:w-2/5 p-10 lg:p-16 overflow-y-auto bg-white">
              <div className="space-y-10">
                <div>
                  <h3 className="text-sm font-black text-blue-600 uppercase tracking-widest mb-4">The Result</h3>
                  <p className="text-3xl font-black text-slate-900 leading-tight">{project.result}</p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <Target className="w-6 h-6 text-blue-600 mb-3" />
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">ROAS</p>
                    <p className="text-xl font-black text-slate-900">{project.metrics.roas}</p>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <TrendingUp className="w-6 h-6 text-blue-600 mb-3" />
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Growth</p>
                    <p className="text-xl font-black text-slate-900">{project.metrics.growth}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Strategy</h3>
                  <p className="text-slate-600 leading-relaxed">{project.description}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag: string) => (
                    <Badge key={tag} variant="outline" className="rounded-full px-4 py-1 border-slate-200 text-slate-500">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="pt-6 border-t border-slate-100 flex gap-4">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-14 rounded-2xl font-bold">
                    View Case Study <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                  <Button variant="outline" className="h-14 w-14 rounded-2xl border-slate-200">
                    <ExternalLink className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;