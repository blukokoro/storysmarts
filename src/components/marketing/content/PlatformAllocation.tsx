
import React from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  Cell
} from 'recharts';
import { Platform } from '@/types/marketing';

interface PlatformAllocationProps {
  platformAllocation: Platform[];
  totalContentNeeded: number;
}

const PlatformAllocation: React.FC<PlatformAllocationProps> = ({ 
  platformAllocation,
  totalContentNeeded
}) => {
  return (
    <div className="h-64">
      <h3 className="text-sm font-medium mb-2">Platform Allocation</h3>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          data={platformAllocation}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="name" />
          <YAxis label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft' }} />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const platform = payload[0].payload;
                return (
                  <div className="bg-black/90 border border-gray-700 p-2 rounded text-white text-xs">
                    <p className="font-medium">{platform.name}</p>
                    <p>{`Allocation: ${platform.percentage}%`}</p>
                    <p>{`Content pieces: ${Math.round(totalContentNeeded * platform.percentage / 100)}`}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="percentage">
            {platformAllocation.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PlatformAllocation;
