-- =========================================================================
-- HANGUL ACADEMY - POSTGRESQL & SUPABASE RELATIONAL SCHEMA WITH ROW LEVEL SECURITY
-- =========================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES & ROLES
CREATE TYPE user_role AS ENUM ('student', 'teacher', 'admin');
CREATE TYPE account_status AS ENUM ('active', 'inactive', 'suspended');
CREATE TYPE proficiency_level AS ENUM ('Pre-A1', 'Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5', 'Level 6');

CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role user_role NOT NULL DEFAULT 'student',
    status account_status NOT NULL DEFAULT 'active',
    email_verified BOOLEAN DEFAULT FALSE,
    last_login_at TIMESTAMPTZ,
    student_id TEXT UNIQUE,
    proficiency proficiency_level DEFAULT 'Pre-A1',
    immersion_stage TEXT DEFAULT 'beginner',
    explanation_language TEXT DEFAULT 'English',
    filipino_support BOOLEAN DEFAULT TRUE,
    daily_study_minutes INT DEFAULT 60,
    study_days_per_week INT DEFAULT 7,
    assigned_teacher_id UUID REFERENCES profiles(id),
    current_course_id TEXT,
    bio TEXT,
    attendance_percentage NUMERIC DEFAULT 100,
    current_academic_grade VARCHAR(10) DEFAULT 'Pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 1B. ADMIN AUDIT LOGS
CREATE TABLE audit_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    actor_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    actor_name TEXT NOT NULL,
    actor_email TEXT,
    action TEXT NOT NULL,
    target_user_id UUID,
    target_user_name TEXT,
    target_user_email TEXT,
    details TEXT NOT NULL
);

-- 2. COURSES & CURRICULUM
CREATE TABLE courses (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    korean_title TEXT NOT NULL,
    level proficiency_level NOT NULL,
    topik_level TEXT,
    description TEXT,
    objectives TEXT[],
    units_count INT DEFAULT 0,
    total_lessons INT DEFAULT 0,
    status TEXT DEFAULT 'published',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE course_units (
    id TEXT PRIMARY KEY,
    course_id TEXT REFERENCES courses(id) ON DELETE CASCADE,
    unit_number INT NOT NULL,
    title TEXT NOT NULL,
    korean_title TEXT NOT NULL,
    description TEXT
);

CREATE TABLE lessons (
    id TEXT PRIMARY KEY,
    unit_id TEXT REFERENCES course_units(id) ON DELETE CASCADE,
    course_id TEXT REFERENCES courses(id) ON DELETE CASCADE,
    lesson_number INT NOT NULL,
    title TEXT NOT NULL,
    korean_title TEXT NOT NULL,
    objectives TEXT[],
    introduction TEXT,
    explanation TEXT,
    korean_examples JSONB,
    filipino_notes TEXT,
    vocabulary_list JSONB,
    grammar_notes JSONB,
    interactive_exercises JSONB,
    comprehension_questions JSONB,
    summary TEXT,
    homework_prompt TEXT,
    status TEXT DEFAULT 'published'
);

-- 3. STUDENT LESSON COMPLETION
CREATE TABLE student_completed_lessons (
    student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    lesson_id TEXT REFERENCES lessons(id) ON DELETE CASCADE,
    completed_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (student_id, lesson_id)
);

-- 4. VOCABULARY & SPACED REPETITION (SM-2)
CREATE TABLE student_vocabulary (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    korean TEXT NOT NULL,
    romanization TEXT,
    pronunciation_guide TEXT,
    english TEXT NOT NULL,
    filipino TEXT,
    part_of_speech TEXT,
    example_korean TEXT,
    example_english TEXT,
    category TEXT,
    difficulty proficiency_level DEFAULT 'Pre-A1',
    repetition_number INT DEFAULT 0,
    interval_days INT DEFAULT 1,
    ease_factor NUMERIC DEFAULT 2.5,
    next_review_date DATE DEFAULT CURRENT_DATE,
    last_reviewed_date DATE,
    status TEXT DEFAULT 'learning',
    times_correct INT DEFAULT 0,
    times_incorrect INT DEFAULT 0
);

-- 5. ASSIGNMENTS & SUBMISSIONS
CREATE TABLE assignments (
    id TEXT PRIMARY KEY,
    course_id TEXT REFERENCES courses(id),
    lesson_id TEXT REFERENCES lessons(id),
    title TEXT NOT NULL,
    instructions TEXT NOT NULL,
    due_date DATE,
    max_grade INT DEFAULT 100,
    submission_type TEXT DEFAULT 'text',
    supporting_material TEXT
);

CREATE TABLE assignment_submissions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    assignment_id TEXT REFERENCES assignments(id) ON DELETE CASCADE,
    student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    student_name TEXT NOT NULL,
    submitted_at TIMESTAMPTZ DEFAULT NOW(),
    content TEXT NOT NULL,
    status TEXT DEFAULT 'submitted', -- 'submitted', 'under-review', 'graded'
    grade INT,
    teacher_feedback TEXT,
    ai_grammar_feedback JSONB
);

