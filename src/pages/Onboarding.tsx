"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, CheckCircle2, ArrowRight, FileText, Zap, ShieldCheck } from 'lucide-react';
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
    <div className="min-h-screen bg-slate-50">
      <SEO title="Onboarding Sequence" description="What to expect after joining the Qala Labs scale engine." />
      <Navbar />
      
      <div className="pt-32 pb-20 px-4 max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight">
            The <span className="text-blue-600">Onboarding</span> Journey
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            We move fast. Here is exactly what happens in your first 72 hours with Qala Labs.
          </p>
        </motion.div>

        <div className="space-y-12">
          <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <Mail className="w-8 h-8 text-blue-600" /> Email Sequence
            </h2>
            <div className="grid gap-6">
              {emails.map((email, i) => (
                <Card key={i} className="border-none shadow-sm bg-white overflow-hidden group">
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-slate-900 text-white p-8 md:w-48 flex flex-col justify-center items-center text-center">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Timing</span>
                      <span className="text-xl font-bold">{email.timing}</span>
                    </div>
                    <div className="p-8 flex-1">
                      <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                        {email.subject}
                      </h3>
                      <p className="text-slate-600 leading-relaxed">{email.content}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <section className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <FileText className="w-8 h-8 text-blue-600" /> Asset Checklist
              </h2>
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
                <ul className="space-y-4">
                  {[
                    'Vector Logo Pack (AI/SVG)',
                    'Brand Guidelines & Tone of Voice',
                    'Raw Product Footage (UGC style)',
                    'Customer Persona Data',
                    'Historical Ad Performance Reports'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl flex flex-col justify-center">
              <Zap className="w-12 h-12 text-blue-500 mb-6" />
              <h3 className="text-3xl font-bold mb-4">Ready to start?</h3>
              <p className="text-slate-400 mb-8">
                Once you've signed your partnership agreement, you'll receive your login credentials for the Client Portal.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white h-16 rounded-2xl font-black text-lg">
                Go to Dashboard <ArrowRight className="ml-2" />
              </Button>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Onboarding;