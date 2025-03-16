
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Image } from 'lucide-react';
import { toast } from 'sonner';

interface Storyboard {
  id: string;
  title: string;
  date: string;
  frames: number;
  hasImages: boolean;
}

interface StoryboardsTabProps {
  storyboards: Storyboard[];
}

const StoryboardsTab: React.FC<StoryboardsTabProps> = ({ storyboards }) => {
  const navigate = useNavigate();

  const handleCreateStoryboard = () => {
    navigate('/storyboard');
  };

  const handleViewStoryboard = (storyboardId: string) => {
    toast.success(`Viewing storyboard ${storyboardId}`);
    navigate('/storyboard');
  };

  const handleDownloadPDF = (storyboardId: string) => {
    toast.success(`Downloading storyboard ${storyboardId} as PDF`);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Storyboards</h1>
        <Button onClick={handleCreateStoryboard}>Create New Storyboard</Button>
      </div>
      
      {storyboards.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {storyboards.map((storyboard) => (
            <Card key={storyboard.id} className="bg-black/20 backdrop-blur-sm border-white/10 hover:bg-black/30 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">{storyboard.title}</h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                    {storyboard.frames} frames
                  </span>
                </div>
                <div className="flex items-center text-xs text-gray-400 mb-3">
                  <span>{new Date(storyboard.date).toLocaleDateString()}</span>
                  <span className="mx-2">•</span>
                  {storyboard.hasImages ? (
                    <span className="flex items-center text-green-400">
                      <Image className="h-3 w-3 mr-1" />
                      With images
                    </span>
                  ) : (
                    <span className="flex items-center text-gray-400">
                      No images
                    </span>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex-1 bg-black/30"
                    onClick={() => handleViewStoryboard(storyboard.id)}
                  >
                    View
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex-1 bg-black/30"
                    onClick={() => handleDownloadPDF(storyboard.id)}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-black/20 backdrop-blur-sm border-white/10">
          <CardContent className="p-6 text-center">
            <p className="text-gray-400 mb-4">You haven't created any storyboards yet.</p>
            <Button onClick={handleCreateStoryboard}>Create Your First Storyboard</Button>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default StoryboardsTab;
