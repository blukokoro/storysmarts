
import React from 'react';
import { Button } from '@/components/ui/button';
import { SHOT_TYPES } from '@/types/storyboard';

interface ShotTypeSelectorProps {
  selectedType: string;
  onSelect: (type: string) => void;
}

export const ShotTypeSelector: React.FC<ShotTypeSelectorProps> = ({
  selectedType,
  onSelect
}) => {
  return (
    <div>
      <label className="text-xs text-gray-400 mb-1 block">Shot Type</label>
      <div className="flex flex-wrap gap-2">
        {SHOT_TYPES.slice(0, 5).map((type) => (
          <Button
            key={type}
            variant="outline"
            size="sm"
            className={`text-xs ${
              selectedType === type 
                ? 'bg-primary/20 border-primary text-primary' 
                : 'bg-black/20 border-white/10 text-gray-300'
            }`}
            onClick={() => onSelect(type)}
          >
            {type}
          </Button>
        ))}
        <Button
          variant="outline"
          size="sm"
          className="bg-black/20 border-white/10 text-gray-300"
        >
          More...
        </Button>
      </div>
    </div>
  );
};
