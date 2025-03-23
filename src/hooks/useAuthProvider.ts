
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { User } from '@/types/auth';
import { supabase } from '@/lib/supabase';

export function useAuthProvider() {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Helper function to get user profile from database
  const getUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error && error.code !== 'PGNF') {
        console.error('Error fetching user profile:', error);
        return null;
      }
      
      return data;
    } catch (error) {
      console.error('Error in getUserProfile:', error);
      return null;
    }
  };

  // Helper function to create/update user profile in the database
  const upsertUserProfile = async (userId: string, profileData: any) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({ 
          id: userId,
          ...profileData,
          updated_at: new Date().toISOString()
        });
      
      if (error) {
        console.error('Error updating profile:', error);
      }
    } catch (error) {
      console.error('Error in upsertUserProfile:', error);
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          const { user: supabaseUser } = session;
          
          // Transform Supabase user to our User type
          const appUser = {
            id: supabaseUser.id,
            email: supabaseUser.email || '',
            name: supabaseUser.user_metadata?.name || supabaseUser.email?.split('@')[0] || '',
          };
          
          setUser(appUser);
          
          // If user signed up or signed in, ensure their profile exists
          if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
            const profile = await getUserProfile(supabaseUser.id);
            
            if (!profile) {
              // Create a new profile record if one doesn't exist
              await upsertUserProfile(supabaseUser.id, {
                email: supabaseUser.email,
                name: supabaseUser.user_metadata?.name || supabaseUser.email?.split('@')[0] || '',
                avatar_url: supabaseUser.user_metadata?.avatar_url,
              });
            }
          }
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    // Check current session on load
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        const { user: supabaseUser } = data.session;
        const appUser = {
          id: supabaseUser.id,
          email: supabaseUser.email || '',
          name: supabaseUser.user_metadata?.name || supabaseUser.email?.split('@')[0] || '',
        };
        setUser(appUser);
        
        // Ensure profile exists in database
        const profile = await getUserProfile(supabaseUser.id);
        if (!profile) {
          await upsertUserProfile(supabaseUser.id, {
            email: supabaseUser.email,
            name: supabaseUser.user_metadata?.name || supabaseUser.email?.split('@')[0] || '',
            avatar_url: supabaseUser.user_metadata?.avatar_url,
          });
        }
      }
      setLoading(false);
    };

    checkSession();

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      toast.success('Signed in successfully');
      navigate('/profile');
    } catch (error: any) {
      toast.error(error.message || 'Error signing in');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/profile`,
        }
      });
      
      if (error) throw error;
      
    } catch (error: any) {
      toast.error(error.message || 'Error signing in with Google');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name?: string) => {
    try {
      setLoading(true);
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name,
          },
        },
      });
      
      if (error) throw error;
      
      toast.success('Account created successfully! Please check your email for confirmation');
      navigate('/sign-in');
    } catch (error: any) {
      toast.error(error.message || 'Error signing up');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      setUser(null);
      toast.success('Signed out successfully');
      navigate('/');
    } catch (error: any) {
      toast.error(error.message || 'Error signing out');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: { name?: string, email?: string, avatar_url?: string }) => {
    try {
      setLoading(true);
      
      if (!user) {
        throw new Error('Not authenticated');
      }

      // If email is being updated
      if (updates.email && updates.email !== user.email) {
        const { error } = await supabase.auth.updateUser({
          email: updates.email,
        });
        
        if (error) throw error;
        
        toast.success('Email update initiated. Please check your email for confirmation');
      }

      // Update user metadata if name is provided
      if (updates.name || updates.avatar_url) {
        const metadata: Record<string, any> = {};
        if (updates.name) metadata.name = updates.name;
        if (updates.avatar_url) metadata.avatar_url = updates.avatar_url;
        
        const { error } = await supabase.auth.updateUser({
          data: metadata,
        });
        
        if (error) throw error;
      }
      
      // Update local user state
      const updatedUser = {
        ...user,
        name: updates.name || user.name,
        email: updates.email || user.email,
      };
      
      setUser(updatedUser);
      
      // Update profile in database
      await upsertUserProfile(user.id, {
        name: updatedUser.name,
        email: updatedUser.email,
        avatar_url: updates.avatar_url,
      });
      
      toast.success('Profile updated successfully');
    } catch (error: any) {
      toast.error(error.message || 'Error updating profile');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    signIn,
    signInWithGoogle,
    signUp,
    signOut,
    updateProfile
  };
}
