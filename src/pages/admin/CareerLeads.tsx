"use client";

import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { 
  Search, Mail, ExternalLink, UserCheck, 
  Loader2, RefreshCcw, Trash2, Briefcase,
  FileText, MessageSquare, Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { showSuccess, showError } from '@/utils/toast';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const CareerLeads = () => {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLead, setSelectedLead] = useState<any>(null);

  const fetchLeads = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .eq('tool_used', 'career_application')
      .order('created_at', { ascending: false });
    
    if (error) showError("Failed to fetch applications");
    else setLeads(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const deleteLead = async (id: string) => {
    if (!confirm("Are you sure you want to delete this application?")) return;
    const { error } = await supabase.from('leads').delete().eq('id', id);
    if (error) showError("Failed to delete");
    else {
      showSuccess("Deleted successfully");
      fetchLeads();
    }
  };

  const filtered = leads.filter(l => 
    (l.data?.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (l.data?.job_title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AdminSidebar />
      <main className="flex-1 p-10">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Career Leads</h1>
            <p className="text-slate-500">Review and manage job applications from the scale engine.</p>
          </div>
          <Button onClick={fetchLeads} variant="outline" className="rounded-xl h-12 px-6">
            <RefreshCcw className={cn("w-4 h-4 mr-2", loading && "animate-spin")} />
            Refresh
          </Button>
        </header>

        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                placeholder="Search by name, role or email..." 
                className="pl-12 h-12 rounded-xl border-slate-100"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                <tr>
                  <th className="px-8 py-4">Candidate</th>
                  <th className="px-8 py-4">Applied For</th>
                  <th className="px-8 py-4">Portfolio</th>
                  <th className="px-8 py-4">Date</th>
                  <th className="px-8 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer" onClick={() => setSelectedLead(lead)}>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900">{lead.data?.name || 'Anonymous'}</span>
                        <span className="text-xs text-slate-400">{lead.email}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-none font-bold">
                        {lead.data?.job_title || 'General'}
                      </Badge>
                    </td>
                    <td className="px-8 py-6">
                      {lead.data?.portfolio ? (
                        <a 
                          href={lead.data.portfolio} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-blue-600 hover:underline flex items-center gap-1 text-sm font-bold"
                        >
                          View Work <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="text-slate-300 text-xs italic">Not provided</span>
                      )}
                    </td>
                    <td className="px-8 py-6 text-sm text-slate-500">
                      {format(new Date(lead.created_at), 'MMM dd, yyyy')}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="text-red-500" onClick={(e) => { e.stopPropagation(); deleteLead(lead.id); }}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && !loading && (
                  <tr>
                    <td colSpan={5} className="px-8 py-32 text-center">
                      <UserCheck className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                      <h3 className="text-lg font-bold text-slate-900">No applications found</h3>
                      <p className="text-slate-500 text-sm">New candidates will appear here once they apply.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Application Detail Modal */}
        <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
          <DialogContent className="max-w-2xl bg-white rounded-[3rem] p-10">
            {selectedLead && (
              <div className="space-y-8">
                <DialogHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge className="bg-blue-600 mb-2">Application Details</Badge>
                      <DialogTitle className="text-3xl font-black text-slate-900">
                        {selectedLead.data?.name}
                      </DialogTitle>
                      <p className="text-slate-500">{selectedLead.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Applied On</p>
                      <p className="font-bold text-slate-900">{format(new Date(selectedLead.created_at), 'MMM dd, yyyy')}</p>
                    </div>
                  </div>
                </DialogHeader>

                <div className="grid grid-cols-2 gap-6">
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-2 flex items-center gap-2">
                      <Briefcase className="w-3 h-3" /> Target Role
                    </p>
                    <p className="font-bold text-slate-900">{selectedLead.data?.job_title}</p>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-2 flex items-center gap-2">
                      <FileText className="w-3 h-3" /> Portfolio
                    </p>
                    {selectedLead.data?.portfolio ? (
                      <a href={selectedLead.data.portfolio} target="_blank" rel="noopener noreferrer" className="font-bold text-blue-600 hover:underline truncate block">
                        {selectedLead.data.portfolio}
                      </a>
                    ) : <p className="text-slate-400 italic">None</p>}
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                    <MessageSquare className="w-3 h-3" /> Why Qala Labs?
                  </p>
                  <div className="p-8 bg-white rounded-3xl border border-slate-100 text-slate-600 leading-relaxed italic">
                    "{selectedLead.data?.message || 'No message provided.'}"
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700 h-14 rounded-2xl font-black" asChild>
                    <a href={`mailto:${selectedLead.email}`}>
                      <Mail className="w-5 h-5 mr-2" /> Contact Candidate
                    </a>
                  </Button>
                  <Button variant="outline" className="h-14 px-8 rounded-2xl font-bold border-slate-200" onClick={() => setSelectedLead(null)}>
                    Close
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default CareerLeads;