
export type User = {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
} | null;

export type AuthContextType = {
  user: User;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signUp: (email: string, password: string, name?: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: { name?: string, email?: string, avatar_url?: string }) => Promise<void>;
};

export type UserPreferences = {
  email_updates: boolean;
  story_analysis_notifications: boolean;
  marketing_emails: boolean;
};
