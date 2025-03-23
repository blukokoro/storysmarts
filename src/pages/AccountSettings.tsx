
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { UserCircle, Bell, Shield, LogOut } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

const AccountSettings = () => {
  const navigate = useNavigate();
  const { user, loading, updateProfile, signOut } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    storyAnalysisComplete: true,
    marketingEmails: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Redirect if not logged in
    if (!loading && !user) {
      navigate('/sign-in');
      return;
    }

    // Set initial values from user object
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      
      // Fetch user preferences from database
      const fetchUserPreferences = async () => {
        try {
          const { data, error } = await supabase
            .from('user_preferences')
            .select('*')
            .eq('user_id', user.id)
            .single();
            
          if (error && error.code !== 'PGNF') {
            console.error('Error fetching user preferences:', error);
            return;
          }
          
          if (data) {
            setNotifications({
              emailUpdates: data.email_updates ?? true,
              storyAnalysisComplete: data.story_analysis_notifications ?? true,
              marketingEmails: data.marketing_emails ?? false,
            });
          }
        } catch (error) {
          console.error('Error in fetchUserPreferences:', error);
        }
      };
      
      fetchUserPreferences();
    }
  }, [user, loading, navigate]);

  const handleSaveProfile = async () => {
    if (!name || !email) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setIsLoading(true);
      await updateProfile({ name, email });
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNotificationChange = async (key: keyof typeof notifications) => {
    try {
      if (!user) return;
      
      const updatedNotifications = {
        ...notifications,
        [key]: !notifications[key]
      };
      
      setNotifications(updatedNotifications);
      
      // Update preferences in the database
      const { error } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: user.id,
          email_updates: updatedNotifications.emailUpdates,
          story_analysis_notifications: updatedNotifications.storyAnalysisComplete,
          marketing_emails: updatedNotifications.marketingEmails,
          updated_at: new Date().toISOString()
        });
        
      if (error) throw error;
      
      toast.success('Notification preferences updated');
    } catch (error) {
      console.error('Error updating notification preferences:', error);
      toast.error('Failed to update notification preferences');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground p-6 md:p-8 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

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
              <Button onClick={handleSaveProfile} disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
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
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => {
                  toast.info('Password reset email sent');
                }}
              >
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
