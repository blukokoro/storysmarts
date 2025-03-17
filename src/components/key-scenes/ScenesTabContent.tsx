
import React from 'react';
import SceneItem from './SceneItem';

interface ScenesTabContentProps {
  scenes: string[];
  generateSceneTitle: (scene: string) => string;
}

const ScenesTabContent: React.FC<ScenesTabContentProps> = ({ scenes, generateSceneTitle }) => {
  return (
    <div className="space-y-4 focus-visible:outline-none focus-visible:ring-0">
      <p className="text-sm text-gray-400 mb-4">
        These crucial moments from your story would make excellent focus points for your comic panels
      </p>
      
      <div className="grid gap-4">
        {scenes.map((scene, index) => (
          <SceneItem 
            key={index} 
            scene={scene} 
            index={index} 
            generateSceneTitle={generateSceneTitle} 
          />
        ))}
      </div>
    </div>
  );
};

export default ScenesTabContent;
