"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Save, Rocket, Eye, ArrowLeft, Plus, 
  Settings, History, ChevronLeft, Loader2,
  Layout, Type, Image as ImageIcon, Video, BarChart3
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Page, Block, BlockType } from '@/types/editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { showSuccess, showError } from '@/utils/toast';
import BlockWrapper from '@/components/admin/BlockWrapper';
import BlockPicker from '@/components/admin/BlockPicker';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

const PageEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const fetchPage = useCallback(async () => {
    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      showError("Failed to load page");
      navigate('/admin/pages');
    } else {
      setPage(data);
    }
    setLoading(false);
  }, [id, navigate]);

  useEffect(() => {
    fetchPage();
  }, [fetchPage]);

  const savePage = async (status?: 'draft' | 'published') => {
    if (!page) return;
    setSaving(true);
    
    const updates = {
      ...page,
      status: status || page.status,
      updated_at: new Date().toISOString()
    };

    const { error } = await supabase
      .from('pages')
      .update(updates)
      .eq('id', id);

    setSaving(false);
    if (error) showError("Failed to save changes");
    else {
      showSuccess(status === 'published' ? "Page published live!" : "Draft saved successfully");
      if (status) setPage(prev => prev ? { ...prev, status } : null);
    }
  };

  const addBlock = (type: BlockType, index?: number) => {
    if (!page) return;
    const newBlock: Block = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      props: getDefaultProps(type)
    };

    const newContent = [...page.content];
    if (typeof index === 'number') {
      newContent.splice(index, 0, newBlock);
    } else {
      newContent.push(newBlock);
    }

    setPage({ ...page, content: newContent });
    setSelectedBlockId(newBlock.id);
  };

  const deleteBlock = (blockId: string) => {
    if (!page) return;
    setPage({
      ...page,
      content: page.content.filter(b => b.id !== blockId)
    });
    if (selectedBlockId === blockId) setSelectedBlockId(null);
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    if (!page) return;
    const newContent = [...page.content];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex < 0 || targetIndex >= newContent.length) return;
    
    [newContent[index], newContent[targetIndex]] = [newContent[targetIndex], newContent[index]];
    setPage({ ...page, content: newContent });
  };

  const duplicateBlock = (block: Block) => {
    if (!page) return;
    const newBlock = { ...block, id: Math.random().toString(36).substr(2, 9) };
    const index = page.content.findIndex(b => b.id === block.id);
    const newContent = [...page.content];
    newContent.splice(index + 1, 0, newBlock);
    setPage({ ...page, content: newContent });
  };

  const getDefaultProps = (type: BlockType) => {
    switch (type) {
      case 'hero': return { title: 'New Hero Section', subtitle: 'Add a compelling subtitle here', ctaText: 'Get Started', ctaUrl: '#' };
      case 'rich_text': return { content: '<p>Start writing your content here...</p>' };
      case 'kpi_grid': return { items: [{ label: 'Revenue', value: '₹10L' }, { label: 'Growth', value: '25%' }] };
      case 'cta': return { title: 'Ready to scale?', buttonText: 'Contact Us' };
      default: return {};
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
    </div>
  );

  if (!page) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Bar */}
      <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/admin/pages')} className="rounded-xl">
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div className="h-8 w-px bg-slate-200 mx-2" />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-black text-slate-900">{page.title}</h1>
              <Badge className={cn(
                "text-[10px] font-black uppercase tracking-widest border-none",
                page.status === 'published' ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
              )}>
                {page.status}
              </Badge>
            </div>
            <p className="text-xs text-slate-400">Last saved: {format(new Date(page.updated_at), 'HH:mm')}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" className="rounded-xl gap-2 text-slate-600">
            <History className="w-4 h-4" /> History
          </Button>
          <Button variant="ghost" className="rounded-xl gap-2 text-slate-600" asChild>
            <a href={`/${page.slug}?preview=true`} target="_blank" rel="noopener noreferrer">
              <Eye className="w-4 h-4" /> Preview
            </a>
          </Button>
          <div className="h-8 w-px bg-slate-200 mx-2" />
          <Button 
            variant="outline" 
            className="rounded-xl gap-2 border-slate-200"
            onClick={() => savePage('draft')}
            disabled={saving}
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Draft
          </Button>
          <Button 
            className="rounded-xl gap-2 bg-blue-600 hover:bg-blue-700 font-black px-6"
            onClick={() => savePage('published')}
            disabled={saving}
          >
            <Rocket className="w-4 h-4" /> Publish Live
          </Button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Canvas */}
        <main className="flex-1 overflow-y-auto p-12 bg-slate-100/50">
          <div className="max-w-4xl mx-auto space-y-4">
            {/* Add Block Top */}
            <div className="flex justify-center opacity-0 hover:opacity-100 transition-opacity">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm" className="rounded-full bg-white shadow-sm border border-slate-200 gap-2 px-4">
                    <Plus className="w-4 h-4" /> Add Block
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0 rounded-3xl shadow-2xl border-none" side="bottom">
                  <BlockPicker onSelect={(type) => addBlock(type, 0)} />
                </PopoverContent>
              </Popover>
            </div>

            {page.content.map((block, index) => (
              <React.Fragment key={block.id}>
                <BlockWrapper
                  type={block.type}
                  isSelected={selectedBlockId === block.id}
                  onSelect={() => setSelectedBlockId(block.id)}
                  onDelete={() => deleteBlock(block.id)}
                  onMoveUp={() => moveBlock(index, 'up')}
                  onMoveDown={() => moveBlock(index, 'down')}
                  onDuplicate={() => duplicateBlock(block)}
                >
                  <div className="min-h-[100px] flex items-center justify-center text-slate-400 italic bg-white rounded-2xl border border-dashed border-slate-200">
                    {block.type} Block Content Preview
                  </div>
                </BlockWrapper>

                {/* Add Block Between */}
                <div className="flex justify-center opacity-0 hover:opacity-100 transition-opacity py-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="sm" className="rounded-full bg-white shadow-sm border border-slate-200 gap-2 px-4">
                        <Plus className="w-4 h-4" /> Add Block
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-0 rounded-3xl shadow-2xl border-none" side="bottom">
                      <BlockPicker onSelect={(type) => addBlock(type, index + 1)} />
                    </PopoverContent>
                  </Popover>
                </div>
              </React.Fragment>
            ))}

            {page.content.length === 0 && (
              <div className="py-32 text-center border-2 border-dashed border-slate-200 rounded-[3rem] bg-white">
                <Layout className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-400">Your page is empty</h3>
                <p className="text-slate-400 mb-8">Start building by adding your first block.</p>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700 rounded-2xl px-8 py-6 font-black">
                      <Plus className="w-5 h-5 mr-2" /> Add First Block
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-0 rounded-3xl shadow-2xl border-none" side="top">
                    <BlockPicker onSelect={(type) => addBlock(type)} />
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </div>
        </main>

        {/* Right Sidebar: Inspector */}
        <aside className="w-96 bg-white border-l border-slate-200 flex flex-col">
          <div className="p-6 border-b border-slate-200 flex items-center justify-between">
            <h2 className="font-black text-slate-900 flex items-center gap-2">
              <Settings className="w-4 h-4 text-blue-600" /> 
              {selectedBlockId ? 'Block Settings' : 'Page Settings'}
            </h2>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {!selectedBlockId ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Page Title</label>
                  <Input 
                    value={page.title} 
                    onChange={(e) => setPage({ ...page, title: e.target.value })}
                    className="rounded-xl h-12"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">URL Slug</label>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-sm">/</span>
                    <Input 
                      value={page.slug} 
                      onChange={(e) => setPage({ ...page, slug: e.target.value })}
                      className="rounded-xl h-12"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Meta Description</label>
                  <textarea 
                    value={page.description || ''} 
                    onChange={(e) => setPage({ ...page, description: e.target.value })}
                    className="w-full min-h-[100px] p-4 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-600 outline-none"
                    placeholder="SEO description..."
                  />
                </div>
              </div>
            ) : (
              <div className="text-center py-20">
                <Settings className="w-12 h-12 text-slate-100 mx-auto mb-4" />
                <p className="text-slate-400 text-sm">Select a block to edit its properties.</p>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default PageEditor;