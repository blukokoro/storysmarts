
import React from 'react';
import { Button } from '@/components/ui/button';
import { CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bot, Wand, Loader } from 'lucide-react';
import { ContentAnalysis, AIContentPlan } from './types';

interface ContentPlanCardProps {
  contentAnalysis: ContentAnalysis | null;
  contentPlan: AIContentPlan | null;
  isLoading: boolean;
  onGenerateFullContentPlan: () => void;
}

const ContentPlanCard: React.FC<ContentPlanCardProps> = ({
  contentAnalysis,
  contentPlan,
  isLoading,
  onGenerateFullContentPlan
}) => {
  return (
    <>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bot className="h-5 w-5 mr-2 text-primary" />
          AI Content Plan
        </CardTitle>
        <CardDescription>
          Recommended content based on document analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!contentAnalysis ? (
          <div className="p-4 bg-primary/10 border border-primary/20 rounded-md text-sm">
            Please analyze your document first to see content recommendations.
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-black/20 p-3 rounded-lg border border-white/10">
              <h4 className="text-xs font-medium mb-2">Audience Match</h4>
              {contentAnalysis.audienceMatch.map((audience, i) => (
                <div key={i} className="mb-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span>{audience.demographic}</span>
                    <span>{Math.round(audience.score * 100)}%</span>
                  </div>
                  <div className="w-full bg-black/30 rounded-full h-1.5">
                    <div 
                      className="bg-primary h-1.5 rounded-full" 
                      style={{ width: `${audience.score * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-black/20 p-3 rounded-lg border border-white/10">
              <h4 className="text-xs font-medium mb-2">Suggested Topics</h4>
              <ul className="text-xs space-y-1">
                {contentAnalysis.suggestedTopics.map((topic, i) => (
                  <li key={i} className="flex items-start">
                    <span className="inline-block bg-primary/20 text-primary rounded-full w-4 h-4 text-xs flex items-center justify-center mr-2 mt-0.5">
                      {i + 1}
                    </span>
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-black/20 p-3 rounded-lg border border-white/10">
              <h4 className="text-xs font-medium mb-2">Recommended Hashtags</h4>
              <div className="flex flex-wrap gap-1">
                {contentPlan?.hashtagSuggestions.map((hashtag, i) => (
                  <span key={i} className="text-xs px-2 py-0.5 bg-primary/10 border border-primary/20 rounded-full">
                    {hashtag}
                  </span>
                ))}
              </div>
            </div>
            
            <Button
              onClick={onGenerateFullContentPlan}
              className="w-full bg-primary hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand className="h-4 w-4 mr-2" />
                  Generate Full Content Plan
                </>
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </>
  );
};

export default ContentPlanCard;
