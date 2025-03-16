
import React from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import DocumentUploader from './DocumentUploader';
import AnalysisResultsCard from './AnalysisResultsCard';
import { ContentAnalysis } from './types';

interface DocumentAnalysisSectionProps {
  documentText: string;
  setDocumentText: (text: string) => void;
  isLoading: boolean;
  isAnalyzing: boolean;
  analysisProgress: number;
  contentAnalysis: ContentAnalysis | null;
  autoGenerateContent: boolean;
  setAutoGenerateContent: (value: boolean) => void;
  onFileUpload: (file: File) => Promise<void>;
  onAnalyzeDocument: () => void;
  onViewContentPlan: () => void;
}

const DocumentAnalysisSection: React.FC<DocumentAnalysisSectionProps> = ({
  documentText,
  setDocumentText,
  isLoading,
  isAnalyzing,
  analysisProgress,
  contentAnalysis,
  autoGenerateContent,
  setAutoGenerateContent,
  onFileUpload,
  onAnalyzeDocument,
  onViewContentPlan
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="bg-black/30 backdrop-blur-sm border border-white/10">
        <DocumentUploader 
          documentText={documentText}
          setDocumentText={setDocumentText}
          onFileUpload={onFileUpload}
        />
        
        <div className="px-6 pb-6 mt-4 flex items-center space-x-2">
          <Switch
            id="auto-generate"
            checked={autoGenerateContent}
            onCheckedChange={setAutoGenerateContent}
          />
          <Label htmlFor="auto-generate">Auto-analyze after upload</Label>
        </div>
      </Card>

      <Card className="bg-black/30 backdrop-blur-sm border border-white/10">
        <AnalysisResultsCard
          documentText={documentText}
          isLoading={isLoading}
          isAnalyzing={isAnalyzing}
          analysisProgress={analysisProgress}
          contentAnalysis={contentAnalysis}
          onAnalyzeDocument={onAnalyzeDocument}
          onViewContentPlan={onViewContentPlan}
        />
      </Card>
    </div>
  );
};

export default DocumentAnalysisSection;
