import React from 'react';
import { useUser } from '../hooks/useUser';
import Hero from '../components/Hero';

const Dashboard = () => {
  const { user, loading } = useUser();

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  if (!user) return <div className="p-8 text-center">Please log in to view your dashboard.</div>;

  return (
    <div className="container mx-auto p-8">
      <Hero />
      <div className="mt-8 bg-white shadow-sm border border-slate-100 rounded-2xl p-8">
        <h3 className="font-bold text-2xl text-slate-900 mb-2">
          {user.first_name} {user.last_name}
        </h3>
        <p className="text-slate-500">{user.email}</p>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-1">Status</p>
            <p className="text-xl font-black text-blue-900">Active Partner</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;