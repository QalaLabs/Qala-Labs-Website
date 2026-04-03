"use client";

import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ToolDistributionChartProps {
  leads: any[];
}

const COLORS = ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe', '#dbeafe'];

const ToolDistributionChart = ({ leads }: ToolDistributionChartProps) => {
  const chartData = useMemo(() => {
    const counts = leads.reduce((acc: Record<string, number>, lead) => {
      const tool = lead.tool_used.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());
      acc[tool] = (acc[tool] || 0) + 1;
      return acc;
    }, {});
    
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);
  }, [leads]);

  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36} 
            iconType="circle" 
            wrapperStyle={{ fontSize: '10px', fontWeight: 'bold' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ToolDistributionChart;