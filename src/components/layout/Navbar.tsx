"use client";

import * as React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, LayoutDashboard, ArrowRight, ChevronRight, ChevronDown } from 'lucide-react';
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
  ];

  const collaborateLinks = [
    { name: 'Agency Network', href: '/agency-network' },
    { name: 'Creator Collective', href: '/creator-collective' },
    { name: 'Careers', href: '/career' },
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
    <>
      <nav className="fixed top-0 left-0 right-0 z-[1000] bg-white/95 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <Link to="/" className="relative z-[1020] flex items-center">
              <Logo className="h-8 md:h-10" />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-6">
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

              <DropdownMenu>
                <DropdownMenuTrigger className="text-sm font-bold text-slate-600 hover:text-blue-600 flex items-center gap-1 outline-none">
                  Collaborate <ChevronDown className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="rounded-2xl p-2 border-slate-100 shadow-2xl">
                  {collaborateLinks.map((link) => (
                    <DropdownMenuItem key={link.name} asChild>
                      <Link 
                        to={link.href}
                        className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-slate-600 hover:text-blue-600 hover:bg-blue-50 cursor-pointer"
                      >
                        {link.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              
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
              className="lg:hidden relative z-[1020] p-3 text-slate-900 hover:bg-slate-100 rounded-xl transition-all active:scale-90"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[1100] lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 bottom-0 w-[85%] bg-white shadow-2xl flex flex-col border-l border-slate-100"
            >
              <div className="flex-1 flex flex-col pt-24 px-8 pb-10 overflow-y-auto relative z-10">
                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-4">Navigation</p>
                  {[...navLinks, ...collaborateLinks].map((link, i) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link 
                        to={link.href}
                        className={cn(
                          "flex items-center justify-between py-3 text-xl font-black transition-all group",
                          location.pathname === link.href ? "text-blue-600" : "text-slate-900"
                        )}
                      >
                        <span>{link.name}</span>
                        <ChevronRight className={cn(
                          "w-5 h-5 transition-transform group-hover:translate-x-2",
                          location.pathname === link.href ? "text-blue-600" : "text-slate-200"
                        )} />
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-auto pt-10 space-y-6">
                  <Button 
                    onClick={() => navigate(user ? '/admin' : '/contact')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-7 rounded-2xl text-lg shadow-2xl shadow-blue-500/20"
                  >
                    {user ? 'Go to Dashboard' : 'Book Free Audit'} <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  
                  <div className="flex flex-wrap justify-center gap-x-6 gap-y-4">
                    <a href="https://instagram.com/qalalabs" target="_blank" rel="noreferrer" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Instagram</a>
                    <a href="https://linkedin.com/company/qalalabs" target="_blank" rel="noreferrer" className="text-[10px] font-black uppercase tracking-widest text-slate-400">LinkedIn</a>
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