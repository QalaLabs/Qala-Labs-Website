"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Milestone {
  id: string;
  title: string;
  status: 'completed' | 'current' | 'upcoming';
  date: string;
}

const milestones: Milestone[] = [
  { id: '1', title: 'Data Audit & Infrastructure', status: 'completed', date: 'Oct 12' },
  { id: '2', title: 'Creative Strategy & Production', status: 'completed', date: 'Oct 18' },
  { id: '3', title: 'Ad Account Setup & Launch', status: 'current', date: 'Oct 25' },
  { id: '4', title: 'Scale Phase 1: Optimization', status: 'upcoming', date: 'Nov 05' },
  { id: '5', title: 'Scale Phase 2: Expansion', status: 'upcoming', date: 'Nov 20' },
];

const ProjectTimeline = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-10">
        <h3 className="text-xl font-black text-zinc-50 tracking-tight">Scale Roadmap</h3>
        <div className="flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase tracking-widest">
          <Clock className="w-4 h-4 text-indigo-500" />
          <span>Est. Completion: Dec 15</span>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-px bg-zinc-800" />

        <div className="space-y-12">
          {milestones.map((milestone, index) => (
            <motion.div 
              key={milestone.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-16"
            >
              <div className={cn(
                "absolute left-2.5 w-7 h-7 rounded-xl flex items-center justify-center z-10 border-2 transition-all duration-500",
                milestone.status === 'completed' ? "bg-indigo-600 border-indigo-500 text-white" : 
                milestone.status === 'current' ? "bg-zinc-950 border-indigo-500 text-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.3)]" : 
                "bg-zinc-900 border-zinc-800 text-zinc-600"
              )}>
                {milestone.status === 'completed' ? <CheckCircle2 className="w-4 h-4" /> : 
                 milestone.status === 'current' ? <Circle className="w-2.5 h-2.5 fill-current animate-pulse" /> : 
                 <Circle className="w-2.5 h-2.5" />}
              </div>

              <div className={cn(
                "p-6 rounded-[2rem] border transition-all duration-500",
                milestone.status === 'current' ? "bg-indigo-600/5 border-indigo-500/30 shadow-2xl" : "bg-zinc-900/40 border-zinc-800 hover:border-zinc-700"
              )}>
                <div className="flex justify-between items-start mb-3">
                  <h4 className={cn("text-lg font-bold tracking-tight", milestone.status === 'upcoming' ? "text-zinc-500" : "text-zinc-100")}>
                    {milestone.title}
                  </h4>
                  <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{milestone.date}</span>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {milestone.status === 'completed' ? "Infrastructure verified and scaling active." : 
                   milestone.status === 'current' ? "Currently optimizing bid rules and creative hooks." : 
                   "Scheduled for the next growth sprint."}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectTimeline;