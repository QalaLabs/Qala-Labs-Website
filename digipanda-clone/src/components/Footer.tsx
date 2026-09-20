import React, { useState, useEffect } from 'react';

const offices = [
  { country: 'India (Delhi NCR)', flag: '/assets/india-flag.png', timezone: 'Asia/Kolkata' },
  { country: 'United Kingdom (London)', flag: '/assets/aus-flag.png', timezone: 'Europe/London' },
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
    <footer className="bg-[#06070D] text-white border-t border-white/10">
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
              <li><a href="#who-we-are" className="hover:text-[#3FE0E0] transition-colors">Philosophy & Team</a></li>
              <li><a href="#case-studies" className="hover:text-[#3FE0E0] transition-colors">Case Studies</a></li>
              <li><a href="#services" className="hover:text-[#3FE0E0] transition-colors">Core Capabilities</a></li>
            </ul>

            <h4 className="font-bold text-white mt-6 mb-4 uppercase tracking-wider text-xs">INSIGHTS</h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li><a href="#blog" className="hover:text-[#3FE0E0] transition-colors">D2C BNPL Strategy Guide</a></li>
              <li><a href="#case-studies" className="hover:text-[#3FE0E0] transition-colors">28x ROAS Funnel Blueprint</a></li>
              <li><a href="#case-studies" className="hover:text-[#3FE0E0] transition-colors">B2B Market Validation Playbook</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-xs">CAPABILITIES</h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li><a href="#services" className="hover:text-[#3FE0E0] transition-colors">Audience Engineering</a></li>
              <li><a href="#services" className="hover:text-[#3FE0E0] transition-colors">AI Creative Systems</a></li>
              <li><a href="#services" className="hover:text-[#3FE0E0] transition-colors">Full-Stack Engineering</a></li>
              <li><a href="#services" className="hover:text-[#3FE0E0] transition-colors">Brand & Merchandise</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-xs">CASE STUDIES</h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li><a href="#case-studies" className="hover:text-[#3FE0E0] transition-colors">Nutrivend UK (B2B)</a></li>
              <li><a href="#case-studies" className="hover:text-[#3FE0E0] transition-colors">Trotr Travel (28x ROAS)</a></li>
              <li><a href="#case-studies" className="hover:text-[#3FE0E0] transition-colors">WWF India (AI Creative)</a></li>
              <li><a href="#case-studies" className="hover:text-[#3FE0E0] transition-colors">playR (IPL Merchandising)</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-xs">CONNECT</h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li><a href="#contact-form" className="hover:text-[#3FE0E0] transition-colors">Start a Project</a></li>
              <li><a href="mailto:hello@qalalabs.com" className="hover:text-[#3FE0E0] transition-colors">hello@qalalabs.com</a></li>
              <li><a href="#contact-form" className="hover:text-[#3FE0E0] transition-colors">Schedule Call</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-xs">FOLLOW US</h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li><a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-[#3FE0E0] transition-colors">LinkedIn</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#3FE0E0] transition-colors">Instagram</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-[#3FE0E0] transition-colors">X (Twitter)</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-xs">ECOSYSTEM</h4>
            <div className="space-y-4">
              <a href="#" className="block opacity-80 hover:opacity-100 transition-opacity">
                <img src="/assets/partner1.svg" alt="Shopify Partner" className="h-7 w-auto object-contain" />
              </a>
              <a href="#" className="block opacity-80 hover:opacity-100 transition-opacity">
                <img src="/assets/partner2.svg" alt="Meta Partner" className="h-6 w-auto object-contain" />
              </a>
              <a href="#" className="block opacity-80 hover:opacity-100 transition-opacity">
                <img src="/assets/partner3.svg" alt="Google Partner" className="h-7 w-auto object-contain" />
              </a>
            </div>
          </div>

        </div>

      </div>

      <div className="bg-[#040509] border-t border-white/10 py-4 text-center text-xs text-white/50">
        <p>Copyright © 2026 Qala Labs. Art Meets Engineering. All Rights Reserved.</p>
      </div>
    </footer>
  );
};
