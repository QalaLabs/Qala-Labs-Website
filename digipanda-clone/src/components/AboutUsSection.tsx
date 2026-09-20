import React, { useState } from 'react';
import { TeamSection } from './about/TeamSection';
import { AboutPrinciples } from './about/AboutPrinciples';
import { AboutProcess } from './about/AboutProcess';
import { SuccessFramework } from './about/SuccessFramework';
import { PlatformStack } from './about/PlatformStack';
import { Users, Target, Rocket, Layers, Cpu, Check, TrendingUp, IndianRupee, Zap, ShieldCheck } from 'lucide-react';

const kpis = [
  { value: "₹4.2Cr+", label: "Pipeline Generated", icon: IndianRupee, color: "text-[#3FE0E0]" },
  { value: "28X", label: "Peak Campaign ROAS", icon: TrendingUp, color: "text-[#34D399]" },
  { value: "50+", label: "Creative Tests / Wk", icon: Zap, color: "text-[#F59E0B]" },
  { value: "100%", label: "Server CAPI Accuracy", icon: ShieldCheck, color: "text-[#A78BFA]" },
];

export const AboutUsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'team' | 'principles' | 'process' | 'framework' | 'stack'>('all');

  return (
    <section id="about-qala" className="relative py-28 bg-[#06070D] border-t border-white/10 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(79,70,229,0.15),rgba(255,255,255,0))] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/assets/bgrk1.webp')] bg-cover bg-center opacity-10 pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#4F46E5]/10 border border-[#4F46E5]/30 text-[#4F46E5] text-xs font-mono font-bold uppercase tracking-wider mb-5">
            <span className="w-2 h-2 rounded-full bg-[#3FE0E0] animate-pulse" />
            <span>WHO WE ARE &bull; ABOUT QALA LABS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-medium text-white tracking-tight leading-tight mb-6">
            Where Engineering Discipline Meets{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] via-[#3FE0E0] to-[#34D399]">
              Aggressive Growth
            </span>
          </h2>

          <p className="text-base sm:text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
            We started Qala Labs because we watched great D2C and high-ticket brands get burned by agencies chasing vanity impressions instead of income. Every system we build exists to protect and scale one core number: your contribution margin.
          </p>
        </div>

        {/* Performance Benchmark KPIs Ribbon */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {kpis.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <div
                key={kpi.label}
                className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-[#3FE0E0]/40 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center ${kpi.color} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                    Audited
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-1">
                  {kpi.value}
                </div>
                <div className="text-xs font-mono text-white/60 uppercase tracking-wider">
                  {kpi.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Filter Tabs */}
        <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all border ${
              activeTab === 'all'
                ? 'bg-white text-black border-white shadow-lg'
                : 'bg-white/5 text-white/70 border-white/10 hover:border-white/30 hover:text-white'
            }`}
          >
            All Sections
          </button>
          <button
            onClick={() => setActiveTab('team')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-bold transition-all border ${
              activeTab === 'team'
                ? 'bg-[#3FE0E0] text-black border-[#3FE0E0] shadow-lg shadow-[#3FE0E0]/20'
                : 'bg-white/5 text-white/70 border-white/10 hover:border-white/30 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Core Team</span>
          </button>
          <button
            onClick={() => setActiveTab('principles')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-bold transition-all border ${
              activeTab === 'principles'
                ? 'bg-[#3FE0E0] text-black border-[#3FE0E0] shadow-lg shadow-[#3FE0E0]/20'
                : 'bg-white/5 text-white/70 border-white/10 hover:border-white/30 hover:text-white'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>The Principles</span>
          </button>
          <button
            onClick={() => setActiveTab('process')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-bold transition-all border ${
              activeTab === 'process'
                ? 'bg-[#3FE0E0] text-black border-[#3FE0E0] shadow-lg shadow-[#3FE0E0]/20'
                : 'bg-white/5 text-white/70 border-white/10 hover:border-white/30 hover:text-white'
            }`}
          >
            <Rocket className="w-3.5 h-3.5" />
            <span>Scale Roadmap</span>
          </button>
          <button
            onClick={() => setActiveTab('framework')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-bold transition-all border ${
              activeTab === 'framework'
                ? 'bg-[#3FE0E0] text-black border-[#3FE0E0] shadow-lg shadow-[#3FE0E0]/20'
                : 'bg-white/5 text-white/70 border-white/10 hover:border-white/30 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Scale Engine</span>
          </button>
          <button
            onClick={() => setActiveTab('stack')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-bold transition-all border ${
              activeTab === 'stack'
                ? 'bg-[#3FE0E0] text-black border-[#3FE0E0] shadow-lg shadow-[#3FE0E0]/20'
                : 'bg-white/5 text-white/70 border-white/10 hover:border-white/30 hover:text-white'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Tech Ecosystem</span>
          </button>
        </div>

        {/* Content Modules */}
        <div className="space-y-6">
          {(activeTab === 'all' || activeTab === 'team') && <TeamSection />}
          {(activeTab === 'all' || activeTab === 'principles') && <AboutPrinciples />}
          {(activeTab === 'all' || activeTab === 'process') && <AboutProcess />}
          {(activeTab === 'all' || activeTab === 'framework') && <SuccessFramework />}
          {(activeTab === 'all' || activeTab === 'stack') && <PlatformStack />}
        </div>

      </div>
    </section>
  );
};
