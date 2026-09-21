import React from 'react';
import { PageLayout } from './PageLayout';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <PageLayout>
      <div className="pt-36 pb-20 container mx-auto px-4 lg:px-8 max-w-4xl">
        <div className="border-b border-white/10 pb-8 mb-10">
          <span className="text-xs font-mono text-[#3FE0E0] uppercase tracking-widest block mb-2">Legal Documentation</span>
          <h1 className="text-3xl lg:text-5xl font-extrabold text-white tracking-tight">Privacy Policy</h1>
          <p className="text-white/60 text-sm mt-3">Last updated: September 21, 2026</p>
        </div>

        <div className="space-y-8 text-white/80 leading-relaxed text-sm md:text-base">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">1. Overview</h2>
            <p>
              Qala Labs ("we," "our," or "us") is dedicated to protecting your privacy. This Privacy Policy outlines how we collect, utilize, and safeguard your personal information when you visit <a href="https://qalalabs.com" className="text-[#3FE0E0] hover:underline">qalalabs.com</a> or interact with our digital services, AI systems, and marketing platforms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">2. Information We Collect</h2>
            <ul className="list-disc pl-5 space-y-2 text-white/70">
              <li><strong>Contact Information:</strong> Name, business email address, company name, phone number, and project requirements when you submit our contact or inquiry forms.</li>
              <li><strong>Technical & Usage Data:</strong> IP address, browser type, device identifiers, referring URLs, operating systems, and page interaction timestamps.</li>
              <li><strong>Communications Data:</strong> Direct correspondence, scheduled consultation requests, and customer feedback.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">3. How We Use Your Data</h2>
            <p>We process collected data to:</p>
            <ul className="list-disc pl-5 space-y-2 text-white/70">
              <li>Deliver, operate, and enhance our services, AI workflows, and digital engineering solutions.</li>
              <li>Respond to inquiries, conduct discovery calls, and deliver proposals or deliverables.</li>
              <li>Analyze site metrics, performance, security, and prevent fraudulent activity.</li>
              <li>Comply with applicable legal, financial, and regulatory obligations.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">4. Data Security & Storage</h2>
            <p>
              We implement enterprise-grade technical and organizational measures to safeguard your personal data against unauthorized access, alteration, disclosure, or destruction. We do not sell your personal data to third parties.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">5. Your Privacy Rights</h2>
            <p>
              Depending on your jurisdiction (such as GDPR in Europe/UK or CCPA/CPRA in California), you may have the right to access, rectify, delete, or restrict the processing of your personal data. To exercise these rights, please contact us at <a href="mailto:hello@qalalabs.com" className="text-[#3FE0E0] hover:underline">hello@qalalabs.com</a>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">6. Contact Us</h2>
            <p>
              For any questions regarding this Privacy Policy, reach out to us at:
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
