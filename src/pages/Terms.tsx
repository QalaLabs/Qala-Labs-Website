import * as React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';

const Terms = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEO title="Terms of Service" />
      <Navbar />
      <div className="pt-32 pb-20 px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl font-black text-slate-900 mb-8">Terms of Service</h1>
        <div className="prose prose-slate max-w-none">
          <p className="text-lg text-slate-600 mb-6">Last updated: March 20, 2024</p>
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Acceptance of Terms</h2>
            <p>By accessing or using the Qala Labs website, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
          </section>
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Use License</h2>
            <p>Permission is granted to temporarily download one copy of the materials on Qala Labs' website for personal, non-commercial transitory viewing only.</p>
          </section>
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Disclaimer</h2>
            <p>The materials on Qala Labs' website are provided on an 'as is' basis. Qala Labs makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Terms;