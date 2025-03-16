
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { 
  Upload, 
  Save, 
  PlayCircle, 
  Film, 
  Image as ImageIcon, 
  PlusCircle,
  ChevronRight,
  Search,
  FileText,
  Layers,
  Grid
} from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface StoryboardFrame {
  id: number;
  title: string;
  description: string;
  shotType: string;
  image: string | null;
  cards: number;
}

const defaultFrames: StoryboardFrame[] = [
  {
    id: 1,
    title: "1. Driveway",
    description: "Camera tracks low along driveway to entrance of the property. Captures front native desert garden and palm trees.",
    shotType: "Track",
    image: null,
    cards: 2
  },
  {
    id: 2,
    title: "2. Front entrance",
    description: "Camera stops at front entrance and pans around capturing the owner's midcentury restored car and front streetscape.",
    shotType: "POV shot",
    image: null,
    cards: 2
  },
  {
    id: 3,
    title: "3. Back patio",
    description: "Fade to interview the owner about the pool and entertainment area with the San Jacinto mountains in the background.",
    shotType: "Stationary Close-up",
    image: null,
    cards: 2
  },
  {
    id: 4,
    title: "4. Pool",
    description: "Camera flies over capturing the entire back half of the house, pool garden and surrounding view. Home owner dialogue continues over this footage.",
    shotType: "Aerial shot",
    image: null,
    cards: 2
  }
];

const shotTypes = [
  "Track", "POV shot", "Stationary", "Stationary Close-up", "Aerial shot", 
  "Pan", "Zoom", "Dolly", "Establishing shot", "Cut-away"
];

