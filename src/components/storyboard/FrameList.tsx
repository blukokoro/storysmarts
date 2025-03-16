
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { StoryboardFrame } from '@/types/storyboard';
import { FrameListItem } from './FrameListItem';

interface FrameListProps {
  frames: StoryboardFrame[];
  activeFrame: number;
  onFrameSelect: (id: number) => void;
  onAddFrame: () => void;
}

export const FrameList: React.FC<FrameListProps> = ({
  frames,
  activeFrame,
  onFrameSelect,
  onAddFrame
}) => {
  return (
    <div className="space-y-2">
      {frames.map((frame) => (
        <FrameListItem 
          key={frame.id}
          frame={frame}
          isActive={activeFrame === frame.id}
          onClick={() => onFrameSelect(frame.id)}
        />
      ))}
      
      <Button 
        variant="outline" 
        className="w-full mt-4 border-dashed border-white/20 bg-black/30 hover:bg-black/50"
        onClick={onAddFrame}
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Add New Frame
      </Button>
    </div>
  );
};
