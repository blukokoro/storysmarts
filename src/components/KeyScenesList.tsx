
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface KeyScenesListProps {
  scenes: string[];
}

const KeyScenesList: React.FC<KeyScenesListProps> = ({ scenes }) => {
  // Function to generate a title for each scene based on its content
  const generateSceneTitle = (scene: string): string => {
    // Extract the first few words for a title
    const words = scene.split(' ');
    const titleWords = words.slice(0, Math.min(3, words.length));
    return titleWords.join(' ').replace(/[.,!?;:]$/, '') + '...';
  };

  return (
    <Card className="glass-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium text-white">Key Scenes Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-400 mb-4">
          These crucial moments from your story would make excellent focus points for your comic panels
        </p>
        
        <div className="grid gap-4">
          {scenes.map((scene, index) => (
            <div key={index} className="bg-black/30 backdrop-blur-sm p-4 rounded-lg border border-primary/20">
              <h3 className="text-primary font-medium mb-1">Scene {index + 1}: {generateSceneTitle(scene)}</h3>
              <p className="text-sm text-gray-300">{scene}</p>
              <div className="mt-2 flex gap-2">
                <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                  Page {Math.floor(index * 2) + 1}-{Math.floor(index * 2) + 2}
                </span>
                <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                  {index === 0 ? 'Opening' : index === scenes.length - 1 ? 'Climax' : 'Key Moment'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default KeyScenesList;
