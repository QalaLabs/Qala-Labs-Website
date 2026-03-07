"use client";

import React from 'react';
import { FileText, Image as ImageIcon, FileVideo, Download, Plus, Layers } from 'lucide-react';
import { Button } from "@/components/ui/button";

const assets = [
  { id: '1', name: 'Brand_Guidelines_2026.pdf', type: 'pdf', size: '4.2 MB', date: 'Oct 10' },
  { id: '2', name: 'Meta_Ad_Creative_V1.mp4', type: 'video', size: '12.8 MB', date: 'Oct 15' },
  { id: '3', name: 'Q3_Performance_Report.xlsx', type: 'sheet', size: '1.1 MB', date: 'Oct 20' },
  { id: '4', name: 'Logo_Pack_Vector.zip', type: 'archive', size: '25.4 MB', date: 'Oct 05' },
];

const AssetManager = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-black text-zinc-50 tracking-tight">Shared Intelligence</h3>
        <Button size="sm" variant="outline" className="rounded-xl gap-2 border-zinc-800 text-zinc-400 hover:bg-zinc-800">
          <Plus className="w-4 h-4" /> Upload
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {assets.map((asset) => (
          <div 
            key={asset.id}
            className="p-5 bg-zinc-900/40 backdrop-blur-xl rounded-[2rem] border border-zinc-800 flex items-center gap-5 group hover:border-indigo-500/30 hover:bg-zinc-900 transition-all duration-500"
          >
            <div className="w-14 h-14 bg-zinc-950 rounded-2xl flex items-center justify-center text-indigo-500 border border-zinc-800 shadow-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-500">
              {asset.type === 'pdf' ? <FileText className="w-6 h-6" /> : 
               asset.type === 'video' ? <FileVideo className="w-6 h-6" /> : 
               asset.type === 'archive' ? <Layers className="w-6 h-6" /> :
               <ImageIcon className="w-6 h-6" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-zinc-100 truncate group-hover:text-indigo-400 transition-colors">{asset.name}</p>
              <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest mt-1">{asset.size} • {asset.date}</p>
            </div>
            <button className="p-3 text-zinc-600 hover:text-indigo-500 bg-zinc-950/50 rounded-xl border border-zinc-800 transition-all">
              <Download className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssetManager;