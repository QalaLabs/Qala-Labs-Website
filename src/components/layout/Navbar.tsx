"use client";

import * as React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, LayoutDashboard, ArrowRight, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Logo from './Logo';
import { useUser } from '@/hooks/useUser';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();

  const navLinks = [
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'Tools', href: '/tools' },
    { name: 'Blog', href: '/blog' },
    { name: 'Pricing', href: '/pricing' },
  ];

  // Close menu on route change
  React.useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Prevent scroll when menu is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-xl border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="relative z-[120] flex items-center">
            <Logo className="h-8 md:h-10" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.href}
                className={cn(
                  "text-sm font-bold transition-colors",
                  location.pathname === link.href ? "text-blue-600" : "text-slate-600 hover:text-blue-600"
                )}
              >
                {link.name}
              </Link>
            ))}
            
            {user ? (
              <Button 
                onClick={() => navigate('/admin')}
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 font-black px-6 rounded-xl flex items-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </Button>
            ) : (
              <Button 
                onClick={() => navigate('/contact')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-black px-6 rounded-xl shadow-lg shadow-blue-500/20"
              >
                Free Audit
              </Button>
            )}
          </div>

          {/* Mobile Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="lg:hidden relative z-[120] p-3 text-slate-900 hover:bg-slate-100 rounded-xl transition-all active:scale-90"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[110] lg:hidden bg-white flex flex-col"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:20px_20px]" />
            </div>

            <div className="flex-1 flex flex-col pt-28 px-8 pb-10 overflow-y-auto relative z-10">
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-6">Navigation</p>
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                  >
                    <Link 
                      to={link.href}
                      className={cn(
                        "flex items-center justify-between py-4 text-3xl font-black transition-all group",
                        location.pathname === link.href ? "text-blue-600" : "text-slate-900"
                      )}
                    >
                      <span>{link.name}</span>
                      <ChevronRight className={cn(
                        "w-6 h-6 transition-transform group-hover:translate-x-2",
                        location.pathname === link.href ? "text-blue-600" : "text-slate-200"
                      )} />
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-auto pt-12 space-y-6">
                <div className="h-px bg-slate-100 w-full" />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button 
                    onClick={() => navigate(user ? '/admin' : '/contact')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-8 rounded-2xl text-xl shadow-2xl shadow-blue-500/20"
                  >
                    {user ? 'Go to Dashboard' : 'Book Free Audit'} <ArrowRight className="ml-2 w-6 h-6" />
                  </Button>
                </motion.div>
                
                <div className="flex justify-center gap-8">
                  <a href="https://instagram.com/qalalabs" target="_blank" rel="noreferrer" className="text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors">Instagram</a>
                  <a href="https://linkedin.com/company/qalalabs" target="_blank" rel="noreferrer" className="text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors">LinkedIn</a>
                  <a href="mailto:hello@qalalabs.com" className="text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors">Email</a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;