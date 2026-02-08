-- =====================================================
-- HABIDEV - HABIT TRACKING APP DATABASE SCHEMA
-- Brand: GaloDev.com
-- Version: 2.0 - Complete Rebuild with Streaks System
-- =====================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================
-- PROFILES TABLE
-- Extends Supabase auth.users with additional user data
-- =====================================================
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  username TEXT UNIQUE,
  bio TEXT,
  timezone TEXT DEFAULT 'UTC',
  preferred_language TEXT DEFAULT 'es',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policies for profiles table
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- =====================================================
-- HABIT CATEGORIES TABLE
-- Categories to organize habits (e.g., Health, Productivity, etc.)
-- =====================================================
CREATE TABLE public.habit_categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  color TEXT NOT NULL DEFAULT '#3B82F6', -- Hex color code
  icon TEXT, -- Icon name or emoji
  is_system BOOLEAN DEFAULT false, -- System-provided categories
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  UNIQUE(user_id, name)
);

ALTER TABLE public.habit_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own categories and system categories"
  ON public.habit_categories FOR SELECT
  USING (auth.uid() = user_id OR is_system = true);

CREATE POLICY "Users can create their own categories"
  ON public.habit_categories FOR INSERT
  WITH CHECK (auth.uid() = user_id AND is_system = false);

CREATE POLICY "Users can update their own non-system categories"
  ON public.habit_categories FOR UPDATE
  USING (auth.uid() = user_id AND is_system = false);

CREATE POLICY "Users can delete their own non-system categories"
  ON public.habit_categories FOR DELETE
  USING (auth.uid() = user_id AND is_system = false);

-- =====================================================
-- HABITS TABLE
-- Core table for tracking habits
-- =====================================================
CREATE TYPE habit_type AS ENUM ('good', 'bad');
CREATE TYPE habit_frequency AS ENUM ('daily', 'weekly', 'custom');

