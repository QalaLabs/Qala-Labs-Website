"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Save, Rocket, Eye, Plus, 
  Settings, ChevronLeft, Loader2,
  List, GripVertical, 
  Monitor, Smartphone
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Page, Block, BlockType } from '@/types/editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { showSuccess, showError } from '@/utils/toast';
import BlockWrapper from '@/components/admin/BlockWrapper';
import BlockPicker from '@/components/admin/BlockPicker';
import BlockRenderer from '@/components/cms/BlockRenderer';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const PageEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const dragItem = useRef<number | null>(null);

  const fetchData = useCallback(async () => {
    if (!id || id === 'new') { setLoading(false); return; }
    setLoading(true);
    
    const [pageRes, blocksRes] = await Promise.all([
      supabase.from('pages').select('*').eq('id', id).single(),
      supabase.from('page_blocks').select('*').eq('page_id', id).order('sort_order', { ascending: true })
    ]);

    if (pageRes.error) { 
      showError("Failed to load page"); 
      navigate('/admin/pages'); 
    } else { 
      const blocks = (blocksRes.data || []).map(b => ({
        id: b.id,
        type: b.block_type as BlockType,
        props: b.content_data,
        sort_order: b.sort_order
      }));
      
      setPage({ ...pageRes.data, content: blocks }); 
    }
    
    setLoading(false);
  }, [id, navigate]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const savePage = async (status?: 'draft' | 'published') => {
    if (!page || !id) return;
    setSaving(true);
    
    const updates = { 
      title: page.title,
      slug: page.slug,
      description: page.description,
      status: status || page.status, 
      updated_at: new Date().toISOString() 
    };

    const { error: pageError } = await supabase.from('pages').update(updates).eq('id', id);
    if (pageError) { showError("Failed to save page metadata"); setSaving(false); return; }

    await supabase.from('page_blocks').delete().eq('page_id', id);

    const blocksToInsert = page.content.map((block, index) => ({
      page_id: id,
      block_type: block.type,
      content_data: block.props,
      sort_order: index
    }));

    if (blocksToInsert.length > 0) {
      const { error: insertError } = await supabase.from('page_blocks').insert(blocksToInsert);
      if (insertError) { showError("Failed to save blocks"); setSaving(false); return; }
    }

    setSaving(false);
    showSuccess("Saved!");
    if (status) setPage(prev => prev ? { ...prev, status } : null);
    fetchData();
  };

  const updateBlockProps = (blockId: string, newProps: any) => {
    if (!page) return;
    setPage({ ...page, content: page.content.map(b => b.id === blockId ? { ...b, props: { ...b.props, ...newProps } } : b) });
  };

  const addBlock = (type: BlockType, index?: number) => {
    if (!page) return;
    const newBlock: Block = { 
      id: 'temp-' + Math.random().toString(36).substr(2, 9), 
      type, 
      props: getDefaultProps(type),
      sort_order: typeof index === 'number' ? index : page.content.length
    };
    const newContent = [...page.content];
    if (typeof index === 'number') newContent.splice(index, 0, newBlock);
    else newContent.push(newBlock);
    setPage({ ...page, content: newContent });
    setSelectedBlockId(newBlock.id);
  };

  const duplicateBlock = (index: number) => {
    if (!page) return;
    const blockToDuplicate = page.content[index];
    const newBlock: Block = {
      ...blockToDuplicate,
      id: 'temp-' + Math.random().toString(36).substr(2, 9),
      sort_order: index + 1
    };
    const newContent = [...page.content];
    newContent.splice(index + 1, 0, newBlock);
    setPage({ ...page, content: newContent });
    setSelectedBlockId(newBlock.id);
  };

  const deleteBlock = (blockId: string) => {
    if (!page) return;
    setPage({ ...page, content: page.content.filter(b => b.id !== blockId) });
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

  const handleDragStart = (index: number) => { dragItem.current = index; };
  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); };
  const handleDrop = (index: number) => {
    if (!page || dragItem.current === null) return;
    const newContent = [...page.content];
    const draggedItemContent = newContent[dragItem.current];
    newContent.splice(dragItem.current, 1);
    newContent.splice(index, 0, draggedItemContent);
    dragItem.current = null;
    setPage({ ...page, content: newContent });
  };

  const getDefaultProps = (type: BlockType) => {
    switch (type) {
      case 'hero': return { title: 'New Hero', subtitle: 'Subtitle', ctaText: 'Get Started', ctaUrl: '#', bgColor: '#f8fafc' };
      case 'rich_text': return { content: '<h2>New Section</h2><p>Content...</p>' };
      case 'faq': return { title: 'FAQ', items: [{ question: 'New Question?', answer: 'New Answer.' }] };
      case 'cta': return { title: 'Ready to scale?', description: 'Let\'s talk strategy.', buttonText: 'Get Started', buttonUrl: '/contact' };
      default: return {};
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-50"><Loader2 className="w-10 h-10 animate-spin text-blue-600" /></div>;
  if (!page) return null;

  const selectedBlock = page.content.find(b => b.id === selectedBlockId);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/admin/pages')} className="rounded-xl"><ChevronLeft className="w-5 h-5" /></Button>
          <div className="h-8 w-px bg-slate-200 mx-2" />
          <div>
            <div className="flex items-center gap-2"><h1 className="font-black text-slate-900">{page.title}</h1><Badge className={cn("text-[10px] font-black uppercase", page.status === 'published' ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700")}>{page.status}</Badge></div>
            <p className="text-xs text-slate-400">{page.content?.length || 0} blocks • Last saved: {format(new Date(page.updated_at), 'HH:mm')}</p>
          </div>
        </div>

        <div className="flex items-center bg-slate-100 p-1 rounded-2xl">
          <Button 
            variant={previewMode === 'desktop' ? 'secondary' : 'ghost'} 
            size="sm" 
            onClick={() => setPreviewMode('desktop')}
            className={cn("rounded-xl px-4", previewMode === 'desktop' && "shadow-sm")}
          >
            <Monitor className="w-4 h-4 mr-2" /> Desktop
          </Button>
          <Button 
            variant={previewMode === 'mobile' ? 'secondary' : 'ghost'} 
            size="sm" 
            onClick={() => setPreviewMode('mobile')}
            className={cn("rounded-xl px-4", previewMode === 'mobile' && "shadow-sm")}
          >
            <Smartphone className="w-4 h-4 mr-2" /> Mobile
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" className="rounded-xl gap-2" asChild><a href={`/p/${page.slug}?preview=true`} target="_blank" rel="noopener noreferrer"><Eye className="w-4 h-4" /> Preview</a></Button>
          <Button variant="outline" className="rounded-xl" onClick={() => savePage('draft')} disabled={saving}>{saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save</Button>
          <Button className="rounded-xl bg-blue-600 font-black" onClick={() => savePage('published')} disabled={saving}><Rocket className="w-4 h-4 mr-2" /> Publish</Button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
          <div className="p-4 border-b border-slate-200 bg-slate-50/50"><h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><List className="w-3 h-3" /> Page Structure</h3></div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {page.content.map((block, i) => (
              <button 
                key={block.id} 
                draggable={true}
                onDragStart={() => handleDragStart(i)}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(i)}
                onClick={() => setSelectedBlockId(block.id)}
                className={cn("w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-3 cursor-grab active:cursor-grabbing", selectedBlockId === block.id ? "bg-blue-600 text-white shadow-lg" : "text-slate-600 hover:bg-slate-100")}
              >
                <GripVertical className="w-3 h-3 opacity-40" />
                <span className="truncate">{block.type.replace('_', ' ')}</span>
              </button>
            ))}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" className="w-full mt-4 border-2 border-dashed border-slate-100 text-slate-400 rounded-xl py-6 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all"><Plus className="w-4 h-4 mr-2" /> Add Section</Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0 rounded-3xl shadow-2xl border-none"><BlockPicker onSelect={(type) => addBlock(type)} /></PopoverContent>
            </Popover>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto bg-slate-100/50 p-8" onClick={() => setSelectedBlockId(null)}>
          <div className={cn(
            "mx-auto transition-all duration-500 bg-white shadow-2xl ring-1 ring-slate-200 overflow-hidden",
            previewMode === 'desktop' ? "w-full max-w-6xl rounded-3xl" : "w-[375px] rounded-[3rem] border-[12px] border-slate-900 min-h-[812px]"
          )}>
            <div className={cn("w-full h-full", previewMode === 'mobile' && "overflow-y-auto max-h-[788px] scrollbar-hide")}>
              {page.content.map((block, index) => (
                <React.Fragment key={block.id}>
                  <BlockWrapper 
                    type={block.type} 
                    isSelected={selectedBlockId === block.id} 
                    onSelect={() => setSelectedBlockId(block.id)} 
                    onDelete={() => deleteBlock(block.id)} 
                    onMoveUp={() => moveBlock(index, 'up')} 
                    onMoveDown={() => moveBlock(index, 'down')} 
                    onDuplicate={() => duplicateBlock(index)}
                  >
                    <div className={cn(
                      "transition-all duration-300",
                      selectedBlockId === block.id ? "ring-4 ring-blue-600/20" : ""
                    )}>
                      <BlockRenderer 
                        blocks={[block]} 
                        editingId={selectedBlockId} 
                        onUpdateBlock={updateBlockProps}
                      />
                    </div>
                  </BlockWrapper>
                </React.Fragment>
              ))}
            </div>
          </div>
        </main>

        <aside className="w-80 bg-white border-l border-slate-200 flex flex-col">
          <div className="p-6 border-b border-slate-200"><h2 className="font-black text-slate-900 flex items-center gap-2"><Settings className="w-4 h-4 text-blue-600" /> {selectedBlockId ? 'Section Edit' : 'Page SEO'}</h2></div>
          <div className="flex-1 overflow-y-auto p-6">
            {!selectedBlockId ? (
              <div className="space-y-6">
                <div className="space-y-2"><Label className="text-sm font-bold">Page Title</Label><Input value={page.title} onChange={(e) => setPage({...page, title: e.target.value})} className="rounded-xl" /></div>
                <div className="space-y-2"><Label className="text-sm font-bold">Slug</Label><Input value={page.slug} onChange={(e) => setPage({...page, slug: e.target.value})} className="rounded-xl" /></div>
                <div className="space-y-2"><Label className="text-sm font-bold">SEO Meta</Label><Textarea value={page.description || ''} onChange={(e) => setPage({...page, description: e.target.value})} className="rounded-xl" /></div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between"><Badge className="bg-blue-100 text-blue-700 border-none">{selectedBlock.type.replace('_', ' ')}</Badge></div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Tip: You can edit text directly in the preview.</p>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default PageEditor;