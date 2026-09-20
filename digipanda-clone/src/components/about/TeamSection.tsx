import React from 'react';
import { Linkedin, ArrowUpRight, Sparkles } from 'lucide-react';

export interface TeamMember {
  name: string;
  role: string;
  desc: string;
  image: string;
  linkedin: string;
  tag: string;
}

export const teamMembers: TeamMember[] = [
  {
    name: "Aashirwad Bhansali",
    role: "Growth & Performance Strategy",
    desc: "Obsessed with finding the one variable that breaks a funnel. Has run paid media for brands from ₹0 to 8-figure monthly revenue — and believes the creative brief is the most underrated document in marketing.",
    image: "/assets/qala/Aashirwad.webp",
    linkedin: "https://www.linkedin.com/in/aashirwad-bhansali/",
    tag: "Paid Media & Attribution"
  },
  {
    name: "Aayush Singh",
    role: "AI & Tech Lead",
    desc: "Builds the systems that make everything else scale. From autonomous AI agents to server-side tracking stacks — if a process can be automated, Aayush is already two steps ahead of it.",
    image: "/assets/qala/Aayush.webp",
    linkedin: "https://www.linkedin.com/in/captn1107/",
    tag: "Autonomous AI & Infra"
  },
  {
    name: "Dipika",
    role: "Ecommerce Scaling",
    desc: "Knows the difference between a brand that looks like it's growing and one that actually is. Focuses on the metrics that protect margin: repeat rate, LTV, and lifecycle flows that turn buyers into fans.",
    image: "/assets/qala/Dipika.webp",
    linkedin: "https://www.linkedin.com/in/dipika-k-53a3bb138/",
    tag: "LTV & Retention Ops"
  },
  {
    name: "Aryaman",
    role: "Social & Creator Programs",
    desc: "Grew up on the internet and knows exactly why people stop scrolling. Runs creator programs and UGC funnels that feel native — because they are.",
    image: "/assets/qala/Aryaman.webp",
    linkedin: "https://www.linkedin.com/in/aryaman-chatterjee-b8971b208/",
    tag: "Viral UGC & Creators"
  },
  {
    name: "Manpreet Singh",
    role: "Visual Design",
    desc: "Believes great design isn't decoration — it's persuasion. Turns brand positioning into visuals that stop thumbs and communicate value in under two seconds.",
    image: "/assets/qala/Manpreet.webp",
    linkedin: "https://www.linkedin.com/in/manpreet-singh-020549237?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    tag: "Design & Conversion UI"
  }
];

export const TeamSection: React.FC = () => {
  return (
    <div id="team" className="py-12">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4F46E5]/10 border border-[#4F46E5]/30 text-[#4F46E5] text-xs font-mono font-bold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#3FE0E0]" />
          <span>DIRECT SPECIALIST EXECUTION</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
          The Engineers Behind Your Growth
        </h2>
        <p className="text-white/70 text-sm md:text-base leading-relaxed">
          No junior account coordinators or outsourced interns. You partner directly with founders and domain leads who live in the attribution models, creative iterations, and tech infrastructure.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {teamMembers.map((member) => (
          <div
            key={member.name}
            className="group relative rounded-3xl bg-white/[0.02] border border-white/10 hover:border-[#3FE0E0]/50 p-5 transition-all duration-500 hover:shadow-[0_10px_35px_rgba(63,224,224,0.15)] flex flex-col justify-between"
          >
            {/* Top: Image & Badge */}
            <div>
              <div className="aspect-[4/5] rounded-2xl overflow-hidden mb-5 relative bg-[#090A15] border border-white/10">
                <img
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06070D] via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

                {/* Focus Tag */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-[#3FE0E0]">
                  {member.tag}
                </div>

                {/* LinkedIn Overlay Icon */}
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Connect with ${member.name} on LinkedIn`}
                  className="absolute bottom-3 right-3 w-10 h-10 rounded-xl bg-[#0077b5]/90 hover:bg-[#0077b5] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>

              {/* Identity & Bio */}
              <div className="mb-3">
                <h3 className="text-lg font-bold text-white group-hover:text-[#3FE0E0] transition-colors leading-tight">
                  {member.name}
                </h3>
                <p className="text-xs font-mono font-semibold text-[#4F46E5] uppercase tracking-wider mt-1">
                  {member.role}
                </p>
              </div>

              <p className="text-xs text-white/60 leading-relaxed pt-3 border-t border-white/10">
                {member.desc}
              </p>
            </div>

            {/* Bottom: Quick Link */}
            <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs text-white/50 group-hover:text-white transition-colors">
              <span className="font-mono text-[11px]">Connect</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
