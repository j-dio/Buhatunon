// Core types for Buhatunon application

export interface Task {
  id: string;
  userId: string;
  courseId: string;
  
  // Source tracking
  source: 'uvec' | 'gclassroom' | 'manual';
  sourceId: string | null;
  
  // Core fields
  title: string;
  description: string | null;
  dueDate: Date | null;
  
  // Scoring (primarily from GClassroom)
  maxScore: number | null;
  
  // User-controlled status
  status: 'not_started' | 'in_progress' | 'done';
  
  // Eisenhower Matrix priority (user-assigned or auto-suggested)
  priority: 'urgent_important' | 'important' | 'urgent' | 'neither' | null;
  
  // Platform-specific submission state
  submissionState: string | null; // GClassroom: CREATED, TURNED_IN, RETURNED, etc.
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  syncedAt: Date;
}

export interface Course {
  id: string;
  userId: string;
  source: 'uvec' | 'gclassroom';
  sourceId: string;
  name: string;
  color: string; // Hex color for UI badges
}

export interface User {
  id: string;
  email: string;
  name: string | null;
  uvecCalendarUrl: string | null; // encrypted
  googleRefreshToken: string | null; // encrypted
  createdAt: Date;
  updatedAt: Date;
}

// Result type for error handling
export type Result<T> = 
  | { success: true; data: T }
  | { success: false; error: string };