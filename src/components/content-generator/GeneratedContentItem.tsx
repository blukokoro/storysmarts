
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquareQuote, PenSquare, X } from 'lucide-react';

interface GeneratedContent {
  type: 'image' | 'text' | 'quote';
  content: string;
  prompt?: string;
}

interface GeneratedContentItemProps {
  content: GeneratedContent;
  onRemove: () => void;
}

const GeneratedContentItem: React.FC<GeneratedContentItemProps> = ({ content, onRemove }) => {
  return (
    <div className="p-4 bg-black/20 border border-white/10 rounded-md relative group hover:border-primary/30 transition-colors">
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0"
          onClick={onRemove}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      {content.type === 'image' && (
        <div className="space-y-2">
          <div className="aspect-square max-w-full overflow-hidden rounded-md">
            <img 
              src={content.content} 
              alt="Generated" 
              className="w-full h-full object-cover"
            />
          </div>
          {content.prompt && (
            <p className="text-xs text-gray-400 mt-2">Prompt: {content.prompt}</p>
          )}
        </div>
      )}
      
      {content.type === 'quote' && (
        <div className="flex">
          <MessageSquareQuote className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-1" />
          <div>
            <p className="italic text-white">{content.content}</p>
            <div className="flex items-center mt-2 gap-2">
              <Button variant="outline" size="sm" className="h-7 text-xs">
                Copy
              </Button>
              <Button variant="outline" size="sm" className="h-7 text-xs">
                Use in Post
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {content.type === 'text' && (
        <div className="flex">
          <PenSquare className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-1" />
          <div>
            <p className="text-white">{content.content}</p>
            <div className="flex items-center mt-2 gap-2">
              <Button variant="outline" size="sm" className="h-7 text-xs">
                Copy
              </Button>
              <Button variant="outline" size="sm" className="h-7 text-xs">
                Edit
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeneratedContentItem;
