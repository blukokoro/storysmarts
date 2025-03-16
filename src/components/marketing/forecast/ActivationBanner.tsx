
import React from 'react';
import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ActivationBannerProps {
  onActivate: () => void;
}

const ActivationBanner: React.FC<ActivationBannerProps> = ({ onActivate }) => {
  return (
    <div className="mb-4 p-2 bg-primary/10 border border-primary/30 rounded-md flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Lock className="h-4 w-4 text-primary" />
        <span className="text-xs">Some advanced AI features require activation</span>
      </div>
      <Button 
        size="sm" 
        className="text-xs h-7 px-2"
        onClick={onActivate}
      >
        Activate
      </Button>
    </div>
  );
};

export default ActivationBanner;
