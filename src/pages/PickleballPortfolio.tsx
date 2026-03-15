"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight,
  ArrowLeft,
  Zap,
  ShoppingBag,
  Palette,
  Shirt,
  Layers,
  Image as ImageIcon
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from 'react-router-dom';

const PickleballPortfolio = () => {
  const metrics = [
    { label: "Design Assets", value: "45+", icon: <Layers className="w-6 h-6" /> },
    { label: "Product Lines", value: "6", icon: <Shirt className="w-6 h-6" /> },
    { label: "Market Ready", value: "100%", icon: <CheckCircle2 className="w-6 h-6" /> },
    { label: "Category", value: "Sports", icon: <ShoppingBag className="w-6 h-6" /> }
  ];

  const mockups = [
    { title: "Primary Lockup & Sponsor", desc: "Logotype, submark & partner lockups", img: "https://images.unsplash.com/photo-1626225928561-a77a1773ce64?auto=format&fit=crop&q=80&w=800" },
    { title: "Fan Tees — Black", desc: "Front & back variations", img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800" },
    { title: "Fan Tees — Yellow", desc: "Colorway for retail", img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800" },
    { title: "Polo Shirts", desc: "Training polos for staff and teams", img: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=800" },
    { title: "Caps & Headwear", desc: "5 panel, curved, snapback variants", img: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=800" },
    { title: "Team Kits", desc: "Match-ready kit designs + shorts", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800" }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-yellow-100">
      <SEO 
        title="World Pickleball League: Apparel & Merchandise | Qala Labs" 
        description="Complete visual system and merchandise line for the World Pickleball League, featuring team kits, fan gear, and retail assets."
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
            className="mb-16"
          >
            <Badge className="bg-blue-600 text-white mb-6 px-4 py-1 rounded-full font-bold uppercase tracking-widest text-[10px]">
              Apparel Design & Art Direction
            </Badge>
            <h1 className="text-4xl md:text-7xl font-black text-slate-900 mb-8 leading-tight tracking-tight">
              World Pickleball League: <span className="text-blue-600">Apparel & Merchandise.</span>
            </h1>
            <p className="text-xl text-slate-600 mb-12 leading-relaxed max-w-3xl">
              Apparel design system, team kits, caps, training wear and retail merchandise for a rising sports league — art direction, mockups and full delivery-ready assets.
            </p>
            
            <div className="rounded-[3rem] overflow-hidden shadow-2xl mb-12 border border-slate-100 bg-slate-50">
              <img 
                src="https://images.unsplash.com/photo-1626225928561-a77a1773ce64?auto=format&fit=crop&q=80&w=1200" 
                alt="World Pickleball League Branding" 
                className="w-full h-auto"
              />
            </div>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
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

          <section className="mb-24">
            <div className="p-12 bg-slate-50 rounded-[3rem] border border-slate-100">
              <h2 className="text-3xl font-black text-slate-900 mb-6">Project Brief</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Qala Labs created the visual system and merchandise line for the World Pickleball League. Deliverables included fan tees, team kits, polo shirts, caps, warm-ups and A+ assets for e-commerce — built for print and digital use across Amazon & team retail.
              </p>
            </div>
          </section>

          {/* Mockup Grid */}
          <section className="mb-24">
            <h2 className="text-3xl font-black text-slate-900 mb-12 text-center">Design Mockups</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mockups.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all"
                >
                  <div className="aspect-square rounded-2xl overflow-hidden mb-6 bg-slate-50">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Wide Panels */}
          <section className="grid md:grid-cols-2 gap-8 mb-24">
            <div className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100">
              <div className="aspect-video rounded-2xl overflow-hidden mb-8">
                <img src="https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&q=80&w=800" alt="Warm-up Tracksuit" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">Warm-up Tracksuit</h3>
              <p className="text-slate-500">Zip jacket + trackpants in team colorways</p>
            </div>
            <div className="p-10 bg-slate-900 rounded-[3rem] text-white">
              <div className="aspect-video rounded-2xl overflow-hidden mb-8 bg-white/5 flex items-center justify-center">
                <Palette className="w-20 h-20 text-blue-400 opacity-20" />
              </div>
              <h3 className="text-2xl font-black mb-2">Brand Lockups</h3>
              <p className="text-slate-400">Ecommerce banners and hero treatments for dark mode environments.</p>
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