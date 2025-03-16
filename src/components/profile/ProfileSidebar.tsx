
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Settings, CreditCard, LogOut } from 'lucide-react';
import { toast } from 'sonner';

interface ProfileSidebarProps {
  user: { name?: string; email: string } | null;
  hasStoryboardsWithImages: boolean;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ user, hasStoryboardsWithImages }) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('user');
    toast.success('Signed out successfully');
    navigate('/');
  };

  if (!user) return null;

  return (
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
  );
};

export default ProfileSidebar;
