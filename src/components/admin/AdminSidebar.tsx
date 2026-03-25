"use client";

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Settings, 
  LogOut, 
  Briefcase,
  Trophy,
  PenTool,
  Globe,
  Palette,
  Zap,
  Files,
  Mail,
  UserCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from '@/components/layout/Logo';
import { useAuth } from '@/context/AuthContext';

const AdminSidebar = () => {
  const location = useLocation();
  const { signOut } = useAuth();
  
  const navItems = [
    { icon: LayoutDashboard, label: 'CRM Dashboard', href: '/admin' },
    { icon: UserCheck, label: 'Career Leads', href: '/admin/careers' },
    { icon: Files, label: 'Page Manager', href: '/admin/pages' },
    { icon: Mail, label: 'Email Templates', href: '/admin/templates' },
    { icon: Palette, label: 'Site & Branding', href: '/admin/site-management' },
    { icon: Zap, label: 'Integrations', href: '/admin/settings' },
    { icon: Trophy, label: 'Case Studies', href: '/admin/case-studies' },
    { icon: Briefcase, label: 'Portfolio', href: '/admin/portfolio' },
    { icon: PenTool, label: 'Blog Posts', href: '/admin/blog' },
  ];

  return (
    <aside className="w-64 bg-[#0f172a] text-white flex flex-col h-screen sticky top-0 shrink-0 z-50">
      <div className="p-8 mb-4">
        <Logo variant="white" className="scale-110 origin-left" />
      </div>
      
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        <p className="px-4 mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Core Management</p>
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
          <Globe className="w-4 h-4" /> View Live Site
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