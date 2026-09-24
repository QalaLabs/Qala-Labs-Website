import React, { useState, useEffect, useRef } from 'react';

const words = ['AI Automation', '28x ROAS Funnels', '125M+ Viral Reach', 'Autonomous Scale'];

interface TelemetryPoint {
  day: string;
  metricValue: string;
  subLabel: string;
  height: number;
}

interface EngineData {
  title: string;
  sub: string;
  dashTitle: string;
  metric: string;
  metricLabel: string;
  points: TelemetryPoint[];
}

const qalaEngines: Record<string, EngineData> = {
  'Trotr Funnel': {
    title: 'Trotr Travel Engine',
    sub: 'Founder-led storytelling & Meta audience engineering.',
    dashTitle: 'trotr — revenue telemetry',
    metric: '28x',
    metricLabel: 'ROAS & ₹14L revenue in 30 days',
    points: [
      { day: 'Day 5', metricValue: '3.2x', subLabel: '₹1.1L initial traction', height: 32 },
      { day: 'Day 10', metricValue: '7.8x', subLabel: 'Meta audience match', height: 48 },
      { day: 'Day 15', metricValue: '14.5x', subLabel: 'Creative angle breakout', height: 65 },
      { day: 'Day 20', metricValue: '21.0x', subLabel: 'Scaling high-intent UGC', height: 78 },
      { day: 'Day 25', metricValue: '25.4x', subLabel: '₹10.5L milestone hit', height: 88 },
      { day: 'Day 30', metricValue: '28.0x', subLabel: 'ROAS & ₹14L in 30 days', height: 100 },
    ],
  },
  'Nutrivend AI': {
    title: 'Nutrivend B2B Engine',
    sub: 'A/B audience engineering validating untapped fitness niches.',
    dashTitle: 'nutrivend — b2b lead pipeline',
    metric: '45 Leads',
    metricLabel: '71% untapped market captured',
    points: [
      { day: 'Day 5', metricValue: '6 Leads', subLabel: 'Target scraping & initial outreach', height: 26 },
      { day: 'Day 10', metricValue: '14 Leads', subLabel: 'Gym chain operator outreach', height: 42 },
      { day: 'Day 15', metricValue: '22 Leads', subLabel: 'Commercial contract discussions', height: 56 },
      { day: 'Day 20', metricValue: '31 Leads', subLabel: 'Key franchise validation', height: 72 },
      { day: 'Day 25', metricValue: '39 Leads', subLabel: 'Automated follow-up pipeline', height: 86 },
      { day: 'Day 30', metricValue: '45 Leads', subLabel: '71% untapped market captured', height: 96 },
    ],
  },
  'WWF Engine': {
    title: 'WWF AI Creative Engine',
    sub: 'Generative AI ad variations with 99%+ brand consistency.',
    dashTitle: 'wwf — ai creative automation',
    metric: '-80%',
    metricLabel: 'production cost reduction',
    points: [
      { day: 'Day 5', metricValue: '-15%', subLabel: 'Baseline studio shoot costs', height: 95 },
      { day: 'Day 10', metricValue: '-35%', subLabel: 'AI synthetic batch 1 deployed', height: 80 },
      { day: 'Day 15', metricValue: '-52%', subLabel: 'Automated render pipeline active', height: 60 },
      { day: 'Day 20', metricValue: '-68%', subLabel: 'Multilingual asset variants', height: 42 },
      { day: 'Day 25', metricValue: '-75%', subLabel: '99%+ brand consistency verified', height: 30 },
      { day: 'Day 30', metricValue: '-80%', subLabel: 'Production cost reduction achieved', height: 20 },
    ],
  },
};

type EngineKey = 'Trotr Funnel' | 'Nutrivend AI' | 'WWF Engine';
const engineKeys: EngineKey[] = ['Trotr Funnel', 'Nutrivend AI', 'WWF Engine'];

interface TeamAvatar {
  name: string;
  role: string;
  impact: string;
  image: string;
}

