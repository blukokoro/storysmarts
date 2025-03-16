
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ImageIcon, MessageSquareQuote, PenSquare } from 'lucide-react';

interface TabButtonsProps {
  activeTab: string;
}

const TabButtons: React.FC<TabButtonsProps> = ({ activeTab }) => {
  return (
    <TabsList className="grid grid-cols-3 mb-4">
      <TabsTrigger 
        value="image-generator" 
        className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
      >
        <ImageIcon className="h-4 w-4 mr-2" />
        Images
      </TabsTrigger>
      <TabsTrigger 
        value="quote-extractor" 
        className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
      >
        <MessageSquareQuote className="h-4 w-4 mr-2" />
        Quotes
      </TabsTrigger>
      <TabsTrigger 
        value="text-generator" 
        className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
      >
        <PenSquare className="h-4 w-4 mr-2" />
        Text
      </TabsTrigger>
    </TabsList>
  );
};

export default TabButtons;
