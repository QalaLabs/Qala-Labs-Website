"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const phoneNumber = "+916006760151";
  const message = "Hi, I want to begin my journey of growth.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 left-6 z-[100] flex items-center justify-center w-16 h-16 bg-[#25D366] text-white rounded-full shadow-2xl hover:bg-[#20ba5a] transition-colors"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-8 h-8 fill-current" />
      <span className="absolute -top-2 -right-2 flex h-4 w-4">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex rounded-full h-4 w-4 bg-white/20"></span>
      </span>
    </motion.a>
  );
};

export default WhatsAppButton;