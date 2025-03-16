
import React, { useState } from 'react';
import StoryInput from '@/components/StoryInput';
import OutputSection from '@/components/OutputSection';
import { StoryAnalysis } from '@/types';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Analyze = () => {
  const [analysis, setAnalysis] = useState<StoryAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAnalysisComplete = (result: StoryAnalysis) => {
    setAnalysis(result);
    // Scroll to results smoothly
    const resultsElement = document.getElementById('analysis-results');
    if (resultsElement) {
      resultsElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Function to scroll back to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Function to save analysis to profile
  const saveAnalysis = () => {
    if (!user) {
      toast.error("Please sign in to save your analysis");
      navigate('/sign-in');
      return;
    }
    
    try {
      // Save the analysis to localStorage for this prototype
      // In a real app, this would save to a database
      const savedAnalyses = JSON.parse(localStorage.getItem('savedAnalyses') || '[]');
      savedAnalyses.push({
        id: Date.now(),
        date: new Date().toISOString(),
        title: analysis?.title || 'Untitled Analysis', // Use the title from StoryAnalysis instead
        analysis
      });
      localStorage.setItem('savedAnalyses', JSON.stringify(savedAnalyses));
      
      toast.success("Analysis saved to your profile");
    } catch (error) {
      toast.error("Failed to save analysis");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Story Input Section */}
      <div 
        className="relative py-16 px-6"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-indigo-950/80" />
        <div className="relative max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-display font-bold mb-2 text-gradient">Analyze Your Story</h2>
            <p className="text-gray-400">Upload your narrative to get started with your free analysis</p>
          </div>
          
          <StoryInput 
            onAnalysisComplete={handleAnalysisComplete} 
            isAnalyzing={isAnalyzing}
            setIsAnalyzing={setIsAnalyzing}
          />
        </div>
      </div>
      
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
            
            <div className="flex justify-center mt-8 gap-4">
              <Button 
                onClick={saveAnalysis}
                className="border-primary/20 bg-primary/5 text-primary hover:bg-primary/10"
              >
                Save Analysis to Profile
              </Button>
              
              <Button 
                variant="outline" 
                onClick={scrollToTop}
              >
                <ArrowUp className="mr-2 h-4 w-4" />
                Back to Top
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-6 backdrop-blur-md bg-black/30">
        <div className="max-w-6xl mx-auto text-center text-gray-500 text-sm">
          <p>StorySmarts © {new Date().getFullYear()} | AI-Powered Story Analysis</p>
        </div>
      </footer>
    </div>
  );
};

export default Analyze;
