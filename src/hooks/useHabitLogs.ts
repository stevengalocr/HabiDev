import { useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { HabitLog } from "@/types/database.types";
import { getToday } from "@/utils/dateHelpers";

export const useHabitLogs = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleHabitCompletion = useCallback(
    async (habitId: string, date: string = getToday()): Promise<boolean> => {
      try {
        setLoading(true);
        setError(null);

        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) throw new Error("No user found");

        // Check if already completed
        const { data: existing } = await supabase
          .from("habit_logs")
          .select("id")
          .eq("habit_id", habitId)
          .eq("date", date)
          .single();

        if (existing) {
          // Remove completion
          const { error: deleteError } = await supabase
            .from("habit_logs")
            .delete()
            .eq("id", existing.id);

          if (deleteError) throw deleteError;
          return false; // Now uncompleted
        } else {
          // Add completion
          const { error: insertError } = await supabase
            .from("habit_logs")
            .insert({
              habit_id: habitId,
              user_id: user.id,
              date,
              count: 1,
            });

          if (insertError) throw insertError;
          return true; // Now completed
        }
      } catch (err: any) {
        setError(err.message);
        console.error("Error toggling habit completion:", err);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const isHabitCompletedToday = useCallback(
    async (habitId: string): Promise<boolean> => {
      try {
        const { data } = await supabase
          .from("habit_logs")
          .select("id")
          .eq("habit_id", habitId)
          .eq("date", getToday())
          .single();

        return !!data;
      } catch (err) {
        return false;
      }
    },
    [],
  );

  const getHabitLogs = useCallback(
    async (
      habitId: string,
      startDate?: string,
      endDate?: string,
    ): Promise<HabitLog[]> => {
      try {
        let query = supabase
          .from("habit_logs")
          .select("*")
          .eq("habit_id", habitId)
          .order("date", { ascending: false });

        if (startDate) {
          query = query.gte("date", startDate);
        }
        if (endDate) {
          query = query.lte("date", endDate);
        }

        const { data, error } = await query;
        if (error) throw error;

        return data || [];
      } catch (err: any) {
        console.error("Error fetching habit logs:", err);
        return [];
      }
    },
    [],
  );

  return {
    loading,
    error,
    toggleHabitCompletion,
    isHabitCompletedToday,
    getHabitLogs,
  };
};
