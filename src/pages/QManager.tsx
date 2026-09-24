"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import {
  ArrowRight, Smartphone, Monitor, LayoutDashboard, CheckCircle2,
  BarChart3, ListChecks, FolderOpen, Bell, MessageSquare, ShieldCheck,
  Mail, FileText, Zap, Users, Clock, Wifi
} from 'lucide-react';

const onboardingSteps = [
  {
    day: 'Day 0',
    title: 'Welcome & Access Granted',
    desc: "Within hours of signing, you get your Q Manager login. We kick off the deep-dive audit of your accounts, tracking, and unit economics.",
    icon: Mail,
  },
  {
    day: 'Day 1',
    title: 'Assets & Brand DNA',
    desc: 'Upload your logo pack, brand guidelines, and raw footage directly into Q Manager\'s Asset Manager — no email threads, no lost files.',
    icon: FileText,
  },
  {
    day: 'Day 3',
    title: 'Strategy Locked & Live',
    desc: 'Your custom roadmap lands in the Project Timeline. Every workstream, deadline, and owner is visible from day one.',
    icon: Zap,
  },
  {
    day: 'Week 1+',
    title: 'Full Visibility, Every Day',
    desc: 'Revenue charts, task boards, and approvals update in real time — on your desktop at your desk, or your phone anywhere else.',
    icon: BarChart3,
  },
];

const features = [
  {
    icon: BarChart3,
    title: 'Live Revenue Dashboard',
    desc: 'Spend, CPA, and ROAS updated continuously — not a monthly PDF you have to chase us for.',
  },
  {
    icon: ListChecks,
    title: 'Project Timeline & Task Board',
    desc: 'Every workstream broken into stages and tasks, with clear owners and dates — you always know what happens next.',
  },
  {
    icon: FolderOpen,
    title: 'Asset Manager',
    desc: 'One shared library for creative, brand assets, and raw footage — versioned, searchable, and never lost in a DM.',
  },
  {
    icon: Bell,
    title: 'Real-Time Notifications',
    desc: 'Approvals, deliverables, and flags land instantly — push notifications on mobile, alerts on desktop.',
  },
  {
    icon: MessageSquare,
    title: 'Direct Support Channel',
    desc: 'Message your account team straight from the dashboard. No separate Slack invite, no lost context.',
  },
  {
    icon: ShieldCheck,
    title: 'Role-Based Access',
    desc: 'Bring your whole team in — founders, marketing leads, and finance each see exactly what they need to.',
  },
];

