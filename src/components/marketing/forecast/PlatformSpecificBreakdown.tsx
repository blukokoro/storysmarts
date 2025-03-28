
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Target } from 'lucide-react';
import PlatformBreakdownSection from './PlatformBreakdownSection';
import TimelineRecommendationsSection from './TimelineRecommendationsSection';

interface PlatformSpecificBreakdownProps {
  forecastData: any;
  customTarget: string;
}

const PlatformSpecificBreakdown: React.FC<PlatformSpecificBreakdownProps> = ({ 
  forecastData, 
  customTarget 
}) => {
  if (!forecastData) return null;
  
  return (
    <Card className="bg-black/20 backdrop-blur-md border border-white/5">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Target className="w-5 h-5 mr-2 text-primary" />
          Platform-Specific Breakdown
        </CardTitle>
        <CardDescription>
          Granular breakdowns of expected sales per platform based on historical performance data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PlatformBreakdownSection 
            platformBreakdown={forecastData.platformBreakdown} 
            customTarget={customTarget}
          />
          
          <TimelineRecommendationsSection customTarget={customTarget} />
        </div>
      </CardContent>
    </Card>
  );
};

export default PlatformSpecificBreakdown;
