"use client";

import * as React from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, Link } from 'react-router-dom';
import { 
  LayoutDashboard, Users, FileText, Settings, LogOut, 
  TrendingUp, Mail, Eye, CheckCircle2, Database,
  Search, Filter, MoreVertical, X, BookOpen, 
  MessageSquare, Send, Phone, Trash2, RefreshCcw,
  Loader2, FilterX, Star, Zap, ShieldAlert, DatabaseBackup
} from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { format } from 'date-fns';
import Logo from '@/components/layout/Logo';
import { showSuccess, showError } from '@/utils/toast';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

const services = ["Performance Marketing", "Creative Production", "Web Development", "Conversion Optimization", "Analytics & Data", "eCommerce Growth"];
const statuses = ["new", "contacted", "qualified", "closed"];

const Admin = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const [leads, setLeads] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filterService, setFilterService] = React.useState("all");
  const [filterStatus, setFilterStatus] = React.useState("all");
  const [selectedLead, setSelectedLead] = React.useState<any>(null);
  const [campaignModal, setCampaignModal] = React.useState(false);

  const fetchData = React.useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
    if (!error) setLeads(data || []);
    setLoading(false);
  }, []);

  React.useEffect(() => { fetchData(); }, [fetchData]);

  const seedDemoData = async () => {
    const demoLeads = [
      {
        email: "john@glowskin.com",
        tool_used: "roi_calculator",
        data: {
          name: "John Doe",
          phone: "+919876543210",
          service: "eCommerce Growth",
          revenue: "50L+",
          source_url: "https://qalalabs.com/tools",
          status: "qualified",
          utm_campaign: "google_search_brand",
          timestamp: new Date().toISOString()
        }
      },
      {
        email: "jane@minimalist.in",
        tool_used: "sticky_cta_microform",
        data: {
          name: "Jane Smith",
          phone: "+919000000001",
          service: "Performance Marketing",
          budget: "15L-50L",
          source_url: "https://qalalabs.com/case-studies/glowskin",
          status: "new",
          utm_campaign: "retargeting_meta",
          timestamp: new Date().toISOString()
        }
      }
    ];

    const { error } = await supabase.from('leads').insert(demoLeads);
    if (error) showError("Failed to seed data");
    else {
      showSuccess("Demo leads added to CRM!");
      fetchData();
    }
  };

  const calculateScore = (lead: any) => {
    let score = 0;
    const data = lead.data || {};
    const rev = data.revenue || data.budget || '';
    if (rev.includes('50L+') || rev.includes('25L+')) score += 50;
    if (rev.includes('15L-50L') || rev.includes('5-25L')) score += 30;
    if (data.service === 'eCommerce Growth' || data.service === 'Performance Marketing') score += 20;
    return score;
  };

  const filteredLeads = leads.filter(lead => {
    const data = lead.data || {};
    const matchesSearch = lead.email.toLowerCase().includes(searchTerm.toLowerCase()) || (data.name || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesService = filterService === 'all' || data.service === filterService;
    const matchesStatus = filterStatus === 'all' || data.status === filterStatus;
    return matchesSearch && matchesService && matchesStatus;
  });

  const sendWhatsApp = (phone: string) => {
    if (!phone) return;
    const cleanPhone = phone.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=Hi! I'm from Qala Labs. Regarding your growth audit request...`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="w-64 bg-slate-900 text-white p-6 flex flex-col fixed h-full z-20">
        <div className="mb-10"><Logo variant="white" /></div>
        <nav className="space-y-2 flex-1">
          <Link to="/admin"><Button variant="ghost" className="w-full justify-start gap-3 bg-blue-600/10 text-blue-400 font-bold"><LayoutDashboard className="w-4 h-4" /> CRM Dashboard</Button></Link>
          <Link to="/admin/pages"><Button variant="ghost" className="w-full justify-start gap-3 text-slate-300 font-bold"><FileText className="w-4 h-4" /> Site Content</Button></Link>
          <Button onClick={() => setCampaignModal(true)} variant="ghost" className="w-full justify-start gap-3 text-slate-300 font-bold"><Mail className="w-4 h-4" /> Bulk Email</Button>
          <Link to="/admin/settings"><Button variant="ghost" className="w-full justify-start gap-3 text-slate-300 font-bold"><Settings className="w-4 h-4" /> Settings</Button></Link>
        </nav>
        <Button onClick={() => signOut()} variant="ghost" className="w-full justify-start gap-3 text-red-400 hover:bg-red-900/20"><LogOut className="w-4 h-4" /> Logout</Button>
      </aside>

      <main className="flex-1 ml-64 p-10">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900">CRM Intelligence</h1>
            <p className="text-slate-500">Managing {leads.length} leads across your scale ecosystem.</p>
          </div>
          <div className="flex gap-4">
            <Button onClick={seedDemoData} variant="outline" className="rounded-xl border-blue-200 text-blue-600 gap-2 font-bold">
              <DatabaseBackup className="w-4 h-4" /> Seed Demo Data
            </Button>
            <Button onClick={fetchData} variant="outline" className="rounded-xl"><RefreshCcw className={cn("w-4 h-4", loading && "animate-spin")} /></Button>
          </div>
        </header>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Total Prospects</p>
            <p className="text-4xl font-black text-slate-900">{leads.length}</p>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2">High Quality Leads</p>
            <p className="text-4xl font-black text-slate-900">{leads.filter(l => calculateScore(l) >= 50).length}</p>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">Conversion Rate</p>
            <p className="text-4xl font-black text-slate-900">{((leads.filter(l => l.data?.status === 'closed').length / (leads.length || 1)) * 100).toFixed(1)}%</p>
          </div>
        </div>

        <Card className="border-none shadow-sm overflow-hidden bg-white rounded-[2.5rem]">
          <div className="p-8 border-b border-slate-50 flex items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input placeholder="Search prospects..." className="pl-10 h-12 rounded-xl" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
            <div className="flex gap-4">
              <select className="h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold" value={filterService} onChange={e => setFilterService(e.target.value)}>
                <option value="all">All Services</option>
                {services.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <select className="h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                <option value="all">All Statuses</option>
                {statuses.map(s => <option key={s} value={s}>{s.toUpperCase()}</option>)}
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                <tr>
                  <th className="px-8 py-4">Lead</th>
                  <th className="px-8 py-4">Score</th>
                  <th className="px-8 py-4">Interest</th>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredLeads.map((lead) => {
                  const score = calculateScore(lead);
                  return (
                    <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer" onClick={() => setSelectedLead(lead)}>
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-900">{lead.data?.name || 'Anonymous'}</span>
                          <span className="text-xs text-slate-400">{lead.email}</span>
                          <span className="text-[10px] text-blue-600 font-bold mt-1">{lead.data?.phone}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <Badge className={cn(
                          "rounded-full px-3 py-1 font-black text-[10px]",
                          score >= 50 ? "bg-green-100 text-green-700" : score >= 30 ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-500"
                        )}>
                          {score >= 50 ? <Star className="w-3 h-3 mr-1 fill-current" /> : null}
                          SCORE: {score}
                        </Badge>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-sm font-bold text-slate-600">{lead.data?.service || 'General Inquiry'}</span>
                      </td>
                      <td className="px-8 py-6">
                        <Badge variant="secondary" className="uppercase font-black text-[9px] tracking-widest">{lead.data?.status || 'new'}</Badge>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button size="icon" variant="ghost" onClick={(e) => {e.stopPropagation(); sendWhatsApp(lead.data?.phone)}} className="text-green-600 hover:bg-green-50"><MessageSquare className="w-4 h-4" /></Button>
                          <Button size="icon" variant="ghost" className="text-blue-600 hover:bg-blue-50"><Mail className="w-4 h-4" /></Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Lead Detail Panel */}
        <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
          <DialogContent className="max-w-3xl bg-white rounded-[3rem] p-10">
            {selectedLead && (
              <div className="space-y-8">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-3xl font-black text-slate-900">{selectedLead.data?.name || 'Lead Profile'}</h2>
                    <p className="text-slate-500">{selectedLead.email}</p>
                    <Badge className="mt-2 bg-blue-600">ID: {selectedLead.id.split('-')[0]}</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => sendWhatsApp(selectedLead.data?.phone)} className="bg-green-600 hover:bg-green-700 gap-2 px-6 rounded-xl h-12"><Phone className="w-4 h-4" /> WhatsApp</Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 gap-2 px-6 rounded-xl h-12"><Send className="w-4 h-4" /> Email</Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                    <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Source Context</Label>
                    <div className="mt-4 space-y-4">
                      <div><p className="text-xs text-slate-400">Captured on</p><p className="font-bold text-slate-900 truncate">{selectedLead.data?.source_url || 'Direct'}</p></div>
                      <div><p className="text-xs text-slate-400">Date/Time</p><p className="font-bold text-slate-900">{format(new Date(selectedLead.created_at), 'MMM dd, yyyy HH:mm')}</p></div>
                      <div><p className="text-xs text-slate-400">Campaign UTM</p><p className="font-bold text-blue-600">{selectedLead.data?.utm_campaign || 'Organic'}</p></div>
                    </div>
                  </div>
                  <div className="p-8 bg-blue-50 rounded-[2.5rem] border border-blue-100">
                    <Label className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Lead Intelligence</Label>
                    <div className="mt-4 space-y-4">
                      <div><p className="text-xs text-blue-400/70">Phone Number</p><p className="font-bold text-slate-900">{selectedLead.data?.phone || 'N/A'}</p></div>
                      <div><p className="text-xs text-blue-400/70">Requested Service</p><p className="font-bold text-slate-900">{selectedLead.data?.service || 'N/A'}</p></div>
                      <div><p className="text-xs text-blue-400/70">Budget/Revenue</p><p className="font-bold text-slate-900">{selectedLead.data?.revenue || selectedLead.data?.budget || 'N/A'}</p></div>
                    </div>
                  </div>
                </div>

                <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white">
                  <h4 className="font-black mb-6 flex items-center gap-2"><Database className="w-4 h-4 text-blue-400" /> raw_json_payload</h4>
                  <pre className="text-[10px] font-mono text-slate-400 overflow-auto max-h-40 bg-black/20 p-4 rounded-xl">
                    {JSON.stringify(selectedLead.data, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Admin;