import * as React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Twitter, Linkedin, Instagram, ArrowRight, Zap } from 'lucide-react';
import Logo from './Logo';
import { MadeWithDyad } from "@/components/made-with-dyad";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Services', href: '/services' },
      { name: 'Portfolio', href: '/portfolio' },
      { name: 'Case Studies', href: '/case-studies' },
      { name: 'Pricing', href: '/pricing' },
    ],
    resources: [
      { name: 'Blog', href: '/blog' },
      { name: 'Growth Tools', href: '/tools' },
      { name: 'ROI Calculator', href: '/tools' },
      { name: 'Contact', href: '/contact' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
    ]
  };

  return (
    <footer className="bg-slate-900 text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand Column */}
          <div className="space-y-8">
            <Logo variant="white" />
            <p className="text-slate-400 leading-relaxed max-w-xs">
              The performance marketing agency for brands that refuse to settle for average growth. We build scale engines.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="text-lg font-bold mb-8">Company</h4>
            <ul className="space-y-4">
              {links.company.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-slate-400 hover:text-white transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-8">Resources</h4>
            <ul className="space-y-4">
              {links.resources.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-slate-400 hover:text-white transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-lg font-bold mb-8">Get in Touch</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-blue-500 shrink-0" />
                <span className="text-slate-400">hello@qalalabs.com</span>
              </li>
              <li className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-blue-500 shrink-0" />
                <span className="text-slate-400">+44 (0) 20 3835 1234</span>
              </li>
              <li className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-blue-500 shrink-0" />
                <span className="text-slate-400">London • Dubai • New York</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter / CTA */}
        <div className="border-t border-slate-800 pt-12 pb-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2">Ready to scale?</h3>
            <p className="text-slate-400">Join 5,000+ founders receiving our weekly growth frameworks.</p>
          </div>
          <div className="flex w-full max-w-md gap-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 bg-slate-800 border-none rounded-xl px-6 py-4 focus:ring-2 focus:ring-blue-600 outline-none"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-xl font-bold transition-colors flex items-center gap-2">
              Join <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Motion Note */}
        <div className="mt-8 p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50 flex items-center gap-4">
          <Zap className="w-6 h-6 text-blue-500 shrink-0" />
          <p className="text-xs text-slate-400 leading-relaxed">
            <span className="font-bold text-white">Why motion matters:</span> We use purposeful animation to guide your focus and clarify complex data. Our motion system respects your system preferences and reduces intensity if "Reduced Motion" is enabled.
          </p>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© {currentYear} Qala Labs. All rights reserved.</p>
          <div className="flex gap-8">
            {links.legal.map((link) => (
              <Link key={link.name} to={link.href} className="hover:text-white transition-colors">{link.name}</Link>
            ))}
          </div>
          <MadeWithDyad />
        </div>
      </div>
    </footer>
  );
};

export default Footer;