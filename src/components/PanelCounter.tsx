
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ComicPanelsAnalysis } from '@/types';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface PanelCounterProps {
  data: ComicPanelsAnalysis;
}

const PanelCounter: React.FC<PanelCounterProps> = ({ data }) => {
  // Calculate panel info to display
  const totalPanels = data.recommendedPanels.reduce((sum, panel) => sum + panel.count, 0);
  const totalPages = Math.ceil(totalPanels / 6); // Assuming average of 6 panels per page

  return (
    <Card className="glass-card h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium text-white flex justify-between items-center">
          <span>Comic Book Design</span>
          <Button asChild variant="outline" size="sm" className="bg-primary/20 border-primary/40 text-primary hover:bg-primary/30">
            <Link to="/pricing">Get Comic Book (€399 - 20 pages)</Link>
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-black/30 backdrop-blur-sm p-3 rounded-lg text-center">
            <h4 className="text-sm text-gray-400">Recommended Panels</h4>
            <p className="text-2xl font-semibold text-white">{totalPanels}</p>
          </div>
          <div className="bg-black/30 backdrop-blur-sm p-3 rounded-lg text-center">
            <h4 className="text-sm text-gray-400">Estimated Pages</h4>
            <p className="text-2xl font-semibold text-white">{totalPages}</p>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-md font-medium text-white">Panel Breakdown</h4>
          {data.recommendedPanels.map((panel, index) => (
            <div key={index} className="bg-black/20 backdrop-blur-sm border border-white/5 p-3 rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-white">{panel.type}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary">
                  {panel.count} panels
                </span>
              </div>
              <p className="text-xs text-gray-400">{panel.description}</p>
            </div>
          ))}
        </div>
        
        <div className="space-y-2">
          <h4 className="text-md font-medium text-white">Art Style</h4>
          <div className="bg-black/20 backdrop-blur-sm border border-white/5 p-3 rounded-lg">
            <p className="text-sm text-gray-200">{data.recommendedArtStyle}</p>
          </div>
        </div>
        
        <div className="space-y-1">
          <h4 className="text-md font-medium text-white">Character Focus</h4>
          <div className="flex flex-wrap gap-2 mt-1">
            {data.characterFocus.map((character, index) => (
              <span 
                key={index}
                className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-300 border border-white/10"
              >
                {character}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PanelCounter;
