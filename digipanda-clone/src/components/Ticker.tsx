import React from 'react';

const tickerItems = [
  'Meta Lead Gen',
  'AI Ad Creatives',
  '28x ROAS Funnels',
  'IPL Merchandise Ecosystem',
  'Multi-Vendor Marketplaces',
  'B2B Market Validation',
  'Viral Fandom Activation',
  'Unit Economics Optimization',
];

export const Ticker: React.FC = () => {
  const items = [...tickerItems, ...tickerItems, ...tickerItems];

  return (
    <div className="relative w-full overflow-hidden py-4 border-y border-white/10 bg-[#06070D]/80 backdrop-blur-sm select-none">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#06070D] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#06070D] to-transparent z-10 pointer-events-none" />

      <div className="ticker-track flex items-center gap-8">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-8 shrink-0">
            <span className="text-white/90 font-medium text-sm md:text-base tracking-wide uppercase">
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#3FE0E0] shadow-[0_0_8px_#3FE0E0]" />
          </div>
        ))}
      </div>
    </div>
  );
};
