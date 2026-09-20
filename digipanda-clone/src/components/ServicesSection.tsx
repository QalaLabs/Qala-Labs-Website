import React from 'react';
import {
  Zap,
  Sparkles,
  Layers,
  Cpu,
  TrendingUp,
  Globe,
  Share2,
} from 'lucide-react';

const aiCapabilities = [
  {
    title: 'AI Ad Creative Engine',
    desc: '80% lower cost, 50+ weekly on-brand creatives (WWF India)',
    icon: <Sparkles className="w-5 h-5 text-[#3FE0E0]" />,
    iconBg: 'rgba(63, 224, 224, 0.15)',
  },
  {
    title: 'B2B Audience Engineering',
    desc: '45 enterprise leads & 71% untapped market (Nutrivend UK)',
    icon: <Cpu className="w-5 h-5 text-[#4F46E5]" />,
    iconBg: 'rgba(79, 70, 229, 0.15)',
  },
  {
    title: 'High-Ticket Acquisition',
    desc: '28x ROAS founder-led travel lead generation (Trotr)',
    icon: <TrendingUp className="w-5 h-5 text-[#34D399]" />,
    iconBg: 'rgba(52, 211, 153, 0.15)',
  },
  {
    title: 'Luxury Horology Pipeline',
    desc: '₹4.2Cr+ high-net-worth collector acquisition (Chrono Seconds)',
    icon: <Share2 className="w-5 h-5 text-[#f59e0b]" />,
    iconBg: 'rgba(245, 158, 11, 0.15)',
  },
  {
    title: 'Marketplace Architecture',
    desc: 'Wholesale & retail digitization with 1,000+ SKUs (Gaffar)',
    icon: <Layers className="w-5 h-5 text-[#a78bfa]" />,
    iconBg: 'rgba(167, 139, 250, 0.15)',
  },
  {
    title: 'Merchandise Ecosystem',
    desc: '8 IPL franchise collections & ₹2.5Cr+ volume (playR)',
    icon: <Globe className="w-5 h-5 text-[#3FE0E0]" />,
    iconBg: 'rgba(63, 224, 224, 0.15)',
  },
];

const qalaPillars = [
  {
    step: '01',
    title: 'Discovery & Validation',
    desc: 'We eliminate guesswork. Through rigorous A/B audience engineering and data validation, we pinpoint highest-intent market segments before scaling spend.',
    pills: [
      'B2B Audience Testing',
      'Market Validation',
      'Unit Economics',
      'Founder Narrative',
      'Brand Audit',
      'Intent Analysis',
    ],
  },
  {
    step: '02',
    title: 'Craft & Identity',
    desc: 'Design that captivates and converts. From heritage brand modernization to league-wide apparel lines and high-conversion UI/UX systems.',
    pills: [
      'Brand Identity',
      'Apparel Design',
      'Packaging Systems',
      'Marketplace UI/UX',
      'Asset Design Kits',
    ],
  },
  {
    step: '03',
    title: 'Engineering',
    desc: 'Resilient, scalable software architectures built for high-throughput ecommerce, proptech portals, and autonomous business workflows.',
    pills: [
      'Next.js & React',
      'Multi-Vendor Marketplaces',
      'Custom CRM Portals',
      'Supabase & APIs',
      'Performance Tuning',
    ],
  },
  {
    step: '04',
    title: 'Performance & Scale',
    desc: 'Data-led performance marketing that prioritizes profit over vanity metrics. From 28x ROAS travel funnels to Amazon Ads scaling.',
    pills: [
      'Meta High-Ticket Ads',
      'Amazon Ads (11x ROAS)',
      'Luxury Buyer Funnels',
      'Community Loyalty',
      'Email Automations',
    ],
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="relative py-24 md:py-32 bg-[#06070D] overflow-hidden">
      <div className="absolute inset-0 bg-[url('/assets/bgrk1.webp')] bg-cover bg-center opacity-20 pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="eyebrow">
            <span className="w-2 h-2 rounded-full bg-[#3FE0E0] animate-blink" />
            Full-Stack Growth & Engineering
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-white tracking-tight leading-tight mb-4">
            The Power We Deliver
          </h2>
          <p className="text-white/70 text-base md:text-lg">
            From creative storytelling to high-performance engineering — one dedicated growth partner uniting art and technology to scale category leaders.
          </p>
        </div>

        {/* Feature Banner: AI & Intelligence */}
        <div className="rounded-[32px] border border-white/10 hover:border-[#3FE0E0] bg-gradient-to-br from-white/[0.05] to-white/[0.015] p-6 md:p-10 mb-12 transition-all duration-300 hover:shadow-[0_0_50px_-10px_rgba(63,224,224,0.25)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Col */}
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#3FE0E0] uppercase tracking-wider mb-3">
                <Zap className="w-4 h-4 text-[#3FE0E0]" />
                PROPRIETARY ENGINES
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white leading-tight mb-4">
                Intelligence & Craft, woven into every system
              </h3>
              <p className="text-white/65 text-sm md:text-base leading-relaxed mb-6">
                Rapid creative automation, high-ticket conversion architectures, and deep market validation systems built to compound your enterprise returns.
              </p>
              <a
                href="#case-studies"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-[#4F46E5] to-[#3FE0E0] hover:brightness-110 text-white rounded-full px-6 py-2.5 font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md"
              >
                <span>View Case Studies</span>
                <span className="w-2 h-2 rounded-full bg-white" />
              </a>
            </div>

            {/* Right Col: Capabilities Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {aiCapabilities.map((cap, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 hover:border-[#3FE0E0] hover:bg-white/[0.06] transition-all duration-300 hover:shadow-[0_0_25px_-5px_rgba(63,224,224,0.25)] block group"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                    style={{ backgroundColor: cap.iconBg }}
                  >
                    {cap.icon}
                  </div>
                  <div className="font-semibold text-white text-sm mb-1 group-hover:text-[#3FE0E0] transition-colors">
                    {cap.title}
                  </div>
                  <div className="text-white/55 text-xs leading-snug">
                    {cap.desc}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* 4 Process Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {qalaPillars.map((pillar, idx) => (
            <div
              key={idx}
              className="w-full p-6 md:p-8 rounded-[32px] text-white border border-white/10 hover:border-[#3FE0E0] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 hover:shadow-[0_0_35px_-10px_rgba(63,224,224,0.25)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-xs text-white/40 font-bold">{pillar.step}</span>
                  <span className="h-px flex-1 bg-gradient-to-r from-[#3FE0E0] to-transparent" />
                </div>

                <h3 className="text-2xl md:text-3xl font-normal text-white mb-3">
                  {pillar.title}
                </h3>
                <p className="text-white/70 text-xs md:text-sm leading-relaxed mb-6">
                  {pillar.desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {pillar.pills.map((pill, pIdx) => (
                    <span
                      key={pIdx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-white/10 bg-white/[0.03] text-white/80 hover:border-[#3FE0E0] hover:text-[#3FE0E0] transition-colors cursor-pointer"
                    >
                      {pill}
                      <img src="/assets/process-arrow.svg" alt="" className="w-2.5 h-2.5 -rotate-90 opacity-60" />
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-center pt-2">
                <a
                  href="#contact-form"
                  className="w-full inline-block py-2.5 px-5 bg-white hover:bg-[#3FE0E0] text-black hover:text-black rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md"
                >
                  Start Project
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
