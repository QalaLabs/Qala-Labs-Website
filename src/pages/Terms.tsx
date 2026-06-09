import * as React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';

const Terms = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEO title="Terms of Service | Qala Labs" />
      <Navbar />
      <div className="pt-32 pb-20 px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl font-black text-slate-900 mb-4">Terms of Service</h1>
        <p className="text-lg text-black mb-8">Last updated: June 10, 2026</p>

        <div className="prose prose-slate max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-black">By accessing, browsing, and using the Qala Labs website (including all subdomains and pages, collectively "the Website") and any services provided thereon ("Services"), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service ("Agreement"). If you do not agree to all terms and conditions of this Agreement, you must not use the Website or Services.</p>
            <p className="mt-4">These Terms of Service are subject to change at any time without notice. Your continued use of the Website after such modifications constitutes your acceptance of the modified terms. We recommend reviewing these terms regularly.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Use License and Restrictions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">2.1 Grant of License</h3>
                <p className="text-black">Qala Labs grants you a limited, non-exclusive, non-transferable, revocable license to access and use the Website and its content for lawful, personal, non-commercial purposes only. This license does not include:</p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Copying or modifying content without permission</li>
                  <li>Selling, reselling, or commercial use of any materials</li>
                  <li>Attempting to gain unauthorized access to restricted areas</li>
                  <li>Scraping, crawling, or automated data collection without permission</li>
                  <li>Reverse engineering or decompiling any code or technology</li>
                  <li>Using the Website to develop competing products or services</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">2.2 Prohibited Uses</h3>
                <p className="text-black">You agree not to use the Website or Services for:</p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Illegal activities or violating any applicable laws or regulations</li>
                  <li>Harassing, threatening, or abusing other users</li>
                  <li>Posting obscene, defamatory, or offensive content</li>
                  <li>Transmitting malware, viruses, or harmful code</li>
                  <li>Phishing, spam, or unsolicited communications</li>
                  <li>Impersonating another person or entity</li>
                  <li>Interfering with or disrupting the Website's operation</li>
                  <li>Circumventing security measures or access controls</li>
                  <li>Violating intellectual property rights</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Intellectual Property Rights</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">3.1 Ownership</h3>
                <p className="text-black">All content on the Website, including text, graphics, logos, images, audio, video, and software ("Content"), is the property of Qala Labs or its content suppliers and is protected by international copyright and trademark laws. The Qala Labs name and logo are registered trademarks.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">3.2 Permitted Use</h3>
                <p className="text-black">You may view and print individual pages of the Website for personal use only. All other reproduction, distribution, modification, or publication of Content is strictly prohibited without prior written consent from Qala Labs.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">3.3 User-Generated Content</h3>
                <p className="text-black">If you submit or post content on the Website (including comments, feedback, or materials), you grant Qala Labs a worldwide, royalty-free, perpetual license to use, reproduce, modify, distribute, and display such content. You represent and warrant that you own or have the necessary rights to any content you submit.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Account Registration and Security</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">4.1 Account Creation</h3>
                <p className="text-black">If you create an account on our Website, you agree to provide accurate, complete, and current information. You are responsible for maintaining the confidentiality of your password and account credentials.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">4.2 Account Responsibility</h3>
                <p className="text-black">You are fully responsible for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account or any other breach of security.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">4.3 Account Termination</h3>
                <p className="text-black">Qala Labs reserves the right to suspend or terminate your account at any time, without notice, if we determine that you have violated these Terms or engaged in prohibited conduct.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Services and Products</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">5.1 Service Description</h3>
                <p className="text-black">Qala Labs provides digital marketing audits, consulting services, and related tools and products. Service descriptions and features are provided on the Website as guides and are subject to change without notice.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">5.2 No Guarantees</h3>
                <p className="text-black">While we strive to provide accurate and helpful services, Qala Labs does not guarantee specific results, increased revenue, conversion rates, or business outcomes. Results depend on numerous factors beyond our control, including your implementation of recommendations, market conditions, and business operations.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">5.3 Availability</h3>
                <p className="text-black">Qala Labs reserves the right to modify, suspend, or discontinue any service or feature at any time, with or without notice. We are not liable for any losses resulting from service interruptions or discontinuations.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Pricing and Payment Terms</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">6.1 Pricing</h3>
                <p className="text-black">All prices are in USD and subject to change without notice. Current pricing is displayed on the Website at the time of purchase. Price changes apply to future transactions only.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">6.2 Payment</h3>
                <p className="text-black">Payment must be received before services are rendered. We accept major credit cards and other payment methods as indicated on our Website. Payment processing is handled by third-party payment processors. By providing payment information, you authorize us to charge the specified amount.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">6.3 Refund Policy</h3>
                <p>Refund eligibility and conditions are specified in our <a href="/refund-policy" className="text-blue-600 hover:underline">Refund Policy</a>. Generally, requests must be made within 30 days of purchase for non-delivered services. Custom or personalized work may not be refundable.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">6.4 Recurring Billing</h3>
                <p className="text-black">If you purchase a subscription or recurring service, your payment method will be charged automatically on the billing cycle. You can cancel at any time through your account settings or by contacting us.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Limitation of Liability</h2>
            <div className="space-y-4">
              <p className="font-semibold text-slate-800">TO THE MAXIMUM EXTENT PERMITTED BY LAW:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>QALA LABS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR BUSINESS INTERRUPTION, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</li>
                <li>THE TOTAL LIABILITY OF QALA LABS FOR ANY CLAIM SHALL NOT EXCEED THE AMOUNT YOU PAID (IF ANY) FOR THE SERVICES THAT GAVE RISE TO THE CLAIM.</li>
                <li>SOME JURISDICTIONS DO NOT ALLOW LIMITATION OF LIABILITY, SO THESE LIMITS MAY NOT APPLY TO YOU.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Disclaimer of Warranties</h2>
            <div className="space-y-4">
              <p className="font-semibold text-slate-800">THE WEBSITE AND SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE".</p>
              <p className="text-black">QALA LABS DISCLAIMS ALL REPRESENTATIONS AND WARRANTIES, EXPRESS OR IMPLIED, INCLUDING:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE</li>
                <li>NON-INFRINGEMENT OF THIRD-PARTY RIGHTS</li>
                <li>ACCURACY, COMPLETENESS, OR RELIABILITY OF CONTENT</li>
                <li>UNINTERRUPTED OR ERROR-FREE OPERATION</li>
                <li>ABSENCE OF VIRUSES OR HARMFUL CODE</li>
              </ul>
              <p className="mt-4">We make no warranty regarding the quality, accuracy, or completeness of any information, services, or recommendations provided.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Indemnification</h2>
            <p className="text-black">You agree to indemnify, defend, and hold harmless Qala Labs, its officers, directors, employees, agents, and affiliates from any claims, damages, losses, liabilities, and expenses (including attorney's fees) arising from:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Your use of the Website or Services</li>
              <li>Violation of these Terms of Service</li>
              <li>Violation of any applicable law or regulation</li>
              <li>Infringement of third-party intellectual property rights</li>
              <li>Your user-generated content or submissions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Third-Party Links and Content</h2>
            <p className="text-black">The Website may contain links to third-party websites and resources. Qala Labs is not responsible for the content, accuracy, or practices of external websites. We recommend reviewing the terms and privacy policies of any third-party site before engaging with them.</p>
            <p className="mt-4">Third-party links are provided for convenience only and do not imply endorsement or association.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">11. Professional Advice Disclaimer</h2>
            <p className="text-black">The information, recommendations, and services provided by Qala Labs are for educational and informational purposes only. They do not constitute professional legal, financial, tax, or accounting advice. Before making business decisions based on our recommendations, consult with appropriate professionals, such as attorneys, accountants, or business consultants.</p>
            <p className="mt-4">You are solely responsible for evaluating the appropriateness of any recommendations for your specific situation.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">12. Confidentiality</h2>
            <p className="text-black">If you disclose confidential business information to Qala Labs, we will protect it according to applicable laws. However, we are not liable for unauthorized disclosure resulting from circumstances beyond our control. Information already in the public domain or required to be disclosed by law is not considered confidential.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">13. Cookies and Tracking</h2>
            <p>Our Website uses cookies and tracking technologies, including Meta Pixel, for analytics, personalization, and marketing purposes. By using our Website, you consent to our use of cookies as described in our <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>. You can manage cookie preferences through your browser settings.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">14. Governing Law and Jurisdiction</h2>
            <p className="text-black">These Terms of Service are governed by and construed in accordance with the laws of [Your State/Country], without regard to its conflict of law principles. Any legal action or proceeding related to these Terms shall be subject to the exclusive jurisdiction of the courts located in [Your Jurisdiction].</p>
            <p className="mt-4">If any provision of these Terms is found to be invalid or unenforceable, that provision shall be modified to the minimum extent necessary to make it valid, or if such modification is not possible, the provision shall be severed.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">15. Dispute Resolution</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">15.1 Informal Resolution</h3>
                <p className="text-black">Before initiating formal proceedings, we encourage you to contact us at support@qalalabs.com to attempt to resolve any dispute informally.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">15.2 Arbitration</h3>
                <p className="text-black">Any dispute arising out of or relating to these Terms shall be resolved by binding arbitration under [Applicable Arbitration Rules]. The arbitration shall be conducted in [Your Location]. Each party shall bear its own costs.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">16. Termination</h2>
            <p className="text-black">Qala Labs may terminate or suspend your access to the Website and Services at any time, with or without cause, for any reason or for no reason, without notice or liability. Upon termination:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Your right to use the Website and Services immediately ceases</li>
              <li>You remain liable for all amounts due</li>
              <li>We may delete your account and associated data</li>
            </ul>
            <p className="mt-4">You may terminate this Agreement by ceasing use of the Website and deleting your account if applicable.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">17. Changes to Terms</h2>
            <p className="text-black">Qala Labs may modify these Terms of Service at any time by posting updated terms on the Website. Your continued use following such modifications constitutes acceptance. We recommend reviewing these Terms regularly.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">18. Entire Agreement</h2>
            <p>These Terms of Service, together with our <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a> and any other agreements you may have with us, constitute the entire agreement between you and Qala Labs regarding your use of the Website and Services. They supersede all prior or contemporaneous agreements, understandings, or communications.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">19. Contact Information</h2>
            <p className="text-black">For questions or concerns regarding these Terms of Service, please contact us:</p>
            <div className="bg-slate-50 p-6 rounded-lg mt-4 space-y-2">
              <p><strong>Email:</strong> <a href="mailto:legal@qalalabs.com" className="text-blue-600 hover:underline">legal@qalalabs.com</a></p>
              <p><strong>Website:</strong> <a href="https://qalalabs.com" className="text-blue-600 hover:underline">https://qalalabs.com</a></p>
              <p><strong>Support:</strong> <a href="mailto:support@qalalabs.com" className="text-blue-600 hover:underline">support@qalalabs.com</a></p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">20. Acknowledgment</h2>
            <p className="text-black">BY USING THE WEBSITE AND SERVICES, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY THESE TERMS OF SERVICE. IF YOU DO NOT AGREE, DO NOT USE THE WEBSITE OR SERVICES.</p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Terms;
