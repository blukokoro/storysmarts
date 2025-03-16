
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface DocumentTextPreviewProps {
  documentText: string;
  setDocumentText: (text: string) => void;
}

const DocumentTextPreview: React.FC<DocumentTextPreviewProps> = ({
  documentText,
  setDocumentText
}) => {
  if (!documentText) return null;
  
  return (
    <div className="mt-4">
      <Label htmlFor="extracted-text">Extracted Text</Label>
      <div className="mt-1.5">
        <Textarea 
          id="extracted-text"
          value={documentText}
          onChange={(e) => setDocumentText(e.target.value)}
          className="h-32 bg-black/20 border-white/10"
        />
      </div>
    </div>
  );
};

export default DocumentTextPreview;
