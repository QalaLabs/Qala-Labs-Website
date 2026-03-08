"use client";

import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { 
  Plus, Search, Edit, Trash2, ExternalLink, 
  Trophy, Loader2, RefreshCcw, Filter 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { showSuccess, showError } from '@/utils/toast';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const CaseStudyManager = () => {
  const [studies, setStudies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const fetchStudies = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('case_studies')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) showError("Failed to fetch case studies");
    else setStudies(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchStudies();
  }, []);

  const deleteStudy = async (id: string) => {
    if (!confirm("Are you sure you want to delete this case study?")) return;
    const { error } = await supabase.from('case_studies').delete().eq('id', id);
    if (error) showError("Failed to delete");
    else {
      showSuccess("Deleted successfully");
      fetchStudies();
    }
  };

  const filtered = studies.filter(s => 
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AdminSidebar />
      <main className="flex-1 p-10">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Case Studies</h1>
            <p className="text-slate-500">Manage your 8-figure success stories.</p>
          </div>
          <Button onClick={() => navigate('/admin/case-studies/new')} className="bg-blue-600 hover:bg-blue-700 rounded-xl px-6 py-6 font-black">
            <Plus className="w-5 h-5 mr-2" /> New Case Study
          </Button>
        </header>

        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                placeholder="Search by title or category..." 
                className="pl-12 h-12 rounded-xl border-slate-100"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={fetchStudies} variant="outline" className="rounded-xl h-12 px-6">
              <RefreshCcw className={loading ? "animate-spin" : ""} />
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                <tr>
                  <th className="px-8 py-4">Case Study</th>
                  <th className="px-8 py-4">Category</th>
                  <th className="px-8 py-4">Result Headline</th>
                  <th className="px-8 py-4">Created</th>
                  <th className="px-8 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((study) => (
                  <tr key={study.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden shrink-0">
                          <img src={study.image_url || "https://via.placeholder.com/100"} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-900">{study.title}</span>
                          <span className="text-xs text-slate-400">/case-studies/{study.slug}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-none">{study.category}</Badge>
                    </td>
                    <td className="px-8 py-6 text-sm font-medium text-slate-600">
                      {study.results?.headline || "No headline"}
                    </td>
                    <td className="px-8 py-6 text-sm text-slate-500">
                      {format(new Date(study.created_at), 'MMM dd, yyyy')}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" onClick={() => navigate(`/admin/case-studies/edit/${study.id}`)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                          <a href={`/case-studies/${study.slug}`} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-500" onClick={() => deleteStudy(study.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && !loading && (
                  <tr>
                    <td colSpan={5} className="px-8 py-32 text-center">
                      <Trophy className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                      <h3 className="text-lg font-bold text-slate-900">No case studies found</h3>
                      <p className="text-slate-500 text-sm">Start by creating your first success story.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CaseStudyManager;