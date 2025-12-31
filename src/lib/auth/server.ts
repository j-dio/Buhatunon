import { createServerClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function getServerSession() {
  const supabase = createServerClient()
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

export async function getServerUser() {
  const supabase = createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export async function requireAuth() {
  const session = await getServerSession()
  
  if (!session) {
    redirect('/')
  }
  
  return session
}

export async function requireUser() {
  const user = await getServerUser()
  
  if (!user) {
    redirect('/')
  }
  
  return user
}