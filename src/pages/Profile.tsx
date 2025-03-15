
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FileText, LogOut, Settings } from 'lucide-react';
import { toast } from 'sonner';

interface StorySummary {
  id: string;
  title: string;
  date: string;
  wordCount: number;
  type: 'comic' | 'storyboard' | 'pitch' | 'film';
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

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name?: string, email: string } | null>(null);
  const [stories, setStories] = useState<StorySummary[]>(mockStories);

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
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="mr-2 h-4 w-4" />
                    Account Settings
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
          </div>

          {/* Main content */}
          <div className="w-full md:w-2/3 lg:w-3/4">
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
                        <Button variant="ghost" size="sm">View</Button>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
