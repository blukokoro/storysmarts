
import React from 'react';
import { Label } from '@/components/ui/label';
import PdfUploader from '@/components/PdfUploader';

interface PdfUploadSectionProps {
  onTextExtracted: (text: string) => void;
}

const PdfUploadSection: React.FC<PdfUploadSectionProps> = ({
  onTextExtracted
}) => {
  return (
    <div>
      <PdfUploader onTextExtracted={onTextExtracted} />
    </div>
  );
};

export default PdfUploadSection;
