import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { caseStudies as cases } from '../data/caseStudies';

export const CaseStudies: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? cases.length - 3 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= cases.length - 3 ? 0 : prev + 1));
  };

  return (
    <section id="case-studies" className="relative py-28 bg-[#06070D] overflow-hidden">
      <div className="absolute inset-0 bg-[url('/assets/caseStudyBg.webp')] bg-cover bg-center opacity-25 pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="eyebrow">
              <span className="w-2 h-2 rounded-full bg-[#3FE0E0] animate-blink" />
              Proven Track Record
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-white tracking-tight">
              Case Studies & Proof
            </h2>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevSlide}
              aria-label="Previous case study"
              className="w-12 h-12 rounded-full border border-white/20 bg-[#06070D]/80 hover:bg-[#3FE0E0] text-white hover:text-black transition-colors flex items-center justify-center shadow-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next case study"
              className="w-12 h-12 rounded-full border border-white/20 bg-[#06070D]/80 hover:bg-[#3FE0E0] text-white hover:text-black transition-colors flex items-center justify-center shadow-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Track */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out -mx-3"
            style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
          >
            {cases.map((item) => (
              <div
                key={item.slug}
                className="w-full sm:w-1/2 lg:w-1/3 shrink-0 px-3"
              >
                <div className="relative group rounded-[32px] overflow-hidden border border-white/10 bg-white/[0.03] hover:border-[#3FE0E0] transition-all duration-500 hover:shadow-[0_0_40px_-10px_rgba(63,224,224,0.25)] h-[490px] flex flex-col justify-between p-6">
                  
                  {/* Category & Title */}
                  <div>
                    <span className="inline-block text-[11px] font-bold text-[#3FE0E0] uppercase tracking-wider mb-2">
                      {item.category}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1 group-hover:text-[#3FE0E0] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-white/70">
                      {item.subtitle}
                    </p>
                  </div>

                  {/* Thumbnail Image */}
                  <div className="relative rounded-2xl overflow-hidden mt-4 flex-1 bg-black/50">
                    <img
                      src={item.thumb}
                      alt={item.title}
                      className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/caseStudyBg.webp';
                      }}
                    />
                    
                    {/* Bottom Result Pill */}
                    <div className="absolute bottom-3 left-3 right-3 glass-panel px-3.5 py-2 rounded-xl border border-white/15">
                      <div className="text-xs font-semibold text-white truncate">
                        {item.result}
                      </div>
                    </div>
                  </div>

                  {/* Hover Overlay Button */}
                  <div className="absolute top-0 right-0 bottom-0 left-0 bg-black/40 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none group-hover:pointer-events-auto">
                    <Link
                      to={`/case-studies/${item.slug}`}
                      className="w-20 h-20 rounded-full bg-white hover:bg-[#3FE0E0] text-black hover:text-black transition-all duration-300 flex items-center justify-center shadow-2xl hover:scale-110"
                    >
                      <ArrowUpRight className="w-8 h-8" />
                    </Link>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
