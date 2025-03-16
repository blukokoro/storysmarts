
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { toast } from 'sonner';

interface StorySummary {
  id: string;
  title: string;
  date: string;
  wordCount: number;
  type: 'comic' | 'storyboard' | 'pitch' | 'film';
}

interface StoriesTabProps {
  stories: StorySummary[];
}

const StoriesTab: React.FC<StoriesTabProps> = ({ stories }) => {
  const navigate = useNavigate();

  const handleViewStory = (storyId: string) => {
    toast.success(`Viewing story ${storyId}`);
    navigate(`/stories/${storyId}`);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'comic':
        return <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>;
      case 'storyboard':
        return <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>;
      case 'pitch':
        return <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>;
      case 'film':
        return <div className="w-2 h-2 rounded-full bg-orange-500 mr-2"></div>;
      default:
        return <div className="w-2 h-2 rounded-full bg-gray-500 mr-2"></div>;
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Your Stories</h1>
      
      {stories.length > 0 ? (
        <div className="space-y-4">
          {stories.map((story) => (
            <Card key={story.id} className="bg-black/20 backdrop-blur-sm border-white/10 hover:bg-black/30 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="mr-3 h-5 w-5 text-primary" />
                    <div>
                      <h3 className="font-medium">{story.title}</h3>
                      <div className="flex items-center text-xs text-gray-400 mt-1">
                        {getTypeIcon(story.type)}
                        <span className="capitalize">{story.type}</span>
                        <span className="mx-2">•</span>
                        <span>{new Date(story.date).toLocaleDateString()}</span>
                        <span className="mx-2">•</span>
                        <span>{story.wordCount} words</span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleViewStory(story.id)}
                  >
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-black/20 backdrop-blur-sm border-white/10">
          <CardContent className="p-6 text-center">
            <p className="text-gray-400 mb-4">You haven't analyzed any stories yet.</p>
            <Button onClick={() => navigate('/')}>Analyze a Story</Button>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default StoriesTab;
