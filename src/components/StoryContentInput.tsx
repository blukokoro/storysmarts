
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import PdfUploader from './PdfUploader';

interface StoryContentInputProps {
  title: string;
  setTitle: (title: string) => void;
  story: string;
  setStory: (story: string) => void;
  isAnalyzing: boolean;
  onPdfTextExtracted: (text: string) => void;
}

const StoryContentInput: React.FC<StoryContentInputProps> = ({
  title,
  setTitle,
  story,
  setStory,
  isAnalyzing,
  onPdfTextExtracted
}) => {
  return (
    <div className="space-y-4">
      <div className="mb-4">
        <label htmlFor="story-title" className="block text-sm font-medium text-gray-300 mb-1">
          Title
        </label>
        <Input
          id="story-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter your story title"
          className="glass-input w-full px-4 py-2 rounded-md text-white placeholder:text-gray-500"
          disabled={isAnalyzing}
        />
      </div>
      
      <Tabs defaultValue="text" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="text">Write Plot</TabsTrigger>
          <TabsTrigger value="pdf">Upload PDF</TabsTrigger>
        </TabsList>
        
        <TabsContent value="text">
          <label htmlFor="story-plot" className="block text-sm font-medium text-gray-300 mb-1">
            Story Plot
          </label>
          <textarea
            id="story-plot"
            value={story}
            onChange={(e) => setStory(e.target.value)}
            placeholder="Enter your story plot here... (minimum 100 words for accurate analysis)"
            className="glass-input w-full h-64 p-4 rounded-md text-white placeholder:text-gray-500 resize-none"
            disabled={isAnalyzing}
          />
        </TabsContent>
        
        <TabsContent value="pdf">
          <div className="mb-4">
            <PdfUploader onTextExtracted={onPdfTextExtracted} />
          </div>
          
          {story && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-300 mb-2">Extracted Text Preview:</h4>
              <div className="glass-input w-full max-h-48 p-4 rounded-md text-white overflow-y-auto text-sm">
                {story.length > 500 
                  ? story.substring(0, 500) + '...' 
                  : story}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StoryContentInput;
