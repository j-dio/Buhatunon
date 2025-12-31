import { createClient } from '@/lib/supabase/client'
import { SignInWithGoogleOptions } from '@/types/auth'

export const auth = {
  // Sign in with Google
  signInWithGoogle: async (options?: SignInWithGoogleOptions) => {
    const supabase = createClient()
    
    const scopes = [
      'https://www.googleapis.com/auth/classroom.courses.readonly',
      'https://www.googleapis.com/auth/classroom.coursework.me.readonly',
      'https://www.googleapis.com/auth/classroom.student-submissions.me.readonly'
    ]

    return await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: options?.redirectTo || `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
          scope: scopes.join(' ')
        }
      }
    })
  },

  // Sign out
  signOut: async () => {
    const supabase = createClient()
    return await supabase.auth.signOut()
  },

  // Get current session
  getSession: async () => {
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()
    return session
  },

  // Get current user
  getUser: async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    return user
  },

  // Refresh session
  refreshSession: async () => {
    const supabase = createClient()
    return await supabase.auth.refreshSession()
  }
}