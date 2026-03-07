"use client";

import React from 'react';
import { motion } from 'framer-motion';

const ClientLogos = () => {
  const logos = [
    "/clients/logo1.webp", "/clients/logo2.webp", "/clients/logo3.png",
    "/clients/logo4.png", "/clients/logo5.png", "/clients/logo6.png"
  ];

  return (
    <section className="py-16 bg-slate-50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-center text-slate-400 text-[10px] font-black uppercase tracking-widest mb-12">
          Trusted by high-growth brands
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          {logos.slice(0, 6).map((logo, index) => (
            <motion.img 
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              src={logo} 
              alt="Partner Brand" 
              className="h-8 md:h-10 w-auto object-contain"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;