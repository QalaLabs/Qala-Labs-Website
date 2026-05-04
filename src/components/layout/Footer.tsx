import * as React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Instagram, ArrowRight, Mail, Phone, MapPin } from 'lucide-react';
import Logo from './Logo';
import { MadeWithDyad } from "@/components/made-with-dyad";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Services', href: '/services' },
      { name: 'Industries', href: '/industries' },
      { name: 'Results', href: '/results' },
      { name: 'Portfolio', href: '/portfolio' },
      { name: 'Case Studies', href: '/case-studies' },
      { name: 'Careers', href: '/career' },
    ],
    network: [
      { name: 'Agency Network', href: '/agency-network' },
      { name: 'Creator Collective', href: '/creator-collective' },
      { name: 'Pricing', href: '/pricing' },
    ],
    resources: [
      { name: 'AI Search Visibility', href: '/ai-search-visibility' },
      { name: 'Enterprise AI Automation', href: '/enterprise-ai-automation' },
      { name: 'Free AI Audit', href: '/ai-audit' },
      { name: 'Blog', href: '/blog' },
      { name: 'Growth Tools', href: '/tools' },
      { name: 'Contact', href: '/contact' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
    ]
  };

  return (
    <footer className="bg-[#06070D] text-white pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
          {/* Brand Column */}
          <div className="lg:col-span-1 space-y-8">
            <Logo size={44} />
            <p className="text-slate-400 leading-relaxed max-w-xs">
              India's full-service AI growth agency — performance marketing, AI automation, and AI search visibility. We build brands that scale.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/company/qalalabs/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/qalalabs/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact Column */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold">Contact</h4>
            <div className="space-y-4 text-slate-400">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-white">Email</p>
                  <a href="mailto:hello@qalalabs.com" className="hover:text-white transition-colors">
                    hello@qalalabs.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-white">Phone</p>
                  <a href="tel:+916006760151" className="hover:text-white transition-colors">
                    +91 60067 60151
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-white">Office</p>
                  <p className="text-xs leading-relaxed">
                    2nd Floor, SE 30, Gyan Shakti Mandir Marg, above CSB Bank, Block BT, West Shalimar Bagh, New Delhi, Delhi 110088
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="text-lg font-bold mb-8">Company</h4>
            <ul className="space-y-4">
              {links.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-8">Collaborate</h4>
            <ul className="space-y-4">
              {links.network.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-8">Resources</h4>
            <ul className="space-y-4">
              {links.resources.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
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
              aria-label="Email for newsletter"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-xl font-bold transition-colors flex items-center gap-2">
              Join <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© {currentYear} Qala Labs. All rights reserved.</p>
          <div className="flex gap-8">
            {links.legal.map((link) => (
              <Link 
                key={link.name} 
                to={link.href} 
                className="hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <MadeWithDyad />
        </div>
      </div>
    </footer>
  );
};

export default Footer;