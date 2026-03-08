"use client";

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Edit, Eye, Trash2, RefreshCcw, AlertCircle, Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Page } from '@/types/editor';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { showSuccess, showError } from '@/utils/toast';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

const PageList = () => {
  const [pages, setPages] = React.useState<Page[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [syncing, setSyncing] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [tableMissing, setTableMissing] = React.useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const fetchPages = React.useCallback(async () => {
    setLoading(true);
    setTableMissing(false);
    const { data, error } = await supabase.from('pages').select('*').order('updated_at', { ascending: false });
    if (error) setTableMissing(true);
    else setPages(data || []);
    setLoading(false);
  }, []);

  React.useEffect(() => { fetchPages(); }, [fetchPages]);

  const syncExistingRoutes = async () => {
    if (!user) return;
    setSyncing(true);
    
    const allPages = [
      {
        title: 'Home Page',
        slug: 'home',
        description: 'Full editable homepage structure.',
        status: 'published',
        content: [
          { id: 'h1', type: 'hero', props: { title: "Scale Your DTC Brand to 8-Figures.", subtitle: "Data-driven creative for high-growth brands.", ctaText: "Get Proposal", ctaUrl: "/contact" } },
          { id: 'h2', type: 'tech_stack_ribbon', props: {} },
          { id: 'h3', type: 'why_different', props: {} },
          { id: 'h4', type: 'client_logos', props: {} },
          { id: 'h5', type: 'quick_metrics', props: {} },
          { id: 'h6', type: 'what_we_do', props: {} },
          { id: 'h7', type: 'how_we_work', props: {} },
          { id: 'h8', type: 'case_study_snapshots', props: {} },
          { id: 'h9', type: 'research_insights', props: {} },
          { id: 'h10', type: 'testimonial', props: { quote: "Qala Labs helped us scale fast and data-driven.", author: "CEO, Gaffar India" } },
          { id: 'h11', type: 'team_grid', props: { title: "The Team" } },
          { id: 'h12', type: 'faq', props: { title: "FAQ" } },
          { id: 'h13', type: 'closing_cta', props: {} }
        ]
      },
      {
        title: 'About Qala',
        slug: 'about',
        description: 'Company mission and roadmap.',
        status: 'published',
        content: [
          { id: 'a1', type: 'hero', props: { title: "About Qala Labs", subtitle: "We build predictable revenue engines.", ctaText: "Book Audit", ctaUrl: "/contact" } },
          { id: 'a2', type: 'quick_metrics', props: {} },
          { id: 'a3', type: 'how_we_work', props: { title: "The Scale Roadmap" } },
          { id: 'a4', type: 'team_grid', props: { title: "Our Founders" } },
          { id: 'a5', type: 'closing_cta', props: { title: "Ready to start your journey?" } }
        ]
      }
    ];

    const toUpsert = allPages.map(p => ({ ...p, user_id: user.id, updated_at: new Date().toISOString() }));
    const { error } = await supabase.from('pages').upsert(toUpsert, { onConflict: 'slug' });

    if (error) showError("Sync failed: " + error.message);
    else {
      showSuccess("Full site structure imported to database!");
      fetchPages();
    }
    setSyncing(false);
  };

  const filteredPages = pages.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.slug.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AdminSidebar />
      <main className="flex-1 p-10">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900">CMS Pages</h1>
            <p className="text-slate-500">Manage your dynamic site content.</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={syncExistingRoutes} disabled={syncing} variant="outline" className="rounded-xl border-blue-200 text-blue-600 gap-2 font-bold px-6 py-6">
              {syncing ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              Import Site Structure
            </Button>
            <Button onClick={() => navigate('/admin/editor/new')} className="bg-blue-600 hover:bg-blue-700 rounded-xl px-6 py-6 font-black">
              <Plus className="w-5 h-5 mr-2" /> Create New Page
            </Button>
          </div>
        </header>

        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input placeholder="Search pages..." className="pl-12 h-12 rounded-xl" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                <tr><th className="px-8 py-4">Title</th><th className="px-8 py-4">Slug</th><th className="px-8 py-4">Blocks</th><th className="px-8 py-4">Status</th><th className="px-8 py-4 text-right">Actions</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredPages.map((page) => (
                  <tr key={page.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-8 py-6"><span className="font-bold text-slate-900">{page.title}</span></td>
                    <td className="px-8 py-6"><code className="text-xs bg-slate-100 px-2 py-1 rounded">/p/{page.slug}</code></td>
                    <td className="px-8 py-6"><Badge variant="secondary">{page.content?.length || 0} sections</Badge></td>
                    <td className="px-8 py-6"><Badge className={cn("rounded-full px-3 py-0.5 text-[10px] font-black uppercase", page.status === 'published' ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700")}>{page.status}</Badge></td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" onClick={() => navigate(`/admin/editor/${page.id}`)}><Edit className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="icon" asChild><a href={`/p/${page.slug}`} target="_blank" rel="noopener noreferrer"><Eye className="w-4 h-4" /></a></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PageList;