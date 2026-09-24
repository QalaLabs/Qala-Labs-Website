import React from 'react';
import { ImageAsciiArt } from './ImageAsciiArt';

export const VideoBanner: React.FC = () => {
  return (
    <section className="relative pt-20 md:pt-32 pb-16 overflow-hidden bg-transparent">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium text-white tracking-tight leading-tight">
            We Don't Just Build Campaigns,
          </h2>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#3FE0E0] tracking-tight leading-tight mt-2 md:mt-0">
            We Engineer Movements.
          </h2>
        </div>

        <div className="relative rounded-[36px] md:rounded-[60px] overflow-hidden border border-white/10 shadow-2xl bg-gradient-to-br from-white/5 to-white/0 p-2 md:p-4">
          <div className="relative rounded-[28px] md:rounded-[50px] overflow-hidden aspect-[16/9] md:aspect-[21/9] bg-[#06070D] flex items-center justify-center group select-none">
            {/* Ambient Background matching the section visual */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-30 pointer-events-none transition-opacity duration-700"
              style={{ backgroundImage: `url('/assets/caseStudyBg.webp')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#4F46E5]/20 via-transparent to-[#3FE0E0]/15 pointer-events-none" />

            {/* Interactive ASCII Art Canvas */}
            <div className="absolute inset-0 z-0">
              <ImageAsciiArt
                imageSrc="/assets/qala/hero-ascii-source.jpg"
                className="cursor-crosshair"
              />
            </div>

            {/* Interactive Hint Badge (Top-Right) */}
            <div className="absolute top-4 right-4 md:top-6 md:right-8 z-10 glass-panel px-3 py-1.5 rounded-full hidden sm:flex items-center gap-2 text-[11px] font-mono text-white/70 border border-white/10 pointer-events-none shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3FE0E0] animate-pulse" />
              <span>Interactive ASCII • Move cursor to repel</span>
            </div>

            {/* Art & Engineering Lab Badge (Bottom-Left) */}
            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-10 glass-panel px-4 py-2.5 rounded-full flex items-center gap-3 border border-white/15 backdrop-blur-md shadow-lg pointer-events-none">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3FE0E0] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#3FE0E0]" />
              </span>
              <span className="text-xs md:text-sm font-semibold text-white uppercase tracking-wider">
                Art & Engineering Lab
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
