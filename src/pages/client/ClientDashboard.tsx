import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { FolderKanban, MessageSquare, CheckCircle2 } from 'lucide-react';

const ClientDashboard = () => {
  const { profile } = useAuth();

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Welcome back, {profile?.first_name ?? 'there'} 👋
        </h1>
        <p className="text-slate-500 mt-1">Here's an overview of your projects and updates.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { icon: FolderKanban, label: 'Active Projects', value: '—', color: 'bg-blue-50 text-blue-600' },
          { icon: CheckCircle2, label: 'Completed Milestones', value: '—', color: 'bg-green-50 text-green-600' },
          { icon: MessageSquare, label: 'Unread Messages', value: '—', color: 'bg-purple-50 text-purple-600' },
        ].map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="bg-white rounded-xl border border-slate-200 p-5 flex items-center gap-4">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500">{label}</p>
              <p className="text-xl font-bold text-slate-900">{value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="font-semibold text-slate-800 mb-4">Recent Activity</h2>
        <p className="text-slate-400 text-sm">No recent activity yet. Your project updates will appear here.</p>
      </div>
    </div>
  );
};

export default ClientDashboard;
