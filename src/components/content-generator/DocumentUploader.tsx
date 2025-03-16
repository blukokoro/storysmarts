
import React from 'react';
import PdfUploadSection from './PdfUploadSection';
import DocumentTextPreview from './DocumentTextPreview';

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
      <PdfUploadSection onTextExtracted={setDocumentText} />
      <DocumentTextPreview 
        documentText={documentText}
        setDocumentText={setDocumentText}
      />
    </div>
  );
};

export default DocumentUploader;
