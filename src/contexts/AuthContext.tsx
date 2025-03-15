
import React, { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

type User = {
  id: string;
  email: string;
  name?: string;
} | null;

type AuthContextType = {
  user: User;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name?: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: { name?: string, email?: string }) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check active session when the component mounts
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }

        if (session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('name')
            .eq('id', session.user.id)
            .single();

          setUser({
            id: session.user.id,
            email: session.user.email!,
            name: profile?.name
          });
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('name')
            .eq('id', session.user.id)
            .single();

          setUser({
            id: session.user.id,
            email: session.user.email!,
            name: profile?.name
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      toast.success('Signed in successfully');
      navigate('/profile');
    } catch (error: any) {
      toast.error(error.message || 'Error signing in');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name?: string) => {
    try {
      setLoading(true);
      
      // Register user
      const { data, error } = await supabase.auth.signUp({ email, password });

      if (error) {
        throw error;
      }

      // Create a profile for the user
      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            { id: data.user.id, name, email }
          ]);
        
        if (profileError) {
          console.error('Error creating profile:', profileError);
        }
      }

      toast.success('Account created successfully');
      navigate('/profile');
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
      
      if (error) {
        throw error;
      }
      
      toast.success('Signed out successfully');
      navigate('/');
    } catch (error: any) {
      toast.error(error.message || 'Error signing out');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: { name?: string, email?: string }) => {
    try {
      setLoading(true);
      
      if (!user) {
        throw new Error('Not authenticated');
      }

      // Update email in auth if provided
      if (updates.email && updates.email !== user.email) {
        const { error: authError } = await supabase.auth.updateUser({
          email: updates.email,
        });
        
        if (authError) {
          throw authError;
        }
      }
      
      // Update profile in profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);
      
      if (profileError) {
        throw profileError;
      }
      
      // Update local user state
      setUser({
        ...user,
        ...updates
      });
      
      toast.success('Profile updated successfully');
    } catch (error: any) {
      toast.error(error.message || 'Error updating profile');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
