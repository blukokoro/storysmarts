
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PanelCounter from './PanelCounter';
import MoviePitch from './MoviePitch';
import AudienceAnalysis from './AudienceAnalysis';
import BudgetCalculator from './BudgetCalculator';
import TimelineGantt from './TimelineGantt';
import { StoryAnalysis } from '@/types';
import StoryboardGenerator from './StoryboardGenerator';
import { Button } from '@/components/ui/button';
import { Film } from 'lucide-react';
import { Link } from 'react-router-dom';

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
      {/* Storyboard Feature Highlight Box */}
      <div className="mb-6 p-6 bg-gradient-to-r from-indigo-900/60 to-purple-900/60 rounded-lg border border-primary/20 shadow-lg">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gradient mb-2">Create Your Visual Storyboard</h3>
            <p className="text-gray-300 mb-4">
              Transform your narrative into a professional visual sequence with our AI-powered storyboard builder. 
              Perfect for directors, producers, and storytellers.
            </p>
            <ul className="text-sm text-gray-400 space-y-1 mb-4">
              <li>• Create frame-by-frame visual sequences</li>
              <li>• Organize shots with professional cinema techniques</li>
              <li>• Export and share your storyboard</li>
            </ul>
          </div>
          <Button asChild size="lg" className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white font-medium">
            <Link to="/storyboard">
              <Film className="h-5 w-5 mr-2" />
              Build Storyboard Now
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="comic" className="w-full">
        <TabsList className="grid grid-cols-4 bg-black/30 backdrop-blur-md border border-white/10 mb-6">
          <TabsTrigger value="comic" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            Comic Book
          </TabsTrigger>
          <TabsTrigger value="audience" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            Audience
          </TabsTrigger>
          <TabsTrigger value="budget" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            Budget
          </TabsTrigger>
          <TabsTrigger value="pitch" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            Movie Pitch
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="comic" className="focus-visible:outline-none focus-visible:ring-0">
          <PanelCounter data={analysis.comicPanels} />
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
        
        <TabsContent value="pitch" className="focus-visible:outline-none focus-visible:ring-0">
          <MoviePitch data={analysis.moviePitch} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OutputSection;
