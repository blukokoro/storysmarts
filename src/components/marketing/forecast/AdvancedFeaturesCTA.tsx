
import React from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdvancedFeaturesCTAProps {
  onShowAdvanced: () => void;
}

const AdvancedFeaturesCTA: React.FC<AdvancedFeaturesCTAProps> = ({ onShowAdvanced }) => {
  return (
    <div className="mt-4 p-3 border border-dashed border-primary/30 rounded-lg bg-primary/5 text-center">
      <Sparkles className="h-4 w-4 text-primary mx-auto mb-2" />
      <p className="text-xs mb-2">Unlock advanced AI-powered marketing activities</p>
      <Button 
        size="sm" 
        variant="outline" 
        className="text-xs"
        onClick={onShowAdvanced}
      >
        Show Advanced Features
      </Button>
    </div>
  );
};

export default AdvancedFeaturesCTA;
