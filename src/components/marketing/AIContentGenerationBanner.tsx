
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const AIContentGenerationBanner: React.FC = () => {
  return (
    <div className="my-6 p-6 bg-gradient-to-r from-primary/30 to-black/40 rounded-xl border border-primary/40 shadow-lg">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-xl font-bold flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-primary animate-pulse" />
            AI Content Generation Studio
          </h2>
          <p className="text-sm text-gray-300 mt-1 max-w-2xl">
            Create professional content for your marketing campaigns using our AI engine.
            Generate images, captions, and social media posts based on your story.
          </p>
        </div>
        <Button 
          size="lg" 
          className="whitespace-nowrap bg-primary hover:bg-primary/90"
          asChild
        >
          <Link to="/content-generator">
            <Sparkles className="h-4 w-4 mr-2" />
            Create Content with AI
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default AIContentGenerationBanner;
