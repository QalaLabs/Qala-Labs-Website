import * as React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEO title="Privacy Policy" />
      <Navbar />
      <div className="pt-32 pb-20 px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl font-black text-slate-900 mb-8">Privacy Policy</h1>
        <div className="prose prose-slate max-w-none">
          <p className="text-lg text-slate-600 mb-6">Last updated: March 20, 2024</p>
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Information We Collect</h2>
            <p>We collect information you provide directly to us, such as when you request an audit, sign up for our newsletter, or contact us for support. This may include your name, email address, website URL, and business revenue data.</p>
          </section>
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. How We Use Your Information</h2>
            <p>We use the information we collect to provide, maintain, and improve our services, to communicate with you about your audit requests, and to send you marketing communications that we believe will be of interest to you.</p>
          </section>
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Data Security</h2>
            <p>We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction.</p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Privacy;