
import React from 'react';
import CharacterTraits from './CharacterTraits';
import CharacterAudience from './CharacterAudience';
import { Character } from './types';

interface CharacterItemProps {
  character: Character;
  index: number;
}

const CharacterItem: React.FC<CharacterItemProps> = ({ character, index }) => {
  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-lg border border-primary/20 overflow-hidden">
      <div className="p-4 border-b border-primary/20 bg-primary/10">
        <h3 className="text-lg font-medium text-white">{character.name}</h3>
        <p className="text-sm text-gray-300 mt-1">{character.description}</p>
      </div>
      
      <div className="p-4">
        <CharacterTraits traits={character.traits} />
        <CharacterAudience 
          audience={character.audience} 
          audienceResonance={character.audienceResonance} 
        />
      </div>
    </div>
  );
};

export default CharacterItem;
