
import React from 'react';
import { ArrowRight, Book, Film, PieChart, Zap, MessageSquare, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import SectionBackground from '@/components/ui/SectionBackground';

const LearnMore = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <SectionBackground 
        gradientFrom="from-slate-950" 
        gradientVia="via-slate-900" 
        gradientTo="to-amber-950/30"
      >
        <div className="py-16 px-6 max-w-6xl mx-auto">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-sans font-light tracking-tight mb-2 text-white">
              Transform Your Story with <span className="font-normal text-amber-200">StorySmarts</span>
            </h1>
            <p className="text-amber-100/80 max-w-2xl mx-auto text-lg font-light">
              Unlock the full potential of your narrative with AI-powered analysis and visualization
            </p>
          </div>
        </div>
      </SectionBackground>

      {/* Multi-format Visualization Section */}
      <SectionBackground 
        gradientFrom="from-blue-950/90" 
        gradientVia="via-indigo-950/90" 
        gradientTo="to-slate-950/90"
      >
        <div className="py-16 px-6 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display mb-4 text-gradient font-medium">
              Multi-format Visualization
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              See your story come to life in multiple formats, helping you understand its potential across different media
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 hover:border-amber-500/20 transition-all">
              <div className="mb-4 p-3 rounded-full bg-black/30 w-fit">
                <Book className="w-8 h-8 text-amber-300" />
              </div>
              <h3 className="text-xl font-medium text-white mb-3">Comic Format</h3>
              <p className="text-gray-300 mb-4">Transform your narrative into a visually engaging comic layout with panel breakdown, character design, and scene composition suggestions.</p>
              <div className="h-1 w-12 bg-gradient-to-r from-amber-500 to-transparent rounded-full" />
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 hover:border-amber-500/20 transition-all">
              <div className="mb-4 p-3 rounded-full bg-black/30 w-fit">
                <Film className="w-8 h-8 text-amber-300" />
              </div>
              <h3 className="text-xl font-medium text-white mb-3">Film Adaptation</h3>
              <p className="text-gray-300 mb-4">Convert your story into a compelling film pitch with storyboards, shot recommendations, and cinematic visualization.</p>
              <div className="h-1 w-12 bg-gradient-to-r from-amber-500 to-transparent rounded-full" />
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 hover:border-amber-500/20 transition-all">
              <div className="mb-4 p-3 rounded-full bg-black/30 w-fit">
                <MessageSquare className="w-8 h-8 text-amber-300" />
              </div>
              <h3 className="text-xl font-medium text-white mb-3">Narrative Analysis</h3>
              <p className="text-gray-300 mb-4">Receive detailed feedback on your story structure, character development, pacing, and thematic elements.</p>
              <div className="h-1 w-12 bg-gradient-to-r from-amber-500 to-transparent rounded-full" />
            </div>
          </div>
        </div>
      </SectionBackground>

      {/* Actionable Insights Section */}
      <SectionBackground 
        gradientFrom="from-slate-950/80" 
        gradientVia="via-purple-950/80" 
        gradientTo="to-indigo-950/80"
      >
        <div className="py-16 px-6 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display mb-4 text-gradient font-medium">
              Actionable Insights
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Don't just analyze—take action with practical recommendations to improve and monetize your story
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 hover:border-amber-500/20 transition-all">
              <div className="mb-4 p-3 rounded-full bg-black/30 w-fit">
                <PieChart className="w-8 h-8 text-amber-300" />
              </div>
              <h3 className="text-xl font-medium text-white mb-3">Market Analysis</h3>
              <p className="text-gray-300 mb-4">Understand your target audience, market potential, and positioning with data-driven insights and comparable success stories.</p>
              <div className="h-1 w-12 bg-gradient-to-r from-amber-500 to-transparent rounded-full" />
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 hover:border-amber-500/20 transition-all">
              <div className="mb-4 p-3 rounded-full bg-black/30 w-fit">
                <Zap className="w-8 h-8 text-amber-300" />
              </div>
              <h3 className="text-xl font-medium text-white mb-3">Production Guidance</h3>
              <p className="text-gray-300 mb-4">Receive practical production recommendations, budget estimates, and timeline projections to bring your story to life.</p>
              <div className="h-1 w-12 bg-gradient-to-r from-amber-500 to-transparent rounded-full" />
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 hover:border-amber-500/20 transition-all">
              <div className="mb-4 p-3 rounded-full bg-black/30 w-fit">
                <Palette className="w-8 h-8 text-amber-300" />
              </div>
              <h3 className="text-xl font-medium text-white mb-3">Creative Enhancement</h3>
              <p className="text-gray-300 mb-4">Explore AI-generated style suggestions, character designs, and creative direction to elevate your storytelling.</p>
              <div className="h-1 w-12 bg-gradient-to-r from-amber-500 to-transparent rounded-full" />
            </div>
          </div>
        </div>
      </SectionBackground>

      {/* CTA Section */}
      <SectionBackground 
        gradientFrom="from-blue-950/80" 
        gradientVia="via-slate-950/80" 
        gradientTo="to-amber-950/80"
      >
        <div className="py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-gradient">
              Ready to Transform Your Story?
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              Start with a free analysis or explore our subscription options for advanced features.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/analyze">
                  Analyze for Free
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/pricing">
                  View Pricing
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </SectionBackground>
    </div>
  );
};

export default LearnMore;
