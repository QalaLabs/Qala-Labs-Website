"use client";

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';
import AboutHero from '@/components/about/AboutHero';
import AboutKPIs from '@/components/about/AboutKPIs';
import AboutPrinciples from '@/components/about/AboutPrinciples';
import AboutProcess from '@/components/about/AboutProcess';
import AboutResearch from '@/components/about/AboutResearch';
import AboutModals from '@/components/about/AboutModals';
import PlatformStack from '@/components/about/PlatformStack';
import FAQ from '@/components/home/FAQ';
import Team from '@/components/home/Team';
import ClosingCTA from '@/components/home/ClosingCTA';

const About = () => {
  const [modalState, setModalState] = useState<{ isOpen: boolean; type: 'book' | 'casepack' }>({
    isOpen: false,
    type: 'book'
  });

  const openModal = (type: 'book' | 'casepack') => {
    setModalState({ isOpen: true, type });
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', type === 'book' ? 'about_book_modal_opened' : 'about_casepack_requested');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="About Qala Labs — Performance Marketing, AI Automation & Ecommerce Growth"
        description="Qala Labs pairs rigorous research with hands-on execution to help DTC & ecommerce brands lower CAC, lift LTV and scale profitably. Book a 15-min growth audit."
      />
      <Navbar />
      
      <main>
        <AboutHero 
          onBookClick={() => openModal('book')} 
          onCasePackClick={() => openModal('casepack')} 
        />

        <AboutKPIs />
        <AboutPrinciples />
        <PlatformStack />
        <AboutProcess />
        <AboutResearch />
        <Team />
        <FAQ />
        <ClosingCTA />
      </main>

      <AboutModals 
        isOpen={modalState.isOpen} 
        onClose={() => setModalState({ ...modalState, isOpen: false })} 
        type={modalState.type} 
      />
      
      <Footer />
    </div>
  );
};

export default About;