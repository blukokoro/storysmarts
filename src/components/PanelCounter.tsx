
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ComicPanelAnalysis } from '@/types';

interface PanelCounterProps {
  data: ComicPanelAnalysis;
}

const PanelCounter: React.FC<PanelCounterProps> = ({ data }) => {
  return (
    <Card className="glass-card h-full overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium text-white">Comic Book Analysis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center p-4 bg-black/30 backdrop-blur-sm rounded-lg">
            <span className="text-sm text-gray-400 mb-1">Suggested Pages</span>
            <span className="text-3xl font-semibold text-white">{data.suggestedPageCount}</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-black/30 backdrop-blur-sm rounded-lg">
            <span className="text-sm text-gray-400 mb-1">Total Panels</span>
            <span className="text-3xl font-semibold text-white">{data.suggestedPanelCount}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <h4 className="text-md font-medium text-white">Key Scenes for Panels</h4>
          <ul className="space-y-2">
            {data.keyScenesForPanels.map((scene, index) => (
              <li key={index} className="text-sm text-gray-300 flex items-start">
                <span className="inline-flex items-center justify-center bg-primary/20 text-primary h-5 w-5 rounded-full text-xs mr-2 mt-0.5 flex-shrink-0">
                  {index + 1}
                </span>
                <span>{scene}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="space-y-1">
          <h4 className="text-md font-medium text-white">Recommended Layout</h4>
          <p className="text-sm text-gray-300">{data.panelLayout}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PanelCounter;
