
import React from 'react';
import { Lock, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PlatformTags from './PlatformTags';
import { AdvancedActivity } from './timelineData';

interface AdvancedActivityItemProps {
  activity: AdvancedActivity;
  onActivate: () => void;
}

const AdvancedActivityItem: React.FC<AdvancedActivityItemProps> = ({ activity, onActivate }) => {
  return (
    <div 
      className={`p-2 rounded-sm flex items-start gap-2 ${
        activity.requiresActivation 
          ? 'bg-black/30 border-l-2 border-primary/30' 
          : 'bg-black/20'
      }`}
    >
      {activity.requiresActivation ? (
        <Lock className="h-3 w-3 text-primary/70 flex-shrink-0 mt-0.5" />
      ) : (
        <Zap className="h-3 w-3 text-primary flex-shrink-0 mt-0.5" />
      )}
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium">{activity.name}</p>
          {activity.requiresActivation && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-5 text-[10px] px-1.5 text-primary"
              onClick={onActivate}
            >
              Activate
            </Button>
          )}
        </div>
        <PlatformTags platforms={activity.platforms} />
      </div>
    </div>
  );
};

export default AdvancedActivityItem;
