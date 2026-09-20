import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ChatbotToggle } from '../components/ChatbotToggle';
import { StickyCTA } from '../components/StickyCTA';

interface PageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#06070D] text-white selection:bg-[#3FE0E0] selection:text-black font-sans pb-20">
      <Navbar />
      <main>{children}</main>
      <Footer />
      <ChatbotToggle />
      <StickyCTA />
    </div>
  );
};
