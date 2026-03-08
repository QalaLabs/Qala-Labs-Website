"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { 
  Save, ChevronLeft, Loader2, Plus, Trash2, 
  Image as ImageIcon, Instagram, Globe, Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { showSuccess, showError } from '@/utils/toast';
import { useAuth } from '@/context/AuthContext';

const PortfolioEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<any>({
    title: '',
    slug: '',
    description: '',
    category: 'Branding',
    image_url: '',
    website_url: '',
    project_info: { client: '', dated: '', location: '', platform: '' },
    slider_images: [],
    instagram_reels: [],
    proof_images: [],
    metrics: []
  });

  useEffect(() => {
    if (id && id !== 'new') {
      fetchProject();
    } else {
      setLoading(false);
    }
  }, [id]);

  const fetchProject = async () => {
    const { data, error } = await supabase
      .from('portfolio_projects')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      showError("Failed to load project");
      navigate('/admin/portfolio');
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
      const { error: insError } = await supabase.from('portfolio_projects').insert(dataToSave);
      error = insError;
    } else {
      const { error: updError } = await supabase.from('portfolio_projects').update(dataToSave).eq('id', id);
      error = updError;
    }

    setSaving(false);
    if (error) showError("Save failed: " + error.message);
    else {
      showSuccess("Project saved");
      navigate('/admin/portfolio');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AdminSidebar />
      <main className="flex-1 p-10">
        <header className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/admin/portfolio')} className="rounded-xl">
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-3xl font-black text-slate-900">
              {id === 'new' ? 'New Portfolio Project' : 'Edit Project'}
            </h1>
          </div>
          <Button onClick={handleSave} disabled={saving} className="bg-blue-600 hover:bg-blue-700 rounded-xl px-8 py-6 font-black shadow-lg shadow-blue-500/20">
            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5 mr-2" />}
            Save Project
          </Button>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-none shadow-sm rounded-[2.5rem] bg-white">
              <CardHeader className="p-10 pb-0"><CardTitle>Basic Information</CardTitle></CardHeader>
              <CardContent className="p-10 space-y-6">
                <div className="space-y-2">
                  <Label>Project Title</Label>
                  <Input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="rounded-xl h-12" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2"><Label>Slug</Label><Input value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="rounded-xl h-12" /></div>
                  <div className="space-y-2"><Label>Category</Label><Input value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="rounded-xl h-12" /></div>
                </div>
                <div className="space-y-2"><Label>Website URL</Label><Input value={formData.website_url} onChange={e => setFormData({...formData, website_url: e.target.value})} className="rounded-xl h-12" /></div>
                <div className="space-y-2"><Label>Description</Label><Textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="rounded-xl min-h-[100px]" /></div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm rounded-[2.5rem] bg-white">
              <CardHeader className="p-10 pb-0"><CardTitle className="flex items-center gap-2"><ImageIcon className="w-5 h-5 text-blue-600" /> Image Slider</CardTitle></CardHeader>
              <CardContent className="p-10 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formData.slider_images.map((img: any, i: number) => (
                    <div key={i} className="p-4 bg-slate-50 rounded-xl space-y-2 relative">
                      <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-red-500 h-6 w-6" onClick={() => {
                        const newImgs = formData.slider_images.filter((_: any, idx: number) => idx !== i);
                        setFormData({...formData, slider_images: newImgs});
                      }}><Trash2 className="w-4 h-4" /></Button>
                      <Input placeholder="Image URL" value={img.url} onChange={e => {
                        const newImgs = [...formData.slider_images];
                        newImgs[i].url = e.target.value;
                        setFormData({...formData, slider_images: newImgs});
                      }} className="h-8 text-xs" />
                      <Input placeholder="Label" value={img.label} onChange={e => {
                        const newImgs = [...formData.slider_images];
                        newImgs[i].label = e.target.value;
                        setFormData({...formData, slider_images: newImgs});
                      }} className="h-8 text-xs" />
                      <select className="w-full h-8 text-xs rounded border bg-white" value={img.type} onChange={e => {
                        const newImgs = [...formData.slider_images];
                        newImgs[i].type = e.target.value;
                        setFormData({...formData, slider_images: newImgs});
                      }}>
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="Mobile">Mobile</option>
                      </select>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full rounded-xl border-dashed" onClick={() => setFormData({...formData, slider_images: [...formData.slider_images, {url: '', label: '', type: 'Frontend'}]})}><Plus className="w-4 h-4 mr-2" /> Add Slide</Button>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm rounded-[2.5rem] bg-white">
              <CardHeader className="p-10 pb-0"><CardTitle className="flex items-center gap-2"><Instagram className="w-5 h-5 text-blue-600" /> Social Proof</CardTitle></CardHeader>
              <CardContent className="p-10 space-y-6">
                <div className="space-y-4">
                  <Label>Instagram Reel URLs</Label>
                  {formData.instagram_reels.map((url: string, i: number) => (
                    <div key={i} className="flex gap-2">
                      <Input value={url} onChange={e => {
                        const newR = [...formData.instagram_reels];
                        newR[i] = e.target.value;
                        setFormData({...formData, instagram_reels: newR});
                      }} className="rounded-xl h-10" />
                      <Button variant="ghost" size="icon" className="text-red-500" onClick={() => {
                        const newR = formData.instagram_reels.filter((_: any, idx: number) => idx !== i);
                        setFormData({...formData, instagram_reels: newR});
                      }}><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="w-full rounded-xl" onClick={() => setFormData({...formData, instagram_reels: [...formData.instagram_reels, '']})}>Add Reel</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card className="border-none shadow-sm rounded-[2.5rem] bg-white">
              <CardHeader className="p-8 pb-0"><CardTitle className="text-lg flex items-center gap-2"><Info className="w-4 h-4 text-blue-600" /> Project Details</CardTitle></CardHeader>
              <CardContent className="p-8 space-y-4">
                <div className="space-y-1"><Label className="text-xs">Client Name</Label><Input value={formData.project_info.client} onChange={e => setFormData({...formData, project_info: {...formData.project_info, client: e.target.value}})} className="rounded-xl h-10" /></div>
                <div className="space-y-1"><Label className="text-xs">Date</Label><Input value={formData.project_info.dated} onChange={e => setFormData({...formData, project_info: {...formData.project_info, dated: e.target.value}})} className="rounded-xl h-10" placeholder="Oct 2024" /></div>
                <div className="space-y-1"><Label className="text-xs">Location</Label><Input value={formData.project_info.location} onChange={e => setFormData({...formData, project_info: {...formData.project_info, location: e.target.value}})} className="rounded-xl h-10" /></div>
                <div className="space-y-1"><Label className="text-xs">Platform</Label><Input value={formData.project_info.platform} onChange={e => setFormData({...formData, project_info: {...formData.project_info, platform: e.target.value}})} className="rounded-xl h-10" placeholder="Shopify, Custom React..." /></div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PortfolioEditor;