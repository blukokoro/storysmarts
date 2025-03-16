
import React from 'react';
import { PlusCircle } from 'lucide-react';
import { StoryboardFrame } from '@/types/storyboard';

interface TimelineViewProps {
  frames: StoryboardFrame[];
  currentFrameId: number;
  onFrameSelect: (id: number) => void;
  onAddFrame: () => void;
}

export const TimelineView: React.FC<TimelineViewProps> = ({
  frames,
  currentFrameId,
  onFrameSelect,
  onAddFrame
}) => {
  return (
    <div className="bg-black/20 border border-white/10 rounded-lg p-4">
      <h3 className="text-sm font-medium text-white mb-3">Timeline Position</h3>
      <div className="flex items-center space-x-1 overflow-x-auto py-2">
        {frames.map((frame) => (
          <div 
            key={frame.id}
            className={`flex-shrink-0 h-16 w-24 rounded border ${
              frame.id === currentFrameId 
                ? 'border-primary bg-primary/20' 
                : 'border-white/10 bg-black/30'
            } flex items-center justify-center cursor-pointer`}
            onClick={() => onFrameSelect(frame.id)}
          >
            <div className="text-center">
              <div className="text-xs font-medium">
                {frame.id === currentFrameId ? (
                  <span className="text-primary">Current</span>
                ) : (
                  <span className="text-gray-400">Frame {frame.id}</span>
                )}
              </div>
              {frame.image ? (
                <div className="h-8 w-12 mx-auto mt-1 overflow-hidden rounded">
                  <img 
                    src={frame.image} 
                    alt={`Frame ${frame.id} thumbnail`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="text-[10px] text-gray-500 mt-1">No image</div>
              )}
            </div>
          </div>
        ))}
        <div 
          className="flex-shrink-0 h-16 w-12 rounded border border-dashed border-white/10 bg-black/20 flex items-center justify-center cursor-pointer"
          onClick={onAddFrame}
        >
          <PlusCircle className="h-4 w-4 text-gray-400" />
        </div>
      </div>
    </div>
  );
};
