"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Send, History, StickyNote, Database } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { showSuccess } from '@/utils/toast';

interface LeadDetailModalProps {
  lead: any;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

const LeadDetailModal = ({ lead, isOpen, onClose, onUpdate }: LeadDetailModalProps) => {
  const [internalNote, setInternalNote] = useState("");

  if (!lead) return null;

  const handleSaveNote = async () => {
    const { error } = await supabase.from('leads').update({
      data: { ...lead.data, internal_note: internalNote }
    }).eq('id', lead.id);
    
    if (!error) {
      showSuccess("Note saved");
      onUpdate();
      setInternalNote("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-white rounded-[3rem] p-10 overflow-y-auto max-h-[90vh]">
        <div className="space-y-8">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-black text-slate-900">{lead.data?.name || 'Lead Profile'}</h2>
              <p className="text-slate-500">{lead.email}</p>
              <Badge className="mt-2 bg-blue-600">ID: {lead.id.split('-')[0]}</Badge>
            </div>
            <div className="flex gap-2">
              <Button className="bg-green-600 hover:bg-green-700 gap-2 px-6 rounded-xl h-12"><Phone className="w-4 h-4" /> WhatsApp</Button>
              <Button className="bg-blue-600 hover:bg-blue-700 gap-2 px-6 rounded-xl h-12"><Send className="w-4 h-4" /> Email</Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-200">
                <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><History className="w-4 h-4" /> Context</Label>
                <div className="mt-4 space-y-4">
                  <div><p className="text-xs text-slate-400">Captured on</p><p className="font-bold text-slate-900 truncate">{lead.data?.source_url || 'Direct'}</p></div>
                  <div><p className="text-xs text-slate-400">Campaign</p><p className="font-bold text-blue-600">{lead.data?.utm_campaign || 'Organic'}</p></div>
                  <div><p className="text-xs text-slate-400">Budget/Rev</p><p className="font-bold text-slate-900">{lead.data?.revenue || lead.data?.budget || 'N/A'}</p></div>
                  <div><p className="text-xs text-slate-400">Tool Used</p><Badge variant="outline" className="font-mono text-[10px]">{lead.tool_used}</Badge></div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-8 bg-blue-50 rounded-[2.5rem] border border-blue-100">
                <Label className="text-[10px] font-black text-blue-400 uppercase tracking-widest flex items-center gap-2"><StickyNote className="w-4 h-4" /> Internal Notes</Label>
                <div className="mt-4 space-y-4">
                  {lead.data?.internal_note && (
                    <div className="p-3 bg-white rounded-xl text-xs text-slate-600 border border-blue-100 italic">
                      "{lead.data.internal_note}"
                    </div>
                  )}
                  <Textarea 
                    placeholder="Add internal context..." 
                    className="min-h-[100px] rounded-xl text-sm"
                    value={internalNote}
                    onChange={e => setInternalNote(e.target.value)}
                  />
                  <Button className="w-full bg-blue-600 rounded-xl font-bold" onClick={handleSaveNote}>Save Note</Button>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white">
            <h4 className="font-black mb-6 flex items-center gap-2"><Database className="w-4 h-4 text-blue-400" /> Lead Metadata</h4>
            <pre className="text-[10px] font-mono text-slate-400 overflow-auto max-h-40 bg-black/20 p-4 rounded-xl">
              {JSON.stringify(lead.data, null, 2)}
            </pre>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeadDetailModal;