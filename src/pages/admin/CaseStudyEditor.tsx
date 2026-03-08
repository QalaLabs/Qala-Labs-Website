"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { 
  Save, ChevronLeft, Loader2, Plus, Trash2, 
  Image as ImageIcon, Video, Trophy, BookOpen
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { showSuccess, showError } from '@/utils/toast';
import { useAuth } from '@/context/AuthContext';

const CaseStudyEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<any>({
    title: '',
    slug: '',
    description: '',
    category: 'E-commerce',
    image_url: '',
    video_url: '',
    results: {
      headline: '',
      metrics: [{ label: 'ROAS', value: '0x' }],
      learnings: [{ myth: '', reality: '' }]
    },
    content: {
      blocks: [{ title: 'The Challenge', body: '' }]
    }
  });

  useEffect(() => {
    if (id && id !== 'new') {
      fetchStudy();
    } else {
      setLoading(false);
    }
  }, [id]);

  const fetchStudy = async () => {
    const { data, error } = await supabase
      .from('case_studies')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      showError("Failed to load case study");
      navigate('/admin/case-studies');
    } else {
      setFormData(data);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    
    const dataToSave = {
      ...formData,
      user_id: user.id,
      updated_at: new Date().toISOString()
    };

    let error;
    if (id === 'new') {
      const { error: insError } = await supabase.from('case_studies').insert(dataToSave);
      error = insError;
    } else {
      const { error: updError } = await supabase.from('case_studies').update(dataToSave).eq('id', id);
      error = updError;
    }

    setSaving(false);
    if (error) showError("Save failed: " + error.message);
    else {
      showSuccess("Case study saved");
      navigate('/admin/case-studies');
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
            <Button variant="ghost" size="icon" onClick={() => navigate('/admin/case-studies')} className="rounded-xl">
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-3xl font-black text-slate-900">
              {id === 'new' ? 'New Case Study' : 'Edit Case Study'}
            </h1>
          </div>
          <Button onClick={handleSave} disabled={saving} className="bg-blue-600 hover:bg-blue-700 rounded-xl px-8 py-6 font-black shadow-lg shadow-blue-500/20">
            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5 mr-2" />}
            Save Case Study
          </Button>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-none shadow-sm rounded-[2.5rem] bg-white">
              <CardHeader className="p-10 pb-0"><CardTitle>Basic Information</CardTitle></CardHeader>
              <CardContent className="p-10 space-y-6">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="rounded-xl h-12" placeholder="e.g. Scaling GlowSkin to 12Cr" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Slug</Label>
                    <Input value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="rounded-xl h-12" placeholder="glowskin-scaling" />
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Input value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="rounded-xl h-12" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Short Description</Label>
                  <Textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="rounded-xl min-h-[100px]" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm rounded-[2.5rem] bg-white">
              <CardHeader className="p-10 pb-0"><CardTitle className="flex items-center gap-2"><Trophy className="w-5 h-5 text-blue-600" /> Results & Metrics</CardTitle></CardHeader>
              <CardContent className="p-10 space-y-8">
                <div className="space-y-2">
                  <Label>Result Headline</Label>
                  <Input value={formData.results.headline} onChange={e => setFormData({...formData, results: {...formData.results, headline: e.target.value}})} className="rounded-xl h-12" placeholder="₹12Cr in 90 Days" />
                </div>
                
                <div className="space-y-4">
                  <Label>Key Metrics</Label>
                  {formData.results.metrics.map((m: any, i: number) => (
                    <div key={i} className="flex gap-4 items-end bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <div className="flex-1 space-y-2"><Label className="text-xs">Label</Label><Input value={m.label} onChange={e => {
                        const newMetrics = [...formData.results.metrics];
                        newMetrics[i].label = e.target.value;
                        setFormData({...formData, results: {...formData.results, metrics: newMetrics}});
                      }} className="h-10" /></div>
                      <div className="flex-1 space-y-2"><Label className="text-xs">Value</Label><Input value={m.value} onChange={e => {
                        const newMetrics = [...formData.results.metrics];
                        newMetrics[i].value = e.target.value;
                        setFormData({...formData, results: {...formData.results, metrics: newMetrics}});
                      }} className="h-10" /></div>
                      <Button variant="ghost" size="icon" className="text-red-500" onClick={() => {
                        const newMetrics = formData.results.metrics.filter((_: any, idx: number) => idx !== i);
                        setFormData({...formData, results: {...formData.results, metrics: newMetrics}});
                      }}><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full rounded-xl border-dashed" onClick={() => setFormData({...formData, results: {...formData.results, metrics: [...formData.results.metrics, {label: '', value: ''}]}})}><Plus className="w-4 h-4 mr-2" /> Add Metric</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm rounded-[2.5rem] bg-white">
              <CardHeader className="p-10 pb-0"><CardTitle className="flex items-center gap-2"><BookOpen className="w-5 h-5 text-blue-600" /> Case Narrative</CardTitle></CardHeader>
              <CardContent className="p-10 space-y-8">
                {formData.content.blocks.map((b: any, i: number) => (
                  <div key={i} className="space-y-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex justify-between items-center">
                      <Input value={b.title} onChange={e => {
                        const newBlocks = [...formData.content.blocks];
                        newBlocks[i].title = e.target.value;
                        setFormData({...formData, content: {blocks: newBlocks}});
                      }} className="font-bold border-none bg-transparent text-xl p-0 h-auto focus-visible:ring-0" />
                      <Button variant="ghost" size="icon" className="text-red-500" onClick={() => {
                        const newBlocks = formData.content.blocks.filter((_: any, idx: number) => idx !== i);
                        setFormData({...formData, content: {blocks: newBlocks}});
                      }}><Trash2 className="w-4 h-4" /></Button>
                    </div>
                    <Textarea value={b.body} onChange={e => {
                      const newBlocks = [...formData.content.blocks];
                      newBlocks[i].body = e.target.value;
                      setFormData({...formData, content: {blocks: newBlocks}});
                    }} className="min-h-[150px] bg-white rounded-xl" placeholder="Write the story section..." />
                  </div>
                ))}
                <Button variant="outline" className="w-full rounded-xl border-dashed" onClick={() => setFormData({...formData, content: {blocks: [...formData.content.blocks, {title: 'New Section', body: ''}]}})}><Plus className="w-4 h-4 mr-2" /> Add Story Block</Button>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card className="border-none shadow-sm rounded-[2.5rem] bg-white">
              <CardHeader className="p-8 pb-0"><CardTitle className="text-lg">Media Assets</CardTitle></CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2"><ImageIcon className="w-4 h-4 text-slate-400" /> Main Image URL</Label>
                  <Input value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} className="rounded-xl" />
                  {formData.image_url && <img src={formData.image_url} className="mt-2 rounded-xl aspect-video object-cover" />}
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2"><Video className="w-4 h-4 text-slate-400" /> YouTube Video URL</Label>
                  <Input value={formData.video_url} onChange={e => setFormData({...formData, video_url: e.target.value})} className="rounded-xl" placeholder="https://youtube.com/watch?v=..." />
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm rounded-[2.5rem] bg-white">
              <CardHeader className="p-8 pb-0"><CardTitle className="text-lg">What We Learned</CardTitle></CardHeader>
              <CardContent className="p-8 space-y-4">
                {formData.results.learnings.map((l: any, i: number) => (
                  <div key={i} className="space-y-2 p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <Input placeholder="The Myth" value={l.myth} onChange={e => {
                      const newL = [...formData.results.learnings];
                      newL[i].myth = e.target.value;
                      setFormData({...formData, results: {...formData.results, learnings: newL}});
                    }} className="text-xs" />
                    <Textarea placeholder="The Reality" value={l.reality} onChange={e => {
                      const newL = [...formData.results.learnings];
                      newL[i].reality = e.target.value;
                      setFormData({...formData, results: {...formData.results, learnings: newL}});
                    }} className="text-xs min-h-[60px]" />
                    <Button variant="ghost" size="sm" className="w-full text-red-500 h-6" onClick={() => {
                      const newL = formData.results.learnings.filter((_: any, idx: number) => idx !== i);
                      setFormData({...formData, results: {...formData.results, learnings: newL}});
                    }}><Trash2 className="w-3 h-3" /></Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full rounded-xl" onClick={() => setFormData({...formData, results: {...formData.results, learnings: [...formData.results.learnings, {myth: '', reality: ''}]}})}>Add Learning</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CaseStudyEditor;