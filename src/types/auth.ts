
export type User = {
  id: string;
  email: string;
  name?: string;
} | null;

export type AuthContextType = {
  user: User;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name?: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: { name?: string, email?: string }) => Promise<void>;
};
