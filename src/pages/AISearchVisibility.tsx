import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';
import { motion } from 'framer-motion';
import {
  ArrowRight, Search, Bot, Globe, CheckCircle2,
  TrendingUp, Zap, Eye, FileText, Star, BarChart3
} from 'lucide-react';

const stats = [
  { value: '60%+', label: 'of searches now end without a click (zero-click era)' },
  { value: '40%', label: 'of Gen Z use TikTok & AI as their primary search engine' },
  { value: '1B+', label: 'ChatGPT users actively searching for brand recommendations' },
  { value: '3x', label: 'more qualified traffic from AEO-optimised content vs traditional SEO' },
];

const pillars = [
  {
    icon: Search,
    tag: 'SEO',
    title: 'Search Engine Optimisation',
    description: 'Technical foundations, Core Web Vitals, schema markup, and content architecture that drives consistent organic rankings on Google & Bing.',
    items: ['Technical SEO audits & fixes', 'Core Web Vitals optimisation', 'Schema & structured data', 'Link acquisition & authority building', 'Keyword clusters & topical authority'],
    color: 'blue',
  },
  {
    icon: Bot,
    tag: 'AEO',
    title: 'Answer Engine Optimisation',
    description: 'Structured content that gets cited by ChatGPT, Perplexity, Claude, and Google AI Overviews — the new front page of the internet.',
    items: ['FAQ & featured snippet capture', 'Conversational content strategy', 'Entity & knowledge graph building', 'Perplexity & ChatGPT citation audits', 'AI-first content frameworks'],
    color: 'violet',
  },
  {
    icon: Globe,
    tag: 'GEO',
    title: 'Generative Engine Optimisation',
    description: 'Positioning your brand inside AI-generated answers across LLMs so every chatbot response about your category mentions you first.',
    items: ['LLM mention audits & tracking', 'Brand entity reinforcement', 'Authoritative source building', 'Structured data for generative AI', 'Multi-model citation strategy'],
    color: 'emerald',
  },
];

const services = [
  { icon: FileText, title: 'AI Search Audit', desc: 'Full audit of how your brand appears (or disappears) in AI-generated answers today.' },
  { icon: Eye, title: 'Entity Building', desc: 'Build your brand\'s knowledge graph presence so AI systems recognise and recommend you.' },
  { icon: BarChart3, title: 'Content Strategy', desc: 'An editorial roadmap designed to capture AI citations and Google AI Overviews.' },
  { icon: Zap, title: 'Technical Optimisation', desc: 'Speed, crawlability, structured data, and Core Web Vitals — the infrastructure layer.' },
  { icon: TrendingUp, title: 'Monthly Reporting', desc: 'Track AI citation frequency, organic rankings, and visibility share — not vanity metrics.' },
  { icon: Star, title: 'Competitor Gap Analysis', desc: 'Identify exactly which queries your competitors are capturing in AI answers — and steal them.' },
];

const faqs = [
  {
    q: 'What is AEO and how is it different from SEO?',
    a: 'SEO targets Google\'s blue links. AEO (Answer Engine Optimisation) targets the AI-generated answers that now appear above those links in Google, and in tools like ChatGPT and Perplexity. AEO focuses on structuring content so AI systems extract and cite it as authoritative answers.',
  },
  {
    q: 'What is GEO (Generative Engine Optimisation)?',
    a: 'GEO goes one level deeper — it\'s the practice of ensuring your brand is mentioned inside the responses that LLMs (Large Language Models) generate. When someone asks ChatGPT "best performance marketing agency in India," GEO is the work that puts Qala Labs in that answer.',
  },
  {
    q: 'Do you still do traditional SEO?',
    a: 'Yes. Classic technical SEO and content optimisation remain essential — they\'re the foundation. We layer AEO and GEO on top, giving you complete search visibility across all surfaces: Google, Bing, AI Overviews, ChatGPT, Perplexity, and beyond.',
  },
  {
    q: 'How long does it take to see results?',
    a: 'Technical fixes show impact within 4–8 weeks. Content and entity building compounds over 3–6 months. AI citation placement varies by LLM update cycles — typically visible improvement in 2–4 months with consistent execution.',
  },
  {
    q: 'How do you track AI citation performance?',
    a: 'We run regular prompt audits across ChatGPT, Perplexity, Claude, and Gemini — testing branded and category queries to track where your brand appears, how often, and how accurately. We report on citation frequency, sentiment, and competitive share.',
  },
];

