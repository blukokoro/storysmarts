
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Film, TrendingUp, Sparkles, PaintBucket, Users } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface TabNavigationHeaderProps {
  activeTab?: string;
}

const TabNavigationHeader: React.FC<TabNavigationHeaderProps> = ({ activeTab }) => {
  const isMobile = useIsMobile();

  return (
    <TabsList className={`${isMobile ? 'grid grid-cols-2 gap-1' : 'grid grid-cols-5'} bg-black/30 backdrop-blur-md border border-white/10 mb-6`}>
      <TabsTrigger value="comic" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
        Comic Book
      </TabsTrigger>
      <TabsTrigger value="scenes" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
        {isMobile ? (
          <span>Scenes</span>
        ) : (
          <>
            <Users className="h-4 w-4 mr-2" />
            Key Scenes
          </>
        )}
      </TabsTrigger>
      <TabsTrigger value="styles" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
        {isMobile ? (
          <span>Styles</span>
        ) : (
          <>
            <PaintBucket className="h-4 w-4 mr-2" />
            Artistic Styles
          </>
        )}
      </TabsTrigger>
      <TabsTrigger value="marketing" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
        Marketing
      </TabsTrigger>
      <TabsTrigger value="budget" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
        Budget
      </TabsTrigger>
    </TabsList>
  );
};

export default TabNavigationHeader;
