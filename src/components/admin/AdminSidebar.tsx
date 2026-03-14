"use client";

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Image as ImageIcon, 
  Settings, 
  LogOut, 
  BookOpen,
  Briefcase,
  Trophy,
  PenTool,
  Globe,
  Users,
  MessageSquare
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from '@/components/layout/Logo';
import { useAuth } from '@/context/AuthContext';

const AdminSidebar = () => {
  const location = useLocation();
  const { signOut } = useAuth();
  
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
    { icon: MessageSquare, label: 'Leads', href: '/admin' }, // Reusing Admin for CRM
    { icon: Trophy, label: 'Case Studies', href: '/admin/case-studies' },
    { icon: Briefcase, label: 'Portfolio', href: '/admin/portfolio' },
    { icon: PenTool, label: 'Blog Posts', href: '/admin/blog' },
    { icon: ImageIcon, label: 'Media Library', href: '/admin/media' },
    { icon: Globe, label: 'Site Management', href: '/admin/site-management' },
    { icon: Settings, label: 'Settings', href: '/admin/settings' },
  ];

  return (
    <aside className="w-64 bg-[#1a1f2e] text-white flex flex-col h-screen sticky top-0 shrink-0 z-50">
      <div className="p-8 mb-4">
        <Logo variant="white" className="scale-110 origin-left" />
      </div>
      
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300",
              location.pathname === item.href 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                : "text-slate-400 hover:text-white hover:bg-white/5"
            )}
          >
            <item.icon className={cn("w-5 h-5", location.pathname === item.href ? "text-white" : "text-slate-500")} />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-6 border-t border-white/5 space-y-4">
        <Link to="/" className="flex items-center gap-3 px-4 py-2 text-xs font-bold text-slate-500 hover:text-white transition-colors">
          <Globe className="w-4 h-4" /> Back to Main Site
        </Link>
        <button 
          onClick={() => signOut()}
          className="flex items-center gap-3 px-4 py-3 w-full text-sm font-bold text-red-400 hover:bg-red-900/20 rounded-xl transition-all"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;