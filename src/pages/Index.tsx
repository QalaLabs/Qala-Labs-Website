import React from 'react';
import { useUser } from '../hooks/useUser';
import Hero from '../components/Hero';

const Index = () => {
  const { user, loading } = useUser();

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  if (!user) {
    return (
      <div className="container mx-auto p-8 text-center">
        <Hero />
        <div className="mt-8">
          <p className="text-slate-600 mb-4">Please log in to access your dashboard.</p>
          <a 
            href="/login" 
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors"
          >
            Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <Hero />
      <div className="mt-8 p-6 bg-white rounded-xl shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Welcome back!</h2>
        <p className="text-slate-600">Your growth data and insights will be displayed here.</p>
      </div>
    </div>
  );
};

export default Index;