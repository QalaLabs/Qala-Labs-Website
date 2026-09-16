"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface StatusChipProps {
  label: string;
  tone?: 'light' | 'dark';
  color?: 'emerald' | 'blue' | 'amber';
  className?: string;
}

const colorMap = {
  emerald: { dot: 'bg-emerald-500', ping: 'bg-emerald-400', text: 'text-emerald-600' },
  blue: { dot: 'bg-blue-500', ping: 'bg-blue-400', text: 'text-blue-600' },
  amber: { dot: 'bg-amber-500', ping: 'bg-amber-400', text: 'text-amber-600' },
};

/**
 * Reused ops-tool status vocabulary ("● Live", "● Synced") across sections —
 * not just the hero — so the site reads as a running system, not a static page.
 */
const StatusChip = ({ label, tone = 'light', color = 'emerald', className }: StatusChipProps) => {
  const c = colorMap[color];
  const textColor = tone === 'dark'
    ? (color === 'emerald' ? 'text-emerald-400' : color === 'blue' ? 'text-blue-400' : 'text-amber-400')
    : c.text;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest',
        textColor,
        className
      )}
    >
      <span className="relative flex h-2 w-2">
        <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: 'currentColor' }} />
        <span className={cn('relative inline-flex rounded-full h-2 w-2', c.dot)} />
      </span>
      {label}
    </span>
  );
};

export default StatusChip;
