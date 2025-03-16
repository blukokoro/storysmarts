
import React from 'react';
import { StoryboardFrame } from '@/types/storyboard';

interface FrameListItemProps {
  frame: StoryboardFrame;
  isActive: boolean;
  onClick: () => void;
}

export const FrameListItem: React.FC<FrameListItemProps> = ({
  frame,
  isActive,
  onClick
}) => {
  return (
    <div 
      className={`p-3 rounded-lg border cursor-pointer transition-all ${
        isActive 
          ? 'bg-primary/20 border-primary/40' 
          : 'bg-black/20 border-white/5 hover:border-white/20'
      }`}
      onClick={onClick}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-white">{frame.title}</h3>
        <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
          {frame.cards} cards
        </span>
      </div>
      <p className="text-xs text-gray-400 mt-1 line-clamp-2">
        {frame.description}
      </p>
      {frame.image && (
        <div className="mt-2 relative h-16 rounded-md overflow-hidden">
          <img 
            src={frame.image} 
            alt={`Frame ${frame.id}`} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  );
};
