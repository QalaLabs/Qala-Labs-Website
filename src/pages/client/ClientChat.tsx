import React from 'react';
import { MessageSquare } from 'lucide-react';

const ClientChat = () => (
  <div className="p-6 max-w-5xl mx-auto">
    <h1 className="text-2xl font-bold text-slate-900 mb-2">Chat</h1>
    <p className="text-slate-500 mb-8">Message your account manager directly.</p>
    <div className="bg-white rounded-xl border border-slate-200 p-12 flex flex-col items-center text-center">
      <MessageSquare className="w-12 h-12 text-slate-300 mb-4" />
      <h2 className="font-semibold text-slate-700 mb-1">Chat coming soon</h2>
      <p className="text-slate-400 text-sm">Real-time messaging with your account manager will be set up here.</p>
    </div>
  </div>
);

export default ClientChat;
