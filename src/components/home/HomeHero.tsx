"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ImageAsciiArt from './ImageAsciiArt';
import TiltCard from '@/components/ui/tilt-card';
import RevenueEngine3D from '@/components/3d/RevenueEngine3D';
import RevenueEngineGyroscope from '@/components/three/RevenueEngineGyroscope';
import AmbientParticleField from '@/components/three/AmbientParticleField';

const useLiveTicker = (intervalSeconds = 1) => {
  const [secondsAgo, setSecondsAgo] = React.useState(0);

  React.useEffect(() => {
    const id = window.setInterval(() => {
      setSecondsAgo((s) => (s >= 59 ? 0 : s + intervalSeconds));
    }, intervalSeconds * 1000);
    return () => window.clearInterval(id);
  }, [intervalSeconds]);

  return secondsAgo;
};

const statTiles = [
  { label: "Peak ROAS", value: "28×", sub: "playR campaign" },
  { label: "Avg ROAS", value: "3.8×", sub: "across D2C clients" },
  { label: "Brands scaled", value: "40+", sub: "and counting" },
];

const chartBars = [38, 52, 46, 64, 58, 74, 88];

const clientInitials = [
  { initials: "PR", label: "playR" },
  { initials: "WWF", label: "WWF" },
  { initials: "TR", label: "Trotr" },
  { initials: "CS", label: "Chrono Seconds" },
];

const LiveTicker = React.memo(() => {
  const secondsAgo = useLiveTicker();
  return (
    <span className="font-mono text-[10px] text-slate-500" aria-live="off">
      synced {secondsAgo}s ago
    </span>
  );
});

