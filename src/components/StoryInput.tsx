
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AIService } from '@/utils/aiService';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

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
  const [story, setStory] = useState('');
  const [apiKey, setApiKey] = useState(AIService.getApiKey() || '');
  const [showApiInput, setShowApiInput] = useState(!AIService.getApiKey());

  const handleApiKeySave = () => {
    if (!apiKey.trim()) {
      toast.error("Please enter a valid API key");
      return;
    }
    
    AIService.setApiKey(apiKey);
    setShowApiInput(false);
  };

  const handleAnalyze = async () => {
    if (!story.trim()) {
      toast.error("Please enter your story first");
      return;
    }

    if (!AIService.getApiKey()) {
      setShowApiInput(true);
      toast.error("Please set your API key first");
      return;
    }

    try {
      setIsAnalyzing(true);
      const analysis = await AIService.analyzeStory(story);
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
        <Card className="glass-card overflow-hidden">
          <CardContent className="p-6">
            <h3 className="text-xl font-medium mb-4 text-white">Connect to AI API</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="api-key" className="block text-sm font-medium text-gray-300 mb-1">
                  API Key
                </label>
                <input
                  id="api-key"
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your API key"
                  className="glass-input w-full px-4 py-2 rounded-md text-white placeholder:text-gray-500"
                />
              </div>
              <Button 
                onClick={handleApiKeySave}
                className="w-full bg-primary hover:bg-primary/90 text-white transition-all duration-300"
              >
                Save API Key
              </Button>
            </div>
          </CardContent>
        </Card>
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
          <textarea
            value={story}
            onChange={(e) => setStory(e.target.value)}
            placeholder="Enter your story or screenplay idea here... (minimum 100 words for accurate analysis)"
            className="glass-input w-full h-64 p-4 rounded-md text-white placeholder:text-gray-500 resize-none"
            disabled={isAnalyzing}
          />
          <div className="mt-4">
            <Button 
              onClick={handleAnalyze} 
              disabled={isAnalyzing || !story.trim()} 
              className="w-full bg-primary hover:bg-primary/90 text-white transition-all duration-300"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing Story...
                </>
              ) : (
                "Analyze Story"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StoryInput;
