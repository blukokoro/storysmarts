
import React from 'react';
import { Button } from '@/components/ui/button';
import { CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { AIContentPlan } from './types';

interface ContentScheduleCardProps {
  contentPlan: AIContentPlan | null;
  onContinueToContentGeneration: () => void;
}

const ContentScheduleCard: React.FC<ContentScheduleCardProps> = ({
  contentPlan,
  onContinueToContentGeneration
}) => {
  return (
    <>
      <CardHeader>
        <CardTitle>Content Schedule</CardTitle>
        <CardDescription>
          Recommended content schedule based on your document
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!contentPlan ? (
          <div className="p-4 bg-primary/10 border border-primary/20 rounded-md text-sm">
            Generate a content plan to see your recommended schedule.
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {contentPlan.contentTypes.map((type, i) => (
                <div key={i} className="bg-black/20 p-4 rounded-lg border border-white/10">
                  <h4 className="font-medium text-sm mb-1">{type.type} Content</h4>
                  <p className="text-2xl font-bold text-primary mb-2">{type.count}</p>
                  <p className="text-xs text-gray-400">Examples:</p>
                  <ul className="text-xs space-y-1 mt-1">
                    {type.examples.map((example, j) => (
                      <li key={j}>• {example}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            <h4 className="text-sm font-medium mb-3">Publishing Schedule</h4>
            {contentPlan.schedule.map((week, i) => (
              <div key={i} className="bg-black/20 p-4 rounded-lg border border-white/10 mb-4">
                <h5 className="text-sm font-medium mb-2">Week {week.week}</h5>
                <div className="space-y-2">
                  {week.content.map((item, j) => (
                    <div key={j} className="flex items-center justify-between bg-black/30 p-2 rounded">
                      <div className="flex items-center">
                        <span className={`w-2 h-2 rounded-full mr-2 ${
                          item.type === 'Image' ? 'bg-blue-500' : 
                          item.type === 'Quote' ? 'bg-green-500' : 'bg-amber-500'
                        }`}></span>
                        <span className="text-sm">{item.description}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs text-gray-400 mr-2">{item.platform}</span>
                        <span className="text-xs px-1.5 py-0.5 bg-black/40 rounded">
                          {item.type}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            <Button 
              onClick={onContinueToContentGeneration}
              className="w-full bg-primary hover:bg-primary/90"
            >
              Continue to Content Generation
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}
      </CardContent>
    </>
  );
};

export default ContentScheduleCard;
