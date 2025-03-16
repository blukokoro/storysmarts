
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ImageIcon, Upload } from 'lucide-react';
import { StoryboardFrame } from '@/types/storyboard';
import { ShotTypeSelector } from './ShotTypeSelector';
import { ShotSuggestions } from './ShotSuggestions';
import { TimelineView } from './TimelineView';

interface FrameEditorProps {
  frame: StoryboardFrame;
  frames: StoryboardFrame[];
  onUploadImage: (frameId: number) => void;
  onUpdateTitle: (frameId: number, title: string) => void;
  onUpdateDescription: (frameId: number, description: string) => void;
  onUpdateShotType: (frameId: number, shotType: string) => void;
  onFrameSelect: (id: number) => void;
  onAddFrame: () => void;
}

export const FrameEditor: React.FC<FrameEditorProps> = ({
  frame,
  frames,
  onUploadImage,
  onUpdateTitle,
  onUpdateDescription,
  onUpdateShotType,
  onFrameSelect,
  onAddFrame
}) => {
  return (
    <div className="space-y-6">
      <Card className="bg-black/30 border-white/10">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/2">
              <div className="rounded-lg border border-dashed border-white/20 flex flex-col items-center justify-center p-4 h-[300px] relative overflow-hidden bg-black/20">
                {frame.image ? (
                  <>
                    <img 
                      src={frame.image} 
                      alt={`Frame ${frame.id}`} 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <Button 
                        variant="secondary" 
                        size="sm"
                        onClick={() => onUploadImage(frame.id)}
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Replace Image
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="text-center">
                    <div className="flex flex-col items-center">
                      <ImageIcon className="h-10 w-10 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-400 mb-2">Upload frame image</p>
                      <p className="text-xs text-gray-500 mb-4">PNG, JPG or GIF</p>
                      <Button 
                        variant="secondary" 
                        size="sm"
                        onClick={() => onUploadImage(frame.id)}
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Select Image
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="w-full md:w-1/2 space-y-4">
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Frame Title</label>
                <Input 
                  value={frame.title}
                  onChange={(e) => onUpdateTitle(frame.id, e.target.value)}
                  className="bg-black/20 border-white/10 text-white"
                />
              </div>
              
              <ShotTypeSelector 
                selectedType={frame.shotType}
                onSelect={(type) => onUpdateShotType(frame.id, type)}
              />
              
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Scene Description</label>
                <Textarea 
                  value={frame.description}
                  onChange={(e) => onUpdateDescription(frame.id, e.target.value)}
                  className="bg-black/20 border-white/10 text-white h-[140px] resize-none"
                  placeholder="Describe the visual elements, camera movements, and action in this frame..."
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <ShotSuggestions />
      
      <TimelineView 
        frames={frames}
        currentFrameId={frame.id}
        onFrameSelect={onFrameSelect} 
        onAddFrame={onAddFrame}
      />
    </div>
  );
};
