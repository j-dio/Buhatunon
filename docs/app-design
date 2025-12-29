# Unified Task Tracker - Design Document

**Project Name:** Buhatunon (Cebuano for "things to be done")  
**Problem:** UP Cebu students juggle two separate learning platforms (Google Classroom + UVEC/Moodle), making task tracking fragmented and stressful.  
**Solution:** A unified web app that aggregates tasks from both platforms, helping students see what needs to be done and prioritize effectively.

---

## 1. Data Sources

### UVEC (Moodle)
- **Method:** iCal feed URL (user-specific, contains auth token)
- **Data available:** Task title, description, due date, course name
- **Refresh:** Fetch on-demand or scheduled (every 4-6 hours)
- **Security:** Auth token in URL must be encrypted at rest

### Google Classroom
- **Method:** Google Classroom API via OAuth 2.0
- **Scopes needed:**
  - `classroom.courses.readonly` - list enrolled courses
  - `classroom.coursework.me.readonly` - view assignments
  - `classroom.student-submissions.me.readonly` - view submission status
- **Data available:** Task title, description, due date, course name, max points, submission state
- **Refresh:** On-demand or scheduled

---

## 2. Database Schema

### Users Table
```sql
users
├── id                  UUID PRIMARY KEY
├── email               VARCHAR UNIQUE NOT NULL
├── name                VARCHAR
├── uvec_calendar_url   TEXT (encrypted)
├── google_refresh_token TEXT (encrypted)
├── created_at          TIMESTAMP
└── updated_at          TIMESTAMP
```

### Courses Table
```sql
courses
├── id                  UUID PRIMARY KEY
├── user_id             UUID REFERENCES users(id)
├── source              ENUM ('uvec', 'gclassroom')
├── source_id           VARCHAR (original ID from platform)
├── name                VARCHAR NOT NULL
├── color               VARCHAR (for UI distinction)
├── created_at          TIMESTAMP
└── updated_at          TIMESTAMP
└── UNIQUE(user_id, source, source_id)
```

### Tasks Table
```sql
tasks
├── id                  UUID PRIMARY KEY
├── user_id             UUID REFERENCES users(id)
├── course_id           UUID REFERENCES courses(id)
├── source              ENUM ('uvec', 'gclassroom', 'manual')
├── source_id           VARCHAR (UID from iCal or courseWorkId)
├── title               VARCHAR NOT NULL
├── description         TEXT
├── due_date            TIMESTAMP (nullable for no-deadline tasks)
├── max_score           INTEGER (nullable)
├── status              ENUM ('not_started', 'in_progress', 'done')
├── priority            ENUM ('urgent_important', 'important', 'urgent', 'neither') -- Eisenhower
├── submission_state    VARCHAR (from GClassroom: CREATED, TURNED_IN, RETURNED, etc.)
├── created_at          TIMESTAMP
├── updated_at          TIMESTAMP
├── synced_at           TIMESTAMP
└── UNIQUE(user_id, source, source_id)
```

### Sync Logs Table (for debugging/transparency)
```sql
sync_logs
├── id                  UUID PRIMARY KEY
├── user_id             UUID REFERENCES users(id)
├── source              ENUM ('uvec', 'gclassroom')
├── status              ENUM ('success', 'failed')
├── tasks_added         INTEGER
├── tasks_updated       INTEGER
├── error_message       TEXT
└── synced_at           TIMESTAMP
```

---

## 3. Unified Task Schema (TypeScript)

```typescript
interface Task {
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

interface Course {
  id: string;
  userId: string;
  source: 'uvec' | 'gclassroom';
  sourceId: string;
  name: string;
  color: string; // Hex color for UI badges
}
```

---

