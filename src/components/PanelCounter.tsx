
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ComicPanelAnalysis } from '@/types';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface PanelCounterProps {
  data: ComicPanelAnalysis;
}

const PanelCounter: React.FC<PanelCounterProps> = ({ data }) => {
  // Calculate panel info to display
  const totalPanels = data.suggestedPanelCount;
  const totalPages = data.suggestedPageCount;

  return (
    <Card className="glass-card h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium text-white flex justify-between items-center">
          <span>Comic Book Design</span>
          <Button asChild variant="outline" size="sm" className="bg-primary/20 border-primary/40 text-primary hover:bg-primary/30">
            <Link to="/pricing">See Comic Pricing</Link>
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
          <div className="bg-black/20 backdrop-blur-sm border border-white/5 p-3 rounded-lg">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-white">Key Scenes</span>
            </div>
            {data.keyScenesForPanels.map((scene, index) => (
              <p key={index} className="text-xs text-gray-400 mb-1">{scene}</p>
            ))}
          </div>
          <div className="bg-black/20 backdrop-blur-sm border border-white/5 p-3 rounded-lg">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-white">Layout Style</span>
            </div>
            <p className="text-xs text-gray-400">{data.panelLayout}</p>
          </div>
        </div>
        
        <div className="space-y-2 mt-4">
          <div className="grid grid-cols-3 gap-2">
            <Button asChild variant="outline" size="sm" className="bg-primary/10 border-primary/30 text-primary hover:bg-primary/20">
              <Link to="/pricing">Basic €299</Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="bg-primary/20 border-primary/40 text-primary hover:bg-primary/30">
              <Link to="/pricing">Standard €399</Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="bg-primary/30 border-primary/50 text-primary hover:bg-primary/40">
              <Link to="/pricing">Premium €599</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PanelCounter;
