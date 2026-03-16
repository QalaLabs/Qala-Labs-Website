"use client";

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Edit, Eye, Trash2, RefreshCcw, AlertCircle, Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Page, Block, BlockType } from '@/types/editor';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { showSuccess, showError } from '@/utils/toast';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

// Import images for the default import
import AashirwadImg from '@/assets/Aashirwad.png';
import DipikaImg from '@/assets/Dipika.jpg';
import AryamanImg from '@/assets/Aryaman.png';
import ManpreetImg from '@/assets/Manpreet.png';

const PageList = () => {
  const [pages, setPages] = React.useState<Page[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [syncing, setSyncing] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  const fetchPages = React.useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from('pages').select('*').order('updated_at', { ascending: false });
    if (!error) setPages(data || []);
    setLoading(false);
  }, []);

  React.useEffect(() => { fetchPages(); }, [fetchPages]);

  const syncExistingRoutes = async () => {
    if (!user) return;
    setSyncing(true);
    
    const homeBlocks = [
      { id: 'h1', type: 'hero', props: { title: "Scale Your DTC Brand to 8-Figures.", subtitle: "We combine high-performance paid media with high-velocity creative to build predictable scale engines for DTC & B2B.", ctaText: "Get Proposal", ctaUrl: "/contact" } },
      { id: 'h2', type: 'tech_stack_ribbon', props: {} },
      { id: 'h3', type: 'why_different', props: { title: "Why we're different", description: "We're revenue engineers, not growth hackers. We pair rigorous research with hands-on execution so every experiment has a clear hypothesis, an attribution plan, and measurable revenue impact." } },
      { id: 'h4', type: 'client_logos', props: {} },
      { id: 'h5', type: 'quick_metrics', props: { title: "Recent Results", subtitle: "Proven Performance.", results: [
        { brand: "Amazon Ads: Apparel Scale", stats: [{ label: "Top ROAS", value: "11.2x", iconType: 'zap' }, { label: "Monthly Sales", value: "₹2.7L+", iconType: 'trending' }], color: "from-blue-600/20 to-indigo-600/20" },
        { brand: "CSK: Real Fans, Real Roar", stats: [{ label: "Viral Reach", value: "5M+", iconType: 'share' }, { label: "Engagement", value: "12%", iconType: 'heart' }], color: "from-yellow-600/20 to-orange-600/20" }
      ] } },
      { id: 'h6', type: 'what_we_do', props: { title: "What we do" } },
      { id: 'h7', type: 'how_we_work', props: { title: "How we work" } },
      { id: 'h8', type: 'case_study_snapshots', props: { studyIds: [] } },
      { id: 'h9', type: 'research_insights', props: { title: "Research & Insights", description: "We believe in doing the right research and finding the perfect insight for your brand to work on: from customer micro-segments to creative triggers and measurement design." } },
      { id: 'h10', type: 'testimonial', props: { quote: "Qala Labs helped us scale to a six-figure monthly run-rate: fast, strategic, and data-driven.", author: "CEO, Gaffar India" } },
      { id: 'h11', type: 'team_grid', props: { 
        title: "The Team",
        members: [
          { name: "Aashirwad Bhansali", role: "Growth & Performance Strategy", desc: "Data-first paid media, experiment design, and scaling playbooks.", image: AashirwadImg, linkedin: "https://www.linkedin.com/in/aashirwad-bhansali/" },
          { name: "Dipika", role: "Ecommerce Scaling", desc: "Listing optimization, retention engineering, and lifecycle flows.", image: DipikaImg, linkedin: "https://www.linkedin.com/in/dipika-k-53a3bb138/" },
          { name: "Aryaman", role: "Social Media and Talent Management", desc: "Creator programs, UGC production, and cross-platform distribution.", image: AryamanImg, linkedin: "https://www.linkedin.com/in/aryaman-chatterjee-b8971b208/" },
          { name: "Manpreet Singh", role: "Visualiser", desc: "Visual storytelling, brand aesthetics, and high-impact design.", image: ManpreetImg, linkedin: "https://www.linkedin.com/in/manpreet-singh-020549237" }
        ]
      } },
      { id: 'h12', type: 'faq', props: { title: "FAQ" } },
      { id: 'h13', type: 'closing_cta', props: {} }
    ];

    // 1. Upsert the page metadata
    const { data: pageData, error: pageError } = await supabase
      .from('pages')
      .upsert({
        title: 'Home Page',
        slug: 'home',
        description: 'Full editable homepage structure.',
        status: 'published',
        user_id: user.id,
        updated_at: new Date().toISOString()
      }, { onConflict: 'slug' })
      .select()
      .single();

    if (pageError) {
      showError("Sync failed: " + pageError.message);
      setSyncing(false);
      return;
    }

    // 2. Clear and insert blocks for the page
    await supabase.from('page_blocks').delete().eq('page_id', pageData.id);
    
    const blocksToInsert = homeBlocks.map((block, index) => ({
      page_id: pageData.id,
      block_type: block.type,
      content_data: block.props,
      sort_order: index
    }));

    const { error: blocksError } = await supabase.from('page_blocks').insert(blocksToInsert);

    if (blocksError) {
      showError("Blocks sync failed: " + blocksError.message);
    } else {
      showSuccess("Full site structure and blocks imported successfully!");
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
                <tr><th className="px-8 py-4">Title</th><th className="px-8 py-4">Slug</th><th className="px-8 py-4">Status</th><th className="px-8 py-4 text-right">Actions</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredPages.map((page) => (
                  <tr key={page.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-8 py-6"><span className="font-bold text-slate-900">{page.title}</span></td>
                    <td className="px-8 py-6"><code className="text-xs bg-slate-100 px-2 py-1 rounded">/p/{page.slug}</code></td>
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