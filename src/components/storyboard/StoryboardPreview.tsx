
import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Grid, 
  Search, 
  Download, 
  FileText, 
  Layers,
  ImageIcon,
  Wand
} from 'lucide-react';
import { StoryboardFrame } from '@/types/storyboard';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface StoryboardPreviewProps {
  frames: StoryboardFrame[];
  onExitPreview: () => void;
  onDownloadPDF: () => void;
}

export const StoryboardPreview: React.FC<StoryboardPreviewProps> = ({
  frames,
  onExitPreview,
  onDownloadPDF
}) => {
  const storyboardRef = useRef<HTMLDivElement>(null);
  const [showSequenceView, setShowSequenceView] = useState(false);

  const generatePDF = async () => {
    if (!storyboardRef.current) return;

    toast.info("Generating PDF...");
    
    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const contentWidth = pdf.internal.pageSize.getWidth();
      const contentHeight = pdf.internal.pageSize.getHeight();
      
      // Capture the frames container
      const canvas = await html2canvas(storyboardRef.current, {
        scale: 2,
        logging: false,
        useCORS: true,
      });
      
      const imgData = canvas.toDataURL('image/png');
      
      // Title page
      pdf.setFontSize(24);
      pdf.setTextColor(40, 40, 40);
      pdf.text('Storyboard', contentWidth / 2, 30, { align: 'center' });
      pdf.setFontSize(12);
      pdf.text(`Generated on ${new Date().toLocaleDateString()}`, contentWidth / 2, 40, { align: 'center' });
      pdf.text(`Total frames: ${frames.length}`, contentWidth / 2, 50, { align: 'center' });
      
      // Add each frame to separate pages
      frames.forEach((frame, index) => {
        pdf.addPage();
        
        // Add frame title and information
        pdf.setFontSize(16);
        pdf.text(`Frame ${frame.id}: ${frame.title}`, 20, 20);
        
        pdf.setFontSize(12);
        pdf.text(`Shot Type: ${frame.shotType}`, 20, 30);
        
        // Add description with text wrapping
        const splitDescription = pdf.splitTextToSize(frame.description, contentWidth - 40);
        pdf.text(splitDescription, 20, 40);
        
        // Add frame image if available
        if (frame.image) {
          pdf.addImage(frame.image, 'JPEG', 20, 70, contentWidth - 40, 60);
        } else {
          pdf.setDrawColor(200, 200, 200);
          pdf.rect(20, 70, contentWidth - 40, 60);
          pdf.setFontSize(12);
          pdf.text('No image available', contentWidth / 2, 100, { align: 'center' });
        }
      });
      
      // Save the PDF
      pdf.save('storyboard.pdf');
      toast.success("PDF downloaded successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF. Please try again.");
    }
  };

  const toggleSequenceView = () => {
    setShowSequenceView(!showSequenceView);
    toast.success(showSequenceView ? "Showing grid view" : "Showing sequence view");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-white/10 bg-black/30 backdrop-blur-md p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex space-x-8 items-center">
            <div className="text-xl font-bold text-white">StorySmarts</div>
            <nav className="hidden md:flex space-x-6">
              <button className="text-gray-400 hover:text-white text-sm">Home</button>
              <button className="text-gray-400 hover:text-white text-sm">Projects</button>
              <button className="text-gray-400 hover:text-white text-sm">Storyboards</button>
              <button className="text-gray-400 hover:text-white text-sm">Settings</button>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="border-white/20 text-white"
              onClick={onExitPreview}
            >
              Exit Preview
            </Button>
            <Button size="sm" asChild>
              <Link to="/request-ai-refinement">
                <Wand className="mr-2 h-4 w-4" />
                Request AI Refinement
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex-grow flex flex-col">
        <div className="relative py-16">
          <div className="absolute inset-0 bg-[url('/lovable-uploads/6bc482be-4753-4673-aa4d-0783a7f2aa34.png')] bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
          <div className="relative max-w-7xl mx-auto px-4">
            <div className="max-w-2xl">
              <h1 className="text-5xl font-bold text-white mb-4">Storyboard Preview</h1>
              <p className="text-xl text-gray-300 mb-8">Your visual narrative sequence is ready for review and refinement.</p>
              <div className="flex space-x-4">
                <Button className="bg-primary hover:bg-primary/90" onClick={generatePDF}>
                  <FileText className="mr-2 h-4 w-4" />
                  Export PDF
                </Button>
                <Button variant="outline" className="border-white/20 text-white" onClick={toggleSequenceView}>
                  <Layers className="mr-2 h-4 w-4" />
                  View Sequence
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-black/50 py-12" ref={storyboardRef}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-semibold text-white">Frame Sequence</h2>
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm" className="border-white/20 text-white" onClick={() => setShowSequenceView(false)}>
                  <Grid className="mr-2 h-4 w-4" />
                  Grid View
                </Button>
                <Button variant="outline" size="sm" className="border-white/20 text-white">
                  <Search className="mr-2 h-4 w-4" />
                  Find Frame
                </Button>
                <Button variant="outline" size="sm" className="border-white/20 text-white" onClick={generatePDF}>
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </div>
            </div>

            {!showSequenceView ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {frames.map((frame) => (
                  <div key={frame.id} className="bg-black/40 border border-white/10 rounded-lg overflow-hidden hover:border-primary/40 transition-all">
                    <div className="aspect-video bg-black/60 relative">
                      {frame.image ? (
                        <img 
                          src={frame.image} 
                          alt={frame.title} 
                          className="w-full h-full object-cover opacity-90"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon className="h-12 w-12 text-gray-600" />
                        </div>
                      )}
                      <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 rounded text-xs text-white">{frame.shotType}</div>
                      <div className="absolute top-2 right-2 px-2 py-1 bg-primary/80 rounded text-xs text-white">Scene {frame.id}</div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-white font-medium mb-2">{frame.title}</h3>
                      <p className="text-gray-400 text-sm line-clamp-3">{frame.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-8">
                {frames.map((frame) => (
                  <div key={frame.id} className="flex flex-col md:flex-row gap-6 bg-black/40 border border-white/10 rounded-lg overflow-hidden p-4">
                    <div className="w-full md:w-1/3 aspect-video bg-black/60 relative rounded-lg overflow-hidden">
                      {frame.image ? (
                        <img 
                          src={frame.image} 
                          alt={frame.title} 
                          className="w-full h-full object-cover opacity-90"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon className="h-12 w-12 text-gray-600" />
                        </div>
                      )}
                      <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 rounded text-xs text-white">{frame.shotType}</div>
                      <div className="absolute top-2 right-2 px-2 py-1 bg-primary/80 rounded text-xs text-white">Scene {frame.id}</div>
                    </div>
                    <div className="w-full md:w-2/3">
                      <h3 className="text-white text-xl font-medium mb-3">{frame.title}</h3>
                      <p className="text-gray-300 mb-4">{frame.description}</p>
                      <div className="flex flex-wrap gap-2 text-sm">
                        <span className="px-2 py-1 bg-black/60 rounded text-white">Shot Type: {frame.shotType}</span>
                        <span className="px-2 py-1 bg-black/60 rounded text-white">Scene: {frame.id}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-8 flex justify-center">
              <Button onClick={onExitPreview}>Return to Editor</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
