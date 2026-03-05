import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
            <div>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 text-blue-700 text-sm font-bold mb-6"
              >
                Our Philosophy
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tight"
              >
                We are <span className="text-blue-600">Revenue Engineers</span>.
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-slate-600 leading-relaxed mb-8"
              >
                Qala Labs was founded on a simple premise: most agencies focus on "vanity metrics" while brands care about contribution margin. We bridged that gap by treating marketing as an engineering problem.
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl text-slate-600 leading-relaxed"
              >
                We don't guess. We test. We don't hope. We optimize. Our team is a mix of data scientists, creative directors, and media buyers who speak the language of ROI.
              </motion.p>
            </div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-square rounded-[4rem] overflow-hidden shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200" 
                alt="Qala Labs Team" 
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-blue-600/10 mix-blend-multiply" />
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { label: "Data First", text: "Every creative decision is backed by performance data. If it doesn't convert, it doesn't stay." },
              { label: "Radical Transparency", text: "You see exactly what we see. Real-time dashboards and honest reporting on every rupee spent." },
              { label: "Velocity Wins", text: "The brand that tests the most winning hooks wins the market. We move faster than your competition." }
            ].map((item, i) => (
              <div key={i} className="p-10 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm">
                <h3 className="text-xl font-bold mb-4 text-blue-600">{item.label}</h3>
                <p className="text-slate-600 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;