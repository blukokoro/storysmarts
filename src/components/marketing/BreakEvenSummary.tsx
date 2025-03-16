
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface BreakEvenSummaryProps {
  productionCost: number;
  targetSales: number;
  impressionsNeeded: number;
  estimatedAdBudget: number;
}

const BreakEvenSummary: React.FC<BreakEvenSummaryProps> = ({
  productionCost,
  targetSales,
  impressionsNeeded,
  estimatedAdBudget
}) => {
  return (
    <div className="mb-12">
      <h1 className="text-4xl font-bold mb-4">Marketing Plan</h1>
      <p className="text-gray-400 max-w-3xl">
        This comprehensive analysis provides detailed advertising budget projections, content strategy recommendations, 
        and revenue forecasts to optimize your marketing efforts.
      </p>
      
      <div className="mt-6 p-6 rounded-lg bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Break-Even Analysis</h2>
            <p className="text-sm text-gray-400 mb-4">Based on your production costs and average selling price</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                <p className="text-xs text-gray-400">Production Cost</p>
                <p className="text-lg font-bold">€{productionCost}</p>
              </div>
              <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                <p className="text-xs text-gray-400">Sales Needed</p>
                <p className="text-lg font-bold">{targetSales} copies</p>
              </div>
              <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                <p className="text-xs text-gray-400">Impressions Needed</p>
                <p className="text-lg font-bold">{Math.ceil(impressionsNeeded).toLocaleString()}</p>
              </div>
              <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                <p className="text-xs text-gray-400">Ad Budget Estimate</p>
                <p className="text-lg font-bold">€{estimatedAdBudget}</p>
              </div>
            </div>
          </div>
          
          <Button className="bg-primary hover:bg-primary/90" size="lg">
            <Download className="w-4 h-4 mr-2" />
            Download Full Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BreakEvenSummary;
