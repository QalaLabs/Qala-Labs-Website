"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText } from 'lucide-react';

interface ClosingCTAProps {
  title?: string;
  description?: string;
  primaryCtaText?: string;
  secondaryCtaText?: string;
}

const ClosingCTA = ({ 
  title = "Ready to scale without burning cash?", 
  description = "Book a 15-minute growth audit: we'll send a custom 90-day opportunity plan with prioritized experiments.",
  primaryCtaText = "Book Growth Audit",
  secondaryCtaText = "Request Case Pack"
}: ClosingCTAProps) => {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-blue-600 rounded-[4rem] p-12 md:p-24 text-white text-center relative overflow-hidden shadow-2xl shadow-blue-500/20"
        >
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
              {title}
            </h2>
            <p className="text-xl text-blue-100 mb-12 leading-relaxed">
              {description}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button className="bg-white text-blue-600 hover:bg-slate-100 px-10 py-8 rounded-2xl text-xl font-black shadow-xl">
                  {primaryCtaText} <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
              </Link>
              <Link to="/case-studies">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-10 py-8 rounded-2xl text-xl font-black">
                  {secondaryCtaText} <FileText className="ml-2 w-6 h-6" />
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -ml-48 -mb-48" />
        </motion.div>
      </div>
    </section>
  );
};

export default ClosingCTA;