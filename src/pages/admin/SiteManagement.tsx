"use client";

import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { 
  Save, Layout, Search, Globe, Shield, 
  Zap, MessageSquare, Plus, Trash2, 
  ChevronRight, Info, Settings, Eye,
  Image as ImageIcon, MousePointer2,
  CheckCircle2, AlertCircle, Link as LinkIcon
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

  // State for all settings
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
    values: {
      title: 'Our Core Values',
      subtitle: 'The principles that guide every decision we make.',
      items: [
        { icon: 'ShieldCheck', title: 'Radical Transparency', desc: 'Real-time dashboards for 100% visibility.' }
      ]
    },
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

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <AdminSidebar />
      <div className="flex-1 flex items-center justify-center">
        <Zap className="w-10 h-10 animate-pulse text-blue-600" />
      </div>
    </div>
  );

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
            <TabsTrigger value="seo" className="rounded-xl px-8 py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white font-bold">SEO</TabsTrigger>
            <TabsTrigger value="faqs" className="rounded-xl px-8 py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white font-bold">FAQs</TabsTrigger>
            <TabsTrigger value="integrations" className="rounded-xl px-8 py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white font-bold">Integrations</TabsTrigger>
            <TabsTrigger value="sitemap" className="rounded-xl px-8 py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white font-bold">Sitemap</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-8">
            <Card className="border-none shadow-sm rounded-[2.5rem] bg-white overflow-hidden">
              <div className="p-1 bg-slate-50 border-b border-slate-100">
                <Tabs value={contentTab} onValueChange={setContentTab} className="w-full">
                  <TabsList className="bg-transparent h-auto p-2 gap-2">
                    {['Hero', 'About', 'Values', 'Process', 'Appearance'].map(t => (
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
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label className="text-xs font-black uppercase text-slate-400">CTA 1 Label</Label>
                          <Input 
                            value={settings.hero.cta1_label} 
                            onChange={e => setSettings({...settings, hero: {...settings.hero, cta1_label: e.target.value}})}
                            className="rounded-xl h-12"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-black uppercase text-slate-400">CTA 2 Label</Label>
                          <Input 
                            value={settings.hero.cta2_label} 
                            onChange={e => setSettings({...settings, hero: {...settings.hero, cta2_label: e.target.value}})}
                            className="rounded-xl h-12"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {contentTab === 'about' && (
                  <div className="space-y-10">
                    <div className="border-l-4 border-blue-600 pl-6">
                      <h3 className="text-2xl font-black text-slate-900">About Section</h3>
                    </div>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label className="text-xs font-black uppercase text-slate-400">Section Title</Label>
                        <Input value={settings.about_section.title} onChange={e => setSettings({...settings, about_section: {...settings.about_section, title: e.target.value}})} className="rounded-xl h-12" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-black uppercase text-slate-400">Introductory Paragraph</Label>
                        <Textarea value={settings.about_section.intro} onChange={e => setSettings({...settings, about_section: {...settings.about_section, intro: e.target.value}})} className="rounded-xl min-h-[120px]" />
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label className="text-xs font-black uppercase text-slate-400">Selling Points</Label>
                          <Button variant="outline" size="sm" className="rounded-lg" onClick={() => {
                            const newPoints = [...settings.about_section.selling_points, { icon: 'Zap', title: '', desc: '' }];
                            setSettings({...settings, about_section: {...settings.about_section, selling_points: newPoints}});
                          }}><Plus className="w-3 h-3 mr-2" /> Add Point</Button>
                        </div>
                        {settings.about_section.selling_points.map((p: any, i: number) => (
                          <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 relative group">
                            <button className="absolute top-4 right-4 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => {
                              const newPoints = settings.about_section.selling_points.filter((_: any, idx: number) => idx !== i);
                              setSettings({...settings, about_section: {...settings.about_section, selling_points: newPoints}});
                            }}><Trash2 className="w-4 h-4" /></button>
                            <div className="grid md:grid-cols-3 gap-4">
                              <div className="space-y-1">
                                <Label className="text-[10px] font-bold">Icon</Label>
                                <select className="w-full h-10 rounded-lg border bg-white px-3 text-sm" value={p.icon} onChange={e => {
                                  const newPoints = [...settings.about_section.selling_points]; newPoints[i].icon = e.target.value;
                                  setSettings({...settings, about_section: {...settings.about_section, selling_points: newPoints}});
                                }}>
                                  <option value="Zap">Zap</option>
                                  <option value="Target">Target</option>
                                  <option value="Globe">Globe</option>
                                  <option value="Shield">Shield</option>
                                </select>
                              </div>
                              <div className="md:col-span-2 space-y-1">
                                <Label className="text-[10px] font-bold">Title</Label>
                                <Input value={p.title} onChange={e => {
                                  const newPoints = [...settings.about_section.selling_points]; newPoints[i].title = e.target.value;
                                  setSettings({...settings, about_section: {...settings.about_section, selling_points: newPoints}});
                                }} className="h-10 rounded-lg" />
                              </div>
                              <div className="md:col-span-3 space-y-1">
                                <Label className="text-[10px] font-bold">Description</Label>
                                <Textarea value={p.desc} onChange={e => {
                                  const newPoints = [...settings.about_section.selling_points]; newPoints[i].desc = e.target.value;
                                  setSettings({...settings, about_section: {...settings.about_section, selling_points: newPoints}});
                                }} className="min-h-[60px] rounded-lg" />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seo" className="space-y-8">
            <div className="grid gap-8">
              {['Homepage', 'About Page', 'Services Page', 'Blog Page', 'Contact Page'].map((page) => {
                const key = page.toLowerCase().split(' ')[0];
                return (
                  <Card key={page} className="border-none shadow-sm rounded-[2.5rem] bg-white">
                    <CardHeader className="p-10 pb-0">
                      <CardTitle className="text-xl font-black text-slate-900 border-l-4 border-blue-600 pl-6">{page}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-10 space-y-6">
                      <div className="space-y-2">
                        <Label className="text-xs font-black uppercase text-slate-400">SEO Title</Label>
                        <Input 
                          value={settings.seo[key]?.title || ''} 
                          onChange={e => setSettings({...settings, seo: {...settings.seo, [key]: {...settings.seo[key], title: e.target.value}}})}
                          className="rounded-xl h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-black uppercase text-slate-400">Meta Description</Label>
                        <Textarea 
                          value={settings.seo[key]?.description || ''} 
                          onChange={e => setSettings({...settings, seo: {...settings.seo, [key]: {...settings.seo[key], description: e.target.value}}})}
                          className="rounded-xl min-h-[100px]"
                        />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

              <Card className="border-none shadow-sm rounded-[2.5rem] bg-slate-900 text-white">
                <CardHeader className="p-10 pb-0">
                  <CardTitle className="text-xl font-black border-l-4 border-blue-400 pl-6">Global Settings</CardTitle>
                </CardHeader>
                <CardContent className="p-10 space-y-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase text-slate-400">Twitter Handle</Label>
                    <Input 
                      value={settings.seo.global.twitter} 
                      onChange={e => setSettings({...settings, seo: {...settings.seo, global: {...settings.seo.global, twitter: e.target.value}}})}
                      className="rounded-xl h-12 bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase text-slate-400">Footer Compliance Note</Label>
                    <Textarea 
                      value={settings.seo.global.footer_note} 
                      onChange={e => setSettings({...settings, seo: {...settings.seo, global: {...settings.seo.global, footer_note: e.target.value}}})}
                      className="rounded-xl min-h-[100px] bg-white/5 border-white/10 text-white"
                      placeholder="e.g. Registered in India No. 12345..."
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="integrations">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-none shadow-sm rounded-[2.5rem] bg-white">
                <CardHeader className="p-10 pb-0"><CardTitle className="text-xl font-black">Tracking & Analytics</CardTitle></CardHeader>
                <CardContent className="p-10 space-y-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase text-slate-400">GA4 Measurement ID</Label>
                    <Input value={settings.integrations.ga4_id} onChange={e => setSettings({...settings, integrations: {...settings.integrations, ga4_id: e.target.value}})} className="rounded-xl h-12" placeholder="G-XXXXXXXXXX" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase text-slate-400">Meta Pixel ID</Label>
                    <Input value={settings.integrations.pixel_id} onChange={e => setSettings({...settings, integrations: {...settings.integrations, pixel_id: e.target.value}})} className="rounded-xl h-12" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm rounded-[2.5rem] bg-white">
                <CardHeader className="p-10 pb-0"><CardTitle className="text-xl font-black">Automation Webhooks</CardTitle></CardHeader>
                <CardContent className="p-10 space-y-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase text-slate-400">Lead Capture Webhook (n8n)</Label>
                    <Input value={settings.integrations.webhook_url} onChange={e => setSettings({...settings, integrations: {...settings.integrations, webhook_url: e.target.value}})} className="rounded-xl h-12" placeholder="https://n8n.qalalabs.com/..." />
                  </div>
                  <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-blue-900">SMTP Delivery</h4>
                      <p className="text-xs text-blue-700">Enable bulk email engine</p>
                    </div>
                    <Switch checked={settings.integrations.smtp_enabled} onCheckedChange={v => setSettings({...settings, integrations: {...settings.integrations, smtp_enabled: v}})} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default SiteManagement;