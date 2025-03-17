
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BudgetEstimate } from '@/types';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// Import the component files
import ShortFilmBudgetSummary from './budget/ShortFilmBudgetSummary';
import CostFactorsBreakdown from './budget/CostFactorsBreakdown';
import ProjectTimeline from './budget/ProjectTimeline';
import BudgetDetailsSection from './budget/BudgetDetailsSection';
import PaymentPlansSection from './budget/PaymentPlansSection';
import { useComicPricingCalculator } from './budget/ComicPricingCalculator';

interface BudgetCalculatorProps {
  data: BudgetEstimate;
}

const BudgetCalculator: React.FC<BudgetCalculatorProps> = ({ data }) => {
  const [installmentPeriod, setInstallmentPeriod] = useState<'1' | '2' | '3'>('3');
  
  // Calculate installment amounts for the film budget
  const filmMonthlyAmount = Math.ceil(data.totalEstimate / parseInt(installmentPeriod));
  
  // Get comic book pricing using our hook
  const { comicTotalEstimate, comicMonthlyAmount } = useComicPricingCalculator({ 
    installmentPeriod 
  });

  return (
    <Card className="glass-card h-full overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium text-white flex justify-between items-center">
          <span>Budget Estimate</span>
          <Button asChild variant="outline" size="sm" className="bg-primary/20 border-primary/40 text-primary hover:bg-primary/30">
            <Link to="/pricing">View Pricing Options</Link>
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Short Film Budget Summary */}
        <ShortFilmBudgetSummary data={data} />
        
        {/* Payment plan tabs */}
        <PaymentPlansSection 
          data={data}
          installmentPeriod={installmentPeriod}
          setInstallmentPeriod={setInstallmentPeriod}
          filmMonthlyAmount={filmMonthlyAmount}
          comicTotalEstimate={comicTotalEstimate}
          comicMonthlyAmount={comicMonthlyAmount}
        />
        
        {/* Cost Factors and Breakdown */}
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
