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
    desc: "Shoot and edit high-converting UGC, creator funnels, and direct-response video ads for Meta, Reels, and YouTube Shorts. You'll own the full pipeline — from capturing product b-roll and creator-style footage to engineering hooks, pacing, and transitions that maximise watch-time. Adobe Premiere Pro and After Effects are non-negotiable. Hands-on cinematography skills (lighting, audio, vertical formats) required. Bonus: experience with AI pipelines (OpenAI, Claude, AI audio/video tools) to accelerate post-production."
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
    title: "Ecommerce Manager",
    icon: <ShoppingCart className="w-6 h-6" />,
    type: "Full-time / On-site",
    salary: "₹30,000 - ₹40,000",
    desc: "Own marketplace operations across Amazon (Seller & Vendor Central), Myntra, and Flipkart — from catalog compliance and inventory sync to pricing mechanics that maximise AOV and LTV. You'll physically audit packaging and fulfillment, document processes for dispute resolution, and keep seller metrics healthy. Strong data literacy to act on sales velocity reports and platform SEO is essential. Experience using OpenAI or Claude to scale bulk catalog updates and metadata creation is a strong advantage."
  },
  {
    id: 'performance-marketing',
    title: "Digital Marketing Manager",
    icon: <TrendingUp className="w-6 h-6" />,
    type: "Full-time / On-site",
    salary: "₹30,000 - ₹40,000",
    desc: "Deploy and scale full-funnel paid media across Meta, Google, and Amazon to lower CAC and improve blended ROAS — while syncing organic social to amplify paid efforts. You'll run daily budget pacing, rapid creative testing, and cohort analyses to isolate what's working. Comfort directing quick-turnaround on-camera content to jump on trends is a big plus. Verifiable hands-on experience in Meta Ads Manager, Google Ads, and Amazon Ads required. Experience using Claude and OpenAI for competitive research and copy iteration preferred."
  },
  {
    id: 'graphic-designer',
    title: "Graphic Designer",
    icon: <Palette className="w-6 h-6" />,
    type: "Full-time / On-site",
    salary: "₹30,000 - ₹40,000",
    desc: "Concept, shoot, and execute high-velocity static and dynamic creatives for DTC and B2B paid media. You'll handle product photography, basic styling, and build a raw asset library — then turn those assets into thumb-stopping ads that communicate value in under two seconds. Advanced Adobe Suite (Photoshop, Illustrator, After Effects) mastery required. Hands-on photography skills and experience with generative AI tools (Midjourney, DALL-E, Claude) are a strong plus. Portfolio must show direct-response work, not just branding."
  },
  {
    id: 'vibe-coder',
    title: "Vibe Coder",
    icon: <Code2 className="w-6 h-6" />,
    type: "Full-time / On-site",
    salary: "₹30,000 - ₹40,000",
    desc: "Build, deploy, and demo functional storefronts, AI agents, and automation systems that directly drive revenue. You'll prototype fast, record and present technical flows for client showcases, and maintain back-end pipelines that eliminate checkout friction. Deep experience with OpenAI and Claude APIs for business automation is required. Proficiency in modern web frameworks and platforms like Antigravity is a plus. Builder's mindset is non-negotiable — show us something you shipped."
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
