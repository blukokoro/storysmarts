
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const AnnouncementBanner: React.FC = () => {
  return (
    <div className="mx-auto w-fit bg-black/20 backdrop-blur-md border border-amber-500/20 rounded-full px-4 py-2 flex items-center space-x-2">
      <div className="flex items-center">
        <Sparkles className="w-3 h-3 text-amber-300 mr-2" />
      </div>
      <p className="text-sm text-amber-200 font-light">AI-powered story analysis for creators</p>
      <Button variant="link" size="sm" asChild className="text-amber-300 p-0 hover:text-amber-200">
        <Link to="/pricing" className="flex items-center">
          <span>Learn more</span>
          <ArrowRight className="ml-1 h-3 w-3" />
        </Link>
      </Button>
    </div>
  );
};

export default AnnouncementBanner;
