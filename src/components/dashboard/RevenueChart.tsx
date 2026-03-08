"use client";

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'Week 1', revenue: 450000, target: 400000 },
  { name: 'Week 2', revenue: 520000, target: 450000 },
  { name: 'Week 3', revenue: 480000, target: 500000 },
  { name: 'Week 4', revenue: 610000, target: 550000 },
  { name: 'Week 5', revenue: 750000, target: 600000 },
  { name: 'Week 6', revenue: 890000, target: 650000 },
  { name: 'Week 7', revenue: 1245000, target: 700000 },
];

const RevenueChart = () => {
  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            tickFormatter={(value) => `₹${value / 1000}k`}
          />
          <Tooltip 
            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
            formatter={(value) => [`₹${Number(value).toLocaleString()}`, '']}
          />
          <Legend iconType="circle" />
          <Area 
            type="monotone" 
            dataKey="revenue" 
            stroke="#2563eb" 
            strokeWidth={3} 
            fillOpacity={1} 
            fill="url(#colorRev)" 
            name="Actual Revenue"
          />
          <Area 
            type="monotone" 
            dataKey="target" 
            stroke="#94a3b8" 
            strokeWidth={2} 
            strokeDasharray="5 5" 
            fill="transparent" 
            name="Forecasted Target"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;