const AISearchVisibility = () => {
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="AI Search Visibility | SEO + AEO + GEO Agency India | Qala Labs"
        description="India's first full-service SEO, AEO (Answer Engine Optimisation), and GEO (Generative Engine Optimisation) agency. Own search across Google, ChatGPT, Perplexity, and AI Overviews."
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'AI Search Visibility', url: '/ai-search-visibility' },
        ]}
      />
      <Navbar />

      {/* Hero */}
      <section className="pt-36 pb-24 bg-[#06070D] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/40 via-[#06070D] to-violet-950/30" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-600/5 rounded-full blur-[100px]" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-600/15 border border-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-widest mb-8"
          >
            <Search className="w-3.5 h-3.5" /> AI Search Visibility
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight leading-[1.05] max-w-4xl"
          >
            Own Every Surface
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
              Where Search Happens.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-400 max-w-2xl mb-12 leading-relaxed"
          >
            Google AI Overviews. ChatGPT. Perplexity. Voice search. The search landscape has fractured — brands that only invest in traditional SEO are already invisible to half their audience. We do SEO, AEO, and GEO so you win everywhere.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              to="/ai-audit"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black text-lg transition-colors shadow-xl shadow-blue-500/20 group"
            >
              Get Free AI Visibility Audit <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 border border-white/10 text-slate-300 hover:text-white hover:border-white/30 px-8 py-4 rounded-2xl font-black text-lg transition-colors"
            >
              See Results
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="py-16 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-black text-blue-600 mb-2">{s.value}</div>
                <div className="text-sm text-slate-500 leading-snug">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mb-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-black uppercase tracking-widest mb-6"
            >
              The Problem
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
              SEO alone won't cut it anymore.
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed">
              In 2024, Google rolled out AI Overviews that push organic results below the fold. ChatGPT now answers product questions that used to drive clicks to your blog. Perplexity synthesises competitor comparisons from dozens of sources. Your brand needs to show up <em>inside</em> these AI responses — not just below them.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'The old playbook', items: ['Rank on page 1', 'Drive click-through traffic', 'Optimise title tags & meta', 'Build backlinks'], bad: true },
              { title: 'What\'s actually happening', items: ['AI Overviews absorb 40%+ of SERP clicks', 'ChatGPT answers brand & product questions', 'Perplexity cites 6 sources and users never leave', 'Voice search skips the results page entirely'], bad: true },
              { title: 'The Qala Labs approach', items: ['SEO for Google rankings', 'AEO for AI answer inclusion', 'GEO for LLM citation & brand mentions', 'Unified visibility across all search surfaces'], bad: false },
            ].map((col, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`p-8 rounded-3xl border ${col.bad ? 'bg-slate-50 border-slate-200' : 'bg-blue-600 border-blue-500'}`}
              >
                <h3 className={`text-lg font-black mb-6 ${col.bad ? 'text-slate-900' : 'text-white'}`}>{col.title}</h3>
                <ul className="space-y-3">
                  {col.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${col.bad ? 'text-slate-400' : 'text-blue-200'}`} />
                      <span className={`text-sm leading-snug ${col.bad ? 'text-slate-600' : 'text-blue-50'}`}>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/15 text-blue-400 text-xs font-black uppercase tracking-widest mb-6"
            >
              Our Framework
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
              Three pillars. One strategy.
            </h2>
            <p className="text-lg text-slate-400">
              We treat SEO, AEO, and GEO as a unified system — each layer amplifying the others.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              const colorMap: Record<string, string> = {
                blue: 'bg-blue-600/10 text-blue-400 border-blue-500/20',
                violet: 'bg-violet-600/10 text-violet-400 border-violet-500/20',
                emerald: 'bg-emerald-600/10 text-emerald-400 border-emerald-500/20',
              };
              const tagColor = colorMap[p.color];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/8 transition-colors"
                >
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-black uppercase tracking-widest mb-6 ${tagColor}`}>
                    <Icon className="w-3.5 h-3.5" /> {p.tag}
                  </div>
                  <h3 className="text-2xl font-black text-white mb-4">{p.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">{p.description}</p>
                  <ul className="space-y-2">
                    {p.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-slate-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-2xl mb-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 text-blue-700 text-xs font-black uppercase tracking-widest mb-6"
            >
              What We Deliver
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
              Every service you need to dominate AI search.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/40 transition-all group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center mb-6 group-hover:bg-blue-600/15 transition-colors">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mb-3">{s.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{s.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
              Common questions.
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-black text-slate-900 pr-8">{faq.q}</span>
                  <span className={`text-blue-600 text-2xl leading-none transition-transform flex-shrink-0 ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 text-slate-600 leading-relaxed text-sm">{faq.a}</div>
                )}
              </motion.div>
            ))}
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
              Find out where your brand
              <br />stands in AI search today.
            </h2>
            <p className="text-slate-400 text-lg mb-12 max-w-xl mx-auto">
              We'll audit your current visibility across Google, ChatGPT, Perplexity, and AI Overviews — and show you exactly what it takes to own those results.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/ai-audit"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl font-black text-lg transition-colors shadow-xl shadow-blue-500/20 group"
              >
                Get Free AI Visibility Audit <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 border border-white/10 text-slate-300 hover:text-white hover:border-white/30 px-10 py-5 rounded-2xl font-black text-lg transition-colors"
              >
                Talk to Our Team
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AISearchVisibility;
