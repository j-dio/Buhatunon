import { User, Session } from '@supabase/supabase-js'

export interface AuthUser extends User {
  // Additional user properties if needed
}

export interface AuthSession extends Session {
  // Additional session properties if needed
}

export interface AuthState {
  user: AuthUser | null
  session: AuthSession | null
  loading: boolean
}

export interface SignInWithGoogleOptions {
  redirectTo?: string
  scopes?: string
}