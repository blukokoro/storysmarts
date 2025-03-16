
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import { generateInitialForecastData } from '@/utils/forecastingUtils';
import ForecastForm from './forecast/ForecastForm';
import SalesProjectionChart from './forecast/SalesProjectionChart';
import PlatformSpecificBreakdown from './forecast/PlatformSpecificBreakdown';

interface SalesForecastingProps {
  productionCost: number;
  averagePrice: number;
  estimatedAdBudget: number;
  targetSales: number;
  platformCpmData: Array<{
    platform: string;
    cpm: number;
    color: string;
  }>;
}

const SalesForecasting: React.FC<SalesForecastingProps> = ({
  productionCost,
  averagePrice,
  estimatedAdBudget,
  targetSales,
  platformCpmData
}) => {
  const [customTarget, setCustomTarget] = useState<string>(targetSales.toString());
  const [forecastData, setForecastData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const generateForecast = () => {
    if (!customTarget || isNaN(parseInt(customTarget)) || parseInt(customTarget) <= 0) {
      return;
    }

    setLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      const initialData = generateInitialForecastData(parseInt(customTarget), platformCpmData);
      setForecastData(initialData);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-black/20 backdrop-blur-md border border-white/5">
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-primary" />
            Sales Forecasting & Performance Analytics
          </CardTitle>
          <CardDescription>
            Given a target sales volume, the AI models conversion rates to estimate required daily/weekly views and probabilistic sales projections
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ForecastForm 
              customTarget={customTarget}
              setCustomTarget={setCustomTarget}
              generateForecast={generateForecast}
              loading={loading}
              forecastData={forecastData}
            />
            
            <div className="col-span-2">
              <SalesProjectionChart projections={forecastData?.projections} />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {forecastData && (
        <PlatformSpecificBreakdown 
          forecastData={forecastData} 
          customTarget={customTarget}
        />
      )}
    </div>
  );
};

export default SalesForecasting;
