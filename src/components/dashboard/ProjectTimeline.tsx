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
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-900">Project Roadmap</h3>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Clock className="w-4 h-4" />
          <span>Est. Completion: Dec 15</span>
        </div>
      </div>

      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-100" />

        <div className="space-y-6">
          {milestones.map((milestone, index) => (
            <motion.div 
              key={milestone.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-12"
            >
              {/* Icon */}
              <div className={cn(
                "absolute left-0 w-8 h-8 rounded-full flex items-center justify-center z-10 border-4 border-white shadow-sm",
                milestone.status === 'completed' ? "bg-green-500 text-white" : 
                milestone.status === 'current' ? "bg-blue-600 text-white animate-pulse" : 
                "bg-slate-100 text-slate-400"
              )}>
                {milestone.status === 'completed' ? <CheckCircle2 className="w-4 h-4" /> : 
                 milestone.status === 'current' ? <Circle className="w-4 h-4 fill-current" /> :
                 <Circle className="w-4 h-4" />}
              </div>

              <div className={cn(
                "p-5 rounded-2xl border transition-all",
                milestone.status === 'current' ? "bg-blue-50 border-blue-100 shadow-sm" : "bg-white border-slate-100"
              )}>
                <div className="flex justify-between items-start mb-1">
                  <h4 className={cn("font-bold", milestone.status === 'upcoming' ? "text-slate-400" : "text-slate-900")}>
                    {milestone.title}
                  </h4>
                  <span className="text-xs font-medium text-slate-400">{milestone.date}</span>
                </div>
                <p className="text-sm text-slate-500">
                  {milestone.status === 'completed' ? "Successfully deployed and verified." : 
                   milestone.status === 'current' ? "Currently in progress. Expected completion in 3 days." : 
                   "Scheduled for next sprint."}
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