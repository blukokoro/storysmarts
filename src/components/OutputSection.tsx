
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PanelCounter from './PanelCounter';
import MoviePitch from './MoviePitch';
import MarketingAnalysis from './MarketingAnalysis';
import BudgetCalculator from './BudgetCalculator';
import TimelineGantt from './TimelineGantt';
import { StoryAnalysis } from '@/types';
import StoryboardGenerator from './StoryboardGenerator';
import { Button } from '@/components/ui/button';
import { Film, TrendingUp, Sparkles, PaintBucket } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import KeyScenesList from './KeyScenesList';
import ArtisticStyleSuggestions from './ArtisticStyleSuggestions';

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
        <TabsList className="grid grid-cols-5 bg-black/30 backdrop-blur-md border border-white/10 mb-6">
          <TabsTrigger value="comic" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            Comic Book
          </TabsTrigger>
          <TabsTrigger value="scenes" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            Key Scenes
          </TabsTrigger>
          <TabsTrigger value="styles" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            <PaintBucket className="h-4 w-4 mr-2" />
            Artistic Styles
          </TabsTrigger>
          <TabsTrigger value="marketing" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            Marketing
          </TabsTrigger>
          <TabsTrigger value="budget" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            Budget
          </TabsTrigger>
        </TabsList>
        
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
      
      {/* Sales Prediction & Storyboard Feature Box */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Storyboard Feature Highlight Box */}
        <div className="p-6 bg-gradient-to-r from-indigo-900/60 to-purple-900/60 rounded-lg border border-primary/20 shadow-lg">
          <div className="flex flex-col items-start justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold text-gradient mb-2">Create Your Visual Storyboard</h3>
              <p className="text-gray-300 mb-4">
                Transform your narrative into a professional visual sequence with our AI-powered storyboard builder.
              </p>
              <ul className="text-sm text-gray-400 space-y-1 mb-4">
                <li>• Create frame-by-frame visual sequences</li>
                <li>• Organize shots with professional techniques</li>
                <li>• Export and share your storyboard</li>
              </ul>
            </div>
            <Button asChild size="lg" className="w-full bg-primary hover:bg-primary/90 text-white font-medium">
              <Link to="/storyboard">
                <Film className="h-5 w-5 mr-2" />
                Build Storyboard Now
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Sales Prediction Box */}
        <div className="p-6 bg-gradient-to-r from-green-900/60 to-blue-900/60 rounded-lg border border-primary/20 shadow-lg">
          <div className="flex flex-col items-start justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold text-gradient mb-2">Sales Prediction</h3>
              <p className="text-gray-300 mb-4">
                Based on your story analysis, we've calculated revenue projections and marketing requirements.
              </p>
              <div className="grid grid-cols-2 gap-3 w-full mb-4">
                <div className="bg-black/40 rounded p-3 border border-white/10">
                  <p className="text-xs text-gray-400">Break-even Sales</p>
                  <p className="text-lg font-bold text-white">{targetSales} copies</p>
                </div>
                <div className="bg-black/40 rounded p-3 border border-white/10">
                  <p className="text-xs text-gray-400">Suggested Ad Budget</p>
                  <p className="text-lg font-bold text-white">€{estimatedAdBudget}</p>
                </div>
              </div>
            </div>
            <Button asChild size="lg" className="w-full bg-primary/90 hover:bg-primary text-white font-medium">
              <Link to="/marketing-plan">
                <TrendingUp className="h-5 w-5 mr-2" />
                View Full Marketing Plan
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* AI Content Generator Tool - Now below the analysis results */}
      <Card className="p-6 mb-6 bg-gradient-to-r from-indigo-900/60 to-purple-900/60 border border-primary/20 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h3 className="text-2xl font-bold text-gradient mb-2 flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-primary animate-pulse" />
              AI Content Generator
            </h3>
            <p className="text-gray-300 mb-2">
              Transform your analysis into marketing content, images, and social media posts with our AI engine.
            </p>
          </div>
          <Button asChild size="lg" className="whitespace-nowrap bg-primary hover:bg-primary/90">
            <Link to="/content-generator">
              <Sparkles className="h-4 w-4 mr-2" />
              Generate AI Content
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default OutputSection;
