"use client";

import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const tasks = [
  { id: '1', title: 'Approve Meta Ad Creatives', priority: 'High', status: 'Pending', owner: 'Client' },
  { id: '2', title: 'Install Server-Side GTM', priority: 'Medium', status: 'In Progress', owner: 'Qala' },
  { id: '3', title: 'Review Q3 Strategy Deck', priority: 'High', status: 'Pending', owner: 'Client' },
  { id: '4', title: 'Optimize Landing Page Speed', priority: 'Low', status: 'Completed', owner: 'Qala' },
];

const TaskBoard = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-black text-zinc-50 tracking-tight">Growth Sprints</h3>
        <Badge variant="outline" className="rounded-full border-zinc-800 text-zinc-500 font-bold">{tasks.length} Active</Badge>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div 
            key={task.id}
            className="flex items-center gap-5 p-5 bg-zinc-900/40 backdrop-blur-xl rounded-[2rem] border border-zinc-800 hover:border-indigo-500/30 transition-all duration-500 group"
          >
            <Checkbox id={task.id} className="w-6 h-6 rounded-lg border-zinc-700 bg-zinc-950 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-500" />
            <div className="flex-1">
              <label 
                htmlFor={task.id}
                className="text-sm font-bold text-zinc-200 cursor-pointer group-hover:text-indigo-400 transition-colors block leading-tight"
              >
                {task.title}
              </label>
              <div className="flex items-center gap-4 mt-2">
                <span className={cn(
                  "text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md",
                  task.priority === 'High' ? "bg-red-500/10 text-red-500" : "bg-zinc-800 text-zinc-500"
                )}>
                  {task.priority}
                </span>
                <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{task.owner}</span>
              </div>
            </div>
            <Avatar className="w-10 h-10 border-2 border-zinc-800 shadow-xl bg-zinc-950">
              <AvatarFallback className="text-[10px] font-black text-indigo-500">
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