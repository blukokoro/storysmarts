
import React from 'react';
import { Film } from 'lucide-react';

export const ShotSuggestions: React.FC = () => {
  return (
    <div className="bg-black/20 border border-white/10 rounded-lg p-4">
      <h3 className="text-sm font-medium text-white mb-3">
        <Film className="h-4 w-4 inline mr-2 text-primary" />
        Shot Suggestions
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-black/30 p-3 rounded border border-white/5">
          <h4 className="text-xs font-medium text-primary">Character Focus</h4>
          <p className="text-xs text-gray-400 mt-1">Medium close-up to capture emotional reactions during dialogue</p>
        </div>
        <div className="bg-black/30 p-3 rounded border border-white/5">
          <h4 className="text-xs font-medium text-primary">Environment</h4>
          <p className="text-xs text-gray-400 mt-1">Wide establishing shot to showcase the location context</p>
        </div>
        <div className="bg-black/30 p-3 rounded border border-white/5">
          <h4 className="text-xs font-medium text-primary">Movement</h4>
          <p className="text-xs text-gray-400 mt-1">Tracking shot following subject from left to right</p>
        </div>
      </div>
    </div>
  );
};
