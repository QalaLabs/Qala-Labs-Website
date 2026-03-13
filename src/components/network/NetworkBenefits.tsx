"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Handshake, Globe, ShieldCheck, Rocket, Zap } from 'lucide-react';

const benefits = [
  { 
    title: "High-Ticket Projects", 
    desc: "Work on 8-figure DTC brands and global enterprises that require elite execution.", 
    icon: <Star className="w-6 h-6" /> 
  },
  { 
    title: "Seamless Collaboration", 
    desc: "We handle the sales, scoping, and project management; you focus entirely on your craft.", 
    icon: <Handshake className="w-6 h-6" /> 
  },
  { 
    title: "Global Network", 
    desc: "Connect with other top-tier experts in the growth ecosystem and share playbooks.", 
    icon: <Globe className="w-6 h-6" /> 
  },
  { 
    title: "Reliable Payments", 
    desc: "No chasing invoices. We ensure our partners are paid on time, every time.", 
    icon: <ShieldCheck className="w-6 h-6" /> 
  },
  { 
    title: "Scale Your Agency", 
    desc: "Leverage our infrastructure to take on larger projects than you could alone.", 
    icon: <Rocket className="w-6 h-6" /> 
  },
  { 
    title: "Priority Access", 
    desc: "Get first dibs on new opportunities that match your specific expertise.", 
    icon: <Zap className="w-6 h-6" /> 
  }
];

const NetworkBenefits = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-16">
          <h2 className="text-sm font-black text-blue-600 uppercase tracking-[0.3em] mb-4">Why Join?</h2>
          <h3 className="text-4xl font-black text-slate-900">Built for elite collaborators.</h3>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100 hover:bg-slate-900 hover:text-white transition-all duration-500 group"
            >
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-blue-600 mb-8 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm">
                {item.icon}
              </div>
              <h4 className="text-2xl font-bold mb-4">{item.title}</h4>
              <p className="text-slate-500 group-hover:text-slate-400 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NetworkBenefits;