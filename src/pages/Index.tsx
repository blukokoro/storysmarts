
import React, { useState } from 'react';
import StoryInput from '@/components/StoryInput';
import OutputSection from '@/components/OutputSection';
import { StoryAnalysis } from '@/types';

const Index = () => {
  const [analysis, setAnalysis] = useState<StoryAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalysisComplete = (result: StoryAnalysis) => {
    setAnalysis(result);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 md:mb-12 text-center">
          <div className="animate-fade-in">
            <h1 className="text-gradient text-4xl md:text-5xl font-display font-bold tracking-tight mb-4">
              StorySmarts
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              AI-powered story analysis for creators. Transform your narrative into a comic book, 
              storyboard, or film pitch with detailed insights.
            </p>
          </div>
        </header>

        <main className="flex flex-col items-center">
          {/* Analysis Results at the top */}
          <div className="w-full max-w-4xl mb-10">
            {analysis && (
              <OutputSection analysis={analysis} isVisible={!isAnalyzing && !!analysis} />
            )}
          </div>

          {/* Story Input Section below */}
          <div className="w-full max-w-3xl">
            <StoryInput 
              onAnalysisComplete={handleAnalysisComplete} 
              isAnalyzing={isAnalyzing}
              setIsAnalyzing={setIsAnalyzing}
            />
          </div>
        </main>

        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>StorySmarts © {new Date().getFullYear()} | AI-Powered Story Analysis</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
