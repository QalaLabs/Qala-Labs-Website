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

        <section className="py-24 bg-white border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-sm font-black text-blue-600 uppercase tracking-[0.2em] mb-6">Our Mission</h2>
                <p className="text-3xl md:text-5xl font-black text-slate-900 leading-tight mb-8">
                  To help product-led ecommerce brands scale sustainably by turning data and research into high-confidence experiments.
                </p>
                <div className="space-y-6">
                  {[
                    { label: "Rigor over hype", text: "Every test is measurable. We don't guess; we engineer experiments with clear hypotheses." },
                    { label: "Radical transparency", text: "Clear KPIs, clear attribution. You see exactly what we see in real-time dashboards." },
                    { label: "Ownership", text: "We act like we own your P&L. Your growth is our only success metric." }
                  ].map((v, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2.5 shrink-0" />
                      <div>
                        <p className="font-bold text-slate-900">{v.label}</p>
                        <p className="text-slate-500">{v.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-slate-50 p-12 rounded-[4rem] border border-slate-100">
                <div className="space-y-8">
                  <div className="p-8 bg-white rounded-3xl shadow-sm border border-slate-100">
                    <p className="text-sm font-bold text-blue-600 mb-2">TroTr: Lead Generation</p>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Challenge: Zero conversions from WhatsApp ads. <br />
                      Action: Rebuilt funnel with founder-led storytelling. <br />
                      Outcome: 28x ROAS and ₹14L revenue.
                    </p>
                  </div>
                  <div className="p-8 bg-white rounded-3xl shadow-sm border border-slate-100">
                    <p className="text-sm font-bold text-blue-600 mb-2">playR: Amazon Growth</p>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Challenge: High competition in apparel keywords. <br />
                      Action: Aggressive search term mining and bid control. <br />
                      Outcome: 11.2x Max ROAS and ₹2.7L+ monthly sales.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <AboutKPIs />
        <AboutPrinciples />
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