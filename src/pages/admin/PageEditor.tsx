"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Save, Rocket, Eye, Plus, 
  Settings, ChevronLeft, Loader2,
  Layout, Trash2, Copy, Layers, X, List,
  GripVertical, Check, Linkedin, User, Globe, MessageSquare
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
  const [allCaseStudies, setAllCaseStudies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const dragItem = useRef<number | null>(null);

  const fetchData = useCallback(async () => {
    if (!id || id === 'new') { setLoading(false); return; }
    setLoading(true);
    
    const [pageRes, studiesRes, blocksRes] = await Promise.all([
      supabase.from('pages').select('*').eq('id', id).single(),
      supabase.from('case_studies').select('id, title, category').order('created_at', { ascending: false }),
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

    if (!studiesRes.error) {
      setAllCaseStudies(studiesRes.data || []);
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
    
    if (pageError) {
      showError("Failed to save page metadata");
      setSaving(false);
      return;
    }

    const { error: deleteError } = await supabase.from('page_blocks').delete().eq('page_id', id);
    
    if (deleteError) {
      showError("Failed to sync blocks");
      setSaving(false);
      return;
    }

    const blocksToInsert = page.content.map((block, index) => ({
      page_id: id,
      block_type: block.type,
      content_data: block.props,
      sort_order: index
    }));

    if (blocksToInsert.length > 0) {
      const { error: insertError } = await supabase.from('page_blocks').insert(blocksToInsert);
      if (insertError) {
        showError("Failed to save blocks");
        setSaving(false);
        return;
      }
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
    const newBlock = { ...block, id: 'temp-' + Math.random().toString(36).substr(2, 9) };
    const index = page.content.findIndex(b => b.id === block.id);
    const newContent = [...page.content];
    newContent.splice(index + 1, 0, newBlock);
    setPage({ ...page, content: newContent });
  };

  const handleDragStart = (index: number) => {
    dragItem.current = index;
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

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
      case 'team_grid': return { title: 'Our Team', members: [] };
      case 'how_we_work': return { title: 'How we work', steps: [] };
      case 'what_we_do': return { title: 'What we do', services: [] };
      case 'faq': return { title: 'FAQ', items: [{ question: 'Q?', answer: 'A.' }] };
      case 'testimonial': return { quote: 'Quote', author: 'Author', role: 'Role' };
      case 'closing_cta': return { title: 'Ready to scale?', description: 'Let\'s talk strategy.' };
      case 'case_study_snapshots': return { studyIds: [] };
      case 'why_different': return { title: "Why we're different", description: "We're revenue engineers..." };
      case 'research_insights': return { title: "Research & Insights", description: "We believe in doing the right research..." };
      case 'quick_metrics': return { title: "Recent Results", subtitle: "Proven Performance.", results: [] };
      default: return {};
    }
  };

  const renderBlockSettings = (block: Block, onUpdate: (newProps: any) => void) => {
    const props = block.props;
    switch (block.type) {
      case 'hero': return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-xs font-bold text-slate-400 uppercase">Background Color</Label>
            <div className="flex gap-2">
              <Input 
                type="color" 
                value={props.bgColor || '#f8fafc'} 
                onChange={(e) => onUpdate({ ...props, bgColor: e.target.value })} 
                className="w-12 h-12 p-1 rounded-lg cursor-pointer" 
              />
              <Input 
                value={props.bgColor || '#f8fafc'} 
                onChange={(e) => onUpdate({ ...props, bgColor: e.target.value })} 
                className="rounded-xl font-mono" 
              />
            </div>
          </div>
          <div className="space-y-2"><Label className="text-xs font-bold text-slate-400 uppercase">Headline</Label><Input value={props.title || ''} onChange={(e) => onUpdate({ ...props, title: e.target.value })} className="rounded-xl" /></div>
          <div className="space-y-2"><Label className="text-xs font-bold text-slate-400 uppercase">Subtitle</Label><Textarea value={props.subtitle || ''} onChange={(e) => onUpdate({ ...props, subtitle: e.target.value })} className="rounded-xl" /></div>
          <div className="space-y-2"><Label className="text-xs font-bold text-slate-400 uppercase">CTA Text</Label><Input value={props.ctaText || ''} onChange={(e) => onUpdate({ ...props, ctaText: e.target.value })} className="rounded-xl" /></div>
        </div>
      );
      case 'why_different':
      case 'research_insights': return (
        <div className="space-y-4">
          <div className="space-y-2"><Label className="text-xs font-bold uppercase">Section Title</Label><Input value={props.title || ''} onChange={(e) => onUpdate({ ...props, title: e.target.value })} className="rounded-xl" /></div>
          <div className="space-y-2"><Label className="text-xs font-bold uppercase">Description</Label><Textarea value={props.description || ''} onChange={(e) => onUpdate({ ...props, description: e.target.value })} className="rounded-xl min-h-[150px]" /></div>
        </div>
      );
      case 'quick_metrics': return (
        <div className="space-y-6">
          <div className="space-y-2"><Label className="text-xs font-bold uppercase">Section Title</Label><Input value={props.title || ''} onChange={(e) => onUpdate({ ...props, title: e.target.value })} className="rounded-xl" /></div>
          <div className="space-y-2"><Label className="text-xs font-bold uppercase">Subtitle</Label><Input value={props.subtitle || ''} onChange={(e) => onUpdate({ ...props, subtitle: e.target.value })} className="rounded-xl" /></div>
          <div className="space-y-4">
            <Label className="text-xs font-bold uppercase">Metric Cards</Label>
            {(props.results || []).map((r: any, i: number) => (
              <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3 relative group">
                <button onClick={() => {
                  const newR = props.results.filter((_: any, idx: number) => idx !== i);
                  onUpdate({ ...props, results: newR });
                }} className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="w-4 h-4" /></button>
                <div className="space-y-1"><Label className="text-[10px]">Brand Name</Label><Input value={r.brand} onChange={e => {
                  const newR = [...props.results]; newR[i].brand = e.target.value; onUpdate({...props, results: newR});
                }} className="h-8 text-xs rounded-lg" /></div>
                <div className="space-y-1"><Label className="text-[10px]">Color (Tailwind from-to)</Label><Input value={r.color} onChange={e => {
                  const newR = [...props.results]; newR[i].color = e.target.value; onUpdate({...props, results: newR});
                }} className="h-8 text-xs rounded-lg" placeholder="from-blue-600/20 to-indigo-600/20" /></div>
              </div>
            ))}
            <Button variant="outline" className="w-full rounded-xl border-dashed" onClick={() => onUpdate({ ...props, results: [...(props.results || []), { brand: 'New Brand', stats: [], color: 'from-blue-600/20 to-indigo-600/20' }] })}><Plus className="w-4 h-4 mr-2" /> Add Result Card</Button>
          </div>
        </div>
      );
      case 'team_grid': return (
        <div className="space-y-6">
          <div className="space-y-2"><Label className="text-xs font-bold uppercase">Section Title</Label><Input value={props.title || ''} onChange={(e) => onUpdate({ ...props, title: e.target.value })} className="rounded-xl" /></div>
          <div className="space-y-4">
            <Label className="text-xs font-bold uppercase">Team Members</Label>
            {(props.members || []).map((m: any, i: number) => (
              <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3 relative group">
                <button onClick={() => {
                  const newMembers = props.members.filter((_: any, idx: number) => idx !== i);
                  onUpdate({ ...props, members: newMembers });
                }} className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="w-4 h-4" /></button>
                <div className="space-y-1"><Label className="text-[10px]">Name</Label><Input value={m.name} onChange={e => {
                  const newMembers = [...props.members]; newMembers[i].name = e.target.value; onUpdate({...props, members: newMembers});
                }} className="h-8 text-xs rounded-lg" /></div>
                <div className="space-y-1"><Label className="text-[10px]">Role</Label><Input value={m.role} onChange={e => {
                  const newMembers = [...props.members]; newMembers[i].role = e.target.value; onUpdate({...props, members: newMembers});
                }} className="h-8 text-xs rounded-lg" /></div>
                <div className="space-y-1"><Label className="text-[10px]">Image URL</Label><Input value={m.image} onChange={e => {
                  const newMembers = [...props.members]; newMembers[i].image = e.target.value; onUpdate({...props, members: newMembers});
                }} className="h-8 text-xs rounded-lg" /></div>
                <div className="space-y-1"><Label className="text-[10px]">LinkedIn</Label><Input value={m.linkedin} onChange={e => {
                  const newMembers = [...props.members]; newMembers[i].linkedin = e.target.value; onUpdate({...props, members: newMembers});
                }} className="h-8 text-xs rounded-lg" /></div>
              </div>
            ))}
            <Button variant="outline" className="w-full rounded-xl border-dashed" onClick={() => onUpdate({ ...props, members: [...(props.members || []), { name: 'New Name', role: 'Founder', desc: '', image: '', linkedin: '#' }] })}><Plus className="w-4 h-4 mr-2" /> Add Member</Button>
          </div>
        </div>
      );
      case 'how_we_work': return (
        <div className="space-y-6">
          <div className="space-y-2"><Label className="text-xs font-bold uppercase text-slate-400">Section Title</Label><Input value={props.title || ''} onChange={(e) => onUpdate({ ...props, title: e.target.value })} className="rounded-xl" /></div>
          <div className="space-y-4">
            <Label className="text-xs font-bold uppercase text-slate-400">Roadmap Steps</Label>
            {(props.steps || []).map((s: any, i: number) => (
              <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3 relative group">
                <button onClick={() => {
                  const newSteps = props.steps.filter((_: any, idx: number) => idx !== i);
                  onUpdate({ ...props, steps: newSteps });
                }} className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="w-4 h-4" /></button>
                <div className="space-y-1"><Label className="text-[10px]">Step Title</Label><Input value={s.title} onChange={e => {
                  const newSteps = [...props.steps]; newSteps[i].title = e.target.value; onUpdate({...props, steps: newSteps});
                }} className="h-8 text-xs rounded-lg" /></div>
                <div className="space-y-1"><Label className="text-[10px]">Description</Label><Textarea value={s.desc} onChange={e => {
                  const newSteps = [...props.steps]; newSteps[i].desc = e.target.value; onUpdate({...props, steps: newSteps});
                }} className="text-xs rounded-lg min-h-[60px]" /></div>
              </div>
            ))}
            <Button variant="outline" className="w-full rounded-xl border-dashed" onClick={() => onUpdate({ ...props, steps: [...(props.steps || []), { title: 'New Phase', desc: 'Description of the process.' }] })}><Plus className="w-4 h-4 mr-2" /> Add Step</Button>
          </div>
        </div>
      );
      case 'what_we_do': return (
        <div className="space-y-6">
          <div className="space-y-2"><Label className="text-xs font-bold uppercase text-slate-400">Section Title</Label><Input value={props.title || ''} onChange={(e) => onUpdate({ ...props, title: e.target.value })} className="rounded-xl" /></div>
          <div className="space-y-4">
            <Label className="text-xs font-bold uppercase text-slate-400">Services</Label>
            {(props.services || []).map((s: any, i: number) => (
              <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3 relative group">
                <button onClick={() => {
                  const newS = props.services.filter((_: any, idx: number) => idx !== i);
                  onUpdate({ ...props, services: newS });
                }} className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="w-4 h-4" /></button>
                <div className="space-y-1"><Label className="text-[10px]">Service Title</Label><Input value={s.title} onChange={e => {
                  const newS = [...props.services]; newS[i].title = e.target.value; onUpdate({...props, services: newS});
                }} className="h-8 text-xs rounded-lg" /></div>
                <div className="space-y-1"><Label className="text-[10px]">Description</Label><Textarea value={s.desc} onChange={e => {
                  const newS = [...props.services]; newS[i].desc = e.target.value; onUpdate({...props, services: newS});
                }} className="text-xs rounded-lg min-h-[60px]" /></div>
              </div>
            ))}
            <Button variant="outline" className="w-full rounded-xl border-dashed" onClick={() => onUpdate({ ...props, services: [...(props.services || []), { title: 'Service Name', desc: 'Explanation.' }] })}><Plus className="w-4 h-4 mr-2" /> Add Service</Button>
          </div>
        </div>
      );
      case 'closing_cta': return (
        <div className="space-y-4">
          <div className="space-y-2"><Label className="text-xs font-bold uppercase">Headline</Label><Input value={props.title || ''} onChange={(e) => onUpdate({ ...props, title: e.target.value })} className="rounded-xl" /></div>
          <div className="space-y-2"><Label className="text-xs font-bold uppercase">Description</Label><Textarea value={props.description || ''} onChange={(e) => onUpdate({ ...props, description: e.target.value })} className="rounded-xl" /></div>
          <div className="space-y-2"><Label className="text-xs font-bold uppercase">Primary Button</Label><Input value={props.primaryCtaText || ''} onChange={(e) => onUpdate({ ...props, primaryCtaText: e.target.value })} className="rounded-xl" /></div>
          <div className="space-y-2"><Label className="text-xs font-bold uppercase">Secondary Button</Label><Input value={props.secondaryCtaText || ''} onChange={(e) => onUpdate({ ...props, secondaryCtaText: e.target.value })} className="rounded-xl" /></div>
        </div>
      );
      case 'testimonial': return (
        <div className="space-y-4">
          <div className="space-y-2"><Label className="text-xs font-bold uppercase">Quote</Label><Textarea value={props.quote || ''} onChange={(e) => onUpdate({ ...props, quote: e.target.value })} className="rounded-xl min-h-[100px]" /></div>
          <div className="space-y-2"><Label className="text-xs font-bold uppercase">Author</Label><Input value={props.author || ''} onChange={(e) => onUpdate({ ...props, author: e.target.value })} className="rounded-xl" /></div>
          <div className="space-y-2"><Label className="text-xs font-bold uppercase">Role</Label><Input value={props.role || ''} onChange={(e) => onUpdate({ ...props, role: e.target.value })} className="rounded-xl" /></div>
          <div className="space-y-2"><Label className="text-xs font-bold uppercase">Avatar URL</Label><Input value={props.avatar || ''} onChange={(e) => onUpdate({ ...props, avatar: e.target.value })} className="rounded-xl" /></div>
        </div>
      );
      case 'case_study_snapshots': return (
        <div className="space-y-6">
          <div>
            <Label className="text-xs font-bold text-slate-400 uppercase mb-4 block">Select Case Studies</Label>
            <p className="text-[10px] text-slate-400 mb-4 leading-tight italic">Pick specific stories to display. If none are selected, the latest 2 will show automatically.</p>
            <div className="space-y-2">
              {allCaseStudies.map(study => (
                <button
                  key={study.id}
                  onClick={() => {
                    const currentIds = props.studyIds || [];
                    const newIds = currentIds.includes(study.id)
                      ? currentIds.filter((id: string) => id !== study.id)
                      : [...currentIds, study.id].slice(0, 2);
                    onUpdate({ ...props, studyIds: newIds });
                  }}
                  className={cn(
                    "w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between group",
                    props.studyIds?.includes(study.id) 
                      ? "bg-blue-50 border-blue-200" 
                      : "bg-white border-slate-100 hover:border-blue-100"
                  )}
                >
                  <div>
                    <p className="text-xs font-bold text-slate-900">{study.title}</p>
                    <p className="text-[10px] text-slate-400">{study.category}</p>
                  </div>
                  {props.studyIds?.includes(study.id) && <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-white"><Check className="w-3 h-3" /></div>}
                </button>
              ))}
            </div>
          </div>
        </div>
      );
      default: return <div className="p-6 bg-slate-50 rounded-2xl text-center"><p className="text-xs text-slate-400 font-bold">This section is standard or uses automated styling.</p></div>;
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

        <main className="flex-1 overflow-y-auto bg-slate-100/50" onClick={() => setSelectedBlockId(null)}>
          <div className="w-full">
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
                  <div className={cn(
                    "transition-all duration-300",
                    selectedBlockId === block.id ? "ring-4 ring-blue-600/20 rounded-3xl overflow-hidden" : ""
                  )}>
                    <BlockRenderer 
                      blocks={[block]} 
                      editingId={selectedBlockId} 
                      onUpdateBlock={updateBlockProps}
                    />
                  </div>
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

export default PageEditor;