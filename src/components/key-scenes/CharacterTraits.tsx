
import React from 'react';

interface CharacterTraitsProps {
  traits: {
    openness: number;
    conscientiousness: number;
    extraversion: number;
    agreeableness: number;
    neuroticism: number;
  };
}

const CharacterTraits: React.FC<CharacterTraitsProps> = ({ traits }) => {
  return (
    <>
      <h4 className="text-primary font-medium text-sm mb-3">Personality Profile (OCEAN)</h4>
      <div className="grid grid-cols-5 gap-2 mb-4">
        {Object.entries(traits).map(([trait, value], i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="h-24 w-4 bg-black/50 rounded-full relative mb-1">
              <div 
                className="absolute bottom-0 w-full rounded-full bg-primary/70"
                style={{ height: `${value}%` }}
              ></div>
            </div>
            <span className="text-xs text-gray-400 capitalize">{trait.substring(0, 1)}</span>
          </div>
        ))}
      </div>
      
      <div className="text-xs text-gray-400 flex justify-between px-2 mb-4">
        <span>O: Openness</span>
        <span>C: Conscientiousness</span>
        <span>E: Extraversion</span>
        <span>A: Agreeableness</span>
        <span>N: Neuroticism</span>
      </div>
    </>
  );
};

export default CharacterTraits;
