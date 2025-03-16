
import React from 'react';

interface PlatformTagsProps {
  platforms: string[];
}

const PlatformTags: React.FC<PlatformTagsProps> = ({ platforms }) => {
  return (
    <div className="flex flex-wrap gap-1 mt-1">
      {platforms.map((platform, pIdx) => (
        <span 
          key={pIdx} 
          className="px-1.5 py-0.5 bg-black/30 rounded-sm text-[10px] text-gray-400"
        >
          {platform}
        </span>
      ))}
    </div>
  );
};

export default PlatformTags;
