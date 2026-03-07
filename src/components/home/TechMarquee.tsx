"use client";

import React from 'react';
import { motion } from 'framer-motion';

const TechMarquee = () => {
  const items = [
    "WooCommerce Catalog Hygiene",
    "Custom n8n Workflows",
    "Make.com Migrations",
    "Python Data Processing",
    "Meta & Google Ads",
    "Conversion Rate Optimization"
  ];

  return (
    <div className="bg-zinc-900 border-y border-zinc-800 py-4 overflow-hidden whitespace-nowrap relative">
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 25,
            ease: "linear",
          },
        }}
        className="flex gap-12 items-center"
      >
        {[...Array(4)].map((_, i) => (
          <React.Fragment key={i}>
            {items.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <span className="text-zinc-500 uppercase text-sm tracking-widest font-bold">
                  {item}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/50" />
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};

export default TechMarquee;