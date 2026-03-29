"use client";

import * as React from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, Link } from 'react-router-dom';
import { 
  LayoutDashboard, FileText, Settings, LogOut, 
  Mail, Database, RefreshCcw, Loader2, Download,
  Trophy, Briefcase, BookOpen, PenTool, BarChart3, PieChart as PieIcon, Activity
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format, isWithinInterval, startOfDay, endOfDay, parseISO, subDays } from 'date-fns';
import Logo from '@/components/layout/Logo';
import { showSuccess, showError } from '@/utils/toast';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import AdminStats from '@/components/admin/AdminStats';
import LeadFilters from '@/components/admin/LeadFilters';
import LeadTable from '@/components/admin/LeadTable';
import LeadDetailModal from '@/components/admin/LeadDetailModal';
import CampaignModal from '@/components/admin/CampaignModal';
import { calculateLeadScore, getLeadInterest, exportLeadsToCSV } from '@/utils/admin';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, BarChart, Bar 
} from 'recharts';
import { Badge } from "@/components/ui/badge";

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

  const analyticsData = React.useMemo(() => {
    if (!leads.length) return { timeData: [], toolData: [], scoreData: [] };

    // 1. Leads over time (Last 30 days)
    const last30Days = Array.from({ length: 30 }).map((_, i) => {
      const d = subDays(new Date(), i);
      return format(d, 'MMM dd');
    }).reverse();

    const timeMap = leads.reduce((acc: any, lead) => {
      const day = format(parseISO(lead.created_at), 'MMM dd');
      acc[day] = (acc[day] || 0) + 1;
      return acc;
    }, {});

    const timeData = last30Days.map(day => ({
      name: day,
      count: timeMap[day] || 0
    }));

    // 2. Tool Distribution
    const toolMap = leads.reduce((acc: any, lead) => {
      const tool = lead.tool_used.replace(/_/g, ' ').replace(/\bv2\b/g, '').trim();
      acc[tool] = (acc[tool] || 0) + 1;
      return acc;
    }, {});

    const toolData = Object.entries(toolMap).map(([name, value]) => ({ name, value }));

    // 3. Score Distribution
    const scores = { Low: 0, Medium: 0, High: 0 };
    leads.forEach(lead => {
      const score = calculateLeadScore(lead);
      if (score >= 50) scores.High++;
      else if (score >= 30) scores.Medium++;
      else scores.Low++;
    });

    const scoreData = [
      { name: 'Low', count: scores.Low },
      { name: 'Medium', count: scores.Medium },
      { name: 'High', count: scores.High }
    ];

    return { timeData, toolData, scoreData };
  }, [leads]);

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

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Analytics Intelligence</h3>
            <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-none text-[10px] font-black">LAST 30 DAYS</Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Leads Over Time */}
            <Card className="border-none shadow-sm bg-white rounded-[2rem] overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-600" /> Lead Volume
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[250px] pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={analyticsData.timeData}>
                    <defs>
                      <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" hide />
                    <YAxis hide />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                    <Area type="monotone" dataKey="count" stroke="#2563eb" strokeWidth={2} fillOpacity={1} fill="url(#colorCount)" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Tool Distribution */}
            <Card className="border-none shadow-sm bg-white rounded-[2rem] overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <PieIcon className="w-4 h-4 text-blue-600" /> Source Distribution
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[250px] pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={analyticsData.toolData}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {analyticsData.toolData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 0 ? '#2563eb' : index === 1 ? '#3b82f6' : '#60a5fa'} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Score Distribution */}
            <Card className="border-none shadow-sm bg-white rounded-[2rem] overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-blue-600" /> Lead Quality
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[250px] pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analyticsData.scoreData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold' }} />
                    <YAxis hide />
                    <Tooltip 
                      cursor={{ fill: '#f8fafc' }}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar dataKey="count" fill="#2563eb" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
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