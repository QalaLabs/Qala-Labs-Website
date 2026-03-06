"use client";

import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { 
  User, Shield, Bell, Globe, 
  Save, Loader2, Camera, Key,
  Mail, Phone, MapPin
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
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    company: 'Qala Labs',
    site_url: 'https://qalalabs.com',
    notifications: true,
    marketing_emails: false
  });

  useEffect(() => {
    if (profile) {
      setFormData(prev => ({
        ...prev,
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        email: user?.email || ''
      }));
    }
  }, [profile, user]);

  const handleSave = async () => {
    setLoading(true);
    const { error } = await supabase
      .from('profiles')
      .update({
        first_name: formData.first_name,
        last_name: formData.last_name,
        updated_at: new Date().toISOString()
      })
      .eq('id', user?.id);

    setLoading(false);
    if (error) showError("Failed to update profile");
    else showSuccess("Settings updated successfully");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AdminSidebar />
      
      <main className="flex-1 p-10">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Settings</h1>
            <p className="text-slate-500">Manage your account and site preferences.</p>
          </div>
          <Button onClick={handleSave} disabled={loading} className="bg-blue-600 hover:bg-blue-700 rounded-xl px-8 py-6 font-black shadow-lg shadow-blue-500/20">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5 mr-2" />}
            Save Changes
          </Button>
        </header>

        <Tabs defaultValue="profile" className="space-y-8">
          <TabsList className="bg-white p-1 rounded-2xl border border-slate-100 shadow-sm h-auto">
            <TabsTrigger value="profile" className="rounded-xl px-8 py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white flex items-center gap-2">
              <User className="w-4 h-4" /> Profile
            </TabsTrigger>
            <TabsTrigger value="site" className="rounded-xl px-8 py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white flex items-center gap-2">
              <Globe className="w-4 h-4" /> Site Config
            </TabsTrigger>
            <TabsTrigger value="security" className="rounded-xl px-8 py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white flex items-center gap-2">
              <Shield className="w-4 h-4" /> Security
            </TabsTrigger>
            <TabsTrigger value="notifications" className="rounded-xl px-8 py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white flex items-center gap-2">
              <Bell className="w-4 h-4" /> Notifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-none shadow-sm rounded-[2.5rem] bg-white md:col-span-2">
                <CardHeader className="p-10 pb-0">
                  <CardTitle className="text-2xl font-black">Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="p-10 space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">First Name</Label>
                      <Input value={formData.first_name} onChange={e => setFormData({...formData, first_name: e.target.value})} className="rounded-xl h-12" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Last Name</Label>
                      <Input value={formData.last_name} onChange={e => setFormData({...formData, last_name: e.target.value})} className="rounded-xl h-12" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Address</Label>
                    <Input value={formData.email} disabled className="rounded-xl h-12 bg-slate-50" />
                    <p className="text-[10px] text-slate-400">Email cannot be changed directly. Contact support for assistance.</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Phone Number</Label>
                    <Input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="rounded-xl h-12" placeholder="+91 98765 43210" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm rounded-[2.5rem] bg-white">
                <CardHeader className="p-10 pb-0">
                  <CardTitle className="text-2xl font-black">Avatar</CardTitle>
                </CardHeader>
                <CardContent className="p-10 flex flex-col items-center text-center">
                  <div className="relative group mb-6">
                    <div className="w-32 h-32 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 border-4 border-white shadow-xl overflow-hidden">
                      {profile?.avatar_url ? (
                        <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-12 h-12" />
                      )}
                    </div>
                    <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all">
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-slate-500 mb-6">Upload a high-resolution photo for your admin profile.</p>
                  <Button variant="outline" className="rounded-xl w-full">Remove Photo</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="site">
            <Card className="border-none shadow-sm rounded-[2.5rem] bg-white">
              <CardHeader className="p-10 pb-0">
                <CardTitle className="text-2xl font-black">Site Configuration</CardTitle>
              </CardHeader>
              <CardContent className="p-10 space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Agency Name</Label>
                      <Input value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="rounded-xl h-12" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Primary Domain</Label>
                      <Input value={formData.site_url} onChange={e => setFormData({...formData, site_url: e.target.value})} className="rounded-xl h-12" />
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                      <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><Globe className="w-4 h-4 text-blue-600" /> SEO Baseline</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">These settings define the default metadata for your dynamic pages and blog posts.</p>
                    </div>
                  </div>
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

                <div className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                      <Shield className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Two-Factor Authentication</h4>
                      <p className="text-xs text-slate-500">Add an extra layer of security to your account.</p>
                    </div>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="border-none shadow-sm rounded-[2.5rem] bg-white">
              <CardHeader className="p-10 pb-0">
                <CardTitle className="text-2xl font-black">Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="p-10 space-y-8">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900">Lead Alerts</h4>
                      <p className="text-xs text-slate-500">Receive real-time notifications when a new lead is captured.</p>
                    </div>
                    <Switch checked={formData.notifications} onCheckedChange={v => setFormData({...formData, notifications: v})} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900">Marketing Insights</h4>
                      <p className="text-xs text-slate-500">Receive weekly performance reports and growth tips.</p>
                    </div>
                    <Switch checked={formData.marketing_emails} onCheckedChange={v => setFormData({...formData, marketing_emails: v})} />
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

export default Settings;