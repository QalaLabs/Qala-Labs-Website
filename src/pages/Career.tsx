"use client";

import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
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
  Code2,
  Palette,
  ArrowRight,
  CheckCircle2,
  Loader2,
  X,
  Paperclip
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { showSuccess, showError } from '@/utils/toast';

const DRIVE_FOLDER_URL = "https://drive.google.com/drive/folders/1bt6G3KeQYycGlwvyvYBY44vjoROVsCm1";

const jobs = [
  {
    id: 'video-editor',
    title: "Video Editor",
    icon: <Video className="w-6 h-6" />,
    type: "Full-time / On-site",
    salary: "₹30,000 - ₹40,000",
    desc: "Cut high-converting short-form ad creatives for DTC brands across Meta, Instagram Reels, and YouTube Shorts. You'll work from raw footage and UGC clips to produce 10–30 second ads that stop the scroll. Proficiency in Premiere Pro or CapCut is required. Bonus points for motion graphics and subtitle styling."
  },
  {
    id: 'copywriter',
    title: "Copywriter",
    icon: <PenTool className="w-6 h-6" />,
    type: "Full-time / On-site",
    salary: "₹30,000 - ₹40,000",
    desc: "Write ad hooks, primary text, and landing page copy that converts cold traffic into buyers. You'll craft 3–5 ad variants per creative batch, A/B test headline angles, and iterate based on CTR and hook-rate data. Strong grasp of pain-point-led copywriting frameworks (PAS, AIDA) is essential."
  },
  {
    id: 'content-creator',
    title: "Content Creator (UGC)",
    icon: <User className="w-6 h-6" />,
    type: "Full-time / On-site",
    salary: "₹30,000 - ₹40,000",
    desc: "Be the face of our clients' brands in authentic, on-camera UGC ad creatives. You'll film yourself using products, reviewing them, or narrating problem-solution stories — all from your phone. Comfortable on camera, natural delivery, and quick turnaround are non-negotiables."
  },
  {
    id: 'automation-specialist',
    title: "Automation Specialist",
    icon: <Zap className="w-6 h-6" />,
    type: "Full-time / On-site",
    salary: "₹30,000 - ₹40,000",
    desc: "Build the operational backbone. You'll design and deploy automated workflows using n8n, Make.com, and AI agents to eliminate repetitive work across client reporting, lead routing, and content operations. Hands-on experience with at least one automation platform and a hunger to learn AI tooling is required."
  },
  {
    id: 'ecom-manager',
    title: "eCommerce Manager",
    icon: <ShoppingCart className="w-6 h-6" />,
    type: "Full-time / On-site",
    salary: "₹30,000 - ₹40,000",
    desc: "Manage Shopify storefronts end-to-end — product listings, collection pages, conversion rate optimization, and Amazon/Flipkart marketplace presence. You'll coordinate with ad managers to align offers with campaigns and monitor store metrics daily. 1+ year of hands-on Shopify experience required."
  },
  {
    id: 'performance-marketing',
    title: "Performance Marketing Manager",
    icon: <TrendingUp className="w-6 h-6" />,
    type: "Full-time / On-site",
    salary: "₹30,000 - ₹40,000",
    desc: "Own Meta and Google ad accounts for DTC clients from ₹50K to ₹5L/month ad spend. You'll set up campaigns, test creative variations, analyze attribution data, and scale winners. ROAS targets are real — you'll be held accountable to them. Prior experience managing paid media budgets of at least ₹1L/month is required."
  },
  {
    id: 'graphic-designer',
    title: "Graphic Designer",
    icon: <Palette className="w-6 h-6" />,
    type: "Full-time / On-site",
    salary: "₹30,000 - ₹40,000",
    desc: "Design static and animated ad creatives, social media assets, and brand collateral for DTC clients. You'll produce scroll-stopping visuals for Meta, Google Display, and email campaigns — fast. Proficiency in Figma and Adobe Creative Suite required. A portfolio of performance-oriented design (not just pretty work) is a must."
  },
  {
    id: 'vibe-coder',
    title: "Vibe Coder",
    icon: <Code2 className="w-6 h-6" />,
    type: "Full-time / On-site",
    salary: "₹30,000 - ₹40,000",
    desc: "Ship internal tools, client dashboards, and automation integrations using AI-assisted development. You'll use Cursor, Copilot, or Replit to prototype fast — no red tape, no legacy codebase politics. Stack: React, Supabase, n8n, and whatever gets the job done. Show us something you built with AI and we'll talk."
  }
];

const jobPostingSchema = {
  "@context": "https://schema.org",
  "@graph": jobs.map(job => ({
    "@type": "JobPosting",
    "title": job.title,
    "description": job.desc,
    "identifier": {
      "@type": "PropertyValue",
      "name": "Qala Labs",
      "value": job.id
    },
    "datePosted": "2025-05-01",
    "validThrough": "2025-12-31T23:59",
    "employmentType": ["FULL_TIME"],
    "hiringOrganization": {
      "@type": "Organization",
      "name": "Qala Labs",
      "sameAs": "https://qalalabs.com",
      "logo": "https://qalalabs.com/favicon.svg"
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "New Delhi",
        "addressRegion": "Delhi",
        "addressCountry": "IN"
      }
    },
    "baseSalary": {
      "@type": "MonetaryAmount",
      "currency": "INR",
      "value": {
        "@type": "QuantitativeValue",
        "minValue": 30000,
        "maxValue": 40000,
        "unitText": "MONTH"
      }
    }
  }))
};

