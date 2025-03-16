
import React, { useState } from 'react';
import { Zap, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { campaignTimelineData } from './timelineData';
import GanttTimeline from './GanttTimeline';
import PhaseSection from './PhaseSection';
import ActivationBanner from './ActivationBanner';
import AdvancedFeaturesCTA from './AdvancedFeaturesCTA';

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
        <h3 className="text-sm font-medium">Campaign Timeline</h3>
        
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
      {showAdvanced && <ActivationBanner onActivate={handleActivateFeatures} />}
      
      {/* Gantt-style timeline visualization */}
      <GanttTimeline />
      
      {/* Weekly activity breakdown */}
      <div className="space-y-4">
        {campaignTimelineData.map((phase, phaseIdx) => (
          <PhaseSection 
            key={phaseIdx}
            phase={phase}
            phaseIdx={phaseIdx}
            totalPhases={campaignTimelineData.length}
            showAdvanced={showAdvanced}
            onActivate={handleActivateFeatures}
          />
        ))}
      </div>
      
      {/* Advanced features CTA */}
      {!showAdvanced && <AdvancedFeaturesCTA onShowAdvanced={() => setShowAdvanced(true)} />}
    </div>
  );
};

export default CampaignTimeline;
