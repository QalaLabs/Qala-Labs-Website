"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Loader2, Info } from 'lucide-react';
import { showSuccess, showError } from '@/utils/toast';
import { supabase } from "@/integrations/supabase/client";
import { cn } from '@/lib/utils';

const LTVCalculator = () => {
  const [aov, setAov] = useState(5000);
  const [frequency, setFrequency] = useState(3);
  const [retentionYears, setRetentionYears] = useState(2);
  const [cac, setCac] = useState(1500);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const data = Array.from({ length: 6 }).map((_, i) => ({
      month: i * 6,
      value: (aov * (frequency / 2) * (i * 0.5))
    }));
    setChartData(data);
  }, [aov, frequency, retentionYears, cac]);

  const handleCapture = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const ltv = aov * frequency * retentionYears;
    const leadData = { aov, frequency, retentionYears, cac, ltv, ratio: ltv/cac };

    // 1. Capture in Supabase
    const { error } = await supabase.from('leads').insert({
      email,
      tool_used: 'ltv_calculator',
      data: leadData
    });

    if (error) {
      setLoading(false);
      showError("Something went wrong. Please try again.");
    } else {
      // 2. Trigger immediate personalized email
      try {
        await fetch('/api/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            email, 
            tool_used: 'ltv_calculator', 
            data: leadData 
          })
        });
      } catch (err) {
        console.error("Email trigger failed:", err);
      }

      setLoading(false);
      showSuccess("LTV audit sent to your email!");
      setEmail("");
    }
  };

  const ltv = aov * frequency * retentionYears;
  const ratio = ltv / cac;

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white/50 backdrop-blur-sm border-indigo-100 shadow-xl overflow-hidden rounded-[2.5rem]">
      <CardHeader className="bg-slate-900 text-white p-8">
        <CardTitle className="flex items-center gap-3 text-2xl">
          <TrendingUp className="w-8 h-8 text-blue-400" />
          LTV : CAC Unit Economics
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Avg. Order Value (₹)</Label>
                <Input type="number" value={aov} onChange={(e) => setAov(Number(e.target.value))} className="rounded-xl h-12" />
              </div>
              <div className="space-y-2">
                <Label>Purchase Frequency</Label>
                <Input type="number" value={frequency} onChange={(e) => setFrequency(Number(e.target.value))} className="rounded-xl h-12" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Retention (Years)</Label>
                <Input type="number" value={retentionYears} onChange={(e) => setRetentionYears(Number(e.target.value))} className="rounded-xl h-12" />
              </div>
              <div className="space-y-2">
                <Label>Customer Acq. Cost (₹)</Label>
                <Input type="number" value={cac} onChange={(e) => setCac(Number(e.target.value))} className="rounded-xl h-12" />
              </div>
            </div>
            
            <div className="p-8 bg-blue-600 rounded-[2rem] text-white shadow-xl shadow-blue-500/20">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-blue-100 mb-1">Estimated LTV</p>
                  <p className="text-4xl font-black">₹{ltv.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black uppercase tracking-widest text-blue-100 mb-1">LTV:CAC Ratio</p>
                  <p className={cn("text-3xl font-black", ratio >= 3 ? "text-green-300" : "text-amber-300")}>
                    {ratio.toFixed(1)}x
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="h-[250px] mb-8">
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">LTV Growth Curve (Months)</p>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                    formatter={(value) => `₹${Number(value).toLocaleString()}`} 
                  />
                  <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={4} dot={{r: 4, fill: '#2563eb'}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <form onSubmit={handleCapture} className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <p className="text-sm font-bold text-slate-900">Download your custom retention roadmap.</p>
              <div className="flex gap-2">
                <Input 
                  placeholder="Work email" 
                  type="email" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-xl h-12 bg-white px-4"
                />
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 h-12 px-6 rounded-xl font-bold" disabled={loading}>
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Get Roadmap"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LTVCalculator;