## 4. Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND                                │
│                    Next.js 14 (App Router)                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │  Dashboard  │  │  Calendar   │  │  Task List / Eisenhower │  │
│  │   (Today)   │  │    View     │  │        Matrix           │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      API LAYER                                  │
│                 Netlify Functions (Edge)                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │  /api/sync  │  │ /api/tasks  │  │  /api/auth/google       │  │
│  │   (UVEC +   │  │   (CRUD)    │  │  (OAuth callback)       │  │
│  │  GClassroom)│  │             │  │                         │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
          ┌───────────────────┼───────────────────┐
          ▼                   ▼                   ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   UVEC/Moodle   │  │ Google Classroom│  │    Database     │
│   iCal Feed     │  │      API        │  │   (Supabase)    │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

---

## 5. Key Features (Prioritized for MVP)

### MVP (v1) - Core Functionality
1. **Onboarding Flow**
   - Paste UVEC calendar URL
   - Connect Google Classroom via OAuth
   
2. **Automatic Task Sync**
   - Parse iCal feed from UVEC
   - Fetch coursework from Google Classroom API
   - Deduplicate and normalize into unified schema
   
3. **Dashboard View** (Landing page after login)
   - "Due Today" section
   - "Due This Week" section
   - "Overdue" section (red alert)
   - Quick status toggle (not started → in progress → done)

4. **Task List View**
   - Filter by: course, source, status, date range
   - Sort by: due date, course, status
   - Source badges (UVEC vs GClassroom)

5. **Manual Task Addition**
   - For tasks not captured by either platform

### v1.5 - Productivity Boost
6. **Calendar View**
   - Month/week/day views
   - Color-coded by course
   - Click to view task details

7. **Eisenhower Matrix View**
   - 4-quadrant drag-and-drop interface
   - Auto-suggest priority based on due date proximity

8. **Smart "What's Next?" Widget**
   - Algorithm weighing: due date, priority, estimated effort
   - Shows top 3 recommended tasks to work on

### v2 - Polish & Scale
9. **Push Notifications** (PWA)
10. **Dark Mode**
11. **Export to Google Calendar / iCal**
12. **Collaborative features** (share task lists with blockmates)

---

## 6. UI Components Structure

```
src/
├── app/
│   ├── page.tsx                    # Landing/marketing page
│   ├── dashboard/
│   │   └── page.tsx                # Main dashboard after login
│   ├── tasks/
│   │   └── page.tsx                # Full task list view
│   ├── calendar/
│   │   └── page.tsx                # Calendar view
│   ├── matrix/
│   │   └── page.tsx                # Eisenhower matrix view
│   ├── settings/
│   │   └── page.tsx                # Account, connections, preferences
│   └── api/
│       ├── auth/
│       │   └── google/route.ts     # OAuth handler
│       ├── sync/route.ts           # Trigger sync
│       └── tasks/route.ts          # CRUD operations
│
├── components/
│   ├── ui/                         # Base components (Button, Card, etc.)
│   ├── TaskCard.tsx                # Individual task display
│   ├── TaskList.tsx                # List of TaskCards with filters
│   ├── TaskForm.tsx                # Add/edit task modal
│   ├── CourseFilter.tsx            # Filter dropdown
│   ├── StatusBadge.tsx             # not_started | in_progress | done
│   ├── SourceBadge.tsx             # UVEC | GClassroom | Manual
│   ├── DueDateIndicator.tsx        # Color-coded urgency
│   ├── EisenhowerMatrix.tsx        # 4-quadrant grid
│   ├── CalendarView.tsx            # Month/week calendar
│   └── WhatsNextWidget.tsx         # Smart recommendations
│
├── lib/
│   ├── parsers/
│   │   ├── ical.ts                 # Parse UVEC iCal feed
│   │   └── gclassroom.ts           # Transform GClassroom API response
│   ├── sync/
│   │   ├── uvec.ts                 # Fetch & parse UVEC
│   │   └── gclassroom.ts           # Fetch & parse GClassroom
│   ├── db.ts                       # Supabase client
│   ├── auth.ts                     # Auth utilities
│   └── utils.ts                    # Date formatting, etc.
│
└── types/
    └── index.ts                    # TypeScript interfaces
```

---

## 7. "What's Next?" Algorithm (v1.5)

