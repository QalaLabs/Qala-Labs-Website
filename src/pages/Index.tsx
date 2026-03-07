"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/layout/Hero';
import ClientLogos from '@/components/home/ClientLogos';
import WhyDifferent from '@/components/home/WhyDifferent';
import WhatWeDo from '@/components/home/WhatWeDo';
import HowWeWork from '@/components/home/HowWeWork';
import ResearchInsights from '@/components/home/ResearchInsights';
import CaseStudySnapshots from '@/components/home/CaseStudySnapshots';
import QuickMetrics from '@/components/home/QuickMetrics';
import Testimonial from '@/components/home/Testimonial';
import LeadForm from '@/components/home/LeadForm';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';

const Index = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      <SEO 
        title="Scale Your DTC Brand to 8-Figures"
        description="We combine high-performance paid media with high-converting creative to dominate your niche."
      />
      
      <Navbar />
      
      <main>
        <Hero />
        <ClientLogos />
        <WhyDifferent />
        <WhatWeDo />
        <HowWeWork />
        <ResearchInsights />
        <CaseStudySnapshots />
        <QuickMetrics />
        <Testimonial />
        
        <div id="contact">
          <LeadForm />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;