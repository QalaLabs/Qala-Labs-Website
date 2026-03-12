"use client";

import React from 'react';
import { motion } from 'framer-motion';

const ClientLogos = () => {
  const logos = [
    { src: "/clients/special-olympics.webp", alt: "Special Olympics" },
    { src: "/clients/human-race.png", alt: "Human Race" },
    { src: "/clients/usaid.png", alt: "USAID" },
    { src: "/clients/chrono-seconds.png", alt: "Chrono Seconds" },
    { src: "/clients/cybint.png", alt: "Cybint" },
    { src: "/clients/inkclick.png", alt: "Inkclick" },
    { src: "/clients/super-teacher.png", alt: "Super Teacher" },
    { src: "/clients/recomm.png", alt: "Recomm" },
    { src: "/clients/playr-white.png", alt: "playR" },
    { src: "/clients/wwf.png", alt: "WWF" },
    { src: "/clients/playr-gold.webp", alt: "playR Gold" }
  ];

  // Triple the list to ensure seamless looping
  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <section className="py-20 bg-white border-y border-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <div className="text-center">
          <h2 className="text-[#94a3b8] text-[11px] font-black uppercase tracking-[0.4em] mb-4">
            Strategic Partnerships
          </h2>
          <div className="h-px w-12 bg-blue-600/20 mx-auto" />
        </div>
      </div>
      
      <div className="relative flex">
        {/* The moving track */}
        <motion.div 
          className="flex whitespace-nowrap gap-16 md:gap-24 items-center py-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            ease: "linear", 
            duration: 30, 
            repeat: Infinity 
          }}
        >
          {duplicatedLogos.map((logo, idx) => (
            <div 
              key={idx} 
              className="flex items-center justify-center group shrink-0"
            >
              <img 
                src={logo.src} 
                alt={logo.alt} 
                className="h-8 md:h-10 w-auto object-contain transition-all duration-500 filter grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110"
                loading="lazy"
              />
            </div>
          ))}
        </motion.div>

        {/* Gradient overlays for smooth fade edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
};

export default ClientLogos;