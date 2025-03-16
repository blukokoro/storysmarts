
import React from 'react';
import PlatformBreakdownChart from './PlatformBreakdownChart';

interface PlatformBreakdownSectionProps {
  platformBreakdown: any;
  customTarget: string;
}

const PlatformBreakdownSection: React.FC<PlatformBreakdownSectionProps> = ({ 
  platformBreakdown, 
  customTarget 
}) => {
  return (
    <div>
      <PlatformBreakdownChart 
        platformBreakdown={platformBreakdown} 
        customTarget={customTarget}
      />
    </div>
  );
};

export default PlatformBreakdownSection;
