"use client";

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { showSuccess, showError } from '@/utils/toast';
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Send, CheckCircle2, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from "framer-motion";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    revenue: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from('leads').insert({
      email: formData.email,
      tool_used: 'contact_form',
      data: formData
    });

    setLoading(false);
    if (error) {
      showError("Something went wrong. Please try again.");
    } else {
      showSuccess("Audit request received! We'll be in touch within 24 hours.");
      setFormData({ name: '', email: '', website: '', revenue: '', message: '' });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <SEO title="Book Your Free Audit" description="Get a detailed performance audit and growth strategy for your brand." />
      <Navbar />
      
      <div className="pt-48 pb-32 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold mb-8 uppercase tracking-widest"
            >
              Get in Touch
            </motion.div>
            <h1 className="text-5xl md:text-8xl font-extrabold text-zinc-50 mb-10 leading-[1.05] tracking-tighter">
              Let's Build Your <br /> <span className="text-indigo-500">Scale Engine.</span>
            </h1>
            <p className="text-xl text-zinc-400 mb-16 leading-relaxed max-w-xl">
              We only partner with brands we know we can scale. Fill out the form to see if you're a fit for our 8-figure framework.
            </p>

            <div className="space-y-10">
              <div className="flex items-start gap-8 group">
                <div className="w-14 h-14 bg-zinc-900 rounded-2xl flex items-center justify-center shrink-0 border border-zinc-800 group-hover:border-indigo-500/50 transition-colors">
                  <Mail className="w-6 h-6 text-indigo-500" />
                </div>
                <div>
                  <h4 className="font-black text-zinc-100 uppercase tracking-widest text-xs mb-2">Email Us</h4>
                  <p className="text-xl font-bold text-zinc-400">hello@qalalabs.com</p>
                </div>
              </div>
              <div className="flex items-start gap-8 group">
                <div className="w-14 h-14 bg-zinc-900 rounded-2xl flex items-center justify-center shrink-0 border border-zinc-800 group-hover:border-indigo-500/50 transition-colors">
                  <Phone className="w-6 h-6 text-indigo-500" />
                </div>
                <div>
                  <h4 className="font-black text-zinc-100 uppercase tracking-widest text-xs mb-2">Call Us</h4>
                  <p className="text-xl font-bold text-zinc-400">+44 (0) 20 3835 1234</p>
                </div>
              </div>
              <div className="flex items-start gap-8 group">
                <div className="w-14 h-14 bg-zinc-900 rounded-2xl flex items-center justify-center shrink-0 border border-zinc-800 group-hover:border-indigo-500/50 transition-colors">
                  <MapPin className="w-6 h-6 text-indigo-500" />
                </div>
                <div>
                  <h4 className="font-black text-zinc-100 uppercase tracking-widest text-xs mb-2">Global Offices</h4>
                  <p className="text-xl font-bold text-zinc-400">London • Dubai • New York</p>
                </div>
              </div>
            </div>

            <div className="mt-20 p-10 bg-zinc-900/40 backdrop-blur-xl rounded-[3rem] border border-zinc-800/50 shadow-2xl">
              <h4 className="font-black text-zinc-100 mb-8 uppercase tracking-widest text-xs">What happens next?</h4>
              <ul className="space-y-6">
                <li className="flex items-center gap-4 text-zinc-400">
                  <div className="w-6 h-6 bg-indigo-600/20 rounded-full flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                  </div>
                  <span className="font-bold">Data analysis of your current performance</span>
                </li>
                <li className="flex items-center gap-4 text-zinc-400">
                  <div className="w-6 h-6 bg-indigo-600/20 rounded-full flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                  </div>
                  <span className="font-bold">30-minute strategy call with our founders</span>
                </li>
                <li className="flex items-center gap-4 text-zinc-400">
                  <div className="w-6 h-6 bg-indigo-600/20 rounded-full flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                  </div>
                  <span className="font-bold">Custom 8-figure scale roadmap</span>
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="border-zinc-800/50 shadow-2xl rounded-[3.5rem] overflow-hidden bg-zinc-900/40 backdrop-blur-xl">
              <CardHeader className="bg-zinc-950 p-12 border-b border-zinc-800/50">
                <CardTitle className="text-3xl font-extrabold text-zinc-50 tracking-tight">Request Free Audit</CardTitle>
                <p className="text-zinc-400 mt-3 text-lg">Get your custom growth strategy in 24 hours.</p>
              </CardHeader>
              <CardContent className="p-12">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label htmlFor="name" className="text-zinc-400 font-bold uppercase tracking-widest text-[10px]">Full Name</Label>
                      <Input 
                        id="name" 
                        placeholder="John Doe" 
                        required 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="bg-zinc-950 border-zinc-800 rounded-2xl h-16 focus:ring-indigo-500 text-zinc-100"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="email" className="text-zinc-400 font-bold uppercase tracking-widest text-[10px]">Work Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="john@brand.com" 
                        required 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="bg-zinc-950 border-zinc-800 rounded-2xl h-16 focus:ring-indigo-500 text-zinc-100"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label htmlFor="website" className="text-zinc-400 font-bold uppercase tracking-widest text-[10px]">Website URL</Label>
                      <Input 
                        id="website" 
                        placeholder="brand.com" 
                        required 
                        value={formData.website}
                        onChange={(e) => setFormData({...formData, website: e.target.value})}
                        className="bg-zinc-950 border-zinc-800 rounded-2xl h-16 focus:ring-indigo-500 text-zinc-100"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="revenue" className="text-zinc-400 font-bold uppercase tracking-widest text-[10px]">Monthly Revenue</Label>
                      <select 
                        id="revenue"
                        className="w-full h-16 px-4 rounded-2xl border border-zinc-800 bg-zinc-950 text-zinc-300 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                        required
                        value={formData.revenue}
                        onChange={(e) => setFormData({...formData, revenue: e.target.value})}
                      >
                        <option value="">Select range</option>
                        <option value="<50k">{"< $50k/mo"}</option>
                        <option value="50k-150k">$50k - $150k/mo</option>
                        <option value="150k-500k">$150k - $500k/mo</option>
                        <option value="500k+">$500k+/mo</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="message" className="text-zinc-400 font-bold uppercase tracking-widest text-[10px]">Growth Goals</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Tell us about your current challenges and goals..." 
                      className="min-h-[160px] bg-zinc-950 border-zinc-800 rounded-2xl focus:ring-indigo-500 text-zinc-100 p-6"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full py-10 rounded-[2rem] bg-indigo-600 hover:bg-indigo-700 text-white text-xl font-black shadow-2xl shadow-indigo-500/20 group"
                    disabled={loading}
                  >
                    {loading ? <Loader2 className="w-8 h-8 animate-spin" /> : (
                      <span className="flex items-center gap-3">
                        Send Audit Request <Send className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                      </span>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;