"use client";

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Instagram, 
  Users, 
  Heart, 
  ArrowRight, 
  CheckCircle2, 
  Loader2,
  Sparkles,
  Zap,
  TrendingUp,
  Globe,
  IndianRupee,
  Gift
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { showSuccess, showError } from '@/utils/toast';

const CreatorCollective = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    platforms: {
      instagram: { handle: '', followers: '' },
      tiktok: { handle: '', followers: '' },
      youtube: { handle: '', followers: '' },
      facebook: { handle: '', followers: '' },
      threads: { handle: '', followers: '' },
      quora: { handle: '', followers: '' },
      reddit: { handle: '', followers: '' },
      discord: { handle: '', followers: '' }
    },
    averagePayout: {
      reel: '',
      static: '',
      carousel: ''
    },
    acceptsBarter: false,
    barterValue: ''
  });

  const handlePlatformChange = (platform: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      platforms: {
        ...prev.platforms,
        [platform]: {
          ...prev.platforms[platform as keyof typeof prev.platforms],
          [field]: value
        }
      }
    }));
  };

  const handlePayoutChange = (type: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      averagePayout: {
        ...prev.averagePayout,
        [type]: value
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // 1. Capture in Supabase
    const { error } = await supabase.from('leads').insert({
      email: formData.email,
      tool_used: 'creator_onboarding_v2',
      data: {
        ...formData,
        timestamp: new Date().toISOString(),
        status: 'new'
      }
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
            tool_used: 'creator_onboarding_v2', 
            data: formData 
          })
        });
      } catch (err) {
        console.error("Email trigger failed:", err);
      }

      setLoading(false);
      setSuccess(true);
      showSuccess("Onboarding request sent!");
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        setSuccess(false);
        setFormData({
          name: '',
          email: '',
          platforms: {
            instagram: { handle: '', followers: '' },
            tiktok: { handle: '', followers: '' },
            youtube: { handle: '', followers: '' },
            facebook: { handle: '', followers: '' },
            threads: { handle: '', followers: '' },
            quora: { handle: '', followers: '' },
            reddit: { handle: '', followers: '' },
            discord: { handle: '', followers: '' }
          },
          averagePayout: { reel: '', static: '', carousel: '' },
          acceptsBarter: false,
          barterValue: ''
        });
      }, 5000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <SEO title="Creator Collective | Join the Qala Creator Network" description="Influencers and creators: join our collective and work with the world's fastest-growing DTC brands." />
      <Navbar />
      
      <main className="pt-40 pb-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <Badge className="bg-pink-600 text-white mb-6 px-4 py-1 rounded-full font-bold">The Collective</Badge>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tight">
              Creators of <span className="text-pink-600">Impact.</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              We bridge the gap between elite creators and 8-figure brands. No boring scripts, just authentic storytelling that converts.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Info */}
            <div className="lg:col-span-5 space-y-12">
              <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
                <h2 className="text-3xl font-black text-slate-900 mb-6">Why join?</h2>
                <div className="space-y-8">
                  {[
                    { title: "Creative Freedom", desc: "We provide the brief, you provide the soul. We trust your voice.", icon: <Sparkles className="w-6 h-6" /> },
                    { title: "Premium Brands", desc: "Work with high-growth DTC brands that value quality content.", icon: <Zap className="w-6 h-6" /> },
                    { title: "Performance Data", desc: "See exactly how your content performs and learn what scales.", icon: <TrendingUp className="w-6 h-6" /> }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-6">
                      <div className="w-12 h-12 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-600 shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-lg">{item.title}</h4>
                        <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-10 bg-slate-900 rounded-[3rem] text-white shadow-2xl">
                <h3 className="text-2xl font-bold mb-4">100+ creators joined.</h3>
                <p className="text-slate-400 mb-8">Our network includes some of the most influential voices in lifestyle, tech, and fashion.</p>
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-slate-900 bg-slate-800 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Creator" />
                    </div>
                  ))}
                  <div className="w-12 h-12 rounded-full border-4 border-slate-900 bg-pink-600 flex items-center justify-center text-[10px] font-black">
                    +95
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="lg:col-span-7">
              <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden">
                <CardContent className="p-8 md:p-12 bg-white">
                  {success ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-20"
                    >
                      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                        <CheckCircle2 className="w-12 h-12 text-green-600" />
                      </div>
                      <h3 className="text-4xl font-black text-slate-900 mb-4">Application Sent!</h3>
                      <p className="text-slate-500 text-lg max-w-md mx-auto">Our talent team will review your profile and reach out via email within 48 hours.</p>
                      <Button onClick={() => setSuccess(false)} variant="outline" className="mt-10 rounded-xl">Submit Another</Button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-10">
                      <div>
                        <h3 className="text-3xl font-black text-slate-900 mb-2">Apply to Join</h3>
                        <p className="text-slate-500">Tell us about your reach and creative style.</p>
                      </div>

                      {/* Basic Info */}
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Full Name</Label>
                            <Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="h-12 rounded-xl bg-slate-50 border-none" placeholder="John Doe" />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Email Address</Label>
                            <Input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="h-12 rounded-xl bg-slate-50 border-none" placeholder="john@example.com" />
                          </div>
                        </div>
                      </div>

                      {/* Platforms Grid */}
                      <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-4">
                          <Globe className="w-5 h-5 text-pink-600" />
                          <h4 className="font-black text-slate-900 uppercase tracking-widest text-sm">Social Platforms</h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                          {Object.keys(formData.platforms).map((platform) => (
                            <div key={platform} className="space-y-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                              <Label className="text-[10px] font-black uppercase tracking-widest text-pink-600">{platform}</Label>
                              <div className="space-y-2">
                                <Input 
                                  placeholder="Handle (@...)" 
                                  value={formData.platforms[platform as keyof typeof formData.platforms].handle}
                                  onChange={e => handlePlatformChange(platform, 'handle', e.target.value)}
                                  className="h-10 rounded-lg bg-white border-slate-200 text-sm"
                                />
                                <Input 
                                  placeholder="Followers (e.g. 50K)" 
                                  value={formData.platforms[platform as keyof typeof formData.platforms].followers}
                                  onChange={e => handlePlatformChange(platform, 'followers', e.target.value)}
                                  className="h-10 rounded-lg bg-white border-slate-200 text-sm"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Payouts */}
                      <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-4">
                          <IndianRupee className="w-5 h-5 text-pink-600" />
                          <h4 className="font-black text-slate-900 uppercase tracking-widest text-sm">Average Payouts (INR)</h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase text-slate-400">Per Reel</Label>
                            <Input placeholder="₹15,000" value={formData.averagePayout.reel} onChange={e => handlePayoutChange('reel', e.target.value)} className="h-12 rounded-xl bg-slate-50 border-none" />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase text-slate-400">Per Static</Label>
                            <Input placeholder="₹8,000" value={formData.averagePayout.static} onChange={e => handlePayoutChange('static', e.target.value)} className="h-12 rounded-xl bg-slate-50 border-none" />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase text-slate-400">Per Carousel</Label>
                            <Input placeholder="₹12,000" value={formData.averagePayout.carousel} onChange={e => handlePayoutChange('carousel', e.target.value)} className="h-12 rounded-xl bg-slate-50 border-none" />
                          </div>
                        </div>
                      </div>

                      {/* Barter */}
                      <div className="space-y-6 p-8 bg-pink-50 rounded-[2rem] border border-pink-100">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Gift className="w-5 h-5 text-pink-600" />
                            <div>
                              <h4 className="font-bold text-slate-900">Accept Barter?</h4>
                              <p className="text-xs text-slate-500">Willing to create content for product only?</p>
                            </div>
                          </div>
                          <Checkbox 
                            checked={formData.acceptsBarter} 
                            onCheckedChange={(checked) => setFormData({...formData, acceptsBarter: checked as boolean})}
                            className="w-6 h-6 rounded-lg border-pink-200 data-[state=checked]:bg-pink-600"
                          />
                        </div>
                        
                        <AnimatePresence>
                          {formData.acceptsBarter && (
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="pt-4 space-y-2">
                                <Label className="text-[10px] font-black uppercase text-pink-600">Minimum Product Value (INR)</Label>
                                <Input 
                                  placeholder="e.g. ₹5,000+" 
                                  value={formData.barterValue} 
                                  onChange={e => setFormData({...formData, barterValue: e.target.value})}
                                  className="h-12 rounded-xl bg-white border-pink-200" 
                                />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <Button type="submit" disabled={loading} className="w-full h-16 rounded-2xl bg-pink-600 hover:bg-pink-700 text-white font-black text-xl shadow-xl shadow-pink-500/20 transition-all">
                        {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Submit Onboarding"}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CreatorCollective;