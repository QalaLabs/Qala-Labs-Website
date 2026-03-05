"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { GripVertical, Trash2, Copy, ChevronUp, ChevronDown, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BlockWrapperProps {
  children: React.ReactNode;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDuplicate: () => void;
  type: string;
}

const BlockWrapper = ({ 
  children, 
  isSelected, 
  onSelect, 
  onDelete, 
  onMoveUp, 
  onMoveDown, 
  onDuplicate,
  type 
}: BlockWrapperProps) => {
  return (
    <div 
      className={cn(
        "group relative mb-4 rounded-3xl border-2 transition-all",
        isSelected ? "border-blue-600 bg-blue-50/30" : "border-transparent hover:border-slate-200"
      )}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
    >
      {/* Block Label */}
      <div className="absolute -top-3 left-6 px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10">
        {type.replace('_', ' ')}
      </div>

      {/* Controls */}
      <div className={cn(
        "absolute -right-14 top-0 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity",
        isSelected && "opacity-100"
      )}>
        <button onClick={onMoveUp} className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-sm"><ChevronUp className="w-4 h-4" /></button>
        <button onClick={onMoveDown} className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-sm"><ChevronDown className="w-4 h-4" /></button>
        <div className="h-2" />
        <button onClick={onDuplicate} className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-sm"><Copy className="w-4 h-4" /></button>
        <button onClick={onDelete} className="p-2 bg-white border border-slate-200 rounded-lg hover:text-red-600 hover:bg-red-50 shadow-sm"><Trash2 className="w-4 h-4" /></button>
      </div>

      {/* Drag Handle */}
      <div className="absolute -left-10 top-1/2 -translate-y-1/2 p-2 cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity">
        <GripVertical className="w-5 h-5 text-slate-400" />
      </div>

      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export default BlockWrapper;