const teamAvatars: TeamAvatar[] = [
  {
    name: 'Aashirwad Bhansali',
    role: 'Growth Systems & Strategy',
    impact: '28x ROAS • ₹14L/mo Scale',
    image: '/assets/qala/Aashirwad.webp',
  },
  {
    name: 'Aayush Singh',
    role: 'Lead Engineering & AI',
    impact: 'Autonomous Swarms & Infra',
    image: '/assets/qala/Aayush.webp',
  },
  {
    name: 'Aryaman Chatterjee',
    role: 'Social & Creator Funnels',
    impact: '125M+ Viral Impressions',
    image: '/assets/qala/Aryaman.webp',
  },
  {
    name: 'Dipika K.',
    role: 'Brand Ops & Ecommerce',
    impact: '71% Retention & LTV Ops',
    image: '/assets/qala/Dipika.webp',
  },
  {
    name: 'Manpreet Singh',
    role: 'Creative Architecture',
    impact: 'High-Conversion UI/UX',
    image: '/assets/qala/Manpreet.webp',
  },
];

export const Hero: React.FC = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [activeEngine, setActiveEngine] = useState<EngineKey>('Trotr Funnel');
  const [scrubIndex, setScrubIndex] = useState<number | null>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  // Dynamic headline word rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Auto-switching engine timer: rotates every 6.5s, pauses on user interaction
  useEffect(() => {
    if (isInteracting) return;

    const interval = setInterval(() => {
      setActiveEngine((prev) => {
        const nextIndex = (engineKeys.indexOf(prev) + 1) % engineKeys.length;
        return engineKeys[nextIndex];
      });
      setScrubIndex(null);
    }, 6500);

    return () => clearInterval(interval);
  }, [isInteracting]);

  const currentEngine = qalaEngines[activeEngine];
  const activeIndex = scrubIndex !== null ? scrubIndex : currentEngine.points.length - 1;
  const activePoint = currentEngine.points[activeIndex];

  // Scrubber drag / hover handler
  const handlePointerScrub = (clientX: number) => {
    if (!chartRef.current) return;
    const rect = chartRef.current.getBoundingClientRect();
    const relativeX = clientX - rect.left;
    const boundedX = Math.max(0, Math.min(rect.width, relativeX));
    const totalPoints = currentEngine.points.length;
    const index = Math.min(totalPoints - 1, Math.max(0, Math.floor((boundedX / rect.width) * totalPoints)));
    setScrubIndex(index);
    setIsInteracting(true);
  };

  const handleSelectEngine = (key: EngineKey) => {
    setActiveEngine(key);
    setScrubIndex(null);
    setIsInteracting(true);
  };

  return (
    <section className="relative pt-32 md:pt-44 pb-16 md:pb-24 overflow-hidden bg-transparent">
      {/* Qala Labs Signature Hero Ambient Gradients & Lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top-Right Glowing Indigo Orb */}
        <div className="absolute -top-28 -right-28 w-[500px] md:w-[750px] h-[500px] md:h-[750px] rounded-full bg-gradient-to-br from-[#4F46E5]/20 via-[#6366F1]/10 to-transparent blur-[110px] animate-pulse" />

        {/* Top-Left Vibrant Cyan Glow */}
        <div className="absolute top-1/6 -left-24 w-[400px] md:w-[600px] h-[400px] md:h-[600px] rounded-full bg-gradient-to-tr from-[#3FE0E0]/20 via-[#3FE0E0]/08 to-transparent blur-[100px]" />

        {/* Center-Bottom Subtle Growth Emerald & Violet Reflection */}
        <div className="absolute -bottom-24 left-1/4 w-[500px] md:w-[700px] h-[350px] rounded-full bg-gradient-to-t from-[#34D399]/08 via-[#4F46E5]/10 to-transparent blur-[120px]" />

        {/* High-Precision Cybernetic Grid with Radial Spotlight Mask */}
        <div
          className="absolute inset-0 qala-grid-pattern opacity-40"
          style={{
            maskImage: 'radial-gradient(ellipse 75% 65% at 50% 35%, black 30%, transparent 85%)',
            WebkitMaskImage: 'radial-gradient(ellipse 75% 65% at 50% 35%, black 30%, transparent 85%)',
          }}
        />

        {/* Smooth Vignette and Edge Transitions */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-transparent pointer-events-none" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Hero Window & Copy */}
          <div className="lg:col-span-7">
            <div className="relative rounded-[32px] p-6 md:p-10 border border-white/10 backdrop-blur-xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] shadow-2xl">
              
              {/* macOS Window Controls */}
              <div className="flex items-center space-x-2 mb-8">
                <span className="w-3 h-3 rounded-full bg-[#ff5f57] inline-block shadow-sm" />
                <span className="w-3 h-3 rounded-full bg-[#febc2e] inline-block shadow-sm" />
                <span className="w-3 h-3 rounded-full bg-[#28c840] inline-block shadow-sm" />
              </div>

              {/* Eyebrow badge */}
              <div className="eyebrow">
                <span className="w-2 h-2 rounded-full bg-[#3FE0E0] animate-blink" />
                AI & Creative Growth Lab • London & Delhi
              </div>

              {/* Dynamic Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-semibold text-white leading-tight md:leading-[1.15] mb-5 tracking-tight">
                Where Ideas Turn Into Revenues <br />
                <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#3FE0E0] font-bold uppercase transition-all duration-500 transform">
                  {words[wordIndex]}
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-white/80 text-base md:text-lg max-w-xl mb-8 leading-relaxed">
                Qala Labs blends art and engineering to build autonomous growth systems, bespoke software, and high-converting brand movements.
              </p>

              {/* Founders & Core Team Avatar Stack with Interactive Hover Bio Cards */}
              <div className="pt-2 pb-8 border-t border-white/10 flex flex-wrap items-center gap-4 md:gap-6">
                <div className="text-white font-medium text-sm leading-snug">
                  Engineered by <br className="hidden sm:block" /> Growth Specialists
                </div>
                
                <div className="flex items-center -space-x-3">
                  {teamAvatars.map((person) => (
                    <div key={person.name} className="relative group/avatar">
                      <img
                        src={person.image}
                        alt={person.name}
                        className="w-11 h-11 md:w-12 md:h-12 rounded-full object-cover border-2 border-black group-hover/avatar:scale-115 group-hover/avatar:z-30 group-hover/avatar:border-[#3FE0E0] transition-all duration-300 cursor-pointer shadow-md"
                      />
                      {/* Interactive Hover Bio Card Flyout */}
                      <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 group-hover/avatar:opacity-100 group-hover/avatar:translate-y-0 translate-y-2 transition-all duration-200 z-50 whitespace-nowrap">
                        <div className="bg-[#0B0C16]/95 border border-white/15 backdrop-blur-xl px-3.5 py-2.5 rounded-xl shadow-[0_12px_30px_rgba(0,0,0,0.85)] text-left min-w-[170px]">
                          <div className="text-white font-bold text-xs leading-tight mb-0.5">{person.name}</div>
                          <div className="text-[#3FE0E0] text-[11px] font-medium leading-tight mb-1.5">{person.role}</div>
                          <div className="text-[10px] text-white/70 font-mono flex items-center gap-1.5 border-t border-white/10 pt-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#3FE0E0] inline-block animate-pulse" />
                            {person.impact}
                          </div>
                        </div>
                        {/* Tooltip Arrow */}
                        <div className="w-2.5 h-2.5 bg-[#0B0C16] border-r border-b border-white/15 rotate-45 mx-auto -mt-1" />
                      </div>
                    </div>
                  ))}

                  {/* Revenue Metric Badge */}
                  <div className="relative group/avatar">
                    <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#4F46E5] to-[#3FE0E0] text-white font-bold text-xs flex items-center justify-center border-2 border-black shadow-md cursor-pointer group-hover/avatar:scale-115 group-hover/avatar:z-30 transition-all duration-300">
                      ₹2.5Cr+
                    </div>
                    <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 group-hover/avatar:opacity-100 group-hover/avatar:translate-y-0 translate-y-2 transition-all duration-200 z-50 whitespace-nowrap">
                      <div className="bg-[#0B0C16]/95 border border-white/15 backdrop-blur-xl px-3.5 py-2 rounded-xl shadow-[0_12px_30px_rgba(0,0,0,0.85)] text-left">
                        <div className="text-white font-bold text-xs">₹2.5Cr+ Generated</div>
                        <div className="text-[#3FE0E0] text-[10px] font-mono">Direct Ecosystem Revenue</div>
                      </div>
                      <div className="w-2.5 h-2.5 bg-[#0B0C16] border-r border-b border-white/15 rotate-45 mx-auto -mt-1" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to Action Row */}
              <div className="flex items-center gap-4">
                <a
                  href="#contact-form"
                  className="BaCall-btn inline-flex items-center justify-center text-sm md:text-base font-bold uppercase tracking-wider"
                >
                  Book Discovery Call
                </a>
                
                <a
                  href="#services"
                  className="group relative w-12 h-12 rounded-full flex items-center justify-center p-1 bg-white/[0.04] border border-cyan-500/20 hover:border-cyan-400/60 shadow-[0_0_15px_rgba(63,224,224,0.15)] hover:shadow-[0_0_25px_rgba(63,224,224,0.35)] hover:scale-110 active:scale-95 transition-all duration-300"
                  title="Explore AI Capabilities"
                >
                  <img
                    src="/assets/ai-sparkle.svg"
                    alt="AI Sparkle"
                    className="w-10 h-10 object-contain drop-shadow-[0_0_8px_rgba(63,224,224,0.5)] group-hover:rotate-12 transition-transform duration-500"
                  />
                </a>
              </div>

              {/* Verified Partner Badges Strip */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-2.5">
                <span className="text-[11px] font-mono tracking-wider uppercase text-white/50 mr-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3FE0E0]/80"></span>
                  Verified Ecosystem:
                </span>
                
                <div className="flex flex-wrap items-center gap-2">
                  {/* Meta Business Partner */}
                  <div className="group/pill inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 hover:border-[#0081FB]/50 hover:bg-white/[0.07] backdrop-blur-md transition-all duration-300">
                    <svg className="w-3.5 h-3.5 text-[#0081FB] shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M16.96 5.86c-1.85 0-3.47 1.01-4.96 2.89-1.49-1.88-3.11-2.89-4.96-2.89C3.12 5.86 0 9.07 0 13.06c0 4.41 3.48 7.08 7.04 7.08 2.07 0 3.78-1.02 4.96-2.62 1.18 1.6 2.89 2.62 4.96 2.62 3.56 0 7.04-2.67 7.04-7.08 0-3.99-3.12-7.2-7.04-7.2zm0 11.88c-1.86 0-3.32-1.35-4.32-3.41 1.07-2.18 2.51-3.66 4.32-3.66 2.28 0 4.24 1.83 4.24 4.39 0 2.67-1.88 4.68-4.24 4.68zm-9.92 0c-2.36 0-4.24-2.01-4.24-4.68 0-2.56 1.96-4.39 4.24-4.39 1.81 0 3.25 1.48 4.32 3.66-1 2.06-2.46 3.41-4.32 3.41z"/>
                    </svg>
                    <span className="text-xs font-medium text-white/80 group-hover/pill:text-white transition-colors">Meta Business Partner</span>
                  </div>

                  {/* Shopify Plus Ecosystem */}
                  <div className="group/pill inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 hover:border-[#96BF48]/50 hover:bg-white/[0.07] backdrop-blur-md transition-all duration-300">
                    <svg className="w-3.5 h-3.5 text-[#96BF48] shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M14.28 4.5l-.89-1.92A1.85 1.85 0 0 0 11.71 1.5a1.85 1.85 0 0 0-1.68 1.08L9.14 4.5H4.5A2.5 2.5 0 0 0 2 7v12.5A2.5 2.5 0 0 0 4.5 22h15a2.5 2.5 0 0 0 2.5-2.5V7a2.5 2.5 0 0 0-2.5-2.5h-5.22zm-3.08-1.53a.35.35 0 0 1 .32-.21.35.35 0 0 1 .32.21l.66 1.43H10.5l.7-1.43zM12 10c1.38 0 2.5.9 2.5 2 0 1.5-2.5 1.5-2.5 3h2v1.5h-4v-1.5c1.38 0 2.5-.9 2.5-2 0-1.5-2.5-1.5-2.5-3H8V10h4z"/>
                    </svg>
                    <span className="text-xs font-medium text-white/80 group-hover/pill:text-white transition-colors">Shopify Plus Ecosystem</span>
                  </div>

                  {/* Cloud Database Architecture */}
                  <div className="group/pill inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 hover:border-[#3FE0E0]/50 hover:bg-white/[0.07] backdrop-blur-md transition-all duration-300">
                    <svg className="w-3.5 h-3.5 text-[#3FE0E0] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <ellipse cx="12" cy="5" rx="9" ry="3"/>
                      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
                      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
                    </svg>
                    <span className="text-xs font-medium text-white/80 group-hover/pill:text-white transition-colors">Cloud Database Architecture</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Qala Engine Live Telemetry */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Interactive Engine Box */}
            <div
              className="glass-panel p-6 rounded-[28px] border border-white/10 shadow-2xl relative overflow-hidden"
              onMouseEnter={() => setIsInteracting(true)}
              onMouseLeave={() => {
                setIsInteracting(false);
                setScrubIndex(null);
              }}
            >
              
              {/* Box Header */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-[2px] font-semibold text-white/70">
                  Our Engines
                </span>
                <span className="inline-flex items-center gap-2 text-xs text-white/90">
                  <span className="w-2 h-2 rounded-full bg-[#3FE0E0] animate-blink" />
                  {scrubIndex !== null ? 'Live Scrubbing' : 'Live results'}
                </span>
              </div>

              {/* Progress bar per engine */}
              <div className="flex gap-2 mb-5">
                {engineKeys.map((key, idx) => {
                  const isCurrent = activeEngine === key;
                  const currentIdx = engineKeys.indexOf(activeEngine);
                  const isPast = idx < currentIdx;
                  return (
                    <div key={key} className="h-1 flex-1 rounded-full bg-white/10 overflow-hidden relative">
                      <div
                        className={`h-full transition-all duration-500 ${
                          isCurrent
                            ? 'w-full bg-gradient-to-r from-[#4F46E5] to-[#3FE0E0]'
                            : isPast
                            ? 'w-full bg-white/30'
                            : 'w-0'
                        }`}
                      />
                    </div>
                  );
                })}
              </div>

              {/* macOS Dashboard Preview Window */}
              <div className="rounded-2xl border border-slate-200/90 dark:border-white/10 bg-slate-50/90 dark:bg-gradient-to-b dark:from-white/[0.06] dark:to-white/[0.01] overflow-hidden mb-5 select-none shadow-sm">
                {/* Window header */}
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-200/80 dark:border-white/10 bg-slate-200/60 dark:bg-black/40">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                    <span className="ml-3 font-mono text-xs text-slate-700 dark:text-white/80 tracking-tight font-medium">
                      {currentEngine.dashTitle}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-blue-600 dark:text-[#3FE0E0]/80 uppercase tracking-widest hidden sm:inline font-semibold">
                    {activePoint.day}
                  </span>
                </div>

                {/* Dashboard body & Scrubber Chart */}
                <div className="p-5 flex flex-col justify-between min-h-[210px] relative">
                  {/* Dynamic metric readout */}
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-4xl md:text-5xl font-extrabold text-white tracking-tight transition-all duration-150">
                      {activePoint.metricValue}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-[#3FE0E0] tracking-wide">
                        {activePoint.day} Telemetry
                      </span>
                      <span className="text-xs text-white/70 max-w-[170px] leading-tight transition-all duration-150">
                        {activePoint.subLabel}
                      </span>
                    </div>
                  </div>

                  {/* Interactive Scrubber Chart Area */}
                  <div
                    ref={chartRef}
                    className="relative pt-6 pb-1 cursor-ew-resize group/chart"
                    onMouseMove={(e) => handlePointerScrub(e.clientX)}
                    onTouchMove={(e) => {
                      if (e.touches[0]) handlePointerScrub(e.touches[0].clientX);
                    }}
                  >
                    {/* Background grid line */}
                    <div className="absolute inset-x-0 bottom-7 border-b border-white/10 pointer-events-none" />

                    {/* Bars Container */}
                    <div className="flex items-end gap-2 sm:gap-3 h-24 pt-2">
                      {currentEngine.points.map((point, idx) => {
                        const isActive = idx === activeIndex;
                        return (
                          <div
                            key={point.day}
                            className="flex-1 flex flex-col items-center h-full justify-end relative group/bar"
                            onMouseEnter={() => {
                              setScrubIndex(idx);
                              setIsInteracting(true);
                            }}
                          >
                            {/* Hover Active Tooltip */}
                            {isActive && (
                              <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#06070D] border border-[#3FE0E0] text-[#3FE0E0] text-[10px] font-mono font-bold px-1.5 py-0.5 rounded shadow-[0_0_12px_rgba(63,224,224,0.4)] whitespace-nowrap pointer-events-none z-30 animate-in fade-in zoom-in-95 duration-150">
                                {point.metricValue}
                              </div>
                            )}

                            {/* Bar Column */}
                            <div
                              className={`w-full rounded-t-md transition-all duration-300 ease-out relative ${
                                isActive
                                  ? 'bg-gradient-to-t from-[#4F46E5] to-[#3FE0E0] opacity-100 shadow-[0_0_18px_rgba(63,224,224,0.6)] brightness-125 scale-y-105'
                                  : 'bg-gradient-to-t from-[#4F46E5]/40 to-[#3FE0E0]/60 opacity-60 hover:opacity-90'
                              }`}
                              style={{ height: `${point.height}%` }}
                            >
                              {/* Glowing Active Dot at Top */}
                              {isActive && (
                                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#3FE0E0]" />
                              )}
                            </div>

                            {/* Day Label */}
                            <span
                              className={`text-[10px] font-mono mt-1.5 transition-colors ${
                                isActive ? 'text-[#3FE0E0] font-bold' : 'text-white/40'
                              }`}
                            >
                              {point.day.replace('Day ', 'D')}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Scrubber helper hint */}
                    <div className="flex justify-between items-center mt-2 pt-1 border-t border-white/5 text-[10px] font-mono text-white/40">
                      <span>Hover or drag bars to scrub</span>
                      <span className="text-[#3FE0E0]/70 font-semibold">{activePoint.day} Selected</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Engine Description & Switcher */}
              <div>
                <h3 className="text-white font-bold text-xl mb-1">{currentEngine.title}</h3>
                <p className="text-white/70 text-xs md:text-sm mb-4">{currentEngine.sub}</p>
                
                <div className="flex gap-2">
                  {engineKeys.map((key) => {
                    const isActive = activeEngine === key;
                    return (
                      <button
                        key={key}
                        onClick={() => handleSelectEngine(key)}
                        className={`flex-1 py-2 px-2 rounded-xl text-xs font-semibold transition-all duration-200 border ${
                          isActive
                            ? 'bg-white text-black border-white shadow-md'
                            : 'bg-transparent text-white/80 border-white/10 hover:border-white/30 hover:bg-white/[0.04]'
                        }`}
                      >
                        {key}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-panel p-5 rounded-[24px] border border-white/10 flex flex-col justify-center">
                <div className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">₹4.2Cr+</div>
                <div className="text-xs md:text-sm text-white/70 mt-1">Pipeline Generated</div>
              </div>
              <div className="glass-panel p-5 rounded-[24px] border border-white/10 flex flex-col justify-center">
                <div className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">₹2.5Cr+</div>
                <div className="text-xs md:text-sm text-white/70 mt-1">Ecosystem Revenue</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
