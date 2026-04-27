import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, FileText, Image, Settings, Briefcase,
  BookOpen, FolderOpen, Users, Plug, Contact, ChevronRight,
} from 'lucide-react';

const links = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/admin/users', icon: Users, label: 'User Management' },
  { to: '/admin/crm', icon: Contact, label: 'CRM' },
  { to: '/admin/integrations', icon: Plug, label: 'Integrations' },
  { label: 'CMS', divider: true },
  { to: '/admin/pages', icon: FileText, label: 'Pages' },
  { to: '/admin/blog', icon: BookOpen, label: 'Blog' },
  { to: '/admin/case-studies', icon: Briefcase, label: 'Case Studies' },
  { to: '/admin/portfolio', icon: FolderOpen, label: 'Portfolio' },
  { to: '/admin/media', icon: Image, label: 'Media' },
  { to: '/admin/settings', icon: Settings, label: 'Settings' },
];

interface Props { collapsed: boolean }

const AdminSidebarNav = ({ collapsed }: Props) => (
  <ul className="space-y-1 px-2">
    {links.map((item, i) => {
      if (item.divider) {
        return !collapsed ? (
          <li key={i} className="pt-4 pb-1 px-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">{item.label}</span>
          </li>
        ) : <li key={i} className="py-2"><div className="border-t border-slate-700" /></li>;
      }
      const Icon = item.icon!;
      return (
        <li key={item.to}>
          <NavLink
            to={item.to!}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-700 hover:text-white'
              } ${collapsed ? 'justify-center' : ''}`
            }
            title={collapsed ? item.label : undefined}
          >
            <Icon className="w-4 h-4 flex-shrink-0" />
            {!collapsed && <span className="truncate">{item.label}</span>}
          </NavLink>
        </li>
      );
    })}
  </ul>
);

export default AdminSidebarNav;
