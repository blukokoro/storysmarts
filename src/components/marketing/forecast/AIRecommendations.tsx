
import React from 'react';
import { Lock, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface AIRecommendationsProps {
  customTarget: string;
}

const AIRecommendations: React.FC<AIRecommendationsProps> = ({ customTarget }) => {
  const targetSales = parseInt(customTarget);
  
  const handleActivateFeatures = () => {
    toast.info("To access advanced AI marketing recommendations, please upgrade your subscription.", {
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
    <div className="p-4 bg-gradient-to-r from-primary/10 to-transparent rounded-lg border border-primary/10">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium flex items-center gap-1">
          <Sparkles className="w-4 h-4 text-primary" />
          AI Recommendations
        </h3>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-6 px-2 text-xs"
          onClick={handleActivateFeatures}
        >
          <Lock className="w-3 h-3 mr-1" />
          Upgrade
        </Button>
      </div>
      
      <p className="text-xs mb-2">Based on your sales target of {targetSales} copies:</p>
      
      {/* Basic recommendations (always available) */}
      <div className="mb-3">
        <ul className="text-xs space-y-1">
          <li className="flex items-start gap-1">
            <Zap className="h-3 w-3 text-primary flex-shrink-0 mt-0.5" />
            <span>Focus 55% of budget on Instagram and TikTok for highest conversion</span>
          </li>
          <li className="flex items-start gap-1">
            <Zap className="h-3 w-3 text-primary flex-shrink-0 mt-0.5" />
            <span>Schedule posts between 6-8pm for optimal engagement</span>
          </li>
          <li className="flex items-start gap-1">
            <Zap className="h-3 w-3 text-primary flex-shrink-0 mt-0.5" />
            <span>Consider bundles/packages to increase average order value</span>
          </li>
        </ul>
      </div>
      
      {/* Advanced recommendations (require activation) */}
      <div className="mt-3 pt-3 border-t border-white/5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] uppercase text-primary/70 font-medium flex items-center">
            <Sparkles className="h-3 w-3 mr-1" /> Advanced Insights
          </span>
        </div>
        
        <ul className="text-xs space-y-2">
          <li className="flex items-start gap-1 opacity-70">
            <Lock className="h-3 w-3 text-primary flex-shrink-0 mt-0.5" />
            <span>Custom audience targeting suggestions based on your niche</span>
          </li>
          <li className="flex items-start gap-1 opacity-70">
            <Lock className="h-3 w-3 text-primary flex-shrink-0 mt-0.5" />
            <span>Competitive analysis of similar products in your category</span>
          </li>
          <li className="flex items-start gap-1 opacity-70">
            <Lock className="h-3 w-3 text-primary flex-shrink-0 mt-0.5" />
            <span>Custom content calendar optimized for your target demographics</span>
          </li>
        </ul>
        
        <Button 
          className="w-full mt-3 text-xs h-8"
          size="sm"
          onClick={handleActivateFeatures}
        >
          <Lock className="w-3 h-3 mr-1" />
          Activate Advanced Features
        </Button>
      </div>
    </div>
  );
};

export default AIRecommendations;
