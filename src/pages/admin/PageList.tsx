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
      // Code 42P01 means 'relation does not exist' in Postgres
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
    
    const initialPages = [
      { 
        title: 'Home Page', 
        slug: 'home', 
        description: 'The main landing page for Qala Labs.',
        content: [
          { id: 'h1', type: 'hero', props: { title: 'Scale Your DTC Brand', subtitle: 'Performance marketing engineered for growth.' } }
        ]
      },
      { 
        title: 'Strategy Deep-Dive', 
        slug: 'strategy-framework', 
        description: 'How we build 8-figure scale engines.',
        content: [
          { id: 'h2', type: 'hero', props: { title: 'The Framework', subtitle: 'Data over hype.' } }
        ]
      }
    ];

    const toInsert = initialPages.map(p => ({
      ...p,
      user_id: user.id,
      status: 'published',
      updated_at: new Date().toISOString()
    }));

    const { error } = await supabase.from('pages').insert(toInsert);

    if (error) {
      showError("Sync failed: " + error.message);
    } else {
      showSuccess("Routes synced to CMS");
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
      showError("Failed to create page. Ensure the table exists.");
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
            {!tableMissing && pages.length === 0 && (
              <Button 
                onClick={syncExistingRoutes} 
                disabled={syncing}
                variant="outline" 
                className="rounded-xl px-6 py-6 border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                <RefreshCcw className={cn("w-5 h-5 mr-2", syncing && "animate-spin")} />
                Sync Core Routes
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
              Run the SQL migration in Supabase to continue.
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
                  placeholder="Search pages by title or slug..." 
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
                    <th className="px-8 py-4">Status</th>
                    <th className="px-8 py-4">Last Updated</th>
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
                        <Badge className={cn(
                          "rounded-full px-3 py-0.5 text-[10px] font-black uppercase tracking-widest border-none",
                          page.status === 'published' ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                        )}>
                          {page.status}
                        </Badge>
                      </td>
                      <td className="px-8 py-6 text-sm text-slate-500">
                        {format(new Date(page.updated_at), 'MMM dd, yyyy')}
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" onClick={() => navigate(`/admin/editor/${page.id}`)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" asChild>
                            <a href={`/p/${page.slug}`} target="_blank" rel="noopener noreferrer">
                              <Globe className="w-4 h-4" />
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
                      <td colSpan={5} className="px-8 py-32 text-center">
                        <div className="max-w-md mx-auto">
                          <Globe className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                          <h3 className="text-lg font-bold text-slate-900 mb-2">No pages found</h3>
                          <p className="text-slate-500 text-sm mb-8">
                            Create your first dynamic page or sync core routes to get started.
                          </p>
                          <div className="flex flex-col gap-2">
                            <Button onClick={createPage} className="w-full bg-blue-600 rounded-xl font-black py-6">
                              Create New Page
                            </Button>
                            <Button onClick={syncExistingRoutes} variant="ghost" className="w-full text-blue-600 font-bold">
                              Sync Initial Data
                            </Button>
                          </div>
                        </div>
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