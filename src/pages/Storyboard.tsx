
import React, { useState } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { StoryboardFrame, DEFAULT_FRAMES } from '@/types/storyboard';
import { StoryboardHeader } from '@/components/storyboard/StoryboardHeader';
import { FrameList } from '@/components/storyboard/FrameList';
import { FrameEditor } from '@/components/storyboard/FrameEditor';
import { StoryboardPreview } from '@/components/storyboard/StoryboardPreview';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Storyboard = () => {
  const [frames, setFrames] = useState<StoryboardFrame[]>(DEFAULT_FRAMES);
  const [activeFrame, setActiveFrame] = useState<number>(1);
  const [showPreview, setShowPreview] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSaveStoryboard = () => {
    if (!user) {
      toast.error("Please sign in to save your storyboard");
      navigate('/sign-in');
      return;
    }
    
    // In a real app, this would save to a database
    toast.success("Storyboard saved to your profile");
    
    // Simulate processing time
    setTimeout(() => {
      toast("Pro Tip: Add images to each frame for a complete storyboard", {
        description: "You can upload or select stock images for each scene",
        action: {
          label: "Got it",
          onClick: () => console.log("User acknowledged tip"),
        },
      });
    }, 1500);
  };

  const handleAddFrame = () => {
    const newId = frames.length + 1;
    const newFrame: StoryboardFrame = {
      id: newId,
      title: `${newId}. New Scene`,
      description: "Add your scene description here...",
      shotType: "POV shot",
      image: null,
      cards: 2
    };
    
    setFrames([...frames, newFrame]);
    setActiveFrame(newId);
    toast.success("New frame added");
  };

  const handleUploadImage = (frameId: number) => {
    // In a real app, this would open a file picker
    const mockImageUrls = [
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      "https://images.unsplash.com/photo-1518770660439-4636190af475",
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
    ];
    
    // Simulate image upload
    toast.success("Image uploaded successfully");
    
    // Update the frame with the uploaded image
    setFrames(frames.map(frame => 
      frame.id === frameId 
        ? { ...frame, image: mockImageUrls[(frameId - 1) % mockImageUrls.length] } 
        : frame
    ));
  };

  const handleUpdateFrameTitle = (frameId: number, title: string) => {
    setFrames(frames.map(frame => 
      frame.id === frameId ? { ...frame, title } : frame
    ));
  };

  const handleUpdateFrameDescription = (frameId: number, description: string) => {
    setFrames(frames.map(frame => 
      frame.id === frameId ? { ...frame, description } : frame
    ));
  };

  const handleUpdateShotType = (frameId: number, shotType: string) => {
    setFrames(frames.map(frame => 
      frame.id === frameId ? { ...frame, shotType } : frame
    ));
  };

  const handleDownloadPDF = () => {
    // In a real app, this would generate and download a PDF
    toast.success("Generating PDF...");
    
    // Simulate processing time
    setTimeout(() => {
      toast.success("Storyboard PDF downloaded successfully");
    }, 1500);
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
    if (!showPreview) {
      toast.success("Preview mode engaged!");
    }
  };

  const currentFrame = frames.find(frame => frame.id === activeFrame) || frames[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-indigo-950/90 text-foreground">
      {showPreview ? (
        <StoryboardPreview 
          frames={frames}
          onExitPreview={togglePreview}
          onDownloadPDF={handleDownloadPDF}
        />
      ) : (
        <div className="container mx-auto px-4 py-8">
          <StoryboardHeader 
            onSave={handleSaveStoryboard}
            onPreview={togglePreview}
          />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1 bg-black/30 rounded-lg border border-white/10 p-4 h-[calc(100vh-10rem)] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-white">Frames</h2>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="h-8 w-8 p-0 rounded-full"
                  onClick={handleAddFrame}
                >
                  <PlusCircle className="h-5 w-5" />
                </Button>
              </div>
              
              <FrameList 
                frames={frames}
                activeFrame={activeFrame}
                onFrameSelect={setActiveFrame}
                onAddFrame={handleAddFrame}
              />
            </div>
            
            <div className="lg:col-span-3 space-y-6">
              {currentFrame && (
                <FrameEditor 
                  frame={currentFrame}
                  frames={frames}
                  onUploadImage={handleUploadImage}
                  onUpdateTitle={handleUpdateFrameTitle}
                  onUpdateDescription={handleUpdateFrameDescription}
                  onUpdateShotType={handleUpdateShotType}
                  onFrameSelect={setActiveFrame}
                  onAddFrame={handleAddFrame}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Storyboard;
