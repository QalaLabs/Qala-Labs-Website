"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const Section = ({ children, className, id }: SectionProps) => {
  return (
    <section 
      id={id}
      className={cn("py-16 md:py-24 px-4 max-w-7xl mx-auto", className)}
    >
      {children}
    </section>
  );
};

export default Section;