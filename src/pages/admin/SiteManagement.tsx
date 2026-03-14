"use client";

import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { 
  Save, Layout, Search, Globe, Shield, 
  Zap, MessageSquare, Plus, Trash2, 
  ChevronRight, Info, Settings, Eye,
  Image as ImageIcon, MousePointer2,
  CheckCircle2, AlertCircle, Link as LinkIcon,
  Palette, Type, HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { showSuccess, showError } from '@/utils/toast';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

const SiteManagement = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("content");
  const [contentTab, setContentTab] = useState("hero");

  const [settings, setSettings] = useState<any>({
    seo: {
      homepage: { title: '', description: '' },
      about: { title: '', description: '' },
      services: { title: '', description: '' },
      blog: { title: '', description: '' },
      contact: { title: '', description: '' },
      global: { twitter: '@qalalabs', footer_note: '' }
    },
    hero: {
      headline: 'Scale Your Brand to 8-Figures with Revenue Engineering.',
      subtext: 'We combine high-performance paid media with high-velocity creative to build predictable scale engines.',
      cta1_label: 'Get Proposal',
      cta2_label: 'See Work'
    },
    about_section: {
      title: 'A New Standard in Performance',
      intro: 'We are revenue engineers, not growth hackers. We pair rigorous research with hands-on execution.',
      selling_points: [
        { icon: 'Zap', title: 'High Velocity', desc: '100+ weekly ad variants tested.' }
      ]
    },
    appearance: {
      primary_color: '#2563eb',
      accent_color: '#0f172a',
      font_family: 'Inter',
      logo_url: '',
      favicon_url: '',
      dark_mode_enabled: false
    },
    faqs: [
      { question: 'Who do you work with?', answer: 'DTC and ecommerce brands ready to scale.' }
    ],
    integrations: {
      webhook_url: '',
      ga4_id: '',
      pixel_id: '',
      smtp_enabled: true
    }
  });

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('key', 'global_config')
        .single();
      
      if (!error && data) {
        setSettings(data.value);
      }
      setLoading(false);
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase
      .from('site_settings')
      .upsert({ key: 'global_config', value: settings, updated_at: new Date().toISOString() }, { onConflict: 'key' });

    setSaving(false);
    if (error) showError("Failed to save settings");
    else showSuccess("Site settings updated successfully");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AdminSidebar />
      
      <main className="flex-1 p-10">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Site Management</h1>
            <p className="text-slate-500">Configure your public-facing website infrastructure.</p>
          </div>
          <Button onClick={handleSave} disabled={saving} className="bg-blue-600 hover:bg-blue-700 rounded-xl px-8 py-6 font-black shadow-lg shadow-blue-500/20">
            {saving ? <Zap className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5 mr-2" />}
            Save All Settings
          </Button>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="bg-white p-1 rounded-2xl border border-slate-100 shadow-sm h-auto">
            <TabsTrigger value="content" className="rounded-xl px-8 py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white font-bold">Content</TabsTrigger>
            <TabsTrigger value="appearance" className="rounded-xl px-8 py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white font-bold">Appearance</TabsTrigger>
            <TabsTrigger value="seo" className="rounded-xl px-8 py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white font-bold">SEO</TabsTrigger>
            <TabsTrigger value="faqs" className="rounded-xl px-8 py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white font-bold">FAQs</TabsTrigger>
            <TabsTrigger value="integrations" className="rounded-xl px-8 py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white font-bold">Integrations</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-8">
            <Card className="border-none shadow-sm rounded-[2.5rem] bg-white overflow-hidden">
              <div className="p-1 bg-slate-50 border-b border-slate-100">
                <Tabs value={contentTab} onValueChange={setContentTab} className="w-full">
                  <TabsList className="bg-transparent h-auto p-2 gap-2">
                    {['Hero', 'About', 'Values', 'Process'].map(t => (
                      <TabsTrigger key={t} value={t.toLowerCase()} className="rounded-lg px-6 py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm font-bold text-xs uppercase tracking-widest">
                        {t}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>

              <CardContent className="p-10">
                {contentTab === 'hero' && (
                  <div className="space-y-8">
                    <div className="border-l-4 border-blue-600 pl-6 mb-10">
                      <h3 className="text-2xl font-black text-slate-900">Hero Section</h3>
                      <p className="text-slate-500 text-sm">The first thing users see when they land on your site.</p>
                    </div>
                    <div className="grid gap-6">
                      <div className="space-y-2">
                        <Label className="text-xs font-black uppercase text-slate-400">Headline</Label>
                        <Input 
                          value={settings.hero.headline} 
                          onChange={e => setSettings({...settings, hero: {...settings.hero, headline: e.target.value}})}
                          className="rounded-xl h-14 text-lg font-bold"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-black uppercase text-slate-400">Subtext</Label>
                        <Textarea 
                          value={settings.hero.subtext} 
                          onChange={e => setSettings({...settings, hero: {...settings.hero, subtext: e.target.value}})}
                          className="rounded-xl min-h-[100px] leading-relaxed"
                        />
                      </div>
                    </div>
                  </div>
                )}
                {/* Other content tabs would go here */}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-8">
            <Card className="border-none shadow-sm rounded-[2.5rem] bg-white">
              <CardHeader className="p-10 pb-0">
                <CardTitle className="text-2xl font-black flex items-center gap-3">
                  <Palette className="w-6 h-6 text-blue-600" /> Branding & Style
                </CardTitle>
              </CardHeader>
              <CardContent className="p-10 space-y-8">
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label className="text-xs font-black uppercase text-slate-400">Primary Brand Color</Label>
                      <div className="flex gap-3">
                        <Input type="color" value={settings.appearance.primary_color} onChange={e => setSettings({...settings, appearance: {...settings.appearance, primary_color: e.target.value}})} className="w-14 h-14 p-1 rounded-xl cursor-pointer" />
                        <Input value={settings.appearance.primary_color} onChange={e => setSettings({...settings, appearance: {...settings.appearance, primary_color: e.target.value}})} className="rounded-xl h-14 font-mono" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-black uppercase text-slate-400">Accent Color</Label>
                      <div className="flex gap-3">
                        <Input type="color" value={settings.appearance.accent_color} onChange={e => setSettings({...settings, appearance: {...settings.appearance, accent_color: e.target.value}})} className="w-14 h-14 p-1 rounded-xl cursor-pointer" />
                        <Input value={settings.appearance.accent_color} onChange={e => setSettings({...settings, appearance: {...settings.appearance, accent_color: e.target.value}})} className="rounded-xl h-14 font-mono" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label className="text-xs font-black uppercase text-slate-400">Logo URL (Light Mode)</Label>
                      <Input value={settings.appearance.logo_url} onChange={e => setSettings({...settings, appearance: {...settings.appearance, logo_url: e.target.value}})} className="rounded-xl h-12" placeholder="https://..." />
                    </div>
                    <div className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100">
                      <div>
                        <h4 className="font-bold text-slate-900">Dark Mode Support</h4>
                        <p className="text-xs text-slate-500">Enable automatic theme switching.</p>
                      </div>
                      <Switch checked={settings.appearance.dark_mode_enabled} onCheckedChange={v => setSettings({...settings, appearance: {...settings.appearance, dark_mode_enabled: v}})} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="faqs" className="space-y-8">
            <Card className="border-none shadow-sm rounded-[2.5rem] bg-white">
              <CardHeader className="p-10 pb-0 flex flex-row items-center justify-between">
                <CardTitle className="text-2xl font-black flex items-center gap-3">
                  <HelpCircle className="w-6 h-6 text-blue-600" /> Global FAQs
                </CardTitle>
                <Button onClick={() => setSettings({...settings, faqs: [...settings.faqs, { question: '', answer: '' }]})} className="rounded-xl bg-slate-900 hover:bg-slate-800">
                  <Plus className="w-4 h-4 mr-2" /> Add FAQ
                </Button>
              </CardHeader>
              <CardContent className="p-10 space-y-6">
                {settings.faqs.map((faq: any, i: number) => (
                  <div key={i} className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 relative group">
                    <button 
                      className="absolute top-6 right-6 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => {
                        const newFaqs = settings.faqs.filter((_: any, idx: number) => idx !== i);
                        setSettings({...settings, faqs: newFaqs});
                      }}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase text-slate-400">Question</Label>
                        <Input value={faq.question} onChange={e => {
                          const newFaqs = [...settings.faqs]; newFaqs[i].question = e.target.value;
                          setSettings({...settings, faqs: newFaqs});
                        }} className="rounded-xl h-12 bg-white border-none shadow-sm font-bold" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase text-slate-400">Answer</Label>
                        <Textarea value={faq.answer} onChange={e => {
                          const newFaqs = [...settings.faqs]; newFaqs[i].answer = e.target.value;
                          setSettings({...settings, faqs: newFaqs});
                        }} className="rounded-xl min-h-[100px] bg-white border-none shadow-sm" />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seo" className="space-y-8">
            {/* SEO content from previous implementation */}
          </TabsContent>

          <TabsContent value="integrations" className="space-y-8">
            {/* Integrations content from previous implementation */}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default SiteManagement;