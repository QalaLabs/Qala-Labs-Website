"use client";

import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { 
  Save, Palette, Globe, Zap, 
  Image as ImageIcon, Type, 
  ShieldCheck, RefreshCcw, Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { showSuccess, showError } from '@/utils/toast';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

const SiteManagement = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<any>({
    appearance: {
      primary_color: '#2563eb',
      accent_color: '#0f172a',
      radius: '1rem',
      font_family: 'Inter',
      logo_url: '',
      favicon_url: ''
    },
    seo: {
      site_name: 'Qala Labs',
      default_description: 'Revenue Growth Agency',
      twitter_handle: '@qalalabs',
      og_image: ''
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
      .upsert({ 
        key: 'global_config', 
        value: settings, 
        updated_at: new Date().toISOString() 
      }, { onConflict: 'key' });

    if (!error) {
      // Trigger ISR Simulation
      await supabase.functions.invoke('lead-engine', {
        body: { type: 'revalidate', path: '/' }
      });
      showSuccess("Branding & SEO updated. Live site syncing...");
    } else {
      showError("Failed to save settings");
    }
    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AdminSidebar />
      
      <main className="flex-1 p-10">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Site & Branding</h1>
            <p className="text-slate-500">Manage design tokens, logos, and global SEO metadata.</p>
          </div>
          <Button onClick={handleSave} disabled={saving} className="bg-blue-600 hover:bg-blue-700 rounded-xl px-8 py-6 font-black shadow-lg">
            {saving ? <RefreshCcw className="w-5 h-5 animate-spin mr-2" /> : <Save className="w-5 h-5 mr-2" />}
            Sync Changes to Live
          </Button>
        </header>

        <Tabs defaultValue="branding" className="space-y-8">
          <TabsList className="bg-white p-1 rounded-2xl border border-slate-100 shadow-sm h-auto">
            <TabsTrigger value="branding" className="rounded-xl px-8 py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white font-bold">
              <Palette className="w-4 h-4 mr-2" /> Visual Identity
            </TabsTrigger>
            <TabsTrigger value="seo" className="rounded-xl px-8 py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white font-bold">
              <Search className="w-4 h-4 mr-2" /> Global SEO
            </TabsTrigger>
          </TabsList>

          <TabsContent value="branding">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="border-none shadow-sm rounded-[2.5rem] bg-white">
                <CardHeader className="p-10 pb-0"><CardTitle className="text-xl font-black">Design Tokens</CardTitle></CardHeader>
                <CardContent className="p-10 space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-xs font-black uppercase text-slate-400">Primary Color</Label>
                      <div className="flex gap-2">
                        <Input type="color" value={settings.appearance.primary_color} onChange={e => setSettings({...settings, appearance: {...settings.appearance, primary_color: e.target.value}})} className="w-12 h-12 p-1 rounded-lg" />
                        <Input value={settings.appearance.primary_color} onChange={e => setSettings({...settings, appearance: {...settings.appearance, primary_color: e.target.value}})} className="rounded-xl font-mono" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-black uppercase text-slate-400">Border Radius</Label>
                      <select 
                        className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white text-sm font-bold"
                        value={settings.appearance.radius}
                        onChange={e => setSettings({...settings, appearance: {...settings.appearance, radius: e.target.value}})}
                      >
                        <option value="0rem">Sharp (0px)</option>
                        <option value="0.5rem">Soft (8px)</option>
                        <option value="1rem">Rounded (16px)</option>
                        <option value="2rem">Organic (32px)</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase text-slate-400">Typography (Google Font)</Label>
                    <Input value={settings.appearance.font_family} onChange={e => setSettings({...settings, appearance: {...settings.appearance, font_family: e.target.value}})} className="rounded-xl h-12" placeholder="e.g. Inter, Montserrat" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm rounded-[2.5rem] bg-white">
                <CardHeader className="p-10 pb-0"><CardTitle className="text-xl font-black">Assets</CardTitle></CardHeader>
                <CardContent className="p-10 space-y-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase text-slate-400">Main Logo URL</Label>
                    <Input value={settings.appearance.logo_url} onChange={e => setSettings({...settings, appearance: {...settings.appearance, logo_url: e.target.value}})} className="rounded-xl h-12" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase text-slate-400">Favicon URL</Label>
                    <Input value={settings.appearance.favicon_url} onChange={e => setSettings({...settings, appearance: {...settings.appearance, favicon_url: e.target.value}})} className="rounded-xl h-12" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="seo">
            <Card className="border-none shadow-sm rounded-[2.5rem] bg-white">
              <CardHeader className="p-10 pb-0"><CardTitle className="text-xl font-black">Default Metadata</CardTitle></CardHeader>
              <CardContent className="p-10 space-y-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label className="text-xs font-black uppercase text-slate-400">Site Name</Label>
                      <Input value={settings.seo.site_name} onChange={e => setSettings({...settings, seo: {...settings.seo, site_name: e.target.value}})} className="rounded-xl h-12 font-bold" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-black uppercase text-slate-400">Default Description</Label>
                      <Textarea value={settings.seo.default_description} onChange={e => setSettings({...settings, seo: {...settings.seo, default_description: e.target.value}})} className="rounded-xl min-h-[100px]" />
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label className="text-xs font-black uppercase text-slate-400">Twitter Handle</Label>
                      <Input value={settings.seo.twitter_handle} onChange={e => setSettings({...settings, seo: {...settings.seo, twitter_handle: e.target.value}})} className="rounded-xl h-12" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-black uppercase text-slate-400">Default OG Image URL</Label>
                      <Input value={settings.seo.og_image} onChange={e => setSettings({...settings, seo: {...settings.seo, og_image: e.target.value}})} className="rounded-xl h-12" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default SiteManagement;