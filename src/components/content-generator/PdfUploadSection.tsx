
import React from 'react';
import { Label } from '@/components/ui/label';
import PdfUploader from '@/components/PdfUploader';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { FileText } from 'lucide-react';

interface PdfUploadSectionProps {
  onTextExtracted: (text: string) => void;
}

const PdfUploadSection: React.FC<PdfUploadSectionProps> = ({
  onTextExtracted
}) => {
  return (
    <Card className="border border-gray-800 bg-black/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center">
          <FileText className="h-5 w-5 mr-2 text-primary" />
          Upload PDF Document
        </CardTitle>
        <CardDescription>
          Extract text from your PDF documents to generate content
        </CardDescription>
      </CardHeader>
      <CardContent>
        <PdfUploader onTextExtracted={onTextExtracted} />
      </CardContent>
    </Card>
  );
};

export default PdfUploadSection;
