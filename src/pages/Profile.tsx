
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FileText, LogOut, Settings, CreditCard, Download, Image } from 'lucide-react';
import { toast } from 'sonner';

interface StorySummary {
  id: string;
  title: string;
  date: string;
  wordCount: number;
  type: 'comic' | 'storyboard' | 'pitch' | 'film';
}

interface Storyboard {
  id: string;
  title: string;
  date: string;
  frames: number;
  hasImages: boolean;
}

const mockStories: StorySummary[] = [
  {
    id: '1',
    title: 'The Lost City',
    date: '2023-05-15',
    wordCount: 2500,
    type: 'comic'
  },
  {
    id: '2',
    title: 'Beyond the Stars',
    date: '2023-06-22',
    wordCount: 1800,
    type: 'storyboard'
  },
  {
    id: '3',
    title: 'The Last Guardian',
    date: '2023-07-10',
    wordCount: 3200,
    type: 'pitch'
  }
];

const mockStoryboards: Storyboard[] = [
  {
    id: '1',
    title: 'Mountain Home Exploration',
    date: '2023-09-05',
    frames: 4,
    hasImages: true
  },
  {
    id: '2',
    title: 'City Chase Sequence',
    date: '2023-10-12',
    frames: 6,
    hasImages: true
  },
  {
    id: '3',
    title: 'Desert Encounter',
    date: '2023-11-20',
    frames: 5,
    hasImages: false
  }
];

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name?: string, email: string } | null>(null);
  const [stories, setStories] = useState<StorySummary[]>(mockStories);
  const [storyboards, setStoryboards] = useState<Storyboard[]>(mockStoryboards);
  const [activeTab, setActiveTab] = useState<'stories' | 'storyboards'>('stories');

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/sign-in');
      return;
    }
    
    try {
      setUser(JSON.parse(userData));
    } catch (error) {
      localStorage.removeItem('user');
      navigate('/sign-in');
    }
  }, [navigate]);

  const handleViewStory = (storyId: string) => {
    // In a real app, this would navigate to a detailed view of the story
    toast.success(`Viewing story ${storyId}`);
    // For demo purposes, we'll just show a toast
    // In a real app: navigate(`/stories/${storyId}`);
  };

  const handleViewStoryboard = (storyboardId: string) => {
    toast.success(`Viewing storyboard ${storyboardId}`);
    navigate('/storyboard');
  };

  const handleDownloadPDF = (storyboardId: string) => {
    toast.success(`Downloading storyboard ${storyboardId} as PDF`);
    // In a real app, this would trigger a PDF download
  };

  const handleCreateStoryboard = () => {
    navigate('/storyboard');
  };

  const handleSignOut = () => {
    localStorage.removeItem('user');
    toast.success('Signed out successfully');
    navigate('/');
  };

  if (!user) return null;

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

  const hasStoryboards = storyboards.length > 0;
  const hasStoryboardsWithImages = storyboards.some(sb => sb.hasImages);

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <Card className="bg-black/30 backdrop-blur-sm border-white/10">
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src="" alt={user.name || user.email} />
                  <AvatarFallback className="text-2xl bg-primary/20 text-primary">
                    {(user.name?.[0] || user.email[0]).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">{user.name || 'User'}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => navigate('/account-settings')}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Account Settings
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => navigate('/plans')}
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    My Plans
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-destructive hover:text-destructive" 
                    onClick={handleSignOut}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Discount Card */}
            {hasStoryboardsWithImages && (
              <Card className="bg-primary/10 backdrop-blur-sm border-primary/30 mt-4">
                <CardContent className="p-4">
                  <div className="text-primary font-semibold mb-2">20% Discount Available!</div>
                  <p className="text-sm text-white/80 mb-3">
                    You are eligible for a 20% discount on AI short film production because you've created storyboards with images.
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full bg-primary/20 border-primary/40 text-primary hover:bg-primary/30"
                    onClick={() => navigate('/pricing')}
                  >
                    View AI Film Options
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Main content */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            {/* Tabs */}
            <div className="flex border-b border-white/10 mb-6">
              <button
                className={`px-4 py-2 font-medium ${
                  activeTab === 'stories'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setActiveTab('stories')}
              >
                Your Stories
              </button>
              <button
                className={`px-4 py-2 font-medium ${
                  activeTab === 'storyboards'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setActiveTab('storyboards')}
              >
                Your Storyboards
              </button>
            </div>

            {activeTab === 'stories' && (
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
            )}

            {activeTab === 'storyboards' && (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
