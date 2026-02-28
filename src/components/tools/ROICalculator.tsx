"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Target, Loader2 } from 'lucide-react';
import { showSuccess, showError } from '@/utils/toast';
import { supabase } from "@/integrations/supabase/client";

const ROICalculator = () => {
  const [adSpend, setAdSpend] = useState(5000);
  const [cpa, setCpa] = useState(50);
  const [avgOrderValue, setAvgOrderValue] = useState(120);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    const conversions = adSpend / cpa;
    const revenue = conversions * avgOrderValue;
    setResults([
      { name: 'Current', revenue: revenue, spend: adSpend },
      { name: 'Projected (+20%)', revenue: revenue * 1.2, spend: adSpend },
    ]);
  }, [adSpend, cpa, avgOrderValue]);

  const handleCapture = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const revenue = (adSpend / cpa) * avgOrderValue;
    const roas = revenue / adSpend;

    const { error } = await supabase.from('leads').insert({
      email,
      tool_used: 'roi_calculator',
      data: { adSpend, cpa, avgOrderValue, revenue, roas }
    });

    setLoading(false);
    if (error) {
      showError("Something went wrong. Please try again.");
    } else {
      showSuccess("Strategy report sent to your email!");
      setEmail("");
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white/50 backdrop-blur-sm border-blue-100 shadow-xl">
      <CardHeader className="bg-blue-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Target className="w-6 h-6" />
          Ad Spend ROI Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Monthly Ad Spend ($)</Label>
              <Input type="number" value={adSpend} onChange={(e) => setAdSpend(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label>Target CPA ($)</Label>
              <Input type="number" value={cpa} onChange={(e) => setCpa(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label>Average Order Value ($)</Label>
              <Input type="number" value={avgOrderValue} onChange={(e) => setAvgOrderValue(Number(e.target.value))} />
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 mt-6">
              <h4 className="font-bold text-blue-900 mb-2">Estimated Results</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-blue-600 uppercase font-bold">Revenue</p>
                  <p className="text-2xl font-bold text-blue-900">${((adSpend / cpa) * avgOrderValue).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-blue-600 uppercase font-bold">ROAS</p>
                  <p className="text-2xl font-bold text-blue-900">{((adSpend / cpa * avgOrderValue) / adSpend).toFixed(2)}x</p>
                </div>
              </div>
            </div>
          </div>

          <div className="h-[300px] flex flex-col">
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={results}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#3b82f6" name="Revenue" />
                  <Bar dataKey="spend" fill="#94a3b8" name="Ad Spend" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <form onSubmit={handleCapture} className="mt-6 space-y-3">
              <p className="text-sm text-gray-600">Get a detailed PDF growth strategy based on these numbers.</p>
              <div className="flex gap-2">
                <Input 
                  placeholder="Enter your email" 
                  type="email" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={loading}>
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Get Report"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ROICalculator;