CREATE TABLE public.habits (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  category_id UUID REFERENCES public.habit_categories(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  description TEXT,
  type habit_type NOT NULL DEFAULT 'good',
  frequency habit_frequency NOT NULL DEFAULT 'daily',
  target_count INTEGER DEFAULT 1, -- How many times per day/week
  goal_days INTEGER DEFAULT 30, -- Meta de días que el usuario quiere lograr
  current_streak INTEGER DEFAULT 0, -- Racha actual (calculada automáticamente)
  longest_streak INTEGER DEFAULT 0, -- Racha más larga histórica
  color TEXT DEFAULT '#3B82F6',
  icon TEXT,
  reminder_enabled BOOLEAN DEFAULT false,
  reminder_time TIME,
  is_archived BOOLEAN DEFAULT false,
  start_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

ALTER TABLE public.habits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own habits"
  ON public.habits FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own habits"
  ON public.habits FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own habits"
  ON public.habits FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own habits"
  ON public.habits FOR DELETE
  USING (auth.uid() = user_id);

-- =====================================================
-- HABIT LOGS TABLE
-- Track daily completions of habits
-- =====================================================
CREATE TABLE public.habit_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  habit_id UUID REFERENCES public.habits(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  count INTEGER DEFAULT 1, -- For habits that can be done multiple times
  notes TEXT,
  date DATE DEFAULT CURRENT_DATE NOT NULL,
  UNIQUE(habit_id, date) -- One log per habit per day
);

ALTER TABLE public.habit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own habit logs"
  ON public.habit_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own habit logs"
  ON public.habit_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own habit logs"
  ON public.habit_logs FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own habit logs"
  ON public.habit_logs FOR DELETE
  USING (auth.uid() = user_id);

-- =====================================================
-- FUNCTIONS FOR STREAK CALCULATION
-- =====================================================

-- Function to calculate current streak for a habit
CREATE OR REPLACE FUNCTION calculate_habit_streak(p_habit_id UUID)
RETURNS INTEGER AS $$
DECLARE
  v_streak INTEGER := 0;
  v_check_date DATE := CURRENT_DATE;
  v_last_log_date DATE;
  v_exists BOOLEAN;
BEGIN
  -- Get most recent log date
  SELECT MAX(date) INTO v_last_log_date
  FROM habit_logs
  WHERE habit_id = p_habit_id;
  
  -- If no logs exist, streak is 0
  IF v_last_log_date IS NULL THEN
    RETURN 0;
  END IF;
  
  -- Streak only counts if completed today or yesterday
  IF v_last_log_date < CURRENT_DATE - 1 THEN
    RETURN 0;
  END IF;
  
  -- Count consecutive days backwards
  WHILE v_check_date >= v_last_log_date LOOP
    SELECT EXISTS(
      SELECT 1 FROM habit_logs
      WHERE habit_id = p_habit_id AND date = v_check_date
    ) INTO v_exists;
    
    IF v_exists THEN
      v_streak := v_streak + 1;
      v_check_date := v_check_date - 1;
    ELSE
      EXIT;
    END IF;
  END LOOP;
  
  -- Continue checking backwards
  v_check_date := v_last_log_date - 1;
  WHILE v_check_date IS NOT NULL LOOP
    SELECT EXISTS(
      SELECT 1 FROM habit_logs
      WHERE habit_id = p_habit_id AND date = v_check_date
    ) INTO v_exists;
    
    IF v_exists THEN
      v_streak := v_streak + 1;
      v_check_date := v_check_date - 1;
    ELSE
      EXIT;
    END IF;
  END LOOP;
  
  RETURN v_streak;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update streak when a habit log is added/removed
CREATE OR REPLACE FUNCTION update_habit_streak()
RETURNS TRIGGER AS $$
DECLARE
  v_new_streak INTEGER;
  v_current_longest INTEGER;
BEGIN
  -- Calculate new streak
  v_new_streak := calculate_habit_streak(COALESCE(NEW.habit_id, OLD.habit_id));
  
  -- Get current longest streak
  SELECT longest_streak INTO v_current_longest
  FROM habits
  WHERE id = COALESCE(NEW.habit_id, OLD.habit_id);
  
  -- Update habit streaks
  UPDATE habits
  SET 
    current_streak = v_new_streak,
    longest_streak = GREATEST(v_current_longest, v_new_streak),
    updated_at = TIMEZONE('utc', NOW())
  WHERE id = COALESCE(NEW.habit_id, OLD.habit_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to update streaks when logs change
CREATE TRIGGER update_streak_on_log_insert
  AFTER INSERT ON public.habit_logs
  FOR EACH ROW EXECUTE FUNCTION update_habit_streak();

CREATE TRIGGER update_streak_on_log_delete
  AFTER DELETE ON public.habit_logs
  FOR EACH ROW EXECUTE FUNCTION update_habit_streak();

-- =====================================================
-- DASHBOARD STATISTICS FUNCTION
-- =====================================================

CREATE OR REPLACE FUNCTION get_dashboard_stats(p_user_id UUID)
RETURNS TABLE(
  total_habits BIGINT,
  active_habits BIGINT,
  completed_today BIGINT,
  total_completions BIGINT,
  current_streaks_sum INTEGER,
  longest_streak INTEGER,
  completion_rate NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    COUNT(h.id) AS total_habits,
    COUNT(h.id) FILTER (WHERE h.is_archived = false) AS active_habits,
    COUNT(hl.id) FILTER (WHERE hl.date = CURRENT_DATE) AS completed_today,
    COUNT(hl.id) AS total_completions,
    COALESCE(SUM(h.current_streak), 0)::INTEGER AS current_streaks_sum,
    COALESCE(MAX(h.longest_streak), 0)::INTEGER AS longest_streak,
    CASE 
      WHEN COUNT(h.id) FILTER (WHERE h.is_archived = false) = 0 THEN 0
      ELSE ROUND(
        (COUNT(hl.id) FILTER (WHERE hl.date = CURRENT_DATE)::NUMERIC / 
         NULLIF(COUNT(h.id) FILTER (WHERE h.is_archived = false), 0)) * 100,
        1
      )
    END AS completion_rate
  FROM habits h
  LEFT JOIN habit_logs hl ON h.id = hl.habit_id
  WHERE h.user_id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- HABIT PROGRESS VIEW
-- =====================================================

CREATE OR REPLACE VIEW v_habit_progress AS
SELECT
  h.id,
  h.user_id,
  h.name,
  h.goal_days,
  h.current_streak,
  h.longest_streak,
  h.current_streak AS days_completed,
  GREATEST(h.goal_days - h.current_streak, 0) AS days_remaining,
  CASE
    WHEN h.goal_days > 0 THEN ROUND((h.current_streak::NUMERIC / h.goal_days) * 100, 1)
    ELSE 0
  END AS progress_percentage,
  CASE
    WHEN h.current_streak >= h.goal_days THEN true
    ELSE false
  END AS goal_achieved,
  c.name AS category_name,
  c.color AS category_color,
  c.icon AS category_icon,
  h.color,
  h.icon,
  h.is_archived,
  h.created_at,
  h.start_date
FROM habits h
LEFT JOIN habit_categories c ON h.category_id = c.id;

-- =====================================================
-- FUNCTIONS & TRIGGERS FOR AUTO-UPDATES
-- =====================================================

-- Function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to all tables
CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_habit_categories_updated_at
  BEFORE UPDATE ON public.habit_categories
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_habits_updated_at
  BEFORE UPDATE ON public.habits
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- =====================================================
-- INDEXES for Performance
-- =====================================================
CREATE INDEX idx_profiles_username ON public.profiles(username);
CREATE INDEX idx_profiles_email ON public.profiles(email);
CREATE INDEX idx_habit_categories_user_id ON public.habit_categories(user_id);
CREATE INDEX idx_habit_categories_system ON public.habit_categories(is_system) WHERE is_system = true;
CREATE INDEX idx_habits_user_id ON public.habits(user_id);
CREATE INDEX idx_habits_category_id ON public.habits(category_id);
CREATE INDEX idx_habits_archived ON public.habits(is_archived);
CREATE INDEX idx_habit_logs_habit_id ON public.habit_logs(habit_id);
CREATE INDEX idx_habit_logs_user_id ON public.habit_logs(user_id);
CREATE INDEX idx_habit_logs_date ON public.habit_logs(date);
CREATE INDEX idx_habit_logs_habit_date ON public.habit_logs(habit_id, date);

-- =====================================================
-- SEED DATA: System Categories
-- =====================================================

-- Note: System categories will be created automatically for each user
-- via application logic when they first sign up or can be created manually.
-- The test user below will have these categories pre-created.

-- =====================================================
-- TEST USER CREATION
-- =====================================================

-- Note: Password is "Test123!" hashed with bcrypt
-- This creates a test user that can login with:
-- Email: test@habidev.com
-- Password: Test123!

DO $$
DECLARE
  v_user_id UUID;
  v_category_salud UUID;
  v_category_productividad UUID;
  v_habit_ejercicio UUID;
  v_habit_leer UUID;
BEGIN
  -- Set user_id for test user
  v_user_id := '00000000-0000-0000-0000-000000000001';
  
  -- Check if test user already exists
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = v_user_id) THEN
    -- Create test user in auth.users
    INSERT INTO auth.users (
      id,
      instance_id,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_user_meta_data,
      created_at,
      updated_at,
      aud,
      role
    ) VALUES (
      v_user_id,
      '00000000-0000-0000-0000-000000000000',
      'test@habidev.com',
      crypt('Test123!', gen_salt('bf')),
      NOW(),
      '{"full_name": "Usuario de Prueba"}',
      NOW(),
      NOW(),
      'authenticated',
      'authenticated'
    );
    
    RAISE NOTICE 'Test user created successfully';
  ELSE
    RAISE NOTICE 'Test user already exists, skipping creation';
  END IF;

  -- Wait a bit for trigger to create profile
  PERFORM pg_sleep(0.1);
  
  -- Profile will be created automatically by trigger
  -- Update profile with additional data
  UPDATE public.profiles
  SET
    username = 'testuser',
    bio = 'Usuario de prueba para testing de HabiDev',
    timezone = 'America/Costa_Rica',
    preferred_language = 'es'
  WHERE id = v_user_id;

  -- Create test categories
  INSERT INTO public.habit_categories (user_id, name, color, icon, display_order)
  VALUES (v_user_id, 'Salud & Fitness', '#10B981', '💪', 1)
  ON CONFLICT (user_id, name) DO UPDATE SET color = '#10B981'
  RETURNING id INTO v_category_salud;

  INSERT INTO public.habit_categories (user_id, name, color, icon, display_order)
  VALUES (v_user_id, 'Productividad', '#3B82F6', '🎯', 2)
  ON CONFLICT (user_id, name) DO UPDATE SET color = '#3B82F6'
  RETURNING id INTO v_category_productividad;

  -- Create test habits
  INSERT INTO public.habits (
    user_id, category_id, name, description, type, frequency,
    goal_days, color, icon, start_date
  ) VALUES (
    v_user_id,
    v_category_salud,
    'Hacer ejercicio',
    'Hacer al menos 30 minutos de ejercicio físico',
    'good',
    'daily',
    30,
    '#10B981',
    '🏃',
    CURRENT_DATE - 10
  )
  RETURNING id INTO v_habit_ejercicio;

  INSERT INTO public.habits (
    user_id, category_id, name, description, type, frequency,
    goal_days, color, icon, start_date
  ) VALUES (
    v_user_id,
    v_category_productividad,
    'Leer 20 minutos',
    'Leer al menos 20 minutos de un libro',
    'good',
    'daily',
    60,
    '#F59E0B',
    '📚',
    CURRENT_DATE - 5
  )
  RETURNING id INTO v_habit_leer;

  -- Create sample habit logs (racha de 7 días para ejercicio)
  INSERT INTO public.habit_logs (habit_id, user_id, date, count)
  SELECT
    v_habit_ejercicio,
    v_user_id,
    CURRENT_DATE - i,
    1
  FROM generate_series(0, 6) AS i;

  -- Create sample habit logs (racha de 4 días para leer)
  INSERT INTO public.habit_logs (habit_id, user_id, date, count)
  SELECT
    v_habit_leer,
    v_user_id,
    CURRENT_DATE - i,
    1
  FROM generate_series(0, 3) AS i;

  RAISE NOTICE 'Test user created successfully: test@habidev.com / Test123!';
END $$;

-- =====================================================
-- GRANT PERMISSIONS
-- =====================================================

-- Grant execute permissions on functions
GRANT EXECUTE ON FUNCTION calculate_habit_streak(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION get_dashboard_stats(UUID) TO authenticated;

-- Grant select on view
GRANT SELECT ON v_habit_progress TO authenticated;
