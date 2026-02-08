import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import {
  Habit,
  HabitProgress,
  CreateHabitInput,
  UpdateHabitInput,
} from "@/types/database.types";

export const useHabits = () => {
  const [habits, setHabits] = useState<HabitProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHabits = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data, error: fetchError } = await supabase
        .from("v_habit_progress")
        .select("*")
        .eq("user_id", user.id)
        .eq("is_archived", false)
        .order("progress_percentage", { ascending: false });

      if (fetchError) throw fetchError;
      setHabits(data || []);
    } catch (err: any) {
      setError(err.message);
      console.error("Error fetching habits:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHabits();

    // Subscribe to real-time changes
    const subscription = supabase
      .channel("habits_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "habits",
        },
        () => {
          fetchHabits();
        },
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "habit_logs",
        },
        () => {
          fetchHabits();
        },
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchHabits]);

  const createHabit = async (
    input: CreateHabitInput,
  ): Promise<Habit | null> => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data, error } = await supabase
        .from("habits")
        .insert({
          user_id: user.id,
          name: input.name,
          description: input.description,
          category_id: input.category_id,
          type: input.type || "good",
          frequency: input.frequency || "daily",
          target_count: input.target_count || 1,
          goal_days: input.goal_days || 30,
          color: input.color || "#3B82F6",
          icon: input.icon,
          reminder_enabled: input.reminder_enabled || false,
          reminder_time: input.reminder_time,
        })
        .select()
        .single();

      if (error) throw error;

      await fetchHabits();
      return data;
    } catch (err: any) {
      setError(err.message);
      console.error("Error creating habit:", err);
      return null;
    }
  };

  const updateHabit = async (
    id: string,
    input: UpdateHabitInput,
  ): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from("habits")
        .update(input)
        .eq("id", id);

      if (error) throw error;

      await fetchHabits();
      return true;
    } catch (err: any) {
      setError(err.message);
      console.error("Error updating habit:", err);
      return false;
    }
  };

  const deleteHabit = async (id: string): Promise<boolean> => {
    try {
      const { error } = await supabase.from("habits").delete().eq("id", id);

      if (error) throw error;

      await fetchHabits();
      return true;
    } catch (err: any) {
      setError(err.message);
      console.error("Error deleting habit:", err);
      return false;
    }
  };

  const archiveHabit = async (
    id: string,
    archived: boolean = true,
  ): Promise<boolean> => {
    return updateHabit(id, { is_archived: archived });
  };

  return {
    habits,
    loading,
    error,
    refetch: fetchHabits,
    createHabit,
    updateHabit,
    deleteHabit,
    archiveHabit,
  };
};
