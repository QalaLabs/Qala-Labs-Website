"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Home, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <SEO title="404 - Page Not Found" noIndex={true} />
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center pt-20 pb-12 px-4">
        <div className="max-w-2xl w-full text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative inline-block mb-8">
              <h1 className="text-[12rem] md:text-[16rem] font-black text-slate-100 leading-none select-none">
                404
              </h1>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 bg-blue-600 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-blue-500/40 rotate-12">
                  <Search className="w-10 h-10 text-white -rotate-12" />
                </div>
              </div>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
              Lost in the <span className="text-blue-600">funnel?</span>
            </h2>
            
            <p className="text-xl text-slate-500 mb-12 max-w-md mx-auto leading-relaxed">
              The page you're looking for doesn't exist or has been moved to a new growth stage.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/" className="w-full sm:w-auto">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-7 rounded-2xl text-lg font-black shadow-xl shadow-blue-500/20 transition-all group">
                  <Home className="mr-2 w-5 h-5" /> Return Home
                </Button>
              </Link>
              <Button 
                variant="outline" 
                onClick={() => window.history.back()}
                className="w-full sm:w-auto px-8 py-7 rounded-2xl text-lg font-bold border-2 border-slate-100 hover:bg-slate-50 transition-all"
              >
                <ArrowLeft className="mr-2 w-5 h-5" /> Go Back
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Decorative background elements */}
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-blue-50 rounded-full blur-3xl -z-10 opacity-60" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-indigo-50 rounded-full blur-3xl -z-10 opacity-60" />
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;