"use client";

import * as React from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, Link } from 'react-router-dom';
import { 
  LayoutDashboard, Users, FileText, Settings, LogOut, 
  TrendingUp, Mail, Eye, CheckCircle2, Database,
  Search, Filter, MoreVertical, X, BookOpen, 
  MessageSquare, Send, Phone, Trash2, RefreshCcw,
  Loader2, FilterX, Star, Zap, ShieldAlert, Download,
  Calendar, History, StickyNote, Briefcase, UserCheck, Trophy,
  Activity, Clock, PenTool
} from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { format, isWithinInterval, startOfDay, endOfDay, parseISO, formatDistanceToNow } from 'date-fns';
import Logo from '@/components/layout/Logo';
import { showSuccess, showError } from '@/utils/toast';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import LeadPipeline from '@/components/admin/LeadPipeline';
import AdminStats from '@/components/admin/AdminStats';
import LeadFilters from '@/components/admin/LeadFilters';
import LeadTable from '@/components/admin/LeadTable';
import LeadDetailModal from '@/components/admin/LeadDetailModal';
import CampaignModal from '@/components/admin/CampaignModal';
import { calculateLeadScore, getLeadInterest, exportLeadsToCSV } from '@/utils/admin';

const services = [
  "Performance Marketing", 
  "Creative Production", 
  "Web Development", 
  "Conversion Optimization", 
  "Analytics & Data", 
  "eCommerce Growth",
  "Agency Network",
  "Creator Collective"
];

