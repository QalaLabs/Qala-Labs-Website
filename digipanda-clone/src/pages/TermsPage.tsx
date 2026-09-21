import React from 'react';
import { PageLayout } from './PageLayout';

export const TermsPage: React.FC = () => {
  return (
    <PageLayout>
      <div className="pt-36 pb-20 container mx-auto px-4 lg:px-8 max-w-4xl">
        <div className="border-b border-white/10 pb-8 mb-10">
          <span className="text-xs font-mono text-[#3FE0E0] uppercase tracking-widest block mb-2">Legal Documentation</span>
          <h1 className="text-3xl lg:text-5xl font-extrabold text-white tracking-tight">Terms of Service</h1>
          <p className="text-white/60 text-sm mt-3">Last updated: September 21, 2026</p>
        </div>

        <div className="space-y-8 text-white/80 leading-relaxed text-sm md:text-base">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the website at <a href="https://qalalabs.com" className="text-[#3FE0E0] hover:underline">qalalabs.com</a>, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">2. Intellectual Property</h2>
            <p>
              All materials, design tokens, brand assets, software architectures, algorithms, and content displayed on this website are the proprietary property of Qala Labs or licensed to us, protected by copyright, trademark, and intellectual property laws.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">3. Permitted Use</h2>
            <p>
              You are granted a non-exclusive, non-transferable, revocable license to access and view our site for informational and commercial evaluation purposes. You may not decompile, reverse-engineer, mirror, or unlawfully duplicate any code or proprietary assets without written consent.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">4. Client Engagements & Deliverables</h2>
            <p>
              Client engagements, scopes of work, service level agreements (SLAs), and project terms are governed by dedicated Master Services Agreements (MSAs) or Statements of Work (SOWs) executed separately between Qala Labs and the client.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">5. Disclaimer of Warranties & Limitation of Liability</h2>
            <p>
              This website and its content are provided on an "as is" and "as available" basis without warranties of any kind. In no event shall Qala Labs or its directors, employees, or partners be liable for any indirect, incidental, special, or consequential damages resulting from the use of this website.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">6. Inquiries & Legal Notices</h2>
            <p>
              Questions regarding these Terms of Service should be directed to:
              <br />
              <span className="font-semibold text-white">Qala Labs</span><br />
              Email: <a href="mailto:hello@qalalabs.com" className="text-[#3FE0E0] hover:underline">hello@qalalabs.com</a><br />
              Website: <a href="https://qalalabs.com" className="text-[#3FE0E0] hover:underline">https://qalalabs.com</a>
            </p>
          </section>
        </div>
      </div>
    </PageLayout>
  );
};
