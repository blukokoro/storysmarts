
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BudgetProjections from '@/components/marketing/BudgetProjections';
import ContentStrategy from '@/components/marketing/ContentStrategy';
import RevenueAnalysis from '@/components/marketing/RevenueAnalysis';
import SalesForecasting from '@/components/marketing/SalesForecasting';

interface MarketingTabsContainerProps {
  showNewFeatures: boolean;
  platformCpmData: Array<{ platform: string; cpm: number; color: string }>;
  budgetAllocationData: Array<{ name: string; value: number; color: string }>;
  estimatedAdBudget: number;
  smallReach: { impressions: number; conversions: number; revenue: number; adSpend: number };
  mediumReach: { impressions: number; conversions: number; revenue: number; adSpend: number };
  largeReach: { impressions: number; conversions: number; revenue: number; adSpend: number };
  targetSales: number;
  impressionsNeeded: number;
  averagePrice: number;
  reachProjectionData: Array<{ posts: number; reach: number; engagementRate: number }>;
  priceData: Array<{ price: number; units: number }>;
  productionCost: number;
}

const MarketingTabsContainer: React.FC<MarketingTabsContainerProps> = ({
  showNewFeatures,
  platformCpmData,
  budgetAllocationData,
  estimatedAdBudget,
  smallReach,
  mediumReach,
  largeReach,
  targetSales,
  impressionsNeeded,
  averagePrice,
  reachProjectionData,
  priceData,
  productionCost
}) => {
  return (
    <Tabs defaultValue="budget" className="w-full">
      <TabsList className="grid grid-cols-3 md:grid-cols-4 bg-black/30 backdrop-blur-md border border-white/10 mb-6">
        <TabsTrigger value="budget" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
          Advertising Budget
        </TabsTrigger>
        <TabsTrigger value="content" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
          Content Strategy
        </TabsTrigger>
        <TabsTrigger value="projection" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
          Revenue Projections
        </TabsTrigger>
        {showNewFeatures && (
          <TabsTrigger value="sales" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            Sales Forecasting
          </TabsTrigger>
        )}
      </TabsList>
      
      <TabsContent value="budget" className="focus-visible:outline-none focus-visible:ring-0">
        <BudgetProjections
          platformCpmData={platformCpmData}
          budgetAllocationData={budgetAllocationData}
          estimatedAdBudget={estimatedAdBudget}
          smallReach={smallReach}
          mediumReach={mediumReach}
          largeReach={largeReach}
          targetSales={targetSales}
          impressionsNeeded={impressionsNeeded}
          averagePrice={averagePrice}
        />
      </TabsContent>
      
      <TabsContent value="content" className="focus-visible:outline-none focus-visible:ring-0">
        <ContentStrategy
          reachProjectionData={reachProjectionData}
        />
      </TabsContent>
      
      <TabsContent value="projection" className="focus-visible:outline-none focus-visible:ring-0">
        <RevenueAnalysis
          productionCost={productionCost}
          estimatedAdBudget={estimatedAdBudget}
          impressionsNeeded={impressionsNeeded}
          targetSales={targetSales}
          averagePrice={averagePrice}
          priceData={priceData}
        />
      </TabsContent>
      
      {showNewFeatures && (
        <TabsContent value="sales" className="focus-visible:outline-none focus-visible:ring-0">
          <SalesForecasting 
            productionCost={productionCost}
            averagePrice={averagePrice}
            estimatedAdBudget={estimatedAdBudget}
            targetSales={targetSales}
            platformCpmData={platformCpmData}
          />
        </TabsContent>
      )}
    </Tabs>
  );
};

export default MarketingTabsContainer;
