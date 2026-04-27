"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin } from 'lucide-react';
import AashirwadImg from '@/assets/Aashirwad.png';
import AayushImg from '@/assets/Aayush.png';
import DipikaImg from '@/assets/Dipika.jpg';
import AryamanImg from '@/assets/Aryaman.png';
import ManpreetImg from '@/assets/Manpreet.png';

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
    role: "Growth & Performance Strategy",
    desc: "Obsessed with finding the one variable that breaks a funnel. Has run paid media for brands from ₹0 to 8-figure monthly revenue — and believes the creative brief is the most underrated document in marketing.",
    image: AashirwadImg,
    linkedin: "https://www.linkedin.com/in/aashirwad-bhansali/"
  },
  {
    name: "Aayush Singh",
    role: "AI & Tech Lead",
    desc: "Builds the systems that make everything else scale. From autonomous AI agents to server-side tracking stacks — if a process can be automated, Aayush is already two steps ahead of it.",
    image: AayushImg,
    linkedin: "https://www.linkedin.com/in/captn1107/"
  },
  {
    name: "Dipika",
    role: "Ecommerce Scaling",
    desc: "Knows the difference between a brand that looks like it's growing and one that actually is. Focuses on the metrics that protect margin: repeat rate, LTV, and lifecycle flows that turn buyers into fans.",
    image: DipikaImg,
    linkedin: "https://www.linkedin.com/in/dipika-k-53a3bb138/"
  },
  {
    name: "Aryaman",
    role: "Social & Creator Programs",
    desc: "Grew up on the internet and knows exactly why people stop scrolling. Runs creator programs and UGC funnels that feel native — because they are.",
    image: AryamanImg,
    linkedin: "https://www.linkedin.com/in/aryaman-chatterjee-b8971b208/"
  },
  {
    name: "Manpreet Singh",
    role: "Visual Design",
    desc: "Believes great design isn't decoration — it's persuasion. Turns brand positioning into visuals that stop thumbs and communicate value in under two seconds.",
    image: ManpreetImg,
    linkedin: "https://www.linkedin.com/in/manpreet-singh-020549237?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
  }
];

const Team = ({ title = "The Team", members = [] }: TeamProps) => {
  const displayMembers = members.length > 0 ? members : defaultMembers;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-sm font-black text-blue-600 uppercase tracking-[0.3em] mb-4">The Team</h2>
          <h3 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">{title}</h3>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {displayMembers.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
              className="group"
            >
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden mb-8 shadow-2xl relative bg-slate-50 border border-slate-100">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  width={400}
                  height={500}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out group-hover:scale-105" 
                />
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
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">{member.name}</h3>
                <p className="text-blue-600 font-black text-[10px] uppercase tracking-[0.2em]">{member.role}</p>
                <p className="text-slate-500 text-sm leading-relaxed pt-2 border-t border-slate-100">{member.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;