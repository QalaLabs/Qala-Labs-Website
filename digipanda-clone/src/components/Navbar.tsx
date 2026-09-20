import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Mail } from 'lucide-react';
import { Logo } from './Logo';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [ecosystemOpen, setEcosystemOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 right-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-4 bg-[#06070D]/85 backdrop-blur-md border-b border-white/10 shadow-2xl'
          : 'md:py-8 py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center">
        {/* Qala Labs Brand Logo */}
        <a href="/" className="flex items-center gap-3 group">
          <Logo size={36} />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          <a
            href="/"
            className="text-white hover:text-[#3FE0E0] px-4 py-2 text-sm font-medium transition-colors"
          >
            Home
          </a>
          <a
            href="#about-qala"
            className="text-white hover:text-[#3FE0E0] px-4 py-2 text-sm font-medium transition-colors"
          >
            About Qala
          </a>
          <a
            href="#team"
            className="text-white hover:text-[#3FE0E0] px-4 py-2 text-sm font-medium transition-colors"
          >
            Team
          </a>

          {/* Services Mega Menu */}
          <div
            className="relative group"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button className="flex items-center gap-1 text-white hover:text-[#3FE0E0] px-4 py-2 text-sm font-medium transition-colors">
              Capabilities
              <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
            </button>

            {/* Mega Menu Dropdown */}
            <div
              className={`fixed top-20 left-4 right-4 max-w-7xl mx-auto bg-[#0b0c16] border border-white/10 rounded-[28px] shadow-2xl p-6 lg:p-8 transition-all duration-300 ease-out z-50 ${
                servicesOpen
                  ? 'opacity-100 translate-y-0 pointer-events-auto visible'
                  : 'opacity-0 translate-y-3 pointer-events-none invisible'
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* AI & Automation */}
                <div className="bg-[#121324] border border-white/10 p-5 rounded-[22px] hover:border-[#3FE0E0]/50 transition-colors">
                  <div className="w-14 h-14 rounded-2xl bg-[#06070D] border border-white/10 flex items-center justify-center mb-4 text-[#3FE0E0]">
                    <img src="/assets/AI-Services-icon.svg" alt="AI Services" className="w-8 h-8 object-contain" />
                  </div>
                  <h4 className="font-bold text-white text-xl mb-3">AI & Automation</h4>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <a href="#services" className="text-white/70 hover:text-[#3FE0E0] transition-colors block">
                        AI Ad Creative Generation (WWF)
                      </a>
                    </li>
                    <li>
                      <a href="#services" className="text-white/70 hover:text-[#3FE0E0] transition-colors block">
                        Lead Qualification Voice Agents
                      </a>
                    </li>
                    <li>
                      <a href="#services" className="text-white/70 hover:text-[#3FE0E0] transition-colors block">
                        Autonomous Operations Swarms
                      </a>
                    </li>
                    <li>
                      <a href="#services" className="text-white/70 hover:text-[#3FE0E0] transition-colors block">
                        AI Conversion Optimization
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Creative & Brand Design */}
                <div className="bg-[#121324] border border-white/10 p-5 rounded-[22px] hover:border-[#3FE0E0]/50 transition-colors">
                  <div className="w-14 h-14 rounded-2xl bg-[#06070D] border border-white/10 flex items-center justify-center mb-4 text-[#3FE0E0]">
                    <img src="/assets/design.png" alt="Design" className="w-8 h-8 object-contain" />
                  </div>
                  <h4 className="font-bold text-white text-xl mb-3">Brand & Craft</h4>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <a href="#services" className="text-white/70 hover:text-[#3FE0E0] transition-colors block">
                        Marketplace Brand Systems (Gaffar)
                      </a>
                    </li>
                    <li>
                      <a href="#services" className="text-white/70 hover:text-[#3FE0E0] transition-colors block">
                        IPL Franchise Merchandise (playR)
                      </a>
                    </li>
                    <li>
                      <a href="#services" className="text-white/70 hover:text-[#3FE0E0] transition-colors block">
                        Performance Apparel & Merch (Mizuno)
                      </a>
                    </li>
                    <li>
                      <a href="#services" className="text-white/70 hover:text-[#3FE0E0] transition-colors block">
                        UI/UX & Design Systems
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Full-Stack Engineering */}
                <div className="bg-[#121324] border border-white/10 p-5 rounded-[22px] hover:border-[#3FE0E0]/50 transition-colors">
                  <div className="w-14 h-14 rounded-2xl bg-[#06070D] border border-white/10 flex items-center justify-center mb-4 text-[#3FE0E0]">
                    <img src="/assets/development.png" alt="Development" className="w-8 h-8 object-contain" />
                  </div>
                  <h4 className="font-bold text-white text-xl mb-3">Engineering</h4>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <a href="#services" className="text-white/70 hover:text-[#3FE0E0] transition-colors block">
                        Multi-Vendor Marketplace Engines
                      </a>
                    </li>
                    <li>
                      <a href="#services" className="text-white/70 hover:text-[#3FE0E0] transition-colors block">
                        High-Scale Next.js & React Apps
                      </a>
                    </li>
                    <li>
                      <a href="#services" className="text-white/70 hover:text-[#3FE0E0] transition-colors block">
                        Proptech & CRM Portals (Capital Keys)
                      </a>
                    </li>
                    <li>
                      <a href="#services" className="text-white/70 hover:text-[#3FE0E0] transition-colors block">
                        Bespoke API & Architecture Design
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Performance Growth */}
                <div className="bg-[#121324] border border-white/10 p-5 rounded-[22px] hover:border-[#3FE0E0]/50 transition-colors">
                  <div className="w-14 h-14 rounded-2xl bg-[#06070D] border border-white/10 flex items-center justify-center mb-4 text-[#3FE0E0]">
                    <img src="/assets/marketing.png" alt="Marketing" className="w-8 h-8 object-contain" />
                  </div>
                  <h4 className="font-bold text-white text-xl mb-3">Growth & Scale</h4>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <a href="#services" className="text-white/70 hover:text-[#3FE0E0] transition-colors block">
                        High-Ticket Meta Funnels (Trotr 28x)
                      </a>
                    </li>
                    <li>
                      <a href="#services" className="text-white/70 hover:text-[#3FE0E0] transition-colors block">
                        B2B Market Validation (Nutrivend UK)
                      </a>
                    </li>
                    <li>
                      <a href="#services" className="text-white/70 hover:text-[#3FE0E0] transition-colors block">
                        Amazon Ads Scaling (11.2x ROAS)
                      </a>
                    </li>
                    <li>
                      <a href="#services" className="text-white/70 hover:text-[#3FE0E0] transition-colors block">
                        Viral Fandom & UGC (CSK 125M+)
                      </a>
                    </li>
                  </ul>
                </div>

              </div>

              {/* Bottom Quick Contact Bar */}
              <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap justify-between items-center text-xs text-white/60">
                <div className="flex items-center gap-4">
                  <span className="font-semibold text-white">LOCATIONS:</span>
                  <span>London, UK</span>
                  <span>•</span>
                  <span>Delhi NCR, India</span>
                  <span>•</span>
                  <span>Dubai, UAE</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#3FE0E0]" />
                  <a href="mailto:hello@qalalabs.com" className="text-white hover:text-[#3FE0E0]">
                    hello@qalalabs.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Ecosystem Dropdown */}
          <div
            className="relative group"
            onMouseEnter={() => setEcosystemOpen(true)}
            onMouseLeave={() => setEcosystemOpen(false)}
          >
            <button className="flex items-center gap-1 text-white hover:text-[#3FE0E0] px-4 py-2 text-sm font-medium transition-colors">
              Ecosystem
              <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
            </button>
            <div
              className={`absolute top-full left-0 mt-2 w-72 bg-[#0b0c16] border border-white/10 rounded-2xl shadow-xl p-3 transition-all duration-200 z-50 ${
                ecosystemOpen
                  ? 'opacity-100 translate-y-0 pointer-events-auto visible'
                  : 'opacity-0 translate-y-2 pointer-events-none invisible'
              }`}
            >
              <ul className="space-y-1">
                <li>
                  <a href="#case-studies" className="block px-4 py-2.5 rounded-xl text-sm text-white/80 hover:text-black hover:bg-[#3FE0E0] transition-colors font-medium">
                    Case Studies & Proof
                  </a>
                </li>
                <li>
                  <a href="#services" className="block px-4 py-2.5 rounded-xl text-sm text-white/80 hover:text-black hover:bg-[#3FE0E0] transition-colors font-medium">
                    AI Creative Engine
                  </a>
                </li>
                <li>
                  <a href="#blog" className="block px-4 py-2.5 rounded-xl text-sm text-white/80 hover:text-black hover:bg-[#3FE0E0] transition-colors font-medium">
                    D2C Growth Playbooks
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <a
            href="#case-studies"
            className="text-white hover:text-[#3FE0E0] px-4 py-2 text-sm font-medium transition-colors"
          >
            Case Studies
          </a>
          <a
            href="#contact-form"
            className="text-white hover:text-[#3FE0E0] px-4 py-2 text-sm font-medium transition-colors"
          >
            Contact
          </a>
        </nav>

        {/* Right CTA Button ("Let's Build" with gradient + animated Qala badge) */}
        <div className="hidden md:flex items-center">
          <a
            href="#contact-form"
            className="group relative bg-gradient-to-r from-[#4F46E5] to-[#3FE0E0] text-white py-2.5 px-6 rounded-full font-semibold text-sm transition-all duration-300 flex items-center gap-3 overflow-hidden shadow-lg hover:shadow-[0_0_25px_rgba(63,224,224,0.4)] hover:brightness-110"
          >
            <span className="w-5 h-5 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center font-bold text-xs transition-transform duration-500 transform group-hover:translate-x-14">
              Q
            </span>
            <span className="transition-transform duration-500 transform group-hover:-translate-x-4">
              Let's Build
            </span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white hover:text-[#3FE0E0] transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[72px] bg-[#06070D]/95 backdrop-blur-xl border-b border-white/10 p-6 shadow-2xl max-h-[85vh] overflow-y-auto">
          <nav className="flex flex-col space-y-4">
            <a
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white hover:text-[#3FE0E0] text-lg font-medium py-2 border-b border-white/5"
            >
              Home
            </a>
            <a
              href="#about-qala"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white hover:text-[#3FE0E0] text-lg font-medium py-2 border-b border-white/5"
            >
              About Qala
            </a>
            <a
              href="#team"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white hover:text-[#3FE0E0] text-lg font-medium py-2 border-b border-white/5"
            >
              Core Team
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white hover:text-[#3FE0E0] text-lg font-medium py-2 border-b border-white/5"
            >
              Capabilities & AI
            </a>
            <a
              href="#case-studies"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white hover:text-[#3FE0E0] text-lg font-medium py-2 border-b border-white/5"
            >
              Case Studies
            </a>
            <a
              href="#contact-form"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white hover:text-[#3FE0E0] text-lg font-medium py-2 border-b border-white/5"
            >
              Contact Us
            </a>

            <div className="pt-4">
              <a
                href="#contact-form"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full bg-gradient-to-r from-[#4F46E5] to-[#3FE0E0] text-white py-3 rounded-full font-bold text-center block text-sm shadow-lg hover:brightness-110"
              >
                Let's Build
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
