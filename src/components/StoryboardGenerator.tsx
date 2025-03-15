
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StoryboardAnalysis } from '@/types';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Download } from 'lucide-react';
import { toast } from 'sonner';

interface StoryboardGeneratorProps {
  data: StoryboardAnalysis;
}

const StoryboardGenerator: React.FC<StoryboardGeneratorProps> = ({ data }) => {
  const handleDownload = () => {
    // In a real app, this would initiate a download of the storyboard
    toast.success("Storyboard download started");
    // Simulate a download for demo purposes
    setTimeout(() => {
      toast.success("Storyboard downloaded successfully");
    }, 1500);
  };
  
  return (
    <Card className="glass-card h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium text-white flex justify-between items-center">
          <span>Storyboard Analysis</span>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-primary/10 border-primary/30 text-primary hover:bg-primary/20"
              onClick={handleDownload}
            >
              <Download className="h-4 w-4 mr-1" />
              Download Free
            </Button>
            <Button asChild variant="outline" size="sm" className="bg-primary/20 border-primary/40 text-primary hover:bg-primary/30">
              <Link to="/pricing">Get Storyboard (€499)</Link>
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between bg-black/30 backdrop-blur-sm p-3 rounded-lg mb-4">
          <div>
            <h4 className="text-sm text-gray-400">Scene Count</h4>
            <p className="text-2xl font-semibold text-white">{data.sceneCount}</p>
          </div>
          <div>
            <h4 className="text-sm text-gray-400">Visual Style</h4>
            <p className="text-sm text-white">{data.visualStyle}</p>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-md font-medium text-white">Key Scenes</h4>
          <div className="space-y-3">
            {data.keyScenes.map((scene) => (
              <div 
                key={scene.id} 
                className="bg-black/20 backdrop-blur-sm border border-white/5 p-3 rounded-lg transition-all hover:border-primary/30"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary">
                    {scene.shotType}
                  </span>
                  <span className="text-xs text-gray-500">Scene {scene.id}</span>
                </div>
                <p className="text-sm text-gray-200 mb-1">{scene.description}</p>
                <p className="text-xs text-gray-400 italic">{scene.visualNotes}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-1">
          <h4 className="text-md font-medium text-white">Recommended Shot Types</h4>
          <div className="flex flex-wrap gap-2 mt-1">
            {data.shotTypes.map((shotType, index) => (
              <span 
                key={index}
                className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-300 border border-white/10"
              >
                {shotType}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StoryboardGenerator;
