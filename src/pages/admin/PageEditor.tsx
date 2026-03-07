"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Save, Rocket, Eye, Plus, 
  Settings, ChevronLeft, Loader2,
  Layout, Trash2, Copy
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

  const updateBlockProps = (blockId: string, newProps: any) => {
    if (!page) return;
    setPage({
      ...page,
      content: page.content.map(b => b.id === blockId ? { ...b, props: { ...b.props, ...newProps } } : b)
    });
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
      case 'rich_text': return { content: '<h2>New Section</h2><p>Start writing your content here...</p>' };
      case 'kpi_grid': return { items: [{ label: 'Revenue', value: '₹10L' }, { label: 'Growth', value: '25%' }] };
      case 'team_grid': return { title: 'Our Team', members: [{ name: 'John Doe', role: 'CEO', desc: 'Founder of Qala Labs', image: '' }] };
      case 'faq': return { title: 'Frequently Asked Questions', items: [{ question: 'What is Qala Labs?', answer: 'A performance marketing agency.' }] };
      case 'cta': return { title: 'Ready to scale?', description: 'Book your free audit today.', buttonText: 'Contact Us' };
      case 'image': return { url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f', alt: 'Placeholder' };
      case 'video_upload': return { url: '', poster: '' };
      case 'youtube_embed': return { videoId: '' };
      case 'instagram_embed': return { url: '' };
      default: return {};
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
    </div>
  );

  if (!page) return null;

  const selectedBlock = page.content.find(b => b.id === selectedBlockId);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
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
          <Button variant="ghost" className="rounded-xl gap-2 text-slate-600" asChild>
            <a href={`/p/${page.slug}?preview=true`} target="_blank" rel="noopener noreferrer">
              <Eye className="w-4 h-4" /> Preview
            </a>
          </Button>
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
        <main className="flex-1 overflow-y-auto p-12 bg-slate-100/50" onClick={() => setSelectedBlockId(null)}>
          <div className="max-w-5xl mx-auto space-y-4">
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
                  <div className="pointer-events-none scale-[0.8] origin-top transform-gpu">
                    <BlockRenderer blocks={[block]} />
                  </div>
                </BlockWrapper>

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

        <aside className="w-96 bg-white border-l border-slate-200 flex flex-col">
          <div className="p-6 border-b border-slate-200">
            <h2 className="font-black text-slate-900 flex items-center gap-2">
              <Settings className="w-4 h-4 text-blue-600" /> 
              {selectedBlockId ? 'Block Settings' : 'Page Settings'}
            </h2>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {!selectedBlockId ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Page Title</Label>
                  <Input value={page.title} onChange={(e) => setPage({ ...page, title: e.target.value })} className="rounded-xl h-12" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">URL Slug</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-sm">/p/</span>
                    <Input value={page.slug} onChange={(e) => setPage({ ...page, slug: e.target.value })} className="rounded-xl h-12" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Meta Description</Label>
                  <Textarea value={page.description || ''} onChange={(e) => setPage({ ...page, description: e.target.value })} className="min-h-[100px] rounded-xl" />
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 mb-6">
                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Editing Block</p>
                  <p className="font-bold text-slate-900 capitalize">{selectedBlock?.type.replace('_', ' ')}</p>
                </div>

                {selectedBlock?.type === 'hero' && (
                  <>
                    <div className="space-y-2"><Label>Headline</Label><Input value={selectedBlock.props.title} onChange={(e) => updateBlockProps(selectedBlock.id, { title: e.target.value })} className="rounded-xl" /></div>
                    <div className="space-y-2"><Label>Subtitle</Label><Textarea value={selectedBlock.props.subtitle} onChange={(e) => updateBlockProps(selectedBlock.id, { subtitle: e.target.value })} className="rounded-xl" /></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2"><Label>CTA Text</Label><Input value={selectedBlock.props.ctaText} onChange={(e) => updateBlockProps(selectedBlock.id, { ctaText: e.target.value })} className="rounded-xl" /></div>
                      <div className="space-y-2"><Label>CTA URL</Label><Input value={selectedBlock.props.ctaUrl} onChange={(e) => updateBlockProps(selectedBlock.id, { ctaUrl: e.target.value })} className="rounded-xl" /></div>
                    </div>
                  </>
                )}

                {selectedBlock?.type === 'rich_text' && (
                  <div className="space-y-2"><Label>HTML Content</Label><Textarea value={selectedBlock.props.content} onChange={(e) => updateBlockProps(selectedBlock.id, { content: e.target.value })} className="min-h-[300px] font-mono text-xs rounded-xl" /></div>
                )}

                {selectedBlock?.type === 'team_grid' && (
                  <div className="space-y-4">
                    <Label>Section Title</Label>
                    <Input value={selectedBlock.props.title} onChange={(e) => updateBlockProps(selectedBlock.id, { title: e.target.value })} className="rounded-xl" />
                    <Label>Members</Label>
                    {selectedBlock.props.members?.map((member: any, i: number) => (
                      <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-black text-slate-400 uppercase">Member {i+1}</span>
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-red-500" onClick={() => {
                            const newMembers = [...selectedBlock.props.members];
                            newMembers.splice(i, 1);
                            updateBlockProps(selectedBlock.id, { members: newMembers });
                          }}><Trash2 className="w-3 h-3" /></Button>
                        </div>
                        <Input placeholder="Name" value={member.name} onChange={(e) => {
                          const newMembers = [...selectedBlock.props.members];
                          newMembers[i].name = e.target.value;
                          updateBlockProps(selectedBlock.id, { members: newMembers });
                        }} className="h-8 text-xs rounded-lg" />
                        <Input placeholder="Role" value={member.role} onChange={(e) => {
                          const newMembers = [...selectedBlock.props.members];
                          newMembers[i].role = e.target.value;
                          updateBlockProps(selectedBlock.id, { members: newMembers });
                        }} className="h-8 text-xs rounded-lg" />
                        <Input placeholder="Image URL" value={member.image} onChange={(e) => {
                          const newMembers = [...selectedBlock.props.members];
                          newMembers[i].image = e.target.value;
                          updateBlockProps(selectedBlock.id, { members: newMembers });
                        }} className="h-8 text-xs rounded-lg" />
                      </div>
                    ))}
                    <Button variant="outline" className="w-full rounded-xl border-dashed" onClick={() => {
                      const newMembers = [...(selectedBlock.props.members || []), { name: 'New Member', role: 'Role', desc: '', image: '' }];
                      updateBlockProps(selectedBlock.id, { members: newMembers });
                    }}><Plus className="w-4 h-4 mr-2" /> Add Member</Button>
                  </div>
                )}

                {selectedBlock?.type === 'faq' && (
                  <div className="space-y-4">
                    <Label>Section Title</Label>
                    <Input value={selectedBlock.props.title} onChange={(e) => updateBlockProps(selectedBlock.id, { title: e.target.value })} className="rounded-xl" />
                    <Label>FAQ Items</Label>
                    {selectedBlock.props.items?.map((item: any, i: number) => (
                      <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-black text-slate-400 uppercase">Item {i+1}</span>
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-red-500" onClick={() => {
                            const newItems = [...selectedBlock.props.items];
                            newItems.splice(i, 1);
                            updateBlockProps(selectedBlock.id, { items: newItems });
                          }}><Trash2 className="w-3 h-3" /></Button>
                        </div>
                        <Input placeholder="Question" value={item.question} onChange={(e) => {
                          const newItems = [...selectedBlock.props.items];
                          newItems[i].question = e.target.value;
                          updateBlockProps(selectedBlock.id, { items: newItems });
                        }} className="h-8 text-xs rounded-lg" />
                        <Textarea placeholder="Answer" value={item.answer} onChange={(e) => {
                          const newItems = [...selectedBlock.props.items];
                          newItems[i].answer = e.target.value;
                          updateBlockProps(selectedBlock.id, { items: newItems });
                        }} className="h-20 text-xs rounded-lg" />
                      </div>
                    ))}
                    <Button variant="outline" className="w-full rounded-xl border-dashed" onClick={() => {
                      const newItems = [...(selectedBlock.props.items || []), { question: 'New Question', answer: 'New Answer' }];
                      updateBlockProps(selectedBlock.id, { items: newItems });
                    }}><Plus className="w-4 h-4 mr-2" /> Add FAQ</Button>
                  </div>
                )}

                {selectedBlock?.type === 'youtube_embed' && (
                  <div className="space-y-2"><Label>YouTube Video ID</Label><Input value={selectedBlock.props.videoId} onChange={(e) => updateBlockProps(selectedBlock.id, { videoId: e.target.value })} className="rounded-xl" placeholder="e.g. dQw4w9WgXcQ" /></div>
                )}

                {selectedBlock?.type === 'instagram_embed' && (
                  <div className="space-y-2"><Label>Instagram URL</Label><Input value={selectedBlock.props.url} onChange={(e) => updateBlockProps(selectedBlock.id, { url: e.target.value })} className="rounded-xl" placeholder="https://www.instagram.com/p/..." /></div>
                )}

                {selectedBlock?.type === 'video_upload' && (
                  <>
                    <div className="space-y-2"><Label>Video URL</Label><Input value={selectedBlock.props.url} onChange={(e) => updateBlockProps(selectedBlock.id, { url: e.target.value })} className="rounded-xl" /></div>
                    <div className="space-y-2"><Label>Poster Image URL</Label><Input value={selectedBlock.props.poster} onChange={(e) => updateBlockProps(selectedBlock.id, { poster: e.target.value })} className="rounded-xl" /></div>
                  </>
                )}
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default PageEditor;