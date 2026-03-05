"use client";

import React from 'react';
import { 
  Type, Image as ImageIcon, Video, Youtube, Instagram, 
  Layout, Users, HelpCircle, MousePointer2, BarChart3 
} from 'lucide-react';
import { BlockType } from '@/types/editor';

interface BlockPickerProps {
  onSelect: (type: BlockType) => void;
}

const blockOptions = [
  { type: 'hero', label: 'Hero Section', icon: Layout, category: 'Layout' },
  { type: 'rich_text', label: 'Rich Text', icon: Type, category: 'Content' },
  { type: 'image', label: 'Single Image', icon: ImageIcon, category: 'Media' },
  { type: 'video_upload', label: 'Video Upload', icon: Video, category: 'Media' },
  { type: 'youtube_embed', label: 'YouTube Embed', icon: Youtube, category: 'Embeds' },
  { type: 'instagram_embed', label: 'Instagram Embed', icon: Instagram, category: 'Embeds' },
  { type: 'kpi_grid', label: 'KPI Grid', icon: BarChart3, category: 'Data' },
  { type: 'team_grid', label: 'Team Grid', icon: Users, category: 'Data' },
  { type: 'faq', label: 'FAQ Accordion', icon: HelpCircle, category: 'Content' },
  { type: 'cta', label: 'Call to Action', icon: MousePointer2, category: 'Layout' },
];

const BlockPicker = ({ onSelect }: BlockPickerProps) => {
  return (
    <div className="grid grid-cols-2 gap-3 p-4">
      {blockOptions.map((option) => (
        <button
          key={option.type}
          onClick={() => onSelect(option.type as BlockType)}
          className="flex flex-col items-center justify-center p-4 bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-200 rounded-2xl transition-all group"
        >
          <option.icon className="w-6 h-6 text-slate-400 group-hover:text-blue-600 mb-2" />
          <span className="text-xs font-bold text-slate-600 group-hover:text-blue-700">{option.label}</span>
        </button>
      ))}
    </div>
  );
};

export default BlockPicker;