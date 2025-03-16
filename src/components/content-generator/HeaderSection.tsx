
import React from 'react';
import { Sparkles } from 'lucide-react';

const HeaderSection: React.FC = () => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold mb-2 flex items-center">
        <Sparkles className="h-6 w-6 mr-2 text-primary animate-pulse" />
        AI Content Generator
      </h1>
      <p className="text-gray-400">
        Create professional marketing content from your documents using AI. Generate images, extract quotes, and create social media posts.
      </p>
    </div>
  );
};

export default HeaderSection;
