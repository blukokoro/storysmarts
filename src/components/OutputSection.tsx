
import React from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import PanelCounter from './PanelCounter';
import MoviePitch from './MoviePitch';
import MarketingAnalysis from './MarketingAnalysis';
import BudgetCalculator from './BudgetCalculator';
import TimelineGantt from './TimelineGantt';
import { StoryAnalysis } from '@/types';
import StoryboardGenerator from './StoryboardGenerator';
import KeyScenesList from './KeyScenesList';
import ArtisticStyleSuggestions from './ArtisticStyleSuggestions';
import TabNavigationHeader from './output-section/TabNavigationHeader';
import FeatureCards from './output-section/FeatureCards';
import AIContentGeneratorCard from './output-section/AIContentGeneratorCard';

interface OutputSectionProps {
  analysis: StoryAnalysis;
  isVisible: boolean;
}

const OutputSection: React.FC<OutputSectionProps> = ({ analysis, isVisible }) => {
  if (!isVisible) {
    return null;
  }

  // Calculate price estimation for the comic (minimum 30 panels at €9 each)
  const minimumPanels = 30;
  const pricePerPanel = 9;
  const calculatedPanels = Math.max(analysis.comicPanels.suggestedPanelCount, minimumPanels);
  const estimatedPrice = calculatedPanels * pricePerPanel;
  
  // Calculate sales prediction
  const averagePrice = 3.49; // Average digital comic price
  const targetSales = Math.ceil(estimatedPrice / averagePrice);
  const conversionRate = 0.01; // 1% conversion
  const impressionsNeeded = targetSales / conversionRate;
  const averageCpm = 8.25; // Average CPM
  const estimatedAdBudget = Math.ceil((impressionsNeeded / 1000) * averageCpm);

  return (
    <div className={`mt-8 w-full animate-slide-up transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Analysis Results Tabs - Now at the top */}
      <Tabs defaultValue="comic" className="w-full mb-6">
        <TabNavigationHeader />
        
        <TabsContent value="comic" className="focus-visible:outline-none focus-visible:ring-0">
          <PanelCounter data={analysis.comicPanels} />
        </TabsContent>
        
        <TabsContent value="scenes" className="focus-visible:outline-none focus-visible:ring-0">
          <KeyScenesList scenes={analysis.comicPanels.keyScenesForPanels} />
        </TabsContent>
        
        <TabsContent value="styles" className="focus-visible:outline-none focus-visible:ring-0">
          <ArtisticStyleSuggestions story={analysis.title} />
        </TabsContent>
        
        <TabsContent value="marketing" className="focus-visible:outline-none focus-visible:ring-0">
          <MarketingAnalysis data={analysis.audienceAnalysis} />
        </TabsContent>
        
        <TabsContent value="budget" className="focus-visible:outline-none focus-visible:ring-0">
          <div className="flex flex-col gap-6">
            <BudgetCalculator data={analysis.budgetEstimate} />
            <TimelineGantt 
              panelCount={analysis.comicPanels.suggestedPanelCount} 
              estimatedPrice={estimatedPrice} 
            />
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Feature Cards */}
      <FeatureCards targetSales={targetSales} estimatedAdBudget={estimatedAdBudget} />
      
      {/* AI Content Generator Tool */}
      <AIContentGeneratorCard />
    </div>
  );
};

export default OutputSection;
