"use client";

import * as React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, LayoutDashboard, ArrowRight, ChevronRight, ChevronDown, Moon, Sun } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Logo from './Logo';
import { useUser } from '@/hooks/useUser';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
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
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

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

  const ThemeToggle = () => {
    if (!mounted) return <div className="w-10 h-10" />;
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
      </Button>
    );
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[1000] bg-[#06070D]/95 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <Link to="/" className="relative z-[1020] flex items-center">
              <Logo className="h-8 md:h-10" variant="white" />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-6">
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
              
              <div className="flex items-center gap-2 ml-4">
                <ThemeToggle />
                {user ? (
                  <Button 
                    onClick={() => navigate('/admin')}
                    variant="outline"
                    className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 font-black px-6 rounded-xl flex items-center gap-2"
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
            </div>

            {/* Mobile Toggle */}
            <div className="flex lg:hidden items-center gap-2">
              <ThemeToggle />
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className={cn(
                  "relative z-[1020] flex items-center gap-2 px-5 py-3.5 rounded-xl transition-all active:scale-95 shadow-lg min-h-[48px] min-w-[48px]",
                  isOpen ? "bg-white/10 text-white border border-white/10" : "bg-white/10 text-white"
                )}
                aria-label="Toggle menu"
              >
                <span className="text-[10px] font-black uppercase tracking-[0.2em] ml-1">
                  {isOpen ? 'Close' : 'Menu'}
                </span>
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
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
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 bottom-0 w-[85%] bg-[#06070D] shadow-2xl flex flex-col border-l border-white/5"
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 p-4 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors z-20"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex-1 flex flex-col pt-24 px-8 pb-10 overflow-y-auto relative z-10">
                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-6">Navigation</p>
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
                    onClick={() => navigate(user ? '/admin' : '/contact')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-8 rounded-2xl text-xl shadow-2xl shadow-blue-500/20"
                  >
                    {user ? 'Go to Dashboard' : 'Book Free Audit'} <ArrowRight className="ml-2 w-6 h-6" />
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