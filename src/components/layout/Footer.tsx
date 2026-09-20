import * as React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import Logo from './Logo';
import SectionWaveDivider from './SectionWaveDivider';
import { MadeWithDyad } from "@/components/made-with-dyad";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Services, grouped into the same Discovery / Design / Development / Marketing
  // buckets used in the Navbar mega menu and the /services page filters.
  const serviceBuckets = [
    {
      title: 'Discovery',
      links: [
        { name: 'Strategy & Planning', href: '/services/strategy-planning' },
        { name: 'Brand Audit', href: '/services/brand-audit' },
        { name: 'Digital Presence Review', href: '/services/digital-presence-review' },
        { name: 'Analytics & Data', href: '/services/data' },
        { name: 'Free AI Audit', href: '/ai-audit' },
      ],
    },
    {
      title: 'Design',
      links: [
        { name: 'Branding', href: '/services/branding' },
        { name: 'UI/UX Design', href: '/services/ui-ux-design' },
        { name: 'Web Design', href: '/services/web-design' },
        { name: 'Mobile App Design', href: '/services/mobile-app-design' },
        { name: 'Production & Shoots', href: '/services/production-shoots' },
      ],
    },
    {
      title: 'Development',
      links: [
        { name: 'Web Development', href: '/services/web-dev' },
        { name: 'Mobile App Development', href: '/services/mobile-app-development' },
        { name: 'Software Development', href: '/services/software-development' },
        { name: 'Blockchain Development', href: '/services/blockchain-development' },
        { name: 'Enterprise AI Automation', href: '/enterprise-ai-automation' },
      ],
    },
    {
      title: 'Marketing',
      links: [
        { name: 'AI Search Visibility', href: '/ai-search-visibility' },
        { name: 'Performance Marketing', href: '/services/performance' },
        { name: 'Social Media Management', href: '/services/social-media' },
        { name: 'Influencer Marketing', href: '/services/influencer-marketing' },
        { name: 'Email Marketing', href: '/services/email-marketing' },
      ],
    },
  ];

  const links = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Results', href: '/results' },
      { name: 'Portfolio', href: '/portfolio' },
      { name: 'Case Studies', href: '/case-studies' },
      { name: 'Careers', href: '/career' },
      { name: 'Free AI Audit', href: '/ai-audit' },
      { name: 'Growth Tools', href: '/tools' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
    ]
  };

  return (
    <footer className="bg-background text-foreground pt-0 pb-12 border-t border-border">
      <SectionWaveDivider />
      <div className="max-w-7xl mx-auto px-4 pt-12 md:pt-16">
        {/* Services, grouped into the same Discovery / Design / Development / Marketing
            buckets as the Navbar mega menu and the /services page filters. */}
        <div className="mb-16 pb-16 border-b border-slate-800">
          <div className="flex items-center justify-between mb-8">
            <h4 className="text-lg font-bold">Services</h4>
            <Link to="/services" className="text-sm font-bold text-blue-500 hover:text-blue-400 transition-colors">
              View all services →
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
            {serviceBuckets.map((bucket) => (
              <div key={bucket.title}>
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-500 mb-4">
                  {bucket.title}
                </p>
                <ul className="space-y-3">
                  {bucket.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-slate-400 hover:text-white transition-colors text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          {/* Brand Column */}
          <div className="space-y-6">
            <Logo size={40} />
            {/* TODO: swap to --indigo/--cyan tokens once Prompt 0 lands */}
            <p className="text-slate-400 leading-relaxed max-w-xs">
              Creative × Data × Impact. We're revenue engineers for DTC brands scaling past ₹1Cr/mo.
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

          {/* Company Column */}
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

        {/* Bookend wordmark — mirrors the hero's bold opening statement */}
        <div className="mt-16 md:mt-20 overflow-hidden select-none" aria-hidden="true">
          <p
            className="font-black uppercase tracking-tight leading-[0.85] text-center bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 bg-clip-text text-transparent whitespace-nowrap"
            style={{ fontSize: 'clamp(2.5rem, 11vw, 8rem)' }}
          >
            Revenue Engineers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;