"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[9999] bg-[#06070D] flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: 1, 
          scale: [1, 1.05, 1],
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative mb-8"
      >
        <Logo className="h-16 md:h-20" />
        
        {/* Animated Ring */}
        <motion.div 
          className="absolute -inset-4 border-2 border-blue-600/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -inset-4 border-t-2 border-blue-600 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      <div className="space-y-4 text-center">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400"
        >
          Engineering Scale
        </motion.p>
        
        <div className="w-48 h-1 bg-slate-800 rounded-full overflow-hidden mx-auto">
          <motion.div 
            className="h-full bg-blue-600"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
        </div>
      </div>

      {/* Background Accents */}
      <div className="absolute top-[-10%] right-[-5%] w-[300px] h-[300px] bg-blue-50 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-[10%] left-[-5%] w-[250px] h-[250px] bg-indigo-50 rounded-full blur-3xl opacity-50" />
    </div>
  );
};

export default LoadingScreen;