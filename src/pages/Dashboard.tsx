"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { useUser } from '@/hooks/useUser';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigate } from 'react-router-dom';
import { Loader2, TrendingUp, Users, Target, MessageSquare, Bell } from 'lucide-react';
import ProjectTimeline from '@/components/dashboard/ProjectTimeline';
import TaskBoard from '@/components/dashboard/TaskBoard';
import AssetManager from '@/components/dashboard/AssetManager';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-black text-slate-900">Welcome back, {user.first_name || 'Partner'}</h1>
              <Badge className="bg-green-100 text-green-700 border-none">Active Scale Engine</Badge>
            </div>
            <p className="text-slate-500">Your brand's performance and roadmap at a glance.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="rounded-xl gap-2">
              <MessageSquare className="w-4 h-4" /> Support
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 rounded-xl gap-2">
              <Bell className="w-4 h-4" /> Notifications
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <Card className="border-none shadow-sm bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-widest">Total Revenue</CardTitle>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-slate-900">₹12,45,000</div>
              <p className="text-xs text-green-500 font-bold mt-1">+12.5% from last month</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-widest">Active Leads</CardTitle>
              <Users className="w-4 h-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-slate-900">48</div>
              <p className="text-xs text-blue-500 font-bold mt-1">+4 this week</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-widest">Avg. ROAS</CardTitle>
              <Target className="w-4 h-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-slate-900">4.2x</div>
              <p className="text-xs text-slate-500 font-bold mt-1">Target: 4.0x</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Timeline & Tasks */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-none shadow-sm bg-white p-8 rounded-[2.5rem]">
              <ProjectTimeline />
            </Card>
            <Card className="border-none shadow-sm bg-white p-8 rounded-[2.5rem]">
              <TaskBoard />
            </Card>
          </div>

          {/* Right Column: Assets & Activity */}
          <div className="space-y-8">
            <Card className="border-none shadow-sm bg-white p-8 rounded-[2.5rem]">
              <AssetManager />
            </Card>
            <Card className="border-none shadow-sm bg-white p-8 rounded-[2.5rem]">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Recent Activity</h3>
              <div className="space-y-6">
                {[
                  { text: 'New creative uploaded for Meta campaign', time: '2 hours ago' },
                  { text: 'Weekly strategy call scheduled', time: '5 hours ago' },
                  { text: 'Server-side tracking verified', time: '1 day ago' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 shrink-0" />
                    <div>
                      <p className="text-sm text-slate-700 font-medium">{item.text}</p>
                      <p className="text-xs text-slate-400 mt-1">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;