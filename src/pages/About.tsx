"use client";

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';
import AboutHero from '@/components/about/AboutHero';
import AboutKPIs from '@/components/about/AboutKPIs';
import AboutPrinciples from '@/components/about/AboutPrinciples';
import SuccessFramework from '@/components/about/SuccessFramework';
import PlatformStack from '@/components/about/PlatformStack';
import AboutProcess from '@/components/about/AboutProcess';
import AboutResearch from '@/components/about/AboutResearch';
import AboutModals from '@/components/about/AboutModals';
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
        title="About Qala Labs | Full-Service AI Growth Agency India"
        description="Qala Labs is India's full-service AI growth agency — combining performance marketing, AI automation, and AI search visibility. Rigorous research, hands-on execution, measurable revenue growth."
      />
      <Navbar />
      
      <main>
        <AboutHero 
          onBookClick={() => openModal('book')} 
          onCasePackClick={() => openModal('casepack')} 
        />

        <AboutKPIs />
        <AboutPrinciples />
        <SuccessFramework />
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