```typescript
function calculatePriority(task: Task): number {
  let score = 0;
  const now = new Date();
  
  if (!task.dueDate) return 0; // No deadline = lowest priority
  
  const hoursUntilDue = (task.dueDate.getTime() - now.getTime()) / (1000 * 60 * 60);
  
  // Urgency scoring
  if (hoursUntilDue < 0) score += 100;        // Overdue
  else if (hoursUntilDue < 24) score += 80;   // Due within 24h
  else if (hoursUntilDue < 72) score += 60;   // Due within 3 days
  else if (hoursUntilDue < 168) score += 40;  // Due within 1 week
  
  // Eisenhower boost
  if (task.priority === 'urgent_important') score += 50;
  else if (task.priority === 'important') score += 30;
  else if (task.priority === 'urgent') score += 20;
  
  // Status penalty (already in progress = slightly lower to encourage finishing)
  if (task.status === 'in_progress') score += 10;
  if (task.status === 'done') score = 0;
  
  return score;
}

function getWhatsNext(tasks: Task[], limit = 3): Task[] {
  return tasks
    .filter(t => t.status !== 'done')
    .sort((a, b) => calculatePriority(b) - calculatePriority(a))
    .slice(0, limit);
}
```

---

## 8. Tech Stack Summary

| Layer | Technology | Why |
|-------|------------|-----|
| Frontend | Next.js 14 (App Router) | SSR, file-based routing, React Server Components |
| Styling | Tailwind CSS | Rapid prototyping, utility-first |
| UI Components | shadcn/ui | Accessible, customizable, no vendor lock-in |
| State Management | Zustand or React Query | Lightweight, good for async data |
| Database | Supabase (PostgreSQL) | Free tier, real-time, built-in auth |
| Auth | Supabase Auth + Google OAuth | Handles token refresh |
| Hosting | Netlify | Edge functions, easy deploys, aligns with your goals |
| iCal Parsing | ical.js | Robust iCal parsing library |

---

## 9. Security Considerations

1. **UVEC Calendar URLs** contain auth tokens - store encrypted (AES-256)
2. **Google OAuth tokens** - use Supabase's built-in secure storage
3. **Row-Level Security (RLS)** in Supabase - users can only access their own data
4. **HTTPS everywhere** - enforced by Netlify
5. **Rate limiting** on sync endpoints to prevent abuse

---

## 10. Development Phases

### Phase 1: Foundation (Week 1-2)
- [ ] Set up Next.js + Tailwind + shadcn/ui
- [ ] Set up Supabase project with schema
- [ ] Implement UVEC iCal parser
- [ ] Basic task list UI

### Phase 2: Google Integration (Week 3)
- [ ] Google OAuth flow
- [ ] Google Classroom API integration
- [ ] Unified sync function

### Phase 3: Core Features (Week 4-5)
- [ ] Dashboard with "Due Today/This Week"
- [ ] Task status toggling
- [ ] Manual task creation
- [ ] Course filtering

### Phase 4: Polish (Week 6)
- [ ] Calendar view
- [ ] Eisenhower matrix view
- [ ] "What's Next?" widget
- [ ] Mobile responsiveness

### Phase 5: Launch Prep (Week 7)
- [ ] Error handling & edge cases
- [ ] Loading states & skeletons
- [ ] Beta testing with blockmates
- [ ] Deploy to production

---

## 11. Open Questions to Decide

1. **Naming:** "Buhatunon" or something else? English name for broader appeal?
2. **Auth:** Supabase Auth or separate Google-only auth?
3. **Sync frequency:** Manual trigger only, or also scheduled?
4. **Offline support:** PWA with service worker for offline task viewing?
5. **Scope for v1:** Include Eisenhower matrix in MVP or defer to v1.5?

---

## Next Steps

1. Finalize naming and branding
2. Create Supabase project and schema
3. Start with iCal parser (since we already have a sample file)
4. Build basic task list component
5. Add Google OAuth once core is working

Ready to start building! 🚀
