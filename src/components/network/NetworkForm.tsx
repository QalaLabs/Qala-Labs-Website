"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2, Loader2, IndianRupee, Plus, Trash2 } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { showSuccess, showError } from '@/utils/toast';
import { cn } from '@/lib/utils';

const expertiseOptions: Record<string, string[]> = {
  "Performance Marketing": ["Meta Ads", "Google Ads", "TikTok Ads", "Amazon Ads", "Snapchat Ads"],
  "Creative/Design": ["Video Editing", "Graphic Design", "UGC Production", "Branding", "Motion Graphics"],
  "Web Development": ["Shopify", "React/Next.js", "WordPress", "Headless Commerce", "UI/UX Design"],
  "AI/Automation": ["n8n/Make.com", "AI Agents", "CRM Automation", "Custom LLM Tools"],
  "Strategy/Consulting": ["E-com Growth", "Fractional CMO", "Operations", "Inventory Strategy"]
};

const NetworkForm = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    expertise: '',
    selectedNiches: {} as Record<string, string>, // nicheName: price
    portfolio: '',
    message: ''
  });

  const handleExpertiseChange = (val: string) => {
    setFormData({ ...formData, expertise: val, selectedNiches: {} });
  };

  const toggleNiche = (niche: string) => {
    const newNiches = { ...formData.selectedNiches };
    if (newNiches[niche] !== undefined) {
      delete newNiches[niche];
    } else {
      newNiches[niche] = '';
    }
    setFormData({ ...formData, selectedNiches: newNiches });
  };

  const handlePriceChange = (niche: string, price: string) => {
    setFormData({
      ...formData,
      selectedNiches: { ...formData.selectedNiches, [niche]: price }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (Object.keys(formData.selectedNiches).length === 0) {
      showError("Please select at least one niche.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from('leads').insert({
      email: formData.email,
      tool_used: 'agency_network_join_v2',
      data: {
        ...formData,
        timestamp: new Date().toISOString(),
        status: 'new'
      }
    });

    setLoading(false);
    if (error) {
      showError("Something went wrong. Please try again.");
    } else {
      setSuccess(true);
      showSuccess("Application received!");
      setTimeout(() => {
        setSuccess(false);
        setFormData({ name: '', email: '', expertise: '', selectedNiches: {}, portfolio: '', message: '' });
      }, 5000);
    }
  };

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-tight">
              Ready to scale <br /> with us?
            </h2>
            <p className="text-xl text-slate-600 mb-12 leading-relaxed">
              We're looking for partners who are obsessed with results. If you have a proven track record in performance marketing, creative, or tech, we want to hear from you.
            </p>
            
            <div className="p-8 bg-blue-600 rounded-[3rem] text-white shadow-2xl shadow-blue-500/20">
              <h4 className="text-xl font-bold mb-4">What happens next?</h4>
              <ul className="space-y-4 text-blue-100">
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-white" /> Our team reviews your portfolio</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-white" /> 15-min discovery call</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-white" /> Added to our priority partner list</li>
              </ul>
            </div>
          </div>

          <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden">
            <CardContent className="p-10 md:p-16 bg-white">
              {success ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 mb-4">Request Received!</h3>
                  <p className="text-slate-500 text-lg">We'll review your expertise and reach out for a discovery call soon.</p>
                </div>
              ) : (
                <>
                  <div className="mb-10">
                    <h3 className="text-3xl font-black text-slate-900 mb-2">Join the Network</h3>
                    <p className="text-slate-500">Tell us about your expertise and how you can help our clients scale.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label className="text-xs font-bold text-slate-700">Full Name</Label>
                        <Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="h-12 rounded-xl bg-slate-50 border-none" />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs font-bold text-slate-700">Email</Label>
                        <Input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="h-12 rounded-xl bg-slate-50 border-none" />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <Label className="text-xs font-bold text-slate-700">Primary Expertise</Label>
                        <select 
                          required
                          value={formData.expertise}
                          onChange={e => handleExpertiseChange(e.target.value)}
                          className="w-full h-12 px-4 rounded-xl border-none bg-slate-50 text-sm font-medium"
                        >
                          <option value="">Select Expertise</option>
                          {Object.keys(expertiseOptions).map(exp => (
                            <option key={exp} value={exp}>{exp}</option>
                          ))}
                        </select>
                      </div>

                      <AnimatePresence mode="wait">
                        {formData.expertise && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="space-y-6"
                          >
                            <div className="space-y-3">
                              <Label className="text-xs font-black uppercase tracking-widest text-blue-600">Select Your Niches</Label>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {expertiseOptions[formData.expertise].map(niche => (
                                  <div 
                                    key={niche} 
                                    onClick={() => toggleNiche(niche)}
                                    className={cn(
                                      "flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all",
                                      formData.selectedNiches[niche] !== undefined 
                                        ? "bg-blue-50 border-blue-200" 
                                        : "bg-white border-slate-100 hover:border-blue-100"
                                    )}
                                  >
                                    <Checkbox 
                                      checked={formData.selectedNiches[niche] !== undefined}
                                      onCheckedChange={() => toggleNiche(niche)}
                                      className="data-[state=checked]:bg-blue-600"
                                    />
                                    <span className="text-sm font-bold text-slate-700">{niche}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {Object.keys(formData.selectedNiches).length > 0 && (
                              <div className="space-y-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                <Label className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                                  <IndianRupee className="w-3 h-3" /> Pricing per Niche (Starting at)
                                </Label>
                                <div className="space-y-3">
                                  {Object.keys(formData.selectedNiches).map(niche => (
                                    <div key={niche} className="flex items-center gap-4">
                                      <span className="text-xs font-bold text-slate-600 w-32 truncate">{niche}</span>
                                      <div className="relative flex-1">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">₹</span>
                                        <Input 
                                          placeholder="e.g. 25,000" 
                                          value={formData.selectedNiches[niche]}
                                          onChange={e => handlePriceChange(niche, e.target.value)}
                                          className="h-10 pl-7 rounded-lg bg-white border-slate-200 text-sm"
                                          required
                                        />
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="space-y-1">
                      <Label className="text-xs font-bold text-slate-700">Portfolio / Website URL</Label>
                      <Input required value={formData.portfolio} onChange={e => setFormData({...formData, portfolio: e.target.value})} className="h-12 rounded-xl bg-slate-50 border-none" placeholder="https://..." />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs font-bold text-slate-700">Tell us about your best project</Label>
                      <Textarea value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="rounded-xl min-h-[100px] bg-slate-50 border-none" />
                    </div>
                    <Button type="submit" disabled={loading} className="w-full h-14 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black mt-4 shadow-xl shadow-blue-500/20">
                      {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Submit Application"}
                    </Button>
                  </form>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default NetworkForm;