"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { TrendingUp, Calculator } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

const ProfitabilityEstimator = () => {
  const [gmv, setGmv] = useState(100000);
  const [margin, setMargin] = useState(20);
  const [growth, setGrowth] = useState(30);

  const projectedGmv = gmv * (1 + growth / 100);
  const projectedProfit = projectedGmv * (margin / 100);

  const handleCapture = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess("Profitability analysis sent!");
  };

  return (
    <Card className="w-full max-w-2xl mx-auto border-blue-100 shadow-lg">
      <CardHeader className="bg-slate-900 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5" />
          E-com Profitability Estimator
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label>Current Annual GMV ($)</Label>
            <Input type="number" value={gmv} onChange={(e) => setGmv(Number(e.target.value))} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Net Margin (%)</Label>
              <Input type="number" value={margin} onChange={(e) => setMargin(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label>Target Growth (%)</Label>
              <Input type="number" value={growth} onChange={(e) => setGrowth(Number(e.target.value))} />
            </div>
          </div>
        </div>

        <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-sm text-blue-600 font-bold uppercase">Projected Annual Profit</p>
              <p className="text-4xl font-black text-blue-900">${projectedProfit.toLocaleString()}</p>
            </div>
            <TrendingUp className="w-12 h-12 text-blue-200" />
          </div>
        </div>

        <form onSubmit={handleCapture} className="space-y-3">
          <p className="text-sm text-slate-500">Get the full breakdown of how to hit these numbers.</p>
          <div className="flex gap-2">
            <Input placeholder="Work email" type="email" required />
            <Button type="submit" className="bg-blue-600">Scale Now</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfitabilityEstimator;