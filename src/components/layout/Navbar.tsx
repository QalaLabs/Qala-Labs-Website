"use client";

import * as React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, ArrowRight, ChevronRight, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Logo from './Logo';
import { useUser } from '@/hooks/useUser';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Industries', href: '/industries' },
    { name: 'Results', href: '/results' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  const solutionsLinks = [
    { name: 'AI Search Visibility', href: '/ai-search-visibility', desc: 'SEO + AEO + GEO' },
    { name: 'Enterprise AI Automation', href: '/enterprise-ai-automation', desc: 'AI agents & workflows' },
    { name: 'Free AI Audit', href: '/ai-audit', desc: '48-hr personalised report' },
    { name: 'Growth Tools', href: '/tools', desc: 'ROI, LTV & scale calculators' },
  ];

  const collaborateLinks = [
    { name: 'Agency Network', href: '/agency-network' },
    { name: 'Creator Collective', href: '/creator-collective' },
    { name: 'Careers', href: '/career' },
  ];

  React.useEffect(() => {
    setIsOpen(false);
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
            ? "bg-[#06070D]/95 border-white/5 shadow-lg shadow-black/30"
            : "bg-transparent border-transparent"
        )}
        initial={false}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <Link to="/" className="relative z-[1020] flex items-center">
              <Logo iconOnly size={36} />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-5">
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

              <DropdownMenu>
                <DropdownMenuTrigger className="text-sm font-bold text-slate-400 hover:text-white flex items-center gap-1 outline-none">
                  Solutions <ChevronDown className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="rounded-2xl p-2 border-white/5 shadow-2xl bg-[#0A0B12] w-56">
                  {solutionsLinks.map((link) => (
                    <DropdownMenuItem key={link.name} asChild>
                      <Link
                        to={link.href}
                        className="flex flex-col gap-0.5 px-4 py-3 rounded-xl text-sm cursor-pointer hover:bg-white/5 group"
                      >
                        <span className="font-bold text-slate-300 group-hover:text-white">{link.name}</span>
                        <span className="text-xs text-slate-600 group-hover:text-slate-400">{link.desc}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger className="text-sm font-bold text-slate-400 hover:text-white flex items-center gap-1 outline-none">
                  Collaborate <ChevronDown className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="rounded-2xl p-2 border-white/5 shadow-2xl bg-[#0A0B12]">
                  {collaborateLinks.map((link) => (
                    <DropdownMenuItem key={link.name} asChild>
                      <Link
                        to={link.href}
                        className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer"
                      >
                        {link.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

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
                    onClick={() => navigate('/ai-audit')}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-black px-6 rounded-xl shadow-lg shadow-blue-500/20"
                  >
                    Free Audit
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
                  {[...navLinks, ...solutionsLinks.map(l => ({ name: l.name, href: l.href })), ...collaborateLinks].map((link, i) => (
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

                <div className="mt-auto pt-10 space-y-6">
                  <Button
                    onClick={() => navigate(user ? '/admin' : '/ai-audit')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-8 rounded-2xl text-xl shadow-2xl shadow-blue-500/20"
                  >
                    {user ? 'Go to Dashboard' : 'Get Free Audit'} <ArrowRight className="ml-2 w-6 h-6" />
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
