
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

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
    // Check if user is stored in localStorage
    const checkLocalUser = () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error retrieving user from localStorage:', error);
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };

    checkLocalUser();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // Simple mock authentication
      // In a real app, this would validate against a backend
      const mockUser = {
        id: `user-${Date.now()}`,
        email,
        name: email.split('@')[0]
      };
      
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      
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
      
      // Simple mock registration
      // In a real app, this would create an account in a backend
      const mockUser = {
        id: `user-${Date.now()}`,
        email,
        name: name || email.split('@')[0]
      };
      
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      
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
      localStorage.removeItem('user');
      setUser(null);
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

      const updatedUser = {
        ...user,
        ...updates
      };
      
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
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
