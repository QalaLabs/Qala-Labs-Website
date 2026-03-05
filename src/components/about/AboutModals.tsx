"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, CheckCircle2, Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { showSuccess, showError } from '@/utils/toast';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'book' | 'casepack';
}

const AboutModals = ({ isOpen, onClose, type }: ModalProps) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    revenue: '',
    channel: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from('leads').insert({
      email: formData.email,
      tool_used: type === 'book' ? 'about_quick_qualify' : 'about_casepack_request',
      data: { ...formData, timestamp: new Date().toISOString() }
    });

    setLoading(false);
    if (error) {
      showError("Something went wrong. Please try again.");
    } else {
      setSuccess(true);
      showSuccess(type === 'book' ? "Qualifying request sent!" : "Case pack sent to your inbox!");
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setFormData({ name: '', email: '', company: '', revenue: '', channel: '' });
      }, 3000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-[3rem] overflow-hidden shadow-2xl"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 z-10 p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-slate-400" />
            </button>

            <div className="p-10 md:p-16">
              {success ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 mb-4">Success!</h3>
                  <p className="text-slate-500 text-lg">Our team will be in touch within 24 hours.</p>
                </div>
              ) : type === 'book' ? (
                <Tabs defaultValue="qualify" className="w-full">
                  <div className="mb-10">
                    <h3 className="text-3xl font-black text-slate-900 mb-2">Book Your Audit</h3>
                    <p className="text-slate-500">Choose how you'd like to proceed with your growth plan.</p>
                  </div>
                  
                  <TabsList className="grid w-full grid-cols-2 bg-slate-100 p-1 rounded-2xl mb-8">
                    <TabsTrigger value="qualify" className="rounded-xl py-3 font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm">Quick Qualify</TabsTrigger>
                    <TabsTrigger value="slot" className="rounded-xl py-3 font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm">Book a Slot</TabsTrigger>
                  </TabsList>

                  <TabsContent value="qualify">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Full Name</Label>
                          <Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="rounded-xl h-12" />
                        </div>
                        <div className="space-y-2">
                          <Label>Work Email</Label>
                          <Input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="rounded-xl h-12" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Company</Label>
                          <Input required value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="rounded-xl h-12" />
                        </div>
                        <div className="space-y-2">
                          <Label>Monthly Revenue</Label>
                          <select 
                            className="w-full h-12 px-3 rounded-xl border border-input bg-background text-sm"
                            value={formData.revenue}
                            onChange={e => setFormData({...formData, revenue: e.target.value})}
                            required
                          >
                            <option value="">Select range</option>
                            <option value="<1L">{"< ₹1L"}</option>
                            <option value="1-5L">₹1L - ₹5L</option>
                            <option value="5-25L">₹5L - ₹25L</option>
                            <option value="25L+">₹25L+</option>
                          </select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Main Growth Channel</Label>
                        <Input placeholder="e.g. Meta, Google, Amazon" value={formData.channel} onChange={e => setFormData({...formData, channel: e.target.value})} className="rounded-xl h-12" />
                      </div>
                      <Button type="submit" disabled={loading} className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-lg mt-4">
                        {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Submit Qualification"}
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="slot">
                    <div className="aspect-video bg-slate-50 rounded-3xl flex items-center justify-center border-2 border-dashed border-slate-200">
                      <div className="text-center p-8">
                        <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <p className="text-slate-500 font-medium mb-4">Calendly integration would load here.</p>
                        <Button variant="outline" className="rounded-xl">Open Scheduler</Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              ) : (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-3xl font-black text-slate-900 mb-2">Request Case Pack</h3>
                    <p className="text-slate-500">Get our anonymized 8-figure growth playbooks delivered to your inbox.</p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label>Work Email</Label>
                      <Input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="rounded-xl h-14 text-lg" placeholder="john@brand.com" />
                    </div>
                    <div className="space-y-2">
                      <Label>Company Name</Label>
                      <Input required value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="rounded-xl h-14 text-lg" placeholder="Your Brand Ltd" />
                    </div>
                    <Button type="submit" disabled={loading} className="w-full h-16 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xl">
                      {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Send Case Pack"}
                    </Button>
                  </form>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AboutModals;