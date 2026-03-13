"use client";

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';
import { motion } from 'framer-motion';
import { 
  Instagram, 
  Users, 
  Heart, 
  Play, 
  ArrowRight, 
  CheckCircle2, 
  Loader2,
  Sparkles,
  Camera,
  Zap,
  TrendingUp
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { showSuccess, showError } from '@/utils/toast';

const creators = [
  { name: "Sarah J.", niche: "Lifestyle/DTC", reach: "250K+", image: "https://i.pravatar.cc/300?u=sarah" },
  { name: "Alex M.", niche: "Tech/Gadgets", reach: "100K+", image: "https://i.pravatar.cc/300?u=alex" },
  { name: "Priya K.", niche: "Fashion/Beauty", reach: "500K+", image: "https://i.pravatar.cc/300?u=priya" },
  { name: "David L.", niche: "Fitness/Health", reach: "150K+", image: "https://i.pravatar.cc/300?u=david" }
];

const CreatorCollective = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    handle: '',
    niche: '',
    reach: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from('leads').insert({
      email: formData.email,
      tool_used: 'creator_onboarding',
      data: {
        ...formData,
        timestamp: new Date().toISOString()
      }
    });

    setLoading(false);
    if (error) {
      showError("Something went wrong. Please try again.");
    } else {
      setSuccess(true);
      showSuccess("Onboarding request sent!");
      setTimeout(() => {
        setSuccess(false);
        setFormData({ name: '', email: '', handle: '', niche: '', reach: '' });
      }, 3000);
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

          {/* Creator Showcase */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-32">
            {creators.map((creator, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-xl"
              >
                <img src={creator.image} alt={creator.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-black text-xl mb-1">{creator.name}</p>
                  <p className="text-pink-400 text-xs font-bold uppercase tracking-widest">{creator.niche}</p>
                  <div className="flex items-center gap-2 mt-3 text-white/60 text-[10px] font-black uppercase tracking-widest">
                    <Users className="w-3 h-3" /> {creator.reach} Reach
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <div>
                <h2 className="text-4xl font-black text-slate-900 mb-6">Why join the collective?</h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  We don't treat you like a billboard. We treat you like a creative partner. Our brands are looking for long-term relationships, not one-off posts.
                </p>
              </div>
              
              <div className="grid gap-6">
                {[
                  { title: "Creative Freedom", desc: "We provide the brief, you provide the soul. We trust your voice.", icon: <Sparkles className="w-6 h-6" /> },
                  { title: "Premium Brands", desc: "Work with high-growth DTC brands that value quality content.", icon: <Zap className="w-6 h-6" /> },
                  { title: "Performance Data", desc: "See exactly how your content performs and learn what scales.", icon: <TrendingUp className="w-6 h-6" /> }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-6 p-8 bg-white rounded-[2rem] border border-slate-100 shadow-sm">
                    <div className="w-12 h-12 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-600 shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg">{item.title}</h4>
                      <p className="text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden">
              <CardContent className="p-10 md:p-16 bg-white">
                {success ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 mb-4">Onboarding Sent!</h3>
                    <p className="text-slate-500 text-lg">Our talent team will review your profile and reach out via email.</p>
                  </div>
                ) : (
                  <>
                    <div className="mb-10">
                      <h3 className="text-3xl font-black text-slate-900 mb-2">Apply to Join</h3>
                      <p className="text-slate-500">Ready to work with the world's best brands? Fill out the form below.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <Label className="text-xs font-bold text-slate-700">Full Name</Label>
                          <Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="h-12 rounded-xl" />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs font-bold text-slate-700">Email</Label>
                          <Input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="h-12 rounded-xl" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs font-bold text-slate-700">Instagram / TikTok Handle</Label>
                        <Input required value={formData.handle} onChange={e => setFormData({...formData, handle: e.target.value})} className="h-12 rounded-xl" placeholder="@yourhandle" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <Label className="text-xs font-bold text-slate-700">Primary Niche</Label>
                          <Input required value={formData.niche} onChange={e => setFormData({...formData, niche: e.target.value})} className="h-12 rounded-xl" placeholder="e.g. Lifestyle" />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs font-bold text-slate-700">Total Reach</Label>
                          <Input required value={formData.reach} onChange={e => setFormData({...formData, reach: e.target.value})} className="h-12 rounded-xl" placeholder="e.g. 100K" />
                        </div>
                      </div>
                      <Button type="submit" disabled={loading} className="w-full h-14 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-black mt-4">
                        {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Submit Onboarding"}
                      </Button>
                    </form>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CreatorCollective;