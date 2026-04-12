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

// Import actual assets
import WPLHero from '@/assets/pickleball/wpl-hero.png';
import CSCBanner from '@/assets/pickleball/csc-banner.png';
import CSCStaffCollection from '@/assets/pickleball/csc-staff-collection.png';
import CSCYellowTee from '@/assets/pickleball/csc-yellow-tee.png';
import CSCBlackTee from '@/assets/pickleball/csc-black-tee.png';
import CSCYellowPolo from '@/assets/pickleball/csc-yellow-polo.png';
import CSCCaps from '@/assets/pickleball/csc-caps.png';
import CSCTeamKits from '@/assets/pickleball/csc-team-kits.png';
import CSCTracksuit from '@/assets/pickleball/csc-tracksuit.png';
import BJLogoLockup from '@/assets/pickleball/bj-logo-lockup.png';
import BJCamoTee from '@/assets/pickleball/bj-camo-tee.png';
import BJCaps from '@/assets/pickleball/bj-caps.png';

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
        title="Sports Merchandise Design — World Pickleball League Kits | Qala Labs"
        description="Qala Labs designed the complete visual identity and team merchandise for the World Pickleball League — kits, branding, and apparel for Bengaluru Jawans and Chennai Super Champs."
      />
      <Navbar />
      
      <div className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4">
          <Link to="/portfolio" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold mb-12 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Portfolio
          </Link>

          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-24 text-center"
          >
            <div className="rounded-[3rem] overflow-hidden shadow-2xl mb-16 border border-slate-100 bg-slate-50">
              <img 
                src={WPLHero} 
                alt="World Pickleball League Branding" 
                className="w-full h-auto"
              />
            </div>

            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-8">
                World Pickleball League – Apparel & Merchandise Design
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed">
                Worked closely with the World Pickleball League to design and develop their apparel, jerseys, equipment, caps, and merchandise. Focused on selecting the right color combinations, adhering to brand guidelines, and creating visually appealing, high-performance designs that inspire players.
              </p>
            </div>
          </motion.div>

          {/* Chennai Super Champs Section */}
          <section className="space-y-16 mb-32">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100"
            >
              <img src={CSCBanner} alt="Chennai Super Champs Merchandise Banner" className="w-full h-auto" />
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100 bg-slate-50">
                <img src={CSCBlackTee} alt="CSC Black Tee" className="w-full h-auto" />
              </div>
              <div className="rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100 bg-slate-50">
                <img src={CSCYellowTee} alt="CSC Yellow Tee" className="w-full h-auto" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100 bg-slate-50">
                <img src={CSCYellowPolo} alt="CSC Yellow Polo" className="w-full h-auto" />
              </div>
              <div className="rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100 bg-slate-50">
                <img src={CSCStaffCollection} alt="CSC Staff Collection" className="w-full h-auto" />
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rounded-[3rem] overflow-hidden shadow-xl border border-slate-100 bg-slate-50"
            >
              <img src={CSCCaps} alt="CSC Caps Collection" className="w-full h-auto" />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-[3rem] overflow-hidden shadow-xl border border-slate-100 bg-slate-50"
            >
              <img src={CSCTeamKits} alt="CSC Team Kits" className="w-full h-auto" />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-[3rem] overflow-hidden shadow-xl border border-slate-100 bg-slate-50"
            >
              <img src={CSCTracksuit} alt="CSC Tracksuit" className="w-full h-auto" />
            </motion.div>
          </section>

          {/* Bengaluru Jawans Section */}
          <section className="space-y-16 mb-32">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100"
            >
              <img src={BJLogoLockup} alt="playR x Bengaluru Jawans" className="w-full h-auto" />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rounded-[3rem] overflow-hidden shadow-xl border border-slate-100 bg-slate-50"
            >
              <img src={BJCaps} alt="BJ Caps Collection" className="w-full h-auto" />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-[3rem] overflow-hidden shadow-xl border border-slate-100 bg-slate-50"
            >
              <img src={BJCamoTee} alt="BJ Camo Tee" className="w-full h-auto" />
            </motion.div>
          </section>

          {/* CTA Section */}
          <section className="py-20">
            <div className="relative p-12 md:p-24 bg-slate-900 rounded-[5rem] overflow-hidden text-center shadow-2xl">
              <div className="relative z-10">
                <h2 className="text-4xl md:text-6xl font-black mb-10 leading-tight text-white">
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