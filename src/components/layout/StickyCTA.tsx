"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2, CheckCircle2, ChevronUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { showSuccess, showError } from '@/utils/toast';
import { useUTM } from '@/hooks/useUTM';
import { cn } from '@/lib/utils';

const StickyCTA = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const utmData = useUTM();

  const [formData, setFormData] = useState({
    email: '',
    budget: ''
  });

  // Show CTA after scrolling 300px
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from('leads').insert({
      email: formData.email,
      tool_used: 'sticky_cta_microform',
      data: {
        ...formData,
        ...utmData,
        timestamp: new Date().toISOString(),
        page_url: window.location.href
      }
    });

    setLoading(false);
    if (error) {
      showError("Something went wrong. Please try again.");
    } else {
      setSuccess(true);
      showSuccess("Strategy incoming! Check your inbox.");
      setTimeout(() => {
        setIsOpen(false);
        setSuccess(false);
        setFormData({ email: '', budget: '' });
      }, 3000);
    }
  };

  return (
    <>
      {/* Sticky Bar */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-[60] p-4 md:p-6 pointer-events-none"
          >
            <div className="max-w-7xl mx-auto flex justify-center md:justify-end">
              <div className="pointer-events-auto bg-slate-900 text-white rounded-2xl md:rounded-full shadow-2xl border border-white/10 flex items-center gap-4 p-2 pl-6 overflow-hidden">
                <span className="hidden md:inline text-sm font-bold text-slate-400">Ready to Scale?</span>
                <Button 
                  onClick={() => setIsOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-black px-8 py-6 rounded-xl md:rounded-full text-sm md:text-base shadow-lg shadow-blue-500/20 flex items-center gap-2"
                >
                  Request Growth Plan <ChevronUp className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")} />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slide-out Microform */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[70]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-[80] shadow-2xl p-8 md:p-12 flex flex-col"
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors"
                aria-label="Close form"
              >
                <X className="w-6 h-6 text-slate-400" />
              </button>

              <div className="flex-1 flex flex-col justify-center">
                {success ? (
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center"
                  >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 mb-4">Strategy Incoming!</h3>
                    <p className="text-slate-500 text-lg">Check your inbox. Our team is already analyzing your brand's potential.</p>
                  </motion.div>
                ) : (
                  <>
                    <div className="mb-10">
                      <Badge className="bg-blue-600 mb-4">8-Figure Framework</Badge>
                      <h3 className="text-4xl font-black text-slate-900 mb-4 leading-tight">
                        Get Your Custom <br /> <span className="text-blue-600">Growth Roadmap.</span>
                      </h3>
                      <p className="text-slate-500">Enter your details below and we'll send a personalized performance audit within 24 hours.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="cta-email" className="text-sm font-bold text-slate-700">Work Email</Label>
                        <Input 
                          id="cta-email"
                          type="email"
                          placeholder="john@brand.com"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="h-14 rounded-xl border-slate-200 focus:ring-blue-600"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cta-budget" className="text-sm font-bold text-slate-700">Monthly Ad Spend (₹)</Label>
                        <select 
                          id="cta-budget"
                          required
                          value={formData.budget}
                          onChange={(e) => setFormData({...formData, budget: e.target.value})}
                          className="w-full h-14 px-4 rounded-xl border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-blue-600 outline-none"
                        >
                          <option value="">Select range</option>
                          <option value="<5L">{"< ₹5L/mo"}</option>
                          <option value="5L-15L">₹5L - ₹15L/mo</option>
                          <option value="15L-50L">₹15L - ₹50L/mo</option>
                          <option value="50L+">₹50L+/mo</option>
                        </select>
                      </div>
                      
                      <p className="text-[10px] text-slate-400 leading-relaxed">
                        By clicking below, you agree to our Privacy Policy. We'll only use your data to provide the requested audit and relevant growth insights.
                      </p>

                      <Button 
                        type="submit" 
                        disabled={loading}
                        className="w-full h-16 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-lg font-black shadow-xl shadow-blue-500/20"
                      >
                        {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                          <span className="flex items-center gap-2">
                            Send My Roadmap <Send className="w-5 h-5" />
                          </span>
                        )}
                      </Button>
                    </form>
                  </>
                )}
              </div>

              <div className="mt-auto pt-8 border-t border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 font-medium">
                    Joined by <span className="text-slate-900 font-bold">500+ founders</span> this month.
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default StickyCTA;