import { createClient } from '@supabase/supabase-js'

// Use environment variables in production, fallback to hardcoded values for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://mfafoftdmxndundlmphx.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mYWZvZnRkbXhuZHVuZGxtcGh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4OTc0MjQsImV4cCI6MjA2NTQ3MzQyNH0.TrIt6if5l7XKyikQz2-L6m6RxMyC9ma4-nKYW4alhB4'

console.log('Initializing Supabase client with URL:', supabaseUrl)

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase configuration')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey) 