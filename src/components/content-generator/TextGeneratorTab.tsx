
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, PenSquare } from 'lucide-react';

interface TextGeneratorTabProps {
  documentText: string;
  isLoading: boolean;
  onGenerateMarketingText: () => void;
}

const TextGeneratorTab: React.FC<TextGeneratorTabProps> = ({
  documentText,
  isLoading,
  onGenerateMarketingText
}) => {
  return (
    <div>
      <p className="text-sm mb-4">
        Generate marketing text, social media posts, and other content based on your document.
      </p>
      
      {!documentText && (
        <div className="p-4 bg-primary/10 border border-primary/20 rounded-md text-sm">
          Please upload a document first to generate marketing text.
        </div>
      )}
      
      <Button
        onClick={onGenerateMarketingText}
        className="w-full mt-4 bg-primary hover:bg-primary/90"
        disabled={isLoading || !documentText.trim()}
      >
        {isLoading ? (
          <>
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            Generating text...
          </>
        ) : (
          <>
            <PenSquare className="h-4 w-4 mr-2" />
            Generate Marketing Text
          </>
        )}
      </Button>
    </div>
  );
};

export default TextGeneratorTab;
