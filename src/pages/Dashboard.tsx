"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { useUser } from '@/hooks/useUser';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigate } from 'react-router-dom';
import { Loader2, TrendingUp, Users, Target, MessageSquare, Bell, IndianRupee } from 'lucide-react';
import ProjectTimeline from '@/components/dashboard/ProjectTimeline';
import TaskBoard from '@/components/dashboard/TaskBoard';
import AssetManager from '@/components/dashboard/AssetManager';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <Navbar />
      <div className="pt-48 pb-32 px-6 max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16"
        >
          <div>
            <div className="flex items-center gap-4 mb-3">
              <h1 className="text-4xl font-black text-zinc-50 tracking-tight">Welcome back, {user.first_name || 'Partner'}</h1>
              <Badge className="bg-indigo-600 text-white border-none px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Active Scale Engine</Badge>
            </div>
            <p className="text-zinc-400 text-lg">Your brand's performance metrics and growth roadmap at a glance.</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="rounded-2xl h-14 px-8 border-zinc-800 text-zinc-400 hover:bg-zinc-900 gap-3 font-bold">
              <MessageSquare className="w-5 h-5 text-indigo-500" /> Support
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-2xl h-14 px-8 text-white gap-3 font-black shadow-xl shadow-indigo-500/20">
              <Bell className="w-5 h-5" /> Notifications
            </Button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
            <Card className="bg-zinc-900/40 backdrop-blur-xl border-zinc-800 shadow-2xl rounded-[3rem] overflow-hidden group hover:border-indigo-500/30 transition-all duration-500">
              <CardHeader className="flex flex-row items-center justify-between p-10 pb-4">
                <CardTitle className="text-xs font-black text-zinc-500 uppercase tracking-widest">Total Managed Revenue</CardTitle>
                <div className="p-3 bg-zinc-950 rounded-2xl border border-zinc-800 text-indigo-500 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-500">
                  <IndianRupee className="w-5 h-5" />
                </div>
              </CardHeader>
              <CardContent className="p-10 pt-0">
                <div className="text-5xl font-black text-zinc-50 tracking-tighter">₹12,45,000</div>
                <div className="flex items-center gap-2 mt-4">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-500 font-black">+12.5% vs last month</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
            <Card className="bg-zinc-900/40 backdrop-blur-xl border-zinc-800 shadow-2xl rounded-[3rem] overflow-hidden group hover:border-indigo-500/30 transition-all duration-500">
              <CardHeader className="flex flex-row items-center justify-between p-10 pb-4">
                <CardTitle className="text-xs font-black text-zinc-500 uppercase tracking-widest">New Leads (24h)</CardTitle>
                <div className="p-3 bg-zinc-950 rounded-2xl border border-zinc-800 text-indigo-500 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-500">
                  <Users className="w-5 h-5" />
                </div>
              </CardHeader>
              <CardContent className="p-10 pt-0">
                <div className="text-5xl font-black text-zinc-50 tracking-tighter">48</div>
                <div className="flex items-center gap-2 mt-4 text-zinc-500">
                  <span className="text-sm font-bold">+4 arriving within last hour</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
            <Card className="bg-zinc-900/40 backdrop-blur-xl border-zinc-800 shadow-2xl rounded-[3rem] overflow-hidden group hover:border-indigo-500/30 transition-all duration-500">
              <CardHeader className="flex flex-row items-center justify-between p-10 pb-4">
                <CardTitle className="text-xs font-black text-zinc-500 uppercase tracking-widest">Average Account ROAS</CardTitle>
                <div className="p-3 bg-zinc-950 rounded-2xl border border-zinc-800 text-indigo-500 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-500">
                  <Target className="w-5 h-5" />
                </div>
              </CardHeader>
              <CardContent className="p-10 pt-0">
                <div className="text-5xl font-black text-zinc-50 tracking-tighter">4.2x</div>
                <div className="flex items-center gap-2 mt-4 text-indigo-400">
                  <span className="text-sm font-black">Target Benchmark: 4.0x</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column: Roadmap & Tasks */}
          <div className="lg:col-span-2 space-y-12">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <Card className="bg-zinc-900/40 backdrop-blur-xl border-zinc-800 shadow-2xl p-12 rounded-[4rem] border border-zinc-800">
                <ProjectTimeline />
              </Card>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
              <Card className="bg-zinc-900/40 backdrop-blur-xl border-zinc-800 shadow-2xl p-12 rounded-[4rem] border border-zinc-800">
                <TaskBoard />
              </Card>
            </motion.div>
          </div>

          {/* Right Column: Assets & Activity */}
          <div className="space-y-12">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <Card className="bg-zinc-900/40 backdrop-blur-xl border-zinc-800 shadow-2xl p-10 rounded-[3.5rem] border border-zinc-800">
                <AssetManager />
              </Card>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
              <Card className="bg-zinc-900/40 backdrop-blur-xl border-zinc-800 shadow-2xl p-10 rounded-[3.5rem] border border-zinc-800">
                <h3 className="text-xl font-black text-zinc-50 mb-10 tracking-tight">Recent Intelligence</h3>
                <div className="space-y-8">
                  {[
                    { text: 'High-velocity creative uploaded for Meta V3', time: '2 hours ago', icon: 'zap' },
                    { text: 'Weekly strategy sprint call scheduled', time: '5 hours ago', icon: 'calendar' },
                    { text: 'Server-side GTM tracking verified', time: '1 day ago', icon: 'shield' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-5 group">
                      <div className="w-10 h-10 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-indigo-500 shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                        <div className="w-1.5 h-1.5 rounded-full bg-current" />
                      </div>
                      <div>
                        <p className="text-sm text-zinc-100 font-bold leading-snug group-hover:text-indigo-400 transition-colors">{item.text}</p>
                        <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest mt-1.5">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-indigo-600/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[150px]" />
      </div>
    </div>
  );
};

export default Dashboard;