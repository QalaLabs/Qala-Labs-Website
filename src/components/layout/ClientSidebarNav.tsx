import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, MessageSquare } from 'lucide-react';

const links = [
  { to: '/client', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/client/projects', icon: FolderKanban, label: 'My Projects' },
  { to: '/client/chat', icon: MessageSquare, label: 'Chat' },
];

interface Props { collapsed: boolean }

const ClientSidebarNav = ({ collapsed }: Props) => (
  <ul className="space-y-1 px-2">
    {links.map((item) => {
      const Icon = item.icon;
      return (
        <li key={item.to}>
          <NavLink
            to={item.to}
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

export default ClientSidebarNav;
