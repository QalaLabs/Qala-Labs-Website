"use client";

import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { calculateLeadScore } from '@/utils/admin';

interface ScoreDistributionChartProps {
  leads: any[];
}

const ScoreDistributionChart = ({ leads }: ScoreDistributionChartProps) => {
  const chartData = useMemo(() => {
    const buckets = { Low: 0, Medium: 0, High: 0 };
    leads.forEach(lead => {
      const score = calculateLeadScore(lead);
      if (score >= 50) buckets.High++;
      else if (score >= 30) buckets.Medium++;
      else buckets.Low++;
    });
    
    return [
      { name: 'Low (0-29)', count: buckets.Low, color: '#94a3b8' },
      { name: 'Medium (30-49)', count: buckets.Medium, color: '#60a5fa' },
      { name: 'High (50+)', count: buckets.High, color: '#2563eb' },
    ];
  }, [leads]);

  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94a3b8', fontSize: 10 }}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94a3b8', fontSize: 10 }}
          />
          <Tooltip 
            cursor={{ fill: '#f8fafc' }}
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
          />
          <Bar dataKey="count" radius={[6, 6, 0, 0]} name="Leads">
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ScoreDistributionChart;