"use client";

import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, parseISO, subDays } from 'date-fns';

interface LeadsOverTimeChartProps {
  leads: any[];
}

const LeadsOverTimeChart = ({ leads }: LeadsOverTimeChartProps) => {
  const chartData = useMemo(() => {
    const now = new Date();
    const days = Array.from({ length: 30 }, (_, i) => {
      const d = subDays(now, 29 - i);
      return format(d, 'MMM dd');
    });

    const counts = leads.reduce((acc: Record<string, number>, lead) => {
      try {
        const day = format(parseISO(lead.created_at), 'MMM dd');
        acc[day] = (acc[day] || 0) + 1;
      } catch (e) {
        console.error("Error parsing date for lead:", lead.id);
      }
      return acc;
    }, {});

    return days.map(day => ({ name: day, count: counts[day] || 0 }));
  }, [leads]);

  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94a3b8', fontSize: 10 }}
            interval={6}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94a3b8', fontSize: 10 }}
          />
          <Tooltip 
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
          />
          <Area 
            type="monotone" 
            dataKey="count" 
            stroke="#2563eb" 
            strokeWidth={3} 
            fillOpacity={1} 
            fill="url(#colorLeads)" 
            name="Leads"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LeadsOverTimeChart;