const HomeHero = () => {
  const [engineMode, setEngineMode] = React.useState<'gyro' | 'lattice'>('gyro');
  const [isMobile, setIsMobile] = React.useState(false);
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section
      className="relative overflow-hidden bg-[#06070D] pt-32 pb-20 md:pb-28"
      aria-labelledby="home-hero-heading"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        {!isMobile && <AmbientParticleField />}
        <div className="absolute top-[-10%] right-[-5%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-[5%] left-[-5%] w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-70 lg:opacity-90 pointer-events-auto">
          <ImageAsciiArt />
        </div>
        {/* Legibility scrim: near-solid veil on mobile (content spans full width there),
            a left-to-right reveal at desktop (content sits in the left column only) */}
        <div className="absolute inset-0 bg-[#06070D]/80 lg:bg-gradient-to-r lg:from-[#06070D] lg:via-[#06070D]/80 lg:to-[#06070D]/10" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#06070D] to-transparent" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#06070D] to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          {/* Left column */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/15 text-blue-300 text-[10px] md:text-xs font-black uppercase tracking-widest mb-8 border border-blue-500/30"
            >
              Creative × Data × Impact
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="font-mono text-xs text-slate-500 mb-6 flex items-center gap-2"
              aria-hidden="true"
            >
              <span className="text-emerald-400">$</span>
              <span>qala scale --target 8-figures --status live</span>
              <span className="inline-block w-[7px] h-[14px] bg-slate-500/70 motion-safe:animate-pulse" />
            </motion.div>

            <motion.h1
              id="home-hero-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-6xl font-black text-white leading-[1.1] mb-8 tracking-tight"
            >
              We are{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                revenue engineers.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg text-slate-300 mb-10 max-w-xl leading-relaxed"
            >
              Qala Labs fuses creative craft with data discipline to install the media buying, lifecycle automation, and revenue instrumentation your DTC brand needs to scale past ₹1Cr/mo — run by our team, tuned weekly against real unit economics, and handed off as a system you own.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 mb-10"
            >
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl px-7 h-14 text-base w-full sm:w-auto shadow-lg shadow-blue-600/30">
                <Link to="/contact">
                  Book a growth audit
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white font-bold rounded-xl px-7 h-14 text-base w-full sm:w-auto"
              >
                <a href="#services">See what we install</a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex items-center gap-4"
            >
              <div className="flex -space-x-3">
                {clientInitials.map((c) => (
                  <div
                    key={c.label}
                    title={c.label}
                    className="h-10 w-10 rounded-full bg-slate-800 border-2 border-[#06070D] flex items-center justify-center text-[10px] font-black text-slate-200"
                  >
                    {c.initials}
                  </div>
                ))}
              </div>
              <span className="text-sm text-slate-400">
                Trusted by <span className="text-white font-bold">40+ brands</span> scaling past ₹1Cr/mo
              </span>
            </motion.div>
          </div>

          {/* Right column — live dashboard panel with 3D Revenue Engine & Tilt */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <TiltCard maxTilt={8} maxGlare={0.22} scale={1.015} className="w-full rounded-2xl">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 md:p-8 shadow-2xl transition-colors duration-300 hover:border-blue-500/30">
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-xs text-slate-400 tracking-wide flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    growth.forecast // core.engine
                  </span>
                  <span className="flex items-center gap-3">
                    <LiveTicker />
                    <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-400">
                      <span className="relative flex h-2 w-2">
                        {!prefersReducedMotion && (
                          <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        )}
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                      </span>
                      Live
                    </span>
                  </span>
                </div>

                {/* 3D Web Experience: Procedural Qala Revenue Operating System Core */}
                <div style={{ transform: 'translateZ(30px)' }} className="mb-6">
                  <div className="flex items-center justify-between mb-2 px-1">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                      3D Core Mode
                    </span>
                    <div className="flex items-center gap-1 bg-white/5 p-0.5 rounded-lg border border-white/10 text-[10px] font-mono">
                      <button
                        onClick={() => setEngineMode('gyro')}
                        className={`px-2 py-0.5 rounded transition-all ${
                          engineMode === 'gyro'
                            ? 'bg-blue-600 text-white font-bold shadow'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Gyroscope
                      </button>
                      <button
                        onClick={() => setEngineMode('lattice')}
                        className={`px-2 py-0.5 rounded transition-all ${
                          engineMode === 'lattice'
                            ? 'bg-blue-600 text-white font-bold shadow'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Lattice
                      </button>
                    </div>
                  </div>

                  {isMobile ? (
                    <div className="h-[180px] w-full rounded-2xl bg-gradient-to-b from-blue-950/30 via-[#06070D] to-[#06070D] border border-blue-500/20 relative overflow-hidden flex flex-col items-center justify-center p-4 shadow-inner">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15)_0,transparent_70%)]" />
                      {/* Concentric radar rings */}
                      <div className="relative flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full border border-blue-500/30 animate-ping opacity-50" />
                        <div className="absolute w-20 h-20 rounded-full border border-cyan-400/30" />
                        <div className="absolute w-12 h-12 rounded-full bg-blue-600/20 border border-blue-400/50 flex items-center justify-center">
                          <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-r from-blue-400 to-cyan-300 shadow-[0_0_12px_#38bdf8]" />
                        </div>
                      </div>
                      <div className="relative mt-4 flex items-center gap-2">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[11px] font-mono font-bold text-slate-300 tracking-wider">
                          REAL-TIME ATTRIBUTION LIVE
                        </span>
                      </div>
                    </div>
                  ) : engineMode === 'gyro' ? (
                    <div className="h-[210px] w-full rounded-2xl bg-gradient-to-b from-blue-950/20 via-[#06070D]/90 to-[#06070D] border border-blue-500/20 overflow-hidden relative shadow-inner flex items-center justify-center">
                      <RevenueEngineGyroscope size={260} className="w-full h-full" />
                    </div>
                  ) : (
                    <RevenueEngine3D
                      height="210px"
                      className="bg-gradient-to-b from-blue-950/30 to-[#06070D]/80 border border-blue-500/20 shadow-inner"
                    />
                  )}
                </div>

                <div className="grid grid-cols-3 gap-3 mb-6" style={{ transform: 'translateZ(20px)' }}>
                  {statTiles.map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                      className="rounded-xl border border-white/10 bg-white/5 p-3.5 hover:border-blue-500/30 hover:bg-white/[0.07] transition-all"
                    >
                      <div className="text-xl md:text-2xl font-black text-white mb-1">{stat.value}</div>
                      <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">{stat.label}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{stat.sub}</div>
                    </motion.div>
                  ))}
                </div>

                <div style={{ transform: 'translateZ(15px)' }}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Revenue trend</span>
                    <span className="text-[10px] text-emerald-400 font-bold">↑ trending up</span>
                  </div>
                  <div className="flex items-end gap-2 h-20">
                    {chartBars.map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ duration: 0.6, delay: 0.7 + i * 0.06, ease: "easeOut" }}
                        className={`flex-1 rounded-t-sm ${
                          i === chartBars.length - 1
                            ? 'bg-gradient-to-t from-blue-500 to-cyan-400 shadow-[0_0_12px_rgba(56,189,248,0.5)]'
                            : 'bg-white/10 hover:bg-white/20'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
