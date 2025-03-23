
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, AlertCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase, supabaseUrl, supabaseAnonKey } from '@/lib/supabase';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
});

const SignIn = () => {
  const { signIn, signInWithGoogle, user, loading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Check if using placeholder credentials
  const usingPlaceholderCredentials = 
    supabaseUrl === 'https://your-supabase-project-url.supabase.co' || 
    supabaseAnonKey === 'your-supabase-anon-key';

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setError(null);
      setIsSubmitting(true);
      
      if (usingPlaceholderCredentials) {
        throw new Error('Authentication is not available with placeholder Supabase credentials. Please set up your Supabase project.');
      }
      
      await signIn(values.email, values.password);
    } catch (error: any) {
      console.error('Sign in error:', error);
      setError(error.message || 'An error occurred during sign in');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError(null);
      setIsGoogleLoading(true);
      
      if (usingPlaceholderCredentials) {
        throw new Error('Authentication is not available with placeholder Supabase credentials. Please set up your Supabase project.');
      }
      
      await signInWithGoogle();
    } catch (error: any) {
      console.error('Google sign in error:', error);
      setError(error.message || 'An error occurred during Google sign in');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  // Redirect if user is already logged in
  if (user && !loading) {
    return <Navigate to="/profile" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 md:p-8 bg-background">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
          <p className="text-gray-400">Sign in to your account to continue</p>
        </div>

        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-white/10">
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {usingPlaceholderCredentials && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                You are using placeholder Supabase credentials. Authentication will not work until you set up your Supabase project.
              </AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting || loading || usingPlaceholderCredentials}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>
          </Form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-black px-2 text-gray-400">Or continue with</span>
            </div>
          </div>

          <Button 
            variant="outline" 
            className="w-full mb-6"
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading || usingPlaceholderCredentials}
          >
            {isGoogleLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2" aria-hidden="true">
                <path
                  d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                  fill="#EA4335"
                />
                <path
                  d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                  fill="#4285F4"
                />
                <path
                  d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                  fill="#FBBC05"
                />
                <path
                  d="M12.0004 24C15.2404 24 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24 12.0004 24Z"
                  fill="#34A853"
                />
              </svg>
            )}
            Sign in with Google
          </Button>

          <div className="text-center text-sm">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <Link to="/sign-up" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
