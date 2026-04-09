"use client";

import React from 'react';
import { cn } from "@/lib/utils";
import QalaLogo from '@/assets/qala-logo.png';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  variant?: 'default' | 'white';
}

const Logo = ({ className, iconOnly = false, variant = 'default' }: LogoProps) => {
  return (
    <div className={cn("flex items-center select-none overflow-hidden", className)}>
      <img 
        src={QalaLogo} 
        alt="Qala Labs" 
        width={160}
        height={40}
        className={cn(
          "h-10 w-auto transition-all duration-300",
          variant === 'white' && "invert brightness-0 invert-[1]",
          iconOnly ? "object-left object-cover w-[40px]" : "object-contain"
        )}
        style={iconOnly ? { objectPosition: '0% 50%', width: '40px' } : {}}
      />
    </div>
  );
};

export default Logo;