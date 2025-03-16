
import React, { useState } from 'react';
import BreakEvenSummary from '@/components/marketing/BreakEvenSummary';
import AIContentStrategy from '@/components/marketing/AIContentStrategy';
import AIContentGenerationBanner from '@/components/marketing/AIContentGenerationBanner';
import FeatureToggle from '@/components/marketing/FeatureToggle';
import MarketingTabsContainer from '@/components/marketing/MarketingTabsContainer';

// Import data and utility functions
import { 
  platformCpmData, 
  budgetAllocationData, 
  reachProjectionData, 
  productionCost 
} from '@/constants/marketingData';
import { 
  calculateProjections, 
  calculateBreakEvenMetrics, 
  generatePriceData 
} from '@/utils/marketingCalculations';

const MarketingPlan = () => {
  // State for toggling new features
  const [showNewFeatures, setShowNewFeatures] = useState(false);
  
  // Get break-even metrics
  const { targetSales, impressionsNeeded, estimatedAdBudget, averagePrice } = calculateBreakEvenMetrics(productionCost);
  
  // Revenue projection scenarios
  const smallReach = calculateProjections(50000);
  const mediumReach = calculateProjections(100000);
  const largeReach = calculateProjections(250000);
  
  // Data for price sensitivity chart
  const priceData = generatePriceData(productionCost);
  
  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-8">
      <div id="marketing-plan" className="max-w-6xl mx-auto">
        <BreakEvenSummary
          productionCost={productionCost}
          targetSales={targetSales}
          impressionsNeeded={impressionsNeeded}
          estimatedAdBudget={estimatedAdBudget}
        />
        
        {/* AI Content Tab moved directly below BreakEvenSummary */}
        <div className="mt-6">
          <AIContentStrategy 
            reachProjectionData={reachProjectionData}
          />
        </div>
        
        {/* AI Content Generation Banner */}
        <AIContentGenerationBanner />
        
        {/* Feature Toggle Button */}
        <FeatureToggle 
          showNewFeatures={showNewFeatures} 
          setShowNewFeatures={setShowNewFeatures} 
        />
        
        {/* Marketing Tabs Container */}
        <MarketingTabsContainer 
          showNewFeatures={showNewFeatures}
          platformCpmData={platformCpmData}
          budgetAllocationData={budgetAllocationData}
          estimatedAdBudget={estimatedAdBudget}
          smallReach={smallReach}
          mediumReach={mediumReach}
          largeReach={largeReach}
          targetSales={targetSales}
          impressionsNeeded={impressionsNeeded}
          averagePrice={averagePrice}
          reachProjectionData={reachProjectionData}
          priceData={priceData}
          productionCost={productionCost}
        />
      </div>
    </div>
  );
};

export default MarketingPlan;
