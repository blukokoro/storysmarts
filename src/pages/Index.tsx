
import React from 'react';
import Hero from '@/components/Hero';
import BenefitsSection from '@/components/BenefitsSection';
import AnalyticsVisualizer from '@/components/AnalyticsVisualizer';
import WorkflowSection from '@/components/WorkflowSection';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { FileSearch } from 'lucide-react';
import SectionBackground from '@/components/ui/SectionBackground';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <Hero />
      
      {/* Benefits Section - With cyan animation */}
      <SectionBackground 
        gradientFrom="from-blue-950/90" 
        gradientVia="via-indigo-950/90" 
        gradientTo="to-slate-950/90"
        animationColor="cyan"
      >
        <BenefitsSection />
      </SectionBackground>
      
      {/* Analytics Visualizer Section - With purple animation */}
      <SectionBackground 
        gradientFrom="from-slate-950/80" 
        gradientVia="via-purple-950/80" 
        gradientTo="to-indigo-950/80"
        animationColor="purple"
      >
        <AnalyticsVisualizer />
      </SectionBackground>
      
      {/* Workflow Section - With green animation */}
      <SectionBackground 
        gradientFrom="from-blue-900/80" 
        gradientVia="via-indigo-900/80" 
        gradientTo="to-blue-950/80"
        animationColor="green"
      >
        <WorkflowSection />
      </SectionBackground>
      
      {/* CTA Section - Back to amber animation */}
      <SectionBackground 
        gradientFrom="from-blue-950/80" 
        gradientVia="via-slate-950/80" 
        gradientTo="to-amber-950/80"
        animationColor="amber"
      >
        <div className="py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-gradient">
              Ready to Transform Your Story?
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              Start with a free analysis or choose a production package today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/analyze">
                  <FileSearch className="mr-2 h-5 w-5" />
                  Analyze for Free
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/pricing">View Pricing Plans</Link>
              </Button>
            </div>
          </div>
        </div>
      </SectionBackground>
      
      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-6 backdrop-blur-md bg-black/30">
        <div className="max-w-6xl mx-auto text-center text-gray-500 text-sm">
          <p>StorySmarts © {new Date().getFullYear()} | AI-Powered Story Analysis</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
