import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { DashboardStats } from "@/types/database.types";

export const useDashboardStats = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data, error: rpcError } = await supabase.rpc(
        "get_dashboard_stats",
        { p_user_id: user.id },
      );

      if (rpcError) throw rpcError;

      // RPC returns array with single object
      const statsData = Array.isArray(data) ? data[0] : data;
      setStats(statsData || null);
    } catch (err: any) {
      setError(err.message);
      console.error("Error fetching dashboard stats:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();

    // Subscribe to changes that affect stats
    const subscription = supabase
      .channel("stats_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "habits",
        },
        () => {
          fetchStats();
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
          fetchStats();
        },
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchStats]);

  return {
    stats,
    loading,
    error,
    refetch: fetchStats,
  };
};
