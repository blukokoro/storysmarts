
import React from 'react';
import CampaignTimeline from './CampaignTimeline';
import AIRecommendations from './AIRecommendations';

interface TimelineRecommendationsSectionProps {
  customTarget: string;
}

const TimelineRecommendationsSection: React.FC<TimelineRecommendationsSectionProps> = ({ 
  customTarget 
}) => {
  return (
    <div className="space-y-6">
      <CampaignTimeline />
      <AIRecommendations customTarget={customTarget} />
    </div>
  );
};

export default TimelineRecommendationsSection;
