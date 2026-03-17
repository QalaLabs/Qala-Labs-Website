"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Users, Target, Zap, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PipelineProps {
  leads: any[];
}

const LeadPipeline = ({ leads }: PipelineProps) => {
  const stages = [
    { id: 'new', label: 'New Leads', icon: Users, color: 'bg-blue-500' },
    { id: 'qualified', label: 'Qualified', icon: Target, color: 'bg-indigo-500' },
    { id: 'proposal', label: 'Proposal', icon: Zap, color: 'bg-yellow-500' },
    { id: 'closed', label: 'Closed', icon: CheckCircle2, color: 'bg-green-500' }
  ];

  const getCount = (stageId: string) => {
    if (stageId === 'new') return leads.filter(l => !l.data?.status || l.data?.status === 'new').length;
    return leads.filter(l => l.data?.status === stageId).length;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stages.map((stage, i) => {
        const count = getCount(stage.id);
        const percentage = Math.round((count / (leads.length || 1)) * 100);
        
        return (
          <motion.div
            key={stage.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 relative group overflow-hidden"
          >
            <div className={cn("absolute top-0 left-0 w-1 h-full", stage.color)} />
            <div className="flex justify-between items-start mb-4">
              <div className={cn("p-3 rounded-xl text-white shadow-lg", stage.color)}>
                <stage.icon className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black text-slate-900">{count}</span>
            </div>
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">{stage.label}</h4>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1 bg-slate-200 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  className={cn("h-full", stage.color)}
                />
              </div>
              <span className="text-[10px] font-bold text-slate-500">{percentage}%</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default LeadPipeline;