"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';
import { Card, CardContent } from "@/components/ui/card";
import { Mail, CheckCircle2, ArrowRight, FileText, Zap } from 'lucide-react';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const Onboarding = () => {
  const emails = [
    {
      subject: "Welcome to the Engine: Your 8-Figure Roadmap",
      timing: "Immediate",
      content: "Welcome to Qala Labs! We're thrilled to start scaling your brand. In the next 24 hours, our team will perform a deep-dive audit of your current infrastructure. Please ensure you've granted access to your Meta and Google ad accounts."
    },
    {
      subject: "Action Required: Asset Collection & Brand DNA",
      timing: "Day 1",
      content: "To build your high-velocity creative engine, we need your brand assets. Please upload your logo pack, brand guidelines, and any existing raw footage to the 'Shared Assets' folder in your dashboard."
    },
    {
      subject: "Strategy Locked: Your First 30 Days",
      timing: "Day 3",
      content: "Your custom scale roadmap is ready. We've identified 3 key growth levers to pull immediately. Check your dashboard for the full strategy deck and join our Slack channel for real-time updates."
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 selection:bg-indigo-500/30">
      <SEO title="Onboarding Sequence" description="What to expect after joining the Qala Labs scale engine." />
      <Navbar />
      
      <div className="pt-48 pb-32 px-6 max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold mb-8 uppercase tracking-widest mx-auto"
          >
            The Process
          </motion.div>
          <h1 className="text-5xl md:text-9xl font-extrabold text-zinc-50 mb-10 tracking-tighter leading-[0.95]">
            The <span className="text-indigo-500">Onboarding</span> Journey.
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            We move fast. Here is exactly what happens in your first 72 hours with Qala Labs.
          </p>
        </motion.div>

        <div className="space-y-16">
          <section>
            <h2 className="text-3xl md:text-5xl font-black text-zinc-50 mb-12 flex items-center gap-5 tracking-tight">
              <Mail className="w-10 h-10 text-indigo-500" /> Communications
            </h2>
            <div className="grid gap-8">
              {emails.map((email, i) => (
                <Card key={i} className="border-zinc-800 shadow-2xl bg-zinc-900/40 backdrop-blur-xl overflow-hidden group hover:border-indigo-500/30 transition-all duration-500 rounded-[3rem]">
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-zinc-950 text-white p-12 md:w-56 flex flex-col justify-center items-center text-center border-b md:border-b-0 md:border-r border-zinc-800">
                      <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-3">Timing</span>
                      <span className="text-2xl font-black tracking-tight text-indigo-500">{email.timing}</span>
                    </div>
                    <div className="p-12 flex-1">
                      <h3 className="text-2xl font-black text-zinc-50 mb-6 group-hover:text-indigo-400 transition-colors tracking-tight">
                        {email.subject}
                      </h3>
                      <p className="text-zinc-400 leading-relaxed text-lg">{email.content}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <section className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl md:text-5xl font-black text-zinc-50 mb-12 flex items-center gap-5 tracking-tight">
                <FileText className="w-10 h-10 text-indigo-500" /> Checklist
              </h2>
              <div className="bg-zinc-900/40 backdrop-blur-xl p-12 rounded-[3.5rem] shadow-2xl border border-zinc-800 space-y-8">
                <ul className="space-y-6">
                  {[
                    'Vector Logo Pack (AI/SVG)',
                    'Brand Guidelines & Tone of Voice',
                    'Raw Product Footage (UGC style)',
                    'Customer Persona Data',
                    'Historical Ad Performance Reports'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-5 text-zinc-300 font-bold text-lg leading-snug">
                      <CheckCircle2 className="w-7 h-7 text-green-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="bg-indigo-600 text-white p-16 rounded-[4rem] shadow-2xl flex flex-col justify-center relative overflow-hidden group">
              <Zap className="w-16 h-16 text-white mb-10 group-hover:scale-110 transition-transform duration-500" />
              <h3 className="text-4xl font-black mb-8 leading-tight tracking-tight">Ready to start?</h3>
              <p className="text-indigo-100 mb-12 text-xl leading-relaxed">
                Once you've signed your partnership agreement, you'll receive your login credentials for the Client Portal.
              </p>
              <Button className="bg-white text-indigo-600 hover:bg-zinc-100 h-20 px-10 rounded-2xl font-black text-xl shadow-2xl transition-all group/btn">
                Go to Dashboard <ArrowRight className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
              
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -mr-32 -mt-32" />
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Onboarding;