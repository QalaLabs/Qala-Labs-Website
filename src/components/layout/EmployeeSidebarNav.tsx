import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Contact, TrendingUp, FileText, Mail,
  CheckSquare, MessageSquare, GitBranch, Calendar, Kanban,
  GanttChart, Clock, Plane,
} from 'lucide-react';

const links = [
  { to: '/employee', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { label: 'CRM', divider: true },
  { to: '/employee/contacts', icon: Contact, label: 'Contacts' },
  { to: '/employee/deals', icon: TrendingUp, label: 'Deals' },
  { to: '/employee/pipeline', icon: GitBranch, label: 'Pipeline' },
  { label: 'Work', divider: true },
  { to: '/employee/tasks', icon: CheckSquare, label: 'Tasks' },
  { to: '/employee/kanban', icon: Kanban, label: 'Scrum Board' },
  { to: '/employee/gantt', icon: GanttChart, label: 'Gantt' },
  { to: '/employee/calendar', icon: Calendar, label: 'Calendar' },
  { label: 'Communication', divider: true },
  { to: '/employee/chat', icon: MessageSquare, label: 'Chat' },
  { to: '/employee/email', icon: Mail, label: 'Email' },
  { label: 'Finance', divider: true },
  { to: '/employee/invoices', icon: FileText, label: 'Invoices' },
  { label: 'HR', divider: true },
  { to: '/employee/attendance', icon: Clock, label: 'Attendance' },
  { to: '/employee/leave', icon: Plane, label: 'Leave' },
];

interface Props { collapsed: boolean }

const EmployeeSidebarNav = ({ collapsed }: Props) => (
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

export default EmployeeSidebarNav;
