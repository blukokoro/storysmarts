
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';

interface TabButtonsProps {
  activeTab?: string;
}

const TabButtons: React.FC<TabButtonsProps> = ({ activeTab }) => {
  const isMobile = useIsMobile();
  
  return (
    <TabsList className="grid grid-cols-3 bg-black/30 backdrop-blur-md border border-white/10 mb-4">
      <TabsTrigger value="audience" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
        Audience
      </TabsTrigger>
      <TabsTrigger value="content" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
        Content Plan
      </TabsTrigger>
      <TabsTrigger value="sales" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
        Sales Prediction
      </TabsTrigger>
    </TabsList>
  );
};

export default TabButtons;
