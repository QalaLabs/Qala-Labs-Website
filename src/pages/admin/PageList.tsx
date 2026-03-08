"use client";

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Edit, Eye, Trash2, Globe, RefreshCcw, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Page } from '@/types/editor';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
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
    
    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .order('updated_at', { ascending: false });
    
    if (error) {
      console.error("Fetch Error:", error);
      if (error.code === '42P01' || error.message.includes('not found')) {
        setTableMissing(true);
        showError("The 'pages' table is missing. Ensure you ran the SQL migration.");
      } else {
        showError("Failed to fetch pages: " + error.message);
      }
    } else {
      setPages(data || []);
    }
    setLoading(false);
  }, []);

  React.useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  const syncExistingRoutes = async () => {
    if (!user) return;
    setSyncing(true);
    
    // Define ALL pages with their complete block structure
    const allPages = [
      {
        title: 'Home Page',
        slug: 'home',
        description: 'The main landing page for Qala Labs - full page builder with all sections.',
        status: 'published',
        content: [
          // Hero Section
          {
            id: 'hero-1',
            type: 'hero',
            props: {
              title: "Scale Your DTC Brand to 8-Figures with Data-Driven Creative.",
              subtitle: "We combine high-performance paid media with high-converting creative to dominate your niche.",
              ctaText: "Get Proposal",
              ctaUrl: "/contact",
              secondaryCtaText: "See Work",
              secondaryCtaUrl: "/portfolio",
              badgeText: "Generated ₹12Cr in 90 days for GlowSkin"
            }
          },
          // Tech Stack Ribbon
          {
            id: 'tech-ribbon-1',
            type: 'tech_stack_ribbon',
            props: {}
          },
          // Why Different
          {
            id: 'why-diff-1',
            type: 'why_different',
            props: {}
          },
          // Client Logos
          {
            id: 'client-logos-1',
            type: 'client_logos',
            props: {}
          },
          // Quick Metrics
          {
            id: 'quick-metrics-1',
            type: 'quick_metrics',
            props: {}
          },
          // What We Do
          {
            id: 'what-we-do-1',
            type: 'what_we_do',
            props: {}
          },
          // How We Work
          {
            id: 'how-we-work-1',
            type: 'how_we_work',
            props: {}
          },
          // Case Study Snapshots
          {
            id: 'case-snapshots-1',
            type: 'case_study_snapshots',
            props: {}
          },
          // Research Insights
          {
            id: 'research-1',
            type: 'research_insights',
            props: {}
          },
          // Testimonial
          {
            id: 'testimonial-1',
            type: 'testimonial',
            props: {
              quote: "Qala Labs helped us scale to a six-figure monthly run-rate: fast, strategic, and data-driven.",
              author: "CEO, Gaffar India",
              role: "CEO",
              avatar: "https://i.pravatar.cc/100?img=12"
            }
          },
          // Team Grid
          {
            id: 'team-1',
            type: 'team_grid',
            props: {
              title: "The Team",
              members: [
                {
                  name: "Aashirwad",
                  role: "Performance Marketing & Growth Strategy",
                  desc: "Data-first paid media, experiment design, and scaling playbooks.",
                  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
                  linkedin: "#"
                },
                {
                  name: "Dipika",
                  role: "Ecommerce Scaling",
                  desc: "Listing optimization, retention engineering, and lifecycle flows.",
                  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
                  linkedin: "#"
                },
                {
                  name: "Aryaman",
                  role: "Creator & Creative Management",
                  desc: "Creator programs, UGC production, and cross-platform distribution.",
                  image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
                  linkedin: "#"
                }
              ]
            }
          },
          // FAQ
          {
            id: 'faq-1',
            type: 'faq',
            props: {
              title: "FAQ",
              items: [
                { question: "Who do you work with?", answer: "DTC and ecommerce brands ready to scale with ad spend and product-market fit." },
                { question: "How quickly can we see results?", answer: "Signals in 30 days; meaningful scale in 60–120 days." },
                { question: "Do you run Amazon & Shopify?", answer: "Yes: we run marketplace and direct-to-consumer growth programs." },
                { question: "What do you measure?", answer: "Revenue, CAC, ROAS, AOV, LTV and retention velocity." }
              ]
            }
          },
          // Closing CTA
          {
            id: 'closing-cta-1',
            type: 'closing_cta',
            props: {}
          }
        ]
      },
      {
        title: 'About Us',
        slug: 'about',
        description: 'Our team, principles, and roadmap.',
        status: 'published',
        content: [
          {
            id: 'about-hero',
            type: 'hero',
            props: {
              title: 'About Qala Labs',
              subtitle: 'We build predictable revenue engines for ecommerce.',
              ctaText: 'Book Audit',
              ctaUrl: '/contact',
              badgeText: 'Performance marketing, AI automation, conversion-first sites and creator programs.'
            }
          },
          {
            id: 'about-kpis',
            type: 'quick_metrics',
            props: {}
          },
          {
            id: 'about-principles',
            type: 'why_different',
            props: {
              title: 'The Qala Principles',
              content: 'Our core values that drive every decision.'
            }
          },
          {
            id: 'about-process',
            type: 'how_we_work',
            props: {
              title: 'How We Work',
              steps: [
                { title: "Audit & Hypothesis", range: "Week 0", desc: "Deep stack audit: measurement, creative, funnels, and ops.", example: "Identified 30% data loss in browser-based tracking.", icon: "Search" },
                { title: "Rapid Experiments", range: "Weeks 1–4", desc: "Creative, funnel, and pricing tests to find scalable winners.", example: "Tested 12 hooks; found 2 that lowered CPA by 35%.", icon: "Zap" },
                { title: "Automation & Scale", range: "Weeks 4–12", desc: "Build AI flows, server events, and scale predictable winners.", example: "Deployed server-side GTM and automated bid rules.", icon: "Rocket" },
                { title: "Retention & Ops", range: "Ongoing", desc: "Lock in LTV gains through lifecycle and creator programs.", example: "Increased repeat purchase rate by 22% via AI flows.", icon: "ShieldCheck" }
              ]
            }
          },
          {
            id: 'about-platform',
            type: 'tech_stack_ribbon',
            props: {}
          },
          {
            id: 'about-research',
            type: 'research_insights',
            props: {}
          },
          {
            id: 'about-team',
            type: 'team_grid',
            props: {}
          },
          {
            id: 'about-faq',
            type: 'faq',
            props: {}
          },
          {
            id: 'about-cta',
            type: 'closing_cta',
            props: {}
          }
        ]
      },
      {
        title: 'Services',
        slug: 'services',
        description: 'Our growth capabilities.',
        status: 'published',
        content: [
          {
            id: 'services-hero',
            type: 'hero',
            props: {
              title: 'Precision Growth Infrastructure.',
              subtitle: 'We don\'t just "run ads." We build end-to-end revenue engines that combine high-velocity creative testing with server-side tracking and aggressive media buying.',
              ctaText: 'Book Audit',
              ctaUrl: '/contact'
            }
          },
          {
            id: 'services-grid',
            type: 'what_we_do',
            props: {}
          }
        ]
      },
      {
        title: 'Portfolio',
        slug: 'portfolio',
        description: 'Our creative work.',
        status: 'published',
        content: [
          {
            id: 'portfolio-hero',
            type: 'hero',
            props: {
              title: 'The Creative Edge.',
              subtitle: 'From the #WhistlePodu army for CSK to high-ticket real estate lead generation, we deploy creative that doesn\'t just look good—it converts.',
              ctaText: 'View Our Work',
              ctaUrl: '/portfolio'
            }
          },
          {
            id: 'portfolio-grid',
            type: 'case_study_snapshots',
            props: {}
          }
        ]
      },
      {
        title: 'Case Studies',
        slug: 'case-studies',
        description: 'Our proven results.',
        status: 'published',
        content: [
          {
            id: 'case-hero',
            type: 'hero',
            props: {
              title: 'Proven Results.',
              subtitle: 'We don\'t just promise growth. We deliver it. Explore our 8-figure success stories and the data behind them.',
              ctaText: 'Book Your Free Audit',
              ctaUrl: '/contact'
            }
          },
          {
            id: 'case-grid',
            type: 'case_study_snapshots',
            props: {}
          },
          {
            id: 'case-cta',
            type: 'closing_cta',
            props: {
              title: 'Ready for these results?',
              description: 'Join the 1% of brands that dominate their niche with data-driven performance.'
            }
          }
        ]
      },
      {
        title: 'Pricing',
        slug: 'pricing',
        description: 'Flexible scaling plans.',
        status: 'published',
        content: [
          {
            id: 'pricing-hero',
            type: 'hero',
            props: {
              title: 'Investment in Scale.',
              subtitle: 'No hidden fees. No fluff. Just performance-based pricing designed to align our success with your revenue growth.',
              ctaText: 'Get Started',
              ctaUrl: '/contact'
            }
          },
          {
            id: 'pricing-grid',
            type: 'kpi_grid',
            props: {
              items: [
                { label: 'Growth Engine', value: '₹1.5L/mo' },
                { label: 'Market Dominator', value: '₹3.5L/mo' },
                { label: 'Enterprise', value: 'Custom' }
              ]
            }
          },
          {
            id: 'pricing-cta',
            type: 'closing_cta',
            props: {
              title: 'Ready to invest in scale?',
              description: 'Choose the plan that matches your growth ambition.'
            }
          }
        ]
      }
    ];

    const toUpsert = allPages.map(p => ({
      ...p,
      user_id: user.id,
      updated_at: new Date().toISOString()
    }));

    // Use upsert to avoid duplicate key errors
    const { error } = await supabase.from('pages').upsert(toUpsert, { onConflict: 'slug' });

    if (error) {
      showError("Sync failed: " + error.message);
    } else {
      showSuccess("All core pages synced with full block structure!");
      fetchPages();
    }
    setSyncing(false);
  };

  const createPage = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('pages')
      .insert({
        title: 'Untitled Page',
        slug: `new-page-${Date.now()}`,
        status: 'draft',
        content: [],
        user_id: user.id
      })
      .select()
      .single();

    if (error) {
      showError("Failed to create page.");
    } else {
      showSuccess("Page created");
      navigate(`/admin/editor/${data.id}`);
    }
  };

  const deletePage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this page?")) return;
    const { error } = await supabase.from('pages').delete().eq('id', id);
    if (error) showError("Failed to delete page");
    else {
      showSuccess("Page deleted");
      fetchPages();
    }
  };

  const filteredPages = pages.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AdminSidebar />
      
      <main className="flex-1 p-10">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Content Pages</h1>
            <p className="text-slate-500">Manage your dynamic site content and landing pages.</p>
          </div>
          <div className="flex gap-3">
            {!tableMissing && (
              <Button 
                onClick={syncExistingRoutes} 
                disabled={syncing}
                variant="outline" 
                className="rounded-xl px-6 py-6 border-blue-200 text-blue-600 hover:bg-blue-50 font-bold"
              >
                <RefreshCcw className={cn("w-5 h-5 mr-2", syncing && "animate-spin")} />
                Sync All Pages
              </Button>
            )}
            <Button onClick={createPage} disabled={tableMissing} className="bg-blue-600 hover:bg-blue-700 rounded-xl px-6 py-6 font-black">
              <Plus className="w-5 h-5 mr-2" /> Create Page
            </Button>
          </div>
        </header>

        {tableMissing ? (
          <div className="bg-white rounded-[2.5rem] p-20 text-center border border-red-100 shadow-sm">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
            <h2 className="text-2xl font-black text-slate-900 mb-4">Database Table Missing</h2>
            <p className="text-slate-500 max-w-lg mx-auto mb-8">
              The <code className="bg-slate-100 px-2 py-1 rounded text-red-600">pages</code> table was not found. 
            </p>
            <Button onClick={fetchPages} variant="outline" className="rounded-xl px-8 h-12">
              <RefreshCcw className="w-4 h-4 mr-2" /> Retry Connection
            </Button>
          </div>
        ) : (
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input 
                  placeholder="Search pages..." 
                  className="pl-12 h-12 rounded-xl border-slate-100"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button onClick={fetchPages} variant="outline" className="rounded-xl h-12 px-6">
                <RefreshCcw className={cn("w-4 h-4 mr-2", loading && "animate-spin")} /> Refresh
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                  <tr>
                    <th className="px-8 py-4">Page Title</th>
                    <th className="px-8 py-4">Slug</th>
                    <th className="px-8 py-4">Blocks</th>
                    <th className="px-8 py-4">Status</th>
                    <th className="px-8 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredPages.map((page) => (
                    <tr key={page.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-900">{page.title}</span>
                          <span className="text-xs text-slate-400 truncate max-w-xs">{page.description || 'No description'}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <code className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-600">/p/{page.slug}</code>
                      </td>
                      <td className="px-8 py-6">
                        <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-none">
                          {page.content?.length || 0} blocks
                        </Badge>
                      </td>
                      <td className="px-8 py-6">
                        <Badge className={cn(
                          "rounded-full px-3 py-0.5 text-[10px] font-black uppercase tracking-widest border-none",
                          page.status === 'published' ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                        )}>
                          {page.status}
                        </Badge>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" onClick={() => navigate(`/admin/editor/${page.id}`)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" asChild>
                            <a href={`/p/${page.slug}`} target="_blank" rel="noopener noreferrer">
                              <Eye className="w-4 h-4" />
                            </a>
                          </Button>
                          <Button variant="ghost" size="icon" className="text-red-500" onClick={() => deletePage(page.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredPages.length === 0 && !loading && (
                    <tr>
                      <td colSpan={5} className="px-8 py-20 text-center text-slate-400 italic">
                        No pages found. Click "Sync All Pages" to import your site architecture.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default PageList;