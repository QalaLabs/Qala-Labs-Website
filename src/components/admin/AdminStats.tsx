"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Trophy, Briefcase, PenTool, FileText, ArrowUpRight } from 'lucide-react';

interface AdminStatsProps {
  stats: {
    caseStudies: number;
    portfolio: number;
    blogs: number;
    pages: number;
  };
}

const AdminStats = ({ stats }: AdminStatsProps) => {
  const items = [
    { label: 'Case Studies', value: stats.caseStudies, icon: Trophy, color: 'hover:bg-blue-600', textColor: 'text-blue-500', link: '/admin/case-studies' },
    { label: 'Portfolio', value: stats.portfolio, icon: Briefcase, color: 'hover:bg-purple-600', textColor: 'text-purple-500', link: '/admin/portfolio' },
    { label: 'Blog Posts', value: stats.blogs, icon: PenTool, color: 'hover:bg-amber-600', textColor: 'text-amber-500', link: '/admin/blog' },
    { label: 'CMS Pages', value: stats.pages, icon: FileText, color: 'hover:bg-slate-900', textColor: 'text-slate-500', link: '/admin/pages' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
      {items.map((item) => (
        <Card key={item.label} className="border-none shadow-sm bg-white p-6 rounded-3xl group transition-all duration-500">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white/70">{item.label}</span>
            <item.icon className={`w-4 h-4 ${item.textColor} group-hover:text-white`} />
          </div>
          <div className="text-3xl font-black text-slate-900 group-hover:text-white">{item.value}</div>
          <Link to={item.link} className={`text-[10px] font-bold ${item.textColor} group-hover:text-white/80 mt-2 flex items-center gap-1`}>
            Manage <ArrowUpRight className="w-3 h-3" />
          </Link>
          <div className={`absolute inset-0 -z-10 rounded-3xl transition-colors duration-500 ${item.color}`} />
        </Card>
      ))}
    </div>
  );
};

export default AdminStats;