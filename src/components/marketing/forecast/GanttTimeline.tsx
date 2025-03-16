
import React from 'react';
import { Calendar } from 'lucide-react';
import { campaignTimelineData, totalCampaignWeeks } from './timelineData';

const GanttTimeline: React.FC = () => {
  return (
    <div className="relative mb-6">
      <h3 className="flex items-center gap-2 text-sm font-medium mb-3">
        <Calendar className="w-4 h-4 text-primary" />
        Campaign Timeline Visualization
      </h3>
      
      <div className="flex items-center mb-2">
        <div className="w-[120px] flex-shrink-0"></div>
        <div className="flex flex-grow">
          {Array.from({ length: totalCampaignWeeks }).map((_, idx) => (
            <div key={idx} className="flex-1 text-center text-xs text-gray-400">
              Week {idx + 1}
            </div>
          ))}
        </div>
      </div>
      
      {campaignTimelineData.map((phase, phaseIdx) => {
        // Calculate phase position in timeline
        const phaseStart = campaignTimelineData
          .slice(0, phaseIdx)
          .reduce((total, p) => total + p.weeks, 0);
        
        return (
          <div key={phaseIdx} className="flex items-center mb-3">
            <div className="w-[120px] flex-shrink-0 text-xs font-medium text-primary pr-2">
              {phase.phase}
            </div>
            <div className="flex flex-grow h-8 relative">
              {/* Phase timeline bar */}
              <div 
                className="absolute h-8 rounded-md bg-primary/20 border border-primary/30 flex items-center justify-center"
                style={{ 
                  left: `${(phaseStart / totalCampaignWeeks) * 100}%`, 
                  width: `${(phase.weeks / totalCampaignWeeks) * 100}%` 
                }}
              >
                {phase.weeks > 1 && (
                  <span className="text-xs text-primary font-medium">
                    {phase.weeks} weeks
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GanttTimeline;
