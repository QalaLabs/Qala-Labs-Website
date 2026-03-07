"use client";

import React from 'react';
import { FileText, Image as ImageIcon, FileVideo, Download, MoreVertical, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";

const assets = [
  { id: '1', name: 'Brand_Guidelines_2024.pdf', type: 'pdf', size: '4.2 MB', date: 'Oct 10' },
  { id: '2', name: 'Meta_Ad_Creative_V1.mp4', type: 'video', size: '12.8 MB', date: 'Oct 15' },
  { id: '3', name: 'Q3_Performance_Report.xlsx', type: 'sheet', size: '1.1 MB', date: 'Oct 20' },
  { id: '4', name: 'Logo_Pack_HighRes.zip', type: 'archive', size: '25.4 MB', date: 'Oct 05' },
];

const AssetManager = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900">Shared Assets</h3>
        <Button size="sm" variant="outline" className="rounded-xl gap-2">
          <Plus className="w-4 h-4" /> Upload
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {assets.map((asset) => (
          <div 
            key={asset.id}
            className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4 group hover:bg-white hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
              {asset.type === 'pdf' ? <FileText className="w-6 h-6" /> : 
               asset.type === 'video' ? <FileVideo className="w-6 h-6" /> : 
               <ImageIcon className="w-6 h-6" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-900 truncate">{asset.name}</p>
              <p className="text-[10px] text-slate-400 font-medium">{asset.size} • {asset.date}</p>
            </div>
            <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
              <Download className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssetManager;