
import React from 'react';
import { Button } from '@/components/ui/button';
import { CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import { Brain, Loader, ArrowRight } from 'lucide-react';
import { ContentAnalysis } from './types';

interface AnalysisResultsCardProps {
  documentText: string;
  isLoading: boolean;
  isAnalyzing: boolean;
  analysisProgress: number;
  contentAnalysis: ContentAnalysis | null;
  onAnalyzeDocument: () => void;
  onViewContentPlan: () => void;
}

const AnalysisResultsCard: React.FC<AnalysisResultsCardProps> = ({
  documentText,
  isLoading,
  isAnalyzing,
  analysisProgress,
  contentAnalysis,
  onAnalyzeDocument,
  onViewContentPlan
}) => {
  return (
    <>
      <CardHeader>
        <CardTitle>Document Analysis</CardTitle>
        <CardDescription>
          Analyze your document to identify key themes, topics, and content opportunities
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!documentText && (
          <div className="p-4 bg-primary/10 border border-primary/20 rounded-md text-sm">
            Please upload a document first to analyze content.
          </div>
        )}
        
        {documentText && !isAnalyzing && analysisProgress < 100 && (
          <Button
            onClick={onAnalyzeDocument}
            className="w-full bg-primary hover:bg-primary/90"
            disabled={isLoading}
          >
            <Brain className="h-4 w-4 mr-2" />
            Analyze Document
          </Button>
        )}
        
        {isAnalyzing && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-1">
              <Label>Analyzing document...</Label>
              <span className="text-xs text-gray-400">{Math.round(analysisProgress)}%</span>
            </div>
            <Progress value={analysisProgress} className="h-2" />
            <div className="text-xs text-gray-400 animate-pulse">
              <Loader className="h-3 w-3 inline-block mr-2 animate-spin" />
              Extracting key themes and content opportunities...
            </div>
          </div>
        )}
        
        {analysisProgress === 100 && contentAnalysis && (
          <div className="space-y-4">
            <div className="flex items-center text-primary">
              <Brain className="h-4 w-4 mr-2" />
              <span className="font-medium">Analysis Complete</span>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-black/20 p-3 rounded-lg border border-white/10">
                <h4 className="text-xs font-medium mb-2">Key Themes</h4>
                <div className="flex flex-wrap gap-1">
                  {contentAnalysis.keyThemes.map((theme, i) => (
                    <span key={i} className="text-xs px-2 py-0.5 bg-primary/20 rounded-full">
                      {theme}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-black/20 p-3 rounded-lg border border-white/10">
                <h4 className="text-xs font-medium mb-2">Content Sentiment</h4>
                <div className="flex items-center">
                  <div className="w-full bg-black/30 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${contentAnalysis.sentimentScore * 100}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-xs">{Math.round(contentAnalysis.sentimentScore * 100)}%</span>
                </div>
                <p className="text-xs mt-1">
                  {contentAnalysis.sentimentScore > 0.6 ? 'Positive' : 
                   contentAnalysis.sentimentScore > 0.4 ? 'Neutral' : 'Negative'}
                </p>
              </div>
            </div>
            
            <Button
              onClick={onViewContentPlan}
              className="w-full bg-primary/20 hover:bg-primary/30 text-primary"
            >
              View Full Content Plan
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}
      </CardContent>
    </>
  );
};

export default AnalysisResultsCard;
