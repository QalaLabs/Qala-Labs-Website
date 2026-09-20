import React from 'react';
import { ScaleHorizonTerrain } from './3d/ScaleHorizonTerrain';
import { TrendingUp, ShieldCheck, Zap } from 'lucide-react';

export const ScaleArchitectureSection: React.FC = () => {
  return (
    <section id="scale-architecture" className="relative py-24 bg-[#06070D] border-t border-white/10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#38bdf8]/5 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#38bdf8]/10 border border-[#38bdf8]/30 text-[#38bdf8] text-xs font-mono font-bold uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse" />
            <span>PREDICTABLE REVENUE TRAJECTORY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-white tracking-tight leading-tight mb-4">
            Scale Architecture Engineered for Every Horizon
          </h2>
          <p className="text-white/70 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            From initial market validation to aggressive category dominance. Our frameworks protect unit economics and blended CAC as ad spend multiplies.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <ScaleHorizonTerrain />
        </div>
      </div>
    </section>
  );
};
