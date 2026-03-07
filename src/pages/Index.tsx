"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/layout/Hero';
import TechMarquee from '@/components/home/TechMarquee';
import ServicesGrid from '@/components/home/ServicesGrid';
import TechStack from '@/components/home/TechStack';
import Portfolio from '@/components/home/Portfolio';
import AboutFounder from '@/components/home/AboutFounder';
import LeadForm from '@/components/home/LeadForm';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';

const Index = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 selection:bg-indigo-500/30 selection:text-indigo-200">
      <SEO 
        title="Qala Labs | Scale Your E-commerce. Automate The Rest."
        description="Qala Labs builds custom n8n workflows, deploys Python-driven data analytics, and executes performance marketing to turn your brand into a seamless revenue engine."
      />
      
      <Navbar />
      
      <main>
        <Hero />
        <TechMarquee />
        
        <div id="services">
          <ServicesGrid />
        </div>

        <TechStack />
        
        <div id="work">
          <Portfolio />
        </div>
        
        <div id="approach">
          <AboutFounder />
        </div>
        
        <div id="contact">
          <LeadForm />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;