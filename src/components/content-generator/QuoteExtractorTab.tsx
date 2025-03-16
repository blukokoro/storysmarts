
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, MessageSquareQuote } from 'lucide-react';

interface QuoteExtractorTabProps {
  documentText: string;
  isLoading: boolean;
  onGenerateQuotes: () => void;
}

const QuoteExtractorTab: React.FC<QuoteExtractorTabProps> = ({
  documentText,
  isLoading,
  onGenerateQuotes
}) => {
  return (
    <div>
      <p className="text-sm mb-4">
        Extract memorable quotes from your document that can be used in social media posts, marketing materials, and more.
      </p>
      
      {!documentText && (
        <div className="p-4 bg-primary/10 border border-primary/20 rounded-md text-sm">
          Please upload a document first to extract quotes.
        </div>
      )}
      
      <Button
        onClick={onGenerateQuotes}
        className="w-full mt-4 bg-primary hover:bg-primary/90"
        disabled={isLoading || !documentText.trim()}
      >
        {isLoading ? (
          <>
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            Extracting quotes...
          </>
        ) : (
          <>
            <MessageSquareQuote className="h-4 w-4 mr-2" />
            Extract Quotes
          </>
        )}
      </Button>
    </div>
  );
};

export default QuoteExtractorTab;
