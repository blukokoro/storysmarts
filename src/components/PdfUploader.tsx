
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, FileText, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import * as pdfjs from 'pdfjs-dist';

// Set up the worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.mjs',
  import.meta.url
).toString();

interface PdfUploaderProps {
  onTextExtracted: (text: string) => void;
}

const PdfUploader: React.FC<PdfUploaderProps> = ({ onTextExtracted }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Check if file is a PDF
    if (file.type !== 'application/pdf') {
      toast.error('Please upload a PDF file');
      return;
    }

    setFileName(file.name);
    setIsLoading(true);

    try {
      const text = await extractTextFromPdf(file);
      onTextExtracted(text);
      toast.success('PDF successfully processed');
    } catch (error) {
      console.error('Error processing PDF:', error);
      toast.error('Failed to process PDF');
    } finally {
      setIsLoading(false);
    }
  };

  const extractTextFromPdf = async (file: File): Promise<string> => {
    try {
      // Convert file to ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();
      
      // Load the PDF document
      const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      
      let fullText = '';
      
      // Get text from each page
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item: any) => item.str).join(' ');
        fullText += pageText + '\n';
      }
      
      return fullText;
    } catch (error) {
      console.error('Error extracting text from PDF:', error);
      throw new Error('Failed to extract text from PDF');
    }
  };

  return (
    <div className="flex flex-col items-center w-full gap-2">
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="pdf-upload"
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer border-gray-700 hover:border-primary/50 transition-all bg-black/20"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-8 h-8 mb-2 text-gray-400" />
            <p className="mb-2 text-sm text-gray-400">
              <span className="font-medium">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">PDF only</p>
          </div>
          <input
            id="pdf-upload"
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={handleFileChange}
            disabled={isLoading}
          />
        </label>
      </div>

      {fileName && (
        <div className="flex items-center gap-2 p-2 mt-2 rounded-md bg-secondary text-foreground text-sm w-full max-w-md">
          <FileText className="w-4 h-4 text-primary" />
          <span className="truncate flex-1">{fileName}</span>
          {isLoading && <Loader2 className="w-4 h-4 animate-spin text-primary" />}
        </div>
      )}
    </div>
  );
};

export default PdfUploader;
