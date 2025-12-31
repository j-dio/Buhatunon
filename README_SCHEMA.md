# Database Schema Documentation

This document explains the database structure for the Buhatunon application.

## Schema Files

- `supabase/migrations/20241231000001_initial_schema.sql` - Main database tables and structure
- `supabase/migrations/20241231000002_row_level_security.sql` - Security policies
- `supabase/seed.sql` - Sample data for development
- `supabase/config.toml` - Supabase CLI configuration
- `src/types/database.ts` - TypeScript type definitions

## Tables

### users
Core user information and encrypted credentials.

- `id` - UUID primary key
- `email` - Unique user email
- `name` - Optional display name
- `uvec_calendar_url` - Encrypted iCal feed URL from UVEC/Moodle
- `google_refresh_token` - Encrypted OAuth refresh token for Google Classroom

### courses
Courses from different platforms (Google Classroom, UVEC).

- `user_id` - References users table
- `source` - Platform type ('uvec' or 'gclassroom')
- `source_id` - Original course ID from the platform
- `name` - Course name
- `color` - Hex color for UI display

### tasks
Individual tasks/assignments from all platforms.

- `user_id` - References users table
- `course_id` - Optional reference to courses table
- `source` - Platform type ('uvec', 'gclassroom', or 'manual')
- `source_id` - Original task ID from platform (null for manual tasks)
- `title` - Task title
- `description` - Task description
- `due_date` - Optional deadline
- `max_score` - Optional maximum points
- `status` - User-controlled status ('not_started', 'in_progress', 'done')
- `priority` - Eisenhower matrix priority ('urgent_important', 'important', 'urgent', 'neither')
- `submission_state` - Platform-specific state (e.g., Google Classroom submission status)

### sync_logs
Tracks synchronization attempts for debugging and transparency.

- `user_id` - References users table
- `source` - Platform that was synced
- `status` - 'success' or 'failed'
- `tasks_added` - Number of new tasks found
- `tasks_updated` - Number of existing tasks updated
- `error_message` - Error details if sync failed

## Security

- **Row Level Security (RLS)** is enabled on all tables
- Users can only access their own data
- Service role can bypass RLS for administrative operations
- Sensitive data (calendar URLs, OAuth tokens) should be encrypted at application level

## Helper Functions

- `get_tasks_due_today(user_uuid)` - Returns tasks due today for a user
- `get_overdue_tasks(user_uuid)` - Returns overdue tasks with days overdue

## Development Setup

1. Install Supabase CLI: `npm install -g supabase`
2. Start local Supabase: `supabase start`
3. Apply migrations: `supabase db reset`
4. (Optional) Load sample data: `psql -h localhost -p 54322 -d postgres -U postgres -f supabase/seed.sql`

The local Supabase instance will be available at:
- Database: `postgresql://postgres:postgres@localhost:54322/postgres`
- API: `http://localhost:54321`
- Studio: `http://localhost:54323`