// Database types for HabiDev
// Auto-generated from Supabase schema

export type HabitType = "good" | "bad";
export type HabitFrequency = "daily" | "weekly" | "custom";

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  username: string | null;
  bio: string | null;
  timezone: string;
  preferred_language: string;
  created_at: string;
  updated_at: string;
}

export interface HabitCategory {
  id: string;
  user_id: string;
  name: string;
  color: string;
  icon: string | null;
  is_system: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Habit {
  id: string;
  user_id: string;
  category_id: string | null;
  name: string;
  description: string | null;
  type: HabitType;
  frequency: HabitFrequency;
  target_count: number;
  goal_days: number;
  current_streak: number;
  longest_streak: number;
  color: string;
  icon: string | null;
  reminder_enabled: boolean;
  reminder_time: string | null;
  is_archived: boolean;
  start_date: string;
  created_at: string;
  updated_at: string;
}

export interface HabitLog {
  id: string;
  habit_id: string;
  user_id: string;
  completed_at: string;
  count: number;
  notes: string | null;
  date: string;
}

export interface HabitProgress {
  id: string;
  user_id: string;
  name: string;
  goal_days: number;
  current_streak: number;
  longest_streak: number;
  days_completed: number;
  days_remaining: number;
  progress_percentage: number;
  goal_achieved: boolean;
  category_name: string | null;
  category_color: string | null;
  category_icon: string | null;
  color: string;
  icon: string | null;
  is_archived: boolean;
  created_at: string;
  start_date: string;
}

export interface DashboardStats {
  total_habits: number;
  active_habits: number;
  completed_today: number;
  total_completions: number;
  current_streaks_sum: number;
  longest_streak: number;
  completion_rate: number;
}

export interface CreateHabitInput {
  name: string;
  description?: string;
  category_id?: string;
  type?: HabitType;
  frequency?: HabitFrequency;
  target_count?: number;
  goal_days?: number;
  color?: string;
  icon?: string;
  reminder_enabled?: boolean;
  reminder_time?: string;
}

export interface UpdateHabitInput extends Partial<CreateHabitInput> {
  is_archived?: boolean;
}