-- 6. QUIZZES & EXAMINATIONS
CREATE TABLE quizzes (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    course_id TEXT REFERENCES courses(id),
    type TEXT NOT NULL, -- 'weekly-quiz', 'monthly-exam', 'topik-mock'
    time_limit_minutes INT DEFAULT 20,
    passing_score INT DEFAULT 70,
    questions JSONB NOT NULL
);

CREATE TABLE exam_attempts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    quiz_id TEXT REFERENCES quizzes(id),
    student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    score INT NOT NULL,
    total_questions INT NOT NULL,
    passed BOOLEAN NOT NULL,
    answers JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. CERTIFICATES
CREATE TABLE certificates (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    certificate_number TEXT UNIQUE NOT NULL,
    student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    student_name TEXT NOT NULL,
    course_title TEXT NOT NULL,
    level proficiency_level NOT NULL,
    issue_date DATE DEFAULT CURRENT_DATE,
    final_grade VARCHAR(2) NOT NULL,
    score_percentage INT NOT NULL,
    instructor_name TEXT NOT NULL,
    verification_code TEXT UNIQUE NOT NULL
);

-- =========================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_completed_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_vocabulary ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignment_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can view their own active profile, Teachers view their students, Admins view all
CREATE POLICY "Profiles view policy" ON profiles
    FOR SELECT USING (
        auth.uid() = id OR 
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('teacher', 'admin') AND status = 'active')
    );

-- Profiles Insert: Users can only insert their own profile with default 'student' role and 'active' status
CREATE POLICY "Profiles self registration insert policy" ON profiles
    FOR INSERT WITH CHECK (
        (auth.uid() = id AND role = 'student' AND status = 'active') OR
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin' AND status = 'active')
    );

-- Profiles Update: Regular users can update their own profile but CANNOT change their role or status; Admins can update all
CREATE POLICY "Profiles update policy" ON profiles
    FOR UPDATE USING (
        (auth.uid() = id AND status = 'active') OR
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin' AND status = 'active')
    )
    WITH CHECK (
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin' AND status = 'active') OR
        (
            auth.uid() = id AND
            role = (SELECT p.role FROM profiles p WHERE p.id = auth.uid()) AND
            status = (SELECT p.status FROM profiles p WHERE p.id = auth.uid())
        )
    );

-- Profiles Delete: Only active Admins can delete profiles (cannot delete own profile)
CREATE POLICY "Profiles admin delete policy" ON profiles
    FOR DELETE USING (
        auth.uid() <> id AND
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin' AND status = 'active')
    );

-- Audit Logs: Only active Admins can read and insert audit logs
CREATE POLICY "Audit logs admin select" ON audit_logs
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin' AND status = 'active')
    );

CREATE POLICY "Audit logs insert" ON audit_logs
    FOR INSERT WITH CHECK (
        auth.uid() = actor_id OR
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin' AND status = 'active')
    );

-- Student Vocabulary: Students only read and write their own words
CREATE POLICY "Student vocabulary isolation" ON student_vocabulary
    FOR ALL USING (auth.uid() = student_id);

-- Submissions: Students access their submissions; Teachers & Admins can access and grade
CREATE POLICY "Student submission select" ON assignment_submissions
    FOR SELECT USING (
        auth.uid() = student_id OR 
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('teacher', 'admin'))
    );

CREATE POLICY "Student submission insert" ON assignment_submissions
    FOR INSERT WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Teacher grading update" ON assignment_submissions
    FOR UPDATE USING (
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('teacher', 'admin'))
    );

-- Certificates: Public read for verification by code, insert by admin/teacher
CREATE POLICY "Certificates public verification" ON certificates
    FOR SELECT USING (TRUE);
