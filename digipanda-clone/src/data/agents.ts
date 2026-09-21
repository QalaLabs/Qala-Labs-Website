export interface AgentItem {
  slug: string;
  name: string;
  tagline: string;
  whatItDoes: string;
  howBuilt: string[];
  integrations: string[];
}

export const agents: AgentItem[] = [
  {
    slug: 'financial-reconciliation-agent',
    name: 'Financial Reconciliation Agent',
    tagline: 'Matches payment-gateway settlements against orders and bank feeds — automatically, safely.',
    whatItDoes:
      "Every day, money moves between payment gateways, bank accounts, and the order ledger — and small mismatches compound into real accounting drift if nobody catches them fast. This agent pulls settlement records from payment gateways, cross-references them against orders and bank statement lines, and surfaces every discrepancy the moment it appears. It never fixes the books itself — it hands a human a short, prioritized list of exactly what doesn't match and why.",
    howBuilt: [
      'Part of the Marksops Agents platform (Module 6: payment_reconciliation), deployed on Google Cloud Run with FastAPI',
      'Pulls gateway settlement feeds and bank statement lines, joins them against the order ledger by transaction reference',
      'Flags amount/timing/reference mismatches as structured discrepancy records — no silent auto-correction',
      'Runs on a recurring schedule via the orchestrator module (Cloud Scheduler), so reconciliation happens automatically without anyone remembering to run it',
    ],
    integrations: ['Payment gateway settlement feeds', 'Bank statement ingestion', 'Order ledger (core data layer)'],
  },
  {
    slug: 'finance-bills-agent',
    name: 'Finance Bills Agent',
    tagline: 'Reads vendor emails, extracts the numbers, stages the entry — a human always approves the post.',
    whatItDoes:
      'Vendor invoices and ad-spend receipts arrive by email in wildly inconsistent formats — PDFs, HTML receipts, forwarded threads. This agent ingests those emails, extracts the real financial data (PO number, invoice number, GST breakdown, pre-tax/post-tax amounts), classifies the spend category, and stages a draft bill in the ERP. It is built around one hard invariant: it can never post that entry itself.',
    howBuilt: [
      'Marksops Agents Module 2 (finance_bills), FastAPI service with dedicated parsers per source: amazon_vc.py, ads_invoices.py, logistics_invoices.py, credit_card_alerts.py, saas_subscriptions.py',
      'A `detect_and_parse()` router auto-identifies the document type and extracts text from PDFs before routing to the right parser',
      'Classifies spend into [ADS, LOGISTICS, SAAS, VENDOR, UTILITY] and stages the record as `account.move` with move_type=\'in_invoice\' and state=\'draft\' in Odoo ERP',
      "Zero Auto-Posting Policy is enforced in code — any call to action_post() is blocked and raises a ZeroAutoPostingViolationError",
      'Two entry points: POST /webhooks/gmail/incoming-bill (real-time push) and POST /tasks/daily-bill-sweep (Cloud Scheduler fallback at 8am IST), then a WhatsApp approval alert goes out via the Convertway client',
    ],
    integrations: ['Gmail (incoming invoices)', 'Odoo ERP (draft staging)', 'WhatsApp via Convertway (approval alerts)'],
  },
  {
    slug: 'ai-voice-receptionist',
    name: 'AI Voice Agent / Receptionist',
    tagline: 'Answers, qualifies, and routes calls 24/7 — grounded in your own knowledge base.',
    whatItDoes:
      "This is a voice agent that actually answers the phone. It's grounded via retrieval-augmented generation (RAG) against your real product docs, FAQs, and pricing — so it answers correctly the first time instead of guessing — and it qualifies the caller before deciding whether to book them, route them to a human, or just answer the question outright. Every call produces a transcript and a structured summary, so nothing said on the phone disappears.",
    howBuilt: [
      'Speech-to-text -> RAG retrieval over an indexed knowledge base -> LLM response -> text-to-speech pipeline',
      'Knowledge base built from real product documentation, FAQs, and pricing sheets, kept current so answers never go stale',
      'Call routing logic decides in real time: answer directly, book a follow-up, or escalate to a human line',
      'Every call logged as a transcript plus a structured summary (intent, outcome, next action) pushed into the CRM/lead pipeline',
    ],
    integrations: ['Telephony/voice pipeline', 'RAG knowledge base', 'CRM lead pipeline'],
  },
  {
    slug: 'crm-leads-agent',
    name: 'CRM Leads Agent',
    tagline: 'Scores inbound leads and enforces a 24-hour SLA-backed follow-up loop — nothing goes cold.',
    whatItDoes:
      "Leads that don't get a fast, relevant follow-up die quietly. This agent watches every inbound lead the moment it lands, scores it against a fit/intent model, and enforces a follow-up SLA — if a lead hasn't been touched within 24 hours, it escalates. It's the difference between a lead list and an actual pipeline.",
    howBuilt: [
      'Marksops Agents Module 7 (crm_leads), with a dedicated CRMLeadService handling scoring logic',
      'Webhook + scheduled-task router (router.py) ingests leads in real time and on a recurring sweep',
      'Mock-payload test harness (mocks.py) lets the scoring model be validated against realistic lead shapes before it touches production data',
      'SLA breaches trigger an alert through the same WhatsApp/Convertway channel used across the platform',
    ],
    integrations: ['CRM/lead intake webhooks', 'WhatsApp via Convertway (SLA alerts)'],
  },
  {
    slug: 'marketplace-crawler',
    name: 'Marketplace Crawler',
    tagline: 'Watches competitor and marketplace listings for price discrepancies — in real time.',
    whatItDoes:
      "Prices on marketplaces move constantly, and a single stale listing can quietly bleed margin for weeks before anyone notices. This agent continuously crawls marketplace and competitor listings, compares them against your master catalog, and flags discrepancies the moment they appear — so pricing decisions get made on current data, not last month's screenshot.",
    howBuilt: [
      'Marksops Agents Module 3 (marketplace_crawler), FastAPI-hosted crawl + diff service',
      'Every observed price is checked against a master catalog record before an alert fires — no false positives from untracked SKUs',
      'Runs as a scheduled sweep via the orchestrator module rather than a one-off script, so drift gets caught continuously',
    ],
    integrations: ['Marketplace listing feeds', 'Master product catalog'],
  },
  {
    slug: 'inventory-sync-agent',
    name: 'Inventory Sync Agent',
    tagline: 'Keeps stock levels consistent across every channel — so nothing oversells.',
    whatItDoes:
      "Selling the same SKU across multiple channels only works if stock numbers agree everywhere. This agent keeps inventory counts synchronized across channels in near-real time via Unicommerce, so a sale on one channel correctly decrements availability everywhere else before an oversell can happen.",
    howBuilt: [
      'Marksops Agents Module 4 (unicommerce_inventory), a dedicated multichannel inventory sync engine',
      'Reconciles stock deltas across connected sales channels through the Unicommerce integration layer',
      'Runs on the same Cloud Run + Cloud Scheduler orchestration pattern as the rest of the platform for consistent, automatic execution',
    ],
    integrations: ['Unicommerce', 'Connected sales channels'],
  },
  {
    slug: 'logistics-ndr-agent',
    name: 'Logistics & NDR Agent',
    tagline: 'Tracks every shipment end to end and resolves non-delivery reports automatically.',
    whatItDoes:
      "Once an order ships, the real risk is a non-delivery report (NDR) sitting unresolved while a customer waits. This agent tracks shipments post-purchase through to delivery, and when an NDR fires, it manages the resolution workflow (retry, reschedule, refund escalation) plus COD reconciliation — instead of that becoming a manual support ticket queue.",
    howBuilt: [
      'Marksops Agents Module 5 (shiprocket_logistics), integrated with the Shiprocket logistics API',
      'Tracks shipment state transitions end to end and reacts specifically to NDR events',
      'Handles COD reconciliation as part of the same workflow, closing the loop between logistics and finance',
    ],
    integrations: ['Shiprocket', 'COD reconciliation ledger'],
  },
  {
    slug: 'tally-connector-agent',
    name: 'Tally Connector Agent',
    tagline: 'Syncs approved financial entries into Tally Prime — natively, no manual re-entry.',
    whatItDoes:
      "Most ERP-to-Tally integrations mean someone re-typing numbers. This agent takes entries that have already been approved elsewhere in the platform (e.g. from the Finance Bills Agent) and syncs them into Tally Prime through a native XML connector, so the accounting system of record stays current without duplicate manual work.",
    howBuilt: [
      'Marksops Agents Module 8 (tally_connector), built around Tally Prime\'s native XML API',
      'Consumes already-approved entries from upstream agents (e.g. finance_bills) rather than re-deriving data itself',
      'Keeps Tally as the accounting source of truth while every other agent in the platform stays advisory/staging-only',
    ],
    integrations: ['Tally Prime (XML API)', 'Finance Bills Agent (upstream approved entries)'],
  },
  {
    slug: 'customer-support-agent',
    name: 'Customer Support Agent',
    tagline: 'Handles omnichannel support conversations, and escalates only what a human genuinely needs to see.',
    whatItDoes:
      "Most support volume is repetitive — order status, return policy, shipping timelines. This agent handles that omnichannel (WhatsApp, email, chat) so your human support team only sees the conversations that actually need judgment, not the ones that need a lookup.",
    howBuilt: [
      'Marksops Agents Module 10 (customer_support), omnichannel agent built on the shared core/ infrastructure (structured logging, security tokens, MCP clients)',
      'Uses the same Convertway (WhatsApp) and Gmail MCP clients as the rest of the platform for a single conversation layer across channels',
      'Escalation logic routes only genuinely ambiguous or high-stakes conversations to a human — resolved conversations close automatically',
    ],
    integrations: ['WhatsApp via Convertway', 'Gmail', 'Order/CRM data layer'],
  },
];
