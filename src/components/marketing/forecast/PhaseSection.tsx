
import React from 'react';
import { Clock, Hourglass, Flag, Sparkles } from 'lucide-react';
import { TimelinePhase } from './timelineData';
import ActivityItem from './ActivityItem';
import AdvancedActivityItem from './AdvancedActivityItem';

interface PhaseSectionProps {
  phase: TimelinePhase;
  phaseIdx: number;
  totalPhases: number;
  showAdvanced: boolean;
  onActivate: () => void;
}

const PhaseSection: React.FC<PhaseSectionProps> = ({ 
  phase, 
  phaseIdx, 
  totalPhases, 
  showAdvanced, 
  onActivate 
}) => {
  return (
    <div className="p-3 bg-black/40 rounded-lg border border-white/5">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-xs text-primary font-medium flex items-center gap-1">
          {phaseIdx === 0 ? (
            <Hourglass className="h-3 w-3 text-primary" />
          ) : phaseIdx === totalPhases - 1 ? (
            <Flag className="h-3 w-3 text-primary" />
          ) : (
            <Clock className="h-3 w-3 text-primary" />
          )}
          {phase.phase}
        </h4>
        <span className="text-xs text-gray-500">
          {phase.weeks} {phase.weeks > 1 ? 'weeks' : 'week'}
        </span>
      </div>
      
      <div className="space-y-2">
        {phase.activities.map((activity, actIdx) => (
          <ActivityItem key={actIdx} activity={activity} />
        ))}
        
        {/* Advanced activities */}
        {showAdvanced && phase.advancedActivities && phase.advancedActivities.length > 0 && (
          <>
            <div className="mt-2 mb-1 border-t border-white/5 pt-2">
              <span className="text-[10px] uppercase text-primary/70 font-medium flex items-center">
                <Sparkles className="h-3 w-3 mr-1" /> Advanced Activities
              </span>
            </div>
            
            {phase.advancedActivities.map((activity, actIdx) => (
              <AdvancedActivityItem 
                key={`adv-${actIdx}`} 
                activity={activity} 
                onActivate={onActivate} 
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default PhaseSection;