const Admin = () => {
  const { signOut, user } = useAuth();
  const [leads, setLeads] = React.useState<any[]>([]);
  const [stats, setStats] = React.useState({ caseStudies: 0, portfolio: 0, blogs: 0, pages: 0 });
  const [loading, setLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filterService, setFilterService] = React.useState("all");
  const [filterScore, setFilterScore] = React.useState("all");
  const [dateRange, setDateRange] = React.useState({ start: '', end: '' });
  const [selectedLead, setSelectedLead] = React.useState<any>(null);
  const [campaignModal, setCampaignModal] = React.useState(false);

  const fetchData = React.useCallback(async () => {
    setLoading(true);
    const [leadsRes, studiesRes, portfolioRes, blogsRes, pagesRes] = await Promise.all([
      supabase.from('leads').select('*').order('created_at', { ascending: false }),
      supabase.from('case_studies').select('id', { count: 'exact' }),
      supabase.from('portfolio_projects').select('id', { count: 'exact' }),
      supabase.from('blog_posts').select('id', { count: 'exact' }),
      supabase.from('pages').select('id', { count: 'exact' })
    ]);

    if (!leadsRes.error) setLeads(leadsRes.data || []);
    setStats({
      caseStudies: studiesRes.count || 0,
      portfolio: portfolioRes.count || 0,
      blogs: blogsRes.count || 0,
      pages: pagesRes.count || 0
    });
    setLoading(false);
  }, []);

  React.useEffect(() => { fetchData(); }, [fetchData]);

  const handleSendCampaign = async (campaignData: any) => {
    const { data, error } = await supabase.functions.invoke('bulk-email', {
      body: { ...campaignData, user_id: user?.id }
    });
    if (error) showError("Failed to queue campaign");
    else {
      showSuccess(data.message);
      setCampaignModal(false);
    }
  };

  const filteredLeads = leads.filter(lead => {
    const interest = getLeadInterest(lead);
    const score = calculateLeadScore(lead);
    const matchesSearch = lead.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         (lead.data?.name || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesService = filterService === 'all' || interest === filterService;
    const matchesScore = filterScore === 'all' || 
                        (filterScore === 'high' && score >= 50) ||
                        (filterScore === 'medium' && score >= 30 && score < 50) ||
                        (filterScore === 'low' && score < 30);

    let matchesDate = true;
    if (dateRange.start && dateRange.end) {
      const leadDate = parseISO(lead.created_at);
      matchesDate = isWithinInterval(leadDate, {
        start: startOfDay(parseISO(dateRange.start)),
        end: endOfDay(parseISO(dateRange.end))
      });
    }
    return matchesSearch && matchesService && matchesScore && matchesDate;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="w-64 bg-slate-900 text-white p-6 flex flex-col fixed h-full z-20">
        <div className="mb-10"><Logo variant="white" /></div>
        <nav className="space-y-2 flex-1">
          <Link to="/admin"><Button variant="ghost" className="w-full justify-start gap-3 bg-blue-600/10 text-blue-400 font-bold"><LayoutDashboard className="w-4 h-4" /> CRM Dashboard</Button></Link>
          <Link to="/admin/pages"><Button variant="ghost" className="w-full justify-start gap-3 text-slate-300 font-bold"><FileText className="w-4 h-4" /> Site Content</Button></Link>
          <Link to="/admin/case-studies"><Button variant="ghost" className="w-full justify-start gap-3 text-slate-300 font-bold"><Trophy className="w-4 h-4" /> Case Studies</Button></Link>
          <Link to="/admin/portfolio"><Button variant="ghost" className="w-full justify-start gap-3 text-slate-300 font-bold"><Briefcase className="w-4 h-4" /> Portfolio</Button></Link>
          <Link to="/admin/blog"><Button variant="ghost" className="w-full justify-start gap-3 text-slate-300 font-bold"><BookOpen className="w-4 h-4" /> Blog Posts</Button></Link>
          <Link to="/admin/media"><Button variant="ghost" className="w-full justify-start gap-3 text-slate-300 font-bold"><Database className="w-4 h-4" /> Media Library</Button></Link>
          <Button onClick={() => setCampaignModal(true)} variant="ghost" className="w-full justify-start gap-3 text-slate-300 font-bold"><Mail className="w-4 h-4" /> Bulk Email</Button>
          <Link to="/admin/settings"><Button variant="ghost" className="w-full justify-start gap-3 text-slate-300 font-bold"><Settings className="w-4 h-4" /> Settings</Button></Link>
        </nav>
        <Button onClick={() => signOut()} variant="ghost" className="w-full justify-start gap-3 text-red-400 hover:bg-red-900/20"><LogOut className="w-4 h-4" /> Logout</Button>
      </aside>

      <main className="flex-1 ml-64 p-10">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900">CRM Intelligence</h1>
            <p className="text-slate-500">Managing {leads.length} leads across your ecosystem.</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => exportLeadsToCSV(filteredLeads)} variant="outline" className="rounded-xl gap-2 border-slate-200">
              <Download className="w-4 h-4" /> Export CSV
            </Button>
            <Button onClick={fetchData} variant="outline" className="rounded-xl"><RefreshCcw className={cn("w-4 h-4", loading && "animate-spin")} /></Button>
          </div>
        </header>

        <AdminStats stats={stats} />

        <div className="grid lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-2">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Conversion Pipeline</h3>
            <LeadPipeline leads={leads} />
          </div>
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
              <Activity className="w-3 h-3 text-blue-600" /> Live Activity
            </h3>
            <Card className="border-none shadow-sm bg-white rounded-[2rem] overflow-hidden">
              <CardContent className="p-6">
                <div className="space-y-6">
                  {leads.slice(0, 5).map((lead, i) => (
                    <div key={lead.id} className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">
                          New lead from <span className="text-blue-600">{lead.data?.name || 'Anonymous'}</span>
                        </p>
                        <p className="text-[10px] text-slate-400 mt-1">
                          {formatDistanceToNow(new Date(lead.created_at))} ago via {lead.tool_used.replace('_', ' ')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="border-none shadow-sm overflow-hidden bg-white rounded-[2.5rem]">
          <LeadFilters 
            searchTerm={searchTerm} setSearchTerm={setSearchTerm}
            filterService={filterService} setFilterService={setFilterService}
            filterScore={filterScore} setFilterScore={setFilterScore}
            dateRange={dateRange} setDateRange={setDateRange}
            clearFilters={() => { setSearchTerm(""); setFilterService("all"); setFilterScore("all"); setDateRange({ start: '', end: '' }); }}
            services={services}
          />
          <LeadTable leads={filteredLeads} onLeadClick={setSelectedLead} />
        </Card>

        <LeadDetailModal 
          lead={selectedLead} 
          isOpen={!!selectedLead} 
          onClose={() => setSelectedLead(null)} 
          onUpdate={fetchData} 
        />

        <CampaignModal 
          isOpen={campaignModal} 
          onClose={() => setCampaignModal(false)} 
          onSend={handleSendCampaign}
          leadsCount={leads.length}
          highIntentCount={leads.filter(l => calculateLeadScore(l) >= 50).length}
          services={services}
        />
      </main>
    </div>
  );
};

export default Admin;