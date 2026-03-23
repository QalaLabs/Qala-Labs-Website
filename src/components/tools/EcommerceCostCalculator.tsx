"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ShoppingCart, IndianRupee, Percent, Truck, Loader2, Info, PieChart, Zap } from 'lucide-react';
import { showSuccess, showError } from '@/utils/toast';
import { supabase } from "@/integrations/supabase/client";
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const EcommerceCostCalculator = () => {
  const [sellingPrice, setSellingPrice] = useState(1499);
  const [cogs, setCogs] = useState(450);
  const [referralFeePercent, setReferralFeePercent] = useState(15);
  const [closingFee, setClosingFee] = useState(40);
  const [shippingFee, setShippingFee] = useState(70);
  const [cpa, setCpa] = useState(300);
  const [otherFees, setOtherFees] = useState(0);
  
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // Calculations
  const referralFee = (sellingPrice * referralFeePercent) / 100;
  const totalMarketplaceFees = referralFee + closingFee + shippingFee + otherFees;
  const grossProfit = sellingPrice - cogs - totalMarketplaceFees;
  const netProfit = grossProfit - cpa;
  
  const grossMargin = (grossProfit / sellingPrice) * 100;
  const netMargin = (netProfit / sellingPrice) * 100;

  const handleCapture = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from('leads').insert({
      email,
      tool_used: 'ecommerce_cost_calculator',
      data: { 
        sellingPrice, 
        cogs, 
        referralFee, 
        cpa, 
        grossProfit, 
        netProfit,
        netMargin: netMargin.toFixed(2) + '%'
      }
    });

    setLoading(false);
    if (error) {
      showError("Something went wrong. Please try again.");
    } else {
      showSuccess("Profitability audit sent to your email!");
      setEmail("");
    }
  };

  return (
    <Card className="w-full max-w-5xl mx-auto bg-white/50 backdrop-blur-sm border-blue-100 shadow-xl overflow-hidden rounded-[2.5rem]">
      <CardHeader className="bg-slate-900 text-white p-8">
        <CardTitle className="flex items-center gap-3 text-2xl">
          <ShoppingCart className="w-8 h-8 text-blue-400" />
          Ecommerce Unit Economics Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-black uppercase text-slate-400">Selling Price (₹)</Label>
                <Input type="number" value={sellingPrice} onChange={(e) => setSellingPrice(Number(e.target.value))} className="rounded-xl h-12 border-slate-200" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-black uppercase text-slate-400">Product Cost / COGS (₹)</Label>
                <Input type="number" value={cogs} onChange={(e) => setCogs(Number(e.target.value))} className="rounded-xl h-12 border-slate-200" />
              </div>
            </div>

            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
              <h4 className="text-xs font-black uppercase tracking-widest text-blue-600 flex items-center gap-2">
                <Truck className="w-3 h-3" /> Marketplace Fees (Amazon/Flipkart)
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-[10px] font-bold text-slate-500">Referral Fee (%)</Label>
                  <Input type="number" value={referralFeePercent} onChange={(e) => setReferralFeePercent(Number(e.target.value))} className="h-10 rounded-lg" />
                </div>
                <div className="space-y-1">
                  <Label className="text-[10px] font-bold text-slate-500">Closing Fee (₹)</Label>
                  <Input type="number" value={closingFee} onChange={(e) => setClosingFee(Number(e.target.value))} className="h-10 rounded-lg" />
                </div>
                <div className="space-y-1">
                  <Label className="text-[10px] font-bold text-slate-500">Shipping/Weight (₹)</Label>
                  <Input type="number" value={shippingFee} onChange={(e) => setShippingFee(Number(e.target.value))} className="h-10 rounded-lg" />
                </div>
                <div className="space-y-1">
                  <Label className="text-[10px] font-bold text-slate-500">Other/Storage (₹)</Label>
                  <Input type="number" value={otherFees} onChange={(e) => setOtherFees(Number(e.target.value))} className="h-10 rounded-lg" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-black uppercase text-red-500 flex items-center gap-2">
                <Zap className="w-3 h-3" /> Marketing Cost / CPA (₹)
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger><Info className="w-3 h-3 text-slate-300" /></TooltipTrigger>
                    <TooltipContent><p className="text-xs">Cost per acquisition (Ad spend per order)</p></TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Input type="number" value={cpa} onChange={(e) => setCpa(Number(e.target.value))} className="rounded-xl h-12 border-red-100 bg-red-50/30" />
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <div className="space-y-4">
              {/* Gross Profit Card */}
              <div className="p-6 bg-white rounded-[2rem] border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Gross Profit (Pre-Ads)</p>
                  <Badge variant="outline" className="text-blue-600 border-blue-100">{grossMargin.toFixed(1)}% Margin</Badge>
                </div>
                <p className="text-4xl font-black text-slate-900">₹{grossProfit.toLocaleString()}</p>
              </div>

              {/* Net Profit Card */}
              <div className={cn(
                "p-8 rounded-[2.5rem] text-white shadow-2xl transition-all duration-500",
                netProfit > 0 ? "bg-blue-600 shadow-blue-500/20" : "bg-red-500 shadow-red-500/20"
              )}>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-blue-100 mb-1">Net Profit (Final)</p>
                    <p className="text-5xl font-black">₹{netProfit.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black uppercase tracking-widest text-blue-100 mb-1">Net Margin</p>
                    <p className="text-2xl font-black">{netMargin.toFixed(1)}%</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-white/10 text-xs text-blue-100 italic">
                  {netMargin > 20 ? "Excellent unit economics. Ready for aggressive scale." : 
                   netMargin > 10 ? "Healthy margins. Focus on increasing AOV to lift profitability." : 
                   netMargin > 0 ? "Thin margins. Optimize CPA or Marketplace fees immediately." : 
                   "Negative contribution. Stop ad spend and re-evaluate pricing/COGS."}
                </div>
              </div>
            </div>
            
            <form onSubmit={handleCapture} className="mt-8 space-y-4 bg-slate-900 p-8 rounded-[2rem] text-white">
              <p className="text-sm font-bold">Get a full P&L breakdown and scaling roadmap.</p>
              <div className="flex gap-2">
                <Input 
                  placeholder="Work email" 
                  type="email" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-xl h-12 bg-white/10 border-white/10 text-white placeholder:text-slate-500"
                />
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 h-12 px-8 rounded-xl font-black" disabled={loading}>
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Get Audit"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EcommerceCostCalculator;