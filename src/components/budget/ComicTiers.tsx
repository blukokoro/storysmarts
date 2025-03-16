
import React from 'react';

const ComicTiers: React.FC = () => {
  const comicTiers = [
    { name: "Comic Basic", price: 299, pages: "8 pages (40 panels)", features: "B&W illustrations, basic design" },
    { name: "Comic Standard", price: 399, pages: "10 pages (50 panels)", features: "Color illustrations, 2 revisions" },
    { name: "Comic Premium", price: 599, pages: "15 pages (75 panels)", features: "Premium illustrations, marketing materials" }
  ];

  return (
    <div>
      <h4 className="text-sm font-medium text-white mb-2">Comic Book Production Tiers</h4>
      <div className="space-y-3">
        {comicTiers.map((tier, index) => (
          <div 
            key={index} 
            className="bg-black/20 backdrop-blur-sm p-3 rounded border border-white/5"
          >
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-white">{tier.name}</span>
              <span className="text-sm font-medium text-primary">€{tier.price}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="text-xs text-gray-400">
                <span className="text-gray-300">Pages: </span>{tier.pages}
              </div>
              <div className="text-xs text-gray-400">
                <span className="text-gray-300">Features: </span>{tier.features}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComicTiers;
