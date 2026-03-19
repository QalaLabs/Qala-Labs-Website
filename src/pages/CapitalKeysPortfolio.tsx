"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';
import { motion } from 'framer-motion';
import { 
  Building2, 
  LayoutDashboard, 
  Users, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight,
  ArrowLeft,
  Search,
  PieChart,
  Globe,
  ShieldCheck,
  MousePointer2
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from 'react-router-dom';

const CapitalKeysPortfolio = () => {
  const metrics = [
    { label: "Leads (30 Days)", value: "17+", icon: <Users className="w-6 h-6" /> },
    { label: "Conversion Rate", value: "64.7%", icon: <TrendingUp className="w-6 h-6" /> },
    { label: "Market Focus", value: "India/Real-Estate", icon: <Globe className="w-6 h-6" /> },
    { label: "System", value: "Full CMS", icon: <ShieldCheck className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100">
      <SEO 
        title="Capital Keys: Luxury Real Estate Platform | Qala Labs" 
        description="Complete website development for Capital Keys, featuring property listings, lead dashboards, and admin panels."
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
            <Badge className="bg-slate-900 text-white mb-6 px-4 py-1 rounded-full font-bold uppercase tracking-widest text-[10px]">
              Full-Stack Web Development
            </Badge>
            <h1 className="text-4xl md:text-7xl font-black text-slate-900 mb-8 leading-tight tracking-tight">
              Capital Keys: Premium <span className="text-blue-600">Real Estate</span> Engine.
            </h1>
            <p className="text-xl text-slate-600 mb-12 leading-relaxed max-w-3xl">
              We developed a complete digital ecosystem for Capital Keys, a premium India-based real estate platform. From high-converting listings to advanced lead intelligence dashboards.
            </p>
            
            <div className="rounded-[3rem] overflow-hidden shadow-2xl mb-12 border border-slate-100 bg-slate-50">
              <img 
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200" 
                alt="Capital Keys Luxury Real Estate" 
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

          <section className="grid lg:grid-cols-3 gap-16 mb-24">
            <div className="lg:col-span-2 space-y-16">
              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-8">Project Features</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="border-none shadow-sm bg-slate-50 rounded-3xl overflow-hidden">
                    <CardHeader className="p-8 pb-0">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 mb-4 shadow-sm">
                        <Search className="w-6 h-6" />
                      </div>
                      <CardTitle className="text-xl font-bold">Listings Page</CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 pt-4">
                      <p className="text-slate-600 text-sm leading-relaxed">
                        Searchable grid of luxury apartments with advanced filters for type, name, and price. High-res image galleries and quick-action inquiry buttons.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-none shadow-sm bg-slate-50 rounded-3xl overflow-hidden">
                    <CardHeader className="p-8 pb-0">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 mb-4 shadow-sm">
                        <PieChart className="w-6 h-6" />
                      </div>
                      <CardTitle className="text-xl font-bold">Dashboard Analytics</CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 pt-4">
                      <p className="text-slate-600 text-sm leading-relaxed">
                        Interactive charts visualizing leads by inquiry type and sales status. Real-time tracking of conversion velocity and agent performance.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-none shadow-sm bg-slate-50 rounded-3xl overflow-hidden">
                    <CardHeader className="p-8 pb-0">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 mb-4 shadow-sm">
                        <Users className="w-6 h-6" />
                      </div>
                      <CardTitle className="text-xl font-bold">Lead Management</CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 pt-4">
                      <p className="text-slate-600 text-sm leading-relaxed">
                        Centralized table for leads with status tracking, contact details, and export functionality. Built for high-volume sales teams.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-none shadow-sm bg-slate-50 rounded-3xl overflow-hidden">
                    <CardHeader className="p-8 pb-0">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 mb-4 shadow-sm">
                        <LayoutDashboard className="w-6 h-6" />
                      </div>
                      <CardTitle className="text-xl font-bold">Site CMS</CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 pt-4">
                      <p className="text-slate-600 text-sm leading-relaxed">
                        Custom CMS for homepage content, hero sections, CTA labels, and FAQ management. Allows admins to update site copy without code.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="p-10 bg-slate-900 rounded-[3rem] text-white">
                <h3 className="text-2xl font-black mb-8 text-blue-400">Results Achieved</h3>
                <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-1" />
                      <div>
                        <p className="font-bold text-lg">17+ Qualified Leads</p>
                        <p className="text-slate-400 text-sm">Generated within the first 30 days of launch.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-1" />
                      <div>
                        <p className="font-bold text-lg">64.7% Close Rate</p>
                        <p className="text-slate-400 text-sm">High-intent traffic driven by precise UI/UX.</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-1" />
                      <div>
                        <p className="font-bold text-lg">Efficient CRUD</p>
                        <p className="text-slate-400 text-sm">Property management time reduced by 40%.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-1" />
                      <div>
                        <p className="font-bold text-lg">Real-Estate Market Focus</p>
                        <p className="text-slate-400 text-sm">Optimized for luxury sector search patterns.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <Card className="border-none shadow-sm rounded-[2.5rem] bg-slate-50 p-8">
                <h3 className="text-xl font-black mb-6 text-slate-900">Project Info</h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Category</p>
                    <p className="font-bold text-slate-700">Real Estate / Web Dev</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Location</p>
                    <p className="font-bold text-slate-700">India</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Software</p>
                    <p className="font-bold text-slate-700">React, Tailwind, Recharts, Supabase</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Dated</p>
                    <p className="font-bold text-slate-700">June 2024</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Client</p>
                    <p className="font-bold text-slate-700">Capital Keys</p>
                  </div>
                </div>
              </Card>

              <div className="p-8 bg-blue-600 rounded-[2.5rem] text-white text-center">
                <h4 className="text-xl font-black mb-4">Need a custom platform?</h4>
                <Link to="/contact">
                  <Button className="w-full bg-white text-blue-600 hover:bg-slate-100 rounded-xl font-black border-none">
                    Book Free Audit
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CapitalKeysPortfolio;