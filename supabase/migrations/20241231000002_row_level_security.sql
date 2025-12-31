-- Enable Row Level Security on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE sync_logs ENABLE ROW LEVEL SECURITY;

-- Users can only see and modify their own records
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Courses policies
CREATE POLICY "Users can view own courses" ON courses
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own courses" ON courses
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own courses" ON courses
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own courses" ON courses
    FOR DELETE USING (auth.uid() = user_id);

-- Tasks policies
CREATE POLICY "Users can view own tasks" ON tasks
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tasks" ON tasks
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tasks" ON tasks
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own tasks" ON tasks
    FOR DELETE USING (auth.uid() = user_id);

-- Sync logs policies
CREATE POLICY "Users can view own sync logs" ON sync_logs
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sync logs" ON sync_logs
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Service role can bypass RLS for admin operations
CREATE POLICY "Service role can manage all data" ON users
    FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Service role can manage all courses" ON courses
    FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Service role can manage all tasks" ON tasks
    FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Service role can manage all sync logs" ON sync_logs
    FOR ALL TO service_role USING (true) WITH CHECK (true);