
import React from 'react';
import { BudgetEstimate } from '@/types';
import BudgetPieChart, { PieChartData } from '../charts/BudgetPieChart';

interface CostFactorsBreakdownProps {
  data: BudgetEstimate;
}

const COLORS = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B'];

const CostFactorsBreakdown: React.FC<CostFactorsBreakdownProps> = ({ data }) => {
  const chartData: PieChartData[] = data.breakdown.map((item, index) => ({
    name: item.category,
    value: item.amount,
    color: COLORS[index % COLORS.length]
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
        <BudgetPieChart data={chartData} colors={COLORS} />
      </div>
    </div>
  );
};

export default CostFactorsBreakdown;
