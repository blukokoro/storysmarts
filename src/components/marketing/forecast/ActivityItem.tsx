
import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import PlatformTags from './PlatformTags';
import { Activity } from './timelineData';

interface ActivityItemProps {
  activity: Activity;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ activity }) => {
  return (
    <div 
      className={`p-2 rounded-sm flex items-start gap-2 ${
        activity.isKey ? 'bg-primary/10 border-l-2 border-primary' : 'bg-black/20'
      }`}
    >
      {activity.isKey && <CheckCircle2 className="h-3 w-3 text-primary flex-shrink-0 mt-0.5" />}
      <div>
        <p className="text-xs font-medium">{activity.name}</p>
        <PlatformTags platforms={activity.platforms} />
      </div>
    </div>
  );
};

export default ActivityItem;
