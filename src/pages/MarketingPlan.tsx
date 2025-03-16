
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BudgetProjections from '@/components/marketing/BudgetProjections';
import ContentStrategy from '@/components/marketing/ContentStrategy';
import RevenueAnalysis from '@/components/marketing/RevenueAnalysis';
import BreakEvenSummary from '@/components/marketing/BreakEvenSummary';
import SalesForecasting from '@/components/marketing/SalesForecasting'; 
import AIContentStrategy from '@/components/marketing/AIContentStrategy';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';

const MarketingPlan = () => {
  // State for toggling new features
  const [showNewFeatures, setShowNewFeatures] = useState(false);

  // Platform CPM data (2023)
  const platformCpmData = [
    { platform: 'LinkedIn', cpm: 6.59, color: '#0077B5' },
    { platform: 'Instagram', cpm: 6.29, color: '#E1306C' },
    { platform: 'Facebook', cpm: 5.82, color: '#1877F2' },
    { platform: 'TikTok', cpm: 3.86, color: '#000000' },
    { platform: 'Snapchat', cpm: 2.95, color: '#FFFC00' },
    { platform: 'Twitter', cpm: 2.19, color: '#1DA1F2' },
  ];
  
  // Content reach projection data
  const reachProjectionData = [
    { posts: 2, reach: 1000, engagementRate: 3.2 },
    { posts: 4, reach: 2100, engagementRate: 3.0 },
    { posts: 6, reach: 3300, engagementRate: 2.8 },
    { posts: 8, reach: 4600, engagementRate: 2.5 },
    { posts: 10, reach: 6000, engagementRate: 2.3 },
    { posts: 12, reach: 7500, engagementRate: 2.1 },
    { posts: 14, reach: 9000, engagementRate: 1.9 },
    { posts: 16, reach: 10500, engagementRate: 1.7 },
  ];
  
  // Budget allocation data
  const budgetAllocationData = [
    { name: 'Instagram', value: 30, color: '#E1306C' },
    { name: 'Facebook', value: 25, color: '#1877F2' },
    { name: 'TikTok', value: 20, color: '#000000' },
    { name: 'LinkedIn', value: 10, color: '#0077B5' },
    { name: 'Twitter', value: 10, color: '#1DA1F2' },
    { name: 'Snapchat', value: 5, color: '#FFFC00' },
  ];
  
  // For revenue projection calculations
  const calculateProjections = (impressions: number) => {
    const conversionRate = 0.01; // 1%
    const averageOrderValue = 3.49; // €3.49 average digital comic price
    
    const conversions = impressions * conversionRate;
    const revenue = conversions * averageOrderValue;
    
    return {
      impressions,
      conversions: Math.round(conversions),
      revenue: Math.round(revenue),
      adSpend: Math.round(impressions / 1000 * 5.12) // Average CPM across platforms
    };
  };
  
  // Revenue projection scenarios
  const smallReach = calculateProjections(50000);
  const mediumReach = calculateProjections(100000);
  const largeReach = calculateProjections(250000);
  
  // Break-even calculation
  const productionCost = 1500; // Estimated production cost for comic
  const averagePrice = 3.49; // Average digital comic price
  const conversionRate = 0.01; // 1% conversion rate
  
  const targetSales = Math.ceil(productionCost / averagePrice);
  const impressionsNeeded = targetSales / conversionRate;
  
  // Calculate average CPM from the platform data
  const averageCpm = platformCpmData.reduce((sum, platform) => sum + platform.cpm, 0) / platformCpmData.length;
  const estimatedAdBudget = Math.ceil((impressionsNeeded / 1000) * averageCpm);
  
  // Data for price sensitivity chart
  const priceData = [
    { price: 1.99, units: Math.ceil(productionCost / 1.99) },
    { price: 2.99, units: Math.ceil(productionCost / 2.99) },
    { price: 3.49, units: Math.ceil(productionCost / 3.49) },
    { price: 3.99, units: Math.ceil(productionCost / 3.99) },
    { price: 4.99, units: Math.ceil(productionCost / 4.99) },
    { price: 5.99, units: Math.ceil(productionCost / 5.99) },
  ];
  
  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-8">
      <div id="marketing-plan" className="max-w-6xl mx-auto">
        <BreakEvenSummary
          productionCost={productionCost}
          targetSales={targetSales}
          impressionsNeeded={impressionsNeeded}
          estimatedAdBudget={estimatedAdBudget}
        />
        
        <div className="flex justify-end mb-4">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => setShowNewFeatures(!showNewFeatures)}
          >
            <Info size={16} />
            {showNewFeatures ? "Hide Advanced Features" : "Show Advanced Features"}
          </Button>
        </div>
        
        <Tabs defaultValue="budget" className="w-full">
          <TabsList className="grid grid-cols-3 md:grid-cols-5 bg-black/30 backdrop-blur-md border border-white/10 mb-6">
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
              <>
                <TabsTrigger value="sales" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
                  Sales Forecasting
                </TabsTrigger>
                <TabsTrigger value="ai-content" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
                  AI Content
                </TabsTrigger>
              </>
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
            <>
              <TabsContent value="sales" className="focus-visible:outline-none focus-visible:ring-0">
                <SalesForecasting 
                  productionCost={productionCost}
                  averagePrice={averagePrice}
                  estimatedAdBudget={estimatedAdBudget}
                  targetSales={targetSales}
                  platformCpmData={platformCpmData}
                />
              </TabsContent>
              
              <TabsContent value="ai-content" className="focus-visible:outline-none focus-visible:ring-0">
                <AIContentStrategy 
                  reachProjectionData={reachProjectionData}
                />
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default MarketingPlan;
