"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Zap, Loader2, ShieldAlert } from 'lucide-react';

interface CampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (data: any) => Promise<void>;
  leadsCount: number;
  highIntentCount: number;
  services: string[];
}

const CampaignModal = ({ isOpen, onClose, onSend, leadsCount, highIntentCount, services }: CampaignModalProps) => {
  const [sending, setSending] = useState(false);
  const [campaignData, setCampaignData] = useState({
    subject: '',
    content: '',
    segment: 'all'
  });

  const handleSend = async () => {
    setSending(true);
    await onSend(campaignData);
    setSending(false);
    setCampaignData({ subject: '', content: '', segment: 'all' });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-white rounded-[3rem] p-10">
        <DialogHeader>
          <DialogTitle className="text-3xl font-black text-slate-900">Campaign Builder</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-6">
          <div className="space-y-2">
            <Label>Campaign Audience</Label>
            <select 
              className="w-full h-12 rounded-xl border border-slate-200 px-4 font-bold text-sm"
              value={campaignData.segment}
              onChange={e => setCampaignData({...campaignData, segment: e.target.value})}
            >
              <option value="all">All Leads ({leadsCount})</option>
              <option value="high_intent">High Intent Only ({highIntentCount})</option>
              {services.map(s => <option key={s} value={`service:${s}`}>Service: {s}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <Label>Email Subject</Label>
            <Input 
              placeholder="e.g. Your 90-Day Scale Roadmap" 
              className="rounded-xl h-12" 
              value={campaignData.subject}
              onChange={(e) => setCampaignData({...campaignData, subject: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label>Message Content (Markdown Supported)</Label>
            <Textarea 
              placeholder="Hi {{name}}, I noticed your brand is prime for scale..." 
              className="min-h-[200px] rounded-xl" 
              value={campaignData.content}
              onChange={(e) => setCampaignData({...campaignData, content: e.target.value})}
            />
          </div>
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-center gap-4">
            <ShieldAlert className="w-6 h-6 text-amber-600" />
            <p className="text-xs text-amber-800">Campaigns will be delivered via the SMTP settings configured in your integration panel.</p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" className="rounded-xl h-12" onClick={onClose}>Discard</Button>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 rounded-xl h-12 px-8 font-black gap-2"
            onClick={handleSend}
            disabled={sending}
          >
            {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
            Queue Campaign
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CampaignModal;