"use client";

import React from 'react';
import { motion } from 'framer-motion';

const ClientLogos = () => {
  const logos = [
    "/clients/logo1.webp", "/clients/logo2.webp", "/clients/logo3.png",
    "/clients/logo4.png", "/clients/logo5.png", "/clients/logo6.png"
  ];

  return (
    <section className="py-20 bg-white border-y border-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-left text-slate-400 text-[10px] font-black uppercase tracking-widest mb-12">
          Trusted by high-growth brands
        </p>
        <div className="flex flex-wrap justify-start items-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
          {logos.map((logo, index) => (
            <motion.img 
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              src={logo} 
              alt="Partner Brand" 
              className="h-7 md:h-9 w-auto object-contain"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;