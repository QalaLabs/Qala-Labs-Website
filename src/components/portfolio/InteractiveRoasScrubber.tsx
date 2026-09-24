"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowRight, Sparkles, ShieldCheck, Zap, Sliders } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const InteractiveRoasScrubber: React.FC = () => {
  // sliderPosition from 0 (Before Qala) to 100 (Full Qala System Installed)
  const [sliderPos, setSliderPos] = useState(70);

  // Computed metrics based on slider position
  const roas = (1.8 + (sliderPos / 100) * 3.2).toFixed(1);
  const wastedSpend = Math.round(38 - (sliderPos / 100) * 35);
  const monthlyRevenue = (18 + (sliderPos / 100) * 105).toFixed(0);
  const contributionMargin = Math.round(11 + (sliderPos / 100) * 21);

  const getPhaseTitle = (pos: number) => {
    if (pos < 30) return { label: "Ad Fatigue & Blended ROAS", color: "text-amber-500", bg: "bg-amber-500/10 border-amber-500/20" };
    if (pos < 70) return { label: "Signal Architecture Installed", color: "text-blue-500", bg: "bg-blue-500/10 border-blue-500/20" };
    return { label: "8-Figure Autonomous Scale", color: "text-emerald-500", bg: "bg-emerald-500/10 border-emerald-500/20" };
  };

  const phase = getPhaseTitle(sliderPos);

  return (
    <div className="w-full my-12 p-6 md:p-10 rounded-[2rem] bg-gradient-to-b from-[#0A0D18] to-[#06070D] border border-white/10 text-white shadow-2xl relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 text-blue-400 text-[10px] font-black uppercase tracking-widest border border-blue-500/30 mb-3">
            <Sliders className="w-3 h-3" />
            Interactive Impact Simulator
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            See the Qala Revenue Shift in Real-Time
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            Drag the scrubber to explore the unit-economics transformation before vs. after installing our revenue architecture.
          </p>
        </div>

        {/* Phase Badge */}
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border ${phase.bg} ${phase.color} self-start md:self-auto`}>
          <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
          <span>{phase.label}</span>
        </div>
      </div>

      {/* Touch/Mouse Slider Bar */}
      <div className="relative z-10 mb-8">
        <div className="flex justify-between text-xs font-mono text-slate-400 mb-2">
          <span>01. Before Qala (Fragmented)</span>
          <span className="font-bold text-white">Slide with Thumb →</span>
          <span className="text-blue-400 font-bold">02. Qala Installed (Scalable)</span>
        </div>

        <div className="relative h-14 bg-white/5 rounded-2xl border border-white/10 p-2 flex items-center">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-xl transition-all duration-75 opacity-70"
            style={{ width: `${sliderPos}%` }}
          />

          <input
            type="range"
            min="0"
            max="100"
            value={sliderPos}
            onChange={(e) => setSliderPos(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
            aria-label="Drag to simulate unit economics before and after Qala"
          />

          {/* Custom Visual Handle */}
          <div 
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white shadow-xl shadow-cyan-500/50 border-2 border-blue-600 flex items-center justify-center pointer-events-none transition-all duration-75"
            style={{ left: `${Math.max(4, Math.min(96, sliderPos))}%` }}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
          </div>
        </div>
      </div>

      {/* Metrics Output Grid */}
      <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
        <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-sm">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
            Blended ROAS
          </span>
          <div className="text-2xl sm:text-3xl font-black text-white flex items-baseline gap-1">
            <span>{roas}×</span>
            {sliderPos > 70 && <span className="text-xs text-emerald-400 font-bold">(up to 28×)</span>}
          </div>
          <span className="text-[10px] text-slate-500 mt-1 block">
            {sliderPos < 40 ? "Low creative velocity" : "Signal quality tuned weekly"}
          </span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-sm">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
            Wasted Ad Spend
          </span>
          <div className="text-2xl sm:text-3xl font-black text-rose-400">
            {wastedSpend}%
          </div>
          <span className="text-[10px] text-slate-500 mt-1 block">
            {sliderPos < 40 ? "Unchecked audience overlap" : "Audience fatigue eliminated"}
          </span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-sm">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
            Monthly Run Rate
          </span>
          <div className="text-2xl sm:text-3xl font-black text-white">
            ₹{monthlyRevenue}L
          </div>
          <span className="text-[10px] text-slate-500 mt-1 block">
            {sliderPos > 80 ? "Sustained ₹1Cr+ trajectory" : "Stuck under growth plateau"}
          </span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-sm">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
            Contribution Margin
          </span>
          <div className="text-2xl sm:text-3xl font-black text-cyan-300">
            {contributionMargin}%
          </div>
          <span className="text-[10px] text-slate-500 mt-1 block">
            Real profit after CAC & COGS
          </span>
        </div>
      </div>

      {/* Call To Action Strip */}
      <div className="relative z-10 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>Ready to see your brand's real unit economics model?</span>
        </div>

        <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl px-6 h-12 text-sm shadow-lg shadow-blue-600/30">
          <Link to="/contact">
            Get Your 90-Day Plan <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default InteractiveRoasScrubber;
