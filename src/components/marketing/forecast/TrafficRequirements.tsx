
import React from 'react';

interface TrafficRequirementsProps {
  forecastData: {
    dailyViews: number;
    weeklyViews: number;
    monthlyViews: number;
  } | null;
}

const TrafficRequirements: React.FC<TrafficRequirementsProps> = ({ forecastData }) => {
  if (!forecastData) return null;
  
  return (
    <div className="p-4 bg-black/30 rounded-lg border border-white/10 space-y-4">
      <h3 className="text-sm font-medium">Required Traffic</h3>
      
      <div className="grid grid-cols-3 gap-3">
        <div className="p-2 bg-black/40 rounded-lg text-center">
          <p className="text-xs text-gray-400">Daily Views</p>
          <p className="text-lg font-bold">{forecastData.dailyViews.toLocaleString()}</p>
        </div>
        <div className="p-2 bg-black/40 rounded-lg text-center">
          <p className="text-xs text-gray-400">Weekly Views</p>
          <p className="text-lg font-bold">{forecastData.weeklyViews.toLocaleString()}</p>
        </div>
        <div className="p-2 bg-black/40 rounded-lg text-center">
          <p className="text-xs text-gray-400">Monthly Views</p>
          <p className="text-lg font-bold">{forecastData.monthlyViews.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default TrafficRequirements;
