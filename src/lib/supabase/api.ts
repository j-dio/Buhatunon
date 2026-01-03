import { createClient } from './client'
import { createServerClient } from './server'
import { Database } from '@/types/database'

type Tables = Database['public']['Tables']
type TaskRow = Tables['tasks']['Row']
type CourseRow = Tables['courses']['Row']
type UserRow = Tables['users']['Row']
type SyncLogRow = Tables['sync_logs']['Row']

// User profile functions
export const createOrUpdateUserProfile = async (userData: {
  id: string
  email: string
  name?: string
}) => {
  const supabase = createClient()
  return await supabase
    .from('users')
    .upsert({
      id: userData.id,
      email: userData.email,
      name: userData.name,
      updated_at: new Date().toISOString()
    })
    .select()
    .single()
}

// Client-side API functions
export const clientApi = {
  // Tasks
  getTasks: async (userId: string) => {
    const supabase = createClient()
    return await supabase
      .from('tasks')
      .select(`
        *,
        course:courses(*)
      `)
      .eq('user_id', userId)
      .order('due_date', { ascending: true })
  },

  createTask: async (task: Tables['tasks']['Insert']) => {
    const supabase = createClient()
    return await supabase
      .from('tasks')
      .insert(task)
      .select()
      .single()
  },

  updateTask: async (id: string, updates: Tables['tasks']['Update']) => {
    const supabase = createClient()
    return await supabase
      .from('tasks')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
  },

  deleteTask: async (id: string) => {
    const supabase = createClient()
    return await supabase
      .from('tasks')
      .delete()
      .eq('id', id)
  },

  // Courses
  getCourses: async (userId: string) => {
    const supabase = createClient()
    return await supabase
      .from('courses')
      .select('*')
      .eq('user_id', userId)
      .order('name')
  },

  // User profile
  getProfile: async (userId: string) => {
    const supabase = createClient()
    return await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()
  },

  updateProfile: async (userId: string, updates: Tables['users']['Update']) => {
    const supabase = createClient()
    return await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()
  },

  // Sync logs
  getSyncLogs: async (userId: string, limit = 10) => {
    const supabase = createClient()
    return await supabase
      .from('sync_logs')
      .select('*')
      .eq('user_id', userId)
      .order('synced_at', { ascending: false })
      .limit(limit)
  }
}

// Server-side API functions
export const serverApi = {
  // Get user session
  getSession: async () => {
    const supabase = createServerClient()
    const { data: { session } } = await supabase.auth.getSession()
    return session
  },

  // Get user profile
  getProfile: async (userId: string) => {
    const supabase = createServerClient()
    return await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()
  },

  // Get tasks with courses
  getTasksWithCourses: async (userId: string) => {
    const supabase = createServerClient()
    return await supabase
      .from('tasks')
      .select(`
        *,
        course:courses(*)
      `)
      .eq('user_id', userId)
      .order('due_date', { ascending: true })
  }
}

// Helper functions
export const dbHelpers = {
  // Get tasks due today
  getTasksDueToday: async (userId: string) => {
    const supabase = createClient()
    return await supabase.rpc('get_tasks_due_today', {
      user_uuid: userId
    })
  },

  // Get overdue tasks
  getOverdueTasks: async (userId: string) => {
    const supabase = createClient()
    return await supabase.rpc('get_overdue_tasks', {
      user_uuid: userId
    })
  }
}

// Type exports for convenience
export type {
  TaskRow,
  CourseRow,
  UserRow,
  SyncLogRow
}