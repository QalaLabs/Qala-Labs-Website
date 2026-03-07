import * as React from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, Link } from 'react-router-dom';
import { 
  LayoutDashboard, Users, FileText, Settings, LogOut, 
  TrendingUp, Mail, Eye, CheckCircle2, Clock, Upload, Database,
  Search, Filter, MoreVertical, Download, X, BookOpen, Plus,
  BarChart as BarChartIcon, Globe, Edit, Trash2
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
import { parseAsenkaiXML, uploadToSupabase } from '@/utils/xmlImporter';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Cell 
} from 'recharts';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

const Admin = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const [leads, setLeads] = React.useState<any[]>([]);
  const [pages, setPages] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [importing, setImporting] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedLead, setSelectedLead] = React.useState<any>(null);

  React.useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate('/login'); return; }
      fetchData();
    };
    checkAuth();
  }, [navigate]);

  const fetchData = async () => {
    const [leadsRes, pagesRes] = await Promise.all([
      supabase.from('leads').select('*').order('created_at', { ascending: false }),
      supabase.from('pages').select('*').order('updated_at', { ascending: false })
    ]);
    
    if (!leadsRes.error) setLeads(leadsRes.data || []);
    if (!pagesRes.error) setPages(pagesRes.data || []);
    setLoading(false);
  };

  const deletePage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this page?")) return;
    const { error } = await supabase.from('pages').delete().eq('id', id);
    if (error) showError("Failed to delete page");
    else {
      showSuccess("Page deleted");
      fetchData();
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  const filteredLeads = leads.filter(lead => 
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.tool_used.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPages = pages.filter(page => 
    page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const chartData = React.useMemo(() => {
    return Array.from({ length: 7 }).map((_, i) => {
      const date = subDays(new Date(), i);
      const count = leads.filter(l => isSameDay(new Date(l.created_at), date)).length;
      return {
        name: format(date, 'MMM dd'),
        leads: count,
      };
    }).reverse();
  }, [leads]);

  const stats = {
    totalLeads: leads.length,
    todayLeads: leads.filter(l => isSameDay(new Date(l.created_at), new Date())).length,
    totalPages: pages.length,
    publishedPages: pages.filter(p => p.status === 'published').length
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="w-64 bg-slate-900 text-white p-6 flex flex-col fixed h-full">
        <div className="mb-10"><Logo variant="white" /></div>
        <nav className="space-y-2 flex-1">
          <Button variant="ghost" className="w-full justify-start gap-3 bg-blue-600/10 text-blue-400">
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </Button>
          <Link to="/admin/pages">
            <Button variant="ghost" className="w-full justify-start gap-3 text-slate-300 hover:text-white hover:bg-slate-800">
              <FileText className="w-4 h-4" /> Pages
            </Button>
          </Link>
          <Link to="/admin/media">
            <Button variant="ghost" className="w-full justify-start gap-3 text-slate-300 hover:text-white hover:bg-slate-800">
              <Database className="w-4 h-4" /> Media
            </Button>
          </Link>
          <Link to="/admin/guide">
            <Button variant="ghost" className="w-full justify-start gap-3 text-slate-300 hover:text-white hover:bg-slate-800">
              <BookOpen className="w-4 h-4" /> Editor Guide
            </Button>
          </Link>
        </nav>
        <Button onClick={handleLogout} variant="ghost" className="w-full justify-start gap-3 text-red-400 hover:text-red-300 hover:bg-red-900/20">
          <LogOut className="w-4 h-4" /> Logout
        </Button>
      </aside>

      <main className="flex-1 ml-64 p-10">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Scale Engine Control</h1>
            <p className="text-slate-500">Manage your growth pipeline and content.</p>
          </div>
          <div className="flex gap-4">
            <Button onClick={() => navigate('/admin/pages')} variant="outline" className="bg-white border-slate-200 text-slate-600 rounded-lg gap-2">
              <Plus className="w-4 h-4" /> New Page
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 rounded-lg gap-2">
              <TrendingUp className="w-4 h-4" /> View Analytics
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <Card className="bg-white border-none shadow-sm">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-slate-500 font-medium">Total Leads</p>
                  <h3 className="text-3xl font-bold mt-1">{stats.totalLeads}</h3>
                </div>
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Users className="w-5 h-5" /></div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border-none shadow-sm">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-slate-500 font-medium">Active Pages</p>
                  <h3 className="text-3xl font-bold mt-1">{stats.totalPages}</h3>
                </div>
                <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><FileText className="w-5 h-5" /></div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border-none shadow-sm md:col-span-2">
            <CardContent className="pt-6">
              <div className="h-[120px] w-full">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Lead Velocity</p>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <Tooltip 
                      cursor={{fill: 'transparent'}}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar dataKey="leads" radius={[4, 4, 0, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 6 ? '#2563eb' : '#e2e8f0'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="leads" className="space-y-6">
          <TabsList className="bg-white p-1 rounded-xl border border-slate-200">
            <TabsTrigger value="leads" className="rounded-lg px-6">Leads</TabsTrigger>
            <TabsTrigger value="pages" className="rounded-lg px-6">Pages</TabsTrigger>
            <TabsTrigger value="activity" className="rounded-lg px-6">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="leads">
            <Card className="border-none shadow-sm overflow-hidden bg-white">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <CardTitle className="text-lg">Recent Submissions</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input 
                    placeholder="Search leads..." 
                    className="pl-10 w-64 h-10 rounded-lg border-slate-200"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-widest font-bold">
                    <tr>
                      <th className="px-6 py-4">Email</th>
                      <th className="px-6 py-4">Source</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => setSelectedLead(lead)}>
                        <td className="px-6 py-4 font-medium text-slate-900">{lead.email}</td>
                        <td className="px-6 py-4">
                          <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-none capitalize">
                            {lead.tool_used.replace('_', ' ')}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500">{format(new Date(lead.created_at), 'MMM dd')}</td>
                        <td className="px-6 py-4 text-right">
                          <Button variant="ghost" size="icon"><Eye className="w-4 h-4" /></Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="pages">
            <Card className="border-none shadow-sm overflow-hidden bg-white">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <CardTitle className="text-lg">Existing Content</CardTitle>
                <Button onClick={() => navigate('/admin/pages')} variant="ghost" className="text-blue-600 font-bold hover:bg-blue-50">Manage All</Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-widest font-bold">
                    <tr>
                      <th className="px-6 py-4">Title</th>
                      <th className="px-6 py-4">Slug</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredPages.map((page) => (
                      <tr key={page.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-slate-900">{page.title}</td>
                        <td className="px-6 py-4 text-sm text-slate-500 font-mono">/p/{page.slug}</td>
                        <td className="px-6 py-4">
                          <Badge className={cn(
                            "rounded-full px-3 py-0.5 text-[10px] font-black uppercase tracking-widest border-none",
                            page.status === 'published' ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                          )}>
                            {page.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={() => navigate(`/admin/editor/${page.id}`)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-red-500" onClick={() => deletePage(page.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="activity">
            <Card className="border-none shadow-sm p-8 bg-white">
              <h3 className="text-lg font-bold mb-6">Recent Activity</h3>
              <div className="space-y-6">
                {leads.slice(0, 8).map((lead, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-900">
                        Lead captured from <span className="font-bold capitalize">{lead.tool_used.replace('_', ' ')}</span>
                      </p>
                      <p className="text-xs text-slate-400 mt-1">{format(new Date(lead.created_at), 'MMM dd, HH:mm')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Lead Detail Dialog */}
        <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
          <DialogContent className="max-w-2xl bg-white border-none rounded-[2.5rem] shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Submission Intelligence</DialogTitle>
            </DialogHeader>
            {selectedLead && (
              <div className="space-y-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Email</p>
                    <p className="font-bold text-slate-900">{selectedLead.email}</p>
                  </div>
                  <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Source</p>
                    <p className="font-bold text-slate-900 capitalize">{selectedLead.tool_used.replace('_', ' ')}</p>
                  </div>
                </div>

                <div className="p-6 bg-blue-50 rounded-3xl border border-blue-100">
                  <h4 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                    <Database className="w-4 h-4" /> Lead Data
                  </h4>
                  <div className="grid grid-cols-2 gap-y-6 gap-x-8">
                    {Object.entries(selectedLead.data || {}).map(([key, value]: [string, any]) => (
                      <div key={key}>
                        <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest mb-1">{key.replace(/_/g, ' ')}</p>
                        <p className="text-slate-900 font-bold">
                          {typeof value === 'number' ? value.toLocaleString() : String(value)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button variant="outline" onClick={() => setSelectedLead(null)} className="rounded-xl px-8">Close</Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 rounded-xl px-8">Sync to CRM</Button>
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