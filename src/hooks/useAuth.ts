'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { AuthState, AuthUser, AuthSession } from '@/types/auth'

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true
  })
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setState({
        user: session?.user as AuthUser | null,
        session: session as AuthSession | null,
        loading: false
      })
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setState({
          user: session?.user as AuthUser | null,
          session: session as AuthSession | null,
          loading: false
        })

        // Handle auth events
        if (event === 'SIGNED_IN') {
          // Create or update user profile
          if (session?.user) {
            await createOrUpdateUserProfile(session.user)
          }
        }

        // Refresh the page to update server components
        router.refresh()
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [router, supabase.auth])

  return state
}

// Helper function to create or update user profile
async function createOrUpdateUserProfile(user: AuthUser) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('users')
    .upsert({
      id: user.id,
      email: user.email!,
      name: user.user_metadata?.full_name || user.user_metadata?.name || null,
      updated_at: new Date().toISOString()
    })
    .select()

  if (error) {
    console.error('Error creating/updating user profile:', error)
  }

  return data
}