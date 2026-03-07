import * as React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SEO from '../components/layout/SEO';
import Hero from '../components/layout/Hero';
import TechStackRibbon from '../components/home/TechStackRibbon';
import WhyDifferent from '../components/home/WhyDifferent';
import ClientLogos from '../components/home/ClientLogos';
import QuickMetrics from '../components/home/QuickMetrics';
import WhatWeDo from '../components/home/WhatWeDo';
import HowWeWork from '../components/home/HowWeWork';
import CaseStudySnapshots from '../components/home/CaseStudySnapshots';
import ResearchInsights from '../components/home/ResearchInsights';
import Testimonial from '../components/home/Testimonial';
import Team from '../components/home/Team';
import FAQ from '../components/home/FAQ';
import ClosingCTA from '../components/home/ClosingCTA';

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <SEO 
        title="Qala Labs: Performance Marketing · AI Automation · Ecommerce Growth · Creator Programs"
        description="Qala Labs helps DTC & ecommerce brands scale with performance marketing, AI automation, conversion-first web development and creator-led growth. Book a 15-min growth audit."
      />
      <Navbar />
      
      <Hero />
      <TechStackRibbon />
      <WhyDifferent />
      <ClientLogos />
      <QuickMetrics />
      <WhatWeDo />
      <HowWeWork />
      <CaseStudySnapshots />
      <ResearchInsights />
      <Testimonial />
      <Team />
      <FAQ />
      <ClosingCTA />

      <Footer />
    </div>
  );
};

export default Index;