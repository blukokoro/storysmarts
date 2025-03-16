
import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Hourglass, 
  Flag, A
  lertCircle, 
  Lock, 
  Sparkles, 
  Zap, 
  MessagesSquare 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

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
    ],
    advancedActivities: [
      { name: 'AI-generated content templates', platforms: ['All'], requiresActivation: true },
      { name: 'Competitor analysis', platforms: ['Research'], requiresActivation: false },
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
    ],
    advancedActivities: [
      { name: 'Automated response system', platforms: ['Social'], requiresActivation: true },
      { name: 'Real-time analytics dashboard', platforms: ['Internal'], requiresActivation: false },
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
    ],
    advancedActivities: [
      { name: 'AI-powered audience segmentation', platforms: ['Ad Platforms'], requiresActivation: true },
      { name: 'A/B testing optimization', platforms: ['Email', 'Ads'], requiresActivation: false },
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
    ],
    advancedActivities: [
      { name: 'Sentiment analysis of reviews', platforms: ['Social', 'Reviews'], requiresActivation: true },
      { name: 'Automated report generation', platforms: ['Internal'], requiresActivation: false },
    ]
  },
];

// Calculate total campaign duration
const totalCampaignWeeks = campaignTimelineData.reduce((total, phase) => total + phase.weeks, 0);

const CampaignTimeline: React.FC = () => {
  const [showAdvanced, setShowAdvanced] = useState<boolean>(true);
  
  const handleActivateFeatures = () => {
    toast.info("To activate AI-powered features, please upgrade your subscription.", {
      duration: 5000,
      action: {
        label: "Upgrade Now",
        onClick: () => {
          // Navigation to upgrade page would go here
          toast.success("Redirecting to upgrade options...");
        }
      }
    });
  };

  return (
    <div className="p-4 bg-black/30 rounded-lg border border-white/10">
      <div className="flex justify-between items-center mb-4">
        <h3 className="flex items-center gap-2 text-sm font-medium">
          <Calendar className="w-4 h-4 text-primary" />
          Campaign Timeline Visualization
        </h3>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs h-7 px-2 flex items-center gap-1"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          {showAdvanced ? (
            <>
              <Zap className="w-3 h-3 text-primary" />
              Hide Advanced
            </>
          ) : (
            <>
              <Sparkles className="w-3 h-3 text-primary" />
              Show Advanced
            </>
          )}
        </Button>
      </div>
      
      {/* Feature activation banner */}
      {showAdvanced && (
        <div className="mb-4 p-2 bg-primary/10 border border-primary/30 rounded-md flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-primary" />
            <span className="text-xs">Some advanced AI features require activation</span>
          </div>
          <Button 
            size="sm" 
            className="text-xs h-7 px-2"
            onClick={handleActivateFeatures}
          >
            Activate
          </Button>
        </div>
      )}
      
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
              
              {/* Advanced activities */}
              {showAdvanced && phase.advancedActivities && phase.advancedActivities.length > 0 && (
                <>
                  <div className="mt-2 mb-1 border-t border-white/5 pt-2">
                    <span className="text-[10px] uppercase text-primary/70 font-medium flex items-center">
                      <Sparkles className="h-3 w-3 mr-1" /> Advanced Activities
                    </span>
                  </div>
                  
                  {phase.advancedActivities.map((activity, actIdx) => (
                    <div 
                      key={`adv-${actIdx}`} 
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
                              onClick={handleActivateFeatures}
                            >
                              Activate
                            </Button>
                          )}
                        </div>
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
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Advanced features CTA */}
      {!showAdvanced && (
        <div className="mt-4 p-3 border border-dashed border-primary/30 rounded-lg bg-primary/5 text-center">
          <Sparkles className="h-4 w-4 text-primary mx-auto mb-2" />
          <p className="text-xs mb-2">Unlock advanced AI-powered marketing activities</p>
          <Button 
            size="sm" 
            variant="outline" 
            className="text-xs"
            onClick={() => setShowAdvanced(true)}
          >
            Show Advanced Features
          </Button>
        </div>
      )}
    </div>
  );
};

export default CampaignTimeline;
