
import React, { useState } from 'react';
import StoryInput from '@/components/StoryInput';
import OutputSection from '@/components/OutputSection';
import Hero from '@/components/Hero';
import AnalyticsVisualizer from '@/components/AnalyticsVisualizer';
import WorkflowSection from '@/components/WorkflowSection';
import { StoryAnalysis } from '@/types';
import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const [analysis, setAnalysis] = useState<StoryAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalysisComplete = (result: StoryAnalysis) => {
    setAnalysis(result);
    // Scroll to results smoothly
    const resultsElement = document.getElementById('analysis-results');
    if (resultsElement) {
      resultsElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Function to scroll to input section
  const scrollToInput = () => {
    const inputElement = document.getElementById('story-input');
    if (inputElement) {
      inputElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Function to scroll back to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <Hero />
      
      {/* Analysis Results Section */}
      {analysis && (
        <div 
          id="analysis-results" 
          className="relative py-16 px-6"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/80 to-slate-950/80" />
          <div className="relative max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-display font-bold mb-2 text-gradient">Your Story Analysis</h2>
              <p className="text-gray-400">AI-generated insights for your narrative</p>
            </div>
            
            <OutputSection analysis={analysis} isVisible={!isAnalyzing && !!analysis} />
            
            <div className="flex justify-center mt-8">
              <Button 
                variant="outline" 
                onClick={scrollToInput}
                className="border-primary/20 bg-primary/5 text-primary hover:bg-primary/10"
              >
                <ArrowDown className="mr-2 h-4 w-4" />
                Try Another Story
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Story Input Section */}
      <div 
        id="story-input" 
        className="relative py-16 px-6"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 to-indigo-950/80" />
        <div className="relative max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-display font-bold mb-2 text-gradient">Analyze Your Story</h2>
            <p className="text-gray-400">Upload your narrative to get started</p>
          </div>
          
          <StoryInput 
            onAnalysisComplete={handleAnalysisComplete} 
            isAnalyzing={isAnalyzing}
            setIsAnalyzing={setIsAnalyzing}
          />
        </div>
      </div>
      
      {/* Analytics Visualizer Section */}
      {!analysis && <AnalyticsVisualizer />}
      
      {/* Workflow Section */}
      {!analysis && <WorkflowSection />}
      
      {/* CTA Section */}
      <div className="relative py-16 px-6">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 to-slate-950/80" />
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-gradient">
            Ready to Transform Your Story?
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Choose a production package or start with a free analysis today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/pricing">View Pricing Plans</Link>
            </Button>
            <Button size="lg" variant="outline" onClick={scrollToInput}>
              Start Free Analysis
            </Button>
          </div>
          
          {analysis && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={scrollToTop} 
              className="mt-8"
            >
              <ArrowUp className="mr-2 h-4 w-4" />
              Back to Top
            </Button>
          )}
        </div>
      </div>
      
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
