
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AIService } from '@/utils/aiService';
import { toast } from 'sonner';
import ApiKeyInput from './ApiKeyInput';
import StoryContentInput from './StoryContentInput';
import AnalyzeButton from './AnalyzeButton';

interface StoryInputProps {
  onAnalysisComplete: (analysis: any) => void;
  isAnalyzing: boolean;
  setIsAnalyzing: (value: boolean) => void;
}

const StoryInput: React.FC<StoryInputProps> = ({ 
  onAnalysisComplete, 
  isAnalyzing, 
  setIsAnalyzing 
}) => {
  const [title, setTitle] = useState('');
  const [story, setStory] = useState('');
  const [apiKey, setApiKey] = useState(AIService.getApiKey() || '');
  const [showApiInput, setShowApiInput] = useState(!AIService.getApiKey());

  useEffect(() => {
    // Persisting the API key in localStorage when component mounts
    if (apiKey && !AIService.getApiKey()) {
      AIService.setApiKey(apiKey);
    }
  }, [apiKey]);

  const handlePdfTextExtracted = (text: string) => {
    setStory(text);
    // Adding a log to debug the PDF extraction
    console.log('PDF text extracted:', text.substring(0, 100) + '...');
  };

  const handleAnalyze = async () => {
    if (!title.trim()) {
      toast.error("Please enter a title for your story");
      return;
    }

    if (!story.trim()) {
      toast.error("Please enter your story plot");
      return;
    }

    if (!AIService.getApiKey()) {
      setShowApiInput(true);
      toast.error("Please set your API key first");
      return;
    }

    try {
      setIsAnalyzing(true);
      const analysis = await AIService.analyzeStory(title, story);
      onAnalysisComplete(analysis);
      toast.success("Story analysis complete!");
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Failed to analyze story");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="w-full space-y-4 animate-fade-in">
      {showApiInput ? (
        <ApiKeyInput 
          initialApiKey={apiKey} 
          onSaved={() => {
            setApiKey(AIService.getApiKey() || '');
            setShowApiInput(false);
          }} 
        />
      ) : (
        <Button 
          variant="outline" 
          className="text-gray-400 hover:text-white border-gray-800 hover:border-gray-700 bg-transparent"
          onClick={() => setShowApiInput(true)}
        >
          Change API Key
        </Button>
      )}

      <Card className="glass-card overflow-hidden">
        <CardContent className="p-6">
          <h3 className="text-xl font-medium mb-4 text-white">Your Story</h3>
          
          <StoryContentInput
            title={title}
            setTitle={setTitle}
            story={story}
            setStory={setStory}
            isAnalyzing={isAnalyzing}
            onPdfTextExtracted={handlePdfTextExtracted}
          />
          
          <div className="mt-4">
            <AnalyzeButton 
              onClick={handleAnalyze}
              isAnalyzing={isAnalyzing}
              isDisabled={!story.trim() || !title.trim()}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StoryInput;
