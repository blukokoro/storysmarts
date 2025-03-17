
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AudienceAnalysis as AudienceAnalysisType } from '@/types';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { TrendingUp, Zap } from 'lucide-react';

// Import our new components
import AudienceTabContent from './marketing-analysis/AudienceTabContent';
import ContentPlanTabContent from './marketing-analysis/ContentPlanTabContent';
import SalesPredictionTabContent from './marketing-analysis/SalesPredictionTabContent';
import TabButtons from './marketing-analysis/TabButtons';

interface MarketingAnalysisProps {
  data: AudienceAnalysisType;
}

const MarketingAnalysis: React.FC<MarketingAnalysisProps> = ({ data }) => {
  // Sales prediction data
  const averagePrice = 3.49; // Average price of digital comic
  const productionCost = 1500; // Estimated production cost
  const cpmRange = { min: 2.50, max: 14.00 }; // CPM range
  const conversionRate = 0.01; // 1% conversion rate
  
  const targetSales = Math.ceil(productionCost / averagePrice);
  const impressionsNeeded = targetSales / conversionRate;
  const minAdBudget = (impressionsNeeded / 1000) * cpmRange.min;
  const maxAdBudget = (impressionsNeeded / 1000) * cpmRange.max;
  
  return (
    <Card className="glass-card h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium text-white flex justify-between items-center">
          <span>Marketing Analysis</span>
          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm" className="bg-primary/20 border-primary/40 text-primary hover:bg-primary/30">
              <Link to="/marketing">
                <TrendingUp className="h-4 w-4 mr-2" />
                Marketing Options
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="bg-primary/20 border-primary/40 text-primary hover:bg-primary/30">
              <Link to="/content-creator">
                <Zap className="h-4 w-4 mr-2" />
                AI Content Creator
              </Link>
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="audience" className="w-full">
          <TabButtons />
          
          <TabsContent value="audience" className="focus-visible:outline-none focus-visible:ring-0">
            <AudienceTabContent data={data} />
          </TabsContent>
          
          <TabsContent value="content" className="focus-visible:outline-none focus-visible:ring-0">
            <ContentPlanTabContent />
          </TabsContent>
          
          <TabsContent value="sales" className="focus-visible:outline-none focus-visible:ring-0">
            <SalesPredictionTabContent 
              productionCost={productionCost}
              averagePrice={averagePrice}
              targetSales={targetSales}
              impressionsNeeded={impressionsNeeded}
              minAdBudget={minAdBudget}
              maxAdBudget={maxAdBudget}
              cpmRange={cpmRange}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MarketingAnalysis;
