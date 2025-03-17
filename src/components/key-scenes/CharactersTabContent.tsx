
import React from 'react';
import CharacterItem from './CharacterItem';
import { Character } from './types';

interface CharactersTabContentProps {
  characters: Character[];
}

const CharactersTabContent: React.FC<CharactersTabContentProps> = ({ characters }) => {
  return (
    <div className="space-y-6 focus-visible:outline-none focus-visible:ring-0">
      <p className="text-sm text-gray-400 mb-4">
        Analysis of main characters using the Big Five Personality Traits (OCEAN) model and their resonance with audience segments
      </p>
      
      <div className="grid gap-6">
        {characters.map((character, index) => (
          <CharacterItem key={index} character={character} index={index} />
        ))}
      </div>
    </div>
  );
};

export default CharactersTabContent;
