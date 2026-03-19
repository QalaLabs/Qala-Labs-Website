"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Save, ChevronLeft, Loader2, Image as ImageIcon, PenTool } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { showSuccess, showError } from '@/utils/toast';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

const BlogEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<any>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image_url: '',
    category: 'Strategy',
    status: 'draft'
  });

  useEffect(() => {
    if (id && id !== 'new') {
      fetchPost();
    } else {
      setLoading(false);
    }
  }, [id]);

  const fetchPost = async () => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      showError("Failed to load post");
      navigate('/admin/blog');
    } else {
      setFormData(data);
    }
    setLoading(false);
  };

  const handleSave = async (statusOverride?: string) => {
    if (!user) return;
    setSaving(true);
    
    const dataToSave = {
      ...formData,
      status: statusOverride || formData.status,
      user_id: user.id,
      updated_at: new Date().toISOString()
    };

    let error;
    if (id === 'new') {
      const { error: insError } = await supabase.from('blog_posts').insert(dataToSave);
      error = insError;
    } else {
      const { error: updError } = await supabase.from('blog_posts').update(dataToSave).eq('id', id);
      error = updError;
    }

    setSaving(false);
    if (error) showError("Save failed: " + error.message);
    else {
      showSuccess("Post saved");
      navigate('/admin/blog');
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AdminSidebar />
      <main className="flex-1 p-10">
        <header className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/admin/blog')} className="rounded-xl">
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-3xl font-black text-slate-900">
              {id === 'new' ? 'New Insight' : 'Edit Insight'}
            </h1>
            <Badge className={cn(
              "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border-none",
              formData.status === 'published' ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
            )}>
              {formData.status}
            </Badge>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={() => handleSave('draft')} 
              disabled={saving}
              className="rounded-xl px-6 py-6 border-slate-200"
            >
              Save Draft
            </Button>
            <Button 
              onClick={() => handleSave('published')} 
              disabled={saving} 
              className="bg-blue-600 hover:bg-blue-700 rounded-xl px-8 py-6 font-black shadow-lg shadow-blue-500/20"
            >
              {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <PenTool className="w-5 h-5 mr-2" />}
              Publish Insight
            </Button>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-none shadow-sm rounded-[2.5rem] bg-white">
              <CardHeader className="p-10 pb-0"><CardTitle>Post Content</CardTitle></CardHeader>
              <CardContent className="p-10 space-y-6">
                <div className="space-y-2">
                  <Label>Headline</Label>
                  <Input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="rounded-xl h-12 text-lg font-bold" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2"><Label>Slug</Label><Input value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="rounded-xl h-12" /></div>
                  <div className="space-y-2"><Label>Category</Label><Input value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="rounded-xl h-12" /></div>
                </div>
                <div className="space-y-2"><Label>Excerpt (Short summary)</Label><Textarea value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})} className="rounded-xl min-h-[80px]" /></div>
                <div className="space-y-2">
                  <Label>Body Content (HTML)</Label>
                  <Textarea value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="rounded-xl min-h-[500px] font-mono text-sm leading-relaxed" placeholder="<p>Write your insight here...</p>" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card className="border-none shadow-sm rounded-[2.5rem] bg-white">
              <CardHeader className="p-8 pb-0"><CardTitle className="text-lg">Featured Image</CardTitle></CardHeader>
              <CardContent className="p-8 space-y-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2"><ImageIcon className="w-4 h-4 text-slate-400" /> Image URL</Label>
                  <Input value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} className="rounded-xl h-10" />
                  {formData.image_url && <img src={formData.image_url} className="mt-4 rounded-xl aspect-video object-cover" />}
                </div>
              </CardContent>
            </Card>

            <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white">
              <h3 className="text-xl font-bold mb-4">Publishing Tip</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Use high-quality WebP images for faster load times. Ensure your headline includes target keywords for SEO performance.
              </p>
              <Button variant="ghost" className="w-full text-blue-400 hover:text-blue-300 hover:bg-white/5" asChild>
                <a href="/admin/guide">View Editor Guide</a>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogEditor;