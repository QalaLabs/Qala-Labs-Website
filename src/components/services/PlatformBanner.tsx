"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Layers, ShieldCheck, GitBranch, Coins } from 'lucide-react';

const pillars = [
  { icon: <Layers className="w-5 h-5" />, label: "One roof for marketing, sales, finance & ops" },
  { icon: <GitBranch className="w-5 h-5" />, label: "Captain + Specialist agent hierarchy" },
  { icon: <ShieldCheck className="w-5 h-5" />, label: "Human-approval gates on every action" },
  { icon: <Coins className="w-5 h-5" />, label: "Base retainer + rev-share on clean-causality wins" },
];

const PlatformBanner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative overflow-hidden bg-slate-900 rounded-[2.5rem] md:rounded-[3rem] p-10 md:p-16 mb-8"
    >
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/20 rounded-full blur-[100px] -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-[100px] -ml-24 -mb-24" />

      <div className="relative z-10 grid lg:grid-cols-[1.3fr_1fr] gap-12 items-center">
        <div>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/20 text-blue-300 text-xs font-black uppercase tracking-widest mb-6">
            Tier 1 · The Platform
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
            Run your entire revenue stack on Qala OS.
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-xl">
            Not a service — a system. Qala OS is our Growth-as-a-Service platform: every agent below,
            unified attribution across every touchpoint, and a single approval layer your team controls.
            Buy the whole stack instead of stitching agencies and tools together yourself.
          </p>
          <Link
            to="/platform"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black transition-colors shadow-xl shadow-blue-500/20 group"
          >
            Explore the Platform <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pillars.map((p) => (
            <div key={p.label} className="flex items-start gap-3 p-5 bg-white/5 border border-white/10 rounded-2xl">
              <div className="text-blue-400 shrink-0">{p.icon}</div>
              <span className="text-sm font-bold text-slate-200 leading-snug">{p.label}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default PlatformBanner;
