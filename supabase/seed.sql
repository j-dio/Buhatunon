-- Sample data for development/testing
-- Note: This should only be used in development environments

-- Insert sample user (using a test UUID)
INSERT INTO users (id, email, name, created_at, updated_at) VALUES 
('550e8400-e29b-41d4-a716-446655440000', 'test@upcebu.edu.ph', 'Test Student', NOW(), NOW())
ON CONFLICT (email) DO NOTHING;

-- Insert sample courses
INSERT INTO courses (id, user_id, source, source_id, name, color, created_at, updated_at) VALUES 
('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', 'gclassroom', 'course_001', 'Mathematics 101', '#3B82F6', NOW(), NOW()),
('660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440000', 'uvec', 'course_002', 'Physics Laboratory', '#10B981', NOW(), NOW()),
('660e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440000', 'gclassroom', 'course_003', 'Computer Science Fundamentals', '#8B5CF6', NOW(), NOW())
ON CONFLICT (user_id, source, source_id) DO NOTHING;

-- Insert sample tasks
INSERT INTO tasks (id, user_id, course_id, source, source_id, title, description, due_date, max_score, status, priority, submission_state, created_at, updated_at, synced_at) VALUES 
('770e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', '660e8400-e29b-41d4-a716-446655440001', 'gclassroom', 'task_001', 'Algebra Assignment Chapter 5', 'Complete exercises 1-20 from Chapter 5', NOW() + INTERVAL '2 days', 100, 'not_started', 'important', 'CREATED', NOW(), NOW(), NOW()),
('770e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440000', '660e8400-e29b-41d4-a716-446655440002', 'uvec', 'task_002', 'Physics Lab Report', 'Submit lab report for Experiment 3', NOW() + INTERVAL '5 days', 50, 'in_progress', 'urgent_important', NULL, NOW(), NOW(), NOW()),
('770e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440000', '660e8400-e29b-41d4-a716-446655440003', 'gclassroom', 'task_003', 'Programming Project', 'Create a simple calculator using Python', NOW() + INTERVAL '7 days', 150, 'not_started', 'important', 'CREATED', NOW(), NOW(), NOW()),
('770e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440000', NULL, 'manual', NULL, 'Study Group Meeting', 'Prepare for midterm exams', NOW() + INTERVAL '1 day', NULL, 'not_started', 'urgent', NULL, NOW(), NOW(), NOW()),
('770e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440000', '660e8400-e29b-41d4-a716-446655440001', 'gclassroom', 'task_005', 'Math Quiz', 'Online quiz covering chapters 1-4', NOW() - INTERVAL '1 day', 25, 'done', 'urgent_important', 'TURNED_IN', NOW() - INTERVAL '3 days', NOW(), NOW())
ON CONFLICT (user_id, source, source_id) DO NOTHING;

-- Insert sample sync logs
INSERT INTO sync_logs (id, user_id, source, status, tasks_added, tasks_updated, error_message, synced_at) VALUES 
('880e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', 'gclassroom', 'success', 3, 1, NULL, NOW() - INTERVAL '2 hours'),
('880e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440000', 'uvec', 'success', 1, 0, NULL, NOW() - INTERVAL '1 hour'),
('880e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440000', 'gclassroom', 'failed', 0, 0, 'API rate limit exceeded', NOW() - INTERVAL '30 minutes');

-- Add some helpful functions for development

-- Function to get tasks due today
CREATE OR REPLACE FUNCTION get_tasks_due_today(user_uuid UUID)
RETURNS TABLE (
    id UUID,
    title VARCHAR,
    course_name VARCHAR,
    source VARCHAR,
    due_date TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT t.id, t.title, c.name as course_name, t.source, t.due_date
    FROM tasks t
    LEFT JOIN courses c ON t.course_id = c.id
    WHERE t.user_id = user_uuid
    AND t.due_date::date = CURRENT_DATE
    AND t.status != 'done'
    ORDER BY t.due_date ASC;
END;
$$ LANGUAGE plpgsql;

-- Function to get overdue tasks
CREATE OR REPLACE FUNCTION get_overdue_tasks(user_uuid UUID)
RETURNS TABLE (
    id UUID,
    title VARCHAR,
    course_name VARCHAR,
    source VARCHAR,
    due_date TIMESTAMP WITH TIME ZONE,
    days_overdue INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT t.id, t.title, c.name as course_name, t.source, t.due_date,
           EXTRACT(days FROM NOW() - t.due_date)::INTEGER as days_overdue
    FROM tasks t
    LEFT JOIN courses c ON t.course_id = c.id
    WHERE t.user_id = user_uuid
    AND t.due_date < NOW()
    AND t.status != 'done'
    ORDER BY t.due_date ASC;
END;
$$ LANGUAGE plpgsql;