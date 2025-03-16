
import React from 'react';
import { Calendar, Clock, CheckCircle2, Hourglass, Flag } from 'lucide-react';

// Timeline data representing marketing activities week by week
const campaignTimelineData = [
  {
    phase: 'Pre-Launch',
    weeks: 3,
    activities: [
      { name: 'Teaser campaigns', platforms: ['Instagram', 'TikTok'], isKey: true },
      { name: 'Email list warmup', platforms: ['Email'], isKey: false },
      { name: 'Influencer outreach', platforms: ['Various'], isKey: true },
      { name: 'Content preparation', platforms: ['All'], isKey: false },
    ]
  },
  {
    phase: 'Launch Week',
    weeks: 1,
    activities: [
      { name: 'Full platform push', platforms: ['All'], isKey: true },
      { name: 'Daily content releases', platforms: ['All'], isKey: false },
      { name: 'Limited-time incentives', platforms: ['Website', 'Email'], isKey: true },
      { name: 'Live Q&A sessions', platforms: ['Instagram', 'TikTok'], isKey: false },
    ]
  },
  {
    phase: 'Week 2-3',
    weeks: 2,
    activities: [
      { name: 'Targeted retargeting', platforms: ['Facebook', 'Instagram'], isKey: true },
      { name: 'Early adopter engagement', platforms: ['Email', 'Community'], isKey: false },
      { name: 'Secondary content wave', platforms: ['All'], isKey: true },
      { name: 'Performance optimization', platforms: ['Ad Platforms'], isKey: false },
    ]
  },
  {
    phase: 'Week 4-5',
    weeks: 2,
    activities: [
      { name: 'Review highlighting', platforms: ['All'], isKey: true },
      { name: 'Community engagement', platforms: ['Community'], isKey: false },
      { name: 'Final push promotions', platforms: ['All'], isKey: true },
      { name: 'Results analysis', platforms: ['Internal'], isKey: false },
    ]
  },
];

// Calculate total campaign duration
const totalCampaignWeeks = campaignTimelineData.reduce((total, phase) => total + phase.weeks, 0);

const CampaignTimeline: React.FC = () => {
  return (
    <div className="p-4 bg-black/30 rounded-lg border border-white/10">
      <h3 className="flex items-center gap-2 text-sm font-medium mb-4">
        <Calendar className="w-4 h-4 text-primary" />
        Campaign Timeline Visualization
      </h3>
      
      {/* Gantt-style timeline visualization */}
      <div className="relative mb-6">
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
      
      {/* Weekly activity breakdown */}
      <div className="space-y-4">
        {campaignTimelineData.map((phase, phaseIdx) => (
          <div key={phaseIdx} className="p-3 bg-black/40 rounded-lg border border-white/5">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-xs text-primary font-medium flex items-center gap-1">
                {phaseIdx === 0 ? (
                  <Hourglass className="h-3 w-3 text-primary" />
                ) : phaseIdx === campaignTimelineData.length - 1 ? (
                  <Flag className="h-3 w-3 text-primary" />
                ) : (
                  <Clock className="h-3 w-3 text-primary" />
                )}
                {phase.phase}
              </h4>
              <span className="text-xs text-gray-500">{phase.weeks} {phase.weeks > 1 ? 'weeks' : 'week'}</span>
            </div>
            
            <div className="space-y-2">
              {phase.activities.map((activity, actIdx) => (
                <div 
                  key={actIdx} 
                  className={`p-2 rounded-sm flex items-start gap-2 ${
                    activity.isKey ? 'bg-primary/10 border-l-2 border-primary' : 'bg-black/20'
                  }`}
                >
                  {activity.isKey && <CheckCircle2 className="h-3 w-3 text-primary flex-shrink-0 mt-0.5" />}
                  <div>
                    <p className="text-xs font-medium">{activity.name}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {activity.platforms.map((platform, pIdx) => (
                        <span 
                          key={pIdx} 
                          className="px-1.5 py-0.5 bg-black/30 rounded-sm text-[10px] text-gray-400"
                        >
                          {platform}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampaignTimeline;
