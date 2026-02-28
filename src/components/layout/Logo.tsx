"use client";

import React from 'react';
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  variant?: 'default' | 'white';
}

const Logo = ({ className, iconOnly = false, variant = 'default' }: LogoProps) => {
  const textColor = variant === 'white' ? 'text-white' : 'text-slate-900';
  const iconColor = variant === 'white' ? 'fill-white' : 'fill-slate-900';

  return (
    <div className={cn("flex items-center gap-3 select-none", className)}>
      {/* Logo Icon */}
      <svg 
        viewBox="0 0 100 120" 
        className="h-10 w-auto" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Aperture / Shutter Top */}
        <g className={iconColor}>
          <path d="M50 10 C65 10 78 20 82 35 L50 50 Z" opacity="0.9" />
          <path d="M82 35 C85 45 82 58 72 68 L50 50 Z" opacity="0.8" />
          <path d="M72 68 C62 78 48 80 35 75 L50 50 Z" opacity="0.7" />
          <path d="M35 75 C22 70 15 58 18 45 L50 50 Z" opacity="0.8" />
          <path d="M18 45 C22 30 35 20 50 20 L50 50 Z" opacity="0.9" />
          {/* Center hole */}
          <circle cx="50" cy="50" r="4" fill="white" />
        </g>
        
        {/* Blocky L Bottom */}
        <path 
          d="M20 85 H55 V110 H20 V85 Z M55 100 H75 V110 H55 V100 Z" 
          className={iconColor} 
        />
      </svg>

      {!iconOnly && (
        <div className={cn("flex flex-col leading-none font-sans", textColor)}>
          <div className="flex items-baseline tracking-[0.2em] font-light text-xl">
            <span>Q</span>
            <span className="scale-x-110">A</span>
            <span>L</span>
            <span className="scale-x-110">A</span>
          </div>
          <div className="flex items-baseline tracking-[0.15em] font-bold text-xl -mt-1">
            <span>L</span>
            <span>A</span>
            <span>B</span>
            <span>S</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Logo;