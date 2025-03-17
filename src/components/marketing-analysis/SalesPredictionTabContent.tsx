
import React from 'react';

interface SalesPredictionTabContentProps {
  productionCost: number;
  averagePrice: number;
  targetSales: number;
  impressionsNeeded: number;
  minAdBudget: number;
  maxAdBudget: number;
  cpmRange: { min: number; max: number };
}

const SalesPredictionTabContent: React.FC<SalesPredictionTabContentProps> = ({
  productionCost,
  averagePrice,
  targetSales,
  impressionsNeeded,
  minAdBudget,
  maxAdBudget,
  cpmRange
}) => {
  return (
    <div className="mb-4">
      <div className="bg-black/30 p-4 rounded-lg border border-primary/20 mb-4">
        <h4 className="text-sm font-medium text-primary mb-3">Sales Projection</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-400 mb-1">Estimated Production Cost</p>
            <p className="text-lg font-semibold">€{productionCost.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">Break-Even Sales Target</p>
            <p className="text-lg font-semibold">{targetSales.toLocaleString()} copies</p>
            <p className="text-xs text-gray-400 mt-1">at €{averagePrice} per copy</p>
          </div>
        </div>
      </div>
      
      <div className="bg-black/30 p-4 rounded-lg border border-white/5 mb-4">
        <h4 className="text-sm font-medium text-primary mb-3">Advertising Budget</h4>
        <div className="space-y-2">
          <div>
            <p className="text-xs text-gray-400 mb-1">Impressions Needed</p>
            <p className="font-medium">{Math.ceil(impressionsNeeded).toLocaleString()}</p>
            <p className="text-xs text-gray-400 mt-1">Based on 1% conversion rate</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">Estimated Ad Budget</p>
            <p className="font-medium">€{Math.ceil(minAdBudget).toLocaleString()} - €{Math.ceil(maxAdBudget).toLocaleString()}</p>
            <p className="text-xs text-gray-400 mt-1">Based on CPM €{cpmRange.min.toFixed(2)} - €{cpmRange.max.toFixed(2)}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-black/30 p-4 rounded-lg border border-white/5">
        <h4 className="text-sm font-medium text-primary mb-2">Optimization Recommendations</h4>
        <ul className="text-xs space-y-1">
          <li>• Target high-converting audiences to improve 1% rate</li>
          <li>• Test different ad creatives to lower acquisition cost</li>
          <li>• Start with €{Math.ceil(minAdBudget / 3).toLocaleString()} budget and scale based on results</li>
          <li>• Retarget website visitors to increase conversion rate</li>
        </ul>
      </div>
    </div>
  );
};

export default SalesPredictionTabContent;
