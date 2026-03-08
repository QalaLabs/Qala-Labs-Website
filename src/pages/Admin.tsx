import * as React from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, Link } from 'react-router-dom';
import { 
  LayoutDashboard, Users, FileText, Settings, LogOut, 
  TrendingUp, Mail, Eye, CheckCircle2, Clock, Upload, Database,
  Search, Filter, MoreVertical, Download, X, BookOpen, Plus,
  BarChart as BarChartIcon, Globe, Edit, Trash2, RefreshCcw, Sparkles,
  Loader2
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
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Cell 
} from 'recharts';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

const Admin = () => {
  const navigate = useNavigate();
  const { signOut, user } = useAuth();
  const [leads, setLeads] = React.useState<any[]>([]);
  const [pages, setPages] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [seeding, setSeeding] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedLead, setSelectedLead] = React.useState<any>(null);

  const fetchData = React.useCallback(async () => {
    setLoading(true);
    const [leadsRes, pagesRes] = await Promise.all([
      supabase.from('leads').select('*').order('created_at', { ascending: false }),
      supabase.from('pages').select('*').order('updated_at', { ascending: false })
    ]);
    
    if (!leadsRes.error) setLeads(leadsRes.data || []);
    if (!pagesRes.error) setPages(pagesRes.data || []);
    setLoading(false);
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSeedData = async () => {
    if (!user) return;
    setSeeding(true);
    
    // Seed Case Study
    const caseStudy = {
      title: "Scaling GlowSkin to ₹12Cr",
      slug: "glowskin-case-study",
      category: "DTC Beauty",
      image_url: "https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?auto=format&fit=crop&q=80&w=800",
      results: {
        headline: "₹12Cr in 90 Days",
        metrics: [
          { label: "ROAS", value: "5.2x" },
          { label: "CPA Reduction", value: "42%" }
        ]
      },
      user_id: user.id
    };

    const blogPost = {
      title: "The 8-Figure Scale Engine Framework",
      slug: "scale-engine-framework",
      category: "Strategy",
      excerpt: "How to decouple creative from media buying to achieve predictable growth.",
      content: "<p>The secret to modern scale isn't bidding hacks...</p>",
      status: "published",
      user_id: user.id
    };

    try {
      await supabase.from('case_studies').upsert(caseStudy);
      await supabase.from('blog_posts').upsert(blogPost);
      showSuccess("Demo data seeded! Check Case Studies and Blog sections.");
      fetchData();
    } catch (e) {
      showError("Seed failed. Ensure all tables are created.");
    }
    setSeeding(false);
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  const filteredLeads = leads.filter(lead => 
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.tool_used.toLowerCase().includes(searchTerm.toLowerCase())
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
      <aside className="w-64 bg-slate-900 text-white p-6 flex flex-col fixed h-full z-20">
        <div className="mb-10"><Logo variant="white" /></div>
        <nav className="space-y-2 flex-1">
          <Link to="/admin">
            <Button variant="ghost" className="w-full justify-start gap-3 bg-blue-600/10 text-blue-400">
              <LayoutDashboard className="w-4 h-4" /> Dashboard
            </Button>
          </Link>
          <Link to="/admin/pages">
            <Button variant="ghost" className="w-full justify-start gap-3 text-slate-300 hover:text-white hover:bg-slate-800">
              <FileText className="w-4 h-4" /> Pages
            </Button>
          </Link>
          <Link to="/admin/case-studies">
            <Button variant="ghost" className="w-full justify-start gap-3 text-slate-300 hover:text-white hover:bg-slate-800">
              <TrendingUp className="w-4 h-4" /> Case Studies
            </Button>
          </Link>
          <Link to="/admin/blog">
            <Button variant="ghost" className="w-full justify-start gap-3 text-slate-300 hover:text-white hover:bg-slate-800">
              <BookOpen className="w-4 h-4" /> Blog
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
            <h1 className="text-3xl font-black text-slate-900">Agency Control Center</h1>
            <p className="text-slate-500">Scale performance overview and content engine.</p>
          </div>
          <div className="flex gap-4">
            <Button 
              onClick={handleSeedData} 
              disabled={seeding}
              variant="outline" 
              className="bg-indigo-50 border-indigo-100 text-indigo-600 rounded-xl gap-2 font-bold"
            >
              {seeding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              Seed Demo Data
            </Button>
            <Button onClick={fetchData} variant="outline" className="bg-white border-slate-200 text-slate-600 rounded-xl">
              <RefreshCcw className={cn("w-4 h-4", loading && "animate-spin")} />
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <Card className="bg-white border-none shadow-sm rounded-2xl">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-slate-500 font-medium">Captured Leads</p>
                  <h3 className="text-3xl font-black mt-1 text-slate-900">{stats.totalLeads}</h3>
                </div>
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Users className="w-5 h-5" /></div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border-none shadow-sm rounded-2xl">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-slate-500 font-medium">CMS Pages</p>
                  <h3 className="text-3xl font-black mt-1 text-slate-900">{stats.totalPages}</h3>
                </div>
                <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><FileText className="w-5 h-5" /></div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border-none shadow-sm md:col-span-2 rounded-2xl">
            <CardContent className="pt-6">
              <div className="h-[120px] w-full">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Pipeline Velocity</p>
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
          <TabsList className="bg-white p-1 rounded-2xl border border-slate-200 shadow-sm">
            <TabsTrigger value="leads" className="rounded-xl px-8">Submissions</TabsTrigger>
            <TabsTrigger value="activity" className="rounded-xl px-8">Real-time Feed</TabsTrigger>
          </TabsList>

          <TabsContent value="leads">
            <Card className="border-none shadow-sm overflow-hidden bg-white rounded-[2.5rem]">
              <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                <CardTitle className="text-xl font-black text-slate-900">Recent Growth Inquiries</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input 
                    placeholder="Filter submissions..." 
                    className="pl-10 w-64 h-12 rounded-xl border-slate-200"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                    <tr>
                      <th className="px-8 py-4">Partner Email</th>
                      <th className="px-8 py-4">Inquiry Source</th>
                      <th className="px-8 py-4">Captured</th>
                      <th className="px-8 py-4 text-right">Intelligence</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors cursor-pointer group" onClick={() => setSelectedLead(lead)}>
                        <td className="px-8 py-6 font-bold text-slate-900">{lead.email}</td>
                        <td className="px-8 py-6">
                          <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-none px-3 py-1 font-bold">
                            {lead.tool_used.replace('_', ' ')}
                          </Badge>
                        </td>
                        <td className="px-8 py-6 text-sm text-slate-500">{format(new Date(lead.created_at), 'MMM dd')}</td>
                        <td className="px-8 py-6 text-right">
                          <Button variant="ghost" size="icon" className="group-hover:text-blue-600 transition-colors"><Eye className="w-4 h-4" /></Button>
                        </td>
                      </tr>
                    ))}
                    {filteredLeads.length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-8 py-20 text-center text-slate-400 italic">No submissions yet. Launch a growth tool to start capturing data.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="activity">
            <Card className="border-none shadow-sm p-10 bg-white rounded-[2.5rem]">
              <h3 className="text-xl font-black mb-8 text-slate-900">Activity Stream</h3>
              <div className="space-y-8">
                {leads.slice(0, 10).map((lead, i) => (
                  <div key={i} className="flex gap-6 items-start relative">
                    {i < 9 && <div className="absolute left-5 top-10 bottom-0 w-px bg-slate-100" />}
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 z-10">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-900 leading-relaxed">
                        <span className="font-bold">{lead.email}</span> engaged with <span className="font-bold text-blue-600 capitalize">{lead.tool_used.replace('_', ' ')}</span>
                      </p>
                      <p className="text-xs text-slate-400 mt-1 font-medium">{format(new Date(lead.created_at), 'MMMM dd, HH:mm')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Lead Intelligence Dialog */}
        <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
          <DialogContent className="max-w-2xl bg-white border-none rounded-[3rem] shadow-2xl p-10">
            <DialogHeader>
              <DialogTitle className="text-3xl font-black text-slate-900">Submission Profile</DialogTitle>
            </DialogHeader>
            {selectedLead && (
              <div className="space-y-8 py-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Email</p>
                    <p className="font-black text-slate-900 text-lg">{selectedLead.email}</p>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Touchpoint</p>
                    <p className="font-black text-slate-900 text-lg capitalize">{selectedLead.tool_used.replace('_', ' ')}</p>
                  </div>
                </div>

                <div className="p-8 bg-blue-50 rounded-[2rem] border border-blue-100">
                  <h4 className="font-black text-blue-900 mb-6 flex items-center gap-3 text-lg">
                    <Database className="w-5 h-5" /> Data Payload
                  </h4>
                  <div className="grid grid-cols-2 gap-y-8 gap-x-12">
                    {Object.entries(selectedLead.data || {}).map(([key, value]: [string, any]) => (
                      <div key={key}>
                        <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest mb-1">{key.replace(/_/g, ' ')}</p>
                        <p className="text-slate-900 font-black text-xl">
                          {typeof value === 'number' ? value.toLocaleString() : String(value)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-6">
                  <Button variant="ghost" onClick={() => setSelectedLead(null)} className="rounded-xl px-10 h-14 font-bold">Dismiss</Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 rounded-xl px-10 h-14 font-black text-lg">Export to HubSpot</Button>
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