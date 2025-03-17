
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const AIContentGeneratorCard: React.FC = () => {
  return (
    <Card className="p-6 mb-6 bg-gradient-to-r from-indigo-900/60 to-purple-900/60 border border-primary/20 shadow-lg">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h3 className="text-2xl font-bold text-gradient mb-2 flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-primary animate-pulse" />
            AI Content Generator
          </h3>
          <p className="text-gray-300 mb-2">
            Transform your analysis into marketing content, images, and social media posts with our AI engine.
          </p>
        </div>
        <Button asChild size="lg" className="whitespace-nowrap bg-primary hover:bg-primary/90">
          <Link to="/content-generator">
            <Sparkles className="h-4 w-4 mr-2" />
            Generate AI Content
          </Link>
        </Button>
      </div>
    </Card>
  );
};

export default AIContentGeneratorCard;
