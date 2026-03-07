"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

interface TestimonialBlockProps {
  quote: string;
  author: string;
  role: string;
  avatar?: string;
}

const TestimonialBlock = ({ quote, author, role, avatar }: TestimonialBlockProps) => {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white p-12 md:p-20 rounded-[4rem] shadow-2xl border border-slate-100 text-center relative overflow-hidden"
        >
          <Quote className="w-20 h-20 text-blue-600/5 absolute top-10 left-1/2 -translate-x-1/2" />
          <div className="relative z-10">
            <p className="text-2xl md:text-4xl font-black text-slate-900 mb-10 leading-tight">
              “{quote || "Add your testimonial quote here."}”
            </p>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-slate-200 rounded-full mb-4 overflow-hidden border-4 border-white shadow-lg">
                <img src={avatar || `https://i.pravatar.cc/100?u=${author}`} alt={author} className="w-full h-full object-cover" />
              </div>
              <p className="font-bold text-slate-900">{author || "Author Name"}</p>
              <p className="text-sm text-slate-500">{role || "Role, Company"}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialBlock;