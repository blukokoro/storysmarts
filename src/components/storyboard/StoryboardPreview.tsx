
import React from 'react';
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
                <Button className="bg-primary hover:bg-primary/90" onClick={onDownloadPDF}>
                  <FileText className="mr-2 h-4 w-4" />
                  Export PDF
                </Button>
                <Button variant="outline" className="border-white/20 text-white">
                  <Layers className="mr-2 h-4 w-4" />
                  View Sequence
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-black/50 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-semibold text-white">Frame Sequence</h2>
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm" className="border-white/20 text-white">
                  <Grid className="mr-2 h-4 w-4" />
                  Grid View
                </Button>
                <Button variant="outline" size="sm" className="border-white/20 text-white">
                  <Search className="mr-2 h-4 w-4" />
                  Find Frame
                </Button>
                <Button variant="outline" size="sm" className="border-white/20 text-white" onClick={onDownloadPDF}>
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </div>
            </div>

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

            <div className="mt-8 flex justify-center">
              <Button onClick={onExitPreview}>Return to Editor</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
