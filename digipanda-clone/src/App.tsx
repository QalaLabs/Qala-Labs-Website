import React from 'react';
import { SEO } from './components/SEO';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Ticker } from './components/Ticker';
import { VideoBanner } from './components/VideoBanner';
import { AboutUsSection } from './components/AboutUsSection';
import { ServicesSection } from './components/ServicesSection';
import { WhyDifferentSection } from './components/WhyDifferentSection';
import { ClientsGrid } from './components/ClientsGrid';
import { CaseStudies } from './components/CaseStudies';
import { ScaleArchitectureSection } from './components/ScaleArchitectureSection';
import { Testimonials } from './components/Testimonials';
import { FaqAccordion } from './components/FaqAccordion';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ChatbotToggle } from './components/ChatbotToggle';
import { StickyCTA } from './components/StickyCTA';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-transparent qala-bg-ambient selection:bg-[#3FE0E0] selection:text-black font-sans pb-20 relative">
      <SEO
        title="Creative × Data × Impact • AI & Growth Studio"
        description="Qala Labs blends art and engineering to build autonomous growth systems, AI creative engines, and high-converting digital products."
        image="/assets/og/og-home.jpg"
        url="/"
      />
      {/* Fixed Ambient Micro-Grid Texture */}
      <div className="fixed inset-0 qala-grid-pattern opacity-25 pointer-events-none z-0" />

      <div className="relative z-10">
        {/* Navigation Header */}
        <Navbar />

        {/* Main Page Sections */}
        <main>
        {/* 1. Hero with macOS Widget & Interactive Dashboard */}
        <Hero />

        {/* 2. Infinite Marquee Ticker */}
        <Ticker />

        {/* 3. Video Showcase Banner */}
        <VideoBanner />

        {/* 4. About Qala Labs & Core Team Structure (Original Site Integration) */}
        <AboutUsSection />

        {/* 5. Full-stack Growth Capabilities & AI Services */}
        <ServicesSection />

        {/* 5. Why We're Different - Dual Core 3D Interactive (Image 1) */}
        <WhyDifferentSection />

        {/* 6. Client Logos Grid */}
        <ClientsGrid />

        {/* 7. Case Studies Carousel */}
        <CaseStudies />

        {/* 8. Scale Architecture // 3D Volumetric Horizon (Image 2) */}
        <ScaleArchitectureSection />

        {/* 9. Verified Founder & Partner Praise */}
        <Testimonials />

        {/* 10. FAQ Accordion */}
        <FaqAccordion />

        {/* 11. Contact & Project Discussion Form */}
        <ContactSection />
      </main>

      {/* Footer & Global Offices */}
      <Footer />

      {/* Floating AI Panda Chatbot Toggle */}
      <ChatbotToggle />

      {/* Persistent Floating Growth Plan Drawer (Images 1 & 2 bottom bar) */}
      <StickyCTA />
      </div>
    </div>
  );
};

export default App;
