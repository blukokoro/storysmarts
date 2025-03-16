
import React from 'react';

interface AIRecommendationsProps {
  customTarget: string;
}

const AIRecommendations: React.FC<AIRecommendationsProps> = ({ customTarget }) => {
  const targetSales = parseInt(customTarget);
  
  return (
    <div className="p-4 bg-gradient-to-r from-primary/10 to-transparent rounded-lg border border-primary/10">
      <h3 className="text-sm font-medium mb-2">AI Recommendations</h3>
      <p className="text-xs mb-2">Based on your sales target of {targetSales} copies:</p>
      <ul className="text-xs space-y-1">
        <li>• Focus 55% of budget on Instagram and TikTok for highest conversion</li>
        <li>• Schedule posts between 6-8pm for optimal engagement</li>
        <li>• Consider bundles/packages to increase average order value</li>
        <li>• Use retargeting ads for visitors who don't convert initially</li>
        <li>• Test incentives (limited edition content) to boost conversion rate</li>
      </ul>
    </div>
  );
};

export default AIRecommendations;
