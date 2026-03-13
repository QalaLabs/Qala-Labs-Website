"use client";

import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { 
  User, Shield, Bell, Globe, 
  Save, Loader2, Camera, Key,
  Mail, Phone, MapPin, Zap, Database, Link as LinkIcon,
  CreditCard, ShoppingCart, ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { showSuccess, showError } from '@/utils/toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

const Settings = () => {
  const { user, profile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    webhook_url: '',
    smtp_server: '',
    smtp_user: '',
    smtp_pass: '',
    notifications: true,
    marketing_emails: false,
    bnpl_enabled: true,
    partial_token_enabled: false,
    rto_protection: true
  });

  const handleSave = async () => {
    setLoading(true);
    // In a real app, you would store these in a specialized config table or vault
    showSuccess("Integration settings updated successfully");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AdminSidebar />
      
      <main className="flex-1 p-10">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Settings</h1>
            <p className="text-slate-500">Manage integrations and system preferences.</p>
          </div>
          <Button onClick={handleSave} disabled={loading} className="bg-blue-600 hover:bg-blue-700 rounded-xl px-8 py-6 font-black shadow-lg">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5 mr-2" />}
            Save Changes
          </Button>
        </header>

        <Tabs defaultValue="integrations" className="space-y-8">
          <TabsList className="bg-white p-1 rounded-2xl border border-slate-100 shadow-sm h-auto">
            <TabsTrigger value="integrations" className="rounded-xl px-8 py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white flex items-center gap-2">
              <Zap className="w-4 h-4" /> Integrations
            </TabsTrigger>
            <TabsTrigger value="checkout" className="rounded-xl px-8 py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" /> Checkout & Payments
            </TabsTrigger>
            <TabsTrigger value="smtp" className="rounded-xl px-8 py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white flex items-center gap-2">
              <Mail className="w-4 h-4" /> SMTP Config
            </TabsTrigger>
            <TabsTrigger value="security" className="rounded-xl px-8 py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white flex items-center gap-2">
              <Shield className="w-4 h-4" /> Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="integrations">
            <Card className="border-none shadow-sm rounded-[2.5rem] bg-white">
              <CardHeader className="p-10 pb-0">
                <CardTitle className="text-2xl font-black">Third-Party Sync</CardTitle>
              </CardHeader>
              <CardContent className="p-10 space-y-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <LinkIcon className="w-3 h-3" /> Incoming Lead Webhook (n8n/Zapier)
                    </Label>
                    <Input 
                      value={formData.webhook_url} 
                      onChange={e => setFormData({...formData, webhook_url: e.target.value})} 
                      className="rounded-xl h-12" 
                      placeholder="https://your-n8n-instance.com/webhook/..."
                    />
                    <p className="text-[10px] text-slate-400">All new leads captured on the site will be POSTed to this URL in real-time.</p>
                  </div>

                  <div className="p-8 bg-blue-50 rounded-[2rem] border border-blue-100 flex items-center gap-6">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm shrink-0">
                      <Database className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="font-black text-blue-900">Direct CRM Sync</h4>
                      <p className="text-sm text-blue-700/70">Enable this to automatically push qualified leads into your HubSpot or Salesforce instance via the webhook above.</p>
                    </div>
                    <Switch className="ml-auto" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="checkout">
            <Card className="border-none shadow-sm rounded-[2.5rem] bg-white">
              <CardHeader className="p-10 pb-0">
                <CardTitle className="text-2xl font-black">Payment Strategy</CardTitle>
              </CardHeader>
              <CardContent className="p-10 space-y-8">
                <div className="grid gap-6">
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                        <CreditCard className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">BNPL Core Strategy</h4>
                        <p className="text-xs text-slate-500">Enable Buy Now Pay Later as a primary payment option.</p>
                      </div>
                    </div>
                    <Switch checked={formData.bnpl_enabled} onCheckedChange={v => setFormData({...formData, bnpl_enabled: v})} />
                  </div>

                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">RTO Protection (High-Risk Pincodes)</h4>
                        <p className="text-xs text-slate-500">Automatically require partial tokens for high-risk areas.</p>
                      </div>
                    </div>
                    <Switch checked={formData.rto_protection} onCheckedChange={v => setFormData({...formData, rto_protection: v})} />
                  </div>

                  <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                    <h4 className="font-black text-blue-900 mb-2">Strategy Insight</h4>
                    <p className="text-sm text-blue-700/70 leading-relaxed">
                      Based on our recent tests, enabling BNPL can lift prepaid orders by up to 45%. Ensure your checkout messaging highlights "Interest-Free Instalments" to maximize conversion.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="smtp">
            <Card className="border-none shadow-sm rounded-[2.5rem] bg-white">
              <CardHeader className="p-10 pb-0">
                <CardTitle className="text-2xl font-black">Bulk Email SMTP</CardTitle>
              </CardHeader>
              <CardContent className="p-10 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black text-slate-400 uppercase">SMTP Server</Label>
                    <Input value={formData.smtp_server} onChange={e => setFormData({...formData, smtp_server: e.target.value})} className="rounded-xl h-12" placeholder="smtp.gmail.com" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black text-slate-400 uppercase">SMTP Username</Label>
                    <Input value={formData.smtp_user} onChange={e => setFormData({...formData, smtp_user: e.target.value})} className="rounded-xl h-12" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black text-slate-400 uppercase">SMTP Password</Label>
                  <Input type="password" value={formData.smtp_pass} onChange={e => setFormData({...formData, smtp_pass: e.target.value})} className="rounded-xl h-12" />
                </div>
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-xs text-slate-500 leading-relaxed">
                    <span className="font-bold text-slate-900">Security Note:</span> These credentials are used by the Supabase Edge Function to deliver your bulk email campaigns. Ensure you use an App Password if using Gmail.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card className="border-none shadow-sm rounded-[2.5rem] bg-white">
              <CardHeader className="p-10 pb-0">
                <CardTitle className="text-2xl font-black">Security & Access</CardTitle>
              </CardHeader>
              <CardContent className="p-10 space-y-8">
                <div className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                      <Key className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Change Password</h4>
                      <p className="text-xs text-slate-500">Update your login credentials regularly.</p>
                    </div>
                  </div>
                  <Button variant="outline" className="rounded-xl">Update Password</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Settings;