const QManager = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Q Manager — Your Entire Engagement, From Desktop or Mobile | Qala Labs"
        description="Q Manager is Qala Labs' client command centre — live revenue dashboards, project timelines, asset management, and real-time approvals, available from desktop or the mobile app."
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Q Manager', url: '/q-manager' },
        ]}
      />
      <Navbar />

      {/* Hero */}
      <section className="pt-36 pb-24 bg-[#06070D] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-[#06070D] to-blue-950/20" />
        <div className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-blue-600/4 rounded-full blur-[150px]" />

        <div className="max-w-7xl mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-600/15 border border-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-widest mb-8"
            >
              <LayoutDashboard className="w-3.5 h-3.5" /> Agency Onboarding & Working
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tight leading-[1.05]"
            >
              Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Q Manager.</span>
              <br />
              Your engagement, in your pocket.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-400 max-w-xl mb-10 leading-relaxed"
            >
              No more chasing a monthly report or a lost Slack thread. Every dashboard, timeline, asset, and approval we run for you lives in one place — open it from your desktop at work, or your phone from anywhere.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black text-lg transition-colors shadow-xl shadow-blue-500/20 group"
              >
                Start Onboarding <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 border border-white/10 text-slate-300 hover:text-white hover:border-white/30 px-8 py-4 rounded-2xl font-black text-lg transition-colors"
              >
                Client Login
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-6 mt-10 text-slate-500 text-xs font-bold uppercase tracking-widest"
            >
              <span className="flex items-center gap-2"><Monitor className="w-4 h-4" /> Desktop</span>
              <span className="flex items-center gap-2"><Smartphone className="w-4 h-4" /> iOS & Android</span>
              <span className="flex items-center gap-2"><Wifi className="w-4 h-4" /> Real-time sync</span>
            </motion.div>
          </div>

          {/* Device mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative flex items-center justify-center gap-6"
          >
            {/* Desktop frame */}
            <div className="hidden sm:block w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-3 shadow-2xl">
              <div className="flex items-center gap-1.5 mb-3 px-1">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
              </div>
              <div className="bg-slate-950 rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white text-xs font-black">Q Manager</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/15 text-green-400 font-bold">Live</span>
                </div>
                <div className="h-16 rounded-lg bg-gradient-to-r from-blue-600/30 to-cyan-500/10 flex items-end p-2 gap-1">
                  {[40, 65, 50, 80, 60, 95, 75].map((h, i) => (
                    <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-blue-400/70 rounded-sm" />
                  ))}
                </div>
                <div className="space-y-1.5">
                  <div className="h-2 bg-white/10 rounded-full w-full" />
                  <div className="h-2 bg-white/10 rounded-full w-4/5" />
                  <div className="h-2 bg-white/10 rounded-full w-3/5" />
                </div>
              </div>
            </div>

            {/* Phone frame */}
            <div className="w-40 bg-white/5 border border-white/10 rounded-[2rem] p-2 shadow-2xl -ml-16 sm:-ml-24 z-10">
              <div className="bg-slate-950 rounded-[1.6rem] overflow-hidden">
                <div className="h-4 flex items-center justify-center">
                  <div className="w-12 h-2.5 bg-black rounded-full" />
                </div>
                <div className="p-3 space-y-2.5 pb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-white text-[10px] font-black">Dashboard</span>
                    <Bell className="w-3 h-3 text-blue-400" />
                  </div>
                  <div className="h-10 rounded-lg bg-blue-600/20 flex items-center px-2">
                    <span className="text-blue-300 text-[9px] font-bold">ROAS 4.2x ↑</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full w-full" />
                  <div className="h-2 bg-white/10 rounded-full w-3/4" />
                  <div className="h-16 rounded-lg bg-white/5 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Onboarding timeline */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-2xl mb-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 text-blue-700 text-xs font-black uppercase tracking-widest mb-6"
            >
              <Clock className="w-3.5 h-3.5" /> Agency Onboarding
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
              Your first week, mapped out.
            </h2>
            <p className="text-xl text-slate-600">
              No guesswork about what happens after you sign. Here's exactly how you go from kickoff to a fully working Q Manager dashboard.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {onboardingSteps.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="relative p-6 bg-slate-50 border border-slate-100 rounded-3xl"
                >
                  <div className="w-11 h-11 rounded-2xl bg-blue-600/10 flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="inline-flex px-3 py-1 rounded-full bg-white text-blue-700 text-xs font-black uppercase tracking-widest mb-4">{s.day}</span>
                  <h3 className="text-lg font-black text-slate-900 mb-2.5">{s.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
                  {i < onboardingSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-11 left-full w-6 h-[2px] bg-slate-200 -ml-3" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-2xl mb-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 text-blue-400 text-xs font-black uppercase tracking-widest mb-6"
            >
              Inside Q Manager
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
              Everything you'd normally have to ask for.
            </h2>
            <p className="text-xl text-slate-400">
              We built Q Manager because clients shouldn't have to DM us for a status update. It's the same dashboard our team works out of — you just get a client-facing view of it.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-400/30 hover:bg-white/[0.07] transition-all"
                >
                  <div className="w-11 h-11 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-black text-white mb-2.5">{f.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Desktop + Mobile parity */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100"
            >
              <Monitor className="w-10 h-10 text-blue-600 mb-6" />
              <h3 className="text-2xl font-black text-slate-900 mb-3">Desktop — for deep work.</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                Full revenue charts, asset libraries, and multi-project timelines when you're at your desk and want the complete picture.
              </p>
              <ul className="space-y-2.5">
                {['Full dashboard with drill-down charts', 'Bulk asset upload & review', 'Multi-project timeline view'].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-10 rounded-[2.5rem] bg-slate-900 text-white"
            >
              <Smartphone className="w-10 h-10 text-blue-400 mb-6" />
              <h3 className="text-2xl font-black mb-3">Mobile — for staying in the loop.</h3>
              <p className="text-slate-400 leading-relaxed mb-6">
                Push notifications on approvals, quick status checks between meetings, and one-tap replies to your account team — from anywhere.
              </p>
              <ul className="space-y-2.5">
                {['Push notifications on every update', 'One-tap approvals & sign-off', 'Direct message to your account team'].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#06070D]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-blue-400 font-black uppercase tracking-widest text-xs mb-6">Get Started</p>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
              Never chase a status
              <br />update again.
            </h2>
            <p className="text-slate-400 text-lg mb-12 max-w-xl mx-auto">
              Sign on, and your Q Manager login lands in your inbox within hours. Full visibility from day one — on desktop or mobile.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl font-black text-lg transition-colors shadow-xl shadow-blue-500/20 group"
              >
                Book a Growth Audit <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/results"
                className="inline-flex items-center gap-2 border border-white/10 text-slate-300 hover:text-white hover:border-white/30 px-10 py-5 rounded-2xl font-black text-lg transition-colors"
              >
                See Client Results
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default QManager;
