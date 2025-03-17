
import React from 'react';

interface SceneItemProps {
  scene: string;
  index: number;
  generateSceneTitle: (scene: string) => string;
}

const SceneItem: React.FC<SceneItemProps> = ({ scene, index, generateSceneTitle }) => {
  return (
    <div className="bg-black/30 backdrop-blur-sm p-4 rounded-lg border border-primary/20">
      <h3 className="text-primary font-medium mb-1">Scene {index + 1}: {generateSceneTitle(scene)}</h3>
      <p className="text-sm text-gray-300">{scene}</p>
      <div className="mt-2 flex gap-2">
        <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
          Page {Math.floor(index * 2) + 1}-{Math.floor(index * 2) + 2}
        </span>
        <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
          {index === 0 ? 'Opening' : index === scene.length - 1 ? 'Climax' : 'Key Moment'}
        </span>
      </div>
    </div>
  );
};

export default SceneItem;
