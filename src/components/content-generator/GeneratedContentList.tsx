
import React from 'react';
import { Button } from '@/components/ui/button';
import { CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Layout } from 'lucide-react';
import GeneratedContentItem from './GeneratedContentItem';

interface GeneratedContent {
  type: 'image' | 'text' | 'quote';
  content: string;
  prompt?: string;
}

interface GeneratedContentListProps {
  generatedContent: GeneratedContent[];
  onClearAll: () => void;
  onRemoveItem: (index: number) => void;
}

const GeneratedContentList: React.FC<GeneratedContentListProps> = ({
  generatedContent,
  onClearAll,
  onRemoveItem
}) => {
  return (
    <>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Generated Content</span>
          {generatedContent.length > 0 && (
            <Button variant="outline" size="sm" onClick={onClearAll}>
              Clear All
            </Button>
          )}
        </CardTitle>
        <CardDescription>
          Your AI-generated images, quotes, and marketing text will appear here
        </CardDescription>
      </CardHeader>
      <CardContent>
        {generatedContent.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center p-6 border border-dashed border-gray-700 rounded-md">
            <Layout className="h-12 w-12 text-gray-500 mb-4" />
            <h3 className="text-xl font-medium text-gray-300 mb-2">No content generated yet</h3>
            <p className="text-gray-400 max-w-md">
              Upload a document and use the tools on the left to generate content. Your created content will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {generatedContent.map((content, index) => (
              <GeneratedContentItem 
                key={index} 
                content={content} 
                onRemove={() => onRemoveItem(index)} 
              />
            ))}
          </div>
        )}
      </CardContent>
    </>
  );
};

export default GeneratedContentList;
