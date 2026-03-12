"use client";

import React from 'react';
import { motion } from 'framer-motion';

const ClientLogos = () => {
  const logos = [
    "/clients/special-olympics.webp",
    "/clients/human-race.png",
    "/clients/usaid.png",
    "/clients/chrono-seconds.png",
    "/clients/cybint.png",
    "/clients/inkclick.png",
    "/clients/super-teacher.png",
    "/clients/recomm.png",
    "/clients/shruum.png",
    "/clients/playr-white.png",
    "/clients/wwf.png",
    "/clients/playr-gold.webp"
  ];

  return (
    <section className="py-24 bg-slate-50/50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-center text-[#94a3b8] text-[13px] font-black uppercase tracking-[0.3em] mb-20">
          Trusted by high-growth brands
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-16 md:gap-y-24 gap-x-12 md:gap-x-20 items-center justify-items-center opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
          {logos.map((logo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              className="w-full flex justify-center"
            >
              <img 
                src={logo} 
                alt="Partner Brand" 
                className="h-8 md:h-12 w-auto object-contain max-w-[160px]"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;