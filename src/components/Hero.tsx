
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Zap, FileSearch } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-violet-950 to-blue-900 opacity-80" />
      
      {/* Animated 3D elements */}
      <div className="absolute inset-0 opacity-60">
        {/* Floating cubes */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div 
            key={`cube-${i}`}
            className="absolute w-16 h-16 transform rotate-45"
            style={{
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 80 + 10}%`,
              background: `linear-gradient(to right, 
                hsl(${220 + i * 30}, 70%, 70%), 
                hsl(${260 + i * 30}, 70%, 60%))`,
              boxShadow: '0 0 30px rgba(140, 120, 255, 0.3)',
              animation: `float ${5 + i}s ease-in-out infinite alternate, 
                          spin ${10 + i * 2}s linear infinite`,
              opacity: 0.7,
              zIndex: 1,
              borderRadius: '15%',
            }}
          />
        ))}
        
        {/* Floating spheres */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div 
            key={`sphere-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 50 + 20}px`,
              height: `${Math.random() * 50 + 20}px`,
              top: `${Math.random() * 90}%`,
              left: `${Math.random() * 90}%`,
              background: `radial-gradient(circle at 30% 30%, 
                hsl(${180 + i * 40}, 80%, 75%), 
                hsl(${220 + i * 40}, 80%, 50%))`,
              boxShadow: '0 0 20px rgba(120, 200, 255, 0.3)',
              animation: `float ${4 + i}s ease-in-out infinite alternate, 
                          pulse ${3 + i}s ease-in-out infinite alternate`,
              opacity: 0.7,
              zIndex: 1,
            }}
          />
        ))}
        
        {/* Floating rings */}
        {Array.from({ length: 3 }).map((_, i) => (
          <div 
            key={`ring-${i}`}
            className="absolute rounded-full border-4 border-transparent"
            style={{
              width: `${100 + i * 50}px`,
              height: `${100 + i * 50}px`,
              top: `${20 + i * 20}%`,
              left: `${20 + i * 20}%`,
              background: 'transparent',
              borderImage: `linear-gradient(45deg, 
                hsl(${180 + i * 60}, 80%, 60%), 
                hsl(${240 + i * 60}, 80%, 50%)) 1`,
              transform: 'rotate3d(1, 1, 1, 45deg)',
              animation: `float ${6 + i}s ease-in-out infinite alternate, 
                          spin ${15 + i * 5}s linear infinite`,
              opacity: 0.5,
              zIndex: 1,
            }}
          />
        ))}
      </div>
      
      {/* Add keyframes for 3D animations using className instead of jsx style tag */}
      <style>
        {`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes spin {
          0% { transform: rotate3d(1, 1, 1, 0deg); }
          100% { transform: rotate3d(1, 1, 1, 360deg); }
        }
        
        @keyframes pulse {
          0% { opacity: 0.4; transform: scale(1); }
          100% { opacity: 0.8; transform: scale(1.2); }
        }
        `}
      </style>
      
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
          <div className="text-center space-y-6 relative z-10">
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
                className="glass-card p-5 rounded-lg backdrop-blur-xl bg-white/5 border border-white/10 hover:transform hover:scale-105 transition-transform duration-300"
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
