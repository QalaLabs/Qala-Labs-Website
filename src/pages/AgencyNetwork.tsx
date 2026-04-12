"use client";

import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SEO from '../components/layout/SEO';
import NetworkHero from '../components/network/NetworkHero';
import NetworkStats from '../components/network/NetworkStats';
import NetworkBenefits from '../components/network/NetworkBenefits';
import NetworkForm from '../components/network/NetworkForm';
import ClosingCTA from '../components/home/ClosingCTA';

const AgencyNetwork = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Agency Partner Network | Collaborate with a DTC Growth Agency India | Qala Labs"
        description="Freelancers, performance marketers, and growth consultants: join Qala Labs' partner network and collaborate on high-impact DTC ecommerce projects."
      />
      <Navbar />
      
      <main>
        <NetworkHero />
        <NetworkStats />
        <NetworkBenefits />
        <NetworkForm />
        <ClosingCTA 
          title="Not an agency or freelancer? No problem." 
          description="If you're a creator looking to work with brands, check out our Creator Collective."
          primaryCtaText="Creator Collective"
          secondaryCtaText="Contact Us"
        />
      </main>

      <Footer />
    </div>
  );
};

export default AgencyNetwork;