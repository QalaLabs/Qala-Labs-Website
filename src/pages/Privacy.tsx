import * as React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEO title="Privacy Policy | Qala Labs" />
      <Navbar />
      <div className="pt-32 pb-20 px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl font-black text-slate-900 mb-4">Privacy Policy</h1>
        <p className="text-lg text-slate-600 mb-8">Last updated: June 10, 2026</p>

        <div className="prose prose-slate max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Introduction</h2>
            <p>Qala Labs ("Company," "we," "us," or "our") operates the website and related services. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services. Please read this privacy policy carefully. If you do not agree with our policies and practices, please do not use our services.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Information We Collect</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">1.1 Information You Provide Directly</h3>
                <p>We collect information you voluntarily provide to us, including:</p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Contact information (name, email address, phone number, company name)</li>
                  <li>Business information (website URL, revenue data, industry, business size)</li>
                  <li>Account information (username, password, profile details)</li>
                  <li>Communication data (emails, messages, inquiries)</li>
                  <li>Payment information (processed securely through third-party providers)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">1.2 Information Collected Automatically</h3>
                <p>When you access our website, we automatically collect certain information:</p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Device information (IP address, browser type, operating system, device type)</li>
                  <li>Usage data (pages visited, time spent, links clicked, referral source)</li>
                  <li>Cookies and tracking pixels (including Meta Pixel)</li>
                  <li>Analytics data (through Google Analytics and similar tools)</li>
                  <li>Location information (general geographic location based on IP)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">1.3 Cookies and Tracking Technologies</h3>
                <p>We use cookies, web beacons, pixels, and similar tracking technologies to:</p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Remember your preferences and login information</li>
                  <li>Understand how you use our website</li>
                  <li>Personalize your experience</li>
                  <li>Deliver targeted advertising through Meta and other platforms</li>
                  <li>Measure advertising effectiveness</li>
                  <li>Prevent fraud and ensure security</li>
                </ul>
                <p className="mt-3">You can control cookie settings through your browser preferences. Disabling cookies may limit your ability to use certain features of our website.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Meta Pixel and Third-Party Tracking</h2>
            <p>Our website uses Meta Pixel (formerly Facebook Pixel) to track user interactions and measure conversion events. The Meta Pixel allows us to:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Track user conversions and optimize advertising campaigns</li>
              <li>Build custom and lookalike audiences for targeted advertising</li>
              <li>Retarget users who have visited our website</li>
              <li>Measure the effectiveness of our marketing campaigns</li>
            </ul>
            <p className="mt-4">Meta receives and processes this data in accordance with their <a href="https://www.facebook.com/privacy/explanation" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Privacy Policy</a>. You can opt out of Meta's tracking by adjusting your privacy settings in your Meta account or using the <a href="https://optout.networkadvertising.org/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Network Advertising Initiative opt-out tool</a>.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. How We Use Your Information</h2>
            <p>We use the information we collect for the following purposes:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Providing and improving our services and products</li>
              <li>Processing and fulfilling your requests and transactions</li>
              <li>Communicating with you about updates, promotions, and news</li>
              <li>Personalizing your experience and providing targeted content</li>
              <li>Conducting marketing and analytics activities</li>
              <li>Preventing fraud and ensuring security</li>
              <li>Complying with legal obligations</li>
              <li>Responding to your inquiries and providing customer support</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. How We Share Your Information</h2>
            <p>We may share your information with:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li><strong>Service Providers:</strong> Third-party vendors who provide services on our behalf (hosting, analytics, payment processing, marketing)</li>
              <li><strong>Marketing Partners:</strong> Meta, Google, and other advertising platforms for targeted advertising</li>
              <li><strong>Business Partners:</strong> Companies we partner with to provide complementary services</li>
              <li><strong>Legal Requirements:</strong> Law enforcement, regulators, or other parties when required by law</li>
              <li><strong>Business Transactions:</strong> In case of merger, acquisition, or sale of assets</li>
            </ul>
            <p className="mt-4">We do not sell your personal information to third parties for their independent marketing purposes.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Data Retention</h2>
            <p>We retain your information for as long as necessary to provide our services and fulfill the purposes outlined in this policy. Retention periods vary depending on the type of information and the context of processing:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Account information is retained while your account is active and for a reasonable period afterward</li>
              <li>Marketing data may be retained for marketing purposes until you opt out</li>
              <li>Analytics and usage data are typically retained for up to 26 months</li>
              <li>Legal and compliance information may be retained longer as required by law</li>
            </ul>
            <p className="mt-4">You can request deletion of your data at any time, subject to legal and contractual obligations.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Your Privacy Rights</h2>
            <p>Depending on your location, you may have the following rights:</p>
            <div className="space-y-4 mt-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">EU (GDPR)</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Right to access your personal data</li>
                  <li>Right to rectify inaccurate data</li>
                  <li>Right to erasure ("right to be forgotten")</li>
                  <li>Right to restrict processing</li>
                  <li>Right to data portability</li>
                  <li>Right to object to processing</li>
                  <li>Right to withdraw consent</li>
                  <li>Right to lodge a complaint with your data protection authority</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">US (CCPA/CPRA)</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Right to know what personal information is collected</li>
                  <li>Right to delete personal information</li>
                  <li>Right to opt out of sale of personal information</li>
                  <li>Right to correct inaccurate information</li>
                  <li>Right to non-discrimination for exercising your rights</li>
                </ul>
              </div>
            </div>
            <p className="mt-4">To exercise any of these rights, please contact us at privacy@qalalabs.com</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Data Security</h2>
            <p>We implement industry-standard security measures to protect your information from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction. These include:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>SSL/TLS encryption for data in transit</li>
              <li>Secure password policies and authentication</li>
              <li>Regular security audits and assessments</li>
              <li>Access controls and restricted permissions</li>
              <li>Firewalls and intrusion detection systems</li>
            </ul>
            <p className="mt-4">However, no method of transmission over the internet is completely secure. We cannot guarantee absolute security of your information.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">8. International Data Transfers</h2>
            <p>If you are located outside the United States, your information may be transferred to, stored in, and processed in the United States or other countries. By using our services, you consent to such transfers. We implement appropriate safeguards for international data transfers, including Standard Contractual Clauses and Privacy Shield mechanisms where applicable.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Children's Privacy</h2>
            <p>Our services are not directed to children under 13. We do not knowingly collect personal information from children under 13. If we become aware that a child under 13 has provided us with personal information, we will delete such information and terminate the child's account. If you believe a child has provided us with personal information, please contact us immediately.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Third-Party Links</h2>
            <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review the privacy policies of any third-party website before providing your information or engaging with their services.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">11. Marketing Communications</h2>
            <p>We may send you promotional emails, newsletters, and marketing communications. You can opt out of these communications at any time by:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Clicking the "unsubscribe" link in any email</li>
              <li>Adjusting your account preferences</li>
              <li>Contacting us at privacy@qalalabs.com</li>
            </ul>
            <p className="mt-4">Please note that even if you opt out of marketing communications, we may still send you transactional and administrative emails related to your account or services.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">12. California Consumer Privacy Act (CCPA) Disclosure</h2>
            <p>For California residents, we provide the following additional disclosures:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li><strong>Categories of Personal Information Collected:</strong> Identifiers, commercial information, internet activity, geolocation, and professional information</li>
              <li><strong>Source of Information:</strong> Directly from you, automatically through your device, and from third parties</li>
              <li><strong>Business Purpose:</strong> To provide services, marketing, analytics, and fraud prevention</li>
              <li><strong>Sale of Information:</strong> We do not sell your personal information</li>
              <li><strong>Rights:</strong> You have the right to know, delete, and opt out as described above</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">13. Changes to This Privacy Policy</h2>
            <p>We may update this privacy policy periodically to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of material changes by updating the "Last updated" date above and, where required by law, obtaining your consent. Your continued use of our services following notification of changes constitutes your acceptance of the updated privacy policy.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">14. Contact Us</h2>
            <p>If you have questions, concerns, or requests regarding this privacy policy or our privacy practices, please contact us:</p>
            <div className="bg-slate-50 p-6 rounded-lg mt-4 space-y-2">
              <p><strong>Email:</strong> <a href="mailto:privacy@qalalabs.com" className="text-blue-600 hover:underline">privacy@qalalabs.com</a></p>
              <p><strong>Website:</strong> <a href="https://qalalabs.com" className="text-blue-600 hover:underline">https://qalalabs.com</a></p>
              <p><strong>Address:</strong> Qala Labs, [Your Company Address]</p>
            </div>
            <p className="mt-4">We will respond to your request within 30 days or as required by applicable law.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">15. Data Protection Officer</h2>
            <p>If you are in the EU or similar jurisdiction, you may have the right to contact our Data Protection Officer:</p>
            <div className="bg-slate-50 p-6 rounded-lg mt-4">
              <p><strong>Email:</strong> <a href="mailto:dpo@qalalabs.com" className="text-blue-600 hover:underline">dpo@qalalabs.com</a></p>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Privacy;