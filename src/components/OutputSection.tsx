
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PanelCounter from './PanelCounter';
import MoviePitch from './MoviePitch';
import AudienceAnalysis from './AudienceAnalysis';
import BudgetCalculator from './BudgetCalculator';
import TimelineGantt from './TimelineGantt';
import { StoryAnalysis } from '@/types';

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

  return (
    <div className={`mt-8 w-full animate-slide-up transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <Tabs defaultValue="comic" className="w-full">
        <TabsList className="grid grid-cols-4 bg-black/30 backdrop-blur-md border border-white/10 mb-6">
          <TabsTrigger value="comic" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            Comic Book
          </TabsTrigger>
          <TabsTrigger value="pitch" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            Movie Pitch
          </TabsTrigger>
          <TabsTrigger value="audience" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            Audience
          </TabsTrigger>
          <TabsTrigger value="budget" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            Budget
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="comic" className="focus-visible:outline-none focus-visible:ring-0">
          <PanelCounter data={analysis.comicPanels} />
        </TabsContent>
        
        <TabsContent value="pitch" className="focus-visible:outline-none focus-visible:ring-0">
          <MoviePitch data={analysis.moviePitch} />
        </TabsContent>
        
        <TabsContent value="audience" className="focus-visible:outline-none focus-visible:ring-0">
          <AudienceAnalysis data={analysis.audienceAnalysis} />
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
    </div>
  );
};

export default OutputSection;
