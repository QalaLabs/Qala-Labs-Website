"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin } from 'lucide-react';

const Team = () => {
  const members = [
    {
      name: "Aashirwad",
      role: "Performance Marketing & Growth Strategy",
      desc: "Data-first paid media, experiment design, and scaling playbooks.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
      linkedin: "#"
    },
    {
      name: "Dipika",
      role: "Ecommerce Scaling",
      desc: "Listing optimization, retention engineering, and lifecycle flows.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
      linkedin: "#"
    },
    {
      name: "Aryaman",
      role: "Creator & Creative Management",
      desc: "Creator programs, UGC production, and cross-platform distribution.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
      linkedin: "#"
    }
  ];

  return (
    <section className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-7xl font-extrabold text-zinc-50 tracking-tight">The Team</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-12">
          {members.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group"
            >
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden mb-10 shadow-2xl relative border border-zinc-800">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-10">
                  <a href={member.linkedin} className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white hover:bg-indigo-700 transition-all shadow-xl">
                    <Linkedin className="w-7 h-7" />
                  </a>
                </div>
              </div>
              <h3 className="text-2xl font-black text-zinc-50 mb-3 tracking-tight">{member.name}</h3>
              <p className="text-indigo-500 font-bold text-sm mb-6 uppercase tracking-widest leading-none">{member.role}</p>
              <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">{member.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;