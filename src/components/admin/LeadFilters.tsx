"use client";

import React from 'react';
import { Search, FilterX } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface LeadFiltersProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  filterService: string;
  setFilterService: (val: string) => void;
  filterScore: string;
  setFilterScore: (val: string) => void;
  dateRange: { start: string; end: string };
  setDateRange: (val: any) => void;
  clearFilters: () => void;
  services: string[];
}

const LeadFilters = ({
  searchTerm, setSearchTerm,
  filterService, setFilterService,
  filterScore, setFilterScore,
  dateRange, setDateRange,
  clearFilters, services
}: LeadFiltersProps) => {
  return (
    <div className="p-8 border-b border-slate-50 space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input 
            placeholder="Search prospects..." 
            className="pl-10 h-12 rounded-xl" 
            value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)} 
          />
        </div>
        <Button variant="ghost" size="sm" onClick={clearFilters} className="text-slate-400 hover:text-blue-600 font-bold">
          <FilterX className="w-4 h-4 mr-2" /> Clear Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-1">
          <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">Source/Interest</Label>
          <select 
            className="w-full h-11 px-4 rounded-xl border border-slate-100 bg-slate-50 text-xs font-bold outline-none focus:ring-2 focus:ring-blue-600/20" 
            value={filterService} 
            onChange={e => setFilterService(e.target.value)}
          >
            <option value="all">All Sources</option>
            {services.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="space-y-1">
          <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">Lead Score</Label>
          <select 
            className="w-full h-11 px-4 rounded-xl border border-slate-100 bg-slate-50 text-xs font-bold outline-none focus:ring-2 focus:ring-blue-600/20" 
            value={filterScore} 
            onChange={e => setFilterScore(e.target.value)}
          >
            <option value="all">All Scores</option>
            <option value="high">High (50+)</option>
            <option value="medium">Medium (30-50)</option>
            <option value="low">{"Low (<30)"}</option>
          </select>
        </div>
        <div className="space-y-1">
          <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">From Date</Label>
          <Input 
            type="date" 
            className="h-11 rounded-xl border border-slate-100 bg-slate-50 text-xs" 
            value={dateRange.start} 
            onChange={e => setDateRange({...dateRange, start: e.target.value})} 
          />
        </div>
        <div className="space-y-1">
          <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">To Date</Label>
          <Input 
            type="date" 
            className="h-11 rounded-xl border border-slate-100 bg-slate-50 text-xs" 
            value={dateRange.end} 
            onChange={e => setDateRange({...dateRange, end: e.target.value})} 
          />
        </div>
      </div>
    </div>
  );
};

export default LeadFilters;