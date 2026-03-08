"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Save, Rocket, Eye, Plus, 
  Settings, ChevronLeft, Loader2,
  Layout, Trash2, Copy, Layers, X, List,
  GripVertical
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

  const fetchPage = useCallback(async () => {
    if (!id || id === 'new') { setLoading(false); return; }
    setLoading(true);
    const { data, error } = await supabase.from('pages').select('*').eq('id', id).single();
    if (error) { showError("Failed to load page"); navigate('/admin/pages'); }
    else { setPage({ ...data, content: Array.isArray(data.content) ? data.content : [] }); }
    setLoading(false);
  }, [id, navigate]);

  useEffect(() => { fetchPage(); }, [fetchPage]);

  const savePage = async (status?: 'draft' | 'published') => {
    if (!page) return;
    setSaving(true);
    const updates = { ...page, status: status || page.status, updated_at: new Date().toISOString() };
    const { error } = await supabase.from('pages').update(updates).eq('id', id);
    setSaving(false);
    if (error) showError("Failed to save");
    else { showSuccess("Saved!"); if (status) setPage(prev => prev ? { ...prev, status } : null); }
  };

  const updateBlockProps = (blockId: string, newProps: any) => {
    if (!page) return;
    setPage({ ...page, content: page.content.map(b => b.id === blockId ? { ...b, props: { ...b.props, ...newProps } } : b) });
  };

  const addBlock = (type: BlockType, index?: number) => {
    if (!page) return;
    const newBlock: Block = { id: Math.random().toString(36).substr(2, 9), type, props: getDefaultProps(type) };
    const newContent = [...page.content];
    if (typeof index === 'number') newContent.splice(index, 0, newBlock);
    else newContent.push(newBlock);
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
      case 'hero': return { title: 'New Hero', subtitle: 'Subtitle', ctaText: 'Get Started', ctaUrl: '#' };
      case 'rich_text': return { content: '<h2>New Section</h2><p>Content...</p>' };
      case 'team_grid': return { title: 'Our Team', members: [{ name: 'Member', role: 'Role', desc: 'Desc', image: '' }] };
      case 'faq': return { title: 'FAQ', items: [{ question: 'Q?', answer: 'A.' }] };
      case 'testimonial': return { quote: 'Quote', author: 'Author', role: 'Role' };
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
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="rounded-xl gap-2" asChild><a href={`/p/${page.slug}?preview=true`} target="_blank" rel="noopener noreferrer"><Eye className="w-4 h-4" /> Preview</a></Button>
          <Button variant="outline" className="rounded-xl" onClick={() => savePage('draft')} disabled={saving}>{saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save</Button>
          <Button className="rounded-xl bg-blue-600 font-black" onClick={() => savePage('published')} disabled={saving}><Rocket className="w-4 h-4 mr-2" /> Publish</Button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Structure Sidebar */}
        <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
          <div className="p-4 border-b border-slate-200 bg-slate-50/50"><h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><List className="w-3 h-3" /> Page Structure</h3></div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {page.content.map((block, i) => (
              <button 
                key={block.id} 
                onClick={() => setSelectedBlockId(block.id)}
                className={cn("w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-3", selectedBlockId === block.id ? "bg-blue-600 text-white shadow-lg" : "text-slate-600 hover:bg-slate-100")}
              >
                <span className="opacity-40">{i + 1}</span>
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

        <main className="flex-1 overflow-y-auto p-12 bg-slate-100/50" onClick={() => setSelectedBlockId(null)}>
          <div className="max-w-4xl mx-auto space-y-4">
            {page.content.map((block, index) => (
              <React.Fragment key={block.id}>
                <BlockWrapper type={block.type} isSelected={selectedBlockId === block.id} onSelect={() => setSelectedBlockId(block.id)} onDelete={() => deleteBlock(block.id)} onMoveUp={() => moveBlock(index, 'up')} onMoveDown={() => moveBlock(index, 'down')} onDuplicate={() => duplicateBlock(block)}>
                  <div className="pointer-events-none scale-[0.7] origin-top transform-gpu"><BlockRenderer blocks={[block]} /></div>
                </BlockWrapper>
                <div className="flex justify-center opacity-0 hover:opacity-100 transition-opacity py-2">
                  <Popover><PopoverTrigger asChild><Button variant="ghost" size="sm" className="rounded-full bg-white shadow-sm border border-slate-200 gap-2 px-4"><Plus className="w-4 h-4" /> Add Block</Button></PopoverTrigger>
                  <PopoverContent className="w-80 p-0 rounded-3xl shadow-2xl border-none"><BlockPicker onSelect={(type) => addBlock(type, index + 1)} /></PopoverContent></Popover>
                </div>
              </React.Fragment>
            ))}
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
                {renderBlockSettings(selectedBlock, (newProps) => updateBlockProps(selectedBlockId, newProps))}
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

const renderBlockSettings = (block: Block, onUpdate: (newProps: any) => void) => {
  const props = block.props;
  switch (block.type) {
    case 'hero': return (
      <div className="space-y-4">
        <div className="space-y-2"><Label className="text-xs font-bold text-slate-400 uppercase">Headline</Label><Input value={props.title || ''} onChange={(e) => onUpdate({ ...props, title: e.target.value })} className="rounded-xl" /></div>
        <div className="space-y-2"><Label className="text-xs font-bold text-slate-400 uppercase">Subtitle</Label><Textarea value={props.subtitle || ''} onChange={(e) => onUpdate({ ...props, subtitle: e.target.value })} className="rounded-xl" /></div>
        <div className="space-y-2"><Label className="text-xs font-bold text-slate-400 uppercase">CTA Text</Label><Input value={props.ctaText || ''} onChange={(e) => onUpdate({ ...props, ctaText: e.target.value })} className="rounded-xl" /></div>
      </div>
    );
    case 'team_grid': return (
      <div className="space-y-4">
        <div className="space-y-2"><Label className="text-xs font-bold">Section Title</Label><Input value={props.title || ''} onChange={(e) => onUpdate({ ...props, title: e.target.value })} /></div>
        <div className="space-y-2"><Label className="text-xs font-bold">Members (JSON Array)</Label><Textarea value={JSON.stringify(props.members || [], null, 2)} onChange={(e) => { try { onUpdate({ ...props, members: JSON.parse(e.target.value) }); } catch (e) {} }} className="font-mono text-[10px] min-h-[300px]" /></div>
      </div>
    );
    default: return <div className="p-6 bg-slate-50 rounded-2xl text-center"><p className="text-xs text-slate-400 font-bold">This section is automated based on global data (Case Studies, Blog, etc.) or uses standard styling.</p></div>;
  }
};

export default PageEditor;