
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';
import { toast } from 'sonner';

// Import components
import ContentTypeDistribution from './content/ContentTypeDistribution';
import PlatformAllocation from './content/PlatformAllocation';
import ContentCreationSection from './content/ContentCreationSection';
import GeneratedContentPlan from './content/GeneratedContentPlan';
import StrategyControls from './content/StrategyControls';

// Import utilities and constants
import { calculateContentNeeds, calculateTotalContentNeeded } from '@/utils/contentStrategyUtils';
import { contentTypes, platformAllocation } from '@/constants/contentTypes';
import { ReachProjectionData, GeneratedContent } from '@/types/marketing';

interface AIContentStrategyProps {
  reachProjectionData: ReachProjectionData[];
}

const AIContentStrategy: React.FC<AIContentStrategyProps> = ({ reachProjectionData }) => {
  const [postsPerDay, setPostsPerDay] = useState<number>(5);
  const [campaignDays, setCampaignDays] = useState<number>(30);
  const [generateContent, setGenerateContent] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [averageViews, setAverageViews] = useState<string>("1000");
  
  // Calculate content needs based on selected parameters
  const contentNeeds = calculateContentNeeds(postsPerDay, campaignDays, contentTypes);
  
  // Calculate total content pieces needed
  const totalContentNeeded = calculateTotalContentNeeded(contentNeeds, postsPerDay, averageViews, reachProjectionData);
  
  // Handle generate content
  const handleGenerateContent = () => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Example generated content
      const exampleContent: GeneratedContent = {
        contentPlan: {
          summary: {
            totalPieces: totalContentNeeded,
            campaignDuration: `${campaignDays} days`,
            postsPerDay: postsPerDay,
            estimatedReach: Math.round(reachProjectionData.find(data => data.posts >= postsPerDay)?.reach || 5000),
          },
          schedule: Array.from({ length: 5 }, (_, i) => ({
            day: i + 1,
            posts: Array.from({ length: Math.min(postsPerDay, 3) }, (_, j) => ({
              id: `post-${i}-${j}`,
              type: contentTypes[Math.floor(Math.random() * contentTypes.length)].type,
              time: `${10 + Math.floor(Math.random() * 10)}:${Math.random() > 0.5 ? '30' : '00'}`
            }))
          }))
        }
      };
      
      setGeneratedContent(exampleContent);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-black/20 backdrop-blur-md border border-white/5">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-primary" />
            AI-Powered Content Strategy & Generation
          </CardTitle>
          <CardDescription>
            Estimate required content volume and automatically generate assets to meet your visibility goals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StrategyControls
              postsPerDay={postsPerDay}
              setPostsPerDay={setPostsPerDay}
              campaignDays={campaignDays}
              setCampaignDays={setCampaignDays}
              averageViews={averageViews}
              setAverageViews={setAverageViews}
              generateContent={generateContent}
              setGenerateContent={setGenerateContent}
              contentNeeds={contentNeeds}
              totalContentNeeded={totalContentNeeded}
              reachProjectionData={reachProjectionData}
              handleGenerateContent={handleGenerateContent}
              loading={loading}
            />
            
            <div className="col-span-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ContentTypeDistribution contentNeeds={contentNeeds} />
                <PlatformAllocation 
                  platformAllocation={platformAllocation} 
                  totalContentNeeded={totalContentNeeded} 
                />
              </div>
            </div>
          </div>

          <ContentCreationSection totalContentNeeded={totalContentNeeded} />
        </CardContent>
      </Card>
      
      {generateContent && generatedContent && (
        <GeneratedContentPlan generatedContent={generatedContent} />
      )}
    </div>
  );
};

export default AIContentStrategy;
