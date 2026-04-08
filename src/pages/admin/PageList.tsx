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
import AayushImg from '@/assets/Aayush.png';
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
    if (!user) {
      showError("User not authenticated");
      setSyncing(false);
      return;
    }
    setSyncing(true);

    try {
      // Helper to get or create a page by slug
      const getOrCreatePage = async (slug: string, title: string, description: string, status: 'published' | 'draft' = 'published') => {
        const { data: existingPage, error: pageError } = await supabase
          .from('pages')
          .select('*')
          .eq('slug', slug)
          .single();

        let pageId: string;

        if (pageError && pageError.code === 'PGRST116') {
          // Page doesn't exist — create it
          const { data: createdPage, error: createError } = await supabase
            .from('pages')
            .insert({
              title,
              slug,
              description,
              status,
              user_id: user.id,
              updated_at: new Date().toISOString()
            })
            .select()
            .single();

          if (createError) throw createError;
          pageId = createdPage.id;
          console.log(`[CMS Sync] Created new page '${slug}':`, pageId);
        } else {
          // Page exists — use its ID
          pageId = existingPage.id;
          console.log(`[CMS Sync] Found existing page '${slug}':`, pageId);
        }

        return pageId;
      };

      // Define page configurations
      const pagesToSync = [
        {
          slug: 'home',
          title: 'Home Page',
          description: 'Full editable homepage structure.',
          blocks: [
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
            { id: 'h8', type: 'case_study_snapshots', props: {} },
            { id: 'h8b', type: 'portfolio_snapshots', props: {} },
            { id: 'h9', type: 'research_insights', props: { title: "Research & Insights", description: "We believe in doing the right research and finding the perfect insight for your brand to work on: from customer micro-segments to creative triggers and measurement design." } },
            { id: 'h10', type: 'testimonial', props: { quote: "Qala Labs helped us scale to a six-figure monthly run-rate: fast, strategic, and data-driven.", author: "CEO, Gaffar India" } },
            { id: 'h11', type: 'team_grid', props: { 
              title: "The Team",
              members: [
                { name: "Aashirwad Bhansali", role: "Growth & Performance Strategy", desc: "Data-first paid media, experiment design, and scaling playbooks.", image: AashirwadImg, linkedin: "https://www.linkedin.com/in/aashirwad-bhansali/" },
                { name: "Aayush Singh", role: "AI and Tech Lead", desc: "Architecting autonomous AI agents and high-performance tech stacks for ecommerce scale.", image: AayushImg, linkedin: "#" },
                { name: "Dipika", role: "Ecommerce Scaling", desc: "Listing optimization, retention engineering, and lifecycle flows.", image: DipikaImg, linkedin: "https://www.linkedin.com/in/dipika-k-53a3bb138/" },
                { name: "Aryaman", role: "Social Media and Talent Management", desc: "Creator programs, UGC production, and cross-platform distribution.", image: AryamanImg, linkedin: "https://www.linkedin.com/in/aryaman-chatterjee-b8971b208/" },
                { name: "Manpreet Singh", role: "Visualiser", desc: "Visual storytelling, brand aesthetics, and high-impact design.", image: ManpreetImg, linkedin: "https://www.linkedin.com/in/manpreet-singh-020549237" }
              ]
            } },
            { id: 'h12', type: 'faq', props: { title: "FAQ" } },
            { id: 'h13', type: 'closing_cta', props: {} }
          ]
        },
        {
          slug: 'about',
          title: 'About',
          description: 'About Qala Labs page.',
          blocks: [
            { id: 'a1', type: 'hero', props: { title: "We build predictable revenue engines for ecommerce.", subtitle: "Performance marketing, AI automation, conversion-first sites and creator programs all engineered to grow revenue, not vanity metrics.", ctaText: "Book 15-min growth audit", ctaUrl: "/contact", secondaryCtaText: "Request case pack", secondaryCtaUrl: "/contact" } },
            { id: 'a2', type: 'kpi_grid', props: { /* KPI data will be hardcoded in component; we can leave empty or pass placeholder */ } },
            { id: 'a3', type: 'rich_text', props: { content: "<h2>Our Culture</h2><p>Rigor over hype, Radical transparency, Ownership, Velocity Wins, Customer Centric, Scale First.</p>" } },
            { id: 'a4', type: 'rich_text', props: { content: "<h2>The Methodology</h2><p>High-Velocity Creative, Proprietary Data Stack, AI-Powered Ops.</p>" } },
            { id: 'a5', type: 'rich_text', props: { content: "<h2>How We Work</h2><p>Audit & Hypothesis, Rapid Experiments, Automation & Scale, Retention & Ops.</p>" } },
            { id: 'a6', type: 'rich_text', props: { content: "<h2>Research & Insights</h2><p>We believe in doing the right research and finding the perfect insight for your brand to work on.</p>" } },
            { id: 'a7', type: 'team_grid', props: { 
              title: "The Team",
              members: [
                { name: "Aashirwad Bhansali", role: "Growth & Performance Strategy", desc: "Data-first paid media, experiment design, and scaling playbooks.", image: AashirwadImg, linkedin: "https://www.linkedin.com/in/aashirwad-bhansali/" },
                { name: "Aayush Singh", role: "AI and Tech Lead", desc: "Architecting autonomous AI agents and high-performance tech stacks for ecommerce scale.", image: AayushImg, linkedin: "#" },
                { name: "Dipika", role: "Ecommerce Scaling", desc: "Listing optimization, retention engineering, and lifecycle flows.", image: DipikaImg, linkedin: "https://www.linkedin.com/in/dipika-k-53a3bb138/" },
                { name: "Aryaman", role: "Social Media and Talent Management", desc: "Creator programs, UGC production, and cross-platform distribution.", image: AryamanImg, linkedin: "https://www.linkedin.com/in/aryaman-chatterjee-b8971b208/" },
                { name: "Manpreet Singh", role: "Visualiser", desc: "Visual storytelling, brand aesthetics, and high-impact design.", image: ManpreetImg, linkedin: "https://www.linkedin.com/in/manpreet-singh-020549237" }
              ]
            } },
            { id: 'a8', type: 'faq', props: { title: "Frequently Asked Questions", items: [ { question: "How do you measure success?", answer: "We track contribution margin, ROAS, and LTV:CAC — not vanity metrics." }, { question: "Do you work with startups?", answer: "Yes — we only work with brands ready to scale beyond ₹5L/month revenue." } ] } },
            { id: 'a9', type: 'closing_cta', props: { title: "Ready to scale without burning cash?", description: "Book a 15-minute growth audit: we'll send a custom 90-day opportunity plan with prioritized experiments.", primaryCtaText: "Book Growth Audit", secondaryCtaText: "Request Case Pack" } }
          ]
        },
        {
          slug: 'case-studies',
          title: 'Case Studies',
          description: 'Case studies listing page.',
          blocks: [
            { id: 'cs1', type: 'hero', props: { title: "Proven Results | Qala Labs", subtitle: "Real data from real brands. See how we use our scale engines to dominate markets.", ctaText: "Take the Scale Quiz", ctaUrl: "/quiz" } },
            { id: 'cs2', type: 'case_study_snapshots', props: {} }
          ]
        },
        {
          slug: 'portfolio',
          title: 'Portfolio',
          description: 'Portfolio listing page.',
          blocks: [
            { id: 'p1', type: 'hero', props: { title: "The Creative Edge.", subtitle: "From the #WhistlePodu army for CSK to high-ticket real estate lead generation, we deploy creative that doesn't just look good—it converts.", ctaText: "View All Work", ctaUrl: "/portfolio" } },
            { id: 'p2', type: 'portfolio_snapshots', props: {} }
          ]
        },
        {
          slug: 'pricing',
          title: 'Pricing',
          description: 'Pricing page.',
          blocks: [
            { id: 'pr1', type: 'hero', props: { title: "Investment in Scale.", subtitle: "No hidden fees. No fluff. Just performance-based pricing designed to align our success with your revenue growth.", ctaText: "Start Scaling", ctaUrl: "/contact" } },
            { id: 'pr2', type: 'rich_text', props: { content: "<!-- Pricing table will be rendered by component -->" } }
          ]
        },
        {
          slug: 'services',
          title: 'Services',
          description: 'Services listing page.',
          blocks: [
            { id: 's1', type: 'hero', props: { title: "Precision Growth Infrastructure.", subtitle: "We don't just \"run ads.\" We build end-to-end revenue engines that combine high-velocity creative testing with server-side tracking and aggressive media buying.", ctaText: "View Services", ctaUrl: "/services" } },
            { id: 's2', type: 'rich_text', props: { content: "<!-- Services grid will be rendered by component -->" } }
          ]
        },
        {
          slug: 'strategy-deep-dive',
          title: 'Strategy Deep Dive',
          description: 'Strategy deep dive page.',
          blocks: [
            { id: 'sd1', type: 'hero', props: { title: "Strategy Deep Dive", subtitle: "Deep dive into our growth strategies.", ctaText: "Learn More", ctaUrl: "/contact" } },
            { id: 'sd2', type: 'rich_text', props: { content: "<!-- Strategy content -->" } }
          ]
        },
        {
          slug: 'tools',
          title: 'Tools',
          description: 'Tools page with calculators.',
          blocks: [
            { id: 't1', type: 'hero', props: { title: "Growth Tools", subtitle: "Free calculators and estimators to help you plan your 8-figure scale.", ctaText: "View Tools", ctaUrl: "/tools" } },
            { id: 't2', type: 'rich_text', props: { content: "<!-- Tools list -->" } }
          ]
        }
      ];

      for (const pageConfig of pagesToSync) {
        const pageId = await getOrCreatePage(pageConfig.slug, pageConfig.title, pageConfig.description);

        // Delete existing blocks for this page
        const { error: deleteError } = await supabase
          .from('page_blocks')
          .delete()
          .eq('page_id', pageId);

        if (deleteError) throw deleteError;
        console.log(`[CMS Sync] Deleted existing blocks for page '${pageConfig.slug}'`);

        // Insert blocks in order
        const blocksToInsert = pageConfig.blocks.map((block, index) => ({
          page_id: pageId,
          block_type: block.type,
          content_data: block.props,
          sort_order: index
        }));

        const { data: insertedBlocks, error: insertError } = await supabase
          .from('page_blocks')
          .insert(blocksToInsert)
          .select();

        if (insertError) throw insertError;
        console.log(`[CMS Sync] Inserted ${insertedBlocks.length} blocks for page '${pageConfig.slug}'`);
      }

      showSuccess(`Successfully imported site structure for all pages!`);
      fetchPages();
    } catch (error: any) {
      console.error('[CMS Sync] Error:', error);
      showError(error.message || "Failed to import site structure. Check console for details.");
    } finally {
      setSyncing(false);
    }
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