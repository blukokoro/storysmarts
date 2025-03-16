
import React from 'react';
import PricingHeader from '@/components/pricing/PricingHeader';
import ComicPricingTiers from '@/components/pricing/ComicPricingTiers';
import FilmPricingTiers from '@/components/pricing/FilmPricingTiers';
import ProjectTimeline from '@/components/pricing/ProjectTimeline';
import MarketingSuggestions from '@/components/pricing/MarketingSuggestions';
import CustomSolutionCTA from '@/components/pricing/CustomSolutionCTA';
import FreePricingTier from '@/components/pricing/FreePricingTier';

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <PricingHeader />
        <FreePricingTier />
        <ComicPricingTiers />
        <FilmPricingTiers />
        <ProjectTimeline />
        <MarketingSuggestions />
        <CustomSolutionCTA />
      </div>
    </div>
  );
};

export default Pricing;
