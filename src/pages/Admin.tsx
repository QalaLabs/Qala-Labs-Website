"use client";

import * as React from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, Link } from 'react-router-dom';
import { 
  LayoutDashboard, Users, FileText, Settings, LogOut, 
  TrendingUp, Mail, Eye, CheckCircle2, Clock, Database,
  Search, Filter, MoreVertical, Download, X, BookOpen, 
  MessageSquare, Send, Phone, Trash2, RefreshCcw, Sparkles,
  Loader2, FilterX, ChevronRight, UserCheck, Calendar
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { format, subDays, isSameDay } from 'date-fns';
import Logo from '@/components/layout/Logo';
import { showSuccess, showError } from '@/utils/toast';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

const services = ["Performance Marketing", "Creative Production", "Web Development", "Conversion Optimization", "Analytics & Data", "eCommerce Growth"];
const statuses = ["new", "contacted", "qualified", "closed"];

const Admin = () => {
  const navigate = useNavigate();
  const { signOut, user } = useAuth();
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

  const updateLeadStatus = async (id: string, status: string) => {
    const { error } = await supabase.from('leads').update({ data: { ...selectedLead.data, status } }).eq('id', id);
    if (!error) {
      showSuccess(`Status updated to ${status}`);
      fetchData();
      setSelectedLead(null);
    }
  };

  const filteredLeads = leads.filter(lead => {
    const data = lead.data || {};
    const matchesSearch = lead.email.toLowerCase().includes(searchTerm.toLowerCase()) || (data.name || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesService = filterService === 'all' || data.service === filterService;
    const matchesStatus = filterStatus === 'all' || data.status === filterStatus;
    return matchesSearch && matchesService && matchesStatus;
  });

  const sendWhatsApp = (phone: string) => {
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
            <Button onClick={fetchData} variant="outline" className="rounded-xl"><RefreshCcw className={cn("w-4 h-4", loading && "animate-spin")} /></Button>
            <Button className="bg-blue-600 hover:bg-blue-700 rounded-xl font-bold">Export CSV</Button>
          </div>
        </header>

        {/* Filter Bar */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 mb-8 flex flex-wrap items-center gap-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input placeholder="Search by name or email..." className="pl-10 h-12 rounded-xl" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
          
          <div className="flex items-center gap-3">
            <Label className="text-xs font-black text-slate-400 uppercase">Service</Label>
            <select className="h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 text-sm" value={filterService} onChange={e => setFilterService(e.target.value)}>
              <option value="all">All Services</option>
              {services.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="flex items-center gap-3">
            <Label className="text-xs font-black text-slate-400 uppercase">Status</Label>
            <select className="h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 text-sm" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
              <option value="all">All Statuses</option>
              {statuses.map(s => <option key={s} value={s}>{s.toUpperCase()}</option>)}
            </select>
          </div>

          <Button variant="ghost" className="text-slate-400" onClick={() => {setFilterService('all'); setFilterStatus('all'); setSearchTerm('');}}><FilterX className="w-4 h-4 mr-2" /> Reset</Button>
        </div>

        <Card className="border-none shadow-sm overflow-hidden bg-white rounded-[2.5rem]">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                <tr>
                  <th className="px-8 py-4">Lead Details</th>
                  <th className="px-8 py-4">Requested Service</th>
                  <th className="px-8 py-4">Source Page</th>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer" onClick={() => setSelectedLead(lead)}>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900">{lead.data?.name || 'Anonymous'}</span>
                        <span className="text-xs text-slate-400">{lead.email}</span>
                        <span className="text-[10px] font-medium text-blue-600 mt-1">{lead.data?.phone}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-none px-3 py-1 font-bold whitespace-nowrap">
                        {lead.data?.service || lead.tool_used.replace('_', ' ')}
                      </Badge>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-xs text-slate-500 truncate max-w-[150px]">{lead.data?.source_url || 'Unknown'}</span>
                        <span className="text-[9px] text-slate-400 font-medium">{format(new Date(lead.created_at), 'MMM dd, HH:mm')}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <Badge className={cn(
                        "rounded-full px-3 py-0.5 text-[10px] font-black uppercase tracking-widest",
                        (lead.data?.status === 'closed') ? "bg-green-100 text-green-700" :
                        (lead.data?.status === 'qualified') ? "bg-indigo-100 text-indigo-700" :
                        (lead.data?.status === 'contacted') ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-500"
                      )}>
                        {lead.data?.status || 'new'}
                      </Badge>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="icon" variant="ghost" onClick={(e) => {e.stopPropagation(); sendWhatsApp(lead.data?.phone)}} className="text-green-600 hover:bg-green-50"><MessageSquare className="w-4 h-4" /></Button>
                        <Button size="icon" variant="ghost" className="text-blue-600 hover:bg-blue-50"><Mail className="w-4 h-4" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
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
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => sendWhatsApp(selectedLead.data?.phone)} className="bg-green-600 hover:bg-green-700 gap-2"><Phone className="w-4 h-4" /> WhatsApp</Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 gap-2"><Send className="w-4 h-4" /> Email</Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="p-6 bg-slate-50 rounded-2xl">
                    <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Growth Interest</Label>
                    <p className="font-bold text-slate-900 mt-1">{selectedLead.data?.service || 'Not Specified'}</p>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-2xl">
                    <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Budget / Revenue</Label>
                    <p className="font-bold text-slate-900 mt-1">{selectedLead.data?.revenue || selectedLead.data?.budget || 'N/A'}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Update Pipeline Status</Label>
                  <div className="flex flex-wrap gap-2">
                    {statuses.map(s => (
                      <Button 
                        key={s} 
                        variant={selectedLead.data?.status === s ? 'default' : 'outline'}
                        className={cn("rounded-xl h-12 px-6 font-bold", selectedLead.data?.status === s && "bg-blue-600")}
                        onClick={() => updateLeadStatus(selectedLead.id, s)}
                      >
                        {s.toUpperCase()}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="p-8 bg-blue-50 rounded-[2rem] border border-blue-100">
                  <h4 className="font-black text-blue-900 mb-4 flex items-center gap-2"><Database className="w-4 h-4" /> Intelligence Snapshot</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {Object.entries(selectedLead.data || {}).filter(([k]) => k !== 'status' && k !== 'name').map(([key, value]: [string, any]) => (
                      <div key={key} className="flex flex-col">
                        <span className="text-[10px] text-blue-400 font-black uppercase">{key.replace('_', ' ')}</span>
                        <span className="text-slate-700 font-medium">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Bulk Email Campaign Modal */}
        <Dialog open={campaignModal} onOpenChange={setCampaignModal}>
          <DialogContent className="max-w-2xl bg-white rounded-[3rem] p-10">
            <DialogHeader><DialogTitle className="text-3xl font-black">Launch Bulk Campaign</DialogTitle></DialogHeader>
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <Label>Target Segment</Label>
                <select className="w-full h-12 rounded-xl border bg-slate-50 px-4">
                  <option>All Qualified Leads ({leads.filter(l => l.data?.status === 'qualified').length})</option>
                  <option>E-commerce Growth Interest</option>
                  <option>Custom Segment: Multi-Channel Brands</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Campaign Subject</Label>
                <Input className="h-12 rounded-xl" placeholder="8-Figure Scale Engine: Strategy Session" />
              </div>
              <div className="space-y-2">
                <Label>Email Content (Supports HTML)</Label>
                <Textarea className="min-h-[200px] rounded-xl" placeholder="Hey {{name}}, ready to scale your brand?" />
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 rounded-xl h-14" onClick={() => setCampaignModal(false)}>Save Draft</Button>
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700 rounded-xl h-14 font-black">Launch Campaign</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Admin;