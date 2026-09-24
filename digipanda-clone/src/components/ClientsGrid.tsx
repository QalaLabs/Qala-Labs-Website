import React from 'react';
import { ArrowRight } from 'lucide-react';

const clients = [
  { name: 'WWF India', role: 'AI Ad Creative System' },
  { name: 'Chrono Seconds', role: 'Luxury Horology Marketplace' },
  { name: 'playR', role: '8 IPL Franchises Merch' },
  { name: 'Nutrivend UK', role: 'B2B Market Validation' },
  { name: 'Trotr', role: '28x ROAS Travel Funnel' },
  { name: 'Gaffar India', role: 'Multi-Vendor Marketplace' },
  { name: 'Mizuno India', role: 'Performance Footwear Architecture' },
  { name: 'Capital Keys', role: 'Real Estate Platform' },
  { name: 'Mystic Studio 8', role: '3.4M+ Kashmiri Sound Views' },
  { name: 'Amazon Ads', role: '11.2x ROAS Scaling' },
  { name: 'BNPL D2C Strategy', role: '30% Conversion Uplift' },
];

export const ClientsGrid: React.FC = () => {
  return (
    <section id="who-we-are" className="relative py-24 bg-transparent overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(63,224,224,0.06),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/assets/bgrk9.webp')] bg-center bg-cover opacity-10 pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
        <div className="max-w-4xl mx-auto mb-16">
          <h3 className="font-semibold text-lg md:text-2xl text-[#3FE0E0] mb-3 uppercase tracking-wider">
            Proven Execution Across Categories
          </h3>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-white tracking-tight leading-tight">
            Trusted by Category Leaders & Ambitious Founders
          </h2>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 items-center justify-center">
          {clients.map((c, idx) => (
            <div
              key={idx}
              className="h-28 md:h-36 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-[#3FE0E0]/60 hover:bg-white/[0.05] transition-all duration-300 flex flex-col items-center justify-center p-4 group shadow-sm hover:shadow-[0_0_20px_-5px_rgba(63,224,224,0.25)] text-center"
            >
              <div className="font-bold text-white text-sm md:text-base group-hover:text-[#3FE0E0] transition-colors leading-tight mb-1">
                {c.name}
              </div>
              <div className="text-[11px] text-white/50 leading-tight">
                {c.role}
              </div>
            </div>
          ))}

          <div className="h-28 md:h-36 rounded-2xl border border-white/10 bg-white/[0.02] flex items-center justify-center p-2">
            <a
              href="#case-studies"
              className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white hover:bg-[#3FE0E0] text-black hover:text-black transition-all duration-300 flex items-center justify-center shadow-lg hover:scale-110 group"
              title="Explore Case Studies"
            >
              <ArrowRight className="w-6 h-6 md:w-8 md:h-8 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
