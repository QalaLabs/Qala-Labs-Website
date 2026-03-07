"use client";

import React from 'react';
import { Linkedin, Twitter, Instagram } from 'lucide-react';
import { MadeWithDyad } from "@/components/made-with-dyad";

const Footer = () => {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-zinc-600 text-sm font-medium">
            © 2026 Qala Labs. All Rights Reserved.
          </div>
          
          <div className="flex gap-8">
            <a href="#" className="text-zinc-600 hover:text-indigo-400 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="text-zinc-600 hover:text-indigo-400 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-zinc-600 hover:text-indigo-400 transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        <div className="mt-8 flex justify-center">
          <MadeWithDyad />
        </div>
      </div>
    </footer>
  );
};

export default Footer;