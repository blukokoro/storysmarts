
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BudgetEstimate } from '@/types';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// Import the new component files
import ShortFilmBudgetSummary from './budget/ShortFilmBudgetSummary';
import CostFactorsBreakdown from './budget/CostFactorsBreakdown';
import ProjectTimeline from './budget/ProjectTimeline';
import BudgetDetailsSection from './budget/BudgetDetailsSection';

interface BudgetCalculatorProps {
  data: BudgetEstimate;
}

const BudgetCalculator: React.FC<BudgetCalculatorProps> = ({ data }) => {
  return (
    <Card className="glass-card h-full overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium text-white flex justify-between items-center">
          <span>Short Film Budget Estimate</span>
          <Button asChild variant="outline" size="sm" className="bg-primary/20 border-primary/40 text-primary hover:bg-primary/30">
            <Link to="/pricing">View Pricing Options</Link>
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Short Film Budget Summary */}
        <ShortFilmBudgetSummary data={data} />
        
        {/* Cost Factors and Breakdown - First visible section */}
        <CostFactorsBreakdown data={data} />
        
        {/* Timeline section */}
        <ProjectTimeline />
        
        {/* Additional detailed sections */}
        <BudgetDetailsSection data={data} />
      </CardContent>
    </Card>
  );
};

export default BudgetCalculator;
