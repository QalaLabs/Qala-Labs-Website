"use client";

import React from 'react';
import ServiceCard from './ServiceCard';
import {
  Megaphone,
  TrendingUp,
  Wallet,
  Cpu,
  Handshake,
  Target
} from 'lucide-react';

const agents = [
  {
    title: "Marketing Agent",
    category: "Agent",
    description: "Ad optimization, creative testing, and content/hashtag strategy — run by AI, approved by humans. Mirrors the Marketing Captain and its specialists: it proposes budget shifts and creative swaps, you approve, it executes.",
    metric: "Human-Approved Autonomy",
    icon: <Megaphone className="w-7 h-7" />,
    href: "/services/marketing-agent"
  },
  {
    title: "Sales Agent",
    category: "Agent",
    description: "Lead scoring, deal forecasting, and outreach sequencing, tuned to your pipeline. The Sales Captain and its specialists watch every deal stage and surface the ones about to slip.",
    metric: "Pipeline, Always Scored",
    icon: <TrendingUp className="w-7 h-7" />,
    href: "/services/sales-agent"
  },
  {
    title: "Finance Agent",
    category: "Agent",
    description: "Invoice processing, GST/UTR reconciliation, and ROI calculation without the manual spreadsheet layer. Zero-loss data translation between your ERP, payment gateways, and books.",
    metric: "Zero-Loss Reconciliation",
    icon: <Wallet className="w-7 h-7" />,
    href: "/services/finance-agent"
  },
  {
    title: "Operations Agent",
    category: "Agent",
    description: "Inventory control, resource allocation, and workflow optimization across your stack — the Operations Captain keeping stock, staffing, and fulfillment in sync.",
    metric: "One Live Ops Picture",
    icon: <Cpu className="w-7 h-7" />,
    href: "/services/operations-agent"
  },
  {
    title: "Influencer Agent",
    category: "Agent",
    description: "Brand matchmaking, deal negotiation, and engagement analysis for creator partnerships — run at a speed and scale manual outreach can't match.",
    metric: "Creator Deals, Scaled",
    icon: <Handshake className="w-7 h-7" />,
    href: "/services/influencer-agent"
  },
  {
    title: "Attribution Engine",
    category: "Agent",
    description: "The flagship semantic, intent-weighted attribution capability — sold standalone. Know which channel, creative, and touchpoint actually drove the sale, not just which one was last-clicked.",
    metric: "True Multi-Touch Attribution",
    icon: <Target className="w-7 h-7" />,
    href: "/services/attribution-engine"
  }
];

const AgentsGrid = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {agents.map((agent) => (
          <ServiceCard key={agent.title} {...agent} />
        ))}
      </div>
    </div>
  );
};

export default AgentsGrid;
