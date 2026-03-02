"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, FileText, Image as ImageIcon, Tag, Search } from 'lucide-react';

const EditorGuide = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <SEO title="Editor's Quick Guide" description="How to publish and manage content on Qala Labs." />
      <Navbar />
      
      <div className="pt-32 pb-20 px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl font-black text-slate-900 mb-8">Editor's Quick Guide</h1>
        
        <div className="prose prose-slate max-w-none mb-12">
          <p className="text-xl text-slate-600 leading-relaxed">
            Welcome to the Qala Labs Content Engine. This guide will help you publish high-performance case studies and blog posts that maintain our 8-figure brand standards.
          </p>
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <FileText className="w-8 h-8 text-blue-600" /> How to Publish a New Case Study
            </h2>
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
              <p className="text-slate-600">
                Case studies are our most powerful conversion tool. Follow these steps to ensure they are data-rich and SEO-optimized:
              </p>
              <ol className="space-y-4 list-decimal pl-6 text-slate-700">
                <li><strong>Navigate to Admin:</strong> Go to the Admin Portal and select "Content Library" {'>'} "Case Studies".</li>
                <li><strong>Define the Result:</strong> Every case study must start with a "1-liner result" (e.g., "₹12Cr in 90 Days"). This is what appears on the preview cards.</li>
                <li><strong>Upload Media:</strong> Use high-quality WebP images for the static view and an optimized MP4 (muted, no audio) for the hover preview.</li>
                <li><strong>Input Metrics:</strong> Fill in the ROAS, Growth %, and Revenue fields. These power the interactive data chips.</li>
                <li><strong>Write the Narrative:</strong> Use the "Challenge", "Solution", and "Results" blocks to tell the story. Keep paragraphs short and punchy.</li>
              </ol>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <CheckCircle2 className="w-8 h-8 text-green-600" /> Pre-Publish Checklist
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-none shadow-sm bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-blue-600" /> Visuals & Media
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-slate-600">
                  <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-600" /> Images are in WebP format</div>
                  <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-600" /> Video is under 2MB and muted</div>
                  <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-600" /> Alt text describes the brand/result</div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm bg-purple-50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Tag className="w-5 h-5 text-purple-600" /> Tags & Taxonomy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-slate-600">
                  <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-600" /> Category is selected (DTC, Fashion, etc.)</div>
                  <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-600" /> Relevant service tags are applied</div>
                  <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-600" /> Slug is clean (e.g., /case-studies/brand-name)</div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm bg-green-50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Search className="w-5 h-5 text-green-600" /> SEO & Schema
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-slate-600">
                  <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-600" /> Meta description includes target keywords</div>
                  <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-600" /> H2/H3 hierarchy is maintained</div>
                  <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-600" /> JSON-LD schema is auto-generated</div>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>

        <div className="mt-20 p-12 bg-slate-900 rounded-[3rem] text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Need Technical Support?</h3>
          <p className="text-slate-400 mb-8">Contact the dev team for custom block requests or bug reports.</p>
          <a href="mailto:dev@qalalabs.com" className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors">
            Email Support
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditorGuide;