import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, Mail, Sun, Moon } from 'lucide-react';
import { Logo } from './Logo';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [ecosystemOpen, setEcosystemOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('qala-theme') === 'dark';
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('qala-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('qala-theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const totalScrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScrollableHeight > 0) {
        const progress = (window.scrollY / totalScrollableHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      } else {
        setScrollProgress(0);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
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
        <Link to="/" className="flex items-center gap-3 group">
          <Logo size={36} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          <Link
            to="/"
            className="text-white hover:text-[#3FE0E0] px-4 py-2 text-sm font-medium transition-colors"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-white hover:text-[#3FE0E0] px-4 py-2 text-sm font-medium transition-colors"
          >
            About
          </Link>
          <Link
            to="/products"
            className="text-white hover:text-[#3FE0E0] px-4 py-2 text-sm font-medium transition-colors"
          >
            Products
          </Link>
          <Link
            to="/tools"
            className="text-white hover:text-[#3FE0E0] px-4 py-2 text-sm font-medium transition-colors"
          >
            Tools
          </Link>

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
                  <Link to="/services/ai-automation" className="font-bold text-white text-xl mb-3 hover:text-[#3FE0E0] block">AI & Automation</Link>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link to="/services/ai-automation" className="text-white/70 hover:text-[#3FE0E0] transition-colors block">
                        AI Ad Creative Generation
                      </Link>
                    </li>
                    <li>
                      <Link to="/services/ai-voice-agents" className="text-white/70 hover:text-[#3FE0E0] transition-colors block">
                        Lead Qualification Voice Agents
                      </Link>
                    </li>
                    <li>
                      <Link to="/services/ai-automation" className="text-white/70 hover:text-[#3FE0E0] transition-colors block">
                        Autonomous Operations Swarms
                      </Link>
                    </li>
                    <li>
                      <Link to="/services/ai-automation" className="text-white/70 hover:text-[#3FE0E0] transition-colors block">
                        AI Conversion Optimization
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Creative & Brand Design */}
                <div className="bg-[#121324] border border-white/10 p-5 rounded-[22px] hover:border-[#3FE0E0]/50 transition-colors">
                  <div className="w-14 h-14 rounded-2xl bg-[#06070D] border border-white/10 flex items-center justify-center mb-4 text-[#3FE0E0]">
                    <img src="/assets/design.png" alt="Design" className="w-8 h-8 object-contain" />
                  </div>
                  <Link to="/services/branding" className="font-bold text-white text-xl mb-3 hover:text-[#3FE0E0] block">Brand & Craft</Link>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link to="/services/branding" className="text-white/70 hover:text-[#3FE0E0] transition-colors block">
                        Marketplace Brand Systems
                      </Link>
                    </li>
                    <li>
                      <Link to="/services/branding" className="text-white/70 hover:text-[#3FE0E0] transition-colors block">
                        Apparel & Merchandise Systems
                      </Link>
                    </li>
                    <li>
                      <Link to="/services/branding" className="text-white/70 hover:text-[#3FE0E0] transition-colors block">
                        Performance Apparel & E-Commerce
                      </Link>
                    </li>
                    <li>
                      <Link to="/services/branding" className="text-white/70 hover:text-[#3FE0E0] transition-colors block">
                        UI/UX & Design Systems
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Full-Stack Engineering */}
                <div className="bg-[#121324] border border-white/10 p-5 rounded-[22px] hover:border-[#3FE0E0]/50 transition-colors">
                  <div className="w-14 h-14 rounded-2xl bg-[#06070D] border border-white/10 flex items-center justify-center mb-4 text-[#3FE0E0]">
                    <img src="/assets/development.png" alt="Development" className="w-8 h-8 object-contain" />
                  </div>
                  <Link to="/services/web-development" className="font-bold text-white text-xl mb-3 hover:text-[#3FE0E0] block">Engineering</Link>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link to="/services/web-development" className="text-white/70 hover:text-[#3FE0E0] transition-colors block">
                        Multi-Vendor Marketplace Engines
                      </Link>
                    </li>
                    <li>
                      <Link to="/services/web-development" className="text-white/70 hover:text-[#3FE0E0] transition-colors block">
                        High-Scale Next.js & React Apps
                      </Link>
                    </li>
                    <li>
                      <Link to="/services/web-development" className="text-white/70 hover:text-[#3FE0E0] transition-colors block">
                        Proptech & Custom CRM Portals
                      </Link>
                    </li>
                    <li>
                      <Link to="/services/web-development" className="text-white/70 hover:text-[#3FE0E0] transition-colors block">
                        Bespoke API & Architecture Design
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Performance Growth */}
                <div className="bg-[#121324] border border-white/10 p-5 rounded-[22px] hover:border-[#3FE0E0]/50 transition-colors">
                  <div className="w-14 h-14 rounded-2xl bg-[#06070D] border border-white/10 flex items-center justify-center mb-4 text-[#3FE0E0]">
                    <img src="/assets/marketing.png" alt="Marketing" className="w-8 h-8 object-contain" />
                  </div>
                  <Link to="/services/digital-marketing" className="font-bold text-white text-xl mb-3 hover:text-[#3FE0E0] block">Growth & Scale</Link>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link to="/services/digital-marketing" className="text-white/70 hover:text-[#3FE0E0] transition-colors block">
                        High-Ticket Meta Funnels
                      </Link>
                    </li>
                    <li>
                      <Link to="/services/digital-marketing" className="text-white/70 hover:text-[#3FE0E0] transition-colors block">
                        B2B Market Validation & Lead Gen
                      </Link>
                    </li>
                    <li>
                      <Link to="/services/digital-marketing" className="text-white/70 hover:text-[#3FE0E0] transition-colors block">
                        Marketplace & Amazon Ads
                      </Link>
                    </li>
                    <li>
                      <Link to="/services/digital-marketing" className="text-white/70 hover:text-[#3FE0E0] transition-colors block">
                        Viral UGC & Fandom Systems
                      </Link>
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

          <Link
            to="/work"
            className="text-white hover:text-[#3FE0E0] px-3 xl:px-4 py-2 text-sm font-medium transition-colors"
          >
            Our Work
          </Link>

          {/* Ecosystem Dropdown */}
          <div
            className="relative group"
            onMouseEnter={() => setEcosystemOpen(true)}
            onMouseLeave={() => setEcosystemOpen(false)}
          >
            <button className="flex items-center gap-1 text-white hover:text-[#3FE0E0] px-3 xl:px-4 py-2 text-sm font-medium transition-colors">
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
                  <Link to="/creator-collective" className="block px-4 py-2 rounded-xl text-sm text-white/80 hover:text-black hover:bg-[#3FE0E0] transition-colors font-medium">
                    Creator Collective
                  </Link>
                </li>
                <li>
                  <Link to="/agency-collective" className="block px-4 py-2 rounded-xl text-sm text-white/80 hover:text-black hover:bg-[#3FE0E0] transition-colors font-medium">
                    Agency Collective
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="block px-4 py-2 rounded-xl text-sm text-white/80 hover:text-black hover:bg-[#3FE0E0] transition-colors font-medium">
                    Careers & Open Roles
                  </Link>
                </li>
                <li>
                  <Link to="/portfolio" className="block px-4 py-2 rounded-xl text-sm text-white/80 hover:text-black hover:bg-[#3FE0E0] transition-colors font-medium">
                    Interactive Portfolio
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="block px-4 py-2 rounded-xl text-sm text-white/80 hover:text-black hover:bg-[#3FE0E0] transition-colors font-medium">
                    Growth Playbooks & Blog
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <Link
            to="/blog"
            className="text-white hover:text-[#3FE0E0] px-3 xl:px-4 py-2 text-sm font-medium transition-colors"
          >
            Blog
          </Link>
          <Link
            to="/contact-us"
            className="text-white hover:text-[#3FE0E0] px-3 xl:px-4 py-2 text-sm font-medium transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* Right CTA Button & Theme Toggle */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-full border border-slate-300/80 dark:border-white/10 bg-white/80 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-white transition-all duration-200 shadow-sm"
            aria-label="Toggle theme"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>

          <Link
            to="/contact-us"
            className="group relative bg-gradient-to-r from-[#4F46E5] to-[#3FE0E0] text-white py-2.5 px-6 rounded-full font-semibold text-sm transition-all duration-300 flex items-center gap-3 overflow-hidden shadow-lg hover:shadow-[0_0_25px_rgba(63,224,224,0.4)] hover:brightness-110"
          >
            <span className="w-5 h-5 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center font-bold text-xs transition-transform duration-500 transform group-hover:translate-x-14">
              Q
            </span>
            <span className="transition-transform duration-500 transform group-hover:-translate-x-4">
              Let's Build
            </span>
          </Link>
        </div>

        {/* Mobile Header Controls */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-full border border-slate-300/80 dark:border-white/10 bg-white/80 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-white transition-all duration-200 shadow-sm"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>
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
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white hover:text-[#3FE0E0] text-lg font-medium py-2 border-b border-white/5"
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white hover:text-[#3FE0E0] text-lg font-medium py-2 border-b border-white/5"
            >
              About
            </Link>
            <Link
              to="/tools"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white hover:text-[#3FE0E0] text-lg font-medium py-2 border-b border-white/5"
            >
              Growth Tools
            </Link>
            <Link
              to="/services"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white hover:text-[#3FE0E0] text-lg font-medium py-2 border-b border-white/5"
            >
              Capabilities & AI
            </Link>
            <Link
              to="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white hover:text-[#3FE0E0] text-lg font-medium py-2 border-b border-white/5"
            >
              Products
            </Link>
            <Link
              to="/work"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white hover:text-[#3FE0E0] text-lg font-medium py-2 border-b border-white/5"
            >
              Our Work
            </Link>
            <Link
              to="/creator-collective"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white hover:text-[#3FE0E0] text-lg font-medium py-2 border-b border-white/5"
            >
              Creator Collective
            </Link>
            <Link
              to="/agency-collective"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white hover:text-[#3FE0E0] text-lg font-medium py-2 border-b border-white/5"
            >
              Agency Collective
            </Link>
            <Link
              to="/careers"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white hover:text-[#3FE0E0] text-lg font-medium py-2 border-b border-white/5"
            >
              Careers
            </Link>
            <Link
              to="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white hover:text-[#3FE0E0] text-lg font-medium py-2 border-b border-white/5"
            >
              Blog & Playbooks
            </Link>
            <Link
              to="/contact-us"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white hover:text-[#3FE0E0] text-lg font-medium py-2 border-b border-white/5"
            >
              Contact Us
            </Link>

            <div className="pt-4">
              <Link
                to="/contact-us"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full bg-gradient-to-r from-[#4F46E5] to-[#3FE0E0] text-white py-3 rounded-full font-bold text-center block text-sm shadow-lg hover:brightness-110"
              >
                Let's Build
              </Link>
            </div>
          </nav>
        </div>
      )}

      {/* Sleek 2px Scroll Progress Indicator */}
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#4F46E5] to-[#3FE0E0] transition-[width] duration-150 ease-out z-50 pointer-events-none"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-label="Scroll progress"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </header>
  );
};
