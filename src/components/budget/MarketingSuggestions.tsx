
import React from 'react';
import { Megaphone, CalendarClock, Target } from 'lucide-react';

const MarketingSuggestions: React.FC = () => {
  const marketingSuggestions = [
    { 
      title: "Seasonal Timing",
      suggestions: [
        "Summer release for maximum youth engagement",
        "Fall launch to coincide with convention season",
        "Holiday season for gift-focused promotions"
      ]
    },
    {
      title: "Target Locations",
      suggestions: [
        "Urban centers with high concentration of 25-34 demographic",
        "College campuses for reaching secondary 18-24 audience",
        "Comic book shops and independent theaters for direct marketing"
      ]
    },
    {
      title: "Platform Strategy",
      suggestions: [
        "Instagram/TikTok for visual teasers and behind-the-scenes",
        "YouTube for trailer and making-of content",
        "Reddit AMAs focused on sci-fi and filmmaking communities"
      ]
    }
  ];

  return (
    <div>
      <h4 className="text-sm font-medium text-white mb-3 flex items-center">
        <Megaphone className="w-4 h-4 mr-2 text-primary" />
        Marketing Suggestions
      </h4>
      <div className="space-y-3">
        {marketingSuggestions.map((category, index) => (
          <div 
            key={index} 
            className="bg-black/20 backdrop-blur-sm p-3 rounded border border-white/5"
          >
            <h5 className="text-sm font-medium text-primary mb-2 flex items-center">
              {index === 0 && <CalendarClock className="w-3 h-3 mr-1" />}
              {index === 1 && <Target className="w-3 h-3 mr-1" />}
              {index === 2 && <Megaphone className="w-3 h-3 mr-1" />}
              {category.title}
            </h5>
            <ul className="space-y-1">
              {category.suggestions.map((suggestion, idx) => (
                <li key={idx} className="text-xs text-gray-300 flex items-start">
                  <span className="text-primary mr-1">•</span>
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-2">
        Based on your project's target audience of 25-34 year olds interested in science fiction and character-driven narratives.
      </p>
    </div>
  );
};

export default MarketingSuggestions;
