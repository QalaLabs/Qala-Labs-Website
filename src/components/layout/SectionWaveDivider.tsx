import * as React from 'react';

/**
 * Thin animated waveform divider used between the page content and the
 * footer, echoing the "live system" motif from the hero dashboard panel.
 * Pure CSS/SVG, respects prefers-reduced-motion, scales for mobile via
 * viewBox + preserveAspectRatio rather than fixed pixel widths.
 */
const SectionWaveDivider = ({ className = '' }: { className?: string }) => {
  return (
    <div
      aria-hidden="true"
      className={`w-full overflow-hidden py-6 md:py-10 bg-background ${className}`}
    >
      <div className="w-[200%] motion-safe:animate-wave-scroll">
        <svg
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
          className="w-1/2 h-8 md:h-10 inline-block align-top"
        >
          <defs>
            <linearGradient id="wave-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#2563EB" stopOpacity="0" />
              <stop offset="20%" stopColor="#2563EB" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#4F46E5" stopOpacity="0.9" />
              <stop offset="80%" stopColor="#2563EB" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0,30 C50,10 100,50 150,30 C200,10 250,50 300,30 C350,10 400,50 450,30 C500,10 550,50 600,30 C650,10 700,50 750,30 C800,10 850,50 900,30 C950,10 1000,50 1050,30 C1100,10 1150,50 1200,30"
            fill="none"
            stroke="url(#wave-grad)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <svg
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
          className="w-1/2 h-8 md:h-10 inline-block align-top"
        >
          <path
            d="M0,30 C50,10 100,50 150,30 C200,10 250,50 300,30 C350,10 400,50 450,30 C500,10 550,50 600,30 C650,10 700,50 750,30 C800,10 850,50 900,30 C950,10 1000,50 1050,30 C1100,10 1150,50 1200,30"
            fill="none"
            stroke="url(#wave-grad)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default SectionWaveDivider;
