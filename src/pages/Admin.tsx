import * as React from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, Link } from 'react-router-dom';
import { 
  LayoutDashboard, Users, FileText, Settings, LogOut, 
  TrendingUp, Mail, Eye, CheckCircle2, Clock, Upload, Database,
  Search, Filter, MoreVertical, Download, X, BookOpen, Plus,
  BarChart as BarChartIcon
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { format, startOfToday, subDays, isSameDay } from 'date-fns';
import Logo from '@/components/layout/Logo';
import { showSuccess, showError } from '@/utils/toast';
import { parseAsenkaiXML, uploadToSupabase } from '@/utils/xmlImporter';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Cell 
} from 'recharts';
import { useAuth } from '@/context/AuthContext';

const Admin = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const [leads, setLeads] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [importing, setImporting] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedLead, setSelectedLead] = React.useState<any>(null);

  React.useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate('/login'); return; }
      fetchLeads();
    };
    checkAuth();
  }, [navigate]);

  const fetchLeads = async () => {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });
    
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
        fetchLeads();
      } catch (err) {
        showError("Failed to parse XML file.");
      } finally {
        setImporting(false);
      }
    };
    reader.readAsText(file);
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  const exportLeads = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Email,Source,Date,Data\n"
      + leads.map(l => `${l.email},${l.tool_used},${l.created_at},${JSON.stringify(l.data).replace(/,/g, ';')}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `qala_leads_${format(new Date(), 'yyyy-MM-dd')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showSuccess("Leads exported to CSV");
  };

  const filteredLeads = leads.filter(lead => 
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.tool_used.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Generate chart data for the last 7 days
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
    total: leads.length,
    today: leads.filter(l => isSameDay(new Date(l.created_at), new Date())).length,
    conversionRate: "12.4%", // Mocked for now
    growth: "+18%" // Mocked for now
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="w-64 bg-slate-900 text-white p-6 flex flex-col fixed h-full">
        <div className="mb-10"><Logo variant="white" /></div>
        <nav className="space-y-2 flex-1">
          <Button variant="ghost" className="w-full justify-start gap-3 text-slate-300 hover:text-white hover:bg-slate-800">
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
            <label className="cursor-pointer bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 transition-colors">
              <Upload className="w-4 h-4" />
              {importing ? "Importing..." : "Import XML"}
              <input type="file" accept=".xml" className="hidden" onChange={handleFileUpload} disabled={importing} />
            </label>
            <Button onClick={exportLeads} className="bg-blue-600 hover:bg-blue-700 rounded-lg gap-2">
              <Download className="w-4 h-4" /> Export CSV
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <Card className="bg-white border-none shadow-sm">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-slate-500 font-medium">Total Leads</p>
                  <h3 className="text-3xl font-bold mt-1">{stats.total}</h3>
                </div>
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Users className="w-5 h-5" /></div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border-none shadow-sm">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-slate-500 font-medium">Leads Today</p>
                  <h3 className="text-3xl font-bold mt-1">{stats.today}</h3>
                </div>
                <div className="p-2 bg-green-50 rounded-lg text-green-600"><TrendingUp className="w-5 h-5" /></div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border-none shadow-sm md:col-span-2">
            <CardContent className="pt-6">
              <div className="h-[120px] w-full">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Weekly Acquisition</p>
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
            <TabsTrigger value="leads" className="rounded-lg">Recent Leads</TabsTrigger>
            <TabsTrigger value="activity" className="rounded-lg">Activity Log</TabsTrigger>
          </TabsList>

          <TabsContent value="leads">
            <Card className="border-none shadow-sm overflow-hidden">
              <CardHeader className="bg-white border-b border-slate-100 flex flex-row items-center justify-between">
                <CardTitle>Lead Management</CardTitle>
                <div className="flex gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input 
                      placeholder="Search leads..." 
                      className="pl-10 w-64 h-10 rounded-lg"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" size="icon"><Filter className="w-4 h-4" /></Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-widest font-bold">
                      <tr>
                        <th className="px-6 py-4">Email</th>
                        <th className="px-6 py-4">Source</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => setSelectedLead(lead)}>
                          <td className="px-6 py-4 font-medium text-slate-900">{lead.email}</td>
                          <td className="px-6 py-4">
                            <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-none">
                              {lead.tool_used.replace('_', ' ')}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 text-slate-500 text-sm">
                            {format(new Date(lead.created_at), 'MMM dd, yyyy')}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-green-500" />
                              <span className="text-sm text-slate-600">New</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Button variant="ghost" size="icon"><Eye className="w-4 h-4" /></Button>
                          </td>
                        </tr>
                      ))}
                      {filteredLeads.length === 0 && (
                        <tr>
                          <td colSpan={5} className="px-6 py-10 text-center text-slate-400">
                            No leads found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity">
            <Card className="border-none shadow-sm p-8">
              <h3 className="text-lg font-bold mb-6">Recent System Activity</h3>
              <div className="space-y-6">
                {leads.slice(0, 10).map((lead, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-900">
                        New lead submission from <span className="font-bold">{lead.email}</span> via <span className="text-blue-600">{lead.tool_used}</span>
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
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Lead Details</DialogTitle>
            </DialogHeader>
            {selectedLead && (
              <div className="space-y-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-xl">
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">Email Address</p>
                    <p className="font-bold text-slate-900">{selectedLead.email}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl">
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">Source Tool</p>
                    <p className="font-bold text-slate-900 capitalize">{selectedLead.tool_used.replace('_', ' ')}</p>
                  </div>
                </div>

                <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                  <h4 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                    <Database className="w-4 h-4" /> Submission Data
                  </h4>
                  <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                    {Object.entries(selectedLead.data || {}).map(([key, value]: [string, any]) => (
                      <div key={key}>
                        <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest mb-1">{key.replace('_', ' ')}</p>
                        <p className="text-slate-900 font-medium">
                          {typeof value === 'number' ? value.toLocaleString() : String(value)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setSelectedLead(null)}>Close</Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">Mark as Contacted</Button>
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