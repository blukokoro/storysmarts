
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save, PlayCircle } from 'lucide-react';

interface StoryboardHeaderProps {
  onSave: () => void;
  onPreview: () => void;
}

export const StoryboardHeader: React.FC<StoryboardHeaderProps> = ({
  onSave,
  onPreview
}) => {
  return (
    <header className="mb-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-display font-bold text-gradient">Storyboard Creator</h1>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="bg-white/5 hover:bg-white/10"
            onClick={onSave}
          >
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
          <Button 
            className="bg-primary text-white"
            onClick={onPreview}
          >
            <PlayCircle className="mr-2 h-4 w-4" />
            Preview
          </Button>
        </div>
      </div>
      <p className="text-gray-400 mt-2">
        Create and organize your visual narrative sequence
      </p>
    </header>
  );
};
