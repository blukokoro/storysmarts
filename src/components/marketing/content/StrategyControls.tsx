
import React from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { ContentType, ReachProjectionData } from '@/types/marketing';
import { Sparkles, RefreshCw, Zap } from 'lucide-react';

interface StrategyControlsProps {
  postsPerDay: number;
  setPostsPerDay: (value: number) => void;
  campaignDays: number;
  setCampaignDays: (value: number) => void;
  averageViews: string;
  setAverageViews: (value: string) => void;
  generateContent: boolean;
  setGenerateContent: (value: boolean) => void;
  contentNeeds: any[];
  totalContentNeeded: number;
  reachProjectionData: ReachProjectionData[];
  handleGenerateContent: () => void;
  loading: boolean;
}

const StrategyControls: React.FC<StrategyControlsProps> = ({
  postsPerDay,
  setPostsPerDay,
  campaignDays,
  setCampaignDays,
  averageViews,
  setAverageViews,
  generateContent,
  setGenerateContent,
  contentNeeds,
  totalContentNeeded,
  reachProjectionData,
  handleGenerateContent,
  loading
}) => {
  return (
    <div className="space-y-6 col-span-1">
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="posts-per-day">Posts per day: {postsPerDay}</Label>
            <span className="text-xs text-primary">
              Est. daily reach: {Math.round(reachProjectionData.find(data => data.posts >= postsPerDay)?.reach || 5000).toLocaleString()}
            </span>
          </div>
          <Slider
            id="posts-per-day"
            value={[postsPerDay]}
            min={1}
            max={15}
            step={1}
            onValueChange={(value) => setPostsPerDay(value[0])}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="campaign-days">Campaign duration: {campaignDays} days</Label>
          <Slider
            id="campaign-days"
            value={[campaignDays]}
            min={7}
            max={90}
            step={1}
            onValueChange={(value) => setCampaignDays(value[0])}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="average-views">Average views per post</Label>
          <Input
            id="average-views"
            type="number"
            value={averageViews}
            onChange={(e) => setAverageViews(e.target.value)}
            className="bg-black/20 border-white/10"
            placeholder="Enter your average views"
          />
          <p className="text-xs text-gray-400">This helps calculate how many posts you need</p>
        </div>
        
        <div className="p-4 bg-gradient-to-r from-primary/20 to-black/30 rounded-lg border border-primary/20">
          <div className="flex items-center justify-between space-x-2 mb-4">
            <Label htmlFor="generate-content" className="text-primary font-medium flex items-center">
              <Sparkles className="h-4 w-4 mr-2" />
              AI Content Generation
            </Label>
            <Switch
              id="generate-content"
              checked={generateContent}
              onCheckedChange={setGenerateContent}
              className="data-[state=checked]:bg-primary"
            />
          </div>
          
          <p className="text-xs text-gray-300 mb-3">
            Enable our AI engine to automatically generate a complete content plan and individual content pieces optimized for your audience.
          </p>
        </div>
        
        <div className="p-4 bg-black/30 rounded-lg border border-white/10">
          <h3 className="text-sm font-medium mb-3">Content Requirements Summary</h3>
          
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="p-2 bg-gradient-to-br from-primary/20 to-black/40 rounded-lg text-center">
              <p className="text-xs text-gray-400">Total Content Pieces</p>
              <p className="text-2xl font-bold">{totalContentNeeded}</p>
            </div>
            <div className="p-2 bg-gradient-to-br from-primary/20 to-black/40 rounded-lg text-center">
              <p className="text-xs text-gray-400">Est. Monthly Reach</p>
              <p className="text-2xl font-bold">
                {Math.round(reachProjectionData.find(data => data.posts >= postsPerDay)?.reach * 30 || 150000).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        
        <Button 
          onClick={handleGenerateContent}
          className={`w-full ${generateContent ? 'bg-primary hover:bg-primary/90' : 'bg-gray-700'}`}
          disabled={loading || !generateContent}
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Generating AI Content Plan...
            </>
          ) : (
            <>
              {generateContent ? (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  Generate Content Plan with AI
                </>
              ) : (
                <>
                  Enable AI content generation
                </>
              )}
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default StrategyControls;
