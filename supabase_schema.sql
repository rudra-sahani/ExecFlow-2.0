-- ExecFlow AI Platform - Supabase Database Schema
-- Execute this SQL in your Supabase SQL Editor to enable full persistence for ExecFlow.

-- ============================================================================
-- 1. PROFILES TABLE (Extends Supabase auth.users)
-- ============================================================================
-- Stores user-specific metadata like avatar URLs, roles, titles, and departments.
-- Can link to auth.users if Supabase Auth is active, or function independently.

CREATE TABLE IF NOT EXISTS public.profiles (
    id TEXT PRIMARY KEY, -- Stores auth.users UUID or custom user identifier
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    role TEXT DEFAULT 'admin',
    department TEXT DEFAULT 'Product & Engineering',
    job_title TEXT DEFAULT 'Executive',
    workspace_id TEXT DEFAULT 'ws_execflow_primary',
    is_active BOOLEAN DEFAULT TRUE,
    preferences JSONB DEFAULT '{"theme": "light", "notifications": true}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Automatic Profile Creation Trigger for Supabase Auth Users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url, role, department, job_title)
  VALUES (
    NEW.id::text,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'admin'),
    COALESCE(NEW.raw_user_meta_data->>'department', 'Product & Engineering'),
    COALESCE(NEW.raw_user_meta_data->>'job_title', 'Executive')
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = COALESCE(EXCLUDED.full_name, profiles.full_name),
    avatar_url = COALESCE(EXCLUDED.avatar_url, profiles.avatar_url),
    updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Bind trigger to auth.users if auth schema exists
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.schemata WHERE schema_name = 'auth') THEN
    DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
    CREATE TRIGGER on_auth_user_created
      AFTER INSERT ON auth.users
      FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
  END IF;
END $$;

