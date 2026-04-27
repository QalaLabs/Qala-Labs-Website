import React from 'react';
import { FolderKanban } from 'lucide-react';

const ClientProjects = () => (
  <div className="p-6 max-w-5xl mx-auto">
    <h1 className="text-2xl font-bold text-slate-900 mb-2">My Projects</h1>
    <p className="text-slate-500 mb-8">Track progress and milestones for your active projects.</p>
    <div className="bg-white rounded-xl border border-slate-200 p-12 flex flex-col items-center text-center">
      <FolderKanban className="w-12 h-12 text-slate-300 mb-4" />
      <h2 className="font-semibold text-slate-700 mb-1">No projects yet</h2>
      <p className="text-slate-400 text-sm">Your account manager will add your projects here.</p>
    </div>
  </div>
);

export default ClientProjects;
