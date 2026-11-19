import React from 'react';
import { SkipLink } from '../components/SkipLink';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ChatbotToggle } from '../components/ChatbotToggle';
import { StickyCTA } from '../components/StickyCTA';

interface PageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-transparent qala-bg-ambient selection:bg-[#3FE0E0] selection:text-black font-sans pb-20 relative">
      <SkipLink />
      {/* Fixed Ambient Micro-Grid Texture */}
      <div className="fixed inset-0 qala-grid-pattern opacity-25 pointer-events-none z-0" />

      <div className="relative z-10">
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
        <ChatbotToggle />
        <StickyCTA />
      </div>
    </div>
  );
};
