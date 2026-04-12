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
        title="About Qala Labs | Performance Marketing Agency for DTC Brands India"
        description="We're a performance marketing & AI automation agency for DTC brands in India. Rigorous research, hands-on execution, and measurable revenue growth. Book a free 15-min audit."
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