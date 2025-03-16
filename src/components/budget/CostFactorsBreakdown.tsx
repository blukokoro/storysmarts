
import React from 'react';
import { BudgetEstimate } from '@/types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface CostFactorsBreakdownProps {
  data: BudgetEstimate;
}

const COLORS = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B'];

const CostFactorsBreakdown: React.FC<CostFactorsBreakdownProps> = ({ data }) => {
  const chartData = data.breakdown.map(item => ({
    name: item.category,
    value: item.amount
  }));

  return (
    <div className="flex flex-col md:flex-row mb-6 gap-4">
      <div className="md:w-1/2">
        <h4 className="text-sm font-medium text-white mb-2">Short Film Cost Factors</h4>
        <div className="space-y-2">
          {data.factors.map((factor, index) => (
            <div key={index} className="bg-black/20 backdrop-blur-sm p-2 rounded border border-white/5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-300">{factor.name}</span>
                <span className="text-xs font-medium text-primary">×{factor.impact}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">{factor.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="md:w-1/2">
        <h4 className="text-sm font-medium text-white mb-2">Short Film Cost Breakdown</h4>
        <div className="h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={60}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                    stroke="rgba(0,0,0,0.3)"
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`€${value}`, 'Amount']}
                contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', border: '1px solid rgba(255, 255, 255, 0.1)' }}
                itemStyle={{ color: '#fff' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CostFactorsBreakdown;
