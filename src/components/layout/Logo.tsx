"use client";

import React from 'react';
import { cn } from "@/lib/utils";
import QalaLogoFull from '@/assets/qala-logo-full.png';
import QalaLogoSymbol from '@/assets/qala-logo-symbol.png';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  variant?: 'default' | 'white';
}

const Logo = ({ className, iconOnly = false, variant = 'default' }: LogoProps) => {
  if (iconOnly) {
    return (
      <div className={cn("flex items-center select-none h-10", className)}>
        <img
          src={QalaLogoSymbol}
          alt="Qala Labs"
          className="h-full w-auto transition-all duration-300"
        />
      </div>
    );
  }

  // Full logo — white text on dark bg
  return (
    <div className={cn("flex items-center select-none h-10", className)}>
      <img
        src={QalaLogoFull}
        alt="Qala Labs"
        className="h-full w-auto transition-all duration-300"
      />
    </div>
  );
};

export default Logo;