"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Save, Rocket, Eye, Plus, 
  Settings, ChevronLeft, Loader2,
  Layout, Trash2, Copy, Layers, X, List
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
    if (!id || id === 'new') {
      setLoading(false);
      return;
    }

    setLoading(true);
    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error("Editor Fetch Error:", error);
      showError("Failed to load page: " + error.message);
      navigate('/admin/pages');
    } else {
      setPage({
        ...data,
        content: Array.isArray(data.content) ? data.content : []
      });
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
    if (error) {
      showError("Failed to save changes: " + error.message);
    } else {
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
      case 'hero': 
        return { 
          title: 'New Hero Section', 
          subtitle: 'Add a compelling subtitle here', 
          ctaText: 'Get Started', 
          ctaUrl: '#' 
        };
      case 'rich_text': 
        return { content: '<h2>New Section</h2><p>Start writing your content here...</p>' };
      case 'kpi_grid': 
        return { 
          items: [ 
            { label: 'Metric 1', value: '0' }, 
            { label: 'Metric 2', value: '0' } 
          ] 
        };
      case 'team_grid': 
        return { 
          title: 'Our Team', 
          members: [{ 
            name: 'Team Member', 
            role: 'Role', 
            desc: 'Description', 
            image: '' 
          }] 
        };
      case 'faq': 
        return { 
          title: 'Frequently Asked Questions', 
          items: [{ 
            question: 'Question?', 
            answer: 'Answer.' 
          }] 
        };
      case 'testimonial': 
        return { 
          quote: 'Add testimonial quote', 
          author: 'Author Name', 
          role: 'Role, Company',
          avatar: ''
        };
      case 'cta': 
        return { 
          title: 'Ready to scale?', 
          description: 'Book your free audit today.', 
          buttonText: 'Contact Us',
          buttonUrl: '/contact'
        };
      case 'image': 
        return { url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f', alt: 'Placeholder' };
      case 'video_upload': 
        return { url: '', poster: '' };
      case 'youtube_embed': 
        return { videoId: '' };
      case 'instagram_embed': 
        return { url: '' };
      case 'closing_cta':
        return {
          title: "Ready to scale without burning cash?",
          description: "Book a 15-minute growth audit: we'll send a custom 90-day opportunity plan with prioritized experiments.",
          primaryCtaText: "Book Growth Audit",
          secondaryCtaText: "Request Case Pack"
        };
      default: 
        return {};
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
            <p className="text-xs text-slate-400">{page.content?.length || 0} blocks • Last saved: {format(new Date(page.updated_at), 'HH:mm')}</p>
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
                <div id={`block-${block.id}`}>
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
                </div>

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
                <p className="text-slate-400 mb-6">Start building by adding your first block.</p>
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
                  <Label className="text-sm font-bold text-slate-700">Page Title</Label>
                  <Input 
                    value={page.title} 
                    onChange={(e) => setPage({...page, title: e.target.value})}
                    className="rounded-xl h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-bold text-slate-700">URL Slug</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-sm">/p/</span>
                    <Input 
                      value={page.slug} 
                      onChange={(e) => setPage({...page, slug: e.target.value})}
                      className="rounded-xl h-12"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-bold text-slate-700">Description (SEO)</Label>
                  <Textarea 
                    value={page.description || ''} 
                    onChange={(e) => setPage({...page, description: e.target.value})}
                    className="rounded-xl min-h-[80px]"
                    placeholder="Brief description for SEO..."
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Badge className="bg-blue-100 text-blue-700 border-none">
                    {selectedBlock.type.replace('_', ' ')}
                  </Badge>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => duplicateBlock(selectedBlock)}>
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-red-500" onClick={() => deleteBlock(selectedBlockId)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Dynamic block settings based on type */}
                {renderBlockSettings(selectedBlock, (newProps) => updateBlockProps(selectedBlockId, newProps))}
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

// Helper function to render settings for each block type
const renderBlockSettings = (block: Block, onUpdate: (newProps: any) => void) => {
  const props = block.props;
  
  switch (block.type) {
    case 'hero':
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-xs font-bold text-slate-500 uppercase">Headline</Label>
            <Input 
              value={props.title || ''} 
              onChange={(e) => onUpdate({ ...props, title: e.target.value })}
              className="rounded-xl h-10"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-bold text-slate-500 uppercase">Subtitle</Label>
            <Textarea 
              value={props.subtitle || ''} 
              onChange={(e) => onUpdate({ ...props, subtitle: e.target.value })}
              className="rounded-xl min-h-[80px]"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-500 uppercase">CTA Text</Label>
              <Input 
                value={props.ctaText || ''} 
                onChange={(e) => onUpdate({ ...props, ctaText: e.target.value })}
                className="rounded-xl h-10"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-500 uppercase">CTA URL</Label>
              <Input 
                value={props.ctaUrl || ''} 
                onChange={(e) => onUpdate({ ...props, ctaUrl: e.target.value })}
                className="rounded-xl h-10"
              />
            </div>
          </div>
        </div>
      );
    
    case 'rich_text':
      return (
        <div className="space-y-2">
          <Label className="text-xs font-bold text-slate-500 uppercase">HTML Content</Label>
          <Textarea 
            value={props.content || ''} 
            onChange={(e) => onUpdate({ ...props, content: e.target.value })}
            className="rounded-xl min-h-[300px] font-mono text-sm"
          />
        </div>
      );
    
    case 'image':
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-xs font-bold text-slate-500 uppercase">Image URL</Label>
            <Input 
              value={props.url || ''} 
              onChange={(e) => onUpdate({ ...props, url: e.target.value })}
              className="rounded-xl h-10"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-bold text-slate-500 uppercase">Alt Text</Label>
            <Input 
              value={props.alt || ''} 
              onChange={(e) => onUpdate({ ...props, alt: e.target.value })}
              className="rounded-xl h-10"
            />
          </div>
        </div>
      );
    
    case 'cta':
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-xs font-bold text-slate-500 uppercase">Title</Label>
            <Input 
              value={props.title || ''} 
              onChange={(e) => onUpdate({ ...props, title: e.target.value })}
              className="rounded-xl h-10"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-bold text-slate-500 uppercase">Description</Label>
            <Textarea 
              value={props.description || ''} 
              onChange={(e) => onUpdate({ ...props, description: e.target.value })}
              className="rounded-xl min-h-[80px]"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-500 uppercase">Button Text</Label>
              <Input 
                value={props.buttonText || ''} 
                onChange={(e) => onUpdate({ ...props, buttonText: e.target.value })}
                className="rounded-xl h-10"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-500 uppercase">Button URL</Label>
              <Input 
                value={props.buttonUrl || ''} 
                onChange={(e) => onUpdate({ ...props, buttonUrl: e.target.value })}
                className="rounded-xl h-10"
              />
            </div>
          </div>
        </div>
      );
    
    case 'team_grid':
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-xs font-bold text-slate-500 uppercase">Section Title</Label>
            <Input 
              value={props.title || ''} 
              onChange={(e) => onUpdate({ ...props, title: e.target.value })}
              className="rounded-xl h-10"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-bold text-slate-500 uppercase">Team Members (JSON)</Label>
            <Textarea 
              value={JSON.stringify(props.members || [], null, 2)} 
              onChange={(e) => {
                try {
                  const parsed = JSON.parse(e.target.value);
                  onUpdate({ ...props, members: parsed });
                } catch (err) {
                  // Invalid JSON, don't update
                }
              }}
              className="rounded-xl min-h-[200px] font-mono text-xs"
            />
          </div>
        </div>
      );
    
    case 'faq':
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-xs font-bold text-slate-500 uppercase">Section Title</Label>
            <Input 
              value={props.title || ''} 
              onChange={(e) => onUpdate({ ...props, title: e.target.value })}
              className="rounded-xl h-10"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-bold text-slate-500 uppercase">FAQ Items (JSON)</Label>
            <Textarea 
              value={JSON.stringify(props.items || [], null, 2)} 
              onChange={(e) => {
                try {
                  const parsed = JSON.parse(e.target.value);
                  onUpdate({ ...props, items: parsed });
                } catch (err) {
                  // Invalid JSON, don't update
                }
              }}
              className="rounded-xl min-h-[200px] font-mono text-xs"
            />
          </div>
        </div>
      );
    
    case 'testimonial':
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-xs font-bold text-slate-500 uppercase">Quote</Label>
            <Textarea 
              value={props.quote || ''} 
              onChange={(e) => onUpdate({ ...props, quote: e.target.value })}
              className="rounded-xl min-h-[80px]"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-500 uppercase">Author</Label>
              <Input 
                value={props.author || ''} 
                onChange={(e) => onUpdate({ ...props, author: e.target.value })}
                className="rounded-xl h-10"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-500 uppercase">Role</Label>
              <Input 
                value={props.role || ''} 
                onChange={(e) => onUpdate({ ...props, role: e.target.value })}
                className="rounded-xl h-10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-bold text-slate-500 uppercase">Avatar URL</Label>
            <Input 
              value={props.avatar || ''} 
              onChange={(e) => onUpdate({ ...props, avatar: e.target.value })}
              className="rounded-xl h-10"
            />
          </div>
        </div>
      );
    
    case 'closing_cta':
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-xs font-bold text-slate-500 uppercase">Headline</Label>
            <Input 
              value={props.title || ''} 
              onChange={(e) => onUpdate({ ...props, title: e.target.value })}
              className="rounded-xl h-10"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-bold text-slate-500 uppercase">Description</Label>
            <Textarea 
              value={props.description || ''} 
              onChange={(e) => onUpdate({ ...props, description: e.target.value })}
              className="rounded-xl min-h-[80px]"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-500 uppercase">Primary CTA</Label>
              <Input 
                value={props.primaryCtaText || ''} 
                onChange={(e) => onUpdate({ ...props, primaryCtaText: e.target.value })}
                className="rounded-xl h-10"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-500 uppercase">Secondary CTA</Label>
              <Input 
                value={props.secondaryCtaText || ''} 
                onChange={(e) => onUpdate({ ...props, secondaryCtaText: e.target.value })}
                className="rounded-xl h-10"
              />
            </div>
          </div>
        </div>
      );
    
    default:
      return (
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
          <p className="text-sm text-slate-500">
            No editable settings for this block type yet.
          </p>
        </div>
      );
  }
};

export default PageEditor;