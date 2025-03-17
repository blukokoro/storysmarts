
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Zap, FileSearch } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnnouncementBanner from './AnnouncementBanner';
import FeatureCard from './FeatureCard';

const HeroContent: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-8">
      {/* Announcement banner */}
      <AnnouncementBanner />
      
      {/* Main headline */}
      <div className="text-center space-y-6 relative z-10">
        <h1 className="text-5xl md:text-7xl font-sans font-light tracking-tight mb-2 text-white">
          Story<span className="font-normal">Smarts</span>
        </h1>
        <h2 className="text-3xl md:text-4xl font-sans font-light mb-4">
          <span className="text-white">Transform Your </span>
          <span className="text-gray-300">Narrative</span>
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto text-lg font-light">
          Turn your creative ideas into ready-to-produce comics, storyboards, and film pitches with powerful AI analysis.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center pt-4">
          <Button size="lg" className="group" asChild>
            <Link to="/analyze">
              Analyze for Free
              <FileSearch className="ml-2 w-4 h-4 group-hover:animate-pulse" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/pricing">
              View Pricing
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
      
      {/* Features highlight */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 relative z-10">
        {[
          {
            icon: <Zap className="w-8 h-8 text-white" />,
            title: "AI Analysis",
            description: "Get detailed insights about your story structure, characters, and plot"
          },
          {
            icon: <Sparkles className="w-8 h-8 text-white" />,
            title: "Visual Production",
            description: "Transform text into comic panels, storyboards or film pitch materials"
          },
          {
            icon: <ArrowRight className="w-8 h-8 text-white" />,
            title: "Market Ready",
            description: "Receive production-ready assets with audience and budget analysis"
          }
        ].map((feature, index) => (
          <FeatureCard 
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroContent;
