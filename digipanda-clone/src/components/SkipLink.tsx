import React from 'react';

/** First focusable element — jumps keyboard users past nav into main content. */
export const SkipLink: React.FC = () => (
  <a
    href="#main-content"
    className="skip-link sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-3 focus:rounded-xl focus:bg-[#3FE0E0] focus:text-black focus:font-bold focus:text-sm focus:shadow-lg focus:outline-none"
  >
    Skip to main content
  </a>
);

export default SkipLink;
