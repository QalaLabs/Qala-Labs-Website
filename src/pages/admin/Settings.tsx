"use client";

import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { 
  Save, Zap, Database, Link as LinkIcon,
  ShieldCheck, RefreshCcw, Code, BarChart3
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { showSuccess, showError } from '@/utils/toast';
import { supabase } from '@/integrations/supabase/client';

const Settings = () => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    gtm_id: '',
    pixel_id: '',
    ga4_id: '',
    webhook_url: '',
    server_side_enabled: true
  });

  const handleSave = async () => {
    setSaving(true);
    // In this architecture, we store these in site_settings under 'integrations'
    const { error } = await supabase
      .from('site_settings')
      .upsert({ 
        key: 'integrations', 
        value: formData, 
        updated_at: new Date().toISOString() 
      }, { onConflict: 'key' });

    if (!error) {
      showSuccess("Integrations updated. Rebuilding tracking layer...");
    } else {
      showError("Failed to update integrations");
    }
    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AdminSidebar />
      
      <main className="flex-1 p-10">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Integrations</h1>
            <p className="text-slate-500">Manage tracking IDs, pixels, and automation webhooks.</p>
          </div>
          <Button onClick={handleSave} disabled={saving} className="bg-blue-600 hover:bg-blue-700 rounded-xl px-8 py-6 font-black shadow-lg">
            {saving ? <RefreshCcw className="w-5 h-5 animate-spin mr-2" /> : <Save className="w-5 h-5 mr-2" />}
            Save Integrations
          </Button>
        </header>

        <div className="grid gap-8">
          <Card className="border-none shadow-sm rounded-[2.5rem] bg-white">
            <CardHeader className="p-10 pb-0">
              <CardTitle className="text-2xl font-black flex items-center gap-3">
                <BarChart3 className="w-6 h-6 text-blue-600" /> Tracking & Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="p-10 space-y-8">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Google Tag Manager ID</Label>
                  <Input value={formData.gtm_id} onChange={e => setFormData({...formData, gtm_id: e.target.value})} className="rounded-xl h-12" placeholder="GTM-XXXXXXX" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Meta Pixel ID</Label>
                  <Input value={formData.pixel_id} onChange={e => setFormData({...formData, pixel_id: e.target.value})} className="rounded-xl h-12" placeholder="1234567890" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">GA4 Measurement ID</Label>
                  <Input value={formData.ga4_id} onChange={e => setFormData({...formData, ga4_id: e.target.value})} className="rounded-xl h-12" placeholder="G-XXXXXXXXXX" />
                </div>
              </div>

              <div className="p-8 bg-blue-50 rounded-[2rem] border border-blue-100 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm shrink-0">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-black text-blue-900">Server-Side Tracking (CAPI)</h4>
                    <p className="text-sm text-blue-700/70">Route all events through our secure edge server to bypass ad-blockers and improve attribution accuracy.</p>
                  </div>
                </div>
                <Switch checked={formData.server_side_enabled} onCheckedChange={v => setFormData({...formData, server_side_enabled: v})} />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-[2.5rem] bg-white">
            <CardHeader className="p-10 pb-0">
              <CardTitle className="text-2xl font-black flex items-center gap-3">
                <LinkIcon className="w-6 h-6 text-blue-600" /> Automation Webhooks
              </CardTitle>
            </CardHeader>
            <CardContent className="p-10 space-y-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Incoming Lead Webhook (n8n/Zapier)</Label>
                <Input 
                  value={formData.webhook_url} 
                  onChange={e => setFormData({...formData, webhook_url: e.target.value})} 
                  className="rounded-xl h-12" 
                  placeholder="https://your-n8n-instance.com/webhook/..."
                />
                <p className="text-[10px] text-slate-400">All new leads captured on the site will be POSTed to this URL in real-time.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Settings;