"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { TrendingUp, Calculator, Loader2 } from 'lucide-react';
import { showSuccess, showError } from '@/utils/toast';
import { supabase } from "@/integrations/supabase/client";

const ProfitabilityEstimator = () => {
  const [gmv, setGmv] = useState(8000000);
  const [margin, setMargin] = useState(20);
  const [growth, setGrowth] = useState(30);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const projectedGmv = gmv * (1 + growth / 100);
  const projectedProfit = projectedGmv * (margin / 100);

  const handleCapture = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const leadData = { 
      current_gmv: gmv, 
      net_margin: margin, 
      target_growth: growth,
      projected_profit: projectedProfit 
    };

    // 1. Capture in Supabase
    const { error } = await supabase.from('leads').insert({
      email,
      tool_used: 'profitability_estimator',
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
            tool_used: 'profitability_estimator', 
            data: leadData 
          })
        });
      } catch (err) {
        console.error("Email trigger failed:", err);
      }

      setLoading(false);
      showSuccess("Profitability analysis sent to your email!");
      setEmail("");
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto border-blue-100 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader className="bg-slate-900 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5" />
          E-com Profitability Estimator (₹)
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label>Current Annual GMV (₹)</Label>
            <Input 
              type="number" 
              value={gmv} 
              onChange={(e) => setGmv(Number(e.target.value))} 
              className="rounded-xl"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Net Margin (%)</Label>
              <Input 
                type="number" 
                value={margin} 
                onChange={(e) => setMargin(Number(e.target.value))} 
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label>Target Growth (%)</Label>
              <Input 
                type="number" 
                value={growth} 
                onChange={(e) => setGrowth(Number(e.target.value))} 
                className="rounded-xl"
              />
            </div>
          </div>
        </div>

        <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest mb-1">Projected Annual Profit</p>
              <p className="text-4xl font-black text-blue-900">₹{projectedProfit.toLocaleString()}</p>
            </div>
            <TrendingUp className="w-12 h-12 text-blue-200" />
          </div>
        </div>

        <form onSubmit={handleCapture} className="space-y-3">
          <p className="text-sm text-slate-500">Get the full breakdown of how to hit these numbers.</p>
          <div className="flex gap-2">
            <Input 
              placeholder="Work email" 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl px-4"
            />
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 rounded-xl px-6" disabled={loading}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Scale Now"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfitabilityEstimator;