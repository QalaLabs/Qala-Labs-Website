"use client";

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { showSuccess, showError } from '@/utils/toast';
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Mail, Phone, Instagram, Linkedin } from 'lucide-react';
import { motion } from "framer-motion";

const services = [
  "Performance Marketing",
  "Creative Production",
  "Web Development",
  "Conversion Optimization",
  "Analytics & Data",
  "eCommerce Growth"
];

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
    service: '',
    revenue: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Using the dynamic API route (Edge Function)
    const { data, error } = await supabase.functions.invoke('lead-engine', {
      body: {
        email: formData.email,
        tool_used: 'contact_form_v2',
        data: {
          ...formData,
          source_url: window.location.href,
          timestamp: new Date().toISOString()
        }
      }
    });

    setLoading(false);
    if (error) {
      showError("Something went wrong. Please try again.");
    } else {
      showSuccess("Audit request received! We'll be in touch within 24 hours.");
      setFormData({ name: '', email: '', phone: '', website: '', service: '', revenue: '', message: '' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <SEO title="Book Your Free Audit" description="Get a detailed performance audit and growth strategy for your brand." />
      <Navbar />
      
      <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-8 leading-tight">
              Let's Build Your <br /> <span className="text-blue-600">Scale Engine.</span>
            </h1>
            <p className="text-xl text-slate-600 mb-12 leading-relaxed">
              We only partner with brands we know we can scale. Fill out the form to see if you're a fit for our 8-figure framework.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Email Us</h4>
                  <p className="text-slate-500">hello@qalalabs.com</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Call Us</h4>
                  <p className="text-slate-500">+91 60067 60151</p>
                </div>
              </div>
              
              <div className="pt-8 border-t border-slate-200">
                <h4 className="font-bold text-slate-900 mb-4">Follow Our Frameworks</h4>
                <div className="flex gap-4">
                  <a 
                    href="https://www.linkedin.com/company/qalalabs/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-blue-600 hover:border-blue-600 transition-all"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://www.instagram.com/qalalabs/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-pink-600 hover:border-pink-600 transition-all"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden">
              <CardHeader className="bg-slate-900 text-white p-10">
                <CardTitle className="text-3xl font-bold">Request Free Audit</CardTitle>
                <p className="text-slate-400 mt-2">Get your custom growth strategy in 24 hours.</p>
              </CardHeader>
              <CardContent className="p-10 bg-white">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        required 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="rounded-xl h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Work Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        required 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="rounded-xl h-12"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        type="tel" 
                        placeholder="+91..."
                        required 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="rounded-xl h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website URL</Label>
                      <Input 
                        id="website" 
                        required 
                        value={formData.website}
                        onChange={(e) => setFormData({...formData, website: e.target.value})}
                        className="rounded-xl h-12"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="service">Primary Need</Label>
                      <select 
                        id="service"
                        className="w-full h-12 px-3 rounded-xl border border-input bg-background text-sm"
                        required
                        value={formData.service}
                        onChange={(e) => setFormData({...formData, service: e.target.value})}
                      >
                        <option value="">Select service</option>
                        {services.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="revenue">Monthly Revenue</Label>
                      <select 
                        id="revenue"
                        className="w-full h-12 px-3 rounded-xl border border-input bg-background text-sm"
                        required
                        value={formData.revenue}
                        onChange={(e) => setFormData({...formData, revenue: e.target.value})}
                      >
                        <option value="">Select range</option>
                        <option value="<5L">{"< ₹5L/mo"}</option>
                        <option value="5L-15L">₹5L - ₹15L/mo</option>
                        <option value="15L-50L">₹15L - ₹50L/mo</option>
                        <option value="50L+">₹50L+/mo</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Growth Goals</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Tell us about your current challenges..." 
                      className="min-h-[100px] rounded-xl"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full py-8 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xl font-black"
                    disabled={loading}
                  >
                    {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Send Audit Request"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;