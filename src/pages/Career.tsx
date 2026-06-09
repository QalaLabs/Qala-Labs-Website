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
  Paperclip,
  ListChecks,
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

const DRIVE_FOLDER_URL = "https://drive.google.com/drive/folders/1bt6G3KeQYycGlwvyvYBY44vjoROVsCm1";

const jobs = [
  {
    id: 'video-editor',
    title: "Video Editor",
    role: "Attention Architect, UGC Direct-Response Editor & Creative Videographer",
    icon: <Video className="w-6 h-6" />,
    type: "Full-time / On-site",
    salary: "₹30,000 - ₹40,000",
    desc: "Shoot and edit high-converting UGC, creator funnels, and direct-response video ads for Meta, Reels, and YouTube Shorts.",
    responsibilities: [
      "Shoot and capture high-quality, conversion-focused raw footage, product b-roll, and creator-style UGC content.",
      "Edit high-converting UGC, creator funnels, and video ads designed for Meta, Reels, and YouTube Shorts.",
      "Engineer pacing, hooks, and visual transitions that optimise viewer retention and maximise watch-time metrics.",
      "Collaborate with the creative team to analyse ad fatigue and systematically test video variables (alternative hooks, CTA variations)."
    ],
    requirements: [
      "Hands-on cinematography skills with a strong understanding of lighting, audio framing, and mobile/studio camera operations for vertical content formats.",
      "Advanced proficiency in the Adobe Suite — Premiere Pro and After Effects are non-negotiable.",
      "Familiarity with leveraging AI pipelines (OpenAI, Claude, and AI audio/video tools) to maximise post-production efficiency.",
      "Deep understanding of social media pacing, internet subcultures, and consumer psychology."
    ]
  },
  {
    id: 'copywriter',
    title: "Copywriter",
    role: "Conversion Copywriter & Direct-Response Strategist",
    icon: <PenTool className="w-6 h-6" />,
    type: "Full-time / On-site",
    salary: "₹30,000 - ₹40,000",
    desc: "Write ad hooks, primary text, and landing page copy that converts cold traffic into buyers.",
    responsibilities: [
      "Write scroll-stopping ad hooks, primary text, and CTAs for Meta and Google campaigns across DTC and B2B clients.",
      "Craft 3–5 ad copy variants per creative batch and iterate rapidly based on CTR, hook-rate, and conversion data.",
      "Develop landing page copy, advertorials, and email sequences that move prospects through the full funnel.",
      "Collaborate with designers and video editors to ensure copy and creative work as a unified conversion unit."
    ],
    requirements: [
      "Strong grasp of pain-point-led copywriting frameworks (PAS, AIDA, before-after-bridge).",
      "Proven track record writing direct-response copy — portfolio of ads and landing pages is required.",
      "Ability to write in multiple brand voices across niches (health, fashion, tech, D2C).",
      "Experience using AI tools (Claude, ChatGPT) to accelerate copy iteration without sacrificing quality."
    ]
  },
  {
    id: 'content-creator',
    title: "Content Creator (UGC)",
    role: "On-Camera Talent & Authentic Brand Storyteller",
    icon: <User className="w-6 h-6" />,
    type: "Full-time / On-site",
    salary: "₹30,000 - ₹40,000",
    desc: "Be the face of our clients' brands in authentic, on-camera UGC ad creatives.",
    responsibilities: [
      "Film authentic on-camera UGC content — product reviews, unboxings, tutorials, and problem-solution narratives.",
      "Adapt your delivery and energy to match different brand tones across categories (beauty, fitness, lifestyle, tech).",
      "Self-direct shoots from your phone, ensuring clean audio, good lighting, and compelling storytelling.",
      "Participate in creative briefings and provide feedback on hooks and scripts based on what feels natural on camera."
    ],
    requirements: [
      "Natural, confident on-camera delivery — no stiffness, no over-scripted energy.",
      "Ability to self-shoot vertical content with a smartphone in various environments.",
      "Quick turnaround mindset — able to deliver multiple content variations within tight deadlines.",
      "Genuine curiosity about products and an ability to communicate value authentically to a target audience."
    ]
  },
  {
    id: 'automation-specialist',
    title: "Automation Specialist",
    role: "Workflow Architect & AI Systems Builder",
    icon: <Zap className="w-6 h-6" />,
    type: "Full-time / On-site",
    salary: "₹30,000 - ₹40,000",
    desc: "Build the operational backbone using n8n, Make.com, and AI agents to eliminate repetitive work across client operations.",
    responsibilities: [
      "Design and deploy automated workflows using n8n, Make.com, and AI agents to eliminate repetitive operational tasks.",
      "Build lead routing systems, client reporting pipelines, and content operations automations.",
      "Integrate third-party APIs (CRMs, ad platforms, data tools) into unified automated workflows.",
      "Document, monitor, and continuously optimise automation performance to reduce failure rates and manual intervention."
    ],
    requirements: [
      "Hands-on experience with at least one automation platform — n8n or Make.com strongly preferred.",
      "Comfort working with APIs, webhooks, and JSON data structures.",
      "Hunger to learn and deploy AI tooling (Claude, OpenAI) within automation pipelines.",
      "Systematic thinking — ability to map complex business processes and translate them into reliable automated flows."
    ]
  },
  {
    id: 'ecom-manager',
    title: "Ecommerce Manager",
    role: "Marketplace Operations Specialist & Funnel Optimiser",
    icon: <ShoppingCart className="w-6 h-6" />,
    type: "Full-time / On-site",
    salary: "₹30,000 - ₹40,000",
    desc: "Own marketplace operations across Amazon, Myntra, and Flipkart — catalog compliance, inventory sync, and pricing mechanics.",
    responsibilities: [
      "Perform physical unboxings and visual audits of inventory and packaging to ensure quality control and optimise shipping weight parameters.",
      "Manage operational digital health, product catalog compliance, and storefront integrity across native and marketplace channels.",
      "Engineer promotional pricing mechanics, optimisation strategies, and structural changes to maximise AOV and customer LTV.",
      "Coordinate backend parameters like inventory sync, seller metrics, and listing health to avoid out-of-stock or compliance flags."
    ],
    requirements: [
      "Capability to visually document packaging and fulfillment procedures for optimisation training or platform dispute resolution.",
      "Extensive daily execution experience inside Amazon Seller Central, Amazon Vendor Central, Myntra, and Flipkart.",
      "Strong data literacy to extract, reconcile, and act on sales velocity reports and platform SEO metrics.",
      "Experience prompt-engineering or using platforms built on OpenAI and Claude to scale bulk catalog updates, metadata creation, and product descriptions."
    ]
  },
  {
    id: 'performance-marketing',
    title: "Digital Marketing Manager",
    role: "Full-Funnel Growth Planner & Paid Media Lead",
    icon: <TrendingUp className="w-6 h-6" />,
    type: "Full-time / On-site",
    salary: "₹30,000 - ₹40,000",
    desc: "Deploy and scale full-funnel paid media across Meta, Google, and Amazon to lower CAC and improve blended ROAS.",
    responsibilities: [
      "Direct and capture trend-based social media content (talking-head videos, behind-the-scenes, live events) to feed the organic marketing engine.",
      "Deploy, monitor, and scale full-funnel paid media campaigns to lower CAC while improving overall blended ROAS.",
      "Coordinate organic social media distribution strategies that synchronise with active paid campaigns.",
      "Run daily budget pacing, rapid creative testing, and deep-dive cohort analyses to isolate growth opportunities."
    ],
    requirements: [
      "Comfort on-camera or directing quick-turnaround phone content to jump on internet trends instantly.",
      "Hands-on, verifiable expertise managing and optimising campaigns inside Meta Ads Manager, Google Ads, and Amazon Ads.",
      "Skill in utilising Claude and OpenAI for competitive intelligence, swift copywriting iterations, and unstructured data parsing.",
      "An analytical mindset that views marketing as an engineering problem where variables are constantly optimised."
    ]
  },
  {
    id: 'graphic-designer',
    title: "Graphic Designer",
    role: "Visual Storyteller & Creative Engineer",
    icon: <Palette className="w-6 h-6" />,
    type: "Full-time / On-site",
    salary: "₹30,000 - ₹40,000",
    desc: "Concept, shoot, and execute high-velocity static and dynamic creatives for DTC and B2B paid media.",
    responsibilities: [
      "Concept and execute visual shoots (product photography and basic styling) to build a library of high-quality raw assets.",
      "Design high-velocity, conversion-focused static and dynamic assets for DTC and B2B paid media channels.",
      "Translate complex brand positioning into thumb-stopping creatives that communicate value in under two seconds.",
      "Iterate rapidly on creative tests based on real-time performance data to find winning hooks."
    ],
    requirements: [
      "Hands-on photography and shooting skills with a solid grasp of lighting, framing, and capturing crisp product assets.",
      "Advanced mastery of the Adobe Suite — Photoshop, Illustrator, and After Effects.",
      "Hands-on experience using generative AI tools (Claude, OpenAI, Midjourney, DALL-E) to speed up prototyping and ideation.",
      "A strong portfolio that demonstrates direct-response marketing design — not just abstract branding."
    ]
  },
  {
    id: 'vibe-coder',
    title: "Vibe Coder",
    role: "Technical Builder & Automation Systems Architect",
    icon: <Code2 className="w-6 h-6" />,
    type: "Full-time / On-site",
    salary: "₹30,000 - ₹40,000",
    desc: "Build, deploy, and demo functional storefronts, AI agents, and automation systems that directly drive revenue.",
    responsibilities: [
      "Prototype and live demo: build, deploy, and physically record functional UI interactions and AI system behaviours for product showcases.",
      "Develop fast, conversion-optimised storefronts and headless web builds engineered for scale.",
      "Build and integrate autonomous AI agents, automated operations, and robust tracking systems.",
      "Maintain technical architecture for storefronts and back-end pipelines, eliminating checkout friction."
    ],
    requirements: [
      "Screen-capture and technical presentation capability to visibly showcase software engineering mechanics and architecture flows.",
      "Proficient in modern coding languages, web frameworks, and specialised platforms like Antigravity.",
      "Deep experience working with API integrations, specifically OpenAI and Claude models to build business automation workflows.",
      "A builder's mindset focused on deploying code that directly unlocks operational efficiency and revenue."
    ]
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
  const [viewJob, setViewJob] = useState<any>(null);
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
                    <h3 className="text-2xl font-black text-slate-900 mb-2">{job.title}</h3>
                    <p className="text-xs font-semibold text-blue-600 mb-4">{job.role}</p>
                    <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-1">{job.desc}</p>
                    <div className="flex items-center gap-2 mb-6">
                      <Badge variant="secondary" className="text-xs">{job.type}</Badge>
                      <Badge variant="secondary" className="text-xs">{job.salary}</Badge>
                    </div>
                    <div className="flex gap-3">
                      <Button
                        onClick={() => setViewJob(job)}
                        variant="outline"
                        className="flex-1 py-6 rounded-2xl border-slate-200 hover:border-blue-600 hover:text-blue-600 font-bold transition-all text-sm"
                      >
                        <ListChecks className="mr-2 w-4 h-4" /> View Details
                      </Button>
                      <Button
                        onClick={() => setSelectedJob(job)}
                        className="flex-1 py-6 rounded-2xl bg-slate-900 hover:bg-blue-600 text-white font-black transition-all text-sm"
                      >
                        Apply Now <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* ── Full Job Description Modal ── */}
      <AnimatePresence>
        {viewJob && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setViewJob(null)} className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl max-h-[90vh] overflow-y-auto">
              <button onClick={() => setViewJob(null)} className="absolute top-6 right-6 z-10 p-2 hover:bg-slate-100 rounded-full transition-colors"><X className="w-6 h-6 text-slate-400" /></button>
              <div className="p-10 md:p-14">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">{viewJob.icon}</div>
                  <div>
                    <h2 className="text-2xl font-black text-slate-900">{viewJob.title}</h2>
                    <p className="text-sm font-semibold text-blue-600">{viewJob.role}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-4 mb-8">
                  <Badge variant="secondary">{viewJob.type}</Badge>
                  <Badge variant="secondary">{viewJob.salary}</Badge>
                </div>

                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <ListChecks className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-black text-slate-900">Responsibilities</h3>
                  </div>
                  <ul className="space-y-3">
                    {viewJob.responsibilities.map((r: string, i: number) => (
                      <li key={i} className="flex gap-3 text-sm text-slate-600 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-10">
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-black text-slate-900">Requirements</h3>
                  </div>
                  <ul className="space-y-3">
                    {viewJob.requirements.map((r: string, i: number) => (
                      <li key={i} className="flex gap-3 text-sm text-slate-600 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  onClick={() => { setViewJob(null); setSelectedJob(viewJob); }}
                  className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black"
                >
                  Apply for this Role <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Application Form Modal ── */}
      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedJob(null)} className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative w-full max-w-xl bg-white rounded-[3rem] shadow-2xl max-h-[90vh] overflow-y-auto">
              <button onClick={() => setSelectedJob(null)} className="absolute top-6 right-6 z-10 p-2 hover:bg-slate-100 rounded-full transition-colors"><X className="w-6 h-6 text-slate-400" /></button>
              <div className="p-10 md:p-16">
                {success ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle2 className="w-10 h-10 text-green-600" /></div>
                    <h3 className="text-3xl font-black text-slate-900 mb-4">Application Sent!</h3>
                    <p className="text-slate-500 text-sm">We'll be in touch soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="mb-6">
                      <Badge className="bg-blue-600 mb-2">Applying for {selectedJob.title}</Badge>
                      <h3 className="text-2xl font-black text-slate-900">Show us your best work.</h3>
                    </div>
                    <div className="space-y-1"><Label className="text-xs font-bold text-slate-700">Full Name</Label><Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="h-12 rounded-xl" /></div>
                    <div className="space-y-1"><Label className="text-xs font-bold text-slate-700">Email Address</Label><Input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="h-12 rounded-xl" /></div>
                    <div className="space-y-1"><Label className="text-xs font-bold text-slate-700">Phone Number</Label><Input type="tel" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="h-12 rounded-xl" placeholder="+91 98765 43210" /></div>
                    <div className="space-y-1"><Label className="text-xs font-bold text-slate-700">Portfolio / LinkedIn URL</Label><Input required value={formData.portfolio} onChange={e => setFormData({...formData, portfolio: e.target.value})} className="h-12 rounded-xl" placeholder="https://..." /></div>
                    <div className="space-y-1">
                      <Label className="text-xs font-bold text-slate-700">Resume Link <span className="text-slate-400 font-normal">(Google Drive / Dropbox)</span></Label>
                      <Input value={formData.resume_link} onChange={e => setFormData({...formData, resume_link: e.target.value})} className="h-12 rounded-xl" placeholder="https://drive.google.com/..." />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs font-bold text-slate-700">Resume / CV <span className="text-slate-400 font-normal">(PDF or Word, max 5 MB)</span></Label>
                      <label className="flex items-center gap-3 h-12 px-4 rounded-xl border border-input bg-background cursor-pointer hover:bg-slate-50 transition-colors">
                        <Paperclip className="w-4 h-4 text-slate-400 shrink-0" />
                        <span className="text-sm text-slate-500 truncate">{resumeFile ? resumeFile.name : "Click to attach your resume"}</span>
                        <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeChange} className="sr-only" />
                      </label>
                    </div>
                    <div className="space-y-1"><Label className="text-xs font-bold text-slate-700">Why Qala Labs?</Label><Textarea value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="rounded-xl min-h-[100px]" /></div>
                    <Button type="submit" disabled={loading} className="w-full h-14 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black mt-4">
                      {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Submit Application"}
                    </Button>
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
