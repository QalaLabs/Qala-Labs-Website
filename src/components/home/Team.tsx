"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin } from 'lucide-react';
import AashirwadImg from '@/assets/Aashirwad.jpg';
import DipikaImg from '@/assets/Dipika.jpg';
import AryamanImg from '@/assets/Aryaman.png';

interface TeamMember {
  name: string;
  role: string;
  desc: string;
  image: string;
  linkedin?: string;
}

interface TeamProps {
  title?: string;
  members?: TeamMember[];
}

const defaultMembers = [
  {
    name: "Aashirwad Bhansali",
    role: "Founder & Performance Lead",
    desc: "Data-first paid media, experiment design, and scaling playbooks for 8-figure DTC brands.",
    image: AashirwadImg,
    linkedin: "https://www.linkedin.com/in/aashirwad-bhansali/"
  },
  {
    name: "Dipika",
    role: "Ecommerce Scaling",
    desc: "Listing optimization, retention engineering, and lifecycle flows.",
    image: DipikaImg,
    linkedin: "https://www.linkedin.com/in/dipika-k-53a3bb138/"
  },
  {
    name: "Aryaman",
    role: "Creator & Creative Management",
    desc: "Creator programs, UGC production, and cross-platform distribution.",
    image: AryamanImg,
    linkedin: "https://www.linkedin.com/in/aryaman-chatterjee-b8971b208/"
  }
];

const Team = ({ title = "The Team", members = [] }: TeamProps) => {
  const displayMembers = members.length > 0 ? members : defaultMembers;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-sm font-black text-blue-600 uppercase tracking-[0.2em] mb-4">The Team</h2>
          <h3 className="text-4xl md:text-6xl font-black text-slate-900 mb-6">{title}</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {displayMembers.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-8 shadow-xl relative">
                <img 
                  src={member.image || "https://via.placeholder.com/400x500"} 
                  alt={member.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <a 
                    href={member.linkedin || "#"} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">{member.name}</h3>
              <p className="text-blue-600 font-bold text-sm mb-4">{member.role}</p>
              <p className="text-slate-500 text-sm leading-relaxed">{member.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;