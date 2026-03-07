"use client";

import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const tasks = [
  { id: '1', title: 'Approve Meta Ad Creatives', priority: 'High', status: 'Pending', owner: 'Client' },
  { id: '2', title: 'Install Server-Side GTM', priority: 'Medium', status: 'In Progress', owner: 'Qala' },
  { id: '3', title: 'Review Q3 Strategy Deck', priority: 'High', status: 'Pending', owner: 'Client' },
  { id: '4', title: 'Optimize Landing Page Speed', priority: 'Low', status: 'Completed', owner: 'Qala' },
];

const TaskBoard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900">Active Tasks</h3>
        <Badge variant="outline" className="rounded-full">{tasks.length} Total</Badge>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <div 
            key={task.id}
            className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 hover:border-blue-100 hover:shadow-sm transition-all group"
          >
            <Checkbox id={task.id} className="rounded-md border-slate-200" />
            <div className="flex-1">
              <label 
                htmlFor={task.id}
                className="text-sm font-bold text-slate-900 cursor-pointer group-hover:text-blue-600 transition-colors"
              >
                {task.title}
              </label>
              <div className="flex items-center gap-3 mt-1">
                <span className={cn(
                  "text-[10px] font-black uppercase tracking-widest",
                  task.priority === 'High' ? "text-red-500" : "text-slate-400"
                )}>
                  {task.priority} Priority
                </span>
                <span className="text-[10px] text-slate-300">•</span>
                <span className="text-[10px] font-bold text-slate-500">{task.owner}</span>
              </div>
            </div>
            <Avatar className="w-8 h-8 border-2 border-white shadow-sm">
              <AvatarFallback className="bg-slate-100 text-[10px] font-bold">
                {task.owner === 'Qala' ? 'QL' : 'CL'}
              </AvatarFallback>
            </Avatar>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;