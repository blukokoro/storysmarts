
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface SalesProjectionChartProps {
  projections: Array<{
    week: number;
    expected: number;
    pessimistic: number;
    optimistic: number;
  }> | null;
}

const SalesProjectionChart: React.FC<SalesProjectionChartProps> = ({ projections }) => {
  if (!projections) {
    return (
      <div className="h-64 flex items-center justify-center bg-black/30 rounded-lg border border-white/10">
        <p className="text-gray-400">Enter a target sales volume and generate a forecast to see projections</p>
      </div>
    );
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={projections}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="week" label={{ value: 'Week', position: 'insideBottomRight', offset: 0 }} />
          <YAxis label={{ value: 'Sales Volume', angle: -90, position: 'insideLeft' }} />
          <Tooltip 
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-black/90 border border-gray-700 p-2 rounded text-white text-xs">
                    <p className="font-medium">{`Week ${label}`}</p>
                    <p className="text-green-400">{`Optimistic: ${payload[2].value} sales`}</p>
                    <p className="text-blue-400">{`Expected: ${payload[0].value} sales`}</p>
                    <p className="text-red-400">{`Pessimistic: ${payload[1].value} sales`}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend />
          <Line type="monotone" dataKey="expected" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} name="Expected" />
          <Line type="monotone" dataKey="pessimistic" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} name="Pessimistic" />
          <Line type="monotone" dataKey="optimistic" stroke="#22c55e" strokeWidth={2} dot={{ r: 4 }} name="Optimistic" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesProjectionChart;
