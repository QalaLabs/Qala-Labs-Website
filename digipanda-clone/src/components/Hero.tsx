import React, { useState, useEffect } from 'react';

const words = ['AI Automation', '28x ROAS Funnels', '125M+ Viral Reach', 'Autonomous Scale'];

const qalaEngines = {
  'Trotr Funnel': {
    title: 'Trotr Travel Engine',
    sub: 'Founder-led storytelling & Meta audience engineering.',
    dashTitle: 'trotr — revenue telemetry',
    metric: '28x',
    metricLabel: 'ROAS & ₹14L revenue in 30 days',
    bars: [30, 48, 65, 78, 88, 95, 100],
  },
  'Nutrivend AI': {
    title: 'Nutrivend B2B Engine',
    sub: 'A/B audience engineering validating untapped fitness niches.',
    dashTitle: 'nutrivend — b2b lead pipeline',
    metric: '45 Leads',
    metricLabel: '71% untapped market captured',
    bars: [25, 40, 52, 68, 75, 85, 92],
  },
  'WWF Engine': {
    title: 'WWF AI Creative Engine',
    sub: 'Generative AI ad variations with 99%+ brand consistency.',
    dashTitle: 'wwf — ai creative automation',
    metric: '-80%',
    metricLabel: 'production cost reduction',
    bars: [95, 80, 60, 40, 30, 25, 20],
  },
};

type EngineKey = keyof typeof qalaEngines;

export const Hero: React.FC = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [activeEngine, setActiveEngine] = useState<EngineKey>('Trotr Funnel');

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const currentEngine = qalaEngines[activeEngine];

  return (
    <section className="relative pt-32 md:pt-44 pb-16 md:pb-24 overflow-hidden bg-[url('/assets/top-banner-background-new.webp')] bg-cover bg-center">
      {/* Background dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/50 to-black pointer-events-none" />

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

              {/* Founders & Core Team Avatar Stack */}
              <div className="pt-2 pb-8 border-t border-white/10 flex flex-wrap items-center gap-4 md:gap-6">
                <div className="text-white font-medium text-sm leading-snug">
                  Engineered by <br className="hidden sm:block" /> Growth Specialists
                </div>
                
                <div className="flex items-center -space-x-3">
                  <img
                    src="/assets/qala/Aashirwad.png"
                    alt="Aashirwad"
                    className="w-11 h-11 md:w-12 md:h-12 rounded-full object-cover border-2 border-black hover:scale-110 hover:z-20 transition-transform duration-300"
                  />
                  <img
                    src="/assets/qala/Aayush.webp"
                    alt="Aayush"
                    className="w-11 h-11 md:w-12 md:h-12 rounded-full object-cover border-2 border-black hover:scale-110 hover:z-20 transition-transform duration-300"
                  />
                  <img
                    src="/assets/qala/Aryaman.webp"
                    alt="Aryaman"
                    className="w-11 h-11 md:w-12 md:h-12 rounded-full object-cover border-2 border-black hover:scale-110 hover:z-20 transition-transform duration-300"
                  />
                  <img
                    src="/assets/qala/Dipika.webp"
                    alt="Dipika"
                    className="w-11 h-11 md:w-12 md:h-12 rounded-full object-cover border-2 border-black hover:scale-110 hover:z-20 transition-transform duration-300"
                  />
                  <img
                    src="/assets/qala/Manpreet.webp"
                    alt="Manpreet"
                    className="w-11 h-11 md:w-12 md:h-12 rounded-full object-cover border-2 border-black hover:scale-110 hover:z-20 transition-transform duration-300"
                  />
                  <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#4F46E5] to-[#3FE0E0] text-white font-bold text-xs flex items-center justify-center border-2 border-black shadow-md">
                    ₹2.5Cr+
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

            </div>
          </div>

          {/* Right Column: Qala Engine Live Telemetry */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Interactive Engine Box */}
            <div className="glass-panel p-6 rounded-[28px] border border-white/10 shadow-2xl relative overflow-hidden">
              
              {/* Box Header */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-[2px] font-semibold text-white/70">
                  Our Engines
                </span>
                <span className="inline-flex items-center gap-2 text-xs text-white/90">
                  <span className="w-2 h-2 rounded-full bg-[#3FE0E0] animate-blink" />
                  Live results
                </span>
              </div>

              {/* Progress bar */}
              <div className="flex gap-2 mb-5">
                <div className="h-1 flex-1 rounded-full bg-white/10 overflow-hidden relative">
                  <div className="h-full bg-gradient-to-r from-[#4F46E5] to-[#3FE0E0] animate-fillBar" />
                </div>
                <div className="h-1 flex-1 rounded-full bg-white/10" />
                <div className="h-1 flex-1 rounded-full bg-white/10" />
              </div>

              {/* Dashboard Preview */}
              <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.01] overflow-hidden mb-5">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10 bg-black/40">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                  <span className="ml-3 font-mono text-xs text-white/80 tracking-tight">
                    {currentEngine.dashTitle}
                  </span>
                </div>

                <div className="p-5 flex flex-col justify-between min-h-[190px] relative">
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                      {currentEngine.metric}
                    </span>
                    <span className="text-xs text-white/70 max-w-[150px] leading-tight">
                      {currentEngine.metricLabel}
                    </span>
                  </div>

                  <div className="flex items-end gap-2 h-20 pt-4">
                    {currentEngine.bars.map((height, idx) => (
                      <div
                        key={idx}
                        className="flex-1 rounded-t-md bg-gradient-to-t from-[#4F46E5] to-[#3FE0E0] opacity-90 transition-all duration-500 ease-out hover:opacity-100"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Engine Description & Switcher */}
              <div>
                <h3 className="text-white font-bold text-xl mb-1">{currentEngine.title}</h3>
                <p className="text-white/70 text-xs md:text-sm mb-4">{currentEngine.sub}</p>
                
                <div className="flex gap-2">
                  {(Object.keys(qalaEngines) as EngineKey[]).map((key) => {
                    const isActive = activeEngine === key;
                    return (
                      <button
                        key={key}
                        onClick={() => setActiveEngine(key)}
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
