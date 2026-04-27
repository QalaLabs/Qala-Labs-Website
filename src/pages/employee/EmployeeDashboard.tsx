import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { CheckSquare, Contact, FileText, Clock } from 'lucide-react';

const EmployeeDashboard = () => {
  const { profile } = useAuth();

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Good morning, {profile?.first_name ?? 'there'} 👋
        </h1>
        <p className="text-slate-500 mt-1">Here's what's on your plate today.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { icon: CheckSquare, label: 'Open Tasks', value: '—', color: 'bg-blue-50 text-blue-600' },
          { icon: Contact, label: 'CRM Contacts', value: '—', color: 'bg-indigo-50 text-indigo-600' },
          { icon: FileText, label: 'Pending Invoices', value: '—', color: 'bg-amber-50 text-amber-600' },
          { icon: Clock, label: 'Hours Today', value: '—', color: 'bg-green-50 text-green-600' },
        ].map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="bg-white rounded-xl border border-slate-200 p-5 flex items-center gap-4">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${color}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-slate-500 truncate">{label}</p>
              <p className="text-xl font-bold text-slate-900">{value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-800 mb-4">Recent Tasks</h2>
          <p className="text-slate-400 text-sm">No tasks assigned yet.</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-800 mb-4">Upcoming Events</h2>
          <p className="text-slate-400 text-sm">No events scheduled.</p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
