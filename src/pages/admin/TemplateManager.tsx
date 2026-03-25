"use client";

import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { 
  Mail, Save, RefreshCcw, Loader2, 
  Info, Code, MessageSquare, UserCheck, 
  Briefcase, Calculator, Zap 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { showSuccess, showError } from '@/utils/toast';
import { supabase } from '@/integrations/supabase/client';

const tools = [
  { id: 'contact_form_v2', label: 'Contact Form', icon: MessageSquare },
  { id: 'creator_onboarding_v2', label: 'Creator Collective', icon: UserCheck },
  { id: 'agency_network_join', label: 'Agency Network', icon: Briefcase },
  { id: 'roi_calculator', label: 'ROI Calculator', icon: Calculator },
  { id: 'profitability_estimator', label: 'Profit Estimator', icon: Zap },
  { id: 'ltv_calculator', label: 'LTV Calculator', icon: RefreshCcw },
  { id: 'scale_potential_quiz', label: 'Scale Quiz', icon: Zap },
  { id: 'sticky_cta_microform', label: 'Sticky CTA', icon: Mail },
  { id: 'career_application', label: 'Careers', icon: UserCheck }
];

const TemplateManager = () => {
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [selectedTool, setSelectedTool] = useState(tools[0].id);

  const fetchTemplates = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('email_templates').select('*');
    if (!error) setTemplates(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchTemplates(); }, []);

  const currentTemplate = templates.find(t => t.tool_used === selectedTool) || {
    tool_used: selectedTool,
    subject: '',
    body: ''
  };

  const handleSave = async () => {
    setSaving(selectedTool);
    const { error } = await supabase
      .from('email_templates')
      .upsert({ 
        tool_used: selectedTool, 
        subject: currentTemplate.subject, 
        body: currentTemplate.body,
        updated_at: new Date().toISOString()
      }, { onConflict: 'tool_used' });

    if (!error) {
      showSuccess("Template updated successfully");
      fetchTemplates();
    } else {
      showError("Failed to save template");
    }
    setSaving(null);
  };

  const updateLocal = (field: string, value: string) => {
    const exists = templates.find(t => t.tool_used === selectedTool);
    if (exists) {
      setTemplates(templates.map(t => t.tool_used === selectedTool ? { ...t, [field]: value } : t));
    } else {
      setTemplates([...templates, { tool_used: selectedTool, [field]: value }]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AdminSidebar />
      <main className="flex-1 p-10">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Email Templates</h1>
            <p className="text-slate-500">Personalize the automated responses for every form.</p>
          </div>
          <Button onClick={fetchTemplates} variant="outline" className="rounded-xl">
            <RefreshCcw className={loading ? "animate-spin" : ""} />
          </Button>
        </header>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Sidebar: Tool Selection */}
          <div className="lg:col-span-4 space-y-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 ml-2">Select Form Type</p>
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setSelectedTool(tool.id)}
                className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl text-sm font-bold transition-all ${
                  selectedTool === tool.id 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-100"
                }`}
              >
                <tool.icon className="w-4 h-4" />
                {tool.label}
                {templates.find(t => t.tool_used === tool.id) && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-green-400" />
                )}
              </button>
            ))}
          </div>

          {/* Editor Area */}
          <div className="lg:col-span-8">
            <Card className="border-none shadow-sm rounded-[2.5rem] bg-white overflow-hidden">
              <CardHeader className="p-10 pb-0 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-black">Edit Template</CardTitle>
                  <Badge variant="secondary" className="mt-2 bg-blue-50 text-blue-600 border-none uppercase font-black text-[10px]">
                    {selectedTool.replace(/_/g, ' ')}
                  </Badge>
                </div>
                <Button 
                  onClick={handleSave} 
                  disabled={!!saving}
                  className="bg-blue-600 hover:bg-blue-700 rounded-xl px-8 py-6 font-black shadow-lg"
                >
                  {saving === selectedTool ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                  Save Template
                </Button>
              </CardHeader>
              <CardContent className="p-10 space-y-8">
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase text-slate-400">Email Subject</Label>
                  <Input 
                    value={currentTemplate.subject} 
                    onChange={e => updateLocal('subject', e.target.value)}
                    placeholder="e.g. Welcome to the Qala Creator Collective!"
                    className="h-12 rounded-xl border-slate-100 font-bold"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase text-slate-400">Message Body</Label>
                  <Textarea 
                    value={currentTemplate.body} 
                    onChange={e => updateLocal('body', e.target.value)}
                    placeholder="Hi {{name}}, thanks for applying..."
                    className="min-h-[300px] rounded-2xl border-slate-100 leading-relaxed"
                  />
                </div>

                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-2 text-blue-600 mb-4">
                    <Code className="w-4 h-4" />
                    <span className="text-xs font-black uppercase tracking-widest">Available Variables</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['name', 'email', 'phone', 'website', 'service', 'revenue', 'budget', 'job_title'].map(v => (
                      <code key={v} className="px-2 py-1 bg-white border border-slate-200 rounded text-[10px] font-bold text-slate-600">
                        {"{{"}{v}{"}}"}
                      </code>
                    ))}
                  </div>
                  <p className="text-[10px] text-slate-400 mt-4 italic">
                    Variables are automatically replaced with the data submitted in the form.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TemplateManager;