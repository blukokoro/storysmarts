
import React from 'react';

const COLORS = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B'];

const ComicBreakdown: React.FC = () => {
  const comicBreakdown = [
    { category: "Concept & Character Design", amount: 75, percentage: 25 },
    { category: "Line Art & Inking", amount: 115, percentage: 38 },
    { category: "Coloring & Lettering", amount: 75, percentage: 25 },
    { category: "Layout & Final Assembly", amount: 34, percentage: 12 }
  ];

  return (
    <div>
      <h4 className="text-sm font-medium text-white mb-2">Comic Book Production Breakdown</h4>
      <div className="space-y-2">
        {comicBreakdown.map((item, index) => (
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

export default ComicBreakdown;
