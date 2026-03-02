import * as React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';
import { motion } from "framer-motion";
import { Target, Users, Zap, ShieldCheck } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <SEO title="Our Story" description="Learn about the team behind the scale engines." />
      <Navbar />
      
      <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight">
            We Build <span className="text-blue-600">Scale Engines.</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Qala Labs was founded on a simple premise: performance marketing is broken. We moved away from the "agency" model to become a growth partner that builds the technical and creative infrastructure required for 8-figure dominance.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-32">
          <div className="bg-white p-12 rounded-[3rem] shadow-xl border border-slate-100">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Mission</h2>
            <p className="text-slate-600 leading-relaxed mb-8">
              To empower the next generation of DTC brands with the data, creative, and technology they need to out-compete legacy giants. We don't just run ads; we build moats.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <Target className="w-6 h-6 text-blue-600" />
                <span className="font-bold text-slate-900">Data-First</span>
              </div>
              <div className="flex items-center gap-3">
                <Zap className="w-6 h-6 text-blue-600" />
                <span className="font-bold text-slate-900">High Velocity</span>
              </div>
            </div>
          </div>
          <div className="bg-slate-900 p-12 rounded-[3rem] shadow-xl text-white">
            <h2 className="text-3xl font-bold mb-6">Our Values</h2>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <ShieldCheck className="w-6 h-6 text-blue-500 shrink-0" />
                <div>
                  <h4 className="font-bold">Radical Transparency</h4>
                  <p className="text-slate-400 text-sm">No hidden fees, no vanity metrics. Just the truth about your unit economics.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Users className="w-6 h-6 text-blue-500 shrink-0" />
                <div>
                  <h4 className="font-bold">Partner Alignment</h4>
                  <p className="text-slate-400 text-sm">We only win when you win. Our success is tied directly to your revenue growth.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-4xl font-black text-slate-900 mb-12">The Leadership Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Alex Rivera", role: "Founder & Strategy", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" },
              { name: "Sarah Chen", role: "Head of Creative", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400" },
              { name: "Marcus Thorne", role: "Head of Tech", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400" }
            ].map((member, i) => (
              <div key={i} className="group">
                <div className="aspect-square rounded-[2.5rem] overflow-hidden mb-6 shadow-lg">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h4 className="text-xl font-bold text-slate-900">{member.name}</h4>
                <p className="text-blue-600 font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;