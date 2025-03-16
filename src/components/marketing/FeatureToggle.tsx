
import React from 'react';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';

interface FeatureToggleProps {
  showNewFeatures: boolean;
  setShowNewFeatures: React.Dispatch<React.SetStateAction<boolean>>;
}

const FeatureToggle: React.FC<FeatureToggleProps> = ({ 
  showNewFeatures, 
  setShowNewFeatures 
}) => {
  return (
    <div className="flex justify-end mb-4">
      <Button 
        variant="outline" 
        className="flex items-center gap-2"
        onClick={() => setShowNewFeatures(!showNewFeatures)}
      >
        <Info size={16} />
        {showNewFeatures ? "Hide Advanced Features" : "Show Advanced Features"}
      </Button>
    </div>
  );
};

export default FeatureToggle;
