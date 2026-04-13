import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';
import ServicesGrid from '@/components/services/ServicesGrid';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Services = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <SEO
        title="Performance Marketing & AI Automation Services | Qala Labs"
        description="Meta Ads, Google Shopping, Amazon Ads, AI automation, creative production & server-side tracking — full-stack growth services for DTC brands in India."
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services' }
        ]}
      />
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mb-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 text-blue-700 text-sm font-bold mb-6"
            >
              Our Capabilities
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tight"
            >
              Performance Marketing &amp; <span className="text-blue-600">DTC Growth</span> Services.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-600 leading-relaxed"
            >
              We don't just "run ads." We build end-to-end revenue engines that combine high-velocity creative testing with server-side tracking and aggressive media buying.
            </motion.p>
          </div>

          <ServicesGrid />

          <div className="mt-24 p-12 md:p-20 bg-slate-900 rounded-[4rem] text-center relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-blue-400 font-bold uppercase tracking-widest text-sm mb-4">Proof of Work</p>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                See these services in action.
              </h2>
              <p className="text-slate-400 mb-10 max-w-xl mx-auto text-lg">
                From 28x ROAS on Meta Ads to 3.4M organic YouTube views — explore real results we've delivered for DTC brands.
              </p>
              <Link
                to="/case-studies"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl font-black text-lg transition-colors shadow-xl shadow-blue-500/20 group"
              >
                View Case Studies <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] -ml-32 -mb-32" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Services;