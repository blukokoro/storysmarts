import React, { useState, useEffect } from 'react';
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
  const [showForm, setShowForm] = useState(true);
  const {
    user
  } = useAuth();
  const navigate = useNavigate();
  const handleAnalysisComplete = (result: StoryAnalysis) => {
    setAnalysis(result);
    setShowForm(false); // Hide the form after analysis is complete
    // Scroll to top smoothly
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Function to go back to form without losing analysis
  const backToForm = () => {
    setShowForm(true);
    // Scroll to top smoothly
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
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
        title: analysis?.title || 'Untitled Analysis',
        analysis
      });
      localStorage.setItem('savedAnalyses', JSON.stringify(savedAnalyses));
      toast.success("Analysis saved to your profile");
    } catch (error) {
      toast.error("Failed to save analysis");
      console.error(error);
    }
  };
  return <div className="min-h-screen bg-background text-foreground">
      {/* Results Section (shows at the top when analysis is complete) */}
      {analysis && !showForm && <div className="relative py-12 px-6">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-indigo-950/80" />
          <div className="relative max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-3xl font-display font-bold mb-2 text-gradient">Analysis Results: {analysis.title}</h2>
                <p className="text-gray-400">AI-generated insights for your narrative</p>
              </div>
              <div className="flex space-x-4">
                <Button variant="outline" onClick={backToForm}>
                  Back to Input
                </Button>
                <Button onClick={saveAnalysis} className="border-primary/20 bg-primary/5 text-primary hover:bg-primary/10">
                  Save to Profile
                </Button>
              </div>
            </div>
            
            <OutputSection analysis={analysis} isVisible={!isAnalyzing && !!analysis} />
          </div>
        </div>}
      
      {/* Story Input Section (visible by default or when showForm is true) */}
      {showForm && <div className="relative py-16 px-6">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-indigo-950/80" />
          <div className="relative max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-display mb-2 text-gradient font-medium">Analyze Your Story</h2>
              <p className="text-gray-400">Upload your narrative to get started with your free analysis</p>
            </div>
            
            <StoryInput onAnalysisComplete={handleAnalysisComplete} isAnalyzing={isAnalyzing} setIsAnalyzing={setIsAnalyzing} />
          </div>
        </div>}
      
      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-6 backdrop-blur-md bg-black/30">
        <div className="max-w-6xl mx-auto text-center text-gray-500 text-sm">
          <p>StorySmarts © {new Date().getFullYear()} | AI-Powered Story Analysis</p>
        </div>
      </footer>
    </div>;
};
export default Analyze;