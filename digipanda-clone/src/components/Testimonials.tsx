import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Akaash Maskeen',
    role: 'Founder & CEO',
    company: 'Gaffar India',
    quote:
      'Qala Labs helped us turn a local market legacy into a modern marketplace identity. Their strategy balanced our Gaffar Market roots with digital usability — our sellers felt seen, buyers trusted the site more, and the brand is finally ready to scale.',
    metric: '120+ Vendors • 28-Day Delivery',
  },
];

export const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () => {
    setActiveIndex((current) => (current === 0 ? testimonials.length - 1 : current - 1));
  };

  const next = () => {
    setActiveIndex((current) => (current === testimonials.length - 1 ? 0 : current + 1));
  };

  const item = testimonials[activeIndex];

  return (
    <section className="relative py-28 bg-transparent border-t border-white/10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(63,224,224,0.06),transparent_60%)] pointer-events-none" />
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-4">
            <div className="eyebrow">
              <span className="w-2 h-2 rounded-full bg-[#3FE0E0] animate-blink" />
              Founder & Partner Praise
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-white tracking-tight leading-tight mb-4">
              Real Impact, Real Numbers.
            </h2>
            <p className="text-white/70 text-sm md:text-base leading-relaxed mb-8">
              We partner with founders who refuse to settle for vanity metrics. Here is what happens when deep engineering craft meets aggressive growth strategy.
            </p>

            {testimonials.length > 1 ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={prev}
                  aria-label="Previous testimonial"
                  className="w-12 h-12 rounded-full border border-white/20 bg-[#0b0c16] hover:bg-[#3FE0E0] text-white hover:text-black transition-colors flex items-center justify-center shadow-lg"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={next}
                  aria-label="Next testimonial"
                  className="w-12 h-12 rounded-full border border-white/20 bg-[#0b0c16] hover:bg-[#3FE0E0] text-white hover:text-black transition-colors flex items-center justify-center shadow-lg"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <span className="text-xs text-white/50 ml-2 font-mono">
                  {activeIndex + 1} / {testimonials.length}
                </span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>AUDITED CLIENT CASE STUDY</span>
              </div>
            )}
          </div>

          <div className="lg:col-span-8">
            <div className="relative rounded-[36px] bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 p-8 md:p-12 shadow-2xl overflow-hidden backdrop-blur-md">
              
              <div className="text-[#3FE0E0] mb-6">
                <Quote className="w-10 h-10 md:w-12 md:h-12 opacity-80" />
              </div>

              <p className="text-white/90 text-base md:text-lg lg:text-xl font-normal leading-relaxed mb-8">
                "{item.quote}"
              </p>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="text-white font-bold text-lg md:text-xl">{item.name}</h4>
                  <p className="text-white/60 text-xs mt-0.5">{item.role}</p>
                </div>
                <div className="text-[#3FE0E0] text-sm md:text-base font-semibold px-4 py-1.5 rounded-full bg-[#3FE0E0]/10 border border-[#3FE0E0]/30">
                  {item.company}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
