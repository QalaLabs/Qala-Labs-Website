import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import AdminSidebarNav from './AdminSidebarNav';
import EmployeeSidebarNav from './EmployeeSidebarNav';
import ClientSidebarNav from './ClientSidebarNav';

const SidebarMap = {
  admin: AdminSidebarNav,
  employee: EmployeeSidebarNav,
  client: ClientSidebarNav,
} as const;

const PortalLayout = () => {
  const { profile, role, signOut } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const SidebarNav = role ? SidebarMap[role] : null;

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:relative z-30 h-full bg-slate-900 text-white flex flex-col transition-all duration-300
          ${collapsed ? 'w-16' : 'w-64'}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo area */}
        <div className="flex items-center justify-between px-4 h-16 border-b border-slate-700 flex-shrink-0">
          {!collapsed && (
            <span className="font-bold text-white text-sm tracking-wide">Qala Labs</span>
          )}
          <button
            onClick={() => setCollapsed(c => !c)}
            className="hidden lg:flex items-center justify-center w-8 h-8 rounded-md hover:bg-slate-700 transition-colors ml-auto"
          >
            <Menu className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden flex items-center justify-center w-8 h-8 rounded-md hover:bg-slate-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          {SidebarNav && <SidebarNav collapsed={collapsed} />}
        </nav>

        {/* User footer */}
        <div className={`border-t border-slate-700 p-4 flex items-center gap-3 flex-shrink-0 ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
            {profile?.first_name?.[0]?.toUpperCase() ?? '?'}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white truncate">
                {profile?.first_name} {profile?.last_name}
              </p>
              <button
                onClick={signOut}
                className="text-xs text-slate-400 hover:text-white transition-colors"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile topbar */}
        <header className="lg:hidden flex items-center gap-4 px-4 h-16 bg-white border-b border-slate-200 flex-shrink-0">
          <button
            onClick={() => setMobileOpen(true)}
            className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-slate-100"
          >
            <Menu className="w-5 h-5 text-slate-600" />
          </button>
          <span className="font-semibold text-slate-800 text-sm">Qala Labs</span>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PortalLayout;
