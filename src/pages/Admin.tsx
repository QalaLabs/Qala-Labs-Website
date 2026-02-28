"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Users, FileText, Settings, LogOut, 
  TrendingUp, Mail, Eye, CheckCircle2, Clock, Upload, Database
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { format } from 'date-fns';
import Logo from '@/components/layout/Logo';
import { showSuccess, showError } from '@/utils/toast';
import { parseAsenkaiXML, uploadToSupabase } from '@/utils/xmlImporter';

const Admin = () => {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [importing, setImporting] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate('/login'); return; }
      fetchLeads();
    };
    checkAuth();
  }, [navigate]);

  const fetchLeads = async () => {
    const { data, error } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
    if (!error) setLeads(data || []);
    setLoading(false);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImporting(true);
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target?.result as string;
      try {
        const parsedData = await parseAsenkaiXML(text);
        const results = await uploadToSupabase(parsedData);
        showSuccess(`Import Complete: ${results.success} items synced, ${results.errors} errors.`);
      } catch (err) {
        showError("Failed to parse XML file.");
      } finally {
        setImporting(false);
      }
    };
    reader.readAsText(file);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="w-64 bg-slate-900 text-white p-6 flex flex-col fixed h-full">
        <div className="mb-10"><Logo variant="white" /></div>
        <nav className="space-y-2 flex-1">
          <Button variant="ghost" className="w-full justify-start gap-3 text-slate-300 hover:text-white hover:bg-slate-800">
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 text-slate-300 hover:text-white hover:bg-slate-800">
            <Database className="w-4 h-4" /> Data Sync
          </Button>
        </nav>
        <Button onClick={handleLogout} variant="ghost" className="w-full justify-start gap-3 text-red-400 hover:text-red-300 hover:bg-red-900/20">
          <LogOut className="w-4 h-4" /> Logout
        </Button>
      </aside>

      <main className="flex-1 ml-64 p-10">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-slate-900">Scale Engine Control</h1>
          <div className="flex gap-4">
            <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
              <Upload className="w-4 h-4" />
              {importing ? "Importing..." : "Import Asenkai XML"}
              <input type="file" accept=".xml" className="hidden" onChange={handleFileUpload} disabled={importing} />
            </label>
          </div>
        </header>

        <Tabs defaultValue="leads" className="space-y-6">
          <TabsList>
            <TabsTrigger value="leads">Recent Leads</TabsTrigger>
            <TabsTrigger value="content">Content Library</TabsTrigger>
          </TabsList>

          <TabsContent value="leads">
            <Card>
              <CardHeader><CardTitle>Lead Management</CardTitle></CardHeader>
              <CardContent>
                {/* Lead table logic from previous step */}
                <div className="text-slate-500 text-sm">Showing {leads.length} active leads.</div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader><CardTitle>Blog Posts</CardTitle></CardHeader>
                <CardContent>
                  <p className="text-slate-500 text-sm mb-4">Manage articles imported from XML.</p>
                  <Button variant="outline" className="w-full">View All Posts</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Case Studies</CardTitle></CardHeader>
                <CardContent>
                  <p className="text-slate-500 text-sm mb-4">Manage success stories and ROI data.</p>
                  <Button variant="outline" className="w-full">View All Case Studies</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;