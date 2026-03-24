"use client";

import React from 'react';
import { format } from 'date-fns';
import { Mail, MessageSquare, Briefcase, UserCheck, FilterX } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { calculateLeadScore, getLeadInterest } from '@/utils/admin';

interface LeadTableProps {
  leads: any[];
  onLeadClick: (lead: any) => void;
}

const LeadTable = ({ leads, onLeadClick }: LeadTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest">
          <tr>
            <th className="px-8 py-4">Lead</th>
            <th className="px-8 py-4">Score</th>
            <th className="px-8 py-4">Interest</th>
            <th className="px-8 py-4">Date</th>
            <th className="px-8 py-4">Status</th>
            <th className="px-8 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {leads.map((lead) => {
            const score = calculateLeadScore(lead);
            const interest = getLeadInterest(lead);
            return (
              <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer" onClick={() => onLeadClick(lead)}>
                <td className="px-8 py-6">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900">{lead.data?.name || 'Anonymous'}</span>
                    <span className="text-xs text-slate-400">{lead.email}</span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <Badge className={cn(
                    "rounded-full px-3 py-1 font-black text-[10px]",
                    score >= 50 ? "bg-green-100 text-green-700" : score >= 30 ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-500"
                  )}>
                    SCORE: {score}
                  </Badge>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2">
                    {lead.tool_used === 'agency_network_join' && <Briefcase className="w-3 h-3 text-blue-500" />}
                    {lead.tool_used === 'creator_onboarding_v2' && <UserCheck className="w-3 h-3 text-pink-500" />}
                    <span className="text-sm font-bold text-slate-600">{interest}</span>
                  </div>
                </td>
                <td className="px-8 py-6 text-xs text-slate-500 font-medium">
                  {format(new Date(lead.created_at), 'MMM dd, yyyy')}
                </td>
                <td className="px-8 py-6">
                  <Badge variant="secondary" className="uppercase font-black text-[9px] tracking-widest">{lead.data?.status || 'new'}</Badge>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="icon" variant="ghost" className="text-green-600"><MessageSquare className="w-4 h-4" /></Button>
                    <Button size="icon" variant="ghost" className="text-blue-600"><Mail className="w-4 h-4" /></Button>
                  </div>
                </td>
              </tr>
            );
          })}
          {leads.length === 0 && (
            <tr>
              <td colSpan={6} className="px-8 py-20 text-center">
                <div className="flex flex-col items-center gap-2 text-slate-400">
                  <FilterX className="w-10 h-10 opacity-20" />
                  <p className="font-bold">No leads match your current filters.</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LeadTable;