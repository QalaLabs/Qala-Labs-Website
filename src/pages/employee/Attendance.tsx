import React from 'react';
import { Clock } from 'lucide-react';

const Attendance = () => (
  <div className="p-6 max-w-6xl mx-auto">
    <h1 className="text-2xl font-bold text-slate-900 mb-2">Attendance</h1>
    <p className="text-slate-500 mb-8">Clock in/out and view your history.</p>
    <div className="bg-white rounded-xl border border-slate-200 p-12 flex flex-col items-center text-center">
      <Clock className="w-12 h-12 text-slate-300 mb-4" />
      <h2 className="font-semibold text-slate-700 mb-1">Coming soon</h2>
      <p className="text-slate-400 text-sm">This module is being built. Check back soon.</p>
    </div>
  </div>
);

export default Attendance;
