import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { HabitCategory } from "@/types/database.types";

export const useCategories = () => {
  const [categories, setCategories] = useState<HabitCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data, error: fetchError } = await supabase
        .from("habit_categories")
        .select("*")
        .eq("user_id", user.id)
        .order("display_order", { ascending: true });

      if (fetchError) throw fetchError;
      setCategories(data || []);
    } catch (err: any) {
      setError(err.message);
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const createCategory = async (
    name: string,
    color: string,
    icon?: string,
  ): Promise<HabitCategory | null> => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data, error } = await supabase
        .from("habit_categories")
        .insert({
          user_id: user.id,
          name,
          color,
          icon,
          is_system: false,
        })
        .select()
        .single();

      if (error) throw error;

      await fetchCategories();
      return data;
    } catch (err: any) {
      setError(err.message);
      console.error("Error creating category:", err);
      return null;
    }
  };

  return {
    categories,
    loading,
    error,
    refetch: fetchCategories,
    createCategory,
  };
};
