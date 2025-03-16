
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import PdfUploader from '@/components/PdfUploader';

interface DocumentUploaderProps {
  documentText: string;
  setDocumentText: (text: string) => void;
  onFileUpload: (file: File) => Promise<void>;
}

const DocumentUploader: React.FC<DocumentUploaderProps> = ({
  documentText,
  setDocumentText,
  onFileUpload
}) => {
  return (
    <div className="space-y-4">
      <PdfUploader onTextExtracted={setDocumentText} />
      
      {documentText && (
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
      )}
    </div>
  );
};

export default DocumentUploader;
