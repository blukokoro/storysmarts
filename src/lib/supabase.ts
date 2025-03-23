
import { createClient } from '@supabase/supabase-js'

// Replace these with your actual Supabase project URL and anon key
export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-supabase-project-url.supabase.co'
export const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-supabase-anon-key'

// For development debugging
if (supabaseUrl === 'https://your-supabase-project-url.supabase.co' || 
    supabaseAnonKey === 'your-supabase-anon-key') {
  console.warn('⚠️ Using placeholder Supabase credentials. Authentication will not work until you set actual credentials.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
