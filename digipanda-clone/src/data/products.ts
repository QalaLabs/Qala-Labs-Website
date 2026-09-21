import type { LucideIcon } from 'lucide-react';
import {
  Workflow,
  Receipt,
  LineChart,
  Boxes,
  Truck,
  Wallet,
  Headset,
  Brain,
  FileSearch,
  ClipboardCheck,
  CalendarClock,
  MessagesSquare,
  PhoneCall,
  BookOpenCheck,
  Route,
  ShieldCheck,
  KanbanSquare,
  Users,
  Inbox,
  Sparkles,
} from 'lucide-react';

export interface ProductFeature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface ProductStep {
  title: string;
  description: string;
}

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  description: string;
  features: ProductFeature[];
  howItWorks: ProductStep[];
}

export const products: Product[] = [
  {
    slug: 'marksops',
    name: 'MarksOps',
    tagline: 'Agentic Marketing, Sales, Ops & Finance — running as one system',
    category: 'AI Automation',
    description:
      "MarksOps is Qala Labs' own multi-agent operations platform: a LangGraph agent engine and FastAPI backend that unify Marketing, Sales, Operations, and Finance into a single native data layer instead of a stack of disconnected SaaS tools. On top of it runs a deployed ops-automation layer that reads real vendor emails, CRM leads, and marketplace listings and turns them into staged, human-approved actions — never silent auto-execution. Every financial write is a draft until a person approves it, every price alert is checked against a master catalog, and every lead gets a scored, 24-hour SLA-backed follow-up.",
    features: [
      {
        icon: Receipt,
        title: 'Zero-auto-post finance ingestion',
        description:
          'Parses Amazon VC, Meta/Google Ads, logistics, and SaaS invoices into draft bills in Odoo — every entry stays in draft with a strict zero-auto-posting policy until a human approves it.',
      },
      {
        icon: LineChart,
        title: 'Marketplace price monitoring',
        description:
          'Crawls Amazon and Flipkart listings twice daily, flags >5% deviations from your master price list, classifies root cause (own listing, seller, or competitor), and fires a WhatsApp alert.',
      },
      {
        icon: Boxes,
        title: 'Unicommerce inventory sync',
        description:
          'Keeps stock levels reconciled across Amazon, Flipkart, Myntra, and your own storefronts, and flags discrepancies over 10 units straight to Operations.',
      },
      {
        icon: Truck,
        title: 'Shiprocket logistics & NDR recovery',
        description:
          'Tracks every shipment event end to end, auto-alerts on delays past the expected delivery date, and drives non-delivery-report recovery without manual chasing.',
      },
      {
        icon: Wallet,
        title: 'Payment reconciliation & Tally sync',
        description:
          'Matches gateway settlements (Razorpay, Stripe, Cashfree, PayU) against expected net payouts down to the rupee, and mirrors approved vouchers into Tally over its XML gateway.',
      },
      {
        icon: Headset,
        title: 'Omnichannel customer support agent',
        description:
          'Classifies WhatsApp and email support intents, answers from order and return data, and escalates automatically on legal risk, high-value B2B tickets, or unresolved negative sentiment.',
      },
    ],
    howItWorks: [
      {
        title: 'Ingest',
        description: 'Emails, webhooks, and marketplace crawls feed structured events into the native FastAPI backend.',
      },
      {
        title: 'Reason',
        description: 'The LangGraph agent engine classifies, scores, and drafts the next action per domain (Marketing, Sales, Ops, Finance).',
      },
      {
        title: 'Approve',
        description: 'Every financially or customer-facing action stages as a draft — a human reviews and approves before it goes live.',
      },
      {
        title: 'Execute & alert',
        description: 'Approved actions post to Odoo, Tally, or the storefront, with WhatsApp alerts keeping the right team looped in.',
      },
    ],
  },
  {
    slug: 'ai-recruiter',
    name: 'AI Recruiter',
    tagline: 'AI-run screening, cognitive interviews, and candidate synthesis',
    category: 'AI Hiring',
    description:
      "AI Recruiter is Qala Labs' end-to-end hiring platform, covering the full loop from job creation to offer. Recruiters build a role through a guided wizard that captures screening criteria and cognitive interview parameters up front, then candidates are evaluated through a live conversational AI interview and an embedded code or skills assessment. Every candidate profile resolves into an AI-generated synthesis — qualifications, strengths, growth areas, and a score breakdown — so recruiters spend their time on decisions, not first-pass reading.",
    features: [
      {
        icon: ClipboardCheck,
        title: 'Guided job & screening wizard',
        description:
          'A five-step flow — role basics, requirements, cognitive screening questions, compensation, and publish — turns a vacancy into a fully configured screening pipeline before it goes live.',
      },
      {
        icon: MessagesSquare,
        title: 'Live AI interview panel',
        description:
          'Candidates speak directly to a conversational AI interviewer that runs the cognitive screening questions set during job creation, no scheduling required for the first pass.',
      },
      {
        icon: FileSearch,
        title: 'Embedded skills assessment',
        description:
          'Role-specific challenges (e.g. a frontend engineering test) run inline in the candidate flow, scored alongside the interview for a single combined signal.',
      },
      {
        icon: Brain,
        title: 'AI candidate synthesis',
        description:
          'Every applicant resolves into a structured summary — qualifications, strengths, growth areas, and a score breakdown — instead of a raw resume dump.',
      },
      {
        icon: CalendarClock,
        title: 'Interviewer availability heatmap',
        description:
          'A combined-availability calendar view lets recruiters set up final-round interviews across a team without the usual back-and-forth.',
      },
      {
        icon: Route,
        title: 'Full pipeline visibility',
        description:
          'A recruiter dashboard tracks candidate counts, active roles, and stage progression across the whole hiring pipeline in one workspace.',
      },
    ],
    howItWorks: [
      {
        title: 'Define the role',
        description: 'Recruiters set requirements and cognitive screening criteria through the job-creation wizard.',
      },
      {
        title: 'Candidates apply',
        description: 'Applicants submit through a matched job listing and complete the AI interview and any embedded assessment.',
      },
      {
        title: 'AI synthesizes',
        description: 'Responses and assessment results resolve into a scored, structured candidate profile.',
      },
      {
        title: 'Recruiter decides',
        description: 'The team reviews synthesized profiles, schedules final interviews off the availability heatmap, and moves candidates to offer.',
      },
    ],
  },
  {
    slug: 'ai-receptionist',
    name: 'AI Receptionist',
    tagline: 'A RAG-grounded voice agent that answers, qualifies, and books — 24/7',
    category: 'AI Voice',
    description:
      "AI Receptionist is a voice agent built on real telephony infrastructure (TeleCMI, with Twilio fallback), not a chatbot with a phone number bolted on. Every call is transcribed, grounded against a Retrieval-Augmented Generation knowledge base of your own website and course content via vector search, and answered by a persona-driven conversational model tuned to your brand's tone. Conversation history persists in Postgres rather than in-process memory, so the agent stays consistent across serverless instance recycles — a real operational detail, not a demo shortcut. Calls that show buying intent get scored, tagged, and pushed into the CRM with a WhatsApp booking confirmation, without a human ever picking up the phone.",
    features: [
      {
        icon: PhoneCall,
        title: 'Real telephony, not a widget',
        description:
          'Inbound and outbound calls run over TeleCMI SIP trunking with a Twilio fallback path — this answers actual phone numbers, not just a website chat bubble.',
      },
      {
        icon: BookOpenCheck,
        title: 'RAG-grounded knowledge base',
        description:
          'Every answer is retrieved via OpenAI embeddings against a vector store of your own site and course content, with a hard-coded fallback so the agent never goes silent.',
      },
      {
        icon: Brain,
        title: 'Persona-driven conversation engine',
        description:
          'A tuned system prompt gives the agent a consistent mentor voice and a consultative, non-pushy steering framework instead of a generic script.',
      },
      {
        icon: MessagesSquare,
        title: 'Durable multi-turn memory',
        description:
          "Conversation history is persisted in PostgreSQL per caller, so the dialogue stays coherent even when a serverless instance recycles mid-call — a detail most voice-bot demos skip.",
      },
      {
        icon: LineChart,
        title: 'Lead scoring & CRM sync',
        description:
          'Calls are classified Hot / Warm / Cold based on buying signals, synced straight to the CRM, and routed into the right nurture sequence automatically.',
      },
      {
        icon: CalendarClock,
        title: 'WhatsApp booking confirmation',
        description:
          'When a caller agrees to a next step, the agent locks the slot and sends an instant WhatsApp confirmation — no human handoff needed to close the loop.',
      },
    ],
    howItWorks: [
      {
        title: 'Call comes in',
        description: 'TeleCMI (or Twilio) routes the call to the assistant and streams the audio for transcription.',
      },
      {
        title: 'Retrieve context',
        description: 'The caller’s question is embedded and matched against your knowledge base via vector search.',
      },
      {
        title: 'Respond in voice',
        description: 'A grounded, persona-tuned response is generated and synthesized back to the caller in real time.',
      },
      {
        title: 'Qualify & book',
        description: 'Buying signals score the lead, sync it to the CRM, and — on agreement — lock a slot with a WhatsApp confirmation.',
      },
    ],
  },
  {
    slug: 'q-manager',
    name: 'Q Manager',
    tagline: 'A Work OS that unifies projects, client comms, and AI-drafted replies',
    category: 'Agency Ops',
    description:
      'Q Manager is the Work OS Qala Labs runs its own agency operations on — replacing the fragmented spread of a PM tool, a chat app, and email threads with one system scoped by role (Admin, Team Lead, Team Member, Client). Projects, tasks, time tracking, and a shared team-and-client comms layer sit on one data model, so "what is this client waiting on" and "who is overloaded this week" are one query, not five different tools cross-referenced by hand. An AI layer drafts replies and turns conversations into structured tasks, but strictly proposes — a human always approves before anything sends.',
    features: [
      {
        icon: KanbanSquare,
        title: 'Full project & task management',
        description:
          'List, board, calendar, and Gantt views with subtasks, dependencies, custom statuses, and per-project custom fields — ClickUp-Business-level parity, built for how Qala actually works.',
      },
      {
        icon: Inbox,
        title: 'Unified client comms timeline',
        description:
          'Chat channels, task comments, and a connected email inbox interleave into one timeline per client or project — nothing lives only in someone’s personal inbox.',
      },
      {
        icon: Sparkles,
        title: 'AI draft replies & task extraction',
        description:
          'AI proposes email/chat replies and turns long threads or client feedback into structured task proposals — it never sends or creates without an explicit human approval click.',
      },
      {
        icon: Users,
        title: 'Role-scoped client portal',
        description:
          'Clients get their own login to see project status, leave feedback, and message the team — without visibility into internal notes, other clients, or team productivity data.',
      },
      {
        icon: ShieldCheck,
        title: 'Client feedback with SLA tracking',
        description:
          'Every feedback item (Bug, Change Request, Praise, Question) runs through a tracked lifecycle with time-to-acknowledge and time-to-resolve metrics and CSAT scoring.',
      },
      {
        icon: Workflow,
        title: 'Workload & capacity dashboards',
        description:
          'Role-specific dashboards roll up utilization, throughput, and workload heatmaps — Team Leads see their team, Admins see the company, without activity-monitoring creepiness.',
      },
    ],
    howItWorks: [
      {
        title: 'One workspace',
        description: 'Clients, projects, tasks, chat, and connected inboxes live in a single multi-tenant data model.',
      },
      {
        title: 'Work happens in view',
        description: 'Teams track tasks and time directly against client work; clients see status through their own scoped portal.',
      },
      {
        title: 'AI proposes',
        description: 'Long threads and feedback resolve into draft replies or structured task proposals for one-click creation.',
      },
      {
        title: 'A human approves',
        description: 'Every send, post, or record edit needs an explicit human confirmation — AI never acts unsupervised.',
      },
    ],
  },
];
