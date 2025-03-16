
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from 'recharts';

interface PlatformBreakdownChartProps {
  platformBreakdown: Array<{
    platform: string;
    sales: number;
    color: string;
  }> | null;
  customTarget: string;
}

const PlatformBreakdownChart: React.FC<PlatformBreakdownChartProps> = ({ platformBreakdown, customTarget }) => {
  if (!platformBreakdown) return null;

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={platformBreakdown} 
          layout="vertical" 
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis type="number" />
          <YAxis dataKey="platform" type="category" width={80} />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const targetNum = parseInt(customTarget);
                return (
                  <div className="bg-black/90 border border-gray-700 p-2 rounded text-white text-xs">
                    <p className="font-medium">{payload[0].payload.platform}</p>
                    <p>{`Estimated Sales: ${payload[0].value}`}</p>
                    <p>{`Percentage: ${Math.round((payload[0].value / targetNum) * 100)}%`}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar 
            dataKey="sales" 
            name="Projected Sales" 
            radius={[0, 4, 4, 0]}
          >
            {platformBreakdown.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PlatformBreakdownChart;
