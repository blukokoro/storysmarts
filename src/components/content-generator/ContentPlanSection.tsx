
import React from 'react';
import { Card } from '@/components/ui/card';
import ContentPlanCard from './ContentPlanCard';
import ContentScheduleCard from './ContentScheduleCard';
import { ContentAnalysis, AIContentPlan } from './types';

interface ContentPlanSectionProps {
  contentAnalysis: ContentAnalysis | null;
  contentPlan: AIContentPlan | null;
  isLoading: boolean;
  onGenerateFullContentPlan: () => void;
  onContinueToContentGeneration: () => void;
}

const ContentPlanSection: React.FC<ContentPlanSectionProps> = ({
  contentAnalysis,
  contentPlan,
  isLoading,
  onGenerateFullContentPlan,
  onContinueToContentGeneration
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="bg-black/30 backdrop-blur-sm border border-white/10 lg:col-span-1">
        <ContentPlanCard
          contentAnalysis={contentAnalysis}
          contentPlan={contentPlan}
          isLoading={isLoading}
          onGenerateFullContentPlan={onGenerateFullContentPlan}
        />
      </Card>
      
      <Card className="bg-black/30 backdrop-blur-sm border border-white/10 lg:col-span-2">
        <ContentScheduleCard
          contentPlan={contentPlan}
          onContinueToContentGeneration={onContinueToContentGeneration}
        />
      </Card>
    </div>
  );
};

export default ContentPlanSection;
