"use client";

import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LayoutDashboard } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Logo from './Logo';
import { useUser } from '@/hooks/useUser';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();
  const { user } = useUser();

  const navLinks = [
    { name: 'Services', href: '/services' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'Tools', href: '/tools' },
    { name: 'Blog', href: '/blog' },
    { name: 'Pricing', href: '/pricing' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/">
            <Logo />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.href}
                className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            
            {user ? (
              <Button 
                onClick={() => navigate('/admin')}
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 font-bold px-6 rounded-full flex items-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </Button>
            ) : (
              <Button 
                onClick={() => navigate('/contact')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 rounded-full"
              >
                Free Audit
              </Button>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-900">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 p-4 space-y-4">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.href}
              className="block text-lg font-semibold text-slate-900"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Button 
            onClick={() => {
              navigate(user ? '/admin' : '/contact');
              setIsOpen(false);
            }}
            className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl"
          >
            {user ? 'Dashboard' : 'Free Audit'}
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;