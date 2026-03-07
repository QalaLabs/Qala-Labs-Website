"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Send, Loader2 } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { showSuccess, showError } from '@/utils/toast';

const LeadForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    help_type: 'Automation',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from('leads').insert({
      email: formData.email,
      tool_used: 'contact_form_v2',
      data: formData
    });

    setLoading(false);
    if (error) {
      showError("Something went wrong. Please try again.");
    } else {
      showSuccess("Strategy call request received!");
      setFormData({ name: '', email: '', website: '', help_type: 'Automation', message: '' });
    }
  };

  return (
    <section className="py-32 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-extrabold text-zinc-50 mb-8 tracking-tighter leading-tight">
              Let's Build Your Next <br /> <span className="text-indigo-500">Growth Engine.</span>
            </h2>
            
            <div className="space-y-8 mt-12">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center text-indigo-500 border border-zinc-800">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-black text-zinc-500 uppercase tracking-widest">Email Us</p>
                  <p className="text-lg font-bold text-zinc-300">hello@qalalabs.com</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center text-indigo-500 border border-zinc-800">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-black text-zinc-500 uppercase tracking-widest">Location</p>
                  <p className="text-lg font-bold text-zinc-300">London • Dubai • New York</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-10 bg-zinc-900/40 border border-zinc-800/50 rounded-[3rem] backdrop-blur-xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-zinc-400 font-bold">Full Name</Label>
                <Input 
                  id="name" 
                  placeholder="John Doe" 
                  required 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="bg-zinc-950 border-zinc-800 rounded-xl h-14 focus:ring-indigo-500"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-zinc-400 font-bold">Work Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="john@brand.com" 
                    required 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="bg-zinc-950 border-zinc-800 rounded-xl h-14 focus:ring-indigo-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website" className="text-zinc-400 font-bold">Website URL</Label>
                  <Input 
                    id="website" 
                    placeholder="brand.com" 
                    required 
                    value={formData.website}
                    onChange={(e) => setFormData({...formData, website: e.target.value})}
                    className="bg-zinc-950 border-zinc-800 rounded-xl h-14 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="help_type" className="text-zinc-400 font-bold">What do you need help with?</Label>
                <select 
                  id="help_type"
                  className="w-full h-14 px-4 rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-300 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  value={formData.help_type}
                  onChange={(e) => setFormData({...formData, help_type: e.target.value})}
                >
                  <option value="Automation">AI & Workflow Automation</option>
                  <option value="Marketing">Performance Marketing</option>
                  <option value="Data">E-commerce Data Ops</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-zinc-400 font-bold">What bottleneck are we solving?</Label>
                <Textarea 
                  id="message" 
                  placeholder="Tell us about your current challenges..." 
                  className="min-h-[120px] bg-zinc-950 border-zinc-800 rounded-xl focus:ring-indigo-500"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full py-8 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xl font-black shadow-xl shadow-indigo-500/20"
                disabled={loading}
              >
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                  <span className="flex items-center gap-2">
                    Book Strategy Call <Send className="w-5 h-5" />
                  </span>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LeadForm;