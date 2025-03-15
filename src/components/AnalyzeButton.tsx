
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface AnalyzeButtonProps {
  onClick: () => void;
  isAnalyzing: boolean;
  isDisabled: boolean;
}

const AnalyzeButton: React.FC<AnalyzeButtonProps> = ({ 
  onClick, 
  isAnalyzing, 
  isDisabled 
}) => {
  return (
    <Button 
      onClick={onClick} 
      disabled={isAnalyzing || isDisabled} 
      className="w-full bg-primary hover:bg-primary/90 text-white transition-all duration-300"
      data-testid="analyze-button"
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
  );
};

export default AnalyzeButton;
