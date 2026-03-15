"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  ArrowRight,
  ArrowLeft,
  ShoppingBag,
  Layers,
  Trophy
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';

// Import assets
import WPLHero from '@/assets/pickleball/wpl-hero.png';
import CSCLogo from '@/assets/pickleball/csc-logo-lockup.png';
import CSCYellowTee from '@/assets/pickleball/csc-yellow-tee.png';
import CSCBlackTee from '@/assets/pickleball/csc-black-tee.png';
import CSCBlackPolo from '@/assets/pickleball/csc-black-polo.png';
import CSCYellowPolo from '@/assets/pickleball/csc-yellow-polo.png';
import CSCCap from '@/assets/pickleball/csc-cap.png';
import CSCTeamKit from '@/assets/pickleball/csc-team-kit.png';
import BJLogo from '@/assets/pickleball/bj-logo-lockup.png';
import BJTee from '@/assets/pickleball/bj-tee.png';

const PickleballPortfolio = () => {
  const metrics = [
    { label: "Design Assets", value: "45+", icon: <Layers className="w-6 h-6" /> },
    { label: "Teams Managed", value: "2", icon: <Trophy className="w-6 h-6" /> },
    { label: "Market Ready", value: "100%", icon: <CheckCircle2 className="w-6 h-6" /> },
    { label: "Category", value: "Sports", icon: <ShoppingBag className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-yellow-100">
      <SEO 
        title="World Pickleball League: Apparel & Merchandise | Qala Labs" 
        description="Complete visual system and merchandise line for the World Pickleball League, featuring team kits for Bengaluru Jawans and Chennai Super Champs."
      />
      <Navbar />
      
      <div className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4">
          <Link to="/portfolio" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold mb-12 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Portfolio
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 text-center"
          >
            <Badge className="bg-blue-600 text-white mb-6 px-4 py-1 rounded-full font-bold uppercase tracking-widest text-[10px]">
              Apparel Design & Art Direction
            </Badge>
            <h1 className="text-4xl md:text-7xl font-black text-slate-900 mb-8 leading-tight tracking-tight">
              World Pickleball League: <br /> <span className="text-blue-600">Apparel & Merchandise.</span>
            </h1>
            
            <div className="rounded-[3rem] overflow-hidden shadow-2xl mb-12 border border-slate-100 bg-slate-50">
              <img 
                src={WPLHero} 
                alt="World Pickleball League Branding" 
                className="w-full h-auto"
              />
            </div>
          </motion.div>

          <section className="mb-24 max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-black text-slate-900 mb-6">World Pickleball League – Apparel & Merchandise Design</h2>
            <p className="text-xl text-slate-600 leading-relaxed">
              Worked closely with the World Pickleball League to design and develop their apparel, jerseys, equipment, caps, and merchandise. Focused on selecting the right color combinations, adhering to brand guidelines, and creating visually appealing, high-performance designs that inspire players. Ensured each design was both functional and stylish, enhancing the overall identity of the league.
            </p>
          </section>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-32">
            {metrics.map((metric, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 text-center hover:bg-white hover:shadow-xl hover:border-blue-100 transition-all group"
              >
                <div className="text-blue-600 mb-4 flex justify-center group-hover:scale-110 transition-transform">{metric.icon}</div>
                <p className="text-3xl font-black mb-1 text-slate-900">{metric.value}</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{metric.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Chennai Super Champs Section */}
          <section className="space-y-12 mb-32">
            <div className="rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100">
              <img src={CSCLogo} alt="Chennai Super Champs Banner" className="w-full h-auto" />
            </div>

            <div className="grid gap-12">
              <div className="rounded-[3rem] overflow-hidden shadow-xl border border-slate-100 bg-slate-50">
                <img src={CSCBlackTee} alt="CSC Black Fan Tee" className="w-full h-auto" />
              </div>
              <div className="rounded-[3rem] overflow-hidden shadow-xl border border-slate-100 bg-slate-50">
                <img src={CSCYellowTee} alt="CSC Yellow Fan Tee" className="w-full h-auto" />
              </div>
              <div className="rounded-[3rem] overflow-hidden shadow-xl border border-slate-100 bg-slate-50">
                <img src={CSCBlackPolo} alt="CSC Black Staff Polo" className="w-full h-auto" />
              </div>
              <div className="rounded-[3rem] overflow-hidden shadow-xl border border-slate-100 bg-slate-50">
                <img src={CSCYellowPolo} alt="CSC Yellow Staff Polo" className="w-full h-auto" />
              </div>
              <div className="rounded-[3rem] overflow-hidden shadow-xl border border-slate-100 bg-slate-50">
                <img src={CSCCap} alt="CSC Headwear Collection" className="w-full h-auto" />
              </div>
              <div className="rounded-[3rem] overflow-hidden shadow-xl border border-slate-100 bg-slate-50">
                <img src={CSCTeamKit} alt="CSC Match Jerseys" className="w-full h-auto" />
              </div>
            </div>
          </section>

          {/* Bengaluru Jawans Section */}
          <section className="space-y-12 mb-32">
            <div className="rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100">
              <img src={BJLogo} alt="Bengaluru Jawans Banner" className="w-full h-auto" />
            </div>

            <div className="grid gap-12">
              <div className="rounded-[3rem] overflow-hidden shadow-xl border border-slate-100 bg-slate-50">
                <img src={BJTee} alt="BJ Camo Team Tee" className="w-full h-auto" />
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20">
            <div className="relative p-12 md:p-24 bg-slate-900 rounded-[5rem] overflow-hidden text-center shadow-2xl">
              <div className="relative z-10">
                <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight text-white">
                  Want this look <br /> for your <i>brand?</i>
                </h2>
                <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
                  We package print-ready files, mockups and ecommerce assets for Amazon & retail.
                </p>
                <Link to="/contact">
                  <Button className="bg-blue-600 text-white hover:bg-blue-700 px-12 py-10 rounded-3xl text-2xl font-black group transition-all shadow-xl">
                    Get in touch <ArrowRight className="ml-3 w-8 h-8 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </Link>
              </div>
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] -mr-48 -mt-48" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] -ml-48 -mb-48" />
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PickleballPortfolio;