const Career = () => {
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    portfolio: '',
    resume_link: '',
    message: ''
  });

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowed.includes(file.type)) {
        showError("Please upload a PDF or Word document.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        showError("File must be under 5 MB.");
        return;
      }
      setResumeFile(file);
    }
  };

  const uploadResume = async (file: File, applicantName: string): Promise<string | null> => {
    const ext = file.name.split('.').pop();
    const safeName = applicantName.replace(/\s+/g, '_').toLowerCase();
    const path = `resumes/${selectedJob.id}/${safeName}_${Date.now()}.${ext}`;

    const { error } = await supabase.storage
      .from('career-resumes')
      .upload(path, file, { contentType: file.type, upsert: false });

    if (error) {
      console.error("Resume upload error:", error);
      return null;
    }

    const { data } = supabase.storage.from('career-resumes').getPublicUrl(path);
    return data?.publicUrl ?? null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let resumeUrl: string | null = null;

    if (resumeFile) {
      resumeUrl = await uploadResume(resumeFile, formData.name);
      if (!resumeUrl) {
        showError("Resume upload failed. Please try again.");
        setLoading(false);
        return;
      }
    }

    const leadData = {
      ...formData,
      job_title: selectedJob.title,
      resume_url: resumeUrl,
      drive_folder: DRIVE_FOLDER_URL,
      timestamp: new Date().toISOString()
    };

    const { error } = await supabase.from('leads').insert({
      email: formData.email,
      tool_used: 'career_application',
      data: leadData
    });

    if (error) {
      setLoading(false);
      showError("Something went wrong. Please try again.");
    } else {
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
        setResumeFile(null);
        setFormData({ name: '', email: '', phone: '', portfolio: '', resume_link: '', message: '' });
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(jobPostingSchema)}
        </script>
      </Helmet>
      <SEO
        title="Careers at Qala Labs | Join a DTC Performance Marketing Agency India"
        description="Work on 8-figure DTC brands — Meta Ads, AI automation, UGC, ecommerce. Join Qala Labs and build the next generation of revenue growth engines."
      />
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
                    <div className="flex items-center gap-2 mb-6">
                      <Badge variant="secondary" className="text-xs">{job.type}</Badge>
                      <Badge variant="secondary" className="text-xs">{job.salary}</Badge>
                    </div>
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
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative w-full max-w-xl bg-white rounded-[3rem] overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
              <button onClick={() => setSelectedJob(null)} className="absolute top-6 right-6 z-10 p-2 hover:bg-slate-100 rounded-full transition-colors"><X className="w-6 h-6 text-slate-400" /></button>
              <div className="p-10 md:p-16">
                {success ? (
                  <div className="text-center py-12"><div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle2 className="w-10 h-10 text-green-600" /></div><h3 className="text-3xl font-black text-slate-900 mb-4">Application Sent!</h3></div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="mb-6"><Badge className="bg-blue-600 mb-2">Applying for {selectedJob.title}</Badge><h3 className="text-2xl font-black text-slate-900">Show us your best work.</h3></div>
                    <div className="space-y-1"><Label className="text-xs font-bold text-slate-700">Full Name</Label><Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="h-12 rounded-xl" /></div>
                    <div className="space-y-1"><Label className="text-xs font-bold text-slate-700">Email Address</Label><Input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="h-12 rounded-xl" /></div>
                    <div className="space-y-1"><Label className="text-xs font-bold text-slate-700">Phone Number</Label><Input type="tel" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="h-12 rounded-xl" placeholder="+91 98765 43210" /></div>
                    <div className="space-y-1"><Label className="text-xs font-bold text-slate-700">Portfolio / LinkedIn URL</Label><Input required value={formData.portfolio} onChange={e => setFormData({...formData, portfolio: e.target.value})} className="h-12 rounded-xl" placeholder="https://..." /></div>
                    <div className="space-y-1"><Label className="text-xs font-bold text-slate-700">Resume Link <span className="text-slate-400 font-normal">(Google Drive / Dropbox)</span></Label><Input value={formData.resume_link} onChange={e => setFormData({...formData, resume_link: e.target.value})} className="h-12 rounded-xl" placeholder="https://drive.google.com/..." /></div>
                    <div className="space-y-1">
                      <Label className="text-xs font-bold text-slate-700">Resume / CV <span className="text-slate-400 font-normal">(PDF or Word, max 5 MB)</span></Label>
                      <label className="flex items-center gap-3 h-12 px-4 rounded-xl border border-input bg-background cursor-pointer hover:bg-slate-50 transition-colors">
                        <Paperclip className="w-4 h-4 text-slate-400 shrink-0" />
                        <span className="text-sm text-slate-500 truncate">
                          {resumeFile ? resumeFile.name : "Click to attach your resume"}
                        </span>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleResumeChange}
                          className="sr-only"
                        />
                      </label>
                    </div>
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
