
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-violet-950 to-blue-900 opacity-80" />
      
      {/* Animated particles for background effect */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-primary/40"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.8,
              animation: `pulse ${Math.random() * 4 + 2}s ease-in-out infinite alternate`,
            }}
          />
        ))}
      </div>
      
      <div className="relative pt-10 pb-16 px-6 md:pt-16 md:pb-24 max-w-6xl mx-auto">
        <div className="animate-fade-in space-y-8">
          {/* Announcement banner */}
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
          
          {/* Main headline */}
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-2 text-gradient">
              StorySmarts
            </h1>
            <h2 className="text-3xl md:text-4xl font-display font-medium mb-4">
              <span className="text-white">Transform Your </span>
              <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">Narrative</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Turn your creative ideas into ready-to-produce comics, storyboards, and film pitches with powerful AI analysis.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="group">
                Start Creating
                <Sparkles className="ml-2 w-4 h-4 group-hover:animate-pulse" />
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
            {[
              {
                icon: <Zap className="w-8 h-8 text-cyan-400" />,
                title: "AI Analysis",
                description: "Get detailed insights about your story structure, characters, and plot"
              },
              {
                icon: <Sparkles className="w-8 h-8 text-emerald-400" />,
                title: "Visual Production",
                description: "Transform text into comic panels, storyboards or film pitch materials"
              },
              {
                icon: <ArrowRight className="w-8 h-8 text-violet-400" />,
                title: "Market Ready",
                description: "Receive production-ready assets with audience and budget analysis"
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="glass-card p-5 rounded-lg backdrop-blur-xl bg-white/5 border border-white/10"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-3 p-3 rounded-full bg-black/30">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-medium text-white mb-1">{feature.title}</h3>
                  <p className="text-gray-300 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
