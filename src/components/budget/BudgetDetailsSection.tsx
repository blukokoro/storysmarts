
import React from 'react';
import { BudgetEstimate } from '@/types';
import FilmBreakdown from './FilmBreakdown';
import ComicBreakdown from './ComicBreakdown';
import ComicTiers from './ComicTiers';
import DevelopmentTimeline from './DevelopmentTimeline';
import MarketingSuggestions from './MarketingSuggestions';

interface BudgetDetailsSectionProps {
  data: BudgetEstimate;
}

const BudgetDetailsSection: React.FC<BudgetDetailsSectionProps> = ({ data }) => {
  return (
    <div className="space-y-6 mt-8 pt-6 border-t border-white/10">
      <h3 className="text-lg font-medium text-white">Detailed Breakdowns</h3>
      
      {/* AI Short Film Breakdown */}
      <FilmBreakdown data={data} />
      
      {/* Comic Book Production Breakdown */}
      <ComicBreakdown />
      
      {/* Comic Book Production Tiers */}
      <ComicTiers />
      
      {/* Development Timeline */}
      <DevelopmentTimeline />
      
      {/* Marketing Suggestions */}
      <MarketingSuggestions />
    </div>
  );
};

export default BudgetDetailsSection;
