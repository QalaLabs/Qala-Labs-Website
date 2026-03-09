"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';
import ScaleQuiz from '@/components/tools/ScaleQuiz';
import { motion } from 'framer-motion';

const QuizPage = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <SEO 
        title="Scale Potential Quiz | Qala Labs" 
        description="Find out if your DTC brand is ready to scale to 8-figures. Get a personalized roadmap in 2 minutes."
      />
      <Navbar />

      <main className="pt-40 pb-24 px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight">
              Is your brand <br /> <span className="text-blue-600">ready to scale?</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Take the 2-minute assessment used by 8-figure brands to audit their growth infrastructure.
            </p>
          </motion.div>
        </div>

        <ScaleQuiz />
      </main>

      <Footer />
    </div>
  );
};

export default QuizPage;