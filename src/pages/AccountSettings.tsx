
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { UserCircle, Bell, Shield, LogOut } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const AccountSettings = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name?: string, email: string } | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    storyAnalysisComplete: true,
    marketingEmails: false,
  });

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/sign-in');
      return;
    }
    
    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setName(parsedUser.name || '');
      setEmail(parsedUser.email || '');
    } catch (error) {
      localStorage.removeItem('user');
      navigate('/sign-in');
    }
  }, [navigate]);

  const handleSaveProfile = () => {
    if (!name || !email) {
      toast.error('Please fill in all required fields');
      return;
    }

    const updatedUser = {
      ...user,
      name,
      email
    };

    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    toast.success('Profile updated successfully');
  };

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key]
    });
    toast.success('Notification preferences updated');
  };

  const handleSignOut = () => {
    localStorage.removeItem('user');
    toast.success('Signed out successfully');
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
        
        <div className="space-y-6">
          {/* Profile Information */}
          <Card className="bg-black/30 backdrop-blur-sm border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <UserCircle className="mr-2 h-5 w-5 text-primary" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name" 
                    value={name} 
                    onChange={e => setName(e.target.value)}
                    className="bg-black/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)}
                    className="bg-black/20"
                  />
                </div>
              </div>
              <Button onClick={handleSaveProfile}>Save Changes</Button>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="bg-black/30 backdrop-blur-sm border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5 text-primary" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Email Updates</Label>
                    <p className="text-sm text-gray-400">Receive updates about your account</p>
                  </div>
                  <Switch
                    checked={notifications.emailUpdates}
                    onCheckedChange={() => handleNotificationChange('emailUpdates')}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Story Analysis Complete</Label>
                    <p className="text-sm text-gray-400">Get notified when your story analysis is ready</p>
                  </div>
                  <Switch
                    checked={notifications.storyAnalysisComplete}
                    onCheckedChange={() => handleNotificationChange('storyAnalysisComplete')}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Marketing Emails</Label>
                    <p className="text-sm text-gray-400">Receive marketing and promotional offers</p>
                  </div>
                  <Switch
                    checked={notifications.marketingEmails}
                    onCheckedChange={() => handleNotificationChange('marketingEmails')}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="bg-black/30 backdrop-blur-sm border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5 text-primary" />
                Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                Change Password
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start text-destructive hover:text-destructive" 
                onClick={handleSignOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
