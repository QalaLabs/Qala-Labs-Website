"use client";

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Video,
  PenTool,
  Zap,
  ShoppingCart,
  TrendingUp,
  User,
  Clock,
  IndianRupee,
  ArrowRight,
  CheckCircle2,
  Loader2,
  X
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { showSuccess, showError } from '@/utils/toast';

const jobs = [
  { id: 'video-editor', title: "Video Editor", icon: <Video className="w-6 h-6" />, type: "Full-time / Remote", salary: "₹30,000 - ₹40,000", desc: "Create high-velocity ad creatives for DTC brands." },
  { id: 'copywriter', title: "Copywriter", icon: <PenTool className="w-6 h-6" />, type: "Full-time / Remote", salary: "₹30,000 - ₹40,000", desc: "Write ad hooks that stop the scroll and landing page copy that converts." },
  { id: 'content-creator', title: "Content Creator", icon: <User className="w-6 h-6" />, type: "Full-time / Remote", salary: "₹30,000 - ₹40,000", desc: "On-camera talent for UGC ads." },
  { id: 'automation-specialist', title: "Automation Specialist", icon: <Zap className="w-6 h-6" />, type: "Full-time / Remote", salary: "₹30,000 - ₹40,000", desc: "Build the engine. Expert in n8n, Make.com, and AI agents." },
  { id: 'ecom-manager', title: "eCommerce Manager", icon: <ShoppingCart className="w-6 h-6" />, type: "Full-time / Remote", salary: "₹30,000 - ₹40,000", desc: "Manage Shopify storefronts and marketplace listings." },
  { id: 'performance-marketing', title: "Performance Marketing Manager", icon: <TrendingUp className="w-6 h-6" />, type: "Full-time / Remote", salary: "₹30,000 - ₹40,000", desc: "Scale Meta and Google ad accounts profitably." }
];

const Career = () => {
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    portfolio: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const leadData = {
      ...formData,
      job_title: selectedJob.title,
      timestamp: new Date().toISOString()
    };

    // 1. Capture in Supabase
    const { error } = await supabase.from('leads').insert({
      email: formData.email,
      tool_used: 'career_application',
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
            tool_used: 'career_application', 
            data: leadData 
          })
        });
      } catch (err) {
        console.error("Email trigger failed:", err);
      }

      setLoading(false);
      setSuccess(true);
      showSuccess("Application sent!");
      setTimeout(() => {
        setSelectedJob(null);
        setSuccess(false);
        setFormData({ name: '', email: '', portfolio: '', message: '' });
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <SEO title="Careers | Join the Scale Engine" description="Join Qala Labs and help us build 8-figure revenue engines." />
      <Navbar />
      
      <main className="pt-40 pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <Badge className="bg-blue-600/10 text-blue-700 border-none mb-6 px-4 py-1 rounded-full font-bold">We're Hiring</Badge>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tight">Join the <span className="text-blue-600">Scale Engine.</span></h1>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.map((job, i) => (
              <motion.div key={job.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="border-none shadow-xl hover:shadow-2xl transition-all rounded-[2.5rem] bg-white h-full flex flex-col group">
                  <CardContent className="p-10 flex-1 flex flex-col">
                    <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-8 group-hover:bg-blue-600 group-hover:text-white transition-colors">{job.icon}</div>
                    <h3 className="text-2xl font-black text-slate-900 mb-4">{job.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-1">{job.desc}</p>
                    <Button onClick={() => setSelectedJob(job)} className="w-full py-6 rounded-2xl bg-slate-900 hover:bg-blue-600 text-white font-black transition-all">Apply Now <ArrowRight className="ml-2 w-4 h-4" /></Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedJob(null)} className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative w-full max-w-xl bg-white rounded-[3rem] overflow-hidden shadow-2xl">
              <button onClick={() => setSelectedJob(null)} className="absolute top-6 right-6 z-10 p-2 hover:bg-slate-100 rounded-full transition-colors"><X className="w-6 h-6 text-slate-400" /></button>
              <div className="p-10 md:p-16">
                {success ? (
                  <div className="text-center py-12"><div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle2 className="w-10 h-10 text-green-600" /></div><h3 className="text-3xl font-black text-slate-900 mb-4">Application Sent!</h3></div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="mb-6"><Badge className="bg-blue-600 mb-2">Applying for {selectedJob.title}</Badge><h3 className="text-2xl font-black text-slate-900">Show us your best work.</h3></div>
                    <div className="space-y-1"><Label className="text-xs font-bold text-slate-700">Full Name</Label><Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="h-12 rounded-xl" /></div>
                    <div className="space-y-1"><Label className="text-xs font-bold text-slate-700">Email Address</Label><Input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="h-12 rounded-xl" /></div>
                    <div className="space-y-1"><Label className="text-xs font-bold text-slate-700">Portfolio / LinkedIn URL</Label><Input required value={formData.portfolio} onChange={e => setFormData({...formData, portfolio: e.target.value})} className="h-12 rounded-xl" placeholder="https://..." /></div>
                    <div className="space-y-1"><Label className="text-xs font-bold text-slate-700">Why Qala Labs?</Label><Textarea value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="rounded-xl min-h-[100px]" /></div>
                    <Button type="submit" disabled={loading} className="w-full h-14 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black mt-4">{loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Submit Application"}</Button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
};

export default Career;