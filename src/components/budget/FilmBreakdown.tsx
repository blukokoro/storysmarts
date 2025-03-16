
import React from 'react';
import { BudgetEstimate } from '@/types';

interface FilmBreakdownProps {
  data: BudgetEstimate;
}

const COLORS = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B'];

const FilmBreakdown: React.FC<FilmBreakdownProps> = ({ data }) => {
  return (
    <div>
      <h4 className="text-sm font-medium text-white mb-2">AI Short Film Breakdown</h4>
      <div className="space-y-2">
        {data.breakdown.map((item, index) => (
          <div 
            key={index} 
            className="flex items-center justify-between py-1 border-b border-white/5 last:border-0"
          >
            <div className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></div>
              <span className="text-sm text-gray-300">{item.category}</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-300 mr-2">€{item.amount}</span>
              <span className="text-xs text-gray-500">{item.percentage}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilmBreakdown;
