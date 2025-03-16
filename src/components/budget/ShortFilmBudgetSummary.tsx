
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BudgetEstimate } from '@/types';

interface ShortFilmBudgetSummaryProps {
  data: BudgetEstimate;
}

const ShortFilmBudgetSummary: React.FC<ShortFilmBudgetSummaryProps> = ({ data }) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-gray-400">Base Amount</p>
          <p className="text-2xl font-semibold text-white">€{data.baseAmount}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Total Estimate</p>
          <p className="text-2xl font-semibold text-primary">€{data.totalEstimate}</p>
        </div>
      </div>
      
      <Button asChild className="w-full mt-6">
        <Link to="/pricing">
          See Full Pricing Details
        </Link>
      </Button>
    </div>
  );
};

export default ShortFilmBudgetSummary;
