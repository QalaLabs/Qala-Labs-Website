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
    { src: "/clients/shruum.png", alt: "Shruum" },
    { src: "/clients/playr-white.png", alt: "playR" },
    { src: "/clients/wwf.png", alt: "WWF" },
    { src: "/clients/playr-gold.webp", alt: "playR Gold" }
  ];

  return (
    <section className="py-24 bg-white border-y border-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-[#94a3b8] text-[11px] font-black uppercase tracking-[0.4em] mb-4">
            Strategic Partnerships
          </h2>
          <div className="h-px w-12 bg-blue-600/20 mx-auto" />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-16 items-center justify-items-center">
          {logos.map((logo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.03, duration: 0.5 }}
              className="w-full flex justify-center group"
            >
              <div className="relative h-10 md:h-12 w-full flex items-center justify-center px-4">
                <img 
                  src={logo.src} 
                  alt={logo.alt} 
                  className="max-h-full max-w-full object-contain transition-all duration-500 filter grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;