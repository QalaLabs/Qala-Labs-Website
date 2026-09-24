"use client";

import * as React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, ArrowRight, ChevronRight, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Logo from './Logo';
import { useUser } from '@/hooks/useUser';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [megaOpen, setMegaOpen] = React.useState(false);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout>>();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { name: 'Results', href: '/results' },
    { name: 'Process', href: '/#process' },
    { name: 'Proof', href: '/#proof' },
  ];

  // Mega menu, grouped as a classic agency journey — mirrors digiPanda's Discovery → Design → Development → Marketing
  const megaMenu = [
    {
      title: 'Discovery',
      tagline: 'Audit & planning',
      links: [
        { name: 'Strategy & Planning', href: '/services/strategy-planning' },
        { name: 'IT Consulting', href: '/services/it-consulting' },
        { name: 'Brand Audit', href: '/services/brand-audit' },
        { name: 'Digital Presence Review', href: '/services/digital-presence-review' },
        { name: 'Technical Assessment', href: '/services/technical-assessment' },
        { name: 'Analytics & Data', href: '/services/data' },
        { name: 'Free AI Audit', href: '/ai-audit' },
      ],
    },
    {
      title: 'Design',
      tagline: 'Brand & interface',
      links: [
        { name: 'Branding', href: '/services/branding' },
        { name: 'UI/UX Design', href: '/services/ui-ux-design' },
        { name: 'Web Design', href: '/services/web-design' },
        { name: 'Mobile App Design', href: '/services/mobile-app-design' },
        { name: 'Landing Page Design', href: '/services/landing-page-design' },
        { name: 'Production & Shoots', href: '/services/production-shoots' },
      ],
    },
    {
      title: 'Development',
      tagline: 'Build & automate',
      links: [
        { name: 'Web Development', href: '/services/web-dev' },
        { name: 'Mobile App Development', href: '/services/mobile-app-development' },
        { name: 'Software Development', href: '/services/software-development' },
        { name: 'CMS Development', href: '/services/cms-development' },
        { name: 'Blockchain Development', href: '/services/blockchain-development' },
        { name: 'Blockchain Integration', href: '/services/blockchain-integration' },
        { name: 'Enterprise AI Automation', href: '/enterprise-ai-automation' },
        { name: 'Q Manager', href: '/q-manager', desc: 'Client dashboard' },
      ],
    },
    {
      title: 'Marketing',
      tagline: 'Growth & scale',
      links: [
        { name: 'AI Search Visibility', href: '/ai-search-visibility', desc: 'SEO + AEO + GEO' },
        { name: 'Performance Marketing', href: '/services/performance' },
        { name: 'Social Media Management', href: '/services/social-media' },
        { name: 'CRO + Retention', href: '/services/cro' },
        { name: 'Influencer Marketing', href: '/services/influencer-marketing' },
        { name: 'Email Marketing', href: '/services/email-marketing' },
        { name: 'Email Automation', href: '/services/email-automation' },
        { name: 'MEME Marketing', href: '/services/meme-marketing' },
      ],
    },
  ];

  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const scheduleCloseMega = () => {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 150);
  };

  React.useEffect(() => {
    setIsOpen(false);
    setMegaOpen(false);
  }, [location.pathname]);

  React.useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isOpen]);

  return (
    <>
      {/* Skip-to-content link for keyboard/screen-reader users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:font-bold focus:text-sm"
      >
        Skip to content
      </a>

      <motion.nav
        className={cn(
          "fixed top-0 left-0 right-0 z-[1000] backdrop-blur-xl border-b transition-colors duration-300",
          scrolled
            ? "bg-background/95 border-border shadow-lg shadow-black/30"
            : "bg-transparent border-transparent"
        )}
        initial={false}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <Link to="/" className="relative z-[1020] flex items-center gap-3">
              <Logo iconOnly size={32} />
              <span className="hidden min-[600px]:flex flex-col leading-none">
                <span className="text-sm font-black tracking-tight text-white">Qala Labs</span>
                {/* TODO: swap to --indigo/--cyan tokens once Prompt 0 lands */}
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-blue-400/80">
                  Creative × Data × Impact
                </span>
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-5">
              <div
                className="relative"
                onMouseEnter={openMega}
                onMouseLeave={scheduleCloseMega}
              >
                <Link
                  to="/services"
                  className={cn(
                    "text-sm font-bold transition-colors flex items-center gap-1",
                    location.pathname === '/services' ? "text-blue-400" : "text-slate-400 hover:text-white"
                  )}
                  aria-expanded={megaOpen}
                >
                  Services
                  <ChevronDown className={cn("w-4 h-4 transition-transform", megaOpen && "rotate-180")} />
                </Link>
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    "text-sm font-bold transition-colors",
                    location.pathname === link.href ? "text-blue-400" : "text-slate-400 hover:text-white"
                  )}
                >
                  {link.name}
                </Link>
              ))}

              <div className="flex items-center gap-2 ml-2">
                {user ? (
                  <Button
                    onClick={() => navigate('/admin')}
                    variant="outline"
                    className="border-blue-600 text-blue-600 hover:bg-blue-900/20 font-black px-6 rounded-xl flex items-center gap-2"
                  >
                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                  </Button>
                ) : (
                  <Button
                    onClick={() => navigate('/contact')}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-black px-6 rounded-xl shadow-lg shadow-blue-500/20"
                  >
                    Book a growth audit
                  </Button>
                )}
              </div>
            </div>

            {/* Mobile Toggle — animated hamburger */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative z-[1020] flex flex-col justify-center items-center w-12 h-12 rounded-xl bg-white/10 text-white active:scale-95 transition-transform"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpen}
              >
                <motion.span
                  animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="block h-0.5 w-5 bg-current rounded-full"
                />
                <motion.span
                  animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                  className="block h-0.5 w-5 bg-current rounded-full mt-1.5"
                />
                <motion.span
                  animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="block h-0.5 w-5 bg-current rounded-full mt-1.5"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Services mega menu — full-width panel, Strategy / Creative / Tech / Growth */}
        <AnimatePresence>
          {megaOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              onMouseEnter={openMega}
              onMouseLeave={scheduleCloseMega}
              className="hidden lg:block absolute top-full left-0 right-0 border-t border-white/5 bg-[#0A0B12]/98 backdrop-blur-xl shadow-2xl shadow-black/40"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-4 gap-8">
                {megaMenu.map((col) => (
                  <div key={col.title} className="flex flex-col">
                    <p className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-500 mb-1">
                      {col.title}
                    </p>
                    <p className="text-xs text-slate-600 mb-4">{col.tagline}</p>
                    <ul className="space-y-3 flex-1">
                      {col.links.map((link) => (
                        <li key={link.name}>
                          <Link
                            to={link.href}
                            className="text-sm font-bold text-slate-300 hover:text-white transition-colors block"
                          >
                            {link.name}
                            {'desc' in link && link.desc && (
                              <span className="block text-xs font-medium text-slate-600 mt-0.5">{link.desc}</span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Button
                      onClick={() => navigate('/contact')}
                      variant="outline"
                      size="sm"
                      className="mt-6 border-blue-600/40 text-blue-400 hover:bg-blue-900/20 font-bold w-fit"
                    >
                      Book a Call
                    </Button>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                  <span className="text-xs text-slate-600">35+ services across discovery, design, development & marketing</span>
                  <Link
                    to="/services"
                    className="text-sm font-black text-blue-400 hover:text-blue-300 flex items-center gap-1"
                  >
                    View all services <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[1100] lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 bottom-0 w-[85%] bg-[#06070D] shadow-2xl flex flex-col border-l border-white/5"
            >
              <div className="flex-1 flex flex-col pt-24 px-8 pb-10 overflow-y-auto relative z-10">
                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-6">Navigation</p>
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <Link
                        to={link.href}
                        className={cn(
                          "flex items-center justify-between py-4 text-2xl font-black transition-all group border-b border-white/5",
                          location.pathname === link.href ? "text-blue-400" : "text-white"
                        )}
                      >
                        <span>{link.name}</span>
                        <ChevronRight className={cn(
                          "w-5 h-5 transition-transform group-hover:translate-x-2",
                          location.pathname === link.href ? "text-blue-400" : "text-slate-600"
                        )} />
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Services, grouped by Strategy / Creative / Tech / Growth — mirrors desktop mega menu */}
                <div className="space-y-8 mt-8">
                  {megaMenu.map((col, colIdx) => (
                    <div key={col.title}>
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-3">
                        {col.title}
                      </p>
                      <div className="space-y-0.5">
                        {col.links.map((link, i) => (
                          <motion.div
                            key={link.name}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: (colIdx * col.links.length + i) * 0.03 }}
                          >
                            <Link
                              to={link.href}
                              className={cn(
                                "flex items-center justify-between py-3 text-lg font-black transition-all group border-b border-white/5",
                                location.pathname === link.href ? "text-blue-400" : "text-white"
                              )}
                            >
                              <span>{link.name}</span>
                              <ChevronRight className={cn(
                                "w-4 h-4 transition-transform group-hover:translate-x-2",
                                location.pathname === link.href ? "text-blue-400" : "text-slate-600"
                              )} />
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                  <Link
                    to="/services"
                    className="flex items-center justify-between py-4 text-2xl font-black text-blue-400 border-b border-white/5"
                  >
                    <span>All Services</span>
                    <ChevronRight className="w-5 h-5 text-blue-400" />
                  </Link>
                </div>

                <div className="mt-auto pt-10 space-y-6">
                  <Button
                    onClick={() => navigate(user ? '/admin' : '/contact')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-8 rounded-2xl text-xl shadow-2xl shadow-blue-500/20"
                  >
                    {user ? 'Go to Dashboard' : 'Book a growth audit'} <ArrowRight className="ml-2 w-6 h-6" />
                  </Button>

                  <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 pb-4">
                    <a href="https://instagram.com/qalalabs" target="_blank" rel="noreferrer" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors">Instagram</a>
                    <a href="https://linkedin.com/company/qalalabs" target="_blank" rel="noreferrer" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors">LinkedIn</a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