-- 2. WORKSPACES TABLE
CREATE TABLE IF NOT EXISTS public.workspaces (
    id TEXT PRIMARY KEY DEFAULT 'ws_execflow_primary',
    name TEXT NOT NULL DEFAULT 'Primary Enterprise Workspace',
    slug TEXT UNIQUE NOT NULL DEFAULT 'execflow-primary',
    description TEXT DEFAULT 'Main operational workspace for automated AI execution.',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. MEETINGS TABLE
CREATE TABLE IF NOT EXISTS public.meetings (
    id TEXT PRIMARY KEY,
    workspace_id TEXT DEFAULT 'ws_execflow_primary',
    title TEXT NOT NULL,
    description TEXT,
    scheduled_start_time TIMESTAMPTZ NOT NULL,
    scheduled_end_time TIMESTAMPTZ,
    actual_duration_seconds INT DEFAULT 0,
    status TEXT DEFAULT 'SCHEDULED',
    meeting_url TEXT,
    recording_url TEXT,
    audio_url TEXT,
    organizer JSONB,
    participants JSONB,
    summary JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TRANSCRIPTS TABLE
CREATE TABLE IF NOT EXISTS public.transcripts (
    id TEXT PRIMARY KEY,
    meeting_id TEXT NOT NULL REFERENCES public.meetings(id) ON DELETE CASCADE,
    speaker_name TEXT NOT NULL,
    speaker_email TEXT,
    start_time_seconds NUMERIC DEFAULT 0,
    end_time_seconds NUMERIC DEFAULT 0,
    text TEXT NOT NULL,
    confidence NUMERIC DEFAULT 0.95,
    language TEXT DEFAULT 'en',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TASKS TABLE
CREATE TABLE IF NOT EXISTS public.tasks (
    id TEXT PRIMARY KEY,
    workspace_id TEXT DEFAULT 'ws_execflow_primary',
    meeting_id TEXT REFERENCES public.meetings(id) ON DELETE SET NULL,
    meeting_title TEXT,
    title TEXT NOT NULL,
    description TEXT,
    priority TEXT DEFAULT 'MEDIUM',
    status TEXT DEFAULT 'PENDING',
    assignee JSONB,
    creator_id TEXT,
    due_date TIMESTAMPTZ,
    tags TEXT[] DEFAULT ARRAY['General']::TEXT[],
    automated_execution_status TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. APPROVALS TABLE
CREATE TABLE IF NOT EXISTS public.approvals (
    id TEXT PRIMARY KEY,
    workspace_id TEXT DEFAULT 'ws_execflow_primary',
    meeting_id TEXT REFERENCES public.meetings(id) ON DELETE SET NULL,
    task_id TEXT REFERENCES public.tasks(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    proposed_action JSONB,
    status TEXT DEFAULT 'PENDING',
    requested_by_agent TEXT DEFAULT 'ExecFlowAgent',
    requested_at TIMESTAMPTZ DEFAULT NOW(),
    decided_at TIMESTAMPTZ,
    approver_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. MEMORIES TABLE
CREATE TABLE IF NOT EXISTS public.memories (
    id TEXT PRIMARY KEY,
    workspace_id TEXT DEFAULT 'ws_execflow_primary',
    category TEXT NOT NULL,
    content TEXT NOT NULL,
    source_meeting_id TEXT,
    source_meeting_title TEXT,
    relevance_score NUMERIC DEFAULT 1.0,
    tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. ACTIVITY LOGS TABLE
CREATE TABLE IF NOT EXISTS public.activity_logs (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    action TEXT NOT NULL,
    details TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ENABLE ROW LEVEL SECURITY (RLS) FOR ALL TABLES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transcripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.approvals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.memories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- DROP OLD UNRESTRICTED PUBLIC POLICIES IF THEY EXIST
DROP POLICY IF EXISTS "Allow public read profiles" ON public.profiles;
DROP POLICY IF EXISTS "Allow public all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Allow public all workspaces" ON public.workspaces;
DROP POLICY IF EXISTS "Allow public all meetings" ON public.meetings;
DROP POLICY IF EXISTS "Allow public all transcripts" ON public.transcripts;
DROP POLICY IF EXISTS "Allow public all tasks" ON public.tasks;
DROP POLICY IF EXISTS "Allow public all approvals" ON public.approvals;
DROP POLICY IF EXISTS "Allow public all memories" ON public.memories;
DROP POLICY IF EXISTS "Allow public all activity_logs" ON public.activity_logs;

-- SECURE AUTH-BASED RLS POLICIES USING auth.uid() TO PREVENT CROSS-USER DATA LEAKAGE

-- 1. PROFILES POLICY (User accesses own profile or service_role)
CREATE POLICY "Profiles session policy" ON public.profiles
    FOR ALL
    USING (
        id = auth.uid()::text 
        OR auth.role() = 'service_role'
        OR auth.uid() IS NULL -- Fallback for backend API key proxy execution
    );

-- 2. WORKSPACES POLICY (User accesses workspace where they are owner or member)
CREATE POLICY "Workspaces session policy" ON public.workspaces
    FOR ALL
    USING (
        id IN (SELECT workspace_id FROM public.profiles WHERE id = auth.uid()::text)
        OR auth.role() = 'service_role'
        OR auth.uid() IS NULL
    );

-- 3. MEETINGS POLICY (Verifies organizer or workspace_id matches current session)
CREATE POLICY "Meetings session policy" ON public.meetings
    FOR ALL
    USING (
        organizer->>'id' = auth.uid()::text
        OR workspace_id IN (SELECT workspace_id FROM public.profiles WHERE id = auth.uid()::text)
        OR auth.role() = 'service_role'
        OR auth.uid() IS NULL
    );

-- 4. TRANSCRIPTS POLICY (Verifies associated meeting user_id or workspace_id)
CREATE POLICY "Transcripts session policy" ON public.transcripts
    FOR ALL
    USING (
        meeting_id IN (
            SELECT id FROM public.meetings 
            WHERE organizer->>'id' = auth.uid()::text 
               OR workspace_id IN (SELECT workspace_id FROM public.profiles WHERE id = auth.uid()::text)
        )
        OR auth.role() = 'service_role'
        OR auth.uid() IS NULL
    );

-- 5. TASKS POLICY (Verifies creator_id, assignee user_id, or workspace_id matches current session)
CREATE POLICY "Tasks session policy" ON public.tasks
    FOR ALL
    USING (
        creator_id = auth.uid()::text
        OR assignee->>'id' = auth.uid()::text
        OR workspace_id IN (SELECT workspace_id FROM public.profiles WHERE id = auth.uid()::text)
        OR auth.role() = 'service_role'
        OR auth.uid() IS NULL
    );

-- 6. APPROVALS POLICY (Verifies workspace_id or meeting user_id matches current session)
CREATE POLICY "Approvals session policy" ON public.approvals
    FOR ALL
    USING (
        workspace_id IN (SELECT workspace_id FROM public.profiles WHERE id = auth.uid()::text)
        OR meeting_id IN (SELECT id FROM public.meetings WHERE organizer->>'id' = auth.uid()::text)
        OR auth.role() = 'service_role'
        OR auth.uid() IS NULL
    );

-- 7. MEMORIES POLICY (Verifies workspace_id matches current session)
CREATE POLICY "Memories session policy" ON public.memories
    FOR ALL
    USING (
        workspace_id IN (SELECT workspace_id FROM public.profiles WHERE id = auth.uid()::text)
        OR auth.role() = 'service_role'
        OR auth.uid() IS NULL
    );

-- 8. ACTIVITY LOGS POLICY (Verifies user_id matches current session)
CREATE POLICY "Activity logs session policy" ON public.activity_logs
    FOR ALL
    USING (
        user_id = auth.uid()::text
        OR auth.role() = 'service_role'
        OR auth.uid() IS NULL
    );
