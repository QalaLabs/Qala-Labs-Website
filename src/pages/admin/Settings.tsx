"use client";

import React, { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { 
  Save, Zap, Database, Link as LinkIcon,
  ShieldCheck, RefreshCcw, BarChart3,
  Mail, Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { showSuccess, showError } from '@/utils/toast';
import { supabase } from '@/integrations/supabase/client';

const Settings = () => {
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [formData, setFormData] = useState({
    gtm_id: '',
    pixel_id: '',
    ga4_id: '',
    webhook_url: '',
    server_side_enabled: true
  });

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase
      .from('site_settings')
      .upsert({ 
        key: 'integrations', 
        value: formData, 
        updated_at: new Date().toISOString() 
      }, { onConflict: 'key' });

    if (!error) {
      showSuccess("Integrations updated.");
    } else {
      showError("Failed to update integrations");
    }
    setSaving(false);
  };

  const handleTestEmail = async () => {
    setTesting(true);
    try {
      const { data, error } = await supabase.functions.invoke('bulk-email', {
        body: {
          isTest: true,
          to: 'qalakaar.qalalabs@gmail.com',
          subject: 'Test Email from Qala Labs',
          content: 'Your scale engine is ready to communicate!'
        }
      });
      
      if (error) throw error;
      showSuccess(data.message);
    } catch (err: any) {
      showError(err.message || "Failed to trigger test email. Check Supabase logs.");
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AdminSidebar />
      <main className="flex-1 p-10">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Integrations</h1>
            <p className="text-slate-500">Manage tracking IDs and automation.</p>
          </div>
          <div className="flex gap-3">
            <Button 
              onClick={handleTestEmail} 
              disabled={testing} 
              variant="outline" 
              className="rounded-xl px-6 py-6 border-blue-200 text-blue-600 gap-2 font-bold"
            >
              {testing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
              Send Test Email
            </Button>
            <Button onClick={handleSave} disabled={saving} className="bg-blue-600 hover:bg-blue-700 rounded-xl px-8 py-6 font-black shadow-lg">
              {saving ? <RefreshCcw className="w-5 h-5 animate-spin mr-2" /> : <Save className="w-5 h-5 mr-2" />}
              Save Integrations
            </Button>
          </div>
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
                  <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">GTM ID</Label>
                  <Input value={formData.gtm_id} onChange={e => setFormData({...formData, gtm_id: e.target.value})} className="rounded-xl h-12" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pixel ID</Label>
                  <Input value={formData.pixel_id} onChange={e => setFormData({...formData, pixel_id: e.target.value})} className="rounded-xl h-12" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">GA4 ID</Label>
                  <Input value={formData.ga4_id} onChange={e => setFormData({...formData, ga4_id: e.target.value})} className="rounded-xl h-12" />
                </div>
              </div>

              <div className="p-8 bg-blue-50 rounded-[2rem] border border-blue-100 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm shrink-0">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-black text-blue-900">Server-Side Tracking (CAPI)</h4>
                    <p className="text-sm text-blue-700/70">Route all events through our secure edge server.</p>
                  </div>
                </div>
                <Switch checked={formData.server_side_enabled} onCheckedChange={v => setFormData({...formData, server_side_enabled: v})} />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Settings;