const Storyboard = () => {
  const [frames, setFrames] = useState<StoryboardFrame[]>(defaultFrames);
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

  const togglePreview = () => {
    setShowPreview(!showPreview);
    if (!showPreview) {
      toast.success("Preview mode engaged!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-indigo-950/90 text-foreground">
      {showPreview ? (
        // Preview Mode inspired by the uploaded reference image
        <div className="min-h-screen flex flex-col">
          {/* Navigation Header */}
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
                  onClick={togglePreview}
                >
                  Exit Preview
                </Button>
                <Button size="sm">Request AI Refinement</Button>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <div className="flex-grow flex flex-col">
            {/* Hero Section */}
            <div className="relative py-16">
              <div className="absolute inset-0 bg-[url('/lovable-uploads/6bc482be-4753-4673-aa4d-0783a7f2aa34.png')] bg-cover bg-center opacity-20"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
              <div className="relative max-w-7xl mx-auto px-4">
                <div className="max-w-2xl">
                  <h1 className="text-5xl font-bold text-white mb-4">Storyboard Preview</h1>
                  <p className="text-xl text-gray-300 mb-8">Your visual narrative sequence is ready for review and refinement.</p>
                  <div className="flex space-x-4">
                    <Button className="bg-primary hover:bg-primary/90">
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

            {/* Storyboard Frames Display */}
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
                  <Button onClick={togglePreview}>Return to Editor</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Editor Mode
        <div className="container mx-auto px-4 py-8">
          {/* Storyboard Header */}
          <header className="mb-8">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-display font-bold text-gradient">Storyboard Creator</h1>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="bg-white/5 hover:bg-white/10"
                  onClick={handleSaveStoryboard}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save
                </Button>
                <Button 
                  className="bg-primary text-white"
                  onClick={togglePreview}
                >
                  <PlayCircle className="mr-2 h-4 w-4" />
                  Preview
                </Button>
              </div>
            </div>
            <p className="text-gray-400 mt-2">
              Create and organize your visual narrative sequence
            </p>
          </header>

          {/* Storyboard Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Sidebar - Frame Navigation */}
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
              
              <div className="space-y-2">
                {frames.map((frame) => (
                  <div 
                    key={frame.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      activeFrame === frame.id 
                        ? 'bg-primary/20 border-primary/40' 
                        : 'bg-black/20 border-white/5 hover:border-white/20'
                    }`}
                    onClick={() => setActiveFrame(frame.id)}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium text-white">{frame.title}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                        {frame.cards} cards
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                      {frame.description}
                    </p>
                    {frame.image && (
                      <div className="mt-2 relative h-16 rounded-md overflow-hidden">
                        <img 
                          src={frame.image} 
                          alt={`Frame ${frame.id}`} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <Button 
                variant="outline" 
                className="w-full mt-4 border-dashed border-white/20 bg-black/30 hover:bg-black/50"
                onClick={handleAddFrame}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Frame
              </Button>
            </div>
            
            {/* Main Content - Active Frame Editor */}
            <div className="lg:col-span-3 space-y-6">
              {frames.filter(frame => frame.id === activeFrame).map(frame => (
                <div key={frame.id} className="space-y-4">
                  <Card className="bg-black/30 border-white/10">
                    <CardContent className="pt-6">
                      <div className="flex flex-col md:flex-row gap-4">
                        {/* Left column - Image upload */}
                        <div className="w-full md:w-1/2">
                          <div className="rounded-lg border border-dashed border-white/20 flex flex-col items-center justify-center p-4 h-[300px] relative overflow-hidden bg-black/20">
                            {frame.image ? (
                              <>
                                <img 
                                  src={frame.image} 
                                  alt={`Frame ${frame.id}`} 
                                  className="absolute inset-0 w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                  <Button 
                                    variant="secondary" 
                                    size="sm"
                                    onClick={() => handleUploadImage(frame.id)}
                                  >
                                    <Upload className="mr-2 h-4 w-4" />
                                    Replace Image
                                  </Button>
                                </div>
                              </>
                            ) : (
                              <div className="text-center">
                                <div className="flex flex-col items-center">
                                  <ImageIcon className="h-10 w-10 text-gray-400 mb-2" />
                                  <p className="text-sm text-gray-400 mb-2">Upload frame image</p>
                                  <p className="text-xs text-gray-500 mb-4">PNG, JPG or GIF</p>
                                  <Button 
                                    variant="secondary" 
                                    size="sm"
                                    onClick={() => handleUploadImage(frame.id)}
                                  >
                                    <Upload className="mr-2 h-4 w-4" />
                                    Select Image
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Right column - Frame details */}
                        <div className="w-full md:w-1/2 space-y-4">
                          <div>
                            <label className="text-xs text-gray-400 mb-1 block">Frame Title</label>
                            <Input 
                              value={frame.title}
                              onChange={(e) => handleUpdateFrameTitle(frame.id, e.target.value)}
                              className="bg-black/20 border-white/10 text-white"
                            />
                          </div>
                          
                          <div>
                            <label className="text-xs text-gray-400 mb-1 block">Shot Type</label>
                            <div className="flex flex-wrap gap-2">
                              {shotTypes.slice(0, 5).map((type) => (
                                <Button
                                  key={type}
                                  variant="outline"
                                  size="sm"
                                  className={`text-xs ${
                                    frame.shotType === type 
                                      ? 'bg-primary/20 border-primary text-primary' 
                                      : 'bg-black/20 border-white/10 text-gray-300'
                                  }`}
                                  onClick={() => handleUpdateShotType(frame.id, type)}
                                >
                                  {type}
                                </Button>
                              ))}
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-black/20 border-white/10 text-gray-300"
                              >
                                More...
                              </Button>
                            </div>
                          </div>
                          
                          <div>
                            <label className="text-xs text-gray-400 mb-1 block">Scene Description</label>
                            <Textarea 
                              value={frame.description}
                              onChange={(e) => handleUpdateFrameDescription(frame.id, e.target.value)}
                              className="bg-black/20 border-white/10 text-white h-[140px] resize-none"
                              placeholder="Describe the visual elements, camera movements, and action in this frame..."
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Shot Suggestions */}
                  <div className="bg-black/20 border border-white/10 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-white mb-3">
                      <Film className="h-4 w-4 inline mr-2 text-primary" />
                      Shot Suggestions
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="bg-black/30 p-3 rounded border border-white/5">
                        <h4 className="text-xs font-medium text-primary">Character Focus</h4>
                        <p className="text-xs text-gray-400 mt-1">Medium close-up to capture emotional reactions during dialogue</p>
                      </div>
                      <div className="bg-black/30 p-3 rounded border border-white/5">
                        <h4 className="text-xs font-medium text-primary">Environment</h4>
                        <p className="text-xs text-gray-400 mt-1">Wide establishing shot to showcase the location context</p>
                      </div>
                      <div className="bg-black/30 p-3 rounded border border-white/5">
                        <h4 className="text-xs font-medium text-primary">Movement</h4>
                        <p className="text-xs text-gray-400 mt-1">Tracking shot following subject from left to right</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Timeline Preview */}
                  <div className="bg-black/20 border border-white/10 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-white mb-3">Timeline Position</h3>
                    <div className="flex items-center space-x-1 overflow-x-auto py-2">
                      {frames.map((f) => (
                        <div 
                          key={f.id}
                          className={`flex-shrink-0 h-16 w-24 rounded border ${
                            f.id === frame.id 
                              ? 'border-primary bg-primary/20' 
                              : 'border-white/10 bg-black/30'
                          } flex items-center justify-center cursor-pointer`}
                          onClick={() => setActiveFrame(f.id)}
                        >
                          <div className="text-center">
                            <div className="text-xs font-medium">
                              {f.id === frame.id ? (
                                <span className="text-primary">Current</span>
                              ) : (
                                <span className="text-gray-400">Frame {f.id}</span>
                              )}
                            </div>
                            {f.image ? (
                              <div className="h-8 w-12 mx-auto mt-1 overflow-hidden rounded">
                                <img 
                                  src={f.image} 
                                  alt={`Frame ${f.id} thumbnail`} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ) : (
                              <div className="text-[10px] text-gray-500 mt-1">No image</div>
                            )}
                          </div>
                        </div>
                      ))}
                      <div 
                        className="flex-shrink-0 h-16 w-12 rounded border border-dashed border-white/10 bg-black/20 flex items-center justify-center cursor-pointer"
                        onClick={handleAddFrame}
                      >
                        <PlusCircle className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Storyboard;
