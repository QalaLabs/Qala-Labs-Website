"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Zap } from 'lucide-react';
import AashirwadImg from '@/assets/Aashirwad.png';
import DipikaImg from '@/assets/Dipika.jpg';
import AryamanImg from '@/assets/Aryaman.png';
import ManpreetImg from '@/assets/Manpreet.png';
import AayushImg from '@/assets/Aayush.png';

interface TeamMember {
  name: string;
  role: string;
  desc: string;
  image: string;
  linkedin?: string;
  isTech?: boolean;
}

interface TeamProps {
  title?: string;
  members?: TeamMember[];
}

const defaultMembers: TeamMember[] = [
  {
    name: "Aashirwad Bhansali",
    role: "Growth & Performance Strategy",
    desc: "Data-first paid media, experiment design, and scaling playbooks for 8-figure DTC brands.",
    image: AashirwadImg,
    linkedin: "https://www.linkedin.com/in/aashirwad-bhansali/"
  },
  {
    name: "Aayush Singh",
    role: "AI and Tech Lead",
    desc: "Architecting autonomous AI agents and high-performance tech stacks for ecommerce scale.",
    image: AayushImg,
    linkedin: "https://www.linkedin.com/in/captn1107/",
    isTech: true
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
    role: "Social Media and Talent Management",
    desc: "Creator programs, UGC production, and cross-platform distribution.",
    image: AryamanImg,
    linkedin: "https://www.linkedin.com/in/aryaman-chatterjee-b8971b208/"
  },
  {
    name: "Manpreet Singh",
    role: "Visualiser",
    desc: "Visual storytelling, brand aesthetics, and high-impact design for digital-first brands.",
    image: ManpreetImg,
    linkedin: "https://www.linkedin.com/in/manpreet-singh-020549237?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
  }
];

const Team = ({ title = "The Team", members = [] }: TeamProps) => {
  // Ensure we always have the full team if the passed members list is incomplete or empty
  const displayMembers = members && members.length >= 5 ? members : defaultMembers;

  return (
    <section className="py-24 bg-white dark:bg-slate-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-sm font-black text-blue-600 uppercase tracking-[0.3em] mb-4">The Team</h2>
          <h3 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">{title}</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {displayMembers.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
              className="group"
            >
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden mb-8 shadow-2xl relative bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  width={400}
                  height={500}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out group-hover:scale-105" 
                />
                
                {member.isTech && (
                  <div className="absolute top-6 left-6 z-10">
                    <div className="bg-blue-600 text-white text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                      <Zap className="w-2 h-2 fill-current" /> AI & Tech
                    </div>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <a 
                    href={member.linkedin || "#"} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white hover:bg-blue-700 transition-all shadow-xl hover:scale-110"
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">{member.name}</h3>
                <p className="text-blue-600 dark:text-blue-400 font-black text-[9px] uppercase tracking-[0.2em]">{member.role}</p>
                <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed pt-2 border-t border-slate-100 dark:border-slate-800">{member.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;