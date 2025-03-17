
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AnnouncementBanner: React.FC = () => {
  return (
    <div className="mx-auto w-fit bg-black/30 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 flex items-center space-x-2">
      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
      <p className="text-sm text-gray-300">AI-powered story analysis for creators</p>
      <Button variant="link" size="sm" asChild className="text-primary p-0 hover:text-primary/80">
        <Link to="/pricing" className="flex items-center">
          <span>Learn more</span>
          <ArrowRight className="ml-1 h-3 w-3" />
        </Link>
      </Button>
    </div>
  );
};

export default AnnouncementBanner;
