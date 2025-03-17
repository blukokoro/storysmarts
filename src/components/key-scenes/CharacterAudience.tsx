
import React from 'react';

interface CharacterAudienceProps {
  audience: {
    primary: string;
    psychographic: string;
  };
  audienceResonance: string[];
}

const CharacterAudience: React.FC<CharacterAudienceProps> = ({ audience, audienceResonance }) => {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-primary font-medium text-sm mb-2">Target Audience</h4>
        <div className="bg-black/20 p-3 rounded border border-primary/10">
          <p className="text-sm text-gray-300">
            <span className="text-primary font-medium">Primary:</span> {audience.primary}
          </p>
          <p className="text-sm text-gray-300 mt-1">
            <span className="text-primary font-medium">Psychographic Profile:</span> {audience.psychographic}
          </p>
        </div>
      </div>
      
      <div>
        <h4 className="text-primary font-medium text-sm mb-2">Audience Resonance</h4>
        <ul className="space-y-1">
          {audienceResonance.map((point, i) => (
            <li key={i} className="text-sm text-gray-300 flex items-start">
              <span className="text-primary mr-2">•</span>
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CharacterAudience;
