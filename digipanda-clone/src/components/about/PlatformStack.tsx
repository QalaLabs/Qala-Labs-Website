import React from 'react';
import { 
  Zap, 
  Target, 
  ShoppingBag, 
  BarChart3, 
  Layers, 
  Globe, 
  Workflow, 
  Bot, 
  Code2, 
  Cpu,
  Search,
  ExternalLink
} from 'lucide-react';

const categories = [
  {
    name: "Paid Media & Marketplace Ecosystem",
    items: [
      { name: "Meta Ads (CAPI)", icon: Zap, color: "text-[#3b82f6]" },
      { name: "Google Ads & PMax", icon: Target, color: "text-[#ef4444]" },
      { name: "Amazon Vendor Central", icon: ShoppingBag, color: "text-[#f59e0b]" },
      { name: "Amazon Seller Central", icon: ShoppingBag, color: "text-[#f59e0b]" },
      { name: "Myntra Commerce", icon: ShoppingBag, color: "text-[#ec4899]" },
      { name: "Flipkart Commerce", icon: ShoppingBag, color: "text-[#3b82f6]" },
      { name: "Zepto Quick Commerce", icon: Zap, color: "text-[#10b981]" },
      { name: "Blinkit Ads", icon: Zap, color: "text-[#eab308]" },
    ]
  },
  {
    name: "Attribution, SEO & Telemetry",
    items: [
      { name: "Google Analytics 4 (GA4)", icon: BarChart3, color: "text-[#f59e0b]" },
      { name: "Server-Side GTM", icon: Layers, color: "text-[#38bdf8]" },
      { name: "Looker Studio Dashboards", icon: BarChart3, color: "text-[#3fe0e0]" },
      { name: "Google Search Console", icon: Search, color: "text-[#10b981]" },
      { name: "AI Search & Perplexity Ops", icon: Globe, color: "text-[#a78bfa]" },
    ]
  },
  {
    name: "Autonomous AI & Workflow Ops",
    items: [
      { name: "n8n Self-Hosted Automation", icon: Workflow, color: "text-[#f43f5e]" },
      { name: "Make.com Flow Architecture", icon: Workflow, color: "text-[#a855f7]" },
      { name: "ElevenLabs Conversational AI", icon: Bot, color: "text-[#38bdf8]" },
      { name: "Claude API Agent Swarms", icon: Bot, color: "text-[#fb923c]" },
      { name: "OpenAI GPT-4o Systems", icon: Bot, color: "text-[#10b981]" },
    ]
  },
  {
    name: "Engineering & Headless Commerce",
    items: [
      { name: "Shopify Plus & Hydrogen", icon: ShoppingBag, color: "text-[#96bf48]" },
      { name: "Next.js App Router", icon: Code2, color: "text-white" },
      { name: "Python Automation & Scrapers", icon: Cpu, color: "text-[#3b82f6]" },
      { name: "Node.js & TypeScript Microservices", icon: Code2, color: "text-[#3fe0e0]" },
      { name: "Supabase & PostgreSQL Stacks", icon: Layers, color: "text-[#34d399]" },
    ]
  }
];

export const PlatformStack: React.FC = () => {
  return (
    <div className="py-12 border-t border-white/10">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3FE0E0]/10 border border-[#3FE0E0]/30 text-[#3FE0E0] text-xs font-mono font-bold uppercase tracking-wider mb-4">
          <Cpu className="w-3.5 h-3.5" />
          <span>TECHNICAL ECOSYSTEM</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
          Platforms We Dominate
        </h2>
        <p className="text-white/70 text-sm md:text-base leading-relaxed">
          From full server-side measurement to quick commerce ads and autonomous AI agent flows.
        </p>
      </div>

      <div className="space-y-10">
        {categories.map((cat) => (
          <div key={cat.name} className="p-6 md:p-8 rounded-3xl bg-white/[0.02] border border-white/10">
            <h3 className="text-xs font-mono font-bold text-white/50 uppercase tracking-widest mb-6 flex items-center gap-3">
              <span>{cat.name}</span>
              <span className="h-px flex-1 bg-white/10" />
            </h3>

            <div className="flex flex-wrap gap-3">
              {cat.items.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.name}
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#3FE0E0]/50 hover:bg-white/[0.08] transition-all cursor-default group"
                  >
                    <Icon className={`w-4 h-4 ${item.color} group-hover:scale-110 transition-transform`} />
                    <span className="text-xs font-semibold text-white/90 group-hover:text-white transition-colors">
                      {item.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Research Citation Card from original site */}
      <div className="mt-10 p-8 rounded-3xl bg-gradient-to-r from-[#4F46E5]/15 via-white/[0.02] to-[#3FE0E0]/15 border border-white/15 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#3FE0E0] font-bold block mb-1">
            ACADEMIC RIGOR &amp; REPRODUCIBILITY
          </span>
          <h4 className="text-lg font-bold text-white mb-1">
            Research-Backed Growth Methodology
          </h4>
          <p className="text-xs text-white/70 max-w-xl">
            Our hypothesis-testing engine and attribution models align with cutting-edge academic literature on AI-powered consumer response and advertising velocity.
          </p>
        </div>

        <a
          href="https://www.sciencedirect.com/science/article/pii/S0268401224000318"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-[#3FE0E0] text-white hover:text-black font-mono font-bold text-xs border border-white/20 transition-all flex-shrink-0"
        >
          <span>ScienceDirect Reference</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
