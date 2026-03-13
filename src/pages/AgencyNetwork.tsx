"use client";

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';
import { motion } from 'framer-motion';
import { 
  Globe, 
  ArrowRight, 
  CheckCircle2, 
  Loader2,
  Handshake,
  Star
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { showSuccess, showError } from '@/utils/toast';

const AgencyNetwork = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    expertise: '',
    portfolio: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from('leads').insert({
      email: formData.email,
      tool_used: 'agency_network_join',
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
      showSuccess("Request received!");
      setTimeout(() => {
        setSuccess(false);
        setFormData({ name: '', email: '', expertise: '', portfolio: '', message: '' });
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO title="Agency Network | Collaborate with Qala Labs" description="Freelancers, consultants, and experts: join our network and collaborate on 8-figure projects." />
      <Navbar />
      
      <main className="pt-40 pb-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Badge className="bg-blue-600 mb-6 px-4 py-1 rounded-full font-bold">The Network</Badge>
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 leading-tight tracking-tight">
                Let's build <br /> <span className="text-blue-600">together.</span>
              </h1>
              <p className="text-xl text-slate-600 mb-10 leading-relaxed">
                We're building a collective of the world's best freelancers, consultants, and niche experts. When we land a massive project, we tap into our network to deliver elite results.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "High-Ticket Projects", desc: "Work on 8-figure DTC brands and global enterprises.", icon: <Star className="w-5 h-5" /> },
                  { title: "Seamless Collaboration", desc: "We handle the sales and management; you focus on your craft.", icon: <Handshake className="w-5 h-5" /> },
                  { title: "Global Network", desc: "Connect with other top-tier experts in the growth ecosystem.", icon: <Globe className="w-5 h-5" /> }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{item.title}</h4>
                      <p className="text-sm text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden">
                <CardContent className="p-10 md:p-16 bg-slate-50">
                  {success ? (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-10 h-10 text-green-600" />
                      </div>
                      <h3 className="text-3xl font-black text-slate-900 mb-4">Request Received!</h3>
                      <p className="text-slate-500 text-lg">We'll review your expertise and reach out for a discovery call.</p>
                    </div>
                  ) : (
                    <>
                      <div className="mb-10">
                        <h3 className="text-3xl font-black text-slate-900 mb-2">Join the Network</h3>
                        <p className="text-slate-500">Tell us about your expertise and how you can help our clients scale.</p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <Label className="text-xs font-bold text-slate-700">Full Name</Label>
                            <Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="h-12 rounded-xl bg-white" />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs font-bold text-slate-700">Email</Label>
                            <Input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="h-12 rounded-xl bg-white" />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs font-bold text-slate-700">Primary Expertise</Label>
                          <select 
                            required
                            value={formData.expertise}
                            onChange={e => setFormData({...formData, expertise: e.target.value})}
                            className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white text-sm"
                          >
                            <option value="">Select Expertise</option>
                            <option value="Performance Marketing">Performance Marketing</option>
                            <option value="Creative/Design">Creative/Design</option>
                            <option value="Web Development">Web Development</option>
                            <option value="AI/Automation">AI/Automation</option>
                            <option value="Strategy/Consulting">Strategy/Consulting</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs font-bold text-slate-700">Portfolio / Website URL</Label>
                          <Input required value={formData.portfolio} onChange={e => setFormData({...formData, portfolio: e.target.value})} className="h-12 rounded-xl bg-white" placeholder="https://..." />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs font-bold text-slate-700">Tell us about your best project</Label>
                          <Textarea value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="rounded-xl min-h-[100px] bg-white" />
                        </div>
                        <Button type="submit" disabled={loading} className="w-full h-14 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black mt-4">
                          {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Submit Request"}
                        </Button>
                      </form>
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AgencyNetwork;