import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const offices = [
  { country: 'India (Delhi NCR)', flag: '/assets/india-flag.png', timezone: 'Asia/Kolkata' },
  { country: 'United Kingdom (London)', flag: '/assets/uk-flag.svg', timezone: 'Europe/London' },
  { country: 'UAE (Dubai)', flag: '/assets/uae-flag.png', timezone: 'Asia/Dubai' },
  { country: 'Netherlands (Amsterdam)', flag: '/assets/nl-flag.png', timezone: 'Europe/Amsterdam' },
];

export const Footer: React.FC = () => {
  const [times, setTimes] = useState<Record<string, string>>({});

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      const updated: Record<string, string> = {};
      offices.forEach((office) => {
        try {
          updated[office.country] = new Intl.DateTimeFormat('en-US', {
            timeZone: office.timezone,
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          }).format(now);
        } catch {
          updated[office.country] = '';
        }
      });
      setTimes(updated);
    };

    updateTimes();
    const timer = setInterval(updateTimes, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="bg-[#06070D]/90 backdrop-blur-md text-white border-t border-white/10">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Global Locations & Live Clocks Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-b border-white/10 py-6 gap-4">
          {offices.map((office, idx) => (
            <div
              key={idx}
              className={`flex items-center justify-center md:justify-start gap-3 py-2 ${
                idx < 3 ? 'md:border-r border-white/10' : ''
              }`}
            >
              <img
                src={office.flag}
                alt={office.country}
                className="w-6 h-6 rounded object-cover shadow-sm"
              />
              <div className="text-left">
                <span className="font-semibold text-xs md:text-sm text-white block truncate">
                  {office.country}:
                </span>
                <span className="text-xs text-[#3FE0E0] font-mono">
                  {times[office.country] || 'Live'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 py-16 text-sm">
          
          <div>
            <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-xs">ABOUT QALA</h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li><Link to="/about" className="hover:text-[#3FE0E0] transition-colors">About Qala Labs</Link></li>
              <li><Link to="/work" className="hover:text-[#3FE0E0] transition-colors font-medium text-white">Our Work</Link></li>
              <li><Link to="/portfolio" className="hover:text-[#3FE0E0] transition-colors">Selected Works</Link></li>
              <li><Link to="/case-studies" className="hover:text-[#3FE0E0] transition-colors">Case Studies & Proof</Link></li>
              <li><Link to="/tools" className="hover:text-[#3FE0E0] transition-colors">Growth Tools</Link></li>
              <li><Link to="/careers" className="hover:text-[#3FE0E0] transition-colors">Careers & Roles</Link></li>
            </ul>

            <h4 className="font-bold text-white mt-6 mb-4 uppercase tracking-wider text-xs">FIELD NOTES</h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li><Link to="/blog/d2c-bnpl-strategy-guide" className="hover:text-[#3FE0E0] transition-colors">D2C BNPL Strategy Guide</Link></li>
              <li><Link to="/blog/28x-roas-funnel-blueprint" className="hover:text-[#3FE0E0] transition-colors">28x ROAS Funnel Blueprint</Link></li>
              <li><Link to="/blog/b2b-market-validation-playbook" className="hover:text-[#3FE0E0] transition-colors">B2B Validation Playbook</Link></li>
              <li><Link to="/blog" className="text-[#3FE0E0] hover:underline transition-colors">All Field Notes &rarr;</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-xs">CAPABILITIES</h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li><Link to="/services/ai-automation" className="hover:text-[#3FE0E0] transition-colors">Autonomous AI Agents</Link></li>
              <li><Link to="/services/branding" className="hover:text-[#3FE0E0] transition-colors">Brand Systems & 3D</Link></li>
              <li><Link to="/services/web-development" className="hover:text-[#3FE0E0] transition-colors">Full-Stack Engineering</Link></li>
              <li><Link to="/services/digital-marketing" className="hover:text-[#3FE0E0] transition-colors">High-Ticket Growth</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-xs">CASE STUDIES</h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li><Link to="/case-studies/gaffar-india" className="hover:text-[#3FE0E0] transition-colors">Gaffar India (Marketplace)</Link></li>
              <li><Link to="/case-studies/nutrivend-uk" className="hover:text-[#3FE0E0] transition-colors">Nutrivend UK (B2B)</Link></li>
              <li><Link to="/case-studies/trotr-spain-pivot" className="hover:text-[#3FE0E0] transition-colors">Trotr Travel (28x ROAS)</Link></li>
              <li><Link to="/case-studies/chrono-seconds" className="hover:text-[#3FE0E0] transition-colors">Chrono Seconds (Luxury)</Link></li>
              <li><Link to="/case-studies/mizuno-india" className="hover:text-[#3FE0E0] transition-colors">Mizuno India (D2C Scale)</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-xs">CONNECT</h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li><Link to="/contact-us" className="hover:text-[#3FE0E0] transition-colors">Start a Project</Link></li>
              <li><a href="mailto:hello@qalalabs.com" className="hover:text-[#3FE0E0] transition-colors">hello@qalalabs.com</a></li>
              <li><Link to="/contact-us" className="hover:text-[#3FE0E0] transition-colors">Schedule Diagnostic</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-xs">FOLLOW US</h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li><a href="https://www.linkedin.com/company/qala-labs/" target="_blank" rel="noreferrer" className="hover:text-[#3FE0E0] transition-colors">LinkedIn</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#3FE0E0] transition-colors">Instagram</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-[#3FE0E0] transition-colors">X (Twitter)</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-xs">ECOSYSTEM</h4>
            <ul className="space-y-2.5 text-xs text-white/70 mb-5">
              <li><Link to="/tools" className="hover:text-[#3FE0E0] transition-colors">Free Growth Tools</Link></li>
              <li><Link to="/portfolio" className="hover:text-[#3FE0E0] transition-colors">Client Portfolio</Link></li>
              <li><Link to="/creator-collective" className="hover:text-[#3FE0E0] transition-colors">Creator Collective</Link></li>
              <li><Link to="/agency-collective" className="hover:text-[#3FE0E0] transition-colors">Agency Collective</Link></li>
            </ul>
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-1">
                Verified Partners
              </span>
              <div className="flex flex-col gap-1.5 text-xs font-mono text-white/70">
                <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[#3FE0E0]">TeleCMI (Voice & Telephony)</span>
                <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[#34D399]">Interakt (WhatsApp Business)</span>
                <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[#A78BFA]">Easebuzz (Payments)</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      <div className="bg-[#040509] border-t border-white/10 py-4 text-xs text-white/50">
        <div className="container mx-auto px-4 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <p>Copyright © 2026 Qala Labs. Art Meets Engineering. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
