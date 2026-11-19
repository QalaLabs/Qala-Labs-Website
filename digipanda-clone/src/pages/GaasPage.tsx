import React from 'react';
import { PageLayout } from './PageLayout';
import { SEO } from '../components/SEO';
import { CreativeDataDualCore } from '../components/3d/CreativeDataDualCore';
import { AiGrowthDiagnostic } from '../components/AiGrowthDiagnostic';
import { BookingSection } from '../components/BookingSection';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Zap,
  ShieldCheck,
  Cpu,
  ArrowRight,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Brain,
  IndianRupee,
  Layers,
  BarChart3,
  Flame,
  Clock,
  Target,
  ExternalLink,
} from 'lucide-react';

export const GaasPage: React.FC = () => {
  return (
    <PageLayout>
      <SEO
        title="GAAS Consultancy • Growth as a Service & Autonomous AI Swarms • Qala Labs"
        description="Replace bloated agency retainers with autonomous AI swarms and high-performance growth engineering. Scale acquisition, creative velocity, and operations 24/7."
        image="/assets/og/og-home.jpg"
        url="/gaas"
      />

      {/* 1. HERO SECTION */}
      <section className="relative pt-40 pb-20 bg-transparent overflow-hidden">
        {/* Ambient glow mesh */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-r from-[#4F46E5]/20 via-[#3FE0E0]/15 to-[#34D399]/10 blur-[140px] pointer-events-none" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center max-w-5xl">
          <div className="eyebrow inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#3FE0E0] animate-pulse" />
            THE NEXT EVOLUTION OF GROWTH CONSULTING • GAAS
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mt-6 mb-6">
            The Death of the Agency Retainer.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] via-[#3FE0E0] to-[#34D399]">
              The Rise of Autonomous GAAS.
            </span>
          </h1>

          <p className="text-white/70 text-base sm:text-xl font-normal max-w-3xl mx-auto leading-relaxed mb-10">
            We deploy proprietary autonomous AI agent swarms—unifying Paid Acquisition, Modular Creative Production, and Back-Office Operations into a 24/7 revenue engine that scales 8-figure brands with zero headcount drag.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a
              href="#ai-growth-diagnostic"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#4F46E5] via-[#3FE0E0] to-[#34D399] text-black font-extrabold text-sm flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(63,224,224,0.4)] hover:brightness-110 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-black" />
              <span>Run Free AI Growth Diagnostic</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#book-call"
              className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/20 text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <span>Book 30-Min Strategy Call</span>
            </a>
          </div>

          {/* 3D WebGL Dual-Core Interactive Showcase */}
          <div className="rounded-3xl border border-white/15 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-4 sm:p-8 backdrop-blur-xl shadow-2xl relative">
            <div className="text-xs font-mono text-[#3FE0E0] uppercase tracking-widest text-center mb-2">
              LIVE 3D WEBGL ENGINE • DUAL-CORE FUSION
            </div>
            <CreativeDataDualCore />
            <p className="text-xs text-white/50 text-center mt-3">
              Drag to orbit the 3D core. Left: Organic Creative Craft. Right: Precision Data Engineering.
            </p>
          </div>
        </div>
      </section>

      {/* 2. THE BROKEN AGENCY VS GAAS COMPARISON TABLE */}
      <section className="py-24 bg-transparent border-t border-white/10">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <div className="text-center mb-16">
            <div className="eyebrow">
              <span className="w-2 h-2 rounded-full bg-[#3FE0E0] animate-pulse" />
              SYSTEMIC ADVANTAGE MATRIX
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mt-3 mb-4">
              Why 8-Figure Brands Fire Traditional Agencies
            </h2>
            <p className="text-white/70 text-sm sm:text-base max-w-2xl mx-auto">
              Legacy agencies bill for junior manual labor and monthly PowerPoint decks. Qala Labs builds autonomous agent swarms that work 24/7 inside your actual stack.
            </p>
          </div>

          <div className="rounded-3xl border border-white/15 bg-white/[0.02] backdrop-blur-xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.04]">
                    <th className="py-4 px-6 text-white/60 font-mono uppercase text-xs">Vector</th>
                    <th className="py-4 px-6 text-rose-400 font-mono uppercase text-xs">Traditional Agency</th>
                    <th className="py-4 px-6 text-amber-400 font-mono uppercase text-xs">In-House Team</th>
                    <th className="py-4 px-6 text-[#3FE0E0] font-mono uppercase text-xs font-bold bg-[#3FE0E0]/10">
                      Qala GAAS Swarms
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-white/80">
                  <tr>
                    <td className="py-4 px-6 font-semibold text-white">Execution Cycle</td>
                    <td className="py-4 px-6 text-white/60">3-5 days per ad variant</td>
                    <td className="py-4 px-6 text-white/60">1-2 days per ad variant</td>
                    <td className="py-4 px-6 font-bold text-[#34D399] bg-[#3FE0E0]/5">
                      Sub-minute automated swarms
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-semibold text-white">Creative Fatigue Defense</td>
                    <td className="py-4 px-6 text-white/60">4-8 ads/month (slow decay)</td>
                    <td className="py-4 px-6 text-white/60">Limited by designer burnout</td>
                    <td className="py-4 px-6 font-bold text-[#34D399] bg-[#3FE0E0]/5">
                      20-30 weekly multivariate hooks
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-semibold text-white">Back-Office &amp; Invoicing</td>
                    <td className="py-4 px-6 text-white/60">Not included (pure ads)</td>
                    <td className="py-4 px-6 text-white/60">Manual spreadsheet imports</td>
                    <td className="py-4 px-6 font-bold text-[#34D399] bg-[#3FE0E0]/5">
                      MarksOps zero-auto-post automation
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-semibold text-white">Marketplace Reconciliation</td>
                    <td className="py-4 px-6 text-white/60">Ignored; silent margin bleed</td>
                    <td className="py-4 px-6 text-white/60">Monthly delayed accounting</td>
                    <td className="py-4 px-6 font-bold text-[#34D399] bg-[#3FE0E0]/5">
                      ReconSwarm discrepancy recovery
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-semibold text-white">Landing Page Tech</td>
                    <td className="py-4 px-6 text-white/60">Generic Shopify themes</td>
                    <td className="py-4 px-6 text-white/60">Page builder bloat</td>
                    <td className="py-4 px-6 font-bold text-[#34D399] bg-[#3FE0E0]/5">
                      Custom WebGL 3D landers (&gt;3.5% CVR)
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-semibold text-white">Incentive Alignment</td>
                    <td className="py-4 px-6 text-white/60">% of ad spend (encourages waste)</td>
                    <td className="py-4 px-6 text-white/60">Fixed overhead, zero downside</td>
                    <td className="py-4 px-6 font-bold text-[#34D399] bg-[#3FE0E0]/5">
                      Hybrid Retainer + ROAS Upside
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROPRIETARY AGENT SWARM TRIO */}
      <section className="py-24 bg-transparent border-t border-white/10">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="text-center mb-16">
            <div className="eyebrow">
              <span className="w-2 h-2 rounded-full bg-[#3FE0E0] animate-pulse" />
              NATIVE SWARM ARCHITECTURE
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mt-3 mb-4">
              Autonomous Systems. Not Human Bottlenecks.
            </h2>
            <p className="text-white/70 text-sm sm:text-base max-w-2xl mx-auto">
              Every client engagement deploys our battle-tested multi-agent engines directly into your tech stack.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Swarm 1: MarksOps */}
            <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-[#4F46E5]/40 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#4F46E5]/20 text-[#818CF8] flex items-center justify-center mb-6">
                  <Cpu className="w-6 h-6" />
                </div>
                <div className="text-xs font-mono text-[#818CF8] uppercase tracking-wider mb-2">
                  OPS &amp; FINANCE ENGINE
                </div>
                <h3 className="text-xl font-bold text-white mb-3">MarksOps</h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-6">
                  A LangGraph agent engine and FastAPI backend that unifies Marketing, Sales, Operations, and Finance into a single data layer. Parses Amazon VC, Meta, and SaaS invoices into human-approved drafts with strict zero-auto-posting guardrails.
                </p>
              </div>
              <ul className="space-y-2.5 text-xs text-white/80 border-t border-white/10 pt-4">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#34D399]" />
                  <span>Staged ERP draft ingestion (Odoo/SAP)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#34D399]" />
                  <span>SLA-backed CRM lead score &amp; routing</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#34D399]" />
                  <span>Saves 18+ weekly operator hours</span>
                </li>
              </ul>
            </div>

            {/* Swarm 2: ReconSwarm */}
            <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-[#3FE0E0]/40 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#3FE0E0]/20 text-[#3FE0E0] flex items-center justify-center mb-6">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div className="text-xs font-mono text-[#3FE0E0] uppercase tracking-wider mb-2">
                  SETTLEMENT RECOVERY
                </div>
                <h3 className="text-xl font-bold text-white mb-3">ReconSwarm</h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-6">
                  Autonomous auditing agent that scans marketplace returns, weight-discrepancies, lost inventory, and payment gateway settlement fees to systematically detect and claw back uncaptured cash.
                </p>
              </div>
              <ul className="space-y-2.5 text-xs text-white/80 border-t border-white/10 pt-4">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#34D399]" />
                  <span>₹42L+ recovered in silent logistics drag</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#34D399]" />
                  <span>Cross-checks Amazon, Flipkart &amp; Shopify</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#34D399]" />
                  <span>Automated evidence dossier generator</span>
                </li>
              </ul>
            </div>

            {/* Swarm 3: CreativeEngine */}
            <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-[#34D399]/40 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#34D399]/20 text-[#34D399] flex items-center justify-center mb-6">
                  <Zap className="w-6 h-6" />
                </div>
                <div className="text-xs font-mono text-[#34D399] uppercase tracking-wider mb-2">
                  MULTIVARIATE AD MACHINE
                </div>
                <h3 className="text-xl font-bold text-white mb-3">CreativeEngine</h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-6">
                  Generates and tests high-variance modular visual hooks, problem-aware opening frames, and statistical script angles to conquer Meta and TikTok ad fatigue before CAC spikes occur.
                </p>
              </div>
              <ul className="space-y-2.5 text-xs text-white/80 border-t border-white/10 pt-4">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#34D399]" />
                  <span>20–30 weekly modular video variants</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#34D399]" />
                  <span>Server-side Meta CAPI integration</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#34D399]" />
                  <span>28x ROAS peak campaign performance</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. VERIFIED CASE STUDY PROOF */}
      <section className="py-24 bg-transparent border-t border-white/10">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <div className="text-center mb-16">
            <div className="eyebrow">
              <span className="w-2 h-2 rounded-full bg-[#3FE0E0] animate-pulse" />
              VERIFIED NUMBERS • NOT PROMISES
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mt-3 mb-4">
              Hard Mathematical Proof
            </h2>
            <p className="text-white/70 text-sm sm:text-base max-w-2xl mx-auto">
              Real commercial case studies showing how our GAAS swarms unlock margin and velocity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#3FE0E0] font-mono mb-2">28x ROAS</div>
              <div className="text-sm font-bold text-white mb-1">Trotr Spain Expansion</div>
              <p className="text-xs text-white/60 leading-relaxed">
                Replaced generic tour ads with founder storytelling and modular video hooks, generating ₹14L in revenue in 72 hours.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#4F46E5] font-mono mb-2">45 Leads</div>
              <div className="text-sm font-bold text-white mb-1">Nutrivend UK Enterprise</div>
              <p className="text-xs text-white/60 leading-relaxed">
                45 qualified enterprise fitness decision-makers acquired in 7 days, discovering 71% untapped B2B market demand.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#34D399] font-mono mb-2">11.2x ROAS</div>
              <div className="text-sm font-bold text-white mb-1">Amazon Performance Engine</div>
              <p className="text-xs text-white/60 leading-relaxed">
                47% lower ACOS through algorithmic placement optimization, lifting organic rankings into the Top 3 search results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HYBRID RETAINER + AGENTIC SAAS TIERS */}
      <section className="py-24 bg-transparent border-t border-white/10">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="text-center mb-16">
            <div className="eyebrow">
              <span className="w-2 h-2 rounded-full bg-[#3FE0E0] animate-pulse" />
              COHORT ARCHITECTURE &amp; PRICING
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mt-3 mb-4">
              Hybrid Retainer + Agentic Delivery
            </h2>
            <p className="text-white/70 text-sm sm:text-base max-w-2xl mx-auto">
              Transparent, incentive-aligned engagements combining dedicated growth engineering pods with deployed autonomous swarm infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Tier 1: Growth Core */}
            <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono text-[#3FE0E0] uppercase tracking-wider mb-2">
                  VALIDATION &amp; SCALE
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Growth Core</h3>
                <p className="text-xs text-white/60 mb-6">For brands scaling from ₹25L to ₹50L/mo GMV.</p>

                <div className="text-3xl font-extrabold text-white font-mono mb-6">
                  Hybrid Retainer <span className="text-xs font-normal text-white/50 block mt-1">+ Software Swarm License</span>
                </div>

                <ul className="space-y-3 text-xs text-white/80 border-t border-white/10 pt-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#3FE0E0]" />
                    <span>Server-Side Meta CAPI &amp; Google Tagging</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#3FE0E0]" />
                    <span>CreativeEngine 15+ weekly modular hooks</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#3FE0E0]" />
                    <span>Landing Page CRO Optimization (&gt;2.8%)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#3FE0E0]" />
                    <span>Bi-weekly executive sprint reviews</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <a
                  href="#book-call"
                  className="w-full py-3 rounded-full border border-white/20 text-white font-bold text-xs flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  Apply for Core Cohort
                </a>
              </div>
            </div>

            {/* Tier 2: Autonomous Swarm Pro (Featured) */}
            <div className="p-8 rounded-3xl bg-gradient-to-b from-[#4F46E5]/15 via-white/[0.05] to-white/[0.02] border-2 border-[#3FE0E0]/50 relative flex flex-col justify-between shadow-[0_0_35px_rgba(63,224,224,0.15)]">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#4F46E5] to-[#3FE0E0] text-black font-extrabold text-[10px] uppercase tracking-wider">
                MOST POPULAR • FULL STACK
              </div>

              <div>
                <div className="text-xs font-mono text-[#3FE0E0] uppercase tracking-wider mb-2 mt-2">
                  EXPANSION ENGINE
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Autonomous Swarm Pro</h3>
                <p className="text-xs text-white/60 mb-6">For brands scaling from ₹50L to ₹2Cr/mo GMV.</p>

                <div className="text-3xl font-extrabold text-white font-mono mb-6">
                  Dedicated Pod <span className="text-xs font-normal text-white/50 block mt-1">+ Full MarksOps &amp; ReconSwarm</span>
                </div>

                <ul className="space-y-3 text-xs text-white/80 border-t border-white/10 pt-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#34D399]" />
                    <span>Everything in Growth Core</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#34D399]" />
                    <span>Full MarksOps LangGraph automation deployment</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#34D399]" />
                    <span>ReconSwarm marketplace discrepancy recovery</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#34D399]" />
                    <span>Custom Three.js 3D WebGL high-converting lander</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#34D399]" />
                    <span>Performance hurdle bonus aligned with ROAS</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <a
                  href="#book-call"
                  className="w-full py-3 rounded-full bg-gradient-to-r from-[#4F46E5] to-[#3FE0E0] text-black font-extrabold text-xs flex items-center justify-center hover:brightness-110 transition-all shadow-md"
                >
                  Deploy Swarm Pro
                </a>
              </div>
            </div>

            {/* Tier 3: Enterprise Sovereign */}
            <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono text-[#818CF8] uppercase tracking-wider mb-2">
                  MARKET DOMINANCE
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Enterprise Sovereign</h3>
                <p className="text-xs text-white/60 mb-6">For multi-brand conglomerates &gt;₹2Cr/mo.</p>

                <div className="text-3xl font-extrabold text-white font-mono mb-6">
                  Custom Architecture <span className="text-xs font-normal text-white/50 block mt-1">+ Sovereign AI Infrastructure</span>
                </div>

                <ul className="space-y-3 text-xs text-white/80 border-t border-white/10 pt-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#818CF8]" />
                    <span>Custom LangGraph multi-agent orchestration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#818CF8]" />
                    <span>Direct ERP (SAP / Odoo) deep connector build</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#818CF8]" />
                    <span>Dedicated senior growth &amp; AI engineering team</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#818CF8]" />
                    <span>Custom private LLM deployment &amp; fine-tuning</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <a
                  href="#book-call"
                  className="w-full py-3 rounded-full border border-white/20 text-white font-bold text-xs flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  Request Architecture Call
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. EMBEDDED FLAGSHIP AI GROWTH DIAGNOSTIC */}
      <section className="py-20 bg-transparent border-t border-white/10">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <div className="text-center mb-12">
            <div className="eyebrow">
              <span className="w-2 h-2 rounded-full bg-[#3FE0E0] animate-pulse" />
              INTERACTIVE AUDIT ENGINE
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-2 mb-3">
              Calculate Your Swarm Opportunity Score
            </h2>
            <p className="text-white/70 text-sm max-w-xl mx-auto">
              Find out how much manual back-office drag and ad spend leakage you can eliminate.
            </p>
          </div>

          <AiGrowthDiagnostic source="gaas_landing_page" />
        </div>
      </section>

      {/* 7. CALENDAR & STRATEGY BOOKING SECTION */}
      <BookingSection />
    </PageLayout>
  );
};

export default GaasPage;
