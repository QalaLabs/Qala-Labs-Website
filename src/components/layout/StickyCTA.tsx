"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2, CheckCircle2, ChevronUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { showSuccess, showError } from '@/utils/toast';
import { useUTM } from '@/hooks/useUTM';
import { cn } from '@/lib/utils';

const services = [
  "Performance Marketing",
  "Creative Production",
  "Web Development",
  "Conversion Optimization",
  "Analytics & Data",
  "eCommerce Growth"
];

const StickyCTA = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const utmData = useUTM();

  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    service: '',
    budget: ''
  });

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const leadData = {
      ...formData,
      ...utmData,
      source_url: window.location.href,
      status: 'new',
      timestamp: new Date().toISOString()
    };

    // 1. Capture in Supabase
    const { error } = await supabase.from('leads').insert({
      email: formData.email,
      tool_used: 'sticky_cta_microform',
      data: leadData
    });

    if (error) {
      setLoading(false);
      showError("Something went wrong. Please try again.");
    } else {
      // 2. Trigger immediate personalized email
      try {
        await fetch('/api/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            email: formData.email, 
            tool_used: 'sticky_cta_microform', 
            data: leadData 
          })
        });
      } catch (err) {
        console.error("Email trigger failed:", err);
      }

      setLoading(false);
      setSuccess(true);
      showSuccess("Strategy incoming!");
      setTimeout(() => {
        setIsOpen(false);
        setSuccess(false);
        setFormData({ email: '', phone: '', service: '', budget: '' });
      }, 3000);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-[60] p-4 md:p-6 pointer-events-none"
          >
            <div className="max-w-7xl mx-auto flex justify-center md:justify-end">
              <div className="pointer-events-auto bg-slate-900 text-white rounded-2xl shadow-2xl border border-white/10 flex items-center gap-4 p-2 pl-6">
                <span className="hidden md:inline text-sm font-bold text-slate-400">Ready to Scale?</span>
                <Button 
                  onClick={() => setIsOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-black px-8 py-6 rounded-xl flex items-center gap-2"
                >
                  Request Growth Plan <ChevronUp className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")} />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsOpen(false)} className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[70]" />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-[80] shadow-2xl p-8 md:p-12 flex flex-col overflow-y-auto"
            >
              <button onClick={() => setIsOpen(false)} aria-label="Close growth plan form" className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"><X className="w-6 h-6 text-slate-400" aria-hidden="true" /></button>

              <div className="flex-1 flex flex-col justify-center">
                {success ? (
                  <div className="text-center">
                    <CheckCircle2 className="w-20 h-20 text-green-600 mx-auto mb-6" />
                    <h3 className="text-3xl font-black text-slate-900 mb-4">Strategy Incoming!</h3>
                    <p className="text-slate-500">Check your inbox. Our team is already analyzing your potential.</p>
                  </div>
                ) : (
                  <>
                    <div className="mb-8">
                      <Badge className="bg-blue-600 mb-4">8-Figure Framework</Badge>
                      <h3 className="text-3xl font-black text-slate-900 leading-tight">Get Your Custom <span className="text-blue-600">Growth Roadmap.</span></h3>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-1">
                        <Label className="text-xs font-bold text-slate-700">Work Email</Label>
                        <Input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="h-12 rounded-xl" />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs font-bold text-slate-700">Phone (WhatsApp)</Label>
                        <Input type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="h-12 rounded-xl" />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs font-bold text-slate-700">Interested Service</Label>
                        <select 
                          required
                          value={formData.service}
                          onChange={(e) => setFormData({...formData, service: e.target.value})}
                          className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white text-sm"
                        >
                          <option value="">Select Service</option>
                          {services.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs font-bold text-slate-700">Monthly Ad Spend (₹)</Label>
                        <select 
                          required
                          value={formData.budget}
                          onChange={(e) => setFormData({...formData, budget: e.target.value})}
                          className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white text-sm"
                        >
                          <option value="">Select range</option>
                          <option value="<5L">{"< ₹5L/mo"}</option>
                          <option value="5L-15L">₹5L - ₹15L/mo</option>
                          <option value="50L+">₹50L+/mo</option>
                        </select>
                      </div>
                      <Button type="submit" disabled={loading} className="w-full h-14 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black">
                        {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Send My Roadmap"}
                      </Button